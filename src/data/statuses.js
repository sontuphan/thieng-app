import { loremIpsum } from "lorem-ipsum";
import dateformat from 'dateformat';

export default StatusSchema = [
  {
    id: 0,
    item: 0,
    status: loremIpsum(),
    createdAt: dateformat()
  },
  {
    id: 1,
    item: 1,
    status: loremIpsum(),
    createdAt: dateformat()
  }
]