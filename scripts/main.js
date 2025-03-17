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

window.addEventListener("message", receiveMessage, false);

function receiveMessage(event) {
    // 检查消息来源是否可信
    const allowedOrigins = [
        "https://tiao2.github.io" // 替换为你的可信来源
       // "http://localhost" // 本地开发环境
    ];

    if (!allowedOrigins.includes(event.origin)) {
        console.warn("Blocked message from untrusted origin:", event.origin);
        return;
    }

    try {
        if (event.data && event.data.type === "open") {
            const rawPath = event.data.path;
            const path = decodeURIComponent(rawPath); // 关键解码
            if (typeof path === "string") {
                const processedPath = processPath(path);
                document.getElementById("path").innerHTML = processedPath;
                event.source.postMessage("Receive Successfully", event.origin);
            } else {
                console.error("Invalid path format:", path);
            }
        } else {
            console.log("Received unknown message type:", event.data);
        }
    } catch (error) {
        console.error("Error handling message:", error);
    }
}
