<!--
스포일러 주의: 제목과 본문에 아직 안 읽은 사람에게 스포일러가 될 내용을 쓸 때는 첫 줄에 [스포일러 N권]을 적어 주세요.
Spoiler warning: if your title or text would spoil something for readers who have not finished, put [Spoiler Book N] on the first line.
-->

## 무엇을 고쳤나 / What changed

## 근거 / Evidence

<!-- 바꾼 사실마다 권/장/쪽과 출처 / For each changed fact: book, chapter, page and source -->

## 체크리스트 / Checklist

- [ ] 데이터를 고쳤다면 `docs/data-draft.md`와 `src/data/entries.json`을 함께 고쳤다(영문 문장, 영문 이름만 고쳤다면 `entries.json`만) / If I changed data, I updated both `docs/data-draft.md` and `src/data/entries.json` (English-only sentence or name changes: `entries.json` only)
- [ ] 바꾼 권 번호(`at`)마다 근거를 위에 적었다 / I gave evidence above for every book number (`at`) I changed
- [ ] 원문 인용, 명대사, 나무위키 문장 복사가 없다 / No quotes from the books, famous lines or text copied from Namu Wiki
- [ ] 후속작 내용이 없다 / Nothing from the sequels
- [ ] `pnpm run typecheck && pnpm run test:ci && pnpm run lint` 통과(또는 PR CI 통과) / passes (or PR CI passes)
