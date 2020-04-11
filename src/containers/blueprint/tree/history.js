import storage from 'helpers/storage';

const INDEX_KEY = 'treeRootIndex';
const TREE_ROOT_KEY = 'treeRootStack';
const MAX_HISTORY = 10;

class TreeHistory {
  constructor() {
    this.treeRootIndex = typeof (storage.get(INDEX_KEY)) !== 'number' ? -1 : storage.get(INDEX_KEY);
    this.treeRootStack = storage.get(TREE_ROOT_KEY) || [];
  }

  __storeTreeRootIndex = () => {
    storage.set(INDEX_KEY, this.treeRootIndex);
  }

  __storeTreeRootStack = () => {
    storage.set(TREE_ROOT_KEY, this.treeRootStack);
  }

  __storeAll = () => {
    this.__storeTreeRootIndex();
    this.__storeTreeRootStack();
  }

  __getTreeRoot = () => {
    const desiredRoot = this.treeRootStack[this.treeRootIndex];
    if (!desiredRoot || typeof desiredRoot !== 'object') return null;
    let root = JSON.parse(JSON.stringify(desiredRoot));
    return root;
  }

  addHistory = (tree) => {
    const root = JSON.parse(JSON.stringify(tree.root));
    // Remove stale history
    while (this.treeRootStack.length > this.treeRootIndex + 1) {
      this.treeRootStack.pop();
    }
    // Stack new history
    if (this.treeRootStack.length < MAX_HISTORY) {
      this.treeRootStack.push(root);
      this.treeRootIndex += 1;
    }
    else {
      this.treeRootStack.shift();
      this.treeRootStack.push(root);
    }
    // Store all
    this.__storeAll();
    return this.__getTreeRoot();
  }

  undo = () => {
    this.treeRootIndex -= 1;
    if (this.treeRootIndex < 0)
      this.treeRootIndex = 0;
    this.__storeTreeRootIndex();
    return this.__getTreeRoot();
  }

  redo = () => {
    this.treeRootIndex += 1;
    if (this.treeRootIndex > this.treeRootStack.length - 1)
      this.treeRootIndex = this.treeRootStack.length - 1;
    this.__storeTreeRootIndex();
    return this.__getTreeRoot();
  }

  clearHistory = () => {
    this.treeRootIndex = -1;
    this.treeRootStack = [];
    storage.clear(INDEX_KEY);
    storage.clear(TREE_ROOT_KEY);
  }
}

export default TreeHistory;