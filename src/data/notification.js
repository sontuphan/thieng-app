import { loremIpsum } from 'lorem-ipsum';
import dateformat from 'dateformat';

import designerImg2 from 'static/images/designer-2.jpg';
import designerImg3 from 'static/images/designer-3.jpg';
import designerImg4 from 'static/images/designer-4.jpg';

const NotificationSchema = [
  {
    id: 0,
    type: 'like',
    topic: loremIpsum({ units: "sentences" }),
    avatar: designerImg4,
    displayname: 'Karen',
    createdAt: dateformat("d mmmm yyyy"),
    read: true,
  },
  {
    id: 1,
    type: 'dislike',
    topic: loremIpsum({ units: "sentences" }),
    avatar: designerImg2,
    displayname: 'Alice',
    createdAt: dateformat("d mmmm yyyy"),
    read: false,
  },
  {
    id: 2,
    type: 'comment',
    topic: loremIpsum({ units: "sentences" }),
    avatar: designerImg3,
    displayname: 'Bob',
    createdAt: dateformat("d mmmm yyyy"),
    read: false,
  },
  {
    id: 3,
    type: 'others',
    topic: loremIpsum({ units: "sentences" }),
    avatar: designerImg3,
    displayname: 'Bob',
    createdAt: dateformat("d mmmm yyyy"),
    read: true,
  },
  {
    id: 4,
    type: 'comment',
    topic: loremIpsum({ units: "sentences" }),
    avatar: designerImg4,
    displayname: 'Karen',
    createdAt: dateformat("d mmmm yyyy"),
    read: false,
  },
  {
    id: 5,
    type: 'like',
    topic: loremIpsum({ units: "sentences" }),
    avatar: designerImg2,
    displayname: 'Alice',
    createdAt: dateformat("d mmmm yyyy"),
    read: true,
  }
]

export default NotificationSchema;