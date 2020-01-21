let Utils = function () { }

Utils.scrollTop = () => {
  let root = document.getElementById("root");
  if (!root) return;
  root.scrollIntoView();
}

Utils.onTheEnd = (cb) => {
  window.onscroll = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight)
      return cb();
  }
}


export default Utils;