const monsters = [
    "Ajarakan", "Arkveld", "Guardian Arkveld", "Balahara", "Blangonga",
    "Chatacabra", "Congalala", "Doshaguma", "Guardian Doshaguma",
    "Gore Magala", "Gravios", "Guardian Ebony Odogaron",
    "Guardian Fulgur Anjanath", "Gypceros", "Hirabami", "Jin Dahaad",
    "Lala Barina", "Mizutsune", "Nerscylla", "Nu Udra", "Quematrice",
    "Rathalos", "Guardian Rathalos", "Rathian", "Rey Dau", "Rompopolo",
    "Uth Duna", "Xu Wu", "Yian Kut-Ku", "Zoh Shia"
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
  
  function drawWheel(ctx, items, rotation) {
    const num = items.length;
    const anglePerItem = (2 * Math.PI) / num;
  
    ctx.clearRect(0, 0, 300, 300);
    ctx.save();
    ctx.translate(150, 150);
    ctx.rotate(rotation);
  
    for (let i = 0; i < num; i++) {
      // Desenhar fatia
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.fillStyle = colors[i % colors.length];
      ctx.arc(0, 0, 150, i * anglePerItem, (i + 1) * anglePerItem);
      ctx.fill();
  
      // Desenhar texto voltado para dentro
      ctx.save();
      ctx.rotate(i * anglePerItem + anglePerItem / 2);
      ctx.translate(65, 0); // Posição próxima ao centro
      ctx.rotate(Math.PI); // Texto virado para dentro
  
          ctx.fillStyle = "#fff";
  
      const baseSize = 18;
      const maxLength = 25; // limite de nome "grande"
      const nameLength = items[i].length;
      const fontSize = Math.max(10, baseSize - Math.floor(nameLength / 2));
  
      ctx.font = `bold ${fontSize}px Comic Sans MS`;
      ctx.textAlign = "right";
      ctx.textBaseline = "middle";
      ctx.fillText(items[i], 0, 0);
  
  
      ctx.restore();
    }
  
    ctx.restore();
  }
  
  let rotationMonster = 0;
  let rotationWeapon = 0;
  
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
  
  // Desenhar roletas inicialmente
  drawWheel(ctxMonsters, monsters, rotationMonster);
  drawWheel(ctxWeapons, weapons, rotationWeapon);
  