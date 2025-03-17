window.addEventListener("message", receiveMessage);

function receiveMessage(event) {
    try {
        if (event.data?.type === "open") {
            const rawPath = event.data.path;
            if (typeof rawPath !== "string") {
                console.error("Invalid path type:", typeof rawPath);
                return;
            }

            let decodedPath;
            try {
                decodedPath = decodeURIComponent(rawPath);
            } catch (e) {
                console.error("Path decode error:", e);
                return;
            }

            console.log("[Received] Path:", decodedPath);
            processPath(decodedPath);
            event.source.postMessage("Receive Successfully", event.origin);
        }
    } catch (error) {
        console.error("Error handling message:", error);
    }
}

function processPath(path) {
    const fragment = document.createDocumentFragment();
    const separator = document.createTextNode(" / ");
    var a=1;
    path.split("/").forEach((part, index) => {
        if (index > 0) fragment.appendChild(separator.cloneNode());
        const button = document.createElement("button");
        button.textContent = part || "/"; // 处理空路径段
        button.className = "path-button";
        var pt="";
        for(var b=0;b<a;b++){
            pt+=path.split("/")[b]+"/";
        };
        button.addEventListener("click", () => handleClick(pt));
        fragment.appendChild(button);
        a++;
    });

    const container = document.getElementById("path");
    container.innerHTML = "";
    container.appendChild(fragment);
}

function handleClick(part) {
    console.log("Clicked part:", part);
    updateFileViewer(part);
}

function updateFileViewer(path) {
    const iframe = document.getElementById("fileViewer");
    if(path.substr(0,6)=='tiao2/'){
        path=path.substr(6, path.length);
    }
    iframe.src = `files/${encodeURIComponent(path)}`;
}
