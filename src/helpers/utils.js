let Utils = function () { }

Utils.scrollTop = () => {
  let root = document.getElementById("root");
  if (!root) return;
  root.scrollIntoView();
}

export default Utils;