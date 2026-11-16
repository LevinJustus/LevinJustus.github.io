# Yuting Zou — Academic Homepage

英文为主的个人学术主页，支持中文切换、深浅主题、移动端布局和 PDF CV 下载。
纯静态 HTML/CSS/JavaScript，无需 Node.js、主题框架或构建流程。直接兼容 GitHub Pages。

## 发布到 GitHub Pages

1. 使用 GitHub 账号 `LevinJustus`，创建公开仓库 `LevinJustus.github.io`。
2. 将本目录中的网站文件上传到仓库根目录，确保根目录包含 `index.html`。
3. 在 **Settings → Pages → Build and deployment** 选择 **Deploy from a branch**，分支选择 `main`，目录选择 `/ (root)`，保存。
4. GitHub 部署成功后，访问 `https://levinjustus.github.io/`。

`qa/` 是本地核查目录，不需要上传。不要把整个上级工作目录上传到仓库。

## 修改内容

- 网页文字：修改 `index.html`；`data-en` 与 `data-zh` 分别对应英文和中文。
- 样式与照片显示：`assets/style.css`。头像使用原始照片，页面通过 CSS 显示头像区域；点击可查看原图。
- 个人信息与 CV 数据：`data/profile.json`。
- CV 生成：安装 `reportlab` 后运行 `python scripts/build_cv.py`，生成 `files/CV_Yuting_Zou.pdf`。
- CV 中的经历、荣誉和技能在 `scripts/build_cv.py` 中编辑。网页与 CV 是独立文件，修改经历后请同步更新。
- 论文引用：`files/publications.bib`。
- 语言和主题切换：`assets/app.js`；偏好只保存在访客本机。

## 内容说明

- 学习时间以本人确认的 2024.08–2028.06（预计）为准。
- CETNT 论文按出版社正式出版年份 2026 标注，会议年份保留 CETNT 2025。
- PSPE 2026 论文由本人确认：第二作者、已录用待出版。未填写尚未确认的完整作者名单或 DOI。
- 钢轨项目列为在研，不将受控合成序列当作现场实测，不宣称已验证实时性或部署效果。
- 不包含原始研究数据、实验日志、未公开论文正文、私人电话、出生日期或住址。

布局参考 [Chenxu Bai 的学术主页](https://a1henu.github.io/) 和 [CV](https://a1henu.github.io/files/CV_Chenxu.pdf)。网站代码重新编写，未复制对方的个人经历、论文图或源码。


