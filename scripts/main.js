// 安全改进：使用 DocumentFragment 替代 innerHTML
function processPath(path) {
    const fragment = document.createDocumentFragment();
    const separator = document.createTextNode(" / ");
    
    path.split("/").forEach((part, index) => {
        if (index > 0) fragment.appendChild(separator.cloneNode());
        
        const button = document.createElement("button");
        button.textContent = part; // 使用 textContent 防止 XSS
        button.className = "path-button"; // 添加样式类
        button.addEventListener("click", () => handleClick(part));
        fragment.appendChild(button);
    });

    const container = document.getElementById("path");
    container.innerHTML = ""; // 清空原有内容
    container.appendChild(fragment);
}

// 功能完善：更新 iframe 内容
function updateFileViewer(path) {
    const iframe = document.getElementById("fileViewer");
    iframe.src = `files/${encodeURIComponent(path)}`; // 安全编码路径
}

// 示例：增强 handleClick
function handleClick(part) {
    console.log("Clicked part:", part);
    updateFileViewer(part); // 假设与路径更新逻辑关联
    // p(part); // 根据实际需求调用
}
