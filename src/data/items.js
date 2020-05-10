import { loremIpsum } from 'lorem-ipsum';

import product from 'static/images/product.png';
import chair from 'static/images/chair.png';

export const randInterior = (jpgOnly) => {
  let key = Math.floor(Math.random() * 1000);
  if (key % 12 === 0 && !jpgOnly) return { source: product, type: 'image/png' };
  if (key % 12 === 1 && !jpgOnly) return { source: chair, type: 'image/png' };
  return { source: 'https://source.unsplash.com/featured/?interior/' + key, type: 'jpg' };
}

export const getRandomItems = () => [
  {
    _id: '0',
    id: 0,
    name: loremIpsum(),
    description1: loremIpsum({ units: "paragraphs" }),
    description2: loremIpsum({ units: "paragraphs" }),
    price: 6490000,
    tags: ["New", "20%"],
    category: "table",
    thumbnail: { ...randInterior(), metadata: { color: "#1C1D1A" } },
    files: [
      { ...randInterior(), metadata: { color: "#B28B67" } },
      { ...randInterior(), metadata: { color: "#915B3C" } },
      { ...randInterior(), metadata: { color: "#1C1D1A" } },
      { ...randInterior(), metadata: { color: null } },
      { ...randInterior(), metadata: { color: null } },
      { ...randInterior(), metadata: { color: null } },
    ],
    author: 'sontu_snowboy_teen@yahoo.com.vn',
    comments: [0, 1]
  }, {
    _id: '1',
    id: 1,
    name: loremIpsum(),
    description1: loremIpsum({ units: "paragraphs" }),
    description2: loremIpsum({ units: "paragraphs" }),
    price: 1990000,
    tags: ["Best Seller", "25%", "Artist Choice"],
    thumbnail: { ...randInterior(), metadata: { color: "#1C1D1A" } },
    images: [
      { ...randInterior(), metadata: { color: "#1C1D1A" } },
      { ...randInterior(), metadata: { color: "#B28B67" } },
      { ...randInterior(), metadata: { color: "#915B3C" } },
      { ...randInterior(), metadata: { color: null } },
    ],
    author: 'sontu_snowboy_teen@yahoo.com.vn',
    comments: [2, 3]
  }
]