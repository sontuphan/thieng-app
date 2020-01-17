import designerImg2 from 'static/images/designer-2.jpg';
import designerImg3 from 'static/images/designer-3.jpg';
import designerImg4 from 'static/images/designer-4.jpg';

import product from 'static/images/product.png';
import interior1 from 'static/images/interior-1.jpg';
import interior2 from 'static/images/interior-2.jpg';
import interior3 from 'static/images/interior-3.jpg';
import interior4 from 'static/images/interior-4.jpg';

import chair from 'static/images/chair.png';
import interior5 from 'static/images/interior-5.jpg';
import interior6 from 'static/images/interior-6.jpg';
import interior7 from 'static/images/interior-7.jpg';
import interior8 from 'static/images/interior-8.jpg';

let Utils = function () { }

Utils.scrollTop = () => {
  let root = document.getElementById("root");
  if (!root) return;
  root.scrollIntoView();
}

Utils.dummy = () => {
  return [
    {
      id: 0,
      name: "Tellus lacus vitae nisl.",
      description1: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sem amet sem mus in in fermentum gravida id luctus.",
      description2: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum urna tempus adipiscing amet dignissim.",
      price: "6.490.000",
      unit: "vnd",
      tags: ["New", "20%"],
      images: [
        { url: product, type: 'png', color: "#B28B67" },
        { url: interior1, type: 'jpg', color: "#915B3C" },
        { url: interior2, type: 'jpg', color: "#1C1D1A" },
        { url: interior3, type: 'jpg', color: null },
        { url: interior4, type: 'jpg', color: null },
        { url: interior5, type: 'jpg', color: null },
      ],
      author: {
        displayname: "Remy Sharp lajsdb asnbli asdbkl",
        avatar: designerImg4,
        link: '/user/remy-sharp'
      },
      comments: [
        {
          user: {
            displayname: 'Bob',
            email: 'bob@gmail.com',
            link: '/user/bob',
            avatar: designerImg2
          },
          comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Felis vel consectetur amet, felis. Ullamcorper est lectus faucibus augue feugiat maecenas sed id. Ornare sit egestas eget luctus aenean malesuada a. Feugiat gravida aenean quam ante purus erat interdum orci. Et vel ut sit ut tristique. In vel fusce suspendisse sit enim aliquam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet turpis sed gravida amet. Luctus sed parturient lacus vestibulum nisl neque. Vehicula risus tellus viverra cursus et. Porta arcu tincidunt enim ut platea in amet, at. Aliquet risus sem arcu pretium rutrum. Sit enim nec viverra sapien semper imperdiet. A cursus."
        },
        {
          user: {
            displayname: 'Alice',
            email: 'alice@gmail.com',
            link: '/user/alice',
            avatar: designerImg3
          },
          comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum urna tempus adipiscing amet dignissim."
        }
      ]
    }, {
      id: 1,
      name: "Elementum urna tempus.",
      description1: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sem amet sem mus in in fermentum gravida id luctus.",
      description2: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum urna tempus adipiscing amet dignissim.",
      price: "1.990.000",
      unit: "vnd",
      tags: ["Best Seller", "25%", "Artist Choice"],
      images: [
        { url: chair, type: 'png', color: "#1C1D1A" },
        { url: interior6, type: 'jpg', color: "#B28B67" },
        { url: interior7, type: 'jpg', color: "#915B3C" },
        { url: interior8, type: 'jpg', color: null },
      ],
      author: {
        displayname: "Remy Sharp",
        avatar: designerImg4,
        link: '/user/remy-sharp'
      },
      comments: [
        {
          user: {
            displayname: 'Bob',
            email: 'bob@gmail.com',
            link: '/user/bob',
            avatar: designerImg2
          },
          comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Felis vel consectetur amet, felis. Ullamcorper est lectus faucibus augue feugiat maecenas sed id. Ornare sit egestas eget luctus aenean malesuada a. Feugiat gravida aenean quam ante purus erat interdum orci. Et vel ut sit ut tristique. In vel fusce suspendisse sit enim aliquam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet turpis sed gravida amet. Luctus sed parturient lacus vestibulum nisl neque. Vehicula risus tellus viverra cursus et. Porta arcu tincidunt enim ut platea in amet, at. Aliquet risus sem arcu pretium rutrum. Sit enim nec viverra sapien semper imperdiet. A cursus."
        },
        {
          user: {
            displayname: 'Alice',
            email: 'alice@gmail.com',
            link: '/user/alice',
            avatar: designerImg3
          },
          comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum urna tempus adipiscing amet dignissim."
        }
      ]
    }
  ]
}

export default Utils;