// ===== Fundo com ícones flutuando (SVG, sem emoji) =====
const floatingBg = document.getElementById('floating-bg');

const ICONES_SVG = [
  // capelo de formatura
  '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3 1 9l11 6 9-4.91V17h2V9L12 3zm0 13.5L4.5 12.5V16c0 2.21 3.5 4 7.5 4s7.5-1.79 7.5-4v-3.5L12 16.5z"/></svg>',
  // coração
  '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21s-6.7-4.35-9.3-8.1C1 10.2 1.6 6.9 4.4 5.4c2.3-1.2 4.9-.4 6.1 1.5.4.6 1 .6 1.4 0 1.2-1.9 3.8-2.7 6.1-1.5 2.8 1.5 3.4 4.8 1.7 7.5C18.7 16.65 12 21 12 21z"/></svg>',
  // estrela
  '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.86L12 17.77l-6.18 3.23L7 14.14 2 9.27l7.1-1.01z"/></svg>',
  // brilho / sparkle
  '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c.6 4.2 2.8 6.4 7 7-4.2.6-6.4 2.8-7 7-.6-4.2-2.8-6.4-7-7 4.2-.6 6.4-2.8 7-7z"/></svg>',
];

// imagens próprias (colocadas em assets/icones/) entram no mesmo sorteio dos SVGs
const ICONES_IMG = [
  '../assets/icones/coracao.png',
  '../assets/icones/html-icon.webp',
  '../assets/icones/sala-do-futuro.png',
  '../assets/icones/ita.png',
  '../assets/icones/presente-removebg-preview.png',
];

const CORES_ICONES = ['#2ecc71', '#f1c40f', '#ffffff', '#27ae60'];

for (let i = 0; i < 26; i++) {
  const el = document.createElement('span');
  el.className = 'icone-flutuante';

  const usarImagem = Math.random() < 0.35; // 35% das vezes sorteia uma das imagens próprias
  if (usarImagem) {
    const img = document.createElement('img');
    img.src = ICONES_IMG[Math.floor(Math.random() * ICONES_IMG.length)];
    img.alt = '';
    el.appendChild(img);
  } else {
    el.innerHTML = ICONES_SVG[Math.floor(Math.random() * ICONES_SVG.length)];
    el.style.color = CORES_ICONES[Math.floor(Math.random() * CORES_ICONES.length)];
  }

  const tamanho = 28 + Math.random() * 32; // médio: nem miudinho nem gigante
  el.style.width = tamanho + 'px';
  el.style.height = tamanho + 'px';
  el.style.left = Math.random() * 100 + 'vw';
  el.style.animationDuration = (10 + Math.random() * 14) + 's';
  el.style.animationDelay = (Math.random() * 14) + 's';
  floatingBg.appendChild(el);
}

// ===== Botão fujão (inversão: quem foge agora é o "SIM";
//       quem aceita de verdade é o "Não") =====
const btnFujao = document.getElementById('btn-sim'); // continua verde, escrito "SIM!", mas foge
const btnAceitar = document.getElementById('btn-nao'); // continua vermelho, escrito "Não", mas aceita

btnFujao.classList.add('btn-fujao');

const CAMINHO_BOOM = '../assets/sons/boom.mp3';
const CAMINHO_BRUH = '../assets/sons/bruh.mp3';
const CAMINHO_FAH = '../assets/sons/fah.mp3';
const ATRASO_MS = 800; // mesmo atraso usado entre todos os áudios de zoeira
let ultimaZoeira = 0;
let tentativasFuga = 0;

// ===== Imagem de zoeira que aparece junto com o boom =====
const IMAGENS_ZOEIRA = [
  '../assets/zoeira/zoeira.jpg',
  '../assets/zoeira/zoeira1.jpg',
  '../assets/zoeira/zoeira2.jpg',
  '../assets/zoeira/zoeira3.jpg',
  '../assets/zoeira/zoeira4.jpg',
  '../assets/zoeira/zoeira5.jpg',
];
const CANTOS_ZOEIRA = [
  { top: '20px', left: '20px', right: '', bottom: '' },
  { top: '20px', right: '20px', left: '', bottom: '' },
  { bottom: '20px', left: '20px', top: '', right: '' },
  { bottom: '20px', right: '20px', top: '', left: '' },
];
const imgZoeira = document.getElementById('zoeira-imagem');
let timeoutImgZoeira = null;

