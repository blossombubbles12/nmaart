"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import Image from "next/image";
import { X, Move, RotateCw, Maximize2, ShoppingBag, QrCode, Smartphone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface WebXRARProps {
  imageUrl: string;
  title: string;
  price?: string;
  onClose: () => void;
}

type ARSupport = "webxr" | "quicklook" | "none" | "checking";
type ARPhase = "idle" | "launching" | "scanning" | "ready" | "placed" | "virtual" | "error";

function detectARSupport(): Promise<ARSupport> {
  return new Promise((resolve) => {
    // iOS AR Quick Look detection
    const anchor = document.createElement("a");
    if (anchor.relList && anchor.relList.supports && anchor.relList.supports("ar")) {
      resolve("quicklook");
      return;
    }
    // WebXR detection (Android Chrome, Edge)
    if (typeof navigator !== "undefined" && "xr" in navigator) {
      (navigator as any).xr
        .isSessionSupported("immersive-ar")
        .then((supported: boolean) => resolve(supported ? "webxr" : "none"))
        .catch(() => resolve("none"));
    } else {
      resolve("none");
    }
  });
}

export function WebXRAR({ imageUrl, title, price, onClose }: WebXRARProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const sessionRef = useRef<XRSession | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const reticleRef = useRef<THREE.Mesh | null>(null);
  const artworkRef = useRef<THREE.Mesh | null>(null);
  const hitTestSourceRef = useRef<XRHitTestSource | null>(null);
  const rafRef = useRef<number>(0);

  const [arSupport, setArSupport] = useState<ARSupport>("checking");
  const [phase, setPhase] = useState<ARPhase>("idle");
  const [isPlaced, setIsPlaced] = useState(false);
  const [statusMsg, setStatusMsg] = useState("Initializing...");

  useEffect(() => {
    detectARSupport().then(setArSupport);
  }, []);

  const cleanupAR = useCallback(() => {
    if (hitTestSourceRef.current) {
      hitTestSourceRef.current.cancel();
      hitTestSourceRef.current = null;
    }
    if (sessionRef.current) {
      sessionRef.current.end().catch(() => {});
      sessionRef.current = null;
    }
    if (rendererRef.current) {
      rendererRef.current.dispose();
      rendererRef.current = null;
    }
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  }, []);

  useEffect(() => () => cleanupAR(), [cleanupAR]);

  const launchWebXR = useCallback(async () => {
    if (!canvasRef.current) return;
    setPhase("launching");
    setStatusMsg("Requesting camera access...");

    try {
      const renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        antialias: true,
        alpha: true,
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.xr.enabled = true;
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      rendererRef.current = renderer;

      const scene = new THREE.Scene();
      sceneRef.current = scene;

      const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 20);
      cameraRef.current = camera;

      // Lighting
      scene.add(new THREE.AmbientLight(0xffffff, 0.8));
      const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
      dirLight.position.set(0, 2, 1);
      scene.add(dirLight);

      // Reticle (surface target indicator)
      const reticleGeo = new THREE.RingGeometry(0.12, 0.16, 32).rotateX(-Math.PI / 2);
      const reticleMat = new THREE.MeshBasicMaterial({
        color: 0x7b48cc,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.9,
      });
      const innerGeo = new THREE.CircleGeometry(0.06, 32).rotateX(-Math.PI / 2);
      const innerMat = new THREE.MeshBasicMaterial({ color: 0x7b48cc, transparent: true, opacity: 0.3 });
      const reticle = new THREE.Group() as unknown as THREE.Mesh;
      const outerRing = new THREE.Mesh(reticleGeo, reticleMat);
      const inner = new THREE.Mesh(innerGeo, innerMat);
      (reticle as any).add(outerRing);
      (reticle as any).add(inner);
      (reticle as any).matrixAutoUpdate = false;
      (reticle as any).visible = false;
      scene.add(reticle as any);
      reticleRef.current = reticle;

      // Load artwork texture
      setStatusMsg("Loading artwork...");
      const texture = await new Promise<THREE.Texture>((resolve, reject) => {
        new THREE.TextureLoader().load(imageUrl, resolve, undefined, reject);
      });
      texture.colorSpace = THREE.SRGBColorSpace;

      // Request WebXR AR session
      setStatusMsg("Starting AR session...");
      const session = await (navigator as any).xr.requestSession("immersive-ar", {
        requiredFeatures: ["hit-test"],
        optionalFeatures: ["dom-overlay", "light-estimation"],
        domOverlay: overlayRef.current ? { root: overlayRef.current } : undefined,
      });
      sessionRef.current = session;

      renderer.xr.setReferenceSpaceType("local");
      await renderer.xr.setSession(session);

      const referenceSpace = await session.requestReferenceSpace("local");
      const viewerSpace = await session.requestReferenceSpace("viewer");
      const hitTestSource = await session.requestHitTestSource({ space: viewerSpace });
      hitTestSourceRef.current = hitTestSource;

      setPhase("scanning");
      setStatusMsg("Point camera at a flat surface");

      // Place artwork on tap
      session.addEventListener("select", () => {
        const reticle = reticleRef.current as any;
        if (!reticle?.visible || artworkRef.current) return;

        // Determine aspect ratio from image
        const img = texture.image as HTMLImageElement;
        const aspectRatio = img.naturalWidth / img.naturalHeight || 4 / 5;
        const panelWidth = 0.5; // 0.5 metres wide
        const panelHeight = panelWidth / aspectRatio;

        const geo = new THREE.PlaneGeometry(panelWidth, panelHeight);
        const mat = new THREE.MeshStandardMaterial({ map: texture, side: THREE.DoubleSide });
        const mesh = new THREE.Mesh(geo, mat);

        // Extract pose from reticle matrix
        const position = new THREE.Vector3();
        const quaternion = new THREE.Quaternion();
        const scale = new THREE.Vector3();
        reticle.matrix.decompose(position, quaternion, scale);

        mesh.position.copy(position);
        mesh.position.y += panelHeight / 2; // lift artwork above floor
        mesh.quaternion.copy(quaternion);
        // Face the camera (rotate the plane to be vertical)
        mesh.rotateX(-Math.PI / 2);

        scene.add(mesh);
        artworkRef.current = mesh;
        reticle.visible = false;
        setIsPlaced(true);
        setPhase("placed");
        setStatusMsg("Artwork placed!");
      });

      // Render loop
      renderer.setAnimationLoop((_timestamp: number, frame: XRFrame | null) => {
        if (!frame) return;

        const reticle = reticleRef.current as any;
        if (hitTestSourceRef.current && reticle && !artworkRef.current) {
          const results = frame.getHitTestResults(hitTestSourceRef.current);
          if (results.length > 0) {
            const pose = results[0].getPose(referenceSpace);
            if (pose) {
              reticle.visible = true;
              reticle.matrix.fromArray(pose.transform.matrix);
              setPhase((p) => (p !== "placed" ? "ready" : p));
              setStatusMsg("Surface detected — tap to place artwork");
            }
          } else {
            reticle.visible = false;
            setPhase((p) => (p !== "placed" ? "scanning" : p));
            setStatusMsg("Point camera at a flat surface");
          }
        }
        renderer.render(scene, camera);
      });

      session.addEventListener("end", () => {
        setPhase("idle");
        setIsPlaced(false);
        artworkRef.current = null;
        reticleRef.current = null;
        cleanupAR();
        onClose();
      });
    } catch (err: any) {
      console.error("WebXR AR error:", err);
      setPhase("error");
      setStatusMsg(err?.message || "AR failed to start. Check camera permissions.");
    }
  }, [imageUrl, cleanupAR, onClose]);

  const launchVirtualPreview = useCallback(async () => {
    if (!canvasRef.current) return;
    setPhase("launching");
    setStatusMsg("Optimizing 3D preview...");

    try {
      const renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        antialias: true,
        alpha: true,
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      rendererRef.current = renderer;

      const scene = new THREE.Scene();
      sceneRef.current = scene;

      const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 100);
      camera.position.set(0, 0, 2);
      cameraRef.current = camera;

      // Add a "Virtual Room" background or floor
      const ambientLight = new THREE.AmbientLight(0xffffff, 1);
      scene.add(ambientLight);
      
      const pointLight = new THREE.PointLight(0xffffff, 2);
      pointLight.position.set(2, 2, 2);
      scene.add(pointLight);

      // Load artwork texture
      const texture = await new Promise<THREE.Texture>((resolve, reject) => {
        new THREE.TextureLoader().load(imageUrl, resolve, undefined, reject);
      });
      texture.colorSpace = THREE.SRGBColorSpace;

      const img = texture.image as HTMLImageElement;
      const aspectRatio = img.naturalWidth / img.naturalHeight || 4/5;
      const panelWidth = 1;
      const panelHeight = panelWidth / aspectRatio;

      const geo = new THREE.PlaneGeometry(panelWidth, panelHeight);
      const mat = new THREE.MeshStandardMaterial({ 
        map: texture, 
        side: THREE.DoubleSide,
        roughness: 0.3,
        metalness: 0.1
      });
      const mesh = new THREE.Mesh(geo, mat);
      scene.add(mesh);
      artworkRef.current = mesh;

      setPhase("virtual");
      setStatusMsg("Virtual Preview Active");

      const animate = () => {
        if (phase === "error") return;
        rafRef.current = requestAnimationFrame(animate);
        if (mesh) {
           mesh.rotation.y = Math.sin(Date.now() * 0.001) * 0.2;
        }
        renderer.render(scene, camera);
      };
      animate();

    } catch (err: any) {
      setPhase("error");
      setStatusMsg("Failed to load 3D preview.");
    }
  }, [imageUrl, phase]);

  const resetPlacement = () => {
    if (artworkRef.current && sceneRef.current) {
      sceneRef.current.remove(artworkRef.current);
      artworkRef.current.geometry.dispose();
      (artworkRef.current.material as THREE.MeshStandardMaterial).dispose();
      artworkRef.current = null;
      if (reticleRef.current) (reticleRef.current as any).visible = true;
      setIsPlaced(false);
      setPhase("scanning");
      setStatusMsg("Move camera to a flat surface");
    }
  };

  // ─── Render ───

  // Not checking yet
  if (arSupport === "checking") {
    return (
      <div className="fixed inset-0 z-[300] bg-black flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-primary/40 border-t-primary animate-spin" />
      </div>
    );
  }

  // ─── WebXR active session ───
  if (phase !== "idle" && arSupport === "webxr") {
    return (
      <div className="fixed inset-0 z-[300] bg-black">
        {/* The Three.js canvas fills the screen */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

        {/* DOM overlay on top of the AR canvas */}
        <div ref={overlayRef} data-ar-overlay className="absolute inset-0 pointer-events-none z-10">
          {/* Top HUD */}
          <div className="absolute top-0 left-0 right-0 flex items-start justify-between px-5 pt-14 pointer-events-auto">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white drop-shadow-lg">
                <div className={`w-2 h-2 rounded-full ${phase === "scanning" ? "bg-yellow-400 animate-pulse" : phase === "ready" ? "bg-green-400" : "bg-primary"}`} />
                {statusMsg}
              </div>
            </div>
            <button
              onClick={() => { cleanupAR(); onClose(); }}
              className="pointer-events-auto w-11 h-11 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scanning animation ring */}
          {phase === "scanning" && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-48 h-48 border-2 border-dashed border-primary/50 rounded-full animate-pulse opacity-60" />
              <div className="absolute w-32 h-32 border border-primary/30 rounded-full" />
            </div>
          )}

          {/* "Tap anywhere" hint when surface found */}
          {phase === "ready" && (
            <div className="absolute bottom-40 left-1/2 -translate-x-1/2 bg-primary/80 backdrop-blur-md text-white text-xs font-black tracking-widest uppercase px-5 py-2.5 rounded-full pointer-events-none">
              Tap to place artwork
            </div>
          )}

          {/* Placed controls */}
          {phase === "placed" && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-0 left-0 right-0 px-5 pb-12 pointer-events-auto"
            >
              <div className="flex justify-center gap-6 mb-5">
                {[
                  { icon: <Move className="w-5 h-5" />, label: "Move" },
                  { icon: <RotateCw className="w-5 h-5" />, label: "Rotate" },
                  { icon: <Maximize2 className="w-5 h-5" />, label: "Scale" },
                ].map((c) => (
                  <button key={c.label} className="flex flex-col items-center gap-1.5">
                    <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all">
                      {c.icon}
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-white/70">{c.label}</span>
                  </button>
                ))}
              </div>
              <div className="flex gap-3">
                <button className="flex-1 py-4 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2">
                  <ShoppingBag className="w-4 h-4" /> Acquire {price && `— ${price}`}
                </button>
                <button onClick={resetPlacement} className="px-5 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-2xl font-black text-xs uppercase tracking-widest">
                  Reset
                </button>
              </div>
            </motion.div>
          )}

          {/* Error state */}
          {phase === "error" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-8 pointer-events-auto">
              <p className="text-white font-bold text-center text-sm">{statusMsg}</p>
              <button onClick={() => { setPhase("idle"); }} className="px-6 py-3 bg-primary text-white rounded-full font-black text-xs uppercase tracking-widest">
                Try Again
              </button>
              <button onClick={() => { cleanupAR(); onClose(); }} className="text-white/40 text-xs uppercase tracking-widest font-black">
                Close
              </button>
            </div>
          )}
        </div>

        {/* Launch on idle */}
        {phase === "launching" && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 bg-black/80">
            <div className="w-12 h-12 rounded-full border-4 border-primary/40 border-t-primary animate-spin" />
            <p className="text-white font-bold text-sm uppercase tracking-widest">{statusMsg}</p>
          </div>
        )}
      </div>
    );
  }

  // ─── Launch screen (before session starts) for WebXR ───
  if (arSupport === "webxr") {
    return (
      <div className="fixed inset-0 z-[300] bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center px-6 gap-8">
        <button onClick={onClose} className="absolute top-14 right-5 w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white">
          <X className="w-5 h-5" />
        </button>

        <div className="w-24 h-24 rounded-3xl bg-primary/20 border-2 border-primary/30 flex items-center justify-center">
          <Smartphone className="w-10 h-10 text-primary" />
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mb-2">{title}</h2>
          <p className="text-white/60 font-bold text-sm uppercase tracking-widest">AR Experience Ready</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 w-full max-w-sm space-y-3 text-sm text-white/70 font-bold">
          <p className="flex items-start gap-3"><span className="text-primary font-black">1.</span> Grant camera permission when asked</p>
          <p className="flex items-start gap-3"><span className="text-primary font-black">2.</span> Point camera at a flat wall or surface</p>
          <p className="flex items-start gap-3"><span className="text-primary font-black">3.</span> Tap the surface to place the artwork</p>
        </div>

        <button
          onClick={() => { setPhase("launching"); setTimeout(launchWebXR, 100); }}
          className="w-full max-w-sm py-5 bg-primary text-white rounded-2xl font-black text-sm uppercase tracking-[0.3em] flex items-center justify-center gap-3 shadow-2xl shadow-primary/40"
        >
          Launch AR Camera
        </button>
      </div>
    );
  }

  // ─── iOS AR Quick Look & Unsupported Fallback (Interactive 3D Preview) ───
  if (arSupport === "quicklook" || arSupport === "none") {
    if (phase === "launching" || phase === "virtual") {
        return (
          <div className="fixed inset-0 z-[300] bg-black">
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
            <div className="absolute top-0 left-0 right-0 flex items-start justify-between px-5 pt-14 z-10">
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white drop-shadow-lg">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    Interactive 3D Preview
                  </div>
                </div>
                <button
                  onClick={() => { setPhase("idle"); cleanupAR(); onClose(); }}
                  className="w-11 h-11 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white"
                >
                  <X className="w-5 h-5" />
                </button>
            </div>
            
            <div className="absolute bottom-12 left-0 right-0 px-8 text-center pointer-events-none">
                <p className="text-white/60 text-[10px] font-black uppercase tracking-[0.2em] mb-4">Drag to rotate • View in your space</p>
                <button className="pointer-events-auto w-full py-5 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-[0.3em]">
                    Acquire Artwork
                </button>
            </div>
          </div>
        )
    }

    return (
      <div className="fixed inset-0 z-[300] bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center px-6 gap-6">
        <button onClick={onClose} className="absolute top-14 right-5 w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white">
          <X className="w-5 h-5" />
        </button>

        <div className="relative w-40 h-48 rounded-2xl overflow-hidden border-4 border-white/20 shadow-2xl">
          <Image src={imageUrl} alt={title} fill className="object-cover" />
        </div>

        <div className="text-center">
          <h2 className="text-xl font-black text-primary uppercase tracking-tight mb-2">{title}</h2>
          <p className="text-white/60 font-bold text-xs uppercase tracking-widest">Enhanced Preview</p>
        </div>

        <p className="text-white/50 text-[10px] text-center font-black uppercase tracking-widest max-w-xs leading-relaxed">
          Spatial AR requires a 3D model (.usdz). Experience our high-fidelity virtual display room instead.
        </p>

        <button
          onClick={launchVirtualPreview}
          className="w-full max-w-sm py-5 bg-primary text-white rounded-2xl font-black text-sm uppercase tracking-[0.3em] flex items-center justify-center gap-3 shadow-2xl shadow-primary/40 text-center"
        >
          Enter 3D Preview
        </button>

        <p className="text-white/30 text-[9px] text-center font-bold max-w-xs uppercase tracking-widest">
          Tip: Open on Android Chrome for full spatial AR.
        </p>
      </div>
    );
  }
}
