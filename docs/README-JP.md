<p align="center">
  <img src="../assets/images/icon.png" alt="Nunmasae Companion" width="96"><br>
  <a href="#概要">概要</a> |
  <a href="#間違いの報告">間違いの報告</a> |
  <a href="#開発者向け">開発者向け</a><br>
  [<a href="../README.md">English</a>] | [<a href="README-KR.md">한국어</a>] | [<a href="README-JP.md">日本語</a>] | [<a href="README-ZH.md">简体中文</a>] | [<a href="README-TW.md">繁體中文</a>] | [<a href="README-ES.md">Español</a>] | [<a href="README-PTBR.md">Português (Brasil)</a>] | [<a href="README-FR.md">Français</a>] | [<a href="README-DE.md">Deutsch</a>] | [<a href="README-IT.md">Italiano</a>] | [<a href="README-RU.md">Русский</a>] | [<a href="README-PL.md">Polski</a>] | [<a href="README-TR.md">Türkçe</a>] | [<a href="README-ID.md">Bahasa Indonesia</a>] | [<a href="README-VN.md">Tiếng Việt</a>] | [<a href="README-TH.md">ไทย</a>] | [<a href="README-AR.md">العربية</a>] | [<a href="README-HI.md">हिन्दी</a>]
</p>

# Nunmasae Companion

韓国のファンタジー小説 "The Bird That Drinks Tears" (눈물을 마시는 새) のための、非公式でネタバレなしのファン向けガイドアプリです。読み終えた巻までに登場した人物、場所、用語だけを表示します。

> [!NOTE]
> アプリの画面は英語と韓国語のみです。この README は Claude による機械翻訳です。誤りの指摘や修正を歓迎します。

## 概要

- どこまで読んだか (第1巻から第4巻) を選びます。アプリはその時点までに登場した人物、種族、場所、用語だけを表示し、各項目の中でもその時点までに明かされた事実だけを表示します。
- まだ読んでいない巻の項目や事実はぼかし表示ではなく、そもそも描画されません。そのため件数すら分かりません。
- 今読んでいる巻の大きなどんでん返しは、詳細画面でタップするまで隠されたままです。
- 画面は英語と韓国語に対応しています。英語画面にも韓国語の名前が併記されるので、原作と照らし合わせられます。
- 広告、寄付、有料機能、ログイン、サーバーはいずれもありません。端末に保存されるのは読書の進み具合と言語設定だけです。
- 入手: Google Play (近日公開)

## 間違いの報告

事実は原作そのものではなく二次資料から要約しているため、誤っていたり、別の巻に置かれていたりするものがあるかもしれません。お知らせいただければ修正します。

- アプリ内: "Settings" (設定) > "Report on GitHub" (GitHub で報告) または "Report by email" (メールで報告)
- [GitHub で issue を作成](https://github.com/HanJaeJoon/nunmasae-companion/issues/new/choose)し、フォームを選んでください: 事実の誤り / 早すぎる公開 (ネタバレ) / 英語名
- 自分で修正してプルリクエストを送る: [CONTRIBUTING.md](CONTRIBUTING.md)

**ネタバレ注意**: issue のタイトルや本文が、まだ読み終えていない読者へのネタバレになる場合は、1行目に `[Spoiler Book N]` と書いてください。

## 非公式

これはファンプロジェクトであり、著者、出版社 (Golden Bough、HarperCollins)、Krafton とは一切関係ありません。名前、設定、用語は原作に帰属します。アプリ内の事実の文章はすべて独自に書いた要約です。原作からの引用、表紙、挿絵は使っていません。権利者から要請があれば、すぐに削除します。

## 開発者向け

- コントリビューションガイド (英語): [CONTRIBUTING.md](CONTRIBUTING.md)
- 開発者ドキュメント (画面、コード構成、データ形式、コマンド。韓国語のみ): [DEVELOPMENT.md](DEVELOPMENT.md)

Expo SDK 57 / React Native 0.86 / expo-router / TypeScript. パッケージマネージャーは pnpm です。

## ライセンス

コード: `LICENSE` を参照してください。人物名、地名、用語は原作に帰属します。`entries.json` の事実の文章はすべて、このアプリのために独自に書いた要約です。
