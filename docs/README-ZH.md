<p align="center">
  <img src="../assets/images/icon.png" alt="Nunmasae Companion" width="96"><br>
  <a href="#简介">简介</a> |
  <a href="#报告错误">报告错误</a> |
  <a href="#开发者信息">开发者信息</a><br>
  [<a href="../README.md">English</a>] | [<a href="README-KR.md">한국어</a>] | [<a href="README-JP.md">日本語</a>] | [<a href="README-ZH.md">简体中文</a>] | [<a href="README-TW.md">繁體中文</a>] | [<a href="README-ES.md">Español</a>] | [<a href="README-PTBR.md">Português (Brasil)</a>] | [<a href="README-FR.md">Français</a>] | [<a href="README-DE.md">Deutsch</a>] | [<a href="README-IT.md">Italiano</a>] | [<a href="README-RU.md">Русский</a>] | [<a href="README-PL.md">Polski</a>] | [<a href="README-TR.md">Türkçe</a>] | [<a href="README-ID.md">Bahasa Indonesia</a>] | [<a href="README-VN.md">Tiếng Việt</a>] | [<a href="README-TH.md">ไทย</a>] | [<a href="README-AR.md">العربية</a>] | [<a href="README-HI.md">हिन्दी</a>]
</p>

# Nunmasae Companion

这是一款为韩国奇幻小说 "The Bird That Drinks Tears" (눈물을 마시는 새) 制作的非官方、无剧透的粉丝辅助应用。它只显示截至你已读到的那一卷为止出现过的人物、地点和术语。

> [!NOTE]
> 应用界面仅提供英语和韩语。本 README 由 Claude 机器翻译，欢迎指正。

## 简介

- 选择你读到了哪里 (第 1 卷到第 4 卷)。应用只显示截至该卷已出场的人物、种族、地点和术语，每个条目中也只显示截至该卷已揭晓的事实。
- 你还没读到的卷中的条目和事实不是模糊处理，而是根本不会显示，连数量都不会透露。
- 你正在读的那一卷中的重大反转，在详情页面中会一直遮住，直到你点按为止。
- 界面支持英语和韩语。英语界面也会同时显示韩语名称，方便你与原作对照。
- 没有广告、没有捐赠、没有付费功能、无需登录、没有服务器。设备上只保存你的阅读进度和语言选择。
- 下载: Google Play (即将推出)

## 报告错误

这些事实是根据二手资料整理的摘要，而不是直接取自原著，因此可能有错误，或被放在了错误的卷中。告诉我们，我们会修正。

- 在应用中: "Settings" (设置) > "Report on GitHub" (在 GitHub 上报告) 或 "Report by email" (通过电子邮件报告)
- [在 GitHub 上提交 issue](https://github.com/HanJaeJoon/nunmasae-companion/issues/new/choose) 并选择表单: 事实错误 / 揭晓过早 (剧透) / 英文名称 / 缺漏的事实
- 自己修正并发送 pull request: [CONTRIBUTING.md](CONTRIBUTING.md)

**剧透警告**: 如果你的 issue 标题或内容会对尚未读完的读者造成剧透，请在第一行写上 `[Spoiler Book N]`。

## 非官方

这是一个粉丝项目，与作者、出版社 (Golden Bough、HarperCollins) 及 Krafton 均无关联。人名、设定和术语归原作所有；应用中的每一句事实描述都是原创摘要。不使用原著引文、封面或插图。如权利人提出要求，我们会立即下架。

## 开发者信息

- 贡献指南 (英语): [CONTRIBUTING.md](CONTRIBUTING.md)
- 开发者文档 (界面、代码结构、数据格式、命令；仅韩语): [DEVELOPMENT.md](DEVELOPMENT.md)

Expo SDK 57 / React Native 0.86 / expo-router / TypeScript. 包管理器为 pnpm。

## 许可证

代码: 参见 `LICENSE`。人名、地名和术语归原作所有；`entries.json` 中的所有事实描述都是为本应用撰写的原创摘要。
