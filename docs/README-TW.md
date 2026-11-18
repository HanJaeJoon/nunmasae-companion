<p align="center">
  <img src="../assets/images/icon.png" alt="Nunmasae Companion" width="96"><br>
  <a href="#簡介">簡介</a> |
  <a href="#回報錯誤">回報錯誤</a> |
  <a href="#開發者資訊">開發者資訊</a><br>
  [<a href="../README.md">English</a>] | [<a href="README-KR.md">한국어</a>] | [<a href="README-JP.md">日本語</a>] | [<a href="README-ZH.md">简体中文</a>] | [<a href="README-TW.md">繁體中文</a>] | [<a href="README-ES.md">Español</a>] | [<a href="README-PTBR.md">Português (Brasil)</a>] | [<a href="README-FR.md">Français</a>] | [<a href="README-DE.md">Deutsch</a>] | [<a href="README-IT.md">Italiano</a>] | [<a href="README-RU.md">Русский</a>] | [<a href="README-PL.md">Polski</a>] | [<a href="README-TR.md">Türkçe</a>] | [<a href="README-ID.md">Bahasa Indonesia</a>] | [<a href="README-VN.md">Tiếng Việt</a>] | [<a href="README-TH.md">ไทย</a>] | [<a href="README-AR.md">العربية</a>] | [<a href="README-HI.md">हिन्दी</a>]
</p>

# Nunmasae Companion

這是一款為韓國奇幻小說 "The Bird That Drinks Tears" (눈물을 마시는 새) 打造的非官方、無劇透粉絲輔助 App。它只會顯示到你已讀完的那一集為止出現過的角色、地點和名詞。

> [!NOTE]
> App 畫面僅提供英文和韓文。本 README 由 Claude 機器翻譯，歡迎指正。

## 簡介

- 選擇你讀到哪裡 (第 1 集到第 4 集)。App 只會顯示到那一集為止已登場的角色、種族、地點和名詞，每個條目裡也只顯示到那一集為止已揭露的事實。
- 你還沒讀的集數中的條目和事實不是模糊處理，而是完全不會顯示，連數量都不會透露。
- 你正在讀的那一集中的重大轉折，在詳細資料畫面上會一直遮住，直到你點一下為止。
- 畫面支援英文和韓文。英文畫面也會同時顯示韓文名稱，方便你對照原作。
- 沒有廣告、沒有贊助、沒有付費功能、不必登入、沒有伺服器。裝置上只會儲存你的閱讀進度和語言設定。
- 下載: Google Play (即將推出)

## 回報錯誤

這些事實是根據二手資料整理的摘要，並非直接取自原著，因此可能有誤，或被放在錯誤的集數中。告訴我們，我們會修正。

- 在 App 中: "Settings" (設定) > "Report on GitHub" (在 GitHub 回報) 或 "Report by email" (透過電子郵件回報)
- [在 GitHub 開一個 issue](https://github.com/HanJaeJoon/nunmasae-companion/issues/new/choose) 並選擇表單: 事實錯誤 / 太早揭露 (劇透) / 英文名稱
- 自己修正並送出 pull request: [CONTRIBUTING.md](CONTRIBUTING.md)

**劇透警告**: 如果你的 issue 標題或內容會對尚未讀完的讀者造成劇透，請在第一行加上 `[Spoiler Book N]`。

## 非官方

這是粉絲專案，與作者、出版社 (Golden Bough、HarperCollins) 及 Krafton 皆無關聯。名稱、設定和名詞屬於原作所有；App 中的每一句事實描述都是原創摘要。不使用原著引文、封面或插圖。若權利人提出要求，我們會立即下架。

## 開發者資訊

- 貢獻指南 (英文): [CONTRIBUTING.md](CONTRIBUTING.md)
- 開發者文件 (畫面、程式碼結構、資料格式、指令；僅有韓文): [DEVELOPMENT.md](DEVELOPMENT.md)

Expo SDK 57 / React Native 0.86 / expo-router / TypeScript. 套件管理工具為 pnpm。

## 授權條款

程式碼: 請參閱 `LICENSE`。角色名稱、地名和名詞屬於原作所有；`entries.json` 中的所有事實描述都是為本 App 撰寫的原創摘要。
