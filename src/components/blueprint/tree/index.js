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
  validateTextContents,
  validateTextVariant,
  validateTextAlign,
  validateDrainHeight,
} from './validation';


/**
 * Tree creates a recursive tree for quick rendering
 */

class Tree {
  constructor(treeRoot) {
    if (treeRoot) {
      this.root = treeRoot;
    }
    else {
      this.addRoot();
    }
  }

  /**
   * Common UI
   */

  getRootId = () => {
    for (let id in this.root) {
      let node = this.root[id];
      if (node.type === 'root') return id;
    }
  }

  getNode = (id) => {
    return this.root[id];
  }

  deleteNode = (id) => {
    // Delete it in parent
    Object.keys(this.root).forEach(nodeId => {
      let node = this.root[nodeId]
      if (!node.children) return;
      node.children = node.children.filter(childId => childId !== id);
    });
    // Delete its children
    if (this.root[id].children) {
      this.root[id].children.forEach(childId => this.deleteNode(childId));
    }
    // Delete itself
    delete this.root[id];
  }


  /**
   * Root interaction
   */

  __createRoot = () => {
    const id = getRandId();
    const obj = {
      type: DEFAULT_ROOT.type,
      children: [],
    }
    return { id, obj }
  }

  addRoot = () => {
    const { id, obj } = this.__createRoot();
    this.root = {}
    this.root[id] = obj;
  }

  editRoot = () => {
    // Empty
  }

  deleteRoot = () => {
    // Empty
  }


  /**
   * Container interaction
   */

  __createContainer = (
    width = DEFAULT_CONTAINER.width,
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

  addContainer = (parentId, width, justify, alignItems) => {
    const container = this.__createContainer(width, justify, alignItems);
    if (!container) return console.error('Invalid container');
    this.root[parentId].children.push(container.id);
    this.root[container.id] = container.obj;
    return container.id;
  }

  editContainer = (id, width, justify, alignItems) => {
    if (!this.root[id]) return null;
    if (this.root[id].type !== DEFAULT_CONTAINER.type) return null;
    if (!validateContainerWidth(width)) return null;
    if (!validateContainerJustify(justify)) return null;
    if (!validateContainerAlignItems(alignItems)) return null;
    this.root[id] = { ...this.root[id], width, justify, alignItems }
    return id;
  }

  deleteContainer = (id) => {
    this.deleteNode(id);
  }


  /**
   * Image interaction
   */

  __createImage = (url = DEFAULT_IMAGE.url) => {
    if (!validateImageUrl(url)) return null;
    const id = getRandId();
    const obj = {
      type: DEFAULT_IMAGE.type,
      url,
    }
    return { id, obj }
  }

  addImage = (parentId, url) => {
    const image = this.__createImage(url);
    if (!image) return console.error('Invalid image');
    this.root[parentId].children.push(image.id);
    this.root[image.id] = image.obj;
    return image.id;
  }

  editImage = (id, url) => {
    if (!this.root[id]) return null;
    if (this.root[id].type !== DEFAULT_IMAGE.type) return null;
    if (!validateImageUrl(url)) return null;
    this.root[id] = { ...this.root[id], url }
    return id;
  }

  deleteImage = (id) => {
    this.deleteNode(id);
  }


  /**
   * Video interaction
   */

  __createVideo = (url = DEFAULT_VIDEO.url) => {
    if (!validateVideoUrl(url)) return null;
    const id = getRandId();
    const obj = {
      type: DEFAULT_VIDEO.type,
      url,
    }
    return { id, obj }
  }

  addVideo = (parentId, url) => {
    const video = this.__createVideo(url);
    if (!video) return console.error('Invalid video');
    this.root[parentId].children.push(video.id);
    this.root[video.id] = video.obj;
    return video.id;
  }

  editVideo = (id, url) => {
    if (!this.root[id]) return null;
    if (this.root[id].type !== DEFAULT_VIDEO.type) return null;
    if (!validateVideoUrl(url)) return null;
    this.root[id] = { ...this.root[id], url }
    return id;
  }

  deleteVideo = (id) => {
    this.deleteNode(id);
  }


  /**
   * Text interaction
   */

  __createText = (
    variant = DEFAULT_TEXT.variant,
    align = DEFAULT_TEXT.align,
    contents = DEFAULT_TEXT.contents
  ) => {
    if (!validateTextVariant(variant)) return null;
    if (!validateTextAlign(align)) return null;
    if (!validateTextContents(contents)) return null;
    const id = getRandId();
    const obj = {
      type: DEFAULT_TEXT.type,
      variant,
      align,
      contents,
    }
    return { id, obj }
  }

  addText = (parentId, variant, align, contents) => {
    const text = this.__createText(variant, align, contents);
    if (!text) return console.error('Invalid text');
    this.root[parentId].children.push(text.id);
    this.root[text.id] = text.obj;
    return text.id;
  }

  editText = (id, variant, align, contents) => {
    if (!this.root[id]) return null;
    if (this.root[id].type !== DEFAULT_TEXT.type) return null;
    if (!validateTextVariant(variant)) return null;
    if (!validateTextAlign(align)) return null;
    if (!validateTextContents(contents)) return null;
    this.root[id] = { ...this.root[id], variant, align, contents }
    return id;
  }

  deleteText = (id) => {
    this.deleteNode(id);
  }


  /**
   * Drain interaction
   */

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

  addDrain = (parentId, height) => {
    const drain = this.__createDrain(height);
    if (!drain) return console.error('Invalid drain');
    this.root[parentId].children.push(drain.id);
    this.root[drain.id] = drain.obj;
    return drain.id;
  }

  editDrain = (id, height) => {
    if (!this.root[id]) return null;
    if (this.root[id].type !== DEFAULT_DRAIN.type) return null;
    if (!validateDrainHeight(height)) return null;
    this.root[id] = { ...this.root[id], height }
    return id;
  }

  deleteDrain = (id) => {
    this.deleteNode(id);
  }
}

export default Tree;