import {
  activeRace,
  factSegments,
  ENTRIES,
  filterByRace,
  firstAt,
  groupFactsByAt,
  isMasked,
  isNewEntry,
  isNewFact,
  mentionedIn,
  nextNewSince,
  raceCounts,
  searchEntries,
  secondaryLocale,
  visibleEntries,
  visibleFacts,
  type Entry,
} from '../entries';

const entry = (id: string, ats: number[]): Entry => ({
  id,
  type: 'character',
  name: { ko: id, en: id },
  facts: ats.map((at, i) => ({ at, ko: `${id}-${i}`, en: `${id}-${i}` })),
});

describe('visibleFacts', () => {
  const e = entry('a', [3, 1, 2, 1]);

  it('progress 를 넘는 사실은 내보내지 않는다', () => {
    for (const p of [1, 2, 3, 4]) {
      const facts = visibleFacts(e, p);
      expect(facts.every((f) => f.at <= p)).toBe(true);
      expect(facts).toHaveLength(e.facts.filter((f) => f.at <= p).length);
    }
  });

  it('at 순서로, 같은 at 은 데이터 순서로 정렬한다', () => {
    expect(visibleFacts(e, 4).map((f) => f.ko)).toEqual(['a-1', 'a-3', 'a-2', 'a-0']);
  });

  it('원본 배열을 바꾸지 않는다', () => {
    visibleFacts(e, 4);
    expect(e.facts.map((f) => f.at)).toEqual([3, 1, 2, 1]);
  });
});

describe('visibleEntries', () => {
  const list = [entry('early', [1, 3]), entry('late', [3, 4])];

  it('첫 등장이 progress 보다 늦은 항목은 목록에서 뺀다', () => {
    expect(visibleEntries(list, 1).map((e) => e.id)).toEqual(['early']);
    expect(visibleEntries(list, 2).map((e) => e.id)).toEqual(['early']);
    expect(visibleEntries(list, 3).map((e) => e.id)).toEqual(['early', 'late']);
  });

  it('첫 등장은 가장 작은 at 이다 (사실 순서와 무관)', () => {
    expect(firstAt(entry('x', [4, 2, 3]))).toBe(2);
  });
});

describe('종족 칩', () => {
  const person = (id: string, ats: number[], race?: string, ko = id): Entry => ({
    ...entry(id, ats),
    name: { ko, en: id },
    ...(race ? { race } : {}),
  });
  const list = [
    person('kagan', [1], 'human', '케이건'),
    person('kei', [2], 'human', '케이'),
    person('ryun', [1], 'nhaga', '륜'),
    person('teenahan', [1], 'rekon', '티나한'),
    person('jurado', [3], 'rekon', '즈라더'),
    person('traveler', [1], undefined, '여행자'),
  ];

  it('보이는 인물 중 종족별 수를 칩 순서대로 센다', () => {
    expect(raceCounts(list)).toEqual([
      { race: 'human', count: 2 },
      { race: 'nhaga', count: 1 },
      { race: 'rekon', count: 2 },
    ]);
  });

  it('0 인 칩은 숨긴다 (진행 너머의 종족이 드러나지 않는다)', () => {
    const byId = (ids: string[]) => list.filter((e) => ids.includes(e.id));
    expect(raceCounts(visibleEntries(byId(['kagan', 'ryun', 'jurado']), 1)).map((c) => c.race)).toEqual([
      'human',
      'nhaga',
    ]);
  });

  it('race 가 없는 인물은 전체에서만 보인다', () => {
    expect(filterByRace(list, null).map((e) => e.id)).toContain('traveler');
    for (const c of raceCounts(list)) {
      expect(filterByRace(list, c.race).map((e) => e.id)).not.toContain('traveler');
    }
  });

  it('검색과 칩은 함께 걸린다', () => {
    const found = searchEntries(list, '케');
    expect(raceCounts(found)).toEqual([{ race: 'human', count: 2 }]);
    expect(filterByRace(found, 'human').map((e) => e.id)).toEqual(['kagan', 'kei']);
    expect(filterByRace(searchEntries(list, 'TEE'), 'rekon').map((e) => e.id)).toEqual(['teenahan']);
  });

  it('고른 칩이 0 이 되어 사라지면 전체로 돌아간다', () => {
    const counts = raceCounts(searchEntries(list, '케'));
    expect(activeRace(counts, 'rekon')).toBeNull();
    expect(activeRace(counts, 'human')).toBe('human');
    expect(activeRace(counts, null)).toBeNull();
  });
});

