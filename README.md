# 🎓 Convite Paraninfa — 3°A

Convite interativo e "impossível de recusar" para pedir a uma professora
para ser paraninfa da turma.

> ⚠️ **Só na versão web:** os papéis dos botões estão invertidos como
> pegadinha. O botão verde **"SIM!"** é quem foge do mouse (ou do dedo, no
> celular) pra sempre — impossível de clicar nele de propósito. Quem
> realmente aceita é o botão vermelho **"Não"**, parado no lugar. A versão
> Python ainda está no esquema original (Não foge, Sim aceita).

Duas versões equivalentes:

| Versão | Pasta | Como rodar |
|---|---|---|
| Web (HTML/CSS/JS) | [`web/`](web/) | Abra `web/index.html` no navegador (duplo clique) |
| Python (Tkinter) | [`python/`](python/) | `python python/convite_tkinter.py` |

## Antes de usar

1. **Troque os placeholders** em `web/index.html` e `python/convite_tkinter.py`:
   - `[NOME DA PROFESSORA]`
   - `[CURSO]`
2. **Adicione GIFs de comemoração** (opcional, mas deixa muito mais divertido):
   coloque os arquivos em [`assets/gifs/`](assets/gifs/) — os nomes usados
   hoje são `party.gif`, `bread-cat.gif`, `dog_dacing.gif` e `hello-human.gif`
   (veja o `LEIA-ME.txt` da pasta). Sem os arquivos, a página mostra um
   emoji no lugar — nada quebra.
3. **Adicione uma foto lembrança** em [`assets/fotos/foto-turma.jpg`](assets/fotos/)
   — ela é usada no README principal do repositório (veja a raiz do projeto).
4. **Adicione um vídeo/música de comemoração** (opcional, só na versão web)
   em [`assets/musica/musica-comemoracao.mp4`](assets/musica/) — toca
   automaticamente quando ela clicar em SIM. É um arquivo local (não usa
   YouTube), então funciona mesmo abrindo o `index.html` direto.
5. **Sons de zoeira do botão fujão** (opcional, só na versão web):
   [`assets/sons/boom.mp3`](assets/sons/) e [`assets/sons/bruh.mp3`](assets/sons/)
   — toca o boom e, 0,8s depois, o bruh, toda vez que alguém tenta pegar o
   botão "SIM!" e ele foge. A cada 2ª tentativa, toca também
   [`assets/sons/fah.mp3`](assets/sons/) mais 0,8s depois, sem sobrepor.
6. **Fogos de artifício** (opcional, só na versão web) em
   [`assets/sons/fogos1.mp3`](assets/sons/) até `fogos7.mp3` — estouram em
   sequência (uma faixa a cada 0,4s) junto com o vídeo, cortando tudo em
   ~3s. Só o `fogos1.mp3` foi adicionado até agora; os outros são opcionais.

> ⚠️ Ao baixar o vídeo/áudio de comemoração, confira que o arquivo tem
> mesmo imagem (vídeo), não só o áudio disfarçado de `.mp4` — já aconteceu
> de um conversor gerar um "vídeo" que na real era só música com tela
> preta.

## O que cada versão faz

- Tela de convite com pergunta e dois botões.
- O botão fujão foge quando o mouse chega perto (não precisa nem encostar),
  com boom + bruh tocando a cada fuga, e um fah extra a cada 2ª tentativa
  (versão web — na versão Python é sempre o "Não" que foge, sem som de
  zoeira).
- Fundo com ícones flutuando em tamanho médio (SVG temáticos + imagens
  próprias em [`assets/icones/`](assets/icones/)), listras douradas
  sutis e um cartão com detalhe verde/dourado — só na versão web. Todos
  os ícones da versão web são SVG (nenhum emoji).
- Ao aceitar: cai confete, mostra mensagem de comemoração, o vídeo de
  comemoração toca com os fogos de artifício (várias faixas em sequência,
  bem mais altos que o normal) por cima nos primeiros segundos, e a
  galeria de GIFs aparece. O botão "Ver de novo" volta pra tela inicial e
  para a música.
- A versão Python toca um "tim-tim" de vitória (Windows) e também tem
  confete animado em `Canvas`, sem depender de nenhuma biblioteca externa.
  (Ainda usa emoji nos textos e o esquema original de botões — não foi
  atualizada com a inversão nem os novos sons.)

## Estrutura

```
3°A/
├── web/                  → versão HTML/CSS/JS
│   ├── index.html
│   ├── style.css
│   └── script.js
├── python/               → versão Tkinter
│   └── convite_tkinter.py
└── assets/
    ├── gifs/             → GIFs de comemoração
    ├── fotos/            → foto lembrança (usada no README raiz)
    ├── icones/           → imagens próprias do fundo flutuante (só web)
    ├── musica/           → vídeo local que toca ao aceitar
    └── sons/             → boom/bruh/fah (zoeira) e fogos1-7 (comemoração)
```
