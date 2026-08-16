# JuJoo Phone PWA 修复包

## 直接上传，不用改任何代码

index.html 已经帮你恢复成原版并加好了 manifest 链接，直接全部上传覆盖就行。

## 包里的文件
- `index.html` — 你的原版小手机页面（已恢复，已加 manifest 链接）
- `manifest.json` — PWA 配置
- `sw-notify-only.js` — 替换原版，加了 fetch 透传（满足安装条件，不缓存不白屏）
- `icon-192.png` — 米菲兔图标 192px
- `icon-512.png` — 米菲兔图标 512px

## 操作步骤

1. 把这 5 个文件全部上传到你的仓库根目录（https://github.com/ujezuqu611-ux/JuJoo）
2. index.html 和 sw-notify-only.js 会覆盖原来的，直接确认覆盖
3. 上传完等 1-2 分钟让 GitHub Pages 部署
4. 用 Edge 打开 ujezuqu611-ux.github.io
5. 地址栏右边出现「安装」图标 → 点它 → 弹出「安装应用」→ 安装到桌面

## 如果还是显示「创建快捷方式」
- 清浏览器缓存再试
- 或者无痕模式打开
- 确认 https://ujezuqu611-ux.github.io/manifest.json 能直接打开看到 JSON
