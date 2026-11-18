<p align="center">
  <img src="../assets/images/icon.png" alt="Nunmasae Companion" width="96"><br>
  <a href="#czym-jest-aplikacja">O aplikacji</a> |
  <a href="#zgłoś-błąd">Zgłoś błąd</a> |
  <a href="#dla-programistów">Dla programistów</a><br>
  [<a href="../README.md">English</a>] | [<a href="README-KR.md">한국어</a>] | [<a href="README-JP.md">日本語</a>] | [<a href="README-ZH.md">简体中文</a>] | [<a href="README-TW.md">繁體中文</a>] | [<a href="README-ES.md">Español</a>] | [<a href="README-PTBR.md">Português (Brasil)</a>] | [<a href="README-FR.md">Français</a>] | [<a href="README-DE.md">Deutsch</a>] | [<a href="README-IT.md">Italiano</a>] | [<a href="README-RU.md">Русский</a>] | [<a href="README-PL.md">Polski</a>] | [<a href="README-TR.md">Türkçe</a>] | [<a href="README-ID.md">Bahasa Indonesia</a>] | [<a href="README-VN.md">Tiếng Việt</a>] | [<a href="README-TH.md">ไทย</a>] | [<a href="README-AR.md">العربية</a>] | [<a href="README-HI.md">हिन्दी</a>]
</p>

# Nunmasae Companion

Nieoficjalny, wolny od spoilerów fanowski przewodnik po koreańskiej powieści fantasy "The Bird That Drinks Tears" (눈물을 마시는 새). Pokazuje postacie, miejsca i pojęcia tylko do tomu, który już przeczytałeś.

> [!NOTE]
> Aplikacja jest dostępna tylko po angielsku i koreańsku. To README zostało przetłumaczone maszynowo za pomocą Claude; poprawki są mile widziane.

## Czym jest aplikacja

- Wybierz, dokąd doczytałeś (tomy od 1 do 4). Aplikacja pokaże tylko te postacie, rasy, miejsca i pojęcia, które do tego momentu się pojawiły, a w każdym haśle tylko fakty ujawnione do tego momentu.
- Hasła i fakty z nieprzeczytanych tomów nie są rozmyte, tylko w ogóle nie są wyświetlane, więc ukryta pozostaje nawet ich liczba.
- Najważniejsze zwroty akcji z tomu, który właśnie czytasz, pozostają zakryte na ekranie szczegółów, dopóki ich nie stukniesz.
- Interfejs po angielsku i koreańsku. Angielski ekran pokazuje też koreańskie imiona, żeby można je było porównać z oryginałem.
- Bez reklam, darowizn, płatnych funkcji, logowania i serwera. Na urządzeniu zapisywane są tylko postęp w czytaniu i wybrany język.
- Pobierz: Google Play (wkrótce)

## Zgłoś błąd

Fakty są streszczone ze źródeł pośrednich, a nie z samych książek, więc niektóre mogą być błędne albo przypisane do niewłaściwego tomu. Daj nam znać, a poprawimy.

- W aplikacji: Settings (Ustawienia) > "Report on GitHub" (Zgłoś na GitHubie) lub "Report by email" (Zgłoś e-mailem)
- [Otwórz zgłoszenie na GitHubie](https://github.com/HanJaeJoon/nunmasae-companion/issues/new/choose) i wybierz formularz: błędny fakt / ujawnione za wcześnie (spoiler) / angielskie imię
- Popraw sam i wyślij pull request: [CONTRIBUTING.md](CONTRIBUTING.md)

**Uwaga na spoilery**: jeśli tytuł lub treść zgłoszenia zdradzałyby coś czytelnikom, którzy jeszcze nie skończyli, wpisz `[Spoiler Book N]` w pierwszej linii.

## Projekt nieoficjalny

To projekt fanowski, niezwiązany z autorem, wydawcami (Golden Bough, HarperCollins) ani z firmą Krafton. Imiona, świat przedstawiony i pojęcia należą do oryginalnego dzieła; każde zdanie z faktem w aplikacji jest własnym streszczeniem. Żadnych cytatów z książek, okładek ani ilustracji. Jeśli właściciel praw o to poprosi, natychmiast usuniemy treści.

## Dla programistów

- Przewodnik dla współtwórców (po angielsku): [CONTRIBUTING.md](CONTRIBUTING.md)
- Dokumentacja dla programistów (ekrany, struktura kodu, format danych, polecenia; tylko po koreańsku): [DEVELOPMENT.md](DEVELOPMENT.md)

Expo SDK 57 / React Native 0.86 / expo-router / TypeScript. Menedżerem pakietów jest pnpm.

## Licencja

Kod: zobacz `LICENSE`. Imiona postaci, miejsca i pojęcia należą do oryginalnego dzieła; wszystkie zdania z faktami w `entries.json` są własnymi streszczeniami napisanymi na potrzeby tej aplikacji.
