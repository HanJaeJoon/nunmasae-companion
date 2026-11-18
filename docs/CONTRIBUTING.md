# Contributing

[English](CONTRIBUTING.md) | [한국어](CONTRIBUTING-KR.md)

Corrections are welcome, whether you report them or fix them yourself. If you would rather not edit files, just [open an issue](https://github.com/HanJaeJoon/nunmasae-companion/issues/new/choose).

**Spoiler warning**: if the title or text of your issue or pull request would spoil something for readers who have not finished, put `[Spoiler Book N]` on the first line.

## Fixing the data

Blocking spoilers is the whole point of this app. If one fact has the wrong book number, readers of that book get spoiled.

1. **Edit both files together.** The Korean sentences and book numbers come from `docs/data-draft.md` (the Korean source draft); the app reads `src/data/entries.json`. Do not change only one of them.
   - Draft line format: `- 사실: sentence. (권: N) [주요] [출처: ...]` (`사실` = fact, `권` = book, `주요` = major twist, `출처` = sources)
   - JSON fact format: `{ "at": N, "ko": "...", "en": "...", "major": true }`
2. **Back up every book number (`at`).** In the pull request description, give the book/chapter/page and the source (the book, audiobook, serial episode, etc.). Leave out facts whose book you do not know, and when unsure, use the later book.
3. **Write your own short summaries.** No quotes from the books, no famous lines, no text copied from Namu Wiki. Use sources for facts only and write the sentence yourself.
4. **Books 1 to 4 of the original only.** Nothing from the sequels.
5. **Major twists (`major`)**: mark a fact that is a major twist with ` [주요]` in the draft and `"major": true` in the JSON (never any value other than `true`). Facts that state or hint at the same twist are marked in every entry. Major facts of the book being read are hidden on the detail screen until tapped. If you are not sure, say so in the pull request and the maintainer will decide.
6. **English proper names** follow `docs/glossary.json`. If you have confirmed an official spelling from the English edition, update the glossary and `entries.json` together and cite the source.
7. A name appears as soon as its entry does. If a name or identity is itself a later-book twist, it gets its own entry with that book's `at`.

The full rules live in [`CLAUDE.md`](../CLAUDE.md) (Korean only); the list above covers everything a contributor needs.

## Code changes

The package manager is pnpm. Before opening a pull request, all of these must pass. Data-only changes run the integrity tests too.

```
pnpm run typecheck && pnpm run test:ci && pnpm run lint
```

Do not add ad, donation/payment or analytics SDKs.

## License

See [`LICENSE`](../LICENSE).
