import { loremIpsum } from "lorem-ipsum";

import product from 'static/images/product.png';
import chair from 'static/images/chair.png';

export const randInterior = (jpgOnly) => {
  let key = Math.floor(Math.random() * 1000);
  if (key % 12 === 0 && !jpgOnly) return { url: product, type: 'png' };
  if (key % 12 === 1 && !jpgOnly) return { url: chair, type: 'png' };
  return { url: 'https://source.unsplash.com/featured/?interior/' + key, type: 'jpg' };
}

export const getRandomItems = () => [
  {
    id: 0,
    name: "Tellus lacus vitae nisl.",
    description1: loremIpsum(),
    description2: loremIpsum(),
    price: "6.490.000",
    unit: "vnd",
    tags: ["New", "20%"],
    category: "table",
    images: [
      { ...randInterior(), color: "#B28B67" },
      { ...randInterior(), color: "#915B3C" },
      { ...randInterior(), color: "#1C1D1A" },
      { ...randInterior(), color: null },
      { ...randInterior(), color: null },
      { ...randInterior(), color: null },
    ],
    author: 0,
    comments: [0, 1]
  }, {
    id: 1,
    name: "Elementum urna tempus.",
    description1: loremIpsum(),
    description2: loremIpsum(),
    price: "1.990.000",
    unit: "vnd",
    tags: ["Best Seller", "25%", "Artist Choice"],
    images: [
      { ...randInterior(), color: "#1C1D1A" },
      { ...randInterior(), color: "#B28B67" },
      { ...randInterior(), color: "#915B3C" },
      { ...randInterior(), color: null },
    ],
    author: 0,
    comments: [2, 3]
  }
]