describe('초성 검색', () => {
  const kagan = ENTRIES.filter((e) => e.id === 'kagan');

  it('초성으로 실제 데이터의 케이건 드라카를 찾는다', () => {
    expect(searchEntries(ENTRIES, 'ㅋㅇㄱ').map((e) => e.id)).toContain('kagan');
  });

  it('이름의 공백을 건너 초성을 맞춘다', () => {
    expect(searchEntries(kagan, 'ㅋㅇㄱㄷ').map((e) => e.id)).toEqual(['kagan']);
    expect(searchEntries(kagan, 'ㅋㅇㄱ ㄷ').map((e) => e.id)).toEqual(['kagan']);
  });

  it('완성형 글자가 섞이면 초성 검색을 하지 않는다', () => {
    expect(searchEntries(kagan, '케ㅇ')).toEqual([]);
  });

  it('입력 배열에 있는 항목만 돌려준다', () => {
    const list = [entry('a', [1]), ...kagan];
    expect(searchEntries(list, 'ㅋ').map((e) => e.id)).toEqual(['kagan']);
  });
});

describe('groupFactsByAt', () => {
  it('보이는 사실을 권별로 묶고 순서를 유지한다', () => {
    const groups = groupFactsByAt(visibleFacts(entry('a', [3, 1, 2, 1]), 2));
    expect(groups.map((g) => [g.at, g.facts.map((f) => f.ko)])).toEqual([
      [1, ['a-1', 'a-3']],
      [2, ['a-2']],
    ]);
  });
});

describe('new 표시', () => {
  it('진행을 올리면 직전 진행값을, 낮추거나 첫 선택이면 새 진행값을 저장한다', () => {
    expect(nextNewSince(1, 1, 3)).toBe(1);
    expect(nextNewSince(3, 1, 2)).toBe(2);
    expect(nextNewSince(null, undefined, 2)).toBe(2);
  });

  it('같은 진행을 다시 고르면 기존 newSince 를 유지한다', () => {
    expect(nextNewSince(3, 1, 3)).toBe(1);
    expect(nextNewSince(3, undefined, 3)).toBe(3);
  });

  it('newSince 보다 늦게 처음 나왔거나 새 사실이 붙은 보이는 항목이 new 다', () => {
    const list = [entry('b0', [1]), entry('b1', [1, 3]), entry('b2', [2]), entry('b3', [3]), entry('b4', [4])];
    const news = list.filter((e) => isNewEntry(e, 3, 1)).map((e) => e.id);
    expect(news).toEqual(['b1', 'b2', 'b3']);
  });

  it('진행 너머 항목과 사실은 new 로도 드러나지 않는다', () => {
    expect(isNewEntry(entry('late', [4]), 2, 1)).toBe(false);
    expect(isNewFact({ at: 4, ko: '', en: '' }, 2, 1)).toBe(false);
  });

  it('newSince 보다 늦게 밝혀진 보이는 사실만 new 다', () => {
    const e = entry('a', [1, 2, 3, 4]);
    expect(e.facts.filter((f) => isNewFact(f, 3, 1)).map((f) => f.at)).toEqual([2, 3]);
  });

  it('newSince 가 진행과 같거나 없으면 아무것도 new 가 아니다', () => {
    const e = entry('a', [1, 2]);
    expect(isNewEntry(e, 2, 2)).toBe(false);
    expect(e.facts.some((f) => isNewFact(f, 2, 2))).toBe(false);
    expect(isNewEntry(e, 2, undefined)).toBe(false);
    expect(e.facts.some((f) => isNewFact(f, 2, undefined))).toBe(false);
  });
});

describe('isMasked', () => {
  const major = { at: 2, ko: 'k', en: 'e', major: true } as const;

  it('지금 읽는 권의 주요 사실만 가린다', () => {
    expect(isMasked(major, 2)).toBe(true);
  });

  it('이전 권의 주요 사실은 가리지 않는다', () => {
    expect(isMasked(major, 3)).toBe(false);
    expect(isMasked(major, 4)).toBe(false);
  });

  it('주요가 아닌 사실은 가리지 않는다', () => {
    expect(isMasked({ at: 2, ko: 'k', en: 'e' }, 2)).toBe(false);
  });
});

