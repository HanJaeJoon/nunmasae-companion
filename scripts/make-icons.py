#!/usr/bin/env python3
"""아이콘과 스토어 그래픽을 생성한다. (loan-calculator 에서 역전파)

    pip install pillow
    python scripts/make-icons.py

마크는 레콘(깃털에 볏 달린 새 머리를 한 전사 종족) 옆모습과 그 옆에 세운 긴 창이다.
전부 자작 기하 도형이며 공식 표지/삽화/게임 아트를 참고하지 않는다 (CLAUDE.md
"절대 올리지 않는 것" 2, 3). 글자, 원작 제목, 눈물/물방울 모티프를 넣지 않는다.

마크를 고칠 때의 기준:
- 48px 파비콘에서도 형태가 남는다 (가는 선, 잔 곡선은 그 크기에서 사라진다)
- 단색 실루엣(테마 아이콘)으로도 성립한다
- 적응형 아이콘 전경(mark_ratio 0.50)이 안쪽 66% 원 밖으로 나가지 않는다

BRAND / TINT 는 app.json 의 splash backgroundColor,
android.adaptiveIcon.backgroundColor 와 각각 같아야 한다.

아이콘을 손으로 고친 뒤 이 스크립트를 다시 돌리면 덮어쓰므로,
디자이너가 만든 아이콘으로 교체한 다음에는 이 스크립트를 돌리지 말 것.
"""

import os

from PIL import Image, ImageDraw

# app.json 의 splash backgroundColor (#2F6F6A), src/lib/branding.ts 의 brandColor 와 같아야 한다
BRAND = (0x2F, 0x6F, 0x6A)
# app.json 의 android.adaptiveIcon.backgroundColor (#E3EEEC) 와 같아야 한다
TINT = (0xE3, 0xEE, 0xEC)
WHITE = (0xFF, 0xFF, 0xFF)
# 마크의 구멍(눈). ImageDraw 는 합성하지 않고 픽셀을 덮어쓰므로 이 색으로 칠하면 투명해진다.
CLEAR = (0, 0, 0, 0)

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
IMAGES = os.path.join(ROOT, "assets", "images")
STORE = os.path.join(ROOT, "docs", "store-listing", "graphics")

# 안티에일리어싱을 위해 이 배율로 그린 뒤 축소한다.
# PIL 에 도형 안티에일리어싱이 없어서 이 방법을 쓴다.
SS = 4


def draw_mark(draw, box, color):
    """box=(x, y, size) 정사각 영역에 마크를 그린다. 좌표는 정규화 비율.

    눈은 CLEAR 로 구멍을 내므로 빈 투명 레이어에 그린 뒤 배경에 합성해야 한다.
    """
    x0, y0, m = box

    def P(pts):
        return [(x0 + a * m, y0 + b * m) for a, b in pts]

    # 창: 마름모 창날 + 자루. 자루 폭 0.10 은 48px 에서 3px 남기기 위한 최소값
    draw.polygon(P([(0.10, 0.00), (0.21, 0.16), (0.10, 0.30), (-0.01, 0.16)]),
                 fill=color)
    draw.rectangle(P([(0.05, 0.27), (0.15, 0.96)]), fill=color)
    # 볏: 칼날 세 개
    draw.polygon(P([(0.40, 0.36), (0.36, 0.14), (0.50, 0.24), (0.60, 0.06),
                    (0.70, 0.22), (0.85, 0.12), (0.84, 0.36)]), fill=color)
    # 머리, 끝이 꺾인 부리, 육수, 목. 목 뒤를 깃 톱니로 기울여야 체스 나이트로 안 읽힌다
    draw.polygon(P([(0.34, 0.32), (0.78, 0.30), (0.86, 0.33), (0.96, 0.38),
                    (1.00, 0.49), (0.86, 0.52), (0.82, 0.55), (0.82, 0.73),
                    (0.72, 0.63), (0.72, 0.68), (0.84, 0.96), (0.22, 0.96),
                    (0.30, 0.80), (0.20, 0.78), (0.30, 0.62), (0.22, 0.58),
                    (0.32, 0.44)]), fill=color)
    # 눈: 앞으로 기운 쐐기
    draw.polygon(P([(0.54, 0.39), (0.76, 0.40), (0.69, 0.49), (0.57, 0.48)]),
                 fill=CLEAR)


def render(size, *, bg=None, fg=WHITE, mark_ratio=0.66, path):
    """정사각 PNG 하나를 만든다. bg=None 이면 투명 배경."""
    n = size * SS
    layer = Image.new("RGBA", (n, n), (0, 0, 0, 0))
    m = n * mark_ratio
    draw_mark(ImageDraw.Draw(layer), ((n - m) / 2, (n - m) / 2, m), fg + (255,))
    img = Image.new("RGBA", (n, n), (bg + (255,)) if bg else (0, 0, 0, 0))
    img = Image.alpha_composite(img, layer)
    img.resize((size, size), Image.LANCZOS).save(path)
    print("  %-38s %dx%d" % (os.path.relpath(path, ROOT).replace(os.sep, "/"),
                             size, size))


