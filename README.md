# 农蕊 · 个人简历网站

深色（#0C0C0C）单页落地页，纯静态（HTML + CSS + 少量原生 JS），可一键部署到 GitHub Pages。
视觉风格参照 3D Creator 作品集落地页：渐变巨型标题、磁性头像、滚动跑马灯、逐字浮现、白底"我擅长的"服务区、深色项目叠层卡片。内容为本人的真实简历（经济学 / 音乐内容运营 / 新媒体运营）。

## 本地预览

```bash
python -m http.server 8000
# 然后访问 http://localhost:8000
```

## 结构

```
index.html        # 单页长滚动：Hero / 跑马灯 / 关于我 / 我擅长的 / 项目 / 作品 / 联系
assets/
  style.css       # 全站样式（深色主题，渐变与按钮变量集中在 :root）
  script.js       # 交互：FadeIn / Magnet / 跑马灯 / 逐字浮现 / 卡片叠层
  avatar.jpg      # 头像
  works/          # 作品素材（AIGC 短片、瓦喵项目图、短片封面）
.gitignore
README.md
```

## 线上访问

**https://rui-20051006.github.io/nongrui/**

## 部署到 GitHub Pages

仓库（<https://github.com/rui-20051006/nongrui>）**Settings → Pages** 中选择 `Deploy from a branch`、分支 `main`、目录 `/(root)`，保存后约 1 分钟生效。

### 更新线上内容

- 在本目录提交后推送到 `origin`（即 `rui-20051006/nongrui`）：

```bash
git add -A && git commit -m "更新内容" && git push origin main
```

- 或让我把改动推上去：提供仓库的 classic / fine-grained PAT（权限 `Contents: Read and write`）后，可直接调用 GitHub API 推送，无需本地 Git 凭据。

> 注意：旧仓库 `nongrui-resume` 的 GitHub Pages 已关闭，旧链接已 404。
