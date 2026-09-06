# 🌱 我的小站

一个温暖手账风的个人生活记录网站，由 [Astro](https://astro.build) 构建。

五大板块：**首页**（最新动态 + 最近随笔）、**随笔**（长文章，按月归档 + 标签）、**时间线**（朋友圈式短动态，可带图）、**相册**（照片自动成册）、**关于我**。

支持日间/夜间模式、手机端适配、RSS 订阅。部署在 Cloudflare Pages 上，国内可以直接打开，无需备案，完全免费。

---

## 📁 内容放在哪里（重要）

| 你想做的 | 文件夹 |
| --- | --- |
| 写一篇随笔（长文章） | `src/content/posts/` 一篇文章一个 `.md` 文件 |
| 发一条短动态 | `src/content/moments/` 一条一个 `.md` 文件 |
| 动态配图 / 文章插图 | 图片文件放 `src/assets/moments/` |
| 建相册 | 照片放 `src/assets/albums/<相册文件夹>/`，并在 `src/content/albums/` 建一个同名 `.md` |
| 改「关于我」页面 | `src/pages/about.md` |
| 改网站名字 / 你的称呼 / 座右铭 | `src/config.ts`（只改这一处，全站生效） |

---

## 📝 如何发布一篇随笔

**前提**：网站已部署上线（见下方「首次部署」），你登录着 github.com（手机 App 或电脑网页都行）。

1. 打开你的 GitHub 仓库 → 进入 `src/content/posts/` 文件夹
2. 点 **Add file → Create new file**，文件名取成 `2026-09-06-我的标题.md`（`日期-标题.md` 的格式）
3. 粘贴下面的模板，改内容和信息：

```markdown
---
title: 文章标题
date: 2026-09-06
tags: [日常]
summary: 一两句话的摘要，显示在列表里（可省略）
---

正文从这里开始，直接写就行。

## 小标题也可以有

- 列表
- **加粗**、*斜体*、`代码` 都支持

插入图片的方法见下文「📷 如何发照片」。
```

4. 点绿色的 **Commit changes** 按钮（默认选项不用改）
5. 等大约 1 分钟，Cloudflare 自动重新部署，刷新网站就能看到 ✅

## 💭 如何发一条短动态

和随笔一样，只是在 `src/content/moments/` 里建文件，格式更简单：

```markdown
---
date: 2026-09-06
mood: ☕
---

今天的故事，一两句话就行。
```

`mood` 是心情小表情，可以省略。想带图就加一行 `images: [文件名.jpg]`（图片先上传到 `src/assets/moments/`）。

## 📷 如何发照片

> ⚠️ **手机照片注意**：iPhone 默认的 HEIC 格式网页显示不了！上传前在手机上选 JPG
> （iPhone：设置 → 相机 → 格式 → 选「兼容性最佳」；或用电脑把照片另存为 JPG）。

**文章插图**：把图片上传到仓库里任意资产文件夹（推荐 `src/assets/`），然后在文章里写：

```markdown
![图片说明](../../assets/albums/相册文件夹/照片.jpg)
```

**建相册**（电脑网页最方便，可以整文件夹拖拽上传）：

1. 在电脑上打开 github.com → 你的仓库 → 进入 `src/assets/albums/`
2. 建一个新文件夹（名字用英文，例如 `2026-autumn`）：**Add file → Create new file**，在文件名框里输入 `2026-autumn/1.jpg` 就会自动创建文件夹，然后把照片拖进上传区
3. 进入 `src/content/albums/`，**Add file → Create new file**，建一个**同名**的 `.md`：

```markdown
---
title: 2026 秋日集
date: 2026-10-01
folder: 2026-autumn
summary: 相册的一句话说明
---

这里可以写几句照片背后的故事。
```

`folder` 必须和照片文件夹名字一致，相册页会**自动**显示文件夹里的所有照片，不用一张张登记。

## ✏️ 改网站名字、关于我

- 网站名字、你的称呼、首页标语：改 `src/config.ts` 里的引号内容
- 「关于我」页面：直接编辑 `src/pages/about.md`
- 改法都一样：GitHub 上打开文件 → 点铅笔图标（Edit）→ 改完点 **Commit changes**

---

## 🚀 首次部署（只需做一次，约 15 分钟）

### 第 1 步：注册 GitHub 并创建仓库

1. 到 [github.com](https://github.com) 注册账号（用户名会出现在网址里，建议取个喜欢的）
2. 登录后点右上角 **+** → **New repository**
3. 仓库名随意（如 `my-site`），选 **Public**，**不要**勾选任何初始化选项（README/.gitignore 都不勾），点 **Create repository**
4. 复制创建页上显示的仓库地址，形如 `https://github.com/你的用户名/my-site.git`

### 第 2 步：把代码推上去

在电脑上告诉我你的仓库地址，我帮你推送（会弹出 GitHub 登录窗口，点一下授权即可）。

或者你自己动手：装 [GitHub Desktop](https://desktop.github.com)（图形界面，中文），`File → Add local repository` 选这个文件夹，再 `Repository → Push`。

### 第 3 步：Cloudflare Pages 一键上线

1. 到 [dash.cloudflare.com](https://dash.cloudflare.com) 注册/登录
2. 左侧 **Workers & Pages** → **Create** → 选 **Pages** 选项卡 → **Connect to Git**
3. 授权 GitHub，选中你的仓库 → **Begin setup**
4. 构建设置：
   - Framework preset：选 **Astro**
   - Build command：`npm run build`（选了 Astro 会自动填好）
   - Build output directory：`dist`
5. 点 **Save and Deploy**，等 2-3 分钟构建完成
6. 你会得到一个网址：`https://随机名字.pages.dev` —— 这就是可以发给任何人的链接 🎉

### 第 4 步：把网址写进配置（可选但建议）

拿到 `xxx.pages.dev` 网址后：

- `astro.config.mjs`：把 `https://example.com` 改成你的正式网址
- `public/robots.txt`：把 Sitemap 那行的 `example.com` 也改掉

改完 commit，自动重新部署。以后每次在 GitHub 上提交内容，网站都会自动更新，**不再需要任何额外操作**。

---

## 🔒 隐私提醒

这个网站是**公开**的，任何拿到链接的人都能看，搜索引擎也可能收录：

- 不要写住址、电话、证件号等敏感信息
- 照片注意别带出门牌、车票等细节
- 如果某篇不想被搜索引擎看到，可以在文章开头正文前加一行说明（多数搜索引擎会尊重）

## ❓ 常见问题

- **发布后网站没变化？** 等 1-2 分钟再强刷（手机下拉刷新；电脑 Ctrl+F5）。Cloudflare 构建需要一点时间。
- **照片显示不出来？** 九成是 HEIC 格式，转成 JPG 再传；另外检查文件名和 `images:` / `folder` 里写的是否**一字不差**（区分大小写）。
- **国内打开慢？** 正常现象，文字秒开，图片第一次加载会慢一点。以后可以花几十块买个域名绑定，会明显改善。
- **想本地预览？** 电脑上装好 [Node.js](https://nodejs.org) 后，在本文件夹运行 `npm install` 和 `npm run dev`，浏览器打开 `http://localhost:4321`。
