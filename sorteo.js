// sorteo.js

// === DEFINICIONES DE CONVERSIÓN DE DUPLICADOS ===
const conversionValues = {
  suprema: 400,      // Para objetos en la pestaña "Suprema" (Apariencia Legendaria)
  exquisita: 200,    // Para objetos en la pestaña "Exquisita"
  deLujo: 80,        // Para objetos en la pestaña "De Lujo" (Apariencia Épica)
  excepcional: 50,   // Para objetos en la pestaña "Excepcional" (Apariencia Especial)
  elite: 20,         // Para objetos de tipo Élite (en "Común")
  basica: 10,        // Para objetos de tipo Básica (en "Común")
  emoji: 3           // Para Emojis de Batalla
};

const obtencionRates = {
  suprema: 0.003,
  deLujo: 0.012,
  excepcional: 0.15,
  elite: 1,
  basica: 10,
  item: 65.835,
  cp_evento: 23
};

// === NUEVO ENFOQUE: PROBABILIDADES POR CATEGORÍA ===
// Estas tasas deben sumar 100.
const categoryRates = {
  suprema: 0.003,
  deLujo: 0.012,
  excepcional: 0.15,
  elite: 1,
  basica: 10,
  item: 65.835,
  cp_evento: 23
};

// Agrupamos skins por categoría (rellena cada grupo según tus datos reales)
const skinsByCategory = {
  suprema: [
    { name: "Renacido de las Rosas", hero: "Alpha", obtained: false },
    { name: "Psión del Mañana", hero: "Guinevere", obtained: false }
  ],
  deLujo: [
    { name: "Lightborn - Defensor", hero: "Tigreal", obtained: false },
    { name: "Hacha Ardiente", hero: "Franco", obtained: false },
    { name: "General Glorioso", hero: "Zilong", obtained: false },
    { name: "Cuervo Shogun", hero: "Freya", obtained: false },
    { name: "S.A.B.E.R. Executor", hero: "Cíclope", obtained: false },
    { name: "Llama Dracónica", hero: "Valir", obtained: false },
    { name: "Armadura de Dragón", hero: "Masha", obtained: false },
    { name: "Ojos de la Eternidad", hero: "Lunox", obtained: false },
    { name: "Rastro Ardiente", hero: "Claude", obtained: false },
    { name: "Fuerza Ardiente", hero: "Aldous", obtained: false },
    { name: "Cuna de Vid", hero: "Chang'e", obtained: false },
    { name: "Bastión Celestial", hero: "Uranus", obtained: false },
    { name: "Código: Rhino", hero: "Grock", obtained: false },
    { name: "Fuego Infernal", hero: "Irithel", obtained: false },
    { name: "Fantasma Pirata", hero: "Roger", obtained: false },
    { name: "S.A.B.E.R. Quebrantadora", hero: "Layla", obtained: false },
    { name: "Bebé Mecha", hero: "Nana", obtained: false },
    { name: "S.A.B.E.R. Regulador", hero: "Saber", obtained: false }
],
  excepcional: [
    { name: "Tigre Furioso", hero: "Chou", obtained: false },
    { name: "Maestro de Cocina", hero: "Franco", obtained: false },
    { name: "Máquina de Pinball", hero: "Uranus", obtained: false },
    { name: "Operación de Campo", hero: "Hanabi", obtained: false },
    { name: "Líder de Carga", hero: "Kimmy", obtained: false },
    { name: "Estrella del Futuro", hero: "Lylia", obtained: false },
    { name: "Ba-tender", hero: "Baxia", obtained: false },
    { name: "Boxeador Subterráneo", hero: "Paquito", obtained: false },
    { name: "Elfa Floral", hero: "Chang'e", obtained: false },
    { name: "Susanoo", hero: "Badang", obtained: false },
    { name: "Petirrojo Blanco", hero: "Kadita", obtained: false },
    { name: "Campeón de Bádminton", hero: "Clint", obtained: false },
    { name: "Barón de Oro", hero: "Tigreal", obtained: false },
    { name: "Extraterrestre", hero: "Zhask", obtained: false },
    { name: "Locura del Bajo", hero: "Hilda", obtained: false },
    { name: "Estrella de Rock", hero: "Sun", obtained: false },
    { name: "Bruja de las Cerezas", hero: "Kagura", obtained: false },
    { name: "Brunicii", hero: "Bruno", obtained: false },
    { name: "Búho Divino", hero: "Alice", obtained: false },
    { name: "Guardia Salvaje", hero: "Balmond", obtained: false }
],
  elite: [
    { name: "Gladiadora", hero: "Freya", obtained: false },
    { name: "Kannagi", hero: "Vale", obtained: false },
    { name: "Fuego Líquido", hero: "Thamuz", obtained: false },
    { name: "Moto Drifter", hero: "X.Borg", obtained: false },
    { name: "Cimitarra Creciente", hero: "Khaleed", obtained: false },
    { name: "Tenko", hero: "Luo Yi", obtained: false },
    { name: "El Ilusionista", hero: "Cecilion", obtained: false },
    { name: "Comandante Shoujo", hero: "Wanwan", obtained: false },
    { name: "Juicio Final", hero: "Granger", obtained: false },
    { name: "Rey Dorado", hero: "Minsitthar", obtained: false },
    { name: "Polvo de Estrellas", hero: "Harith", obtained: false },
    { name: "Muerte", hero: "Aldous", obtained: false },
    { name: "Danza de Pavo Real", hero: "Pharsa", obtained: false },
    { name: "Catástrofe", hero: "Argus", obtained: false },
    { name: "Campeón Imperial", hero: "Lapu-Lapu", obtained: false },
    { name: "Agente Apocalíptico", hero: "Yi Sun-shin", obtained: false },
    { name: "Recluta", hero: "Lolita", obtained: false },
    { name: "Estallido Yama", hero: "Minotauro", obtained: false },
    { name: "Alumna Ejemplar", hero: "Fanny", obtained: false },
    { name: "Monje", hero: "Akai", obtained: false },
],
  basica: [
    { name: "General Mayor", hero: "Yi Sun-shin", obtained: false },
    { name: "Cisne Negro", hero: "Odette", obtained: false },
    { name: "Iris Resplandeciente", hero: "Hanabi", obtained: false },
    { name: "Lunática", hero: "Chang'e", obtained: false },
    { name: "El Fantasma Pálido", hero: "Hanzo", obtained: false },
    { name: "Garra del Tigre", hero: "Belerick", obtained: false },
    { name: "Lanza Santificada", hero: "Silvanna", obtained: false },
    { name: "Factor X", hero: "Beatrix", obtained: false },
    { name: "Encantador Verdant", hero: "Gloo", obtained: false },
    { name: "Espada Ancestral", hero: "Lapu-Lapu", obtained: false },
    { name: "Trono de la Naturaleza", hero: "Aurora", obtained: false },
    { name: "Jefe de Bomberos", hero: "Johnson", obtained: false },
    { name: "Profesor de Infierno", hero: "Gord", obtained: false },
    { name: "Labios Rojo Fuego", hero: "Eudora", obtained: false },
    { name: "Monstruo de los Mares Profundos", hero: "Bane", obtained: false }
]
};

