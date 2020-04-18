import { loremIpsum } from 'lorem-ipsum';
import dateformat from 'dateformat';


const EventSchema = [
  {
    id: 0,
    topic: loremIpsum({ units: "sentences" }),
    eventImage: "https://source.unsplash.com/featured/?interior/0",
    createdAt: dateformat("d mmmm yyyy"),
    read: true,
  },
  {
    id: 1,
    topic: loremIpsum({ units: "sentences" }),
    eventImage: "https://source.unsplash.com/featured/?interior/1",
    createdAt: dateformat("d mmmm yyyy"),
    read: false,
  },
  {
    id: 2,
    topic: loremIpsum({ units: "sentences" }),
    eventImage: null,
    createdAt: dateformat("d mmmm yyyy"),
    read: false,
  },
  {
    id: 3,
    topic: loremIpsum({ units: "sentences" }),
    eventImage: null,
    createdAt: dateformat("d mmmm yyyy"),
    read: true,
  },
  {
    id: 4,
    topic: loremIpsum({ units: "sentences" }),
    eventImage: "https://source.unsplash.com/featured/?interior/4",
    createdAt: dateformat("d mmmm yyyy"),
    read: false,
  },
]

export default EventSchema;