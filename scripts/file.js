// 定义一个函数来处理自定义元素
function processCustomElements(tagName, processor) {
  // 使用 document.querySelectorAll 替代 getElementsByTagName，更符合语义且返回的是静态节点列表
  const elements = document.querySelectorAll(tagName);
  // 使用 Array.from 将 NodeList 转换为数组，便于使用数组方法
  Array.from(elements).forEach(element => {
    // 处理每个元素并替换
    const newElement = processor(element);
    if (newElement && newElement instanceof HTMLElement) {
      element.replaceWith(newElement);
    }
  });
}

// 动态添加 Font Awesome 样式表
function addFontAwesomeStylesheet() {
  return new Promise((resolve, reject) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css';
    link.onload = resolve;
    link.onerror = (error) => {
      console.error('Failed to load Font Awesome CSS:', error);
      reject(error);
    };
    document.head.appendChild(link);
  });
}

// 处理文件夹元素
function processFolderElements() {
  return processCustomElements('folder', (block) => {
    return createFileElement(block, 'folder', 'fas fa-folder');
  });
}

// 处理文件元素
function processFileElements() {
  return processCustomElements('file', (block) => {
    return createFileElement(block, 'file', 'fas fa-file');
  });
}

// 创建文件或文件夹元素的通用函数
function createFileElement(block, className, iconClass) {
  const el = document.createElement('div');
  el.className = `block-files ${className}`;
  // 使用模板字符串替代字符串拼接，提高可读性
  el.innerHTML = `<i class="${iconClass} file-icon"></i> &nbsp;&nbsp; ${block.innerHTML}`;
  return el;
}

// 添加自定义样式
function addCustomStyles() {
  const style = document.createElement('style');
  // 解码并设置样式内容
  style.textContent = atob('LmJsb2NrLWZpbGVzIHsKICB3aWR0aDogMTAwJTsKICBoZWlnaHQ6IDUlOwogIGJhY2tncm91bmQtY29sb3I6ICNmNmY2ZjY7CiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIGJsYWNrOwogIHBhZGRpbmc6IDElIDElOwp9CgouYmxvY2stZmlsZXM6aG92ZXIgewogIGJhY2tncm91bmQtY29sb3I6ICNlZWU7Cn07');
  document.head.appendChild(style);
}

// 处理点击事件
function setupClickHandler() {
  document.addEventListener('click', (event) => {
    const clickedElement = event.target.closest('.block-files');
    if (clickedElement) {
      const text = clickedElement.innerText.trim();
      if (text) {
        const path = ruwu(location.href + text);
        window.postMessage({
          type: "open",
          path: path
        }, origin());
      }
    }
  });
}

// 处理路径的函数
function ruwu(text) {
  const regex = /https:\/\/(\w+)\.github\.io\/.*?\/files/g;
  return text.replace(regex, '$1');
}

// 获取基础 URL 的函数
function origin() {
  const currentUrl = new URL(window.location.href);
  const pathname = currentUrl.pathname;
  const filesIndex = pathname.toLowerCase().indexOf('/files');
  if (filesIndex !== -1) {
    let basePath = pathname.substring(0, filesIndex);
    if (!basePath.endsWith('/')) {
      basePath += '/';
    }
    currentUrl.pathname = basePath;
    return currentUrl.toString();
  }
  return window.location.origin;
}

// 主函数，按顺序初始化各项功能
async function init() {
  try {
    await addFontAwesomeStylesheet();
    processFolderElements();
    processFileElements();
    addCustomStyles();
    setupClickHandler();
    console.log('Custom elements processing initialized successfully.');
  } catch (error) {
    console.error('Error initializing custom elements processing:', error);
  }
}

// 执行初始化
init();
