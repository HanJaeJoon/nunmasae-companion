# Contributing

[English](CONTRIBUTING.md) | [한국어](CONTRIBUTING-KR.md)

Corrections are welcome, whether you report them or fix them yourself. If you would rather not edit files, just [open an issue](https://github.com/HanJaeJoon/nunmasae-companion/issues/new/choose).

**Spoiler warning**: if the title or text of your issue or pull request would spoil something for readers who have not finished, put `[Spoiler Book N]` on the first line.

## Fixing the data

Blocking spoilers is the whole point of this app. If one fact has the wrong book number, readers of that book get spoiled.

1. **Edit both files together.** The Korean sentences and book numbers come from `docs/data-draft.md` (the Korean source draft); the app reads `src/data/entries.json`. Changing a Korean sentence (`ko`), a book number (`at`) or a `[주요]` mark (`major`), or adding a fact, means editing both. Changing only an English sentence (`en`) or an English name (`name.en`) touches only `entries.json` (and `docs/glossary.json` for names).
   - Draft line format: `- 사실: sentence. (권: N) [주요] [출처: ...]` (`사실` = fact, `권` = book, `주요` = major twist, `출처` = sources)
   - JSON fact format: `{ "at": N, "ko": "...", "en": "...", "major": true }`
2. **Back up every book number (`at`).** In the pull request description, give the book/chapter/page and the source (the book, audiobook, serial episode, etc.). Leave out facts whose book you do not know, and when unsure, use the later book.
3. **Write your own short summaries.** No quotes from the books, no famous lines, no text copied from Namu Wiki. Use sources for facts only and write the sentence yourself.
4. **Books 1 to 4 of the original only.** Nothing from the sequels.
5. **Major twists (`major`)**: mark a fact that is a major twist with ` [주요]` in the draft and `"major": true` in the JSON (never any value other than `true`). Facts that state or hint at the same twist are marked in every entry. Major facts of the book being read are hidden on the detail screen until tapped. If you are not sure, say so in the pull request and the maintainer will decide.
6. **English proper names** follow `docs/glossary.json`. If you have confirmed an official spelling from the English edition, update the glossary and `entries.json` together and cite the source.
7. A name appears as soon as its entry does. If a name or identity is itself a later-book twist, it gets its own entry with that book's `at`.

The full rules live in [`CLAUDE.md`](../CLAUDE.md) (Korean only); the list above covers everything a contributor needs.

## Adding a new entry

Add a section to `docs/data-draft.md` under the matching `##` group (`종족` races, `신` gods, `인물` characters and creatures, `장소` places, `용어` terms):

```
### 이름
- type: character / race: 인간 / 소속: ...
- 사실: sentence. (권: 1) [출처: ...]
```

- The `###` heading must equal the entry's `name.ko`. Entries other than characters and creatures need only `- type: place` (or `race`, `god`, `term`). `race` is the Korean race name and `소속` is the group.
- `(권: N)` is confirmed. `(권: N?)` is a guess and still goes into the app as book N. `(권: )` (blank) means no evidence and stays out of the app.
- Add the same entry to `src/data/entries.json` with an `id` in the style of the existing ones. Field details are in [`DEVELOPMENT.md`](DEVELOPMENT.md) (Korean).
- If the name-mention check flags a mention that does not actually reveal the later entry, do not loosen the matching. Add the fact to `MENTION_EXCEPTIONS` in `src/lib/__tests__/data-guards.test.ts` with a reason.

## Editing on GitHub web

No local setup is needed.

1. Open the first file on GitHub and click the pencil button. Committing creates a branch in your fork.
2. Open the second file in your fork on that same branch, edit it and commit to that branch.
3. Open a pull request. If this is your first contribution, CI on a fork pull request waits until the maintainer approves the run.

## Quick start

Use Node 22, the version CI uses (see `.nvmrc`). Corepack installs the pnpm version set in `package.json`.

```
corepack enable
pnpm install
pnpm start
```

For data-only changes, `pnpm run test:ci` is the only check you need to run.

## Code changes

The package manager is pnpm. Before opening a pull request, all of these must pass. CI runs the same commands on every pull request. Data-only changes run the integrity tests and these leak checks too:

- Name mentions: fails if a fact mentions an entry that has not appeared yet by that fact's book.
- Race chips: fails if a character's `race` points to a race that appears later than the character.
- Draft sync: fails if `docs/data-draft.md` and `src/data/entries.json` differ in a fact's sentence, book number or `[주요]` mark.

```
pnpm run typecheck && pnpm run test:ci && pnpm run lint
```

Do not add ad, donation/payment or analytics SDKs.

## License

See [`LICENSE`](../LICENSE).
