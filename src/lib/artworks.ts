export interface Artwork {
  id: string;
  title: string;
  artist: string;
  image: string;
  price: string;
  priceValue: number;
  medium: string;
  year: number;
  dimensions: string;
  description: string;
  tags: string[];
}

export const ARTWORKS: Artwork[] = [
  {
    id: "1",
    title: "Ethereal Bloom",
    artist: "Arissa Vance",
    image: "/images/home1.png",
    price: "$4,200",
    priceValue: 4200,
    medium: "Digital Canvas, Limited Edition",
    year: 2024,
    dimensions: "60 × 80 cm",
    description:
      "A radiant exploration of organic forms meeting digital precision. Arissa Vance channels the ephemeral nature of growth and decay into a luminous composition that shifts with the light of your space.",
    tags: ["Abstract", "Digital", "Limited Edition"],
  },
  {
    id: "2",
    title: "Fluid Resonance",
    artist: "Kai Stellar",
    image: "/images/home2.jpg",
    price: "$3,800",
    priceValue: 3800,
    medium: "Generative Art, 1 of 1",
    year: 2024,
    dimensions: "50 × 70 cm",
    description:
      "Wave patterns generated from live ocean frequency data, then sculpted into a visual meditation on movement and stillness. Each print is unique — a frozen moment of infinite motion.",
    tags: ["Generative", "Nature", "1 of 1"],
  },
  {
    id: "3",
    title: "Dimensional Shift",
    artist: "Elara Vox",
    image: "/images/home3.png",
    price: "$5,500",
    priceValue: 5500,
    medium: "3D Render, Archival Print",
    year: 2025,
    dimensions: "80 × 100 cm",
    description:
      "A gateway between realities. Elara Vox collapses the boundary between the physical and virtual with a composition that appears to fold space itself — best experienced in AR on your wall.",
    tags: ["3D", "Surreal", "Archival"],
  },
];