describe('entries.json 무결성', () => {
  const TYPES = ['character', 'race', 'god', 'place', 'term', 'creature'];

  it('id 가 유일하다', () => {
    const ids = ENTRIES.map((e) => e.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it.each(ENTRIES.map((e) => [e.id, e] as const))('%s: 필드가 올바르다', (_id, e) => {
    expect(TYPES).toContain(e.type);
    expect(e.name.ko.trim()).not.toBe('');
    expect(e.name.en.trim()).not.toBe('');
    expect(e.facts.length).toBeGreaterThan(0);
    for (const f of e.facts) {
      expect(Number.isInteger(f.at)).toBe(true);
      expect(f.at).toBeGreaterThanOrEqual(1);
      expect(f.at).toBeLessThanOrEqual(4);
      expect(f.ko.trim()).not.toBe('');
      expect(f.en.trim()).not.toBe('');
      if ('major' in f) expect(f.major).toBe(true);
    }
  });

  it('race 는 존재하는 종족 항목을 가리키고, 그 종족은 인물보다 늦게 등장하지 않는다', () => {
    const byId = new Map(ENTRIES.map((e) => [e.id, e]));
    for (const e of ENTRIES.filter((x) => x.race)) {
      const race = byId.get(e.race!);
      expect(race?.type).toBe('race');
      expect(firstAt(race!)).toBeLessThanOrEqual(firstAt(e));
    }
  });
});

describe('secondaryLocale', () => {
  it('영어 화면은 한국어를 보조로 보인다', () => {
    expect(secondaryLocale('en')).toBe('ko');
  });

  it('한국어 화면은 영문 정보를 보이지 않는다', () => {
    expect(secondaryLocale('ko')).toBeNull();
  });
});

describe('사실 문장 링크', () => {
  const named = (
    id: string,
    ko: string,
    en: string,
    facts: Entry['facts'],
    type: Entry['type'] = 'character',
  ): Entry => ({
    id,
    type,
    name: { ko, en },
    facts,
  });
  const kagan = named('kagan', '케이건', 'Kagan', [{ at: 1, ko: 'k', en: 'k' }]);
  const late = named('late', '여름', 'Yorum', [{ at: 3, ko: 'l', en: 'l' }]);
  const guardian = named('guardian', '수호자', 'Guardian', [{ at: 1, ko: 'g', en: 'g' }], 'term');
  const great = named('great', '대수호자', 'Great Guardian', [{ at: 1, ko: 'gg', en: 'gg' }], 'term');
  const dragon = named('dragon', '용', 'Dragon', [{ at: 1, ko: 'd', en: 'd' }], 'term');
  const nhaga = named('nhaga', '나가', 'Nhaga', [{ at: 1, ko: 'n', en: 'n' }], 'race');
  const self = named('self', '사모', 'Sammo', [{ at: 1, ko: '사모는 케이건을 만난다.', en: 'Sammo meets Kagan.' }]);
  const all = [kagan, late, guardian, great, dragon, nhaga, self];
  const links = (text: string, locale: 'ko' | 'en', progress = 4) =>
    factSegments(text, locale, visibleEntries(all, progress), self)
      .filter((s) => s.id)
      .map((s) => `${s.id}:${s.text}`);

  it('보이는 항목 이름을 잇고 나머지 글자는 그대로 둔다', () => {
    const segs = factSegments('사모는 케이건을 만난다.', 'ko', visibleEntries(all, 1), self);
    expect(segs).toEqual([{ text: '사모는 ' }, { text: '케이건', id: 'kagan' }, { text: '을 만난다.' }]);
    expect(links('Sammo meets Kagan.', 'en')).toEqual(['kagan:Kagan']);
  });

  it('진행 너머 항목, 자기 자신, 종족, 한 글자 이름은 잇지 않는다', () => {
    expect(links('여름이 온다.', 'ko', 2)).toEqual([]);
    expect(links('여름이 온다.', 'ko', 3)).toEqual(['late:여름']);
    expect(links('사모와 나가와 용', 'ko')).toEqual([]);
    expect(links('Sammo, Nhaga and Dragon', 'en')).toEqual(['dragon:Dragon']);
  });

  it('한국어는 이름 뒤가 조사일 때만 잇고 더 긴 낱말 속 이름은 잇지 않는다', () => {
    expect(links('케이건를', 'ko')).toEqual(['kagan:케이건']);
    expect(links('수호자들이 온다.', 'ko')).toEqual(['guardian:수호자']);
    expect(links('케이건왕이 온다.', 'ko')).toEqual([]);
    expect(links('옛케이건', 'ko')).toEqual([]);
  });

  it('영어는 단어 경계와 대소문자를 지키고 복수형도 같은 이름으로 본다', () => {
    expect(links('Kagani and kagan', 'en')).toEqual([]);
    expect(links('Great Guardians', 'en')).toEqual(['great:Great Guardians']);
  });

  it('긴 이름부터 찾고 항목마다 첫 언급만 잇는다', () => {
    expect(links('대수호자와 수호자, 그리고 수호자', 'ko')).toEqual(['great:대수호자', 'guardian:수호자']);
    const segs = factSegments('케이건과 케이건', 'ko', [kagan]);
    expect(segs).toEqual([{ text: '케이건', id: 'kagan' }, { text: '과 케이건' }]);
  });

  it('언급된 곳은 보이는 항목의 가리지 않은 사실만 센다', () => {
    const masked = named('masked', '륜', 'Ryun', [
      { at: 1, ko: 'r', en: 'r' },
      { at: 2, ko: '케이건을 만난다.', en: 'Meets Kagan.', major: true },
    ]);
    const lateMention = named('lm', '비형', 'Byong', [{ at: 3, ko: '케이건을 안다.', en: 'Knows Kagan.' }]);
    const set = [kagan, self, masked, lateMention];
    expect(mentionedIn(kagan, set, 1, 'ko').map((e) => e.id)).toEqual(['self']);
    expect(mentionedIn(kagan, set, 2, 'ko').map((e) => e.id)).toEqual(['self']);
    expect(mentionedIn(kagan, set, 3, 'en').map((e) => e.id)).toEqual(['self', 'masked', 'lm']);
    expect(mentionedIn(nhaga, [nhaga, named('x', 'x', 'x', [{ at: 1, ko: '나가는', en: 'Nhaga' }])], 4, 'ko')).toEqual(
      [],
    );
  });

  it('실제 데이터에서 링크와 언급된 곳은 진행까지 보이는 항목만 가리킨다', () => {
    const byId = new Map(ENTRIES.map((e) => [e.id, e]));
    for (const p of [1, 2, 3, 4]) {
      for (const e of ENTRIES.filter((x) => firstAt(x) <= p)) {
        const targets = visibleEntries(ENTRIES, p);
        for (const f of visibleFacts(e, p)) {
          for (const locale of ['ko', 'en'] as const) {
            for (const s of factSegments(f[locale], locale, targets, e)) {
              if (!s.id) continue;
              const target = byId.get(s.id)!;
              expect({
                p,
                from: e.id,
                to: s.id,
                ok: firstAt(target) <= p && s.id !== e.id && target.type !== 'race',
              }).toEqual({ p, from: e.id, to: s.id, ok: true });
            }
          }
        }
        for (const m of mentionedIn(e, ENTRIES, p, 'ko')) expect(firstAt(m)).toBeLessThanOrEqual(p);
      }
    }
  });

  describe('실제 데이터의 오링크', () => {
    const byId = new Map(ENTRIES.map((e) => [e.id, e]));
    const realLinks = (id: string, fragment: string, locale: 'ko' | 'en', p = 4) => {
      const e = byId.get(id)!;
      const f = e.facts.find((x) => x[locale].includes(fragment))!;
      return factSegments(f[locale], locale, visibleEntries(ENTRIES, p), e)
        .filter((s) => s.id)
        .map((s) => `${s.id}:${s.text}`);
    };

    it('나늬는 딱정벌레와 전설이 같은 이름이라 둘 다 보이면 잇지 않는다', () => {
      expect(realLinks('byong', '딱정벌레', 'ko', 1)).toEqual(['nani:나늬']);
      expect(realLinks('byong', 'beetle', 'en', 2)).toEqual([]);
      expect(realLinks('nani-legend', '이 시대의', 'ko')).toEqual(['deoni-dalbi:데오늬 달비']);
      expect(realLinks('nani-legend', 'of this age', 'en')).toEqual(['deoni-dalbi:Deoni Dalbi']);
      expect(realLinks('human', '나늬', 'ko')).not.toContainEqual(expect.stringMatching(/^nani:/));
      expect(mentionedIn(byId.get('nani')!, ENTRIES, 4, 'en').map((e) => e.id)).not.toContain('nani-legend');
    });

    it('다른 뜻으로 쓴 전령과 보늬는 잇지 않는다', () => {
      expect(realLinks('deoni-dalbi', '전령', 'ko')).toEqual(['northern-army:북부군']);
      expect(mentionedIn(byId.get('soul-transfer')!, ENTRIES, 4, 'ko')).toEqual([]);
      expect(realLinks('nani-legend', '보늬라는 존재', 'ko')).toEqual([]);
      expect(realLinks('nani-legend', 'a being called Boni', 'en')).toEqual([]);
    });

    it('영어 복수형, 자기 이름, 칭호 속 짧은 이름을 잘못 잇지 않는다', () => {
      expect(realLinks('ryun', 'Generals', 'en', 3)).toContain('guardian-general:Guardian Generals');
      expect(realLinks('kagan', 'last Kitaljer Hunter', 'en')).toContain('kitaljer-hunters:Kitaljer Hunter');
      expect(realLinks('great-guardian', 'The first', 'en', 3)).not.toContain('guardian:Guardian');
      expect(realLinks('sammo', 'Great Tiger King', 'en', 3)).toEqual(['great-tiger:Great Tiger']);
      expect(realLinks('northern-army', 'Great Tiger King', 'en', 3)).not.toContain('great-tiger:Great Tiger');
      expect(realLinks('ryun', 'Thunder Dragon Duke', 'en', 3)).not.toContain('dragon:Dragon');
    });
  });
});
