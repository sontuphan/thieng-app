import { getRandId } from './id';
import {
  DEFAULT_ROOT,
  DEFAULT_CONTAINER,
  DEFAULT_IMAGE,
  DEFAULT_VIDEO
} from './constants';
import {
  validateContainerWidth,
  validateContainerJustify,
  validateContainerAlign,
  validateImageUrl,
  validateVideoUrl,
} from './validation';


/**
 * Blueprint - the recursive rendering for status
 */

class Blueprint {
  constructor(blueprintObject) {
    if (blueprintObject) {
      this.root = blueprintObject;
    }
    else {
      const { id, obj } = this.createRoot();
      this.root = {}
      this.root[id] = obj;
    }
  }

  debug() {
    const rootId = Object.keys(this.root)[0];

    const container = this.createContainer(2, 'flex-end', 'baseline');
    if (!container) return console.error('Invalid container');
    this.root[rootId].children.push(container.id);
    this.root[container.id] = container.obj;

    const image = this.createImage('https://source.unsplash.com/random');
    if (!image) return console.error('Invalid image');
    this.root[container.id].children.push(image.id);
    this.root[image.id] = image.obj;

    const video = this.createVideo('https://youtu.be/QosiU0JR_h8');
    if (!video) return console.error('Invalid video');
    this.root[container.id].children.push(video.id);
    this.root[video.id] = video.obj;

    console.log(this.root);
  }

  createRoot = () => {
    const id = getRandId();
    const obj = {
      type: DEFAULT_ROOT.type,
      children: [],
    }
    return { id, obj }
  }

  createContainer = (width = DEFAULT_CONTAINER.width, justify = DEFAULT_CONTAINER.justify, align = DEFAULT_CONTAINER.align) => {
    if (!validateContainerWidth(width)) return null;
    if (!validateContainerJustify(justify)) return null;
    if (!validateContainerAlign(align)) return null;
    const id = getRandId();
    const obj = {
      type: DEFAULT_CONTAINER.type,
      width,
      justify,
      align,
      children: [],
    }
    return { id, obj }
  }

  createImage = (url) => {
    if (!validateImageUrl(url)) return null;
    const id = getRandId();
    const obj = {
      type: DEFAULT_IMAGE.type,
      url,
    }
    return { id, obj }
  }

  createVideo = (url) => {
    if (!validateVideoUrl(url)) return null;
    const id = getRandId();
    const obj = {
      type: DEFAULT_VIDEO.type,
      url,
    }
    return { id, obj }
  }
}

export default Blueprint;