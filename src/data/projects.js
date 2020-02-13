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

const DEFAULT_CONTAINER = {
  type: 'container',
  width: 12,
  justify: 'flex-start',
  alignItems: 'flex-start',
  items: []
}

const DEFAULT_IMAGE = {
  type: 'image',
  width: 12,
  url: randInterior().url,
}

const DEFAULT_TEXT = {
  type: 'text',
  width: 12,
  contents: null,
  font: {
    fontSize: 13,
    fontWeight: 400,
    fontFamily: ['"Open Sans"', 'sans-serif'],
    textAlign: 'start',
  }
}

export const getRandomProjects = (userId) => [
  {
    id: 0,
    item: 0,
    status: loremIpsum({ units: "sentences" }),
    thumbnail: randInterior().url,
    render: {
      ...DEFAULT_CONTAINER,
      items: [
        {
          ...DEFAULT_CONTAINER,
          items: [
            {
              ...DEFAULT_IMAGE,
              url: randInterior().url,
              width: 6,
            },
            {
              ...DEFAULT_CONTAINER,
              width: 6,
              items: [
                {
                  ...DEFAULT_IMAGE,
                  url: randInterior().url,
                  width: 12,
                },
                {
                  ...DEFAULT_IMAGE,
                  url: randInterior().url,
                  width: 12,
                },
              ]
            }
          ]
        },
        {
          ...DEFAULT_CONTAINER,
          items: [
            {
              ...DEFAULT_TEXT,
              contents: loremIpsum({ units: "paragraphs" })
            }
          ]
        },
        {
          ...DEFAULT_CONTAINER,
          items: [
            {
              ...DEFAULT_IMAGE,
              url: randInterior().url,
            }
          ]
        },
        {
          ...DEFAULT_CONTAINER,
          items: [
            {
              ...DEFAULT_TEXT,
              contents: loremIpsum({ units: "paragraphs" }),
              font: {
                fontSize: 24,
                fontWeight: 700,
                fontFamily: ['"Playfair Display"', 'serif'],
                textAlign: 'center',
              }
            }
          ]
        },
        {
          ...DEFAULT_CONTAINER,
          items: [
            {
              ...DEFAULT_IMAGE,
              width: 4,
              url: randInterior().url,
            },
            {
              ...DEFAULT_IMAGE,
              width: 4,
              url: randInterior().url,
            },
            {
              ...DEFAULT_IMAGE,
              width: 4,
              url: randInterior().url,
            }
          ]
        },
      ]
    },
    author: userId,
    comments: [0, 1],
    createdAt: dateformat("d mmm yyyy"),
  },
  {
    id: 1,
    item: 1,
    status: loremIpsum({ units: "sentences" }),
    thumbnail: randInterior().url,
    render: {
      ...DEFAULT_CONTAINER,
      items: [
        {
          ...DEFAULT_CONTAINER,
          items: [
            {
              ...DEFAULT_IMAGE,
              url: randInterior().url,
              width: 6,
            },
            {
              ...DEFAULT_IMAGE,
              url: randInterior().url,
              width: 6,
            }
          ]
        },
        {
          ...DEFAULT_CONTAINER,
          items: [
            {
              ...DEFAULT_TEXT,
              contents: loremIpsum({ units: "paragraphs" })
            }
          ]
        },
        {
          ...DEFAULT_CONTAINER,
          items: [
            {
              ...DEFAULT_IMAGE,
              url: randInterior().url,
            }
          ]
        },
        {
          ...DEFAULT_CONTAINER,
          items: [
            {
              ...DEFAULT_IMAGE,
              width: 4,
              url: randInterior().url,
            },
            {
              ...DEFAULT_IMAGE,
              width: 4,
              url: randInterior().url,
            },
            {
              ...DEFAULT_IMAGE,
              width: 4,
              url: randInterior().url,
            }
          ]
        },
      ]
    },
    author: userId,
    comments: [2, 3],
    createdAt: dateformat("d mmm yyyy"),
  },
  {
    id: 2,
    item: 2,
    status: loremIpsum({ units: "sentences" }),
    thumbnail: randInterior().url,
    render: {
      ...DEFAULT_CONTAINER,
      items: [
        {
          ...DEFAULT_CONTAINER,
          items: [
            {
              ...DEFAULT_IMAGE,
              url: randInterior().url,
              width: 6,
            },
            {
              ...DEFAULT_IMAGE,
              url: randInterior().url,
              width: 6,
            }
          ]
        },
        {
          ...DEFAULT_CONTAINER,
          items: [
            {
              ...DEFAULT_TEXT,
              contents: loremIpsum({ units: "paragraphs" })
            }
          ]
        },
        {
          ...DEFAULT_CONTAINER,
          items: [
            {
              ...DEFAULT_IMAGE,
              url: randInterior().url,
            }
          ]
        },
        {
          ...DEFAULT_CONTAINER,
          items: [
            {
              ...DEFAULT_IMAGE,
              width: 4,
              url: randInterior().url,
            },
            {
              ...DEFAULT_IMAGE,
              width: 4,
              url: randInterior().url,
            },
            {
              ...DEFAULT_IMAGE,
              width: 4,
              url: randInterior().url,
            }
          ]
        },
      ]
    },
    author: userId,
    comments: [4, 5],
    createdAt: dateformat("d mmm yyyy"),
  }
]