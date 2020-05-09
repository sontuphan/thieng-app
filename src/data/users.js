import designerImg2 from 'static/images/designer-2.jpg';
import designerImg3 from 'static/images/designer-3.jpg';
import designerImg4 from 'static/images/designer-4.jpg';

const UserSchema = [
  {
    id: 0,
    displayname: "Phan Son Tu",
    code: 'remy-sharp',
    email: 'sontu_snowboy_teen@yahoo.com.vn',
    avatar: designerImg4,
    link: '/user/sontu_snowboy_teen@yahoo.com.vn',
    hearts: 13573,
    products: 53,
  },
  {
    id: 1,
    displayname: 'Bob',
    code: 'bob',
    email: 'bob@gmail.com',
    avatar: designerImg2,
    link: '/user/bob',
    hearts: 53573,
    products: 51,
  },
  {
    id: 2,
    displayname: 'Alice',
    code: 'alice',
    email: 'alice@gmail.com',
    avatar: designerImg3,
    link: '/user/alice',
    hearts: 58573,
    products: 12,
  }
]

export default UserSchema;