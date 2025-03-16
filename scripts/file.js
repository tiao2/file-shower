// scripts/file.js
class FileSystem {
    constructor() {
        this.basePath = '/files';
        this.init();
    }

    init() {
        this.pathNav = document.getElementById('pathNav');
        this.fileList = document.getElementById('fileList');
        this.currentPath = [];
        
        this.setupEventListeners();
        this.loadFiles();
    }

    async loadFiles() {
        try {
            const response = await fetch(`${this.basePath}/${this.currentPath.join('/')}/index.html`);
            const text = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(text, 'text/html');
            
            this.renderPath();
            this.renderFiles(
                [...doc.getElementsByTagName('files')],
                [...doc.getElementsByTagName('folders')]
            );
        } catch (error) {
            console.error('加载失败:', error);
        }
    }

    renderPath() {
        const segments = this.currentPath;
        this.pathNav.innerHTML = segments.reduce((acc, cur, index) => {
            const path = segments.slice(0, index + 1).join('/');
            return acc + `
                <span class="path-segment" data-path="${path}">
                    ${cur} /
                </span>
            `;
        }, '<span class="path-segment" data-path="/">根目录</span>');
    }

    renderFiles(files, folders) {
        this.fileList.innerHTML = [
            ...folders.map(folder => this.createFolderItem(folder)),
            ...files.map(file => this.createFileItem(file))
        ].join('');
    }

    createFolderItem(folder) {
        return `
            <div class="file-item" data-type="folder" data-name="${folder.textContent}">
                <div class="file-actions">
                    <button onclick="copyPath('${folder.textContent}')">📋</button>
                </div>
                <div class="folder-icon file-icon">📁</div>
                <div class="file-name">${folder.textContent}</div>
            </div>
        `;
    }

    createFileItem(file) {
        return `
            <div class="file-item" data-type="file" data-name="${file.textContent}">
                <div class="file-actions">
                    <button onclick="downloadFile('${file.textContent}')">⬇️</button>
                    <button onclick="copyPath('${file.textContent}')">📋</button>
                </div>
                <div class="file-icon">📄</div>
                <div class="file-name">${file.textContent}</div>
            </div>
        `;
    }

    setupEventListeners() {
        this.pathNav.addEventListener('click', (e) => {
            if (e.target.classList.contains('path-segment')) {
                const newPath = e.target.dataset.path === '/' ? 
                    [] : 
                    e.target.dataset.path.split('/').filter(Boolean);
                
                if (newPath.join('/') !== this.currentPath.join('/')) {
                    this.currentPath = newPath;
                    this.loadFiles();
                }
            }
        });

        this.fileList.addEventListener('click', (e) => {
            const item = e.target.closest('.file-item');
            if (item?.dataset.type === 'folder') {
                this.currentPath.push(item.dataset.name);
                this.loadFiles();
            }
        });
    }
}

// 工具函数
function copyPath(name) {
    const fullPath = [window.location.origin, 'files', ...fileSystem.currentPath, name].join('/');
    navigator.clipboard.writeText(fullPath);
}

async function downloadFile(name) {
    const path = [...fileSystem.currentPath, name].join('/');
    const response = await fetch(`/files/${path}`);
    const blob = await response.blob();
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = name;
    link.click();
}

// 初始化系统
const fileSystem = new FileSystem();