// Ítems generales, por ejemplo, emojis o ítems que no sean skins
const itemsByCategory = [
  "¡Sorpresa!",
  "Bastante por favor",
  "Tiempo Agotado",
  "Susurro",
  "ZZZ",
  "Marioneta",
  "Descarada Selena",
  "¡Esfuérzate más!",
  "Pruébame"
];

// Ítems de evento (por ejemplo, "50 Corona Pecaminosa")
const cpEventoItems = [
  "50 Corona Pecaminosa"
];

// Calcula la suma total de las tasas (debe ser 100)
const totalRate = Object.values(categoryRates).reduce((sum, val) => sum + val, 0);

// === Función para seleccionar una categoría según las tasas oficiales ===
function selectCategory() {
  let rand = Math.random() * totalRate; // Número entre 0 y 100
  for (const cat in categoryRates) {
    rand -= categoryRates[cat];
    if (rand <= 0) {
      return cat;
    }
  }
  return "cp_evento"; // Fallback
}

// === Función getRandomOutcome() utilizando el nuevo enfoque ===
function getRandomOutcome() {
  const category = selectCategory();

  // Si la categoría es "item", elegimos aleatoriamente de itemsByCategory:
  if (category === "item") {
    const randomIndex = Math.floor(Math.random() * itemsByCategory.length);
    return itemsByCategory[randomIndex];
  }
  // Si la categoría es "cp_evento", elegimos aleatoriamente de cpEventoItems:
  if (category === "cp_evento") {
    const randomIndex = Math.floor(Math.random() * cpEventoItems.length);
    return cpEventoItems[randomIndex];
  }
  // Para las demás categorías, seleccionamos aleatoriamente de skinsByCategory:
  const group = skinsByCategory[category];
  if (!group || group.length === 0) return "Sin premio (error)";
  const randomIndex = Math.floor(Math.random() * group.length);
  return group[randomIndex].name; // Se retorna el nombre; si se necesita más info, se puede retornar el objeto.
}

