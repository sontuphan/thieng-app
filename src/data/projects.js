import { loremIpsum } from "lorem-ipsum";
import dateformat from 'dateformat';

import product from 'static/images/product.png';
import chair from 'static/images/chair.png';

export const randInterior = (jpgOnly) => {
  let key = Math.floor(Math.random() * 1000);
  if (key % 12 === 0 && !jpgOnly) return { url: product, type: 'png' };
  if (key % 12 === 1 && !jpgOnly) return { url: chair, type: 'png' };
  return { url: 'https://source.unsplash.com/featured/?interior/' + key, type: 'jpg' };
}

export const getRandomProjects = (userId) => [
  {
    id: 0,
    item: 0,
    status: loremIpsum({ units: "paragraphs" }),
    images: [
      randInterior().url,
      randInterior().url,
      randInterior().url,
      randInterior().url,
      randInterior().url,
      randInterior().url,
    ],
    author: userId,
    comments: [0, 1],
    createdAt: dateformat(),
  }, {
    id: 1,
    item: 1,
    status: loremIpsum({ units: "paragraphs" }),
    images: [
      randInterior().url,
      randInterior().url,
      randInterior().url,
      randInterior().url,
    ],
    author: userId,
    comments: [2, 3],
    createdAt: dateformat(),
  }
]