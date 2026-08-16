# JuJoo Phone PWA 精简版

## 文件结构（共 4 个图标）

```
pwa-lite/
├── index.html          ← 示例页面
├── manifest.json       ← PWA 配置（必须）
├── sw.js               ← Service Worker（必须）
├── icons/
│   ├── icon-192.png        ← 普通图标 192px
│   ├── icon-512.png        ← 普通图标 512px
│   ├── icon-192-maskable.png  ← 自适应图标 192px
│   ├── icon-512-maskable.png  ← 自适应图标 512px
│   └── favicon.ico         ← 浏览器标签页图标
└── README.md
```

## 部署

1. 解压后所有文件上传到网站根目录
2. 已有 index.html 不想覆盖的话：把 manifest.json、sw.js、icons/ 传上去，然后往你现有 HTML 里加：
   - `<head>` 里加：`<link rel="manifest" href="manifest.json">` 和 `<meta name="theme-color" content="#ffc0cb">`
   - `</body>` 前加：`<script>if('serviceWorker'in navigator){window.addEventListener('load',()=>{navigator.serviceWorker.register('sw.js')})}</script>`
3. 推送部署

## 验证

Edge 打开网站 → 地址栏右侧出现安装图标 → 点它弹出「安装应用」→ 安装到桌面。

还是显示「创建快捷方式」就清浏览器缓存重试。
