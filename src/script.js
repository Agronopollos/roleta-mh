const monsters = [
  "Chatacabra",
  "Quematrice",
  "Lala Barina",
  "Congalala",
  "Balahara",
  "Doshaguma",
  "Uth Duna",
  "Rompopolo",
  "Rey Dau",
  "Nerscylla",
  "Hirabami",
  "Ajarakan",
  "Nu Udra",
  "Doshaguma Guardião",
  "Rathalos Guardião",
  "Jin Dahaad",
  "Odogaron Negro Guardião",
  "Xu Wu",
  "Arkveld Guardião",
  "Zoh Shia",
  "Yian Kut - Ku",
  "Gypceros",
  "Rathian",
  "Anjanath Fulgurante Guardião",
  "Rathalos",
  "Gravios",
  "Blangonga",
  "Gore Magala",
  "Arkveld",
  "Zoh Shia",

];
const weapons = [
  "Espadão", "Espada Longa", "Espada e Escudo", "Duplas-lâminas",
  "Martelo", "Berrante de Caça", "Lança", "Lançarma",
  "Transmachado", "Lâmina Dínamo", "Glaive Inseto",
  "Fuzilarco Leve", "Fuzilarco Pesado", "Arco"
];
const colors = [
  "#5C4033", // couro
  "#A0522D", // madeira
  "#C0C0C0", // metal
  "#556B2F", // musgo
  "#B22222", // sangue
  "#483D8B", // névoa
  "#708090", // pedra
  "#8B0000", // fogo
  "#2F4F4F", // sombra
  "#DAA520", // ouro
  "#006400", // veneno
  "#4B0082", // energia
];

const canvasMonsters = document.getElementById("wheelMonsters");
const canvasWeapons = document.getElementById("wheelWeapons");
const ctxMonsters = canvasMonsters.getContext("2d");
const ctxWeapons = canvasWeapons.getContext("2d");

const resultMonster = document.getElementById("resultMonster");
const resultWeapon = document.getElementById("resultWeapon");

// Inicializar as variáveis antes de usá-las
let rotationMonster = 0;
let rotationWeapon = 0;

function drawWheel(ctx, items, rotation) {
  // Verificar se o contexto está disponível
  if (!ctx) {
    console.error("Contexto do canvas não encontrado!");
    return;
  }

  // Calcular o maior nome
  const maxTextLength = Math.max(...items.map(item => item.length));

  // Ajustar o tamanho do canvas e da roleta com base no tamanho da tela
  const canvasSize = Math.min(window.innerWidth, window.innerHeight) * 0.8; // 80% do menor lado da tela
  const radius = canvasSize / 2 - 20; // Define o raio da roleta
  ctx.canvas.width = canvasSize;
  ctx.canvas.height = canvasSize;

  // Ângulo por item
  const anglePerItem = (2 * Math.PI) / items.length;

  // Limpar o canvas
  ctx.clearRect(0, 0, canvasSize, canvasSize);

  // Configurar o centro do canvas
  ctx.save();
  ctx.translate(canvasSize / 2, canvasSize / 2);
  ctx.rotate(rotation);

  for (let i = 0; i < items.length; i++) {
    // Desenhar fatia
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.fillStyle = colors[i % colors.length];
    ctx.arc(0, 0, radius, i * anglePerItem, (i + 1) * anglePerItem);
    ctx.fill();

    // Desenhar texto
    ctx.save();
    ctx.rotate(i * anglePerItem + anglePerItem / 2);
    ctx.translate(radius * 0.6, 0); // Posicionar o texto no meio da fatia

    ctx.fillStyle = "#fff";

    // Ajustar dinamicamente o tamanho da fonte
    const fontSize = Math.max(12, Math.min(20, radius / maxTextLength)); // Limitar o tamanho da fonte
    ctx.font = `bold ${fontSize}px Arial`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Garantir que o texto está sendo desenhado
    ctx.fillText(items[i], 0, 0);

    ctx.restore();
  }

  ctx.restore();
}

function resizeCanvas() {
  console.log("Redimensionando canvas...");
  drawWheel(ctxMonsters, monsters, rotationMonster);
  drawWheel(ctxWeapons, weapons, rotationWeapon);
}

// Redimensionar o canvas ao redimensionar a janela
window.addEventListener("resize", resizeCanvas);

// Inicializar roletas
resizeCanvas();

function spinRoulette() {
  const spinTime = 3000;
  const start = performance.now();
  const spinsMonsters = Math.random() * 10 + 5;
  const spinsWeapons = Math.random() * 10 + 5;

  function animate(time) {
    const progress = Math.min((time - start) / spinTime, 1);
    const ease = easeOutCubic(progress);

    rotationMonster = ease * spinsMonsters * 2 * Math.PI;
    rotationWeapon = ease * spinsWeapons * 2 * Math.PI;

    drawWheel(ctxMonsters, monsters, rotationMonster);
    drawWheel(ctxWeapons, weapons, rotationWeapon);

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      const monsterIndex = getSelectedIndex(rotationMonster, monsters.length);
      const weaponIndex = getSelectedIndex(rotationWeapon, weapons.length);

      resultMonster.textContent = monsters[monsterIndex];
      resultWeapon.textContent = weapons[weaponIndex];
    }
  }

  requestAnimationFrame(animate);
}

// Pega o índice com base no ponteiro à esquerda (180° = Math.PI)
function getSelectedIndex(rotation, itemCount) {
  const anglePerItem = (2 * Math.PI) / itemCount;
  const adjustedRotation = (rotation + Math.PI) % (2 * Math.PI);
  const index = Math.floor(itemCount - (adjustedRotation / anglePerItem)) % itemCount;
  return index;
}

// Easing para suavidade da rotação
function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}
