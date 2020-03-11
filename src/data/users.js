import designerImg2 from 'static/images/designer-2.jpg';
import designerImg3 from 'static/images/designer-3.jpg';
import designerImg4 from 'static/images/designer-4.jpg';

const UserSchema = [
  {
    id: 0,
    userId: '55b2b9ec679467c92bae0344cc2dd6cc61c06d2a111845d87fb77f681fe7c7e7',
    displayname: "Remy Sharp",
    code: 'remy-sharp',
    email: 'remy@gmail.com',
    avatar: designerImg4,
    link: '/user/remy-sharp',
    hearts: 13573,
    products: 53,
  },
  {
    id: 1,
    userId: 1,
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
    userId: 2,
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