def render_feature_graphic(path, w=1024, h=500):
    """Play 그래픽 이미지.

    글자를 넣지 않는다. 언어별로 따로 올릴 수 있지만 하나만 만들어 여러 언어에
    공용으로 쓰기 때문이다. 언어별 그래픽을 만들려면 각 언어의 앱 이름을
    넣어야 하고, 그러면 CJK 폰트 3종을 챙겨야 해서 두부 현상 위험이 생긴다.
    """
    W, H = w * SS, h * SS

    # 아래로 갈수록 어두워지는 부드러운 세로 그라데이션.
    # 폴리곤을 겹쳐 쌓으면 사선 경계가 아티팩트로 보이므로 픽셀 행으로 만든다.
    img = Image.new("RGB", (1, H))
    for y in range(H):
        f = 1 - 0.22 * (y / H)
        img.putpixel((0, y), tuple(int(c * f) for c in BRAND))
    img = img.resize((W, H)).convert("RGBA")

    # ImageDraw 는 알파를 합성하지 않고 픽셀을 그대로 덮어쓴다. 반투명 요소나
    # 구멍(CLEAR)을 같은 레이어에 그리면 불투명 흰색이나 검은 구멍이 된다.
    # 요소마다 레이어를 만들어 alpha_composite 로 얹는다.
    def overlay(fn):
        nonlocal img
        layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        fn(ImageDraw.Draw(layer))
        img = Image.alpha_composite(img, layer)

    # 마크는 왼쪽에. 아이콘과 같은 도형이라 스토어에서 같은 앱으로 읽힌다.
    m = H * 0.62
    overlay(lambda ld: draw_mark(ld, (W * 0.13, (H - m) / 2, m), WHITE + (255,)))

    # 오른쪽: 책 4권의 책등. 앞(1권)만 불투명하고 뒤로 갈수록 옅어져
    # "읽은 권까지만 보인다" 를 뜻한다.
    bot = H * 0.78
    spine_w, gap, x = W * 0.06, W * 0.025, W * 0.56
    overlay(lambda ld: ld.line([(x - W * 0.03, bot), (W * 0.89, bot)],
                               fill=WHITE + (55,), width=2 * SS))
    for alpha, height in [(255, 0.50), (130, 0.45), (75, 0.52), (40, 0.47)]:
        top = bot - H * height

        def draw_spine(ld, x=x, top=top, alpha=alpha):
            ld.rounded_rectangle([x, top, x + spine_w, bot - SS * 3],
                                 radius=W * 0.008, fill=WHITE + (alpha,))
            # 책등 위아래의 띠. 구멍으로 내서 배경이 비친다.
            for band in (top + H * 0.06, bot - H * 0.12):
                ld.rectangle([x, band, x + spine_w, band + H * 0.025],
                             fill=CLEAR)

        overlay(draw_spine)
        x += spine_w + gap

    img.convert("RGB").resize((w, h), Image.LANCZOS).save(path, quality=95)
    print("  %-38s %dx%d" % (os.path.relpath(path, ROOT).replace(os.sep, "/"),
                             w, h))


def main():
    os.makedirs(STORE, exist_ok=True)
    p = lambda *a: os.path.join(*a)

    print("assets/images (app.json 이 참조하는 것):")
    # 앱 아이콘 원본. 투명 배경을 쓰지 않는다 (Play 가 거부한다).
    render(1024, bg=BRAND, path=p(IMAGES, "icon.png"))
    # 적응형 아이콘. 배경은 단색, 전경은 브랜드 색 마크.
    # 마스킹으로 바깥 33% 가 잘릴 수 있으므로 마크를 안쪽 50% 에만 둔다.
    # 0.52 부터 볏/창 끝이 안쪽 66% 원 밖으로 나간다.
    render(432, bg=TINT, fg=TINT, mark_ratio=0.0,
           path=p(IMAGES, "android-icon-background.png"))
    render(432, fg=BRAND, mark_ratio=0.50,
           path=p(IMAGES, "android-icon-foreground.png"))
    # 테마 아이콘. 시스템이 알파만 보고 색을 입히므로 검정으로 그린다.
    render(432, fg=(0, 0, 0), mark_ratio=0.50,
           path=p(IMAGES, "android-icon-monochrome.png"))
    # 스플래시. 배경이 진한 브랜드 색이라 흰 마크를 쓴다.
    # imageWidth 가 작으면 작게 렌더되므로 여백을 거의 두지 않는다.
    render(512, fg=WHITE, mark_ratio=0.92, path=p(IMAGES, "splash-icon.png"))
    render(48, bg=BRAND, mark_ratio=0.70, path=p(IMAGES, "favicon.png"))

    print("docs/store-listing/graphics (Play Console 에 직접 업로드):")
    render(512, bg=BRAND, path=p(STORE, "play-icon-512.png"))
    render_feature_graphic(p(STORE, "feature-graphic-1024x500.png"))


if __name__ == "__main__":
    main()
