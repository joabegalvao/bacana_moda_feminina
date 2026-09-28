# Bacana Moda Feminina | Landing page

Página única, estática, em HTML, CSS e JavaScript puro. Não há etapa de build
nem dependências de execução: basta servir a pasta.

## Como visualizar

```bash
# na raiz do projeto
python3 -m http.server 4173
# abra http://localhost:4173
```

Qualquer servidor estático funciona (Nginx, Apache, Netlify, Vercel, Hostinger).
Publique `index.html` e a pasta `assets/`. A pasta `tools/` não precisa ir para
o servidor.

### Materiais de origem

Os arquivos enviados pelo cliente não fazem parte do repositório. Eles ficam na
pasta local do projeto e são ignorados pelo git. As imagens que o site usa já
estão prontas em `assets/img`.

Só é preciso ter os originais para rodar `tools/optimize-images.py`, ou seja,
para trocar ou reprocessar uma foto.

| Arquivo de origem | Conteúdo | Usado em |
| --- | --- | --- |
| `bacana.jpg` | Logo, 150 x 150 px | cabeçalho, rodapé e ícones |
| `fotos-sem-marcacoes-instagram/foto-140104-limpa.png` | Vestidos de renda azul e branco | hero, coleção e imagem de compartilhamento |
| `fotos-sem-marcacoes-instagram/foto-140049-limpa.png` | Arara de vestidos de renda | coleção |
| `fotos-sem-marcacoes-instagram/foto-140123-limpa.png` | Vestidos florais | coleção |
| `fotos-sem-marcacoes-instagram/foto-140145-limpa.png` | Arara de saias de renda | coleção |
| `fotos-sem-marcacoes-instagram/anatomy1.png` | Look amarelo manteiga | looks em detalhes |
| `fotos-sem-marcacoes-instagram/anatomy2.png` | Look azul e off-white | looks em detalhes |
| `fotos-sem-marcacoes-instagram/anatomy3.png` | Look marinho e vermelho | looks em detalhes |
| `fotos-sem-marcacoes-instagram/anatomy4.png` | Look caramelo e renda | looks em detalhes |
| `Josi_Guerreiro.png`, `Paula_Souza.png`, `Sabine_Kiyochi.png` | Fotos de perfil, 72 x 72 px | avaliações |
| `New Text Document.txt` | Texto das avaliações | avaliações |

## Repositório

| Item | Valor |
| --- | --- |
| Endereço | `git@github.com:joabegalvao/bacana_moda_feminina.git` |
| Página | https://github.com/joabegalvao/bacana_moda_feminina |
| Visibilidade | pública (conferida em 28/09/2026) |
| Branch | `main` |

O repositório guarda só o que o site precisa para funcionar e ser mantido:
`index.html`, `assets/`, `tools/`, `README.md` e `.gitignore`. O `.gitignore`
exclui os materiais de origem, que são a pasta `fotos-sem-marcacoes-instagram/`
e os arquivos `.png`, `.jpg`, `.jpeg` e `.txt` da raiz.

```bash
git clone git@github.com:joabegalvao/bacana_moda_feminina.git
```

Um clone novo abre e publica o site normalmente. Só não roda o script de
imagens, que depende dos materiais de origem.

Os materiais de origem estiveram no repositório no primeiro commit (`8c7f89d`)
e foram retirados em seguida. Eles continuam acessíveis no histórico do git.

### Avaliações como foram recebidas

Texto original, antes da remoção dos emojis. A página mostra os depoimentos
sem as indicações de foto.

- **Sabine Kiyochi:** Loja muito bonita e atendimento impecável.
- **Josi Guerreiro:** A loja é muito aconchegante e fomos muito bem atendidas.
  Peças de qualidade com preços acessíveis. Nota 10!
- **Paula Souza:** Lugar maravilhoso!! Com excelente atendimento e peças lindas
  😍😍 As meninas são muito atenciosas e cuidadosas 🤩

## Estratégia