// === Función para determinar la categoría a la que pertenece un skin dado su nombre ===
function determineCategory(skinName) {
  for (const cat in skinsByCategory) {
    if (skinsByCategory[cat].some(skin => skin.name === skinName)) {
      return cat;
    }
  }
  // Si no se encuentra, se puede determinar si es un ítem general o cp_evento:
  if (itemsByCategory.includes(skinName)) return "item";
  if (cpEventoItems.includes(skinName)) return "cp_evento";
  return "basica"; // Por defecto
}

// === FUNCIONES DE DUPLICADOS Y REGISTRO ===
function getConversionValue(item, categoriaOriginal) {
  return conversionValues[categoriaOriginal] || 0;
}

let userCP = 0;
const obtainedRegistry = {};

// === Variables globales del simulador ===
let totalDraws = 0;
let totalDiamondsSpent = 0;
let totalCrowns = 0;
let wishPoints = 0;
let first1xUsed = false;
let first10xUsed = false;
let milestoneRewardsGiven = {15: false, 20: false, 30: false, 40: false, 50: false};

// === Funciones de sorteo (draw1x y draw10x) ===
function draw1x() {
  let cost = first1xUsed ? 100 : 50;
  first1xUsed = true;
  let outcome = getRandomOutcome();
  let gainedWish = generateWishPoints();
  // Garantiza al 10º sorteo que se obtenga un premio Especial si no hay ninguno especial
  if (totalDraws === 9 && !hasSpecialOrBetter([outcome])) {
    outcome = "Apariencia Especial";
  }
  totalDraws++;
  totalDiamondsSpent += cost;
  wishPoints += gainedWish;
  let outcomeText = outcome;
  // Determinar la categoría para la conversión (para duplicados)
  const cat = determineCategory(outcome);
  if (obtainedRegistry[outcome]) {
    let cpEarned = getConversionValue({ name: outcome }, cat);
    totalCrowns += cpEarned;
    outcomeText += ` (duplicado, +${cpEarned} CP)`;
  } else {
    obtainedRegistry[outcome] = true;
  }
  addLog(`Sorteo 1X (coste ${cost}) → ${outcomeText}, +${gainedWish} Pts Deseo`);
  checkMilestones();
  updateUI();
}

function draw10x() {
  let cost = first10xUsed ? 1000 : 500;
  first10xUsed = true;
  let outcomes = [];
  let totalWishThisDraw = 0;
  for (let i = 0; i < 10; i++) {
    let outcome = getRandomOutcome();
    let gainedWish = generateWishPoints();
    totalWishThisDraw += gainedWish;
    outcomes.push(outcome);
  }
  if (totalDraws < 10 && (totalDraws + 10) >= 10) {
    if (!hasSpecialOrBetter(outcomes)) {
      outcomes[9] = "Apariencia Especial";
    }
  }
  totalDraws += 10;
  totalDiamondsSpent += cost;
  wishPoints += totalWishThisDraw;
  let detailResults = "";
  let countCoronaSuelta = 0;
  outcomes.forEach((res, idx) => {
    if (res === "Corona Pecaminosa (suelta)") {
      countCoronaSuelta++;
      res = "Corona Pecaminosa (+1)";
    }
    let resText = res;
    const cat = determineCategory(res);
    if (obtainedRegistry[res]) {
      let cpEarned = getConversionValue({ name: res }, cat);
      totalCrowns += cpEarned;
      resText += ` (duplicado, +${cpEarned} CP)`;
    } else {
      obtainedRegistry[res] = true;
    }
    detailResults += `Tirada ${idx+1}: ${resText} | `;
  });
  if (countCoronaSuelta > 0) totalCrowns += countCoronaSuelta;
  addLog(`Sorteo 10X (coste ${cost}) → ${detailResults} +${totalWishThisDraw} Pts Deseo`);
  checkMilestones();
  updateUI();
}

