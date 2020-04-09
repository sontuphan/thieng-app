import { getRandId } from './id';
import {
  DEFAULT_ROOT,
  DEFAULT_CONTAINER,
  DEFAULT_IMAGE,
  DEFAULT_VIDEO,
  DEFAULT_TEXT,
  DEFAULT_DRAIN,
} from './constants';
import {
  validateContainerWidth,
  validateContainerJustify,
  validateContainerAlignItems,
  validateImageUrl,
  validateVideoUrl,
  validateTextContent,
  validateTextVariant,
  validateDrainHeight,
} from './validation';


/**
 * Tree creates a recursive tree for quick rendering
 */

class Tree {
  constructor(blueprintObject) {
    if (blueprintObject) {
      this.root = blueprintObject;
    }
    else {
      this.addRoot();
    }
  }

  debug() {
    const rootId = Object.keys(this.root)[0];
    const containerId1 = this.addContainer(rootId, 12);
    const containerId11 = this.addContainer(containerId1, 6, 'center');
    const containerId12 = this.addContainer(containerId1, 6, 'center');
    const containerId2 = this.addContainer(rootId, 12, 'center', 'center');
    this.addImage(containerId11, 'https://source.unsplash.com/random');
    this.addVideo(containerId12, 'https://youtu.be/QosiU0JR_h8');
    this.addText(containerId2, 'body1', 'Hello world');

    console.log(this.root);
  }

  __createRoot = () => {
    const id = getRandId();
    const obj = {
      type: DEFAULT_ROOT.type,
      children: [],
    }
    return { id, obj }
  }

  __createContainer = (width = DEFAULT_CONTAINER.width,
    justify = DEFAULT_CONTAINER.justify,
    alignItems = DEFAULT_CONTAINER.alignItems
  ) => {
    if (!validateContainerWidth(width)) return null;
    if (!validateContainerJustify(justify)) return null;
    if (!validateContainerAlignItems(alignItems)) return null;
    const id = getRandId();
    const obj = {
      type: DEFAULT_CONTAINER.type,
      width,
      justify,
      alignItems,
      children: [],
    }
    return { id, obj }
  }

  __createImage = (url) => {
    if (!validateImageUrl(url)) return null;
    const id = getRandId();
    const obj = {
      type: DEFAULT_IMAGE.type,
      url,
    }
    return { id, obj }
  }

  __createVideo = (url) => {
    if (!validateVideoUrl(url)) return null;
    const id = getRandId();
    const obj = {
      type: DEFAULT_VIDEO.type,
      url,
    }
    return { id, obj }
  }

  __createText = (variant = DEFAULT_TEXT.variant, content) => {
    if (!validateTextVariant(variant)) return null;
    if (!validateTextContent(content)) return null;
    const id = getRandId();
    const obj = {
      type: DEFAULT_TEXT.type,
      variant,
      content,
    }
    return { id, obj }
  }

  __createDrain = (height = DEFAULT_DRAIN.height) => {
    if (!height) return null;
    if (!validateDrainHeight(height)) return null;
    const id = getRandId();
    const obj = {
      type: DEFAULT_DRAIN.type,
      height,
    }
    return { id, obj }
  }

  addRoot = () => {
    const { id, obj } = this.__createRoot();
    this.root = {}
    this.root[id] = obj;
  }

  addContainer = (parentId, width, justify, alignItems) => {
    const container = this.__createContainer(width, justify, alignItems);
    if (!container) return console.error('Invalid container');
    this.root[parentId].children.push(container.id);
    this.root[container.id] = container.obj;
    return container.id;
  }

  addImage = (parentId, url) => {
    const image = this.__createImage(url);
    if (!image) return console.error('Invalid image');
    this.root[parentId].children.push(image.id);
    this.root[image.id] = image.obj;
    return image.id;
  }

  addVideo = (parentId, url) => {
    const video = this.__createVideo(url);
    if (!video) return console.error('Invalid video');
    this.root[parentId].children.push(video.id);
    this.root[video.id] = video.obj;
    return video.id;
  }

  addText = (parentId, variant, content) => {
    const text = this.__createText(variant, content);
    if (!text) return console.error('Invalid text');
    this.root[parentId].children.push(text.id);
    this.root[text.id] = text.obj;
    return text.id;
  }
}

export default Tree;