| Definição | Decisão |
| --- | --- |
| Proposta de valor | O look inteiro resolvido: roupa e acessório no mesmo lugar, mostrados peça por peça |
| Principal objeção | "Vou gostar ao vivo? Tem na minha cor e tamanho, perto de mim?" |
| Conversão prioritária | Conversa no WhatsApp com a loja escolhida, com mensagem já preenchida |
| Ação secundária | Seguir o Instagram @bacanalojass |

## Seções da página

| Ordem | Seção | Âncora | Conteúdo |
| --- | --- | --- | --- |
| 1 | Cabeçalho | | Logo, navegação e CTA de WhatsApp. Fixo no topo |
| 2 | Hero | `#inicio` | Proposta de valor, CTA principal e três fatos (lojas, cidades, WhatsApp) |
| 3 | Looks em detalhes | `#looks` | Quatro looks em abas, com lista de peças e botão "Quero este look" |
| 4 | Coleção | `#colecao` | Três modelos com as cores que aparecem nas fotos |
| 5 | Como comprar | `#como-comprar` | Três passos |
| 6 | Avaliações | `#avaliacoes` | Três depoimentos de clientes, um em destaque |
| 7 | Lojas | `#lojas` | Três endereços, WhatsApp direto e link para o mapa |
| 8 | Chamada final | | Instagram e WhatsApp |
| 9 | Rodapé | | Contatos, redes sociais e navegação |

Componentes de apoio: seletor de loja (janela que abre em todo CTA de WhatsApp)
e barra fixa com CTA no celular.

## Estrutura de arquivos

```
index.html                 conteúdo e SEO
assets/css/styles.css      estilos (tokens de cor e tipografia no topo)
assets/js/main.js          menu, abas dos looks, seletor de loja, barra fixa
assets/img/                imagens otimizadas (geradas pelo script)
assets/fonts/              Fraunces e Figtree (arquivos locais)
tools/optimize-images.py   gera assets/img a partir dos originais
```

## Como atualizar o conteúdo

| O que mudar | Onde |
| --- | --- |
| Textos, endereços, telefones | `index.html` (seções comentadas) |
| Números de WhatsApp | `index.html`: atributo `data-phone` no seletor de loja, links da seção Lojas e do rodapé, e o bloco JSON-LD no `<head>` |
| Mensagem enviada ao WhatsApp | `assets/js/main.js`, constante `MESSAGES` |
| Cores e fontes | `assets/css/styles.css`, bloco `:root` |
| Tamanho dos links do menu no celular | `assets/css/styles.css`, regra `.js .nav__list a` dentro de `@media (max-width: 899px)` |
| Fotos | substitua o original, ajuste a lista `PHOTOS` em `tools/optimize-images.py` e rode o script |
| Foto com faixa branca na borda | acrescente o arquivo à lista `CROPS` do script (esquerda, topo, direita, base, em pixels) e rode o script |
| Avaliações | `index.html`, seção "AVALIAÇÕES". Fotos de perfil: lista `AVATARS` do script |
| Novo look | copie um bloco `<article class="look">` e um botão em `.tabs`, mantendo `id` e `aria-controls` iguais |

Para gerar as imagens (requer Pillow e os materiais de origem na pasta do
projeto):

```bash
python3 tools/optimize-images.py
```

Se a proporção de uma foto mudar, atualize `width` e `height` da tag `<img>`
correspondente no `index.html`, para não haver salto de layout.

### Cache do navegador

Os arquivos de estilo e script são chamados com versão: `styles.css?v=3` e
`main.js?v=3`. Ao alterar um deles, aumente o número no `index.html` para que
os visitantes recebam a versão nova.

## Identidade visual

| Token | Cor | Origem |
| --- | --- | --- |
| `--plum` | `#9B5184` | fundo do logo |
| `--blush` | `#E29BAF` | coração do logo |
| `--ivory` | `#FCF2E2` | contorno claro das letras do logo |
| `--plum-900` | `#3A1B31` | variação escura para textos e seção de contraste |
| `--cream`, `--sand`, `--line` | `#FBF7F1`, `#F3EBE0`, `#E2D4C4` | neutros que continuam o cenário das fotos |

Tipografia: Fraunces (títulos) e Figtree (textos).

O cabeçalho e o rodapé usam exatamente a cor de fundo do logo, para que a
assinatura se integre sem recorte visível.

### Tratamento do logo

O arquivo recebido (`bacana.jpg`) tem 150 x 150 px. Nada foi redesenhado. O
script apenas recorta a margem vazia, amplia a imagem e limpa o ruído de
compressão do fundo, que passa a ter a cor exata `#9B5184`.

## Decisões de conteúdo

- Só foram usados dados fornecidos: nome, segmento, endereços, telefones, redes
  sociais, fotos e avaliações. Não há métricas, prêmios ou promessas inventadas.
- Os nomes das cores na seção Coleção foram descritos a partir das fotos.
- As peças listadas em cada look reproduzem as legendas das próprias imagens.
- Avaliações: o texto é o enviado pelo cliente. Os emojis do depoimento de
  Paula Souza foram removidos; as palavras não foram alteradas.
- Avaliações sem estrelas e sem citação de fonte, porque nota e origem não
  foram informadas.
- Não há formulário, porque não existe destino de envio definido.
- Não há seção de perguntas frequentes, por falta de dados sobre horários,
  pagamento, tamanhos, envio e trocas.

## Testes realizados

Executados em 28/09/2026, em Chromium automatizado (Playwright), nos tamanhos
320, 390, 820, 1366 e 1440 px.

- Revisão visual das capturas de tela em todos os tamanhos.
- Sem erros de console, recursos quebrados ou rolagem horizontal.
- 30 verificações de interação aprovadas: menu no celular, abas por toque e
  teclado, seletor de loja, mensagens do WhatsApp, barra fixa, âncoras, link de
  pular para o conteúdo e revelação na rolagem.
- Página utilizável sem JavaScript.
- Contraste AA em todos os pares de texto (mínimo de 4,55:1).
- Carga inicial no celular de 477 KB, sem saltos de layout (CLS 0).

Não testado: Safari, Firefox e aparelhos físicos. Dos links de WhatsApp,
Instagram, Facebook e mapas, foi conferido apenas o formato, não se os números
e perfis respondem.

## Histórico de ajustes

| Ajuste | Arquivos |
| --- | --- |
| Versão inicial da página | todos |
| Remoção da faixa branca no topo e na base da foto do look "Marinho e vermelho" | `tools/optimize-images.py`, `assets/img/look-marinho-e-vermelho-*`, `index.html` |
| Inclusão da seção de avaliações com três depoimentos e fotos de perfil | `index.html`, `assets/css/styles.css`, `tools/optimize-images.py`, `assets/img/avaliacao-*` |
| Links do menu no celular reduzidos de 24 px para 17 px, com linhas de 48 px | `assets/css/styles.css` |
| Versão nos arquivos de estilo e script, contra cache | `index.html` |
| Retirada dos materiais de origem do repositório e registro deles no README | `.gitignore`, `README.md` |

## Créditos e licenças

- Fotos, logo, avaliações e fotos de perfil: fornecidos pelo cliente.
- Fraunces e Figtree: SIL Open Font License 1.1, obtidas do Google Fonts e
  hospedadas localmente.
- Ícones do Instagram, Facebook, mapa e setas: desenhados para este projeto.
  Ícone do WhatsApp: Simple Icons (CC0).

## Pendências que dependem do cliente

- Logo em vetor (SVG, AI ou PDF) ou em alta resolução.
- Domínio de publicação, para completar `og:image` com URL absoluta e adicionar
  `link rel="canonical"`.
- Horários de funcionamento, formas de pagamento, grade de tamanhos e política
  de envio e troca. Sem esses dados, a página orienta a confirmar com a loja.
- Confirmação de que as peças e cores das fotos estão disponíveis nas três lojas.
- Origem das avaliações (por exemplo, o link do perfil no Google), caso se queira
  citar a fonte, e autorização das clientes para uso de nome e foto no site.
- Fotos de perfil das avaliações têm 72 x 72 px. Ficam nítidas no tamanho usado
  (48 e 56 px), mas não podem ser ampliadas.