// === Funciones restantes (hasSpecialOrBetter, generateWishPoints, etc.) ===
function hasSpecialOrBetter(results) {
  const specialOrBetter = [
    "Renacido de las Rosas", "Psión del Mañana",
    "Dragón Demoníaco", "Ninja Lunar", "Señor Volcánico Supremo", "Dios de las Montañas",
    "Lanzador de Sueños", "Duelista de la Perdición", "Centinela", "Magia Lunar",
    "Halcón de las Rosas", "Matador Real",
    "Lightborn - Defensor", "Hacha Ardiente", "General Glorioso", "Cuervo Shogun",
    "S.A.B.E.R. Executor", "Llama Dracónica", "Armadura de Dragón", "Ojos de la Eternidad",
    "Rastro Ardiente", "Fuerza Ardiente", "Cuna de Vid", "Bastión Celestial", "Código: Rhino",
    "Fuego Infernal", "Fantasma Pirata", "S.A.B.E.R. Quebrantadora", "Bebé Mecha",
    "S.A.B.E.R. Regulador"
  ];
  return results.some(r => specialOrBetter.includes(r));
}

function generateWishPoints() {
  if (Math.random() < 0.001) return 1000;
  return Math.floor(Math.random() * 11) + 5;
}

function checkMilestones() {
  [15,20,30,40,50].forEach(m => {
    if (!milestoneRewardsGiven[m] && totalDraws >= m) {
      milestoneRewardsGiven[m] = true;
      let reward = (m === 15 || m === 20 || m === 30) ? 15 : 30;
      totalCrowns += reward;
      addLog(`Has alcanzado ${m} tiradas. ¡Recibes +${reward} Coronas!`);
    }
  });
}

function updateUI() {
  document.getElementById("total-draws").textContent = totalDraws;
  document.getElementById("diamonds-spent").textContent = totalDiamondsSpent;
  document.getElementById("crown-count").textContent = totalCrowns;
  document.getElementById("wish-points").textContent = wishPoints;
  let progress = totalDraws > 50 ? 100 : (totalDraws / 50) * 100;
  document.getElementById("progress-bar").style.width = progress + "%";
  if (first1xUsed) {
    document.getElementById("cost-1x").textContent = "100";
    document.getElementById("badge-1x").style.display = "none";
  }
  if (first10xUsed) {
    document.getElementById("cost-10x").textContent = "1000";
    document.getElementById("badge-10x").style.display = "none";
  }
}

function addLog(message) {
  const time = new Date().toLocaleTimeString();
  const p = document.createElement("p");
  p.innerHTML = `<span class="highlight">[${time}]</span> ${message}`;
  document.getElementById("log").prepend(p);
}

// Función para abrir cajas de deseo (simulación; en index.html se mantiene para pruebas)
function openBox(type) {
  let cost = 0, reward = "";
  switch(type) {
    case "comun":
      cost = 200;
      if (wishPoints < cost) return alert("No tienes suficientes Puntos de Deseo.");
      reward = "Apariencia Básica";
      break;
    case "rara":
      cost = 400;
      if (wishPoints < cost) return alert("No tienes suficientes Puntos de Deseo.");
      reward = (Math.random() * 100 < 33) ? "Apariencia Especial" : "Apariencia Élite";
      break;
    case "epica":
      cost = 500;
      if (wishPoints < cost) return alert("No tienes suficientes Puntos de Deseo.");
      reward = "Apariencia Épica";
      break;
    case "legendaria":
      cost = 750;
      if (wishPoints < cost) return alert("No tienes suficientes Puntos de Deseo.");
      reward = "Apariencia Exclusiva ALLSTAR";
      break;
    case "mitica":
      cost = 1000;
      if (wishPoints < cost) return alert("No tienes suficientes Puntos de Deseo.");
      reward = (Math.random() * 100 < 77) ? "Apariencia LuckyBox" : "Apariencia Collector";
      break;
  }
  wishPoints -= cost;
  addLog(`Has abierto Caja de Deseo (${type}) y obtuviste: <strong>${reward}</strong>`);
  updateUI();
}
