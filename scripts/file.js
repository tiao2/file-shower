function processCustomElements(tagName, processor) {
  const elements = document.getElementsByTagName(tagName);
  Array.from(elements).forEach(element => {
    const newElement = processor(element);
    element.replaceWith(newElement);
  });
}

document.head.innerHTML+='<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">';

processCustomElements('folder', (block) => {
  const el = document.createElement('div');
  el.className = 'block-files';
  el.innerHTML = '<i class="fas fa-folder folder file-icon"></i>'+"&nbsp;&nbsp;"+block.innerHTML;
  return el;
});

processCustomElements('file', (block) => {
  const el = document.createElement('div');
  el.className = 'block-files';
  el.innerHTML = '<i class="fas fa-file file file-icon"></i>'+block.innerHTML;
  return el;
});

var style = document.createElement('style');
style.textContent =atob('LmJsb2NrLWZpbGVzIHsKICB3aWR0aDogMTAwJTsKICBoZWlnaHQ6IDUlOwogIGJhY2tncm91bmQtY29sb3I6ICNmNmY2ZjY7Cn0KCi5ibG9jay1maWxlczpob3ZlciB7CiAgYmFja2dyb3VuZC1jb2xvcjogI2VlZTsKfTs=');
document.head.appendChild(style);
