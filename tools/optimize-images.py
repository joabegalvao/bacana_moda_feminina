#!/usr/bin/env python3
"""Gera as imagens otimizadas da landing page a partir dos arquivos originais.

Uso (na raiz do projeto):
    python3 tools/optimize-images.py

Requer Pillow (pip install pillow). Os originais nunca são alterados.
Para trocar uma foto, substitua o arquivo de origem ou edite a lista PHOTOS
e rode o script novamente.
"""
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "fotos-sem-marcacoes-instagram"
OUT = ROOT / "assets" / "img"

WIDTHS = (480, 800, 1072)
LOGO_BG = (155, 81, 132)  # #9B5184, cor dominante do fundo do logo

# nome de saída -> arquivo original
PHOTOS = {
    "vestidos-renda-azul-e-branco": "foto-140104-limpa.png",
    "arara-vestidos-renda": "foto-140049-limpa.png",
    "vestidos-florais": "foto-140123-limpa.png",
    "arara-saias-renda": "foto-140145-limpa.png",
    "look-amarelo-manteiga": "anatomy1.png",
    "look-azul-e-off-white": "anatomy2.png",
    "look-marinho-e-vermelho": "anatomy3.png",
    "look-caramelo-e-renda": "anatomy4.png",
}

# Fotos de perfil das avaliações: nome de saída -> arquivo na raiz do projeto
AVATARS = {
    "avaliacao-josi-guerreiro": "Josi_Guerreiro.png",
    "avaliacao-sabine-kiyochi": "Sabine_Kiyochi.png",
    "avaliacao-paula-souza": "Paula_Souza.png",
}

# Recortes de borda (esquerda, topo, direita, base), em pixels do original.
# Use quando o arquivo de origem trouxer faixas brancas nas extremidades.
CROPS = {
    "anatomy3.png": (0, 4, 0, 12),
}


def open_source(source: str) -> Image.Image:
    im = Image.open(SRC / source).convert("RGB")
    left, top, right, bottom = CROPS.get(source, (0, 0, 0, 0))
    return im.crop((left, top, im.width - right, im.height - bottom))


def resize_to_width(im: Image.Image, width: int) -> Image.Image:
    if im.width <= width:
        return im.copy()
    height = round(im.height * width / im.width)
    return im.resize((width, height), Image.LANCZOS)


def build_photos() -> None:
    for name, source in PHOTOS.items():
        im = open_source(source)
        for width in WIDTHS:
            out = resize_to_width(im, width)
            out.save(OUT / f"{name}-{width}.webp", "WEBP", quality=80, method=6)
        # fallback JPEG para navegadores sem WebP
        resize_to_width(im, 800).save(
            OUT / f"{name}-800.jpg", "JPEG", quality=82, optimize=True, progressive=True
        )
        print(f"{name}: {im.width}x{im.height}")


def build_logo() -> None:
    """O logo original tem 150x150 px. Nada é redesenhado: apenas recorte da
    margem vazia, ampliação suave para telas de alta densidade e limpeza do
    ruído de compressão JPEG no fundo, que passa a ter a cor exata do logo
    (LOGO_BG, a mesma usada no cabeçalho e no rodapé)."""
    logo = Image.open(ROOT / "bacana.jpg").convert("RGB")

    # Assinatura horizontal: recorte da área do nome
    wordmark = logo.crop((3, 44, 147, 106))
    wordmark = wordmark.resize((wordmark.width * 4, wordmark.height * 4), Image.LANCZOS)
    pixels = wordmark.load()
    for y in range(wordmark.height):
        for x in range(wordmark.width):
            r, g, b = pixels[x, y]
            if abs(r - LOGO_BG[0]) + abs(g - LOGO_BG[1]) + abs(b - LOGO_BG[2]) <= 18:
                pixels[x, y] = LOGO_BG
    wordmark.save(OUT / "logo-bacana.png", optimize=True)
    wordmark.save(OUT / "logo-bacana.webp", "WEBP", lossless=True, method=6)
    print(f"logo-bacana: {wordmark.width}x{wordmark.height}")

    # Ícones
    logo.resize((32, 32), Image.LANCZOS).save(OUT / "favicon-32.png", optimize=True)
    logo.resize((180, 180), Image.LANCZOS).save(OUT / "apple-touch-icon.png", optimize=True)
    logo.resize((192, 192), Image.LANCZOS).save(OUT / "icon-192.png", optimize=True)


def build_avatars() -> None:
    """Mantém o tamanho e a transparência originais (72x72 px)."""
    for name, source in AVATARS.items():
        im = Image.open(ROOT / source).convert("RGBA")
        im.save(OUT / f"{name}.png", optimize=True)
        im.save(OUT / f"{name}.webp", "WEBP", quality=90, method=6)
        print(f"{name}: {im.width}x{im.height}")


def build_social_card() -> None:
    im = open_source(PHOTOS["vestidos-renda-azul-e-branco"])
    card = ImageOps.fit(im, (1200, 630), Image.LANCZOS, centering=(0.5, 0.22))
    card.save(OUT / "compartilhamento.jpg", "JPEG", quality=84, optimize=True, progressive=True)


if __name__ == "__main__":
    OUT.mkdir(parents=True, exist_ok=True)
    build_photos()
    build_logo()
    build_avatars()
    build_social_card()
    total = sum(f.stat().st_size for f in OUT.iterdir())
    print(f"{len(list(OUT.iterdir()))} arquivos, {total / 1024:.0f} KB no total")
