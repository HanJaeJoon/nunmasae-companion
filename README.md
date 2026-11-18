<p align="center">
  <img src="assets/images/icon.png" alt="Nunmasae Companion" width="96"><br>
  <a href="#what-it-is">About</a> |
  <a href="#report-a-mistake">Report a mistake</a> |
  <a href="#for-developers">For developers</a><br>
  [<a href="README.md">English</a>] | [<a href="docs/README-KR.md">한국어</a>] | [<a href="docs/README-JP.md">日本語</a>] | [<a href="docs/README-ZH.md">简体中文</a>] | [<a href="docs/README-TW.md">繁體中文</a>] | [<a href="docs/README-ES.md">Español</a>] | [<a href="docs/README-PTBR.md">Português (Brasil)</a>] | [<a href="docs/README-FR.md">Français</a>] | [<a href="docs/README-DE.md">Deutsch</a>] | [<a href="docs/README-IT.md">Italiano</a>] | [<a href="docs/README-RU.md">Русский</a>] | [<a href="docs/README-PL.md">Polski</a>] | [<a href="docs/README-TR.md">Türkçe</a>] | [<a href="docs/README-ID.md">Bahasa Indonesia</a>] | [<a href="docs/README-VN.md">Tiếng Việt</a>] | [<a href="docs/README-TH.md">ไทย</a>] | [<a href="docs/README-AR.md">العربية</a>] | [<a href="docs/README-HI.md">हिन्दी</a>]
</p>

# Nunmasae Companion

An unofficial, spoiler-free fan companion for the Korean fantasy novel "The Bird That Drinks Tears" (눈물을 마시는 새). It shows characters, places and terms only up to the book you have read.

> [!NOTE]
> The app screens are in English and Korean only. The translated READMEs were machine-translated with Claude; corrections are welcome.

## What it is

- Pick how far you have read (Book 1 to 4). The app shows only the characters, races, places and terms that have appeared by then, and inside each entry only the facts revealed by then.
- Entries and facts from books you have not read are not blurred; they are not drawn at all, so even their count stays hidden.
- Major twists in the book you are reading now stay covered on the detail screen until you tap them.
- English and Korean screens. The English screen also shows the Korean names so you can match them with the original.
- No ads, no donations, no paid features, no login, no server. The only things stored on your device are your reading progress and language choice.
- Get it: Google Play (Coming soon)

## Report a mistake

The facts are summarized from secondary sources, not from the books themselves, so some may be wrong or placed in the wrong book. Tell us and we will fix it.

- In the app: Settings > "Report on GitHub" or "Report by email"
- [Open a GitHub issue](https://github.com/HanJaeJoon/nunmasae-companion/issues/new/choose) and pick a form: wrong fact / revealed too early (spoiler) / English name
- Fix it yourself and send a pull request: [CONTRIBUTING.md](docs/CONTRIBUTING.md)

**Spoiler warning**: if your issue title or text would spoil something for readers who have not finished, put `[Spoiler Book N]` on the first line.

## Unofficial

This is a fan project, not affiliated with the author, the publishers (Golden Bough, HarperCollins) or Krafton. Names, settings and terms belong to the original work; every fact sentence in the app is an original summary. No quotes from the books, no covers, no illustrations. If a rights holder asks, we take it down right away.

## For developers

- Contributing guide: [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md)
- Developer documentation (screens, code structure, data format, commands; Korean only): [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md)

Expo SDK 57 / React Native 0.86 / expo-router / TypeScript. The package manager is pnpm.

## License

Code: see `LICENSE`. Character names, places and terms belong to the original work; all fact sentences in `entries.json` are original summaries written for this app.
