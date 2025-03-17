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
            const path = event.data.path;
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

function processPath(path) {
    try {
        const pathParts = path.split("/");
        const buttons = pathParts.map(part => {
            // 创建按钮元素
            const button = document.createElement("button");
            button.textContent = part;
            button.onclick = function() {
                handleClick(part);
            };
            // 返回按钮的 HTML 字符串
            return button.outerHTML;
        });
        return buttons.join(" / ");
    } catch (error) {
        console.error("Error processing path:", error);
        return "Error processing path";
    }
}

function handleClick(part) {
    // 处理按钮点击事件
    console.log("Clicked part:", part);
    // 在这里实现你的具体逻辑
    // 例如：p(part); // 如果 p 是你定义的函数
}

// 如果需要，可以在这里定义 p 函数
function p(part) {
    console.log("Handling part:", part);
    // 实现你的具体逻辑
}
