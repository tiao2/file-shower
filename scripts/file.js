// 安全改进：为 Font Awesome 添加 SRI 校验
function addFontAwesomeStylesheet() {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css';
    link.integrity = 'sha512-...'; // 添加实际 SRI Hash
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
}

// 功能修复：优化路径处理正则
function ruwu(text) {
    // 匹配更严谨的路径格式（示例）
    const regex = /https?:\/\/([\w-]+)\.github\.io\/[^/]+\/files/gi;
    return text.replace(regex, '$1');
}

// 逻辑优化：使用事件委托提高性能
function setupClickHandler() {
    document.addEventListener('click', (event) => {
        const target = event.target.closest('.block-files');
        if (!target) return;
        
        const text = target.textContent.trim(); // 使用 textContent
        if (text) {
            const path = ruwu(text);
            window.parent.postMessage({ // 明确指定父窗口
                type: "open",
                path: path
            }, window.origin); // 使用标准 origin
        }
    });
}

const style = document.createElement('style');
  // 解码并设置样式内容
  style.textContent = atob('LmJsb2NrLWZpbGVzIHsKICB3aWR0aDogMTAwJTsKICBoZWlnaHQ6IDUlOwogIGJhY2tncm91bmQtY29sb3I6ICNmNmY2ZjY7CiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIGJsYWNrOwogIHBhZGRpbmc6IDElIDElOwp9CgouYmxvY2stZmlsZXM6aG92ZXIgewogIGJhY2tncm91bmQtY29sb3I6ICNlZWU7Cn07');
  document.head.appendChild(style);
