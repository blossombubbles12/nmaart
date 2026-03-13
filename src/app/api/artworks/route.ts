import { NextResponse } from 'next/server';

const MOCK_ARTWORKS = [
  {
    id: 1,
    title: "CRYSTAL GEOMETRY I",
    artist: "ARISSA VANCE",
    image: "/images/artwork/1.png",
    price: 4200,
    categories: ["3D Sculpture", "Iridescent"],
    description: "A masterclass in geometric light manipulation, this crystal form shifts its spectral output based on the viewer's relative position.",
    dimensions: "120 x 120 x 80 cm",
    inventory: 3,
    models: {
      glb: "/models/crystal_1.glb",
      usdz: "/models/crystal_1.usdz"
    }
  },
  {
    id: 2,
    title: "FLUID DYNAMICS II",
    artist: "KAI STELLAR",
    image: "/images/artwork/2.png",
    price: 3800,
    categories: ["Abstract", "Fluid"],
    description: "Capturing the frozen moment of complex fluid interaction, this piece explores the chaos and order of digital textures.",
    dimensions: "200 x 200 cm",
    inventory: 5,
    models: {
      glb: "/models/fluid_2.glb",
      usdz: "/models/fluid_2.usdz"
    }
  },
  {
    id: 3,
    title: "DIMENSIONAL SHIFT",
    artist: "ELARA VOX",
    image: "/images/artwork/hero.png",
    price: 5500,
    categories: ["Landscape", "Futuristic"],
    description: "An ethereal exploration of digital space and time, presenting a horizon that exists only in the mind and the screen.",
    dimensions: "150 x 300 cm",
    inventory: 1,
    models: {
      glb: "/models/shift_3.glb",
      usdz: "/models/shift_3.usdz"
    }
  }
];

export async function GET() {
  // Simulate WooCommerce API response
  return NextResponse.json(MOCK_ARTWORKS);
}
