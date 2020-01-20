import { loremIpsum } from "lorem-ipsum";
import dateformat from 'dateformat';

const CommentSchema = [
  {
    id: 0,
    item: 0,
    user: 1,
    comment: loremIpsum({ units: "paragraphs" }),
    createdAt: dateformat()
  },
  {
    id: 1,
    item: 0,
    user: 2,
    comment: loremIpsum({ units: "paragraphs" }),
    createdAt: dateformat()
  },
  {
    id: 2,
    item: 1,
    user: 1,
    comment: loremIpsum({ units: "paragraphs" }),
    createdAt: dateformat()
  },
  {
    id: 3,
    item: 1,
    user: 2,
    comment: loremIpsum({ units: "paragraphs" }),
    createdAt: dateformat()
  }
]

export default CommentSchema;