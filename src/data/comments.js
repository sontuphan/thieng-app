import { loremIpsum } from 'lorem-ipsum';
import dateformat from 'dateformat';

const CommentSchema = [
  {
    id: 0,
    item: 0,
    user: 1,
    comment: loremIpsum({ units: "sentences" }),
    createdAt: dateformat("d mmmm yyyy")
  },
  {
    id: 1,
    item: 0,
    user: 2,
    comment: loremIpsum({ units: "sentences" }),
    createdAt: dateformat("d mmmm yyyy")
  },
  {
    id: 2,
    item: 1,
    user: 1,
    comment: loremIpsum({ units: "sentences" }),
    createdAt: dateformat("d mmmm yyyy")
  },
  {
    id: 3,
    item: 1,
    user: 2,
    comment: loremIpsum({ units: "sentences" }),
    createdAt: dateformat("d mmmm yyyy")
  },
  {
    id: 4,
    item: 2,
    user: 2,
    comment: loremIpsum({ units: "sentences" }),
    createdAt: dateformat("d mmmm yyyy")
  },
  {
    id: 5,
    item: 2,
    user: 1,
    comment: loremIpsum({ units: "sentences" }),
    createdAt: dateformat("d mmmm yyyy")
  }
]

export default CommentSchema;