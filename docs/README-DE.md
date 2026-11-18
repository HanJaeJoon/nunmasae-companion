<p align="center">
  <img src="../assets/images/icon.png" alt="Nunmasae Companion" width="96"><br>
  <a href="#was-ist-das">Über die App</a> |
  <a href="#fehler-melden">Fehler melden</a> |
  <a href="#für-entwickler">Für Entwickler</a><br>
  [<a href="../README.md">English</a>] | [<a href="README-KR.md">한국어</a>] | [<a href="README-JP.md">日本語</a>] | [<a href="README-ZH.md">简体中文</a>] | [<a href="README-TW.md">繁體中文</a>] | [<a href="README-ES.md">Español</a>] | [<a href="README-PTBR.md">Português (Brasil)</a>] | [<a href="README-FR.md">Français</a>] | [<a href="README-DE.md">Deutsch</a>] | [<a href="README-IT.md">Italiano</a>] | [<a href="README-RU.md">Русский</a>] | [<a href="README-PL.md">Polski</a>] | [<a href="README-TR.md">Türkçe</a>] | [<a href="README-ID.md">Bahasa Indonesia</a>] | [<a href="README-VN.md">Tiếng Việt</a>] | [<a href="README-TH.md">ไทย</a>] | [<a href="README-AR.md">العربية</a>] | [<a href="README-HI.md">हिन्दी</a>]
</p>

# Nunmasae Companion

Ein inoffizieller, spoilerfreier Fan-Begleiter zum koreanischen Fantasyroman "The Bird That Drinks Tears" (눈물을 마시는 새). Die App zeigt Figuren, Orte und Begriffe nur bis zu dem Band, den du gelesen hast.

> [!NOTE]
> Die App selbst gibt es nur auf Englisch und Koreanisch. Diese README wurde mit Claude maschinell übersetzt; Korrekturen sind willkommen.

## Was ist das?

- Wähle aus, wie weit du gelesen hast (Band 1 bis 4). Die App zeigt nur die Figuren, Völker, Orte und Begriffe, die bis dahin vorgekommen sind, und in jedem Eintrag nur die Fakten, die bis dahin enthüllt wurden.
- Einträge und Fakten aus Bänden, die du noch nicht gelesen hast, werden nicht unscharf dargestellt, sondern gar nicht erst angezeigt. So bleibt sogar ihre Anzahl verborgen.
- Große Wendungen aus dem Band, den du gerade liest, bleiben auf der Detailansicht verdeckt, bis du sie antippst.
- Oberfläche auf Englisch und Koreanisch. Die englische Ansicht zeigt zusätzlich die koreanischen Namen, damit du sie dem Original zuordnen kannst.
- Keine Werbung, keine Spenden, keine kostenpflichtigen Funktionen, keine Anmeldung, kein Server. Auf deinem Gerät werden nur dein Lesefortschritt und deine Sprachwahl gespeichert.
- Herunterladen: Google Play (demnächst)

## Fehler melden

Die Fakten sind aus Sekundärquellen zusammengefasst, nicht aus den Büchern selbst. Manche können daher falsch sein oder dem falschen Band zugeordnet sein. Sag uns Bescheid, dann korrigieren wir es.

- In der App: Settings (Einstellungen) > "Report on GitHub" (Auf GitHub melden) oder "Report by email" (Per E-Mail melden)
- [Ein GitHub-Issue eröffnen](https://github.com/HanJaeJoon/nunmasae-companion/issues/new/choose) und ein Formular wählen: falsche Angabe / zu früh enthüllt (Spoiler) / englischer Name / fehlende Angabe
- Selbst korrigieren und einen Pull Request schicken: [CONTRIBUTING.md](CONTRIBUTING.md)

**Spoilerwarnung**: Wenn der Titel oder Text deines Issues etwas für Leser verraten würde, die noch nicht fertig sind, schreib `[Spoiler Book N]` in die erste Zeile.

## Inoffiziell

Dies ist ein Fanprojekt ohne Verbindung zum Autor, zu den Verlagen (Golden Bough, HarperCollins) oder zu Krafton. Namen, Schauplätze und Begriffe gehören zum Originalwerk; jeder Faktensatz in der App ist eine eigene Zusammenfassung. Keine Zitate aus den Büchern, keine Cover, keine Illustrationen. Wenn ein Rechteinhaber es verlangt, nehmen wir die Inhalte sofort herunter.

## Für Entwickler

- Leitfaden für Beiträge (auf Englisch): [CONTRIBUTING.md](CONTRIBUTING.md)
- Entwicklerdokumentation (Bildschirme, Codestruktur, Datenformat, Befehle; nur auf Koreanisch): [DEVELOPMENT.md](DEVELOPMENT.md)

Expo SDK 57 / React Native 0.86 / expo-router / TypeScript. Der Paketmanager ist pnpm.

## Lizenz

Code: siehe `LICENSE`. Namen von Figuren, Orte und Begriffe gehören zum Originalwerk; alle Faktensätze in `entries.json` sind eigene Zusammenfassungen, die für diese App geschrieben wurden.
