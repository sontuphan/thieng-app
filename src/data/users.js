import designerImg2 from 'static/images/designer-2.jpg';
import designerImg3 from 'static/images/designer-3.jpg';
import designerImg4 from 'static/images/designer-4.jpg';

const UserSchema = [
  {
    id: 0,
    displayname: "Remy Sharp",
    code: 'remy-sharp',
    email: 'remy@gmail.com',
    avatar: designerImg4,
    link: '/user/remy-sharp',
  },
  {
    id: 1,
    displayname: 'Bob',
    code: 'bob',
    email: 'bob@gmail.com',
    avatar: designerImg2,
    link: '/user/bob',
  },
  {
    id: 2,
    displayname: 'Alice',
    code: 'alice',
    email: 'alice@gmail.com',
    avatar: designerImg3,
    link: '/user/alice',
  }
]

export default UserSchema;