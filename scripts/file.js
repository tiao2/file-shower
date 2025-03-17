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
  el.innerHTML = '<i class="fas fa-file file file-icon"></i>'+"&nbsp;&nbsp;"+block.innerHTML;
  return el;
});

var style = document.createElement('style');
style.textContent =atob('LmJsb2NrLWZpbGVzIHsKICB3aWR0aDogMTAwJTsKICBoZWlnaHQ6IDUlOwogIGJhY2tncm91bmQtY29sb3I6ICNmNmY2ZjY7CiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIGJsYWNrOwogIHBhZGRpbmc6IDElIDElOwp9CgouYmxvY2stZmlsZXM6aG92ZXIgewogIGJhY2tncm91bmQtY29sb3I6ICNlZWU7Cn07');
document.head.appendChild(style);

document.addEventListener('click', function(event) {
  const clickedElement = event.target.closest('.file, .folder');
  if (clickedElement) {
    const text = clickedElement.innerText;
    window.postMessage({
      type: "open",
      path: ruwu(location.href+text)
   }, origin());
});

function ruwu(text) {
  const regex = /https:\/\/(\w+)\.github\.io\/.*?\/files/g;
  return text.replace(regex, '$1');
}

function origin(){
  const currentUrl = new URL(window.location.href);
  const pathname = currentUrl.pathname;
  const filesIndex = pathname.toLowerCase().indexOf('/files');
  if (filesIndex !== -1) {
    const basePath = pathname.substring(0, filesIndex);
    currentUrl.pathname = basePath.endsWith('/') ? basePath : basePath + '/';
    const baseUrl = currentUrl.toString();
    return baseUrl;
  }
}