function mostrarImagemZoeira() {
  const imagem = IMAGENS_ZOEIRA[Math.floor(Math.random() * IMAGENS_ZOEIRA.length)];
  const canto = CANTOS_ZOEIRA[Math.floor(Math.random() * CANTOS_ZOEIRA.length)];

  imgZoeira.src = imagem;
  imgZoeira.style.top = canto.top;
  imgZoeira.style.bottom = canto.bottom;
  imgZoeira.style.left = canto.left;
  imgZoeira.style.right = canto.right;

  imgZoeira.classList.remove('visivel');
  void imgZoeira.offsetWidth; // força reflow pra reiniciar o fade mesmo se já estava aparecendo
  imgZoeira.classList.add('visivel');

  clearTimeout(timeoutImgZoeira);
  timeoutImgZoeira = setTimeout(() => imgZoeira.classList.remove('visivel'), 1100);
}

function tocarZoeira() {
  const agora = Date.now();
  if (agora - ultimaZoeira < 1200) return; // evita som picotado em movimentos muito rápidos
  ultimaZoeira = agora;
  tentativasFuga++;

  new Audio(CAMINHO_BOOM).play().catch(() => {});
  mostrarImagemZoeira();
  setTimeout(() => {
    new Audio(CAMINHO_BRUH).play().catch(() => {});
  }, ATRASO_MS);

  // a cada 2ª tentativa, toca o fah depois do boom+bruh, sem sobrepor
  if (tentativasFuga % 2 === 0) {
    setTimeout(() => {
      new Audio(CAMINHO_FAH).play().catch(() => {});
    }, ATRASO_MS * 2);
  }
}

let posicionado = false;

function posicionarInicial() {
  const rect = btnFujao.getBoundingClientRect();
  btnFujao.style.left = rect.left + 'px';
  btnFujao.style.top = rect.top + 'px';
  posicionado = true;
}

function fugir() {
  const largura = btnFujao.offsetWidth;
  const altura = btnFujao.offsetHeight;
  const margem = 20;

  const maxX = window.innerWidth - largura - margem;
  const maxY = window.innerHeight - altura - margem;

  const novoX = margem + Math.random() * (maxX - margem);
  const novoY = margem + Math.random() * (maxY - margem);

  btnFujao.style.left = novoX + 'px';
  btnFujao.style.top = novoY + 'px';

  tocarZoeira();
}

// Foge ao encostar o mouse
btnFujao.addEventListener('mouseenter', () => {
  if (!posicionado) posicionarInicial();
  fugir();
});

// Foge antes mesmo de tocar, quando o mouse chega perto (efeito "impossível")
document.addEventListener('mousemove', (e) => {
  if (document.getElementById('tela-comemoracao').classList.contains('escondido') === false) return;
  if (!posicionado) posicionarInicial();

  const rect = btnFujao.getBoundingClientRect();
  const centroX = rect.left + rect.width / 2;
  const centroY = rect.top + rect.height / 2;
  const distancia = Math.hypot(e.clientX - centroX, e.clientY - centroY);

  if (distancia < 90) fugir();
});

// Em telas de toque não existe "hover" — foge assim que o dedo tocar
btnFujao.addEventListener('touchstart', (e) => {
  e.preventDefault();
  if (!posicionado) posicionarInicial();
  fugir();
}, { passive: false });

// Se por acaso alguém conseguir clicar, também não deixa passar
btnFujao.addEventListener('click', (e) => {
  e.preventDefault();
  fugir();
});

window.addEventListener('resize', () => {
  if (posicionado) fugir();
});

// ===== Confete =====
const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');
let particulas = [];
let animando = false;

function redimensionarCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
redimensionarCanvas();
window.addEventListener('resize', redimensionarCanvas);

const CORES_CONFETE = ['#2ecc71', '#27ae60', '#f1c40f', '#e74c3c', '#3498db', '#ffffff'];

function criarConfete() {
  particulas = [];
  for (let i = 0; i < 220; i++) {
    particulas.push({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * canvas.height * 0.5,
      largura: 6 + Math.random() * 6,
      altura: 8 + Math.random() * 10,
      cor: CORES_CONFETE[Math.floor(Math.random() * CORES_CONFETE.length)],
      velY: 2 + Math.random() * 3,
      velX: -1.5 + Math.random() * 3,
      rotacao: Math.random() * 360,
      velRotacao: -8 + Math.random() * 16,
    });
  }
  if (!animando) {
    animando = true;
    requestAnimationFrame(loopConfete);
  }
}

function loopConfete() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let algumaVisivel = false;

  for (const p of particulas) {
    p.x += p.velX;
    p.y += p.velY;
    p.rotacao += p.velRotacao;

    if (p.y < canvas.height + 20) algumaVisivel = true;

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate((p.rotacao * Math.PI) / 180);
    ctx.fillStyle = p.cor;
    ctx.fillRect(-p.largura / 2, -p.altura / 2, p.largura, p.altura);
    ctx.restore();
  }

  if (algumaVisivel) {
    requestAnimationFrame(loopConfete);
  } else {
    animando = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

// ===== Transição de telas =====
const telaConvite = document.getElementById('tela-convite');
const telaComemoracao = document.getElementById('tela-comemoracao');
const btnDeNovo = document.getElementById('btn-de-novo');

const CAMINHO_MUSICA = '../assets/musica/musica-comemoracao.mp4';
const playerMusica = document.getElementById('player-musica');

// ===== Susto do FNAF ao entrar na tela de comemoração =====
const CAMINHO_FNAF = '../assets/sons/fnaf.mp3';
let audioFnaf = null;

function tocarFnaf() {
  audioFnaf = new Audio(CAMINHO_FNAF);
  audioFnaf.play().catch(() => {});
}

function pararFnaf() {
  if (!audioFnaf) return;
  audioFnaf.pause();
  audioFnaf.currentTime = 0;
  audioFnaf = null;
}

// ===== Fogos de artifício (mesmo áudio disparado 7x em sequência) =====
const CAMINHO_FOGOS = '../assets/sons/fogos1.mp3';
const QTD_FOGOS = 7;
const INTERVALO_FOGOS_MS = 800; // espaçamento entre o início de cada disparo
const BUFFER_FINAL_MS = 2000; // tempo extra pro último disparo terminar de tocar
const DURACAO_FOGOS_MS = (QTD_FOGOS - 1) * INTERVALO_FOGOS_MS + BUFFER_FINAL_MS;
const GANHO_FOGOS = 1.8; // amplificação além do volume máximo normal (Web Audio)

let audioCtx = null;
function contextoAudio() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  if (audioCtx.state === 'suspended') audioCtx.resume();
  return audioCtx;
}

let fogosAtivos = [];
let timersFogos = [];

function tocarFogos() {
  const ctx = contextoAudio();

  for (let i = 0; i < QTD_FOGOS; i++) {
    const id = setTimeout(() => {
      const audio = new Audio(CAMINHO_FOGOS);
      try {
        const fonte = ctx.createMediaElementSource(audio);
        const ganho = ctx.createGain();
        ganho.gain.value = GANHO_FOGOS;
        fonte.connect(ganho).connect(ctx.destination);
      } catch (erro) {
        // se o Web Audio falhar por algum motivo, toca do jeito normal mesmo
      }
      audio.play().catch(() => {});
      fogosAtivos.push(audio);
    }, i * INTERVALO_FOGOS_MS);
    timersFogos.push(id);
  }

  const idParar = setTimeout(pararFogos, DURACAO_FOGOS_MS);
  timersFogos.push(idParar);
}

function pararFogos() {
  timersFogos.forEach(clearTimeout);
  timersFogos = [];
  fogosAtivos.forEach((audio) => {
    audio.pause();
    audio.currentTime = 0;
  });
  fogosAtivos = [];
}

function tocarMusica() {
  const video = document.createElement('video');
  video.src = CAMINHO_MUSICA;
  video.controls = true;
  video.autoplay = true;
  video.playsInline = true;
  video.onerror = () => {
    playerMusica.innerHTML =
      '<div class="player-placeholder"><span class="icone-placeholder" style="color:#f0d998">' +
      '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z"/></svg>' +
      '</span><br><small>assets/musica/musica-comemoracao.mp4</small></div>';
  };
  playerMusica.innerHTML = '';
  playerMusica.appendChild(video);
}

function pararMusica() {
  const video = playerMusica.querySelector('video');
  if (video) video.pause();
  playerMusica.innerHTML = '';
}

function comemorar() {
  telaConvite.classList.add('escondido');
  telaComemoracao.classList.remove('escondido');
  criarConfete();
  setTimeout(criarConfete, 900);
  setTimeout(criarConfete, 1800);
  tocarMusica();
  tocarFogos();
  tocarFnaf();
}

function voltarInicio() {
  telaComemoracao.classList.add('escondido');
  telaConvite.classList.remove('escondido');
  posicionado = false;
  pararMusica();
  pararFogos();
  pararFnaf();
}

btnAceitar.addEventListener('click', comemorar);
btnDeNovo.addEventListener('click', voltarInicio);
