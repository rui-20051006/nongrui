# 农蕊 · 个人简历网站

浅蓝莫兰迪配色的静态个人简历站，纯静态（HTML + CSS + 少量 JS），可一键部署到 GitHub Pages。
采用「主界面 + 子页面」结构：`index.html` 是入口主页，内容按板块拆分成独立子页面，而不是长页面一直下滑。

## 本地预览

直接用浏览器打开 `index.html` 即可；或在该目录下启动一个本地服务（推荐，多页面跳转更稳）：

```bash
python -m http.server 8000
# 然后访问 http://localhost:8000
```

## 结构

```
index.html        # 主界面（入口 + 各板块导航卡片）
about.html        # 关于我（简介 + 主修课程 / GPA / 荣誉 / 语言成绩 + 联系方式）
experience.html   # 实习与项目经历
research.html     # 竞赛与科研实践（含科研助理项目、数律智检关联开源项目）
student.html      # 学生工作经历
works.html        # 技能与作品（技能条 + 工具链 + 音乐企划作品）
assets/
  style.css       # 全站共享样式（浅蓝莫兰迪配色）
  avatar.jpg      # 头像
  works/          # 作品素材（AIGC 短片、瓦猫项目图）
.gitignore
README.md
```

配色变量集中在 `assets/style.css` 的 `:root` 中（主色 `--accent: #6f93b4`，点缀色 `--accent-2: #a87f93`），改配色只动这一处即可全站生效。

## 部署到 GitHub Pages

仓库 **Settings → Pages** 中选择 `Deploy from a branch`、分支 `main`、目录 `/(root)`，保存后约 1 分钟生效。
