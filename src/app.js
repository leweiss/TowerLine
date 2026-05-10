const canvas = document.querySelector("#game");
const ctx = canvas.getContext("2d", { alpha: false });
const splashScreen = document.querySelector("#splashScreen");
const instructionsScreen = document.querySelector("#instructionsScreen");
const startGameButton = document.querySelector("#startGameButton");
const instructionsButton = document.querySelector("#instructionsButton");
const instructionsBack = document.querySelector("#instructionsBack");
const instructionsStart = document.querySelector("#instructionsStart");
const endScreen = document.querySelector("#endScreen");
const resultPill = document.querySelector("#resultPill");
const playAgainButton = document.querySelector("#playAgain");
const highScoreForm = document.querySelector("#highScoreForm");
const highScoreName = document.querySelector("#highScoreName");
const saveHighScoreButton = document.querySelector("#saveHighScore");
const highScoreStatus = document.querySelector("#highScoreStatus");
const victoryScores = document.querySelector("#victoryScores");
const vanquishedScores = document.querySelector("#vanquishedScores");
const statsSummary = document.querySelector("#statsSummary");
const statsBody = document.querySelector("#statsBody");
const gameInstructionsButton = document.querySelector("#gameInstructionsButton");
const commandControls = document.querySelector("#commandControls");
const commandButtons = [...document.querySelectorAll("[data-wave-mode]")];

const TAU = Math.PI * 2;
const BOARD_WIDTH = 48;
const EDGE_INSET = 12;
const CENTER_GAP = 24;
const MAX_ENERGY = 100;
const ENERGY_RED = 20;
const ENERGY_GREEN = 60;
const REGEN_RED = 5.8;
const REGEN_YELLOW = 13;
const REGEN_GREEN = 21;
const BASE_REGEN_SCALE = 0.5;
const STRAIN_RECOVERY = 8.4;
const UPKEEP_FREE_LOAD = 2.4;
const UPKEEP_SOFT_CAP = 15;
const UPKEEP_MIN_REGEN = 0.32;
const FORT_LAYER_REGEN_BONUS = 0.22;
const FORT_TOWER_REGEN_BONUS = 0.58;
const FORT_BASTION_REGEN_BONUS = 0.08;
const WALL_BREACH_HEALTH = 0.24;
const WALL_SIEGE_DECAY = 0.18;
const UNIT_SEPARATION_FORCE = 3.8;
const UNIT_FRONTAGE_FORCE = 2.1;
const UNIT_ENCOUNTER_RANGE = 2.65;
const UNIT_FIELD_CONTACT_PADDING = 0.42;
const UNIT_OPPOSING_BODY_FORCE = 1.55;
const MUSTER_ENGAGE_RANGE = 4.6;
const WALL_ATTACK_DAMAGE_MULTIPLIER = 5.6;
const WALL_CONTACT_DAMAGE_RATE = 2.35;
const WALL_CONTACT_BAND = 0.55;
const WIZARD_TOUCH_RADIUS = 1.15;
const TOWER_SHOT_INTERVAL = 0.36;
const TOWER_SHOT_DAMAGE = 2.6;
const TOWER_SHOT_DURATION = 0.34;
const FORT_TOWER_RANGE = 5.4;
const FORT_TOWER_SHOT_INTERVAL = 0.92;
const FORT_TOWER_SHOT_DAMAGE = 1.25;
const BASTION_RANGE = 4.2;
const BASTION_SHOT_INTERVAL = 1.15;
const BASTION_SHOT_DAMAGE = 0.82;
const FORT_ARROW_DURATION = 0.28;
const BREACH_STORM_MARGIN = 0.72;
const SIEGE_ENCIRCLE_SPREAD = 0.58;
const BREACH_DECAY_RATE = 0.064;
const BREACHED_WALL_INSTABILITY_RATE = 2.85;
const BREACHED_WALL_UNRAVEL_RATE = 0.034;
const BREACH_TRAFFIC_WIDEN = 0.065;
const BREACH_MAX_WIDTH = 1.45;
const BREACH_PASS_BAND = 0.72;
const SAPPER_EXPLOSION_DAMAGE = 48;
const SAPPER_EXPLOSION_RADIUS = 2.35;
const SAPPER_DEATH_EXPLOSION_DAMAGE = 18;
const SAPPER_DEATH_WALL_DAMAGE = 28;
const SAPPER_DEATH_EXPLOSION_RADIUS = 2.15;
const SAPPER_BURROW_DURATION = 1.15;
const SAPPER_BURROW_OUTSIDE = 0.72;
const WIZARD_TOWER_AGGRO_RADIUS = 8.5;
const WIZARD_TOWER_PASS_BAND = 4.8;
const GATE_CLOSE_SPEED = 0.9;
const GATE_CLOSED_ARC_LENGTH = 0.55;
const GATE_OPEN_ARC_LENGTH = 1.65;
const FORT_SETTLE_RATE = 0.08;
const FORT_SETTLE_STRENGTH_LOSS = 8;
const FORT_SETTLE_MIN_FACTOR = 0.68;
const FORT_SETTLE_MAX_FACTOR = 0.82;
const FORT_SETTLE_MIN_RADIUS = 2.25;
const FORT_SETTLE_LAYER_GAP = 0.72;
const FORT_PATH_SAMPLE_ARC = 0.28;
const FORT_ASPECT_QUALITY_PENALTY = 0.34;
const FORT_UNEVEN_QUALITY_PENALTY = 0.22;
const FORT_LAND_MARGIN = 0.28;
const MAX_PLANNED_WALLS = 3;
const COMMAND_RADIUS_MAX = 11.6;
const ROOK_HOP_STEP = 0.28;
const ROOK_HOP_DURATION = 0.22;
const UNIT_PACE_RAMP_START = 36;
const UNIT_PACE_RAMP_DURATION = 95;
const UNIT_PACE_MAX_MULTIPLIER = 1.38;
const UNIT_GLYPH_MIN_SCALE = 0.55;
const UNIT_GLYPH_MAX_SCALE = 1.45;
const UNIT_BATCH_COST_STEP = 0.5;
const IDLE_PRESSURE_ENERGY = 78;
const IDLE_PRESSURE_GRACE = 3.8;
const IDLE_PRESSURE_BUILD = 0.16;
const IDLE_PRESSURE_DECAY = 0.5;
const MUSTER_RELEASE_COUNT = 6;
const MUSTER_RELEASE_TIME = 9;
const MUSTER_HOLD_DISTANCE = 1.55;
const MUSTER_SPREAD = 5.6;
const MUSTER_POD_CAPACITY = 5;
const SAPPER_MUSTER_HOLD_DISTANCE = 5.2;
const SAPPER_MUSTER_SPREAD = 3.8;
const SAPPER_MUSTER_POD_CAPACITY = 3;
const SAPPER_MUSTER_SIDE_ANGLE = 1.08;
const WAVE_ATTACK_WINDOW = 5.8;
const BASE_DEFENSE_MARGIN = 5;
const AI_RUSH_RESPONSE_WINDOW = 24;
const AI_RUSH_WARNING_MARGIN = 12;
const FLANK_ROUTE_CHANCE = 0.44;
const FLANK_ARC_MIN = 6.2;
const FLANK_ARC_MAX = 11.4;
const SNEAK_ROUTE_CHANCE = 0.12;
const SNEAK_EDGE_INSET = 3.1;
const SNEAK_REVEAL_PROGRESS = 0.68;
const PLAYER_SIDE = "south";
const MUSIC_MANIFEST_URL = "/assets/music/manifest.json";
const MUSIC_VOLUME = 0.34;
const SPELL_MIN_POINTS = 3;
const SPELL_MIN_LENGTH = 10;
const SPELL_SETTLE_DELAY = 0.58;
const PAWN_DOT_MAX_LENGTH = 18;
const PAWN_DOT_MAX_DIM = 24;
const SPELL_TRAIL_DURATION = 1.35;
const SPELL_IGNITION_DURATION = 1.15;
const SPELL_SCREEN_UNIT = 92;
const OPENING_HINT_DELAY = 3;
const OPENING_HINT_FADE = 0.35;
const OPENING_HINT_LOOP = 2.5;
const HIGH_SCORE_KEY = "towerline.highScores.v1";
const WIN_STREAK_KEY = "towerline.winStreak.v1";
const HIGH_SCORE_NAME_LIMIT = 20;
const HIGH_SCORE_LIMIT = 8;
const SUPABASE_URL = "https://ophqkvkqzxriprqmstkt.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_0mYVes7qaLBawLAsqNpy1A_A1dv3Ujf";
const SUPABASE_SCORE_TABLE = "TowerLineScores";

let lastNow = performance.now();
let elapsed = 0;
let matchTime = 0;
let resetTimer = 0;
let finishedMatchTime = 0;
let winner = null;
let gamePhase = "splash";
let instructionsReturnPhase = "splash";
let openingHintDismissed = false;
let currentScoreResult = null;
let currentScoreSaved = false;
let currentWinStreak = 0;

const unitLabels = {
  pawn: "Pawn",
  lancer: "Lancer",
  blade: "Blade",
  sapper: "Sapper",
  ram: "Battering Ram",
  knight: "Knight",
  crown: "Crown",
};

const music = {
  enabled: false,
  loading: false,
  tracks: [],
  fadeSeconds: 2,
  current: null,
  currentIndex: 0,
};

const fallbackMusicTracks = [
  { id: "last-gate-holds", src: "/assets/music/track-1.m4a" },
  { id: "broken-standard", src: "/assets/music/track-2.m4a" },
  { id: "iron-gate", src: "/assets/music/track-3.m4a" },
];

const rand = (min, max) => min + Math.random() * (max - min);
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const lerp = (a, b, t) => a + (b - a) * t;
const smoothstep = (t) => t * t * (3 - 2 * t);

const unitDefs = {
  pawn: {
    cost: 5,
    count: [1, 6],
    hp: 12,
    speed: 4.2,
    damage: 1.6,
    wallDamage: 0.8,
    range: 0.7,
    radius: 0.42,
    upkeep: 0.14,
  },
  lancer: {
    cost: 12,
    count: [1, 4],
    hp: 18,
    speed: 3.7,
    damage: 2.1,
    wallDamage: 1.8,
    range: 1.25,
    radius: 0.48,
    upkeep: 0.25,
  },
  blade: {
    cost: 16,
    count: [1, 4],
    hp: 22,
    speed: 3.4,
    damage: 3.1,
    wallDamage: 1.2,
    range: 0.78,
    radius: 0.52,
    upkeep: 0.32,
  },
  sapper: {
    cost: 20,
    count: [1, 3],
    hp: 15,
    speed: 3.9,
    damage: 0.8,
    wallDamage: 0,
    range: 0.72,
    radius: 0.5,
    upkeep: 0.36,
  },
  ram: {
    cost: 30,
    count: [1, 2],
    hp: 38,
    speed: 2.35,
    damage: 0.7,
    wallDamage: 4.1,
    range: 0.72,
    radius: 0.74,
    upkeep: 0.7,
  },
  knight: {
    cost: 28,
    count: [1, 3],
    hp: 30,
    speed: 5.3,
    damage: 3.6,
    wallDamage: 1.7,
    range: 0.82,
    radius: 0.62,
    upkeep: 0.55,
  },
  crown: {
    cost: 42,
    count: [1, 2],
    hp: 34,
    speed: 2.7,
    damage: 1.8,
    wallDamage: 0.8,
    range: 0.92,
    radius: 0.68,
    aura: 4.2,
    upkeep: 0.72,
  },
};

const factions = [
  createFaction("north", "#d96b5f", "#ffc2a8"),
  createFaction("south", "#62d2c5", "#dcffe8"),
];

const units = [];
const manifests = [];
const bursts = [];
const towerShots = [];
const spellTrails = [];
let activeSpellGesture = null;
let pendingSpellGesture = null;
let spellTrailId = 0;

function createFaction(side, color, accent) {
  const controller = side === PLAYER_SIDE ? "player" : "ai";

  return {
    side,
    controller,
    color,
    accent,
    energy: MAX_ENERGY,
    debt: 0,
    wizardHp: 120,
    wizardMaxHp: 120,
    commandRadius: 5.8,
    wizard: { x: BOARD_WIDTH / 2, y: 0 },
    rings: [],
    draw: null,
    plannedWalls: [],
    nextDecision: initialControllerDelay({ controller }),
    waveMode: "muster",
    waveModeSince: 0,
    lastWaveTime: -Infinity,
    musterSide: Math.random() < 0.5 ? -1 : 1,
    idleTime: 0,
    idlePressure: 0,
    scorePulse: 0,
    towerCooldown: rand(0.12, 0.32),
    stats: createStats(),
  };
}

function createStats() {
  const produced = {};
  const killed = {};
  for (const type of Object.keys(unitDefs)) {
    produced[type] = 0;
    killed[type] = 0;
  }

  return {
    produced,
    killed,
    layersBuilt: 0,
    layersBroken: 0,
    wallsDestroyed: 0,
    sapperDetonations: 0,
    wizardTouches: 0,
  };
}

function resize() {
  const rect = canvas.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.max(1, Math.floor(rect.width * dpr));
  canvas.height = Math.max(1, Math.floor(rect.height * dpr));
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

window.addEventListener("resize", resize);
canvas.addEventListener("pointerdown", beginSpellGesture);
canvas.addEventListener("pointermove", extendSpellGesture);
canvas.addEventListener("pointerup", endSpellGesture);
canvas.addEventListener("pointercancel", cancelSpellGesture);
splashScreen.addEventListener("click", (event) => {
  if (event.target.closest("#instructionsButton")) return;
  startGame();
});
splashScreen.addEventListener("keydown", (event) => {
  if (event.key !== "Enter" && event.key !== " ") return;
  if (event.target !== splashScreen) return;
  event.preventDefault();
  startGame();
});
startGameButton.addEventListener("click", (event) => {
  event.stopPropagation();
  startGame();
});
instructionsButton.addEventListener("click", showInstructions);
gameInstructionsButton.addEventListener("click", showInstructions);
instructionsBack.addEventListener("click", leaveInstructions);
instructionsStart.addEventListener("click", closeInstructions);
playAgainButton.addEventListener("click", startGame);
highScoreForm.addEventListener("submit", saveCurrentHighScore);
highScoreName.addEventListener("input", () => {
  const clean = sanitizeHighScoreName(highScoreName.value);
  if (highScoreName.value !== clean) highScoreName.value = clean;
  updateHighScoreControls();
});
for (const button of commandButtons) {
  button.addEventListener("click", () => {
    const mode = button.dataset.waveMode;
    if (mode === "muster" || mode === "attack") setPlayerWaveMode(mode);
  });
}
commandControls.addEventListener("pointerdown", dismissOpeningHint);
resize();
resetMatch();
requestAnimationFrame(frame);

function startGame() {
  gamePhase = "playing";
  instructionsReturnPhase = "splash";
  lastNow = performance.now();
  splashScreen.hidden = true;
  instructionsScreen.hidden = true;
  endScreen.hidden = true;
  resetMatch();
  syncCommandControls();
  unlockAndStartMusic();
}

function showInstructions(event) {
  event?.stopPropagation();
  const openedFromPlaying = gamePhase === "playing" && !winner;
  instructionsReturnPhase = openedFromPlaying ? "playing" : "splash";
  gamePhase = "instructions";
  splashScreen.hidden = true;
  instructionsScreen.hidden = false;
  endScreen.hidden = true;
  instructionsStart.textContent = openedFromPlaying ? "Continue" : "Begin";
  instructionsBack.textContent = openedFromPlaying ? "Continue" : "Back";
  syncCommandControls();
  instructionsBack.focus({ preventScroll: true });
}

function closeInstructions(event) {
  event?.stopPropagation();
  if (instructionsReturnPhase === "playing" && !winner) {
    resumeGameFromInstructions();
    return;
  }

  startGame();
}

function leaveInstructions(event) {
  event?.stopPropagation();
  if (instructionsReturnPhase === "playing" && !winner) {
    resumeGameFromInstructions();
    return;
  }

  showSplash();
}

function resumeGameFromInstructions() {
  gamePhase = "playing";
  instructionsReturnPhase = "splash";
  lastNow = performance.now();
  splashScreen.hidden = true;
  instructionsScreen.hidden = true;
  endScreen.hidden = true;
  instructionsStart.textContent = "Begin";
  instructionsBack.textContent = "Back";
  syncCommandControls();
  gameInstructionsButton.focus({ preventScroll: true });
}

function showSplash() {
  gamePhase = "splash";
  instructionsReturnPhase = "splash";
  splashScreen.hidden = false;
  instructionsScreen.hidden = true;
  endScreen.hidden = true;
  instructionsStart.textContent = "Begin";
  instructionsBack.textContent = "Back";
  syncCommandControls();
  splashScreen.focus({ preventScroll: true });
}

function beginSpellGesture(event) {
  if (gamePhase !== "playing" || winner) return;
  if (event.pointerType === "mouse" && event.button !== 0) return;

  event.preventDefault();
  dismissOpeningHint();
  canvas.setPointerCapture?.(event.pointerId);
  settlePendingSpellIfReady();
  if (pendingSpellGesture && !pendingIsPawnDotCluster(pendingSpellGesture)) settlePendingSpellIfReady(true);
  const point = canvasPointFromEvent(event);
  activeSpellGesture = {
    pointerId: event.pointerId,
    faction: playerFaction(),
    points: [point],
    pending: pendingSpellGesture,
    startedAt: elapsed,
  };
}

function extendSpellGesture(event) {
  if (!activeSpellGesture || activeSpellGesture.pointerId !== event.pointerId) return;

  event.preventDefault();
  const point = canvasPointFromEvent(event);
  const previous = activeSpellGesture.points.at(-1);
  if (!previous || distance(point, previous) >= 2.5) activeSpellGesture.points.push(point);
}

function endSpellGesture(event) {
  if (!activeSpellGesture || activeSpellGesture.pointerId !== event.pointerId) return;

  event.preventDefault();
  const gesture = activeSpellGesture;
  activeSpellGesture = null;
  canvas.releasePointerCapture?.(event.pointerId);
  const point = canvasPointFromEvent(event);
  if (distance(point, gesture.points.at(-1) ?? point) >= 1.5) gesture.points.push(point);
  releaseSpellGesture(gesture);
}

function cancelSpellGesture(event) {
  if (!activeSpellGesture || activeSpellGesture.pointerId !== event.pointerId) return;
  activeSpellGesture = null;
  canvas.releasePointerCapture?.(event.pointerId);
}

function dismissOpeningHint() {
  openingHintDismissed = true;
}

function canvasPointFromEvent(event) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: clamp(event.clientX - rect.left, 0, rect.width),
    y: clamp(event.clientY - rect.top, 0, rect.height),
    t: elapsed,
  };
}

function releaseSpellGesture(gesture) {
  const pending = gesture.pending ?? createPendingSpellGesture(gesture.faction);
  pending.strokes.push(gesture.points.map((point) => ({ x: point.x, y: point.y, t: point.t })));
  pending.releasedAt = elapsed;
  pending.commitAt = elapsed + SPELL_SETTLE_DELAY;
  pendingSpellGesture = pending;
}

function createPendingSpellGesture(faction) {
  return {
    faction,
    strokes: [],
    releasedAt: elapsed,
    commitAt: elapsed + SPELL_SETTLE_DELAY,
  };
}

function settlePendingSpellIfReady(force = false) {
  if (!pendingSpellGesture) return;
  if (!force && elapsed < pendingSpellGesture.commitAt) return;
  const pending = pendingSpellGesture;
  pendingSpellGesture = null;
  commitPendingSpellGesture(pending);
}

function pendingIsPawnDotCluster(pending) {
  return pending.strokes.every((stroke) => isPawnDotAnalysis(analyzeSpellGesture(simplifyGesturePoints(stroke))));
}

function commitPendingSpellGesture(pending) {
  const strokes = pending.strokes
    .map((stroke) => simplifyGesturePoints(stroke))
    .filter((stroke) => stroke.length > 0);

  if (strokes.length === 0) return;
  if (strokes.length > 1) {
    const analyses = strokes.map((stroke) => analyzeSpellGesture(stroke));
    if (analyses.every(isPawnDotAnalysis)) {
      commitPawnDotCluster(pending.faction, strokes, analyses);
      return;
    }

    for (const stroke of strokes) commitSpellStroke(pending.faction, stroke);
    return;
  }

  const points = strokes[0];
  const analysis = analyzeSpellGesture(points);
  if (isPawnDotAnalysis(analysis)) {
    commitPawnDotCluster(pending.faction, [points], [analysis]);
    return;
  }

  commitSpellStroke(pending.faction, points);
}

function commitSpellStroke(faction, points) {
  let analysis = analyzeSpellGesture(points);
  let castingPoints = points;
  if (analysis.kind === "fort") {
    const closedPoints = autoCloseDefensiveWallPoints(points, analysis);
    if (closedPoints !== points) {
      const closedAnalysis = analyzeSpellGesture(closedPoints);
      analysis = {
        ...closedAnalysis,
        kind: "fort",
        autoClosed: true,
        rawClosedness: analysis.closedness,
        shapeUnevenness: clamp(closedAnalysis.shapeUnevenness + defensiveWallClosurePenalty(analysis) * 0.55, 0, 1),
      };
      castingPoints = closedPoints;
    }
  }

  const trail = addSpellTrail(castingPoints, faction, analysis);
  if (analysis.length < SPELL_MIN_LENGTH || points.length < SPELL_MIN_POINTS) return;

  const draw = createDrawFromGesture(faction, analysis);
  if (!draw) return;

  draw.spellTrailId = trail.id;
  castPlayerDraw(faction, draw);
}

function commitPawnDotCluster(faction, strokes, analyses) {
  const allPoints = strokes.flat();
  const count = Math.min(unitDefs.pawn.count[1], Math.max(1, strokes.length));
  const analysis = analyzeSpellGesture(allPoints.length ? allPoints : [{ x: canvas.clientWidth / 2, y: canvas.clientHeight / 2, t: elapsed }]);
  const trail = addSpellTrailFromStrokes(strokes, faction, { ...analysis, kind: "pawn", length: Math.max(analysis.length, count * 8) });
  const def = unitDefs.pawn;
  const glyphScale = clamp(lerp(UNIT_GLYPH_MIN_SCALE, UNIT_GLYPH_MAX_SCALE, (count - 1) / Math.max(1, unitDefs.pawn.count[1] - 1)), UNIT_GLYPH_MIN_SCALE, UNIT_GLYPH_MAX_SCALE);
  const averageDirectness = analyses.reduce((total, item) => total + item.directness, 0) / Math.max(1, analyses.length);
  const quality = clamp(0.66 + averageDirectness * 0.1 - Math.max(0, count - 4) * 0.025, 0.58, 0.88);
  const cost = unitDrawCost(def, count, quality, 0.84, 1.22);

  castPlayerDraw(faction, {
    kind: "unit",
    age: 0,
    progress: 0,
    duration: clamp(0.42 + glyphScale * 0.28 + cost / 46, 0.58, 3.6),
    cost,
    strain: 0,
    type: "pawn",
    count,
    quality,
    glyphScale,
    lane: analysis.lane,
    spellTrailId: trail.id,
  });
}

function isPawnDotAnalysis(analysis) {
  return analysis.kind === "pawn" || analysis.length <= PAWN_DOT_MAX_LENGTH || analysis.maxDim <= PAWN_DOT_MAX_DIM;
}

function autoCloseDefensiveWallPoints(points, analysis) {
  if (points.length < 3 || analysis.kind !== "fort" || analysis.closedness <= 0.04) return points;
  if (analysis.closedness > 0.72) return points;
  return [...points, { ...points[0], t: points.at(-1).t }];
}

function defensiveWallClosurePenalty(analysis) {
  return clamp((analysis.rawClosedness ?? analysis.closedness) / 0.72, 0, 1);
}

function castPlayerDraw(faction, draw) {
  if (draw.kind === "fort") {
    enforceFortDrawEnclosure(faction, draw);
    constrainFortDrawToMaximumLand(draw);
    refreshFortDrawCost(draw);
    if (!fortDrawFitsCurrentLand(faction, draw)) {
      queuePlannedWall(faction, draw);
      markFactionActed(faction);
      return;
    }
  }

  if (faction.draw) {
    if (draw.kind === "fort") queuePlannedWall(faction, draw);
    return;
  }

  faction.draw = draw;
  faction.nextDecision = Infinity;
  markFactionActed(faction);
}

function addSpellTrail(points, faction, analysis) {
  const trail = {
    id: ++spellTrailId,
    faction,
    points: points.map((point) => ({ x: point.x, y: point.y })),
    age: 0,
    duration: SPELL_TRAIL_DURATION + Math.min(1.1, analysis.length / 420),
    igniteAt: 0.08,
    kind: analysis.kind,
  };
  spellTrails.push(trail);
  return trail;
}

function addSpellTrailFromStrokes(strokes, faction, analysis) {
  const trail = {
    id: ++spellTrailId,
    faction,
    points: strokes.flat().map((point) => ({ x: point.x, y: point.y })),
    strokes: strokes.map((stroke) => stroke.map((point) => ({ x: point.x, y: point.y }))),
    age: 0,
    duration: SPELL_TRAIL_DURATION + Math.min(1.1, analysis.length / 420),
    igniteAt: 0.08,
    kind: analysis.kind,
  };
  spellTrails.push(trail);
  return trail;
}

function updateSpellTrails(dt) {
  if (activeSpellGesture) {
    const points = activeSpellGesture.points;
    for (let i = points.length - 1; i >= 0; i -= 1) {
      if (elapsed - points[i].t <= SPELL_TRAIL_DURATION) break;
      if (points.length > 2) points.splice(i, 1);
    }
  }

  settlePendingSpellIfReady();

  for (const trail of spellTrails) trail.age += dt;
  for (let i = spellTrails.length - 1; i >= 0; i -= 1) {
    if (spellTrails[i].age >= spellTrails[i].duration) spellTrails.splice(i, 1);
  }
}

function resetMatch() {
  matchTime = 0;
  resetTimer = 0;
  finishedMatchTime = 0;
  winner = null;
  openingHintDismissed = false;
  currentScoreResult = null;
  currentScoreSaved = false;
  units.length = 0;
  manifests.length = 0;
  bursts.length = 0;
  towerShots.length = 0;
  spellTrails.length = 0;
  activeSpellGesture = null;
  pendingSpellGesture = null;

  for (const faction of factions) {
    faction.energy = MAX_ENERGY;
    faction.debt = 0;
    faction.wizardHp = faction.wizardMaxHp;
    faction.commandRadius = 5.8;
    faction.rings = [];
    faction.draw = null;
    faction.plannedWalls = [];
    faction.nextDecision = initialControllerDelay(faction);
    faction.waveMode = "muster";
    faction.waveModeSince = 0;
    faction.lastWaveTime = -Infinity;
    faction.musterSide = Math.random() < 0.5 ? -1 : 1;
    faction.idleTime = 0;
    faction.idlePressure = 0;
    faction.scorePulse = 0;
    faction.towerCooldown = rand(0.12, 0.32);
    faction.stats = createStats();
  }

  updateBattleGeometry();
  syncCommandControls();
}

function frame(now) {
  const dt = Math.min(0.05, (now - lastNow) / 1000);
  lastNow = now;
  elapsed += dt;

  update(dt);
  render();
  requestAnimationFrame(frame);
}

function update(dt) {
  if (gamePhase !== "playing" && gamePhase !== "ended") return;

  if (winner) {
    resetTimer += dt;
    updateBursts(dt);
    updateTowerShots(dt, false);
    return;
  }

  matchTime += dt;
  updateBattleGeometry();

  for (const faction of factions) {
    updateFactionEnergy(faction, dt);
    updateDraw(faction, dt);
    updateRings(faction, dt);
    updatePlannedWalls(faction);
    faction.scorePulse = Math.max(0, faction.scorePulse - dt * 1.5);
  }

  updateIdlePressure(dt);
  updateWaveModes(dt);
  updateControllers(dt);
  updateManifests(dt);
  updateTowerShots(dt);
  updateUnits(dt);
  updateBursts(dt);
  updateSpellTrails(dt);
  checkWinner();
}

function updateBattleGeometry() {
  const radius = commandRadiusAt(matchTime);
  const centerDistance = radius * 2 + CENTER_GAP;

  const north = factions[0];
  const south = factions[1];
  north.commandRadius = radius;
  south.commandRadius = radius;
  north.wizard.x = BOARD_WIDTH / 2;
  south.wizard.x = BOARD_WIDTH / 2;
  north.wizard.y = EDGE_INSET;
  south.wizard.y = EDGE_INSET + centerDistance;
}

function commandRadiusAt(t) {
  if (t < 30) return 5.8;
  const growth = clamp((t - 30) / 20, 0, 4);
  const step = Math.floor(growth);
  const phase = smoothstep(growth - step);
  return 5.8 + step * 1.45 + phase * 1.45;
}

function updateFactionEnergy(faction, dt) {
  if (faction.debt > 0) {
    faction.debt = 0;
  }

  const rate = currentManaRegenRate(faction);
  faction.energy = Math.min(MAX_ENERGY, faction.energy + rate * dt);
}

function currentManaRegenRate(faction) {
  return estimatedManaRegenRate(faction);
}

function estimatedManaRegenRate(faction) {
  const baseRate = baseManaRegenRate(faction.energy) + fortManaRegenBonus(faction);
  return baseRate * manaUpkeepMultiplier(faction);
}

function baseManaRegenRate() {
  return REGEN_GREEN * BASE_REGEN_SCALE;
}

function fortManaRegenBonus(faction) {
  return faction.rings.reduce((total, ring) => {
    if (ring.health <= 0) return total;
    const buildFactor = smoothstep(clamp(ring.build, 0, 1));
    const healthFactor = clamp(ring.health / ring.maxHealth, 0, 1);
    const layerBonus = Math.min(1.25, ring.radius / 8) * FORT_LAYER_REGEN_BONUS;
    const towerBonus = ring.towers.length * FORT_TOWER_REGEN_BONUS;
    const bastionBonus = ring.bastions.length * FORT_BASTION_REGEN_BONUS;
    const breachPenalty = ring.breached ? 0.2 : 1;

    return total + (layerBonus + towerBonus + bastionBonus) * buildFactor * healthFactor * breachPenalty;
  }, 0);
}

function manaUpkeepLoad(faction) {
  const soldierLoad = units.reduce((total, unit) => {
    if (unit.faction !== faction) return total;
    return total + (unitDefs[unit.type].upkeep ?? 0.25);
  }, 0);

  const formingLoad = manifests.reduce((total, manifest) => {
    if (manifest.faction !== faction) return total;
    const def = unitDefs[manifest.type];
    return total + (def.upkeep ?? 0.25) * manifest.count * 0.55;
  }, 0);

  return soldierLoad + formingLoad;
}

function manaUpkeepMultiplier(faction) {
  const taxedLoad = Math.max(0, manaUpkeepLoad(faction) - UPKEEP_FREE_LOAD);
  return clamp(1 / (1 + taxedLoad / UPKEEP_SOFT_CAP), UPKEEP_MIN_REGEN, 1);
}

function updateDraw(faction, dt) {
  const draw = faction.draw;
  if (!draw) return;

  const remainingProgress = Math.max(0, 1 - draw.progress);
  const desiredProgress = Math.min(remainingProgress, dt / Math.max(0.1, draw.duration));
  const desiredCost = draw.cost * desiredProgress;

  if (desiredCost <= faction.energy || draw.cost <= 0) {
    faction.energy = Math.max(0, faction.energy - desiredCost);
    draw.progress = clamp(draw.progress + desiredProgress, 0, 1);
    draw.strain = Math.max(0, draw.strain - dt * STRAIN_RECOVERY * 0.35);
  } else {
    const affordableProgress = faction.energy / Math.max(0.001, draw.cost);
    draw.progress = clamp(draw.progress + affordableProgress, 0, 1);
    draw.strain = Math.min(12, draw.strain + dt * 2.4);
    faction.energy = 0;
  }

  draw.age = draw.progress * draw.duration;

  if (draw.progress >= 1) {
    completeDraw(faction, draw);
    faction.draw = null;
    faction.nextDecision = matchTime + nextControllerDelay(faction, draw);
  }
}

function updateRings(faction, dt) {
  for (const ring of faction.rings) {
    if (ring.build < 1) {
      ring.build = Math.min(1, ring.build + dt / ring.buildDuration);
      if (!ring.breached) ring.health = Math.max(ring.health, ring.maxHealth * ring.build * 0.52);
    }
    ring.gateOpen = Math.max(0, ring.gateOpen - dt * GATE_CLOSE_SPEED);
    ring.siegeHeat = Math.max(0, ring.siegeHeat - WALL_SIEGE_DECAY * dt);
    if (ring.breached) {
      const pressure = breachErosionPressure(ring);
      ring.breachWidth = Math.min(BREACH_MAX_WIDTH, (ring.breachWidth || 0.42) + BREACH_DECAY_RATE * pressure * dt);
      erodeBreachedRing(ring, pressure, dt);
      collapseUnsupportedFortParts(ring);
    }
    for (const tower of ring.towers) tower.wake = Math.max(0, tower.wake - dt);
  }

  settleRingRadii(faction, dt);
  updateRookHops(faction, dt);
  faction.rings = faction.rings.filter((ring) => ring.health > 0);
}

function breachErosionPressure(ring) {
  const damagePressure = 1 + (1 - clamp(ring.health / ring.maxHealth, 0, 1)) * 0.85;
  const heatPressure = 1 + clamp(ring.siegeHeat, 0, 2.4) * 0.42;
  const trafficPressure = 1 + Math.min(10, ring.breachTraffic ?? 0) * 0.035;
  return damagePressure * heatPressure * trafficPressure;
}

function erodeBreachedRing(ring, pressure, dt) {
  if (ring.destroyed) return;

  const widthProgress = clamp((ring.breachWidth || 0) / BREACH_MAX_WIDTH, 0, 1);
  const trafficStress = 1 + Math.min(12, ring.breachTraffic ?? 0) * 0.045;
  const instability = BREACHED_WALL_INSTABILITY_RATE * pressure * lerp(0.72, 1.7, widthProgress) * trafficStress;
  const maxHealthLoss = ring.maxHealth * BREACHED_WALL_UNRAVEL_RATE * widthProgress * dt;
  ring.maxHealth = Math.max(1, ring.maxHealth - maxHealthLoss);
  ring.health = Math.min(ring.health, ring.maxHealth);
  ring.health -= instability * dt;

  if (ring.health <= 0) destroyRing(ring, ring.lastDamagedBy);
}

function collapseUnsupportedFortParts(ring) {
  if (!ring.breached || ring.breachAngle === null) return;

  if (!ring.gateCollapsed && gateOverlapsBreach(ring)) {
    ring.gateCollapsed = true;
    ring.gateOpen = 0;
    addFortCollapseBurst(ring, ring.gateAngle, 0.85);
  }

  for (let i = ring.towers.length - 1; i >= 0; i -= 1) {
    const tower = ring.towers[i];
    const padding = tower.radius / Math.max(1, wallRadiusAt(ring, tower.angle)) + 0.04;
    if (!angleInBreach(tower.angle, ring, padding)) continue;
    addFortCollapseBurst(ring, tower.angle, tower.radius * 1.35);
    ring.towers.splice(i, 1);
  }

  for (let i = ring.bastions.length - 1; i >= 0; i -= 1) {
    const bastion = ring.bastions[i];
    if (!angleInBreach(bastion.angle, ring, 0.08)) continue;
    addFortCollapseBurst(ring, bastion.angle, 0.65);
    ring.bastions.splice(i, 1);
  }
}

function gateOverlapsBreach(ring) {
  const gateSupport = gateHalfAngle(ring) + 0.04;
  return angleInBreach(ring.gateAngle, ring, gateSupport);
}

function addFortCollapseBurst(ring, angle, radius) {
  const point = fortPointPosition(ring, angle);
  bursts.push({
    x: point.x,
    y: point.y,
    radius,
    color: "#f5d285",
    age: 0,
    duration: 0.55,
    kind: "break",
  });
}

function settleRingRadii(faction, dt) {
  const rings = faction.rings
    .filter((ring) => ring.health > 0)
    .sort((a, b) => a.radius - b.radius);
  const settledInnerRings = [];

  for (const ring of rings) {
    const collisionStopRadius = minimumNonIntersectingRadius(ring, settledInnerRings);
    const targetRadius = Math.max(ring.settleRadius ?? ring.radius, collisionStopRadius);
    const beforeRadius = ring.radius;

    if (ring.build >= 0.85 && ring.radius > targetRadius) {
      const buildFactor = lerp(0.55, 1, ring.build);
      ring.radius = Math.max(targetRadius, ring.radius - FORT_SETTLE_RATE * buildFactor * dt);
    } else if (ring.radius < collisionStopRadius) {
      ring.radius = collisionStopRadius;
    }

    const shrinkAmount = Math.max(0, beforeRadius - ring.radius);
    if (shrinkAmount > 0) weakenSettlingRing(ring, shrinkAmount);
    settledInnerRings.push(ring);
  }
}

function minimumNonIntersectingRadius(ring, innerRings) {
  if (innerRings.length === 0) return FORT_SETTLE_MIN_RADIUS;

  let requiredRadius = FORT_SETTLE_MIN_RADIUS;
  const samples = ring.style === "round" && innerRings.every((innerRing) => innerRing.style === "round") ? 32 : 96;

  for (let i = 0; i < samples; i += 1) {
    const angle = (i / samples) * TAU;
    const outerFactor = Math.max(0.18, fortRadiusFactor(ring, angle));

    for (const innerRing of innerRings) {
      const innerRadius = wallRadiusAt(innerRing, angle);
      requiredRadius = Math.max(requiredRadius, (innerRadius + FORT_SETTLE_LAYER_GAP) / outerFactor);
    }
  }

  return requiredRadius;
}

function activeFortLayers(faction) {
  return faction.rings
    .filter((ring) => ring.health > 0)
    .sort((a, b) => a.radius - b.radius);
}

function fortWallCostRate(style) {
  return style === "angular" ? 8.3 : 7.2;
}

function fortDrawCost(draw) {
  const messyExtra = (1 - draw.quality) * draw.radius * 3.3;
  return draw.radius * fortWallCostRate(draw.style) + draw.towerCount * 5.8 + draw.vertices * 1.4 + messyExtra;
}

function refreshFortDrawCost(draw) {
  draw.cost = fortDrawCost(draw);
  draw.duration = clamp(1.1 + draw.cost / 48, 1.1, 3.2);
}

function minimumFortDrawRadius(faction, draw) {
  return minimumNonIntersectingRadius(draw, activeFortLayers(faction));
}

function enforceFortDrawEnclosure(faction, draw) {
  const minimumRadius = minimumFortDrawRadius(faction, draw);
  if (draw.radius >= minimumRadius) return;

  const addedRadius = minimumRadius - draw.radius;
  draw.radius = minimumRadius;
  draw.cost += addedRadius * fortWallCostRate(draw.style) * lerp(1, 1.18, 1 - draw.quality);
  draw.duration = Math.max(draw.duration, clamp(1.1 + draw.cost / 48, 1.1, 3.2));
}

function maxFortRadiusFactor(draw) {
  const samples = draw.style === "round" ? 48 : Math.max(96, (draw.vertices || 4) * 28);
  let maxFactor = 1;

  for (let i = 0; i < samples; i += 1) {
    const angle = draw.phase + (i / samples) * TAU;
    maxFactor = Math.max(maxFactor, fortRadiusFactor(draw, angle));
  }

  return Math.max(0.1, maxFactor);
}

function maximumFortDrawRadius(commandRadius, draw) {
  return Math.max(FORT_SETTLE_MIN_RADIUS, (commandRadius - FORT_LAND_MARGIN) / maxFortRadiusFactor(draw));
}

function constrainFortDrawToMaximumLand(draw) {
  const maxRadius = maximumFortDrawRadius(COMMAND_RADIUS_MAX, draw);
  if (draw.radius <= maxRadius) return;

  draw.radius = maxRadius;
  refreshFortDrawCost(draw);
}

function fortDrawFitsCurrentLand(faction, draw) {
  return draw.radius <= maximumFortDrawRadius(faction.commandRadius, draw);
}

function updatePlannedWalls(faction) {
  if (faction.draw || faction.plannedWalls.length === 0) return;

  const draw = faction.plannedWalls[0];
  enforceFortDrawEnclosure(faction, draw);
  constrainFortDrawToMaximumLand(draw);
  if (!fortDrawFitsCurrentLand(faction, draw)) return;

  faction.draw = faction.plannedWalls.shift();
  faction.draw.planned = false;
  faction.draw.progress = 0;
  faction.draw.age = 0;
  faction.draw.strain = 0;
}

function queuePlannedWall(faction, draw) {
  if (faction.plannedWalls.length >= MAX_PLANNED_WALLS) return false;

  constrainFortDrawToMaximumLand(draw);
  draw.planned = true;
  draw.progress = 0;
  draw.age = 0;
  draw.strain = 0;
  faction.plannedWalls.push(draw);

  bursts.push({
    x: faction.wizard.x,
    y: faction.wizard.y,
    radius: draw.radius,
    color: faction.accent,
    age: 0,
    duration: 0.45,
    kind: "ring",
  });

  return true;
}

function weakenSettlingRing(ring, shrinkAmount) {
  const qualityStress = lerp(1.25, 0.78, ring.quality);
  const stressDamage = shrinkAmount * FORT_SETTLE_STRENGTH_LOSS * qualityStress;

  ring.maxHealth = Math.max(18, ring.maxHealth - stressDamage * 0.45);
  const healthFloor = Math.max(1, ring.maxHealth * 0.08);
  ring.health = Math.max(healthFloor, Math.min(ring.health - stressDamage, ring.maxHealth));
}

function updateRookHops(faction, dt) {
  for (const ring of faction.rings) {
    for (const tower of ring.towers) {
      tower.visualRadius ??= ring.radius;
      tower.hopFromRadius ??= tower.visualRadius;
      tower.hopToRadius ??= tower.visualRadius;
      tower.hopAge ??= ROOK_HOP_DURATION;

      if (tower.hopAge < ROOK_HOP_DURATION) {
        tower.hopAge = Math.min(ROOK_HOP_DURATION, tower.hopAge + dt);
        const p = smoothstep(tower.hopAge / ROOK_HOP_DURATION);
        tower.visualRadius = lerp(tower.hopFromRadius, tower.hopToRadius, p);
        continue;
      }

      if (Math.abs(tower.visualRadius - ring.radius) >= ROOK_HOP_STEP) {
        tower.hopFromRadius = tower.visualRadius;
        tower.hopToRadius = ring.radius;
        tower.hopAge = 0;
      }
    }
  }
}

function updateIdlePressure(dt) {
  for (const faction of factions) {
    const enemy = otherFaction(faction);
    const energyFactor = clamp((faction.energy - IDLE_PRESSURE_ENERGY) / (MAX_ENERGY - IDLE_PRESSURE_ENERGY), 0, 1);
    const activePressure = factionHasActivePressure(faction, enemy);
    const isIdle = !faction.draw && faction.debt <= 0 && energyFactor > 0 && !activePressure;

    if (!isIdle) {
      faction.idleTime = Math.max(0, (faction.idleTime ?? 0) - dt * 1.8);
      faction.idlePressure = Math.max(0, (faction.idlePressure ?? 0) - dt * IDLE_PRESSURE_DECAY);
      continue;
    }

    faction.idleTime = (faction.idleTime ?? 0) + dt * lerp(0.7, 1.35, energyFactor);
    if (faction.idleTime > IDLE_PRESSURE_GRACE) {
      faction.idlePressure = Math.min(1, (faction.idlePressure ?? 0) + dt * IDLE_PRESSURE_BUILD * lerp(0.45, 1.25, energyFactor));
    }
  }
}

function factionHasActivePressure(faction, enemy) {
  const hasManifest = manifests.some((manifest) => manifest.faction === faction);
  if (hasManifest) return true;

  return units.some((unit) => (
    unit.faction === faction
    && unit.hp > 0
    && unit.order !== "defend"
    && distance(unit, enemy.wizard) <= enemy.commandRadius + 16
  ));
}

function markFactionActed(faction) {
  faction.idleTime = 0;
  faction.idlePressure = Math.max(0, (faction.idlePressure ?? 0) * 0.25);
}

function playerFaction() {
  return factions.find((faction) => faction.side === PLAYER_SIDE) ?? factions[1];
}

function setPlayerWaveMode(mode) {
  if (gamePhase !== "playing" || winner) return;
  setWaveMode(playerFaction(), mode);
  syncCommandControls();
}

function setWaveMode(faction, mode) {
  if (faction.waveMode === mode && mode !== "attack") return;

  faction.waveMode = mode;
  faction.waveModeSince = matchTime;

  if (mode === "muster") {
    faction.musterSide = Math.random() < 0.5 ? -1 : 1;
    return;
  }

  faction.lastWaveTime = matchTime;
  releaseMusteredUnits(faction);
  markFactionActed(faction);
}

function syncCommandControls() {
  const hideHud = gamePhase !== "playing" || Boolean(winner);
  if (gameInstructionsButton) gameInstructionsButton.hidden = hideHud;
  if (!commandControls) return;
  commandControls.hidden = hideHud;
  const mode = playerFaction().waveMode ?? "muster";

  for (const button of commandButtons) {
    const active = button.dataset.waveMode === mode;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  }
}

function releaseMusteredUnits(faction) {
  for (const unit of units) {
    if (unit.faction !== faction || unit.order !== "muster") continue;
    unit.order = "attack";
    unit.releasedAt = matchTime;
    unit.stallTime = 0;
  }
}

function updateWaveModes() {
  for (const faction of factions) {
    if (faction.controller !== "ai") continue;
    updateAiWaveMode(faction, otherFaction(faction));
  }

  syncCommandControls();
}

function updateAiWaveMode(faction, enemy) {
  const mustered = musteredUnits(faction);
  const pressureOpening = (enemy.idlePressure ?? 0) > 0.34;
  const economy = manaUpkeepMultiplier(faction);
  const attackReady = faction.energy >= 58 && economy >= 0.45;
  const oldestMuster = mustered.reduce((age, unit) => Math.max(age, matchTime - (unit.musteredAt ?? matchTime)), 0);
  const enemyPressure = units.filter((unit) => unit.faction !== faction && distance(unit, faction.wizard) < faction.commandRadius + 8).length;
  const rush = openingRushThreat(faction);
  if (rush.active) {
    faction.rushAlarmUntil = Math.max(faction.rushAlarmUntil ?? 0, matchTime + 5.2);
    if (faction.waveMode === "attack" && mustered.length < MUSTER_RELEASE_COUNT) setWaveMode(faction, "muster");
  }

  if (faction.waveMode === "muster") {
    if (
      mustered.length >= MUSTER_RELEASE_COUNT
      || oldestMuster >= MUSTER_RELEASE_TIME
      || pressureOpening && mustered.length >= 2
      || attackReady && mustered.length >= 4
      || enemyPressure >= 6 && mustered.length >= 2 && !rush.active
    ) {
      setWaveMode(faction, "attack");
    }
    return;
  }

  if (matchTime - (faction.lastWaveTime ?? 0) >= WAVE_ATTACK_WINDOW) {
    setWaveMode(faction, "muster");
  }
}

function musteredUnits(faction) {
  return units.filter((unit) => unit.faction === faction && unit.hp > 0 && unit.order === "muster");
}

function updateControllers() {
  for (const faction of factions) {
    if (faction.controller === "player") continue;
    const rush = faction.controller === "ai" ? openingRushThreat(faction) : null;
    if (faction.draw) {
      if (!shouldInterruptAiDrawForRush(faction, rush)) continue;
      faction.draw = createAiRushDefenseDraw(faction, rush);
      faction.nextDecision = Infinity;
      markFactionActed(faction);
      continue;
    }

    if (matchTime < faction.nextDecision && !rush?.urgent) continue;
    const enemy = otherFaction(faction);
    const nextDraw = faction.controller === "human"
      ? chooseHumanAction(faction, enemy)
      : chooseAction(faction, enemy, rush);
    if (nextDraw) {
      if (nextDraw.kind === "fort" && !fortDrawFitsCurrentLand(faction, nextDraw)) {
        queuePlannedWall(faction, nextDraw);
        faction.nextDecision = matchTime + nextControllerDelay(faction, nextDraw);
        markFactionActed(faction);
        continue;
      }

      faction.draw = nextDraw;
      markFactionActed(faction);
    }
  }
}

function initialControllerDelay(faction) {
  return faction.controller === "human" ? rand(0.35, 0.85) : rand(0.8, 1.4);
}

function nextControllerDelay(faction, draw) {
  if (draw?.emergency) return rand(0.25, 0.72);
  if (faction.controller !== "human") return rand(1.1, 2.6);
  return draw.kind === "fort" ? rand(0.55, 1.55) : rand(0.28, 1.05);
}

function chooseHumanAction(faction, enemy) {
  const enemyPressure = units.filter((unit) => unit.faction !== faction && distance(unit, faction.wizard) < faction.commandRadius + 8).length;
  const friendlyPressure = units.filter((unit) => unit.faction === faction && distance(unit, enemy.wizard) < enemy.commandRadius + 7).length;
  const damagedLayers = faction.rings.filter((ring) => ring.breached || ring.health / ring.maxHealth < 0.42).length;
  const economy = manaUpkeepMultiplier(faction);

  if (shouldHumanRecoverEnergy(faction, enemyPressure, friendlyPressure, economy)) {
    scheduleHumanEnergyRecovery(faction, enemyPressure);
    return null;
  }

  if (faction.rings.length === 0) return createHumanFortDraw(faction, "normal");

  const underAttack = enemyPressure >= 3;
  const hasHealthyEnergy = faction.energy >= ENERGY_GREEN;
  const enemyHasLayers = enemy.rings.some((ring) => ring.health > 0);
  const hasFortified = faction.rings.length >= 2;
  const attackReady = faction.energy >= 58 && economy >= 0.5;
  const pressureOpening = (enemy.idlePressure ?? 0) > 0.34;

  if (underAttack && (damagedLayers > 0 || faction.rings.length < 2) && faction.rings.length < 3 && faction.energy > 26) {
    return createHumanFortDraw(faction, enemyPressure > 5 ? "modest" : "normal");
  }

  if (!underAttack && !hasFortified && faction.energy > 34) {
    return createHumanFortDraw(faction, "normal");
  }

  if (underAttack && friendlyPressure < 4 && faction.energy > 30) {
    return createHumanUnitDraw(faction, "defense");
  }

  if (pressureOpening && faction.energy > 34 && friendlyPressure < 6) {
    return createHumanUnitDraw(faction, enemyHasLayers ? "siege" : "pressure");
  }

  if (hasHealthyEnergy && faction.rings.length < 3 && !attackReady && Math.random() < 0.24) {
    return createHumanFortDraw(faction, "normal");
  }

  if (enemyHasLayers && attackReady && Math.random() < 0.72) {
    return createHumanUnitDraw(faction, "siege");
  }

  if (friendlyPressure < 4 && (attackReady || hasFortified && faction.energy > 46)) {
    return createHumanUnitDraw(faction, underAttack ? "defense" : "wave");
  }

  if (hasHealthyEnergy && faction.rings.length < 3 && Math.random() < 0.12) {
    return createHumanFortDraw(faction, "normal");
  }

  if (faction.energy < 42) return createHumanUnitDraw(faction, "cheap");
  return createHumanUnitDraw(faction, "wave");
}

function shouldHumanRecoverEnergy(faction, enemyPressure, friendlyPressure, economy) {
  if (faction.rings.length === 0) return false;
  if (faction.debt > 0) return true;
  if (enemyPressure >= 6 && faction.energy > 14) return false;
  if (economy < 0.38 && enemyPressure < 5) return true;
  if (faction.energy < 12) return enemyPressure < 5;
  if (faction.energy < ENERGY_RED) return enemyPressure < 4 || friendlyPressure > 1;
  if (faction.energy < 36 && enemyPressure < 3 && friendlyPressure >= 2) return true;
  if (faction.energy < ENERGY_GREEN && enemyPressure === 0) return Math.random() < 0.68;
  return false;
}

function scheduleHumanEnergyRecovery(faction, enemyPressure) {
  const target = enemyPressure > 4 ? 34 : faction.energy < ENERGY_RED ? 52 : 74;
  const debtDelay = faction.debt > 0 ? faction.debt / STRAIN_RECOVERY : 0;
  const estimatedRate = Math.max(0.4, estimatedManaRegenRate(faction));
  const energyDelay = Math.max(0, target - faction.energy) / estimatedRate;
  faction.nextDecision = matchTime + clamp(debtDelay + energyDelay * rand(0.45, 0.78), 0.9, 6.8);
}

function unitGlyphScaleForMode(faction, type, mode) {
  const economy = manaUpkeepMultiplier(faction);
  const energyReady = clamp((faction.energy - ENERGY_RED) / (MAX_ENERGY - ENERGY_RED), 0, 1);
  let upper = lerp(0.86, UNIT_GLYPH_MAX_SCALE, energyReady);

  if (mode === "cheap") upper = 0.76;
  if (mode === "defense") upper -= 0.1;
  if (mode === "siege") upper += 0.12;
  if (mode === "pressure") upper += 0.08;
  if (type === "sapper") upper -= 0.08;
  if (type === "ram") upper -= 0.12;
  if (type === "knight" || type === "crown") upper -= 0.04;

  upper = clamp(upper * lerp(0.82, 1.04, economy), UNIT_GLYPH_MIN_SCALE, UNIT_GLYPH_MAX_SCALE);
  const lower = mode === "cheap"
    ? UNIT_GLYPH_MIN_SCALE
    : Math.min(upper, lerp(UNIT_GLYPH_MIN_SCALE, UNIT_GLYPH_MAX_SCALE, mode === "pressure" ? 0.38 : 0.25));

  return clamp(rand(lower, upper), UNIT_GLYPH_MIN_SCALE, UNIT_GLYPH_MAX_SCALE);
}

function maxUnitBatchForMode(type, mode) {
  const maxCount = unitDefs[type].count[1];
  if (mode === "cheap") return Math.min(maxCount, type === "pawn" ? 2 : 1);
  if (type === "ram" && mode !== "siege") return 1;
  return maxCount;
}

function unitCountFromGlyphScale(type, glyphScale, maxCount = unitDefs[type].count[1]) {
  const [minCount, naturalMax] = unitDefs[type].count;
  const cappedMax = Math.max(minCount, Math.min(naturalMax, maxCount));
  const t = clamp((glyphScale - UNIT_GLYPH_MIN_SCALE) / (UNIT_GLYPH_MAX_SCALE - UNIT_GLYPH_MIN_SCALE), 0, 1);
  return Math.max(minCount, Math.min(cappedMax, Math.round(lerp(minCount, cappedMax, t))));
}

function unitBatchCostMultiplier(count) {
  return 1 + Math.max(0, count - 1) * UNIT_BATCH_COST_STEP;
}

function unitDrawCost(def, count, quality, lowQualityCost, highQualityCost) {
  return def.cost * count * unitBatchCostMultiplier(count) * lerp(lowQualityCost, highQualityCost, 1 - quality);
}

function createHumanFortDraw(faction, scale = "normal") {
  const draw = createFortDraw(faction, scale);
  const pressure = units.filter((unit) => unit.faction !== faction && distance(unit, faction.wizard) < faction.commandRadius + 8).length;

  draw.quality = clamp(draw.quality - rand(0.02, 0.12), 0.48, 0.96);
  draw.cost *= lerp(1.02, 1.14, 1 - draw.quality);
  draw.duration *= rand(1.06, 1.24);
  enforceFortDrawEnclosure(faction, draw);

  if (pressure > 2 && draw.towerCount === 0 && Math.random() < 0.55) {
    draw.towerCount = 1;
    draw.cost += 5.8;
  }

  return draw;
}

function createHumanUnitDraw(faction, intent = "wave") {
  const choices = humanUnitChoices(faction, intent);
  const type = choices[Math.floor(Math.random() * choices.length)];
  const def = unitDefs[type];
  const glyphScale = unitGlyphScaleForMode(faction, type, intent);
  const count = unitCountFromGlyphScale(type, glyphScale, maxUnitBatchForMode(type, intent));
  const quality = clamp(rand(0.56, 1), 0.5, 1);
  const cost = unitDrawCost(def, count, quality, 0.84, 1.22);
  const duration = clamp(0.42 + glyphScale * 0.28 + cost / 46, 0.58, 3.6);

  return {
    kind: "unit",
    age: 0,
    progress: 0,
    duration,
    cost,
    strain: 0,
    type,
    count,
    quality,
    glyphScale,
    lane: humanLaneForIntent(intent),
  };
}

function humanUnitChoices(faction, intent) {
  const enemy = otherFaction(faction);
  if (intent === "cheap" || faction.energy < ENERGY_RED) return ["pawn", "pawn", "pawn", "lancer"];
  if (intent === "defense") return ["pawn", "blade", "blade", "lancer", "knight"];
  if (intent === "pressure") return ["pawn", "pawn", "lancer", "blade", "blade", "knight"];
  if (intent === "siege" && enemy.rings.length > 0) return ["lancer", "sapper", "sapper", "ram", "ram", "blade", "knight"];
  return ["pawn", "lancer", "blade", "blade", "knight", "crown"];
}

function humanLaneForIntent(intent) {
  if (intent === "siege") return rand(-5.8, 5.8);
  if (intent === "pressure") return rand(-6.4, 6.4);
  if (intent === "defense") return rand(-3.2, 3.2);
  return rand(-7.2, 7.2);
}

function chooseAction(faction, enemy, rush = openingRushThreat(faction)) {
  const enemyPressure = units.filter((unit) => unit.faction !== faction && distance(unit, faction.wizard) < faction.commandRadius + 8).length;
  const friendlyPressure = units.filter((unit) => unit.faction === faction && distance(unit, enemy.wizard) < enemy.commandRadius + 7).length;
  const economy = manaUpkeepMultiplier(faction);

  if (rush.active) return createAiRushDefenseDraw(faction, rush);

  if (shouldRecoverEnergy(faction, enemyPressure, friendlyPressure)) {
    scheduleEnergyRecovery(faction, enemyPressure);
    return null;
  }

  const lowEnergy = faction.energy < 38;
  const healthyEnergy = faction.energy >= ENERGY_GREEN;
  const hasFortified = faction.rings.length >= 2;
  const attackReady = faction.energy >= 58 && economy >= 0.5;
  const pressureOpening = (enemy.idlePressure ?? 0) > 0.34;

  if (faction.rings.length === 0) return createFortDraw(faction, "normal");

  if (!hasFortified && enemyPressure < 5 && faction.energy > 34) {
    return createFortDraw(faction, "normal");
  }

  if (pressureOpening && faction.energy > 32 && friendlyPressure < 6) {
    return createUnitDraw(faction, "pressure");
  }

  const wallNeed = enemyPressure > 4 || healthyEnergy && faction.rings.length < 3 && !attackReady && Math.random() < 0.26;
  const unitNeed = attackReady && (enemy.rings.length > 0 || friendlyPressure < 5 || Math.random() < 0.65);

  if (wallNeed && !unitNeed && (healthyEnergy || faction.rings.length === 0 || enemyPressure > 5)) {
    return createFortDraw(faction, lowEnergy ? "modest" : "normal");
  }

  if (unitNeed) return createUnitDraw(faction, "normal");
  if (healthyEnergy && Math.random() < 0.18 && faction.rings.length < 3) return createFortDraw(faction, "normal");
  if (lowEnergy) return createUnitDraw(faction, "cheap");
  return createUnitDraw(faction, "normal");
}

function openingRushThreat(faction) {
  const earlyWindow = matchTime <= AI_RUSH_RESPONSE_WINDOW;
  const warningRadius = faction.commandRadius + BASE_DEFENSE_MARGIN + AI_RUSH_WARNING_MARGIN;
  const threats = units.filter((unit) => (
    unit.faction !== faction
    && unit.hp > 0
    && distance(unit, faction.wizard) <= warningRadius
  ));
  const friendlyHomeUnits = units.filter((unit) => (
    unit.faction === faction
    && unit.hp > 0
    && distance(unit, faction.wizard) <= warningRadius + 4
  )).length;

  if (threats.length === 0) {
    return { active: false, urgent: false, count: 0, lane: 0, friendlyHomeUnits };
  }

  const closest = threats.reduce((best, unit) => Math.min(best, distance(unit, faction.wizard)), Infinity);
  const weightedLane = threats.reduce((total, unit) => {
    const urgency = 1 / Math.max(1, distance(unit, faction.wizard));
    return total + (unit.x - faction.wizard.x) * urgency;
  }, 0);
  const weight = threats.reduce((total, unit) => total + 1 / Math.max(1, distance(unit, faction.wizard)), 0);
  const lane = clamp(weightedLane / Math.max(0.001, weight) * 1.2, -7.5, 7.5);
  const urgent = closest <= homeDefenseRadius(faction) + 3 || threats.length >= 2 || friendlyHomeUnits < threats.length * 1.4;
  const active = earlyWindow || urgent && friendlyHomeUnits < threats.length * 2;

  return { active, urgent, count: threats.length, lane, friendlyHomeUnits };
}

function shouldInterruptAiDrawForRush(faction, rush) {
  if (faction.controller !== "ai" || !rush?.urgent || !faction.draw) return false;
  if (faction.draw.emergency) return false;
  if (faction.rings.length === 0 && faction.draw.kind === "fort") return false;
  if (rush.friendlyHomeUnits >= rush.count * 2) return false;
  return faction.energy > 12 || faction.draw.kind === "fort";
}

function createAiRushDefenseDraw(faction, rush) {
  faction.rushAlarmUntil = Math.max(faction.rushAlarmUntil ?? 0, matchTime + 5.8);
  if (faction.waveMode !== "muster") setWaveMode(faction, "muster");

  const needsFirstWall = faction.rings.length === 0 && (!faction.draw || faction.draw.kind !== "fort");
  if (needsFirstWall && faction.energy > 24) {
    const draw = createFortDraw(faction, "modest");
    draw.emergency = true;
    draw.duration *= 0.82;
    return draw;
  }

  const draw = createUnitDraw(faction, rush.count >= 3 || rush.urgent ? "defense" : "cheap");
  draw.emergency = true;
  draw.lane = rush.lane;
  draw.duration *= 0.78;
  return draw;
}

function shouldRecoverEnergy(faction, enemyPressure, friendlyPressure) {
  const economy = manaUpkeepMultiplier(faction);
  if (faction.rings.length === 0) return false;
  if (enemyPressure >= 6 && faction.energy > 12) return false;
  if (faction.debt > 0) return true;
  if (economy < 0.35 && enemyPressure < 5) return true;
  if (economy < 0.48 && enemyPressure < 4 && friendlyPressure > 0) return true;
  if (faction.energy < 12) return enemyPressure < 5;
  if (faction.energy < ENERGY_RED) return enemyPressure < 4 || friendlyPressure > 1;
  if (faction.energy < 38 && enemyPressure < 3 && friendlyPressure > 0) return true;
  if (faction.energy < ENERGY_GREEN && enemyPressure === 0 && faction.rings.length >= 2) return Math.random() < 0.62;
  return false;
}

function scheduleEnergyRecovery(faction, enemyPressure) {
  const target = enemyPressure > 3 ? 30 : faction.energy < ENERGY_RED ? 48 : 68;
  const debtDelay = faction.debt > 0 ? faction.debt / STRAIN_RECOVERY : 0;
  const estimatedRate = Math.max(0.4, estimatedManaRegenRate(faction));
  const energyDelay = Math.max(0, target - faction.energy) / estimatedRate;
  faction.nextDecision = matchTime + clamp(debtDelay + energyDelay * rand(0.38, 0.62), 0.75, 5.6);
}

function simplifyGesturePoints(points) {
  if (points.length <= 2) return points.slice();
  const simplified = [points[0]];

  for (let i = 1; i < points.length - 1; i += 1) {
    const point = points[i];
    if (distance(point, simplified.at(-1)) >= 5) simplified.push(point);
  }

  simplified.push(points.at(-1));
  return simplified;
}

function analyzeSpellGesture(points) {
  const bounds = gestureBounds(points);
  const width = Math.max(1, bounds.maxX - bounds.minX);
  const height = Math.max(1, bounds.maxY - bounds.minY);
  const maxDim = Math.max(width, height);
  const minDim = Math.max(1, Math.min(width, height));
  const length = gestureLength(points);
  const directness = distance(points[0], points.at(-1)) / Math.max(1, length);
  const closedness = distance(points[0], points.at(-1)) / Math.max(1, maxDim);
  const turnCount = gestureTurnCount(points);
  const intersections = gestureIntersectionCount(points);
  const area = Math.abs(gestureSignedArea(points));
  const normalizedArea = area / Math.max(1, width * height);
  const aspectRatio = width / Math.max(1, height);
  const lane = ((bounds.centerX / Math.max(1, canvas.clientWidth)) - 0.5) * 10;
  const sizeScore = clamp(maxDim / Math.max(1, Math.min(canvas.clientWidth, canvas.clientHeight)), 0, 1);
  const shapeUnevenness = clamp(Math.abs(Math.log(aspectRatio)) * 0.55 + Math.max(0, 0.42 - normalizedArea) * 0.25 + turnCount * 0.018, 0, 1);
  const loopTail = gestureLoopTailSignature(points, bounds, maxDim, normalizedArea, closedness);
  const kind = classifyGestureKind({
    points,
    width,
    height,
    maxDim,
    minDim,
    length,
    directness,
    closedness,
    turnCount,
    intersections,
    normalizedArea,
    loopTail,
  });

  return {
    points,
    bounds,
    width,
    height,
    maxDim,
    minDim,
    length,
    directness,
    closedness,
    turnCount,
    intersections,
    normalizedArea,
    aspectRatio,
    sizeScore,
    shapeUnevenness,
    loopTail,
    lane,
    kind,
  };
}

function classifyGestureKind(gesture) {
  if (gesture.length < 28 || gesture.maxDim < 18) return "pawn";

  if (isDefensiveWallGesture(gesture)) return "fort";
  if (isBladeGesture(gesture)) return "blade";
  if (isKnightArchGesture(gesture)) return "knight";
  if (isSapperGesture(gesture)) return "sapper";

  if (gesture.directness > 0.86 && gesture.turnCount <= 1) return "lancer";

  const zigzag = gestureZigzagSignature(gesture.points);
  if (gesture.turnCount >= 3 && zigzag.endBias === "top") return "crown";
  if (gesture.turnCount >= 3 && zigzag.endBias === "bottom") return "knight";
  if (gesture.turnCount >= 2 && gesture.width > gesture.height * 1.18) return "ram";
  if (gesture.turnCount >= 3) return "knight";
  return gesture.directness > 0.58 ? "lancer" : "blade";
}

function isDefensiveWallGesture(gesture) {
  const bigEnough = gesture.maxDim > 86 && gesture.length > gesture.maxDim * 2.15;
  const loopLike = gesture.normalizedArea > 0.18 && gesture.directness < 0.5;
  const closeEnoughToMend = gesture.closedness < 0.72;
  const compactEnough = gesture.minDim / Math.max(1, gesture.maxDim) > 0.42;
  const notTinySapperLoop = gesture.maxDim > 118 || gesture.normalizedArea > 0.31;

  return bigEnough && loopLike && closeEnoughToMend && compactEnough && notTinySapperLoop;
}

function isSapperGesture(gesture) {
  if (gesture.intersections > 0 || gesture.turnCount > 2) return false;
  const bounds = gestureBounds(gesture.points);
  const first = gesture.points[0];
  const last = gesture.points.at(-1);
  let bottomPoint = gesture.points[0];
  let bottomIndex = 0;
  for (let i = 1; i < gesture.points.length; i += 1) {
    if (gesture.points[i].y > bottomPoint.y) {
      bottomPoint = gesture.points[i];
      bottomIndex = i;
    }
  }

  const bottomProgress = bottomIndex / Math.max(1, gesture.points.length - 1);
  const endpointsHigh = first.y < bounds.centerY && last.y < bounds.centerY;
  const pointLow = bottomPoint.y > bounds.centerY + gesture.height * 0.22;
  const pointCentered = Math.abs(bottomPoint.x - bounds.centerX) < gesture.width * 0.3;
  const openTop = Math.abs(first.x - last.x) > gesture.width * 0.62;
  const bottomNearMiddle = bottomProgress > 0.28 && bottomProgress < 0.72;
  const sizedForSapper = gesture.maxDim >= 34 && gesture.maxDim < 178;
  const angularEnough = gesture.directness > 0.52 && gesture.directness < 0.9 && gesture.length > gesture.maxDim * 1.25;

  return sizedForSapper && endpointsHigh && pointLow && pointCentered && openTop && bottomNearMiddle && angularEnough;
}

function isBladeGesture(gesture) {
  if (gesture.intersections > 0) return false;
  const bounds = gestureBounds(gesture.points);
  const first = gesture.points[0];
  const last = gesture.points.at(-1);
  const endpointsRight = first.x > bounds.centerX && last.x > bounds.centerX;
  const endpointsLeft = first.x < bounds.centerX && last.x < bounds.centerX;
  const endpointsSameSide = endpointsRight || endpointsLeft;
  const curveReachesBelly = endpointsRight
    ? bounds.minX < bounds.centerX - gesture.width * 0.18
    : bounds.maxX > bounds.centerX + gesture.width * 0.18;
  const verticalSweep = Math.abs(first.y - last.y) > gesture.height * 0.54;
  const openCurve = gesture.closedness > 0.46 && gesture.directness > 0.34 && gesture.directness < 0.82;
  const smoothEnough = gesture.turnCount <= 2 && gesture.length > gesture.maxDim * 1.18;
  const cSized = gesture.maxDim >= 34 && gesture.maxDim < 170;
  const tallEnough = gesture.height > gesture.width * 1.05;

  return cSized && endpointsSameSide && curveReachesBelly && verticalSweep && openCurve && smoothEnough && tallEnough;
}

function isKnightArchGesture(gesture) {
  if (gesture.intersections > 0 || gesture.turnCount > 2) return false;
  const bounds = gestureBounds(gesture.points);
  const first = gesture.points[0];
  const last = gesture.points.at(-1);
  const endpointFloor = (first.y + last.y) / 2;
  const archLift = endpointFloor - bounds.minY;
  const endpointsLow = first.y > bounds.centerY && last.y > bounds.centerY;
  const broadArch = gesture.width > gesture.height * 1.08 && gesture.height > 20;
  const openStroke = gesture.closedness > 0.56 && gesture.directness > 0.48 && gesture.directness < 0.92;
  const enoughBend = archLift > gesture.height * 0.46 && gesture.normalizedArea > 0.1;

  return gesture.maxDim >= 34 && gesture.maxDim < 170 && endpointsLow && broadArch && openStroke && enoughBend;
}

function gestureBounds(points) {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  for (const point of points) {
    minX = Math.min(minX, point.x);
    minY = Math.min(minY, point.y);
    maxX = Math.max(maxX, point.x);
    maxY = Math.max(maxY, point.y);
  }

  return {
    minX,
    minY,
    maxX,
    maxY,
    centerX: (minX + maxX) / 2,
    centerY: (minY + maxY) / 2,
  };
}

function gestureLength(points) {
  let total = 0;
  for (let i = 1; i < points.length; i += 1) total += distance(points[i - 1], points[i]);
  return total;
}

function gestureSignedArea(points) {
  let area = 0;
  for (let i = 0; i < points.length; i += 1) {
    const a = points[i];
    const b = points[(i + 1) % points.length];
    area += a.x * b.y - b.x * a.y;
  }
  return area / 2;
}

function gestureTurnCount(points) {
  let turns = 0;
  let previousAngle = null;

  for (let i = 1; i < points.length; i += 1) {
    const a = points[i - 1];
    const b = points[i];
    if (distance(a, b) < 7) continue;
    const angle = Math.atan2(b.y - a.y, b.x - a.x);
    if (previousAngle !== null && Math.abs(angleDelta(angle, previousAngle)) > 0.78) turns += 1;
    previousAngle = angle;
  }

  return turns;
}

function gestureIntersectionCount(points) {
  let count = 0;
  for (let i = 1; i < points.length; i += 1) {
    const a = points[i - 1];
    const b = points[i];
    for (let j = i + 3; j < points.length; j += 1) {
      if (i === 1 && j === points.length - 1) continue;
      if (segmentsIntersect(a, b, points[j - 1], points[j])) count += 1;
    }
  }
  return count;
}

function gestureZigzagSignature(points) {
  const bounds = gestureBounds(points);
  const centerY = bounds.centerY;
  const first = points[0];
  const last = points.at(-1);
  const endBias = first.y < centerY && last.y < centerY
    ? "top"
    : first.y > centerY && last.y > centerY ? "bottom" : "mixed";
  return { endBias };
}

function gestureLoopTailSignature(points, bounds, maxDim, normalizedArea, closedness) {
  const center = { x: bounds.centerX, y: bounds.centerY };
  let farthest = 0;

  for (const point of points) {
    farthest = Math.max(farthest, distance(point, center));
  }

  const endGap = distance(points[0], points.at(-1));
  const stepRatio = Math.max(closedness, farthest / Math.max(1, maxDim) - Math.sqrt(Math.max(0, normalizedArea)) * 0.34);
  return {
    endGap,
    stepRatio: clamp(stepRatio, 0, 1.2),
  };
}

function angleDelta(a, b) {
  return Math.atan2(Math.sin(a - b), Math.cos(a - b));
}

function segmentsIntersect(a, b, c, d) {
  const ab = cross2(a, b, c) * cross2(a, b, d);
  const cd = cross2(c, d, a) * cross2(c, d, b);
  return ab < 0 && cd < 0;
}

function cross2(a, b, c) {
  return (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
}

function createDrawFromGesture(faction, gesture) {
  if (gesture.kind === "fort") return createFortDrawFromGesture(faction, gesture);
  return createUnitDrawFromGesture(faction, gesture);
}

function createFortDrawFromGesture(faction, gesture) {
  const phase = Math.atan2(gesture.points[0].y - gesture.bounds.centerY, gesture.points[0].x - gesture.bounds.centerX);
  const radius = gestureRadiusForFort(faction, gesture);
  const quality = clamp(1 - gesture.shapeUnevenness * 0.72 - clamp(gesture.closedness - 0.12, 0, 1) * 0.22, 0.46, 1);
  const style = gesture.turnCount >= 3 ? "angular" : "round";
  const vertices = style === "angular" ? clamp(Math.round(gesture.turnCount), 3, 8) : 0;
  const towerCount = Math.min(4, Math.max(0, gesture.intersections - (style === "angular" ? 1 : 0)));
  const draw = {
    kind: "fort",
    age: 0,
    progress: 0,
    duration: 1.1,
    cost: 0,
    strain: 0,
    radius,
    quality,
    style,
    towerCount,
    vertices,
    phase,
    drawnAspectRatio: gesture.aspectRatio,
    normalizedAspectRatio: 1,
    unevenness: gesture.shapeUnevenness,
  };

  refreshFortDrawCost(draw);
  return draw;
}

function gestureRadiusForFort(faction, gesture) {
  const currentMax = maximumFortDrawRadius(faction.commandRadius, { style: "round", vertices: 0, phase: 0, quality: 1 });
  const t = smoothstep(clamp((gesture.sizeScore - 0.16) / 0.54, 0, 1));
  return clamp(lerp(FORT_SETTLE_MIN_RADIUS, currentMax, t), FORT_SETTLE_MIN_RADIUS, currentMax);
}

function createUnitDrawFromGesture(faction, gesture) {
  const type = gesture.kind;
  const def = unitDefs[type];
  const glyphScale = clamp(lerp(UNIT_GLYPH_MIN_SCALE, UNIT_GLYPH_MAX_SCALE, gesture.sizeScore * 1.45), UNIT_GLYPH_MIN_SCALE, UNIT_GLYPH_MAX_SCALE);
  const count = unitCountFromGlyphScale(type, glyphScale, maxUnitBatchForMode(type, type === "ram" || type === "sapper" ? "siege" : "wave"));
  const quality = clamp(0.58 + gesture.directness * 0.26 + (1 - gesture.shapeUnevenness) * 0.24 - Math.max(0, gesture.closedness - 0.65) * 0.12, 0.5, 1);
  const cost = unitDrawCost(def, count, quality, 0.84, 1.22);
  const duration = clamp(0.42 + glyphScale * 0.28 + cost / 46, 0.58, 3.6);

  return {
    kind: "unit",
    age: 0,
    progress: 0,
    duration,
    cost,
    strain: 0,
    type,
    count,
    quality,
    glyphScale,
    lane: gesture.lane,
  };
}

function createFortDraw(faction, scale = "normal") {
  const shape = analyzeFortDrawShape(scale);
  const quality = clamp(rand(0.58, 1.04) - shape.qualityPenalty, 0.46, 1);
  const styleRoll = scale === "modest" ? Math.random() * 0.7 : Math.random();
  const style = styleRoll < 0.62 ? "round" : "angular";
  const vertices = style === "angular" ? Math.floor(rand(3, scale === "modest" ? 5.99 : 7.99)) : 0;
  const phase = rand(0, TAU);
  const existing = activeFortLayers(faction);
  const outer = existing.at(-1);
  const drawnMinRadius = faction.commandRadius * rand(0.34, scale === "modest" ? 0.42 : 0.48);
  const enclosingRadius = minimumNonIntersectingRadius({ style, vertices, phase, quality }, existing);
  const minRadius = Math.max(drawnMinRadius, enclosingRadius);
  const radius = outer
    ? clamp(outer.radius + rand(0.75, scale === "modest" ? 1.35 : 2.2), minRadius, faction.commandRadius * rand(0.76, scale === "modest" ? 0.88 : 0.98))
    : minRadius;
  const towers = fortTowerLoopCount(scale, quality);
  const draw = {
    kind: "fort",
    age: 0,
    progress: 0,
    duration: 1.1,
    cost: 0,
    strain: 0,
    radius,
    quality,
    style,
    towerCount: towers,
    vertices,
    phase,
    drawnAspectRatio: shape.drawnAspectRatio,
    normalizedAspectRatio: shape.normalizedAspectRatio,
    unevenness: shape.unevenness,
  };

  constrainFortDrawToMaximumLand(draw);
  refreshFortDrawCost(draw);
  return draw;
}

function analyzeFortDrawShape(scale = "normal") {
  const rawAspect = scale === "modest" ? rand(0.8, 1.22) : rand(0.68, 1.42);
  const aspectError = Math.abs(Math.log(rawAspect));
  const handWobble = scale === "modest" ? rand(0.03, 0.22) : rand(0.04, 0.34);
  const unevenness = clamp(handWobble + aspectError * 0.72, 0, 1);
  const qualityPenalty = clamp(aspectError * FORT_ASPECT_QUALITY_PENALTY + unevenness * FORT_UNEVEN_QUALITY_PENALTY, 0, 0.38);

  return {
    drawnAspectRatio: rawAspect,
    normalizedAspectRatio: 1,
    unevenness,
    qualityPenalty,
  };
}

function fortTowerLoopCount(scale, quality) {
  const loopChance = scale === "modest" ? 0.35 : 0.75;
  if (Math.random() >= loopChance) return 0;

  const loopMax = scale === "modest" ? 2.99 : 4.99;
  const messyLoopPenalty = quality < 0.62 && Math.random() < 0.45 ? 1 : 0;
  return Math.max(1, Math.floor(rand(1, loopMax)) - messyLoopPenalty);
}

function createUnitDraw(faction, scale = "normal") {
  const choices = weightedUnitChoices(faction, scale);
  const type = choices[Math.floor(Math.random() * choices.length)];
  const def = unitDefs[type];
  const glyphScale = unitGlyphScaleForMode(faction, type, scale);
  const count = unitCountFromGlyphScale(type, glyphScale, maxUnitBatchForMode(type, scale));
  const quality = clamp(rand(0.62, 1.03), 0.5, 1);
  const cost = unitDrawCost(def, count, quality, 0.82, 1.18);
  const duration = clamp(0.38 + glyphScale * 0.24 + cost / 48, 0.54, 3.4);

  return {
    kind: "unit",
    age: 0,
    progress: 0,
    duration,
    cost,
    strain: 0,
    type,
    count,
    quality,
    glyphScale,
    lane: rand(-4, 4),
  };
}

function weightedUnitChoices(faction, scale) {
  const economy = manaUpkeepMultiplier(faction);
  if (scale === "defense") return ["pawn", "pawn", "blade", "blade", "lancer", "lancer", "knight"];
  if (scale === "cheap" || faction.energy < ENERGY_RED || economy < 0.48) return ["pawn", "pawn", "pawn", "lancer"];
  if (scale === "pressure") {
    const enemy = otherFaction(faction);
    const list = ["pawn", "pawn", "lancer", "blade", "blade", "knight"];
    if (matchTime > 10 && enemy.rings.length > 0) list.push("sapper", "sapper");
    if (matchTime > 18 && enemy.rings.length > 1) list.push("ram", "ram");
    return list;
  }
  if (faction.energy < 38) return ["pawn", "pawn", "lancer", "blade"];

  const enemy = otherFaction(faction);
  const list = ["pawn", "pawn", "lancer", "blade", "blade"];
  if (matchTime > 8 && enemy.rings.length > 0) list.push("sapper", "sapper");
  if (matchTime > 14 && enemy.rings.length > faction.rings.length) list.push("sapper");
  if (matchTime > 16 && enemy.rings.length > 0) list.push("ram", "ram");
  if (matchTime > 24 && enemy.rings.length >= 2) list.push("ram", "ram");
  if (matchTime > 10) list.push("knight");
  if (matchTime > 18 && faction.energy > 34 && economy > 0.6) list.push("knight", "crown");
  return list;
}

function completeDraw(faction, draw) {
  if (draw.kind === "fort") {
    const ring = makeRing(faction, draw);
    faction.rings.push(ring);
    faction.stats.layersBuilt += 1;
    bursts.push({
      x: faction.wizard.x,
      y: faction.wizard.y,
      radius: draw.radius,
      color: faction.color,
      age: 0,
      duration: 0.75,
      kind: "ring",
    });
    return;
  }

  manifests.push({
    faction,
    type: draw.type,
    count: draw.count,
    quality: draw.quality,
    glyphScale: draw.glyphScale,
    lane: draw.lane,
    age: 0,
    duration: clamp(0.45 + draw.strain / 12, 0.45, 3.6),
    strain: draw.strain,
  });
}

function makeRing(faction, draw) {
  const gateAngle = faction.side === "north" ? Math.PI / 2 : -Math.PI / 2;
  const settleFactor = lerp(FORT_SETTLE_MIN_FACTOR, FORT_SETTLE_MAX_FACTOR, draw.quality);
  const settleRadius = clamp(draw.radius * settleFactor, FORT_SETTLE_MIN_RADIUS, draw.radius);
  const weakSpots = [];
  const unevenWeakness = Math.floor((draw.unevenness ?? 0) * 3);
  const weakCount = (draw.quality > 0.82 ? 1 : draw.quality > 0.66 ? 2 : 4) + unevenWeakness;

  for (let i = 0; i < weakCount; i += 1) {
    weakSpots.push({
      angle: draw.phase + rand(0, TAU),
      width: rand(0.13, 0.32) * (1.15 - draw.quality + (draw.unevenness ?? 0) * 0.28),
    });
  }

  const towers = [];
  for (let i = 0; i < draw.towerCount; i += 1) {
    towers.push({
      angle: draw.phase + (i / draw.towerCount) * TAU + rand(-0.24, 0.24),
      radius: rand(0.55, 0.9),
      visualRadius: draw.radius,
      hopFromRadius: draw.radius,
      hopToRadius: draw.radius,
      hopAge: ROOK_HOP_DURATION,
      wake: rand(0.1, 0.7),
      shotCd: rand(0.3, 1.2),
    });
  }

  const bastions = [];
  for (let i = 0; i < draw.vertices; i += 1) {
    const cornerOffset = draw.style === "angular" ? 0.5 : 0;
    bastions.push({
      angle: draw.phase + ((i + cornerOffset) / Math.max(1, draw.vertices)) * TAU,
      shotCd: rand(0.45, 1.4),
    });
  }

  const maxHealth = (50 + draw.radius * 13) * lerp(0.58, 1.22, draw.quality);
  return {
    faction,
    radius: draw.radius,
    drawnRadius: draw.radius,
    settleRadius,
    style: draw.style,
    vertices: draw.vertices,
    phase: draw.phase,
    quality: draw.quality,
    drawnAspectRatio: draw.drawnAspectRatio ?? 1,
    normalizedAspectRatio: draw.normalizedAspectRatio ?? 1,
    unevenness: draw.unevenness ?? 0,
    maxHealth,
    health: maxHealth * 0.08,
    build: 0,
    buildDuration: clamp(1.2 + draw.cost / 25 + draw.strain / 8 + (1 - draw.quality) * 1.7, 1.5, 8),
    gateAngle,
    gateOpen: 0,
    gateCollapsed: false,
    breached: false,
    breachAngle: null,
    breachWidth: 0,
    breachTraffic: 0,
    brokenRecorded: false,
    destroyed: false,
    siegeHeat: 0,
    weakSpots,
    towers,
    bastions,
  };
}

function updateManifests(dt) {
  for (const manifest of manifests) {
    manifest.age += dt;
    if (manifest.age >= manifest.duration) spawnUnits(manifest);
  }

  for (let i = manifests.length - 1; i >= 0; i -= 1) {
    if (manifests[i].age >= manifests[i].duration) manifests.splice(i, 1);
  }
}

function spawnUnits(manifest) {
  const { faction, type, count, quality, lane } = manifest;
  const enemy = otherFaction(faction);
  const ring = outerRing(faction);
  const direction = faction.side === "north" ? 1 : -1;
  const gateRadius = ring ? wallRadiusAt(ring, ring.gateAngle) : 0;
  const gateY = ring ? faction.wizard.y + Math.sin(ring.gateAngle) * gateRadius : faction.wizard.y + direction * 1.3;
  const gateX = ring ? faction.wizard.x + Math.cos(ring.gateAngle) * gateRadius : faction.wizard.x;

  openDepartureGates(faction);
  const defenseSlots = defenseOrdersNeeded(faction);
  const podCounts = musterPodCounts(faction);
  recordProduced(faction, type, count);

  for (let i = 0; i < count; i += 1) {
    const spread = (i - (count - 1) / 2) * 0.88;
    const def = unitDefs[type];
    const order = type !== "sapper" && i < defenseSlots ? "defend" : faction.waveMode === "attack" ? "attack" : "muster";
    const route = chooseMarchRoute(order === "defend" ? "defend" : "attack", type, lane, i, count);
    const musterPod = order === "muster" ? chooseMusterPod(faction, podCounts, type) : null;
    if (musterPod !== null) podCounts[musterPod] += 1;
    units.push({
      faction,
      type,
      x: gateX + spread,
      y: gateY + direction * rand(0.15, 0.75),
      lane: clamp(lane + spread * 0.55 + rand(-0.42, 0.42), -9, 9),
      hp: def.hp * lerp(0.68, 1.15, quality),
      maxHp: def.hp * lerp(0.68, 1.15, quality),
      quality,
      attackCd: rand(0, 0.6),
      stallTime: 0,
      previousEnemyDistance: undefined,
      order,
      musteredAt: order === "muster" ? matchTime : null,
      musterPod,
      musterOffset: rand(-1, 1) * MUSTER_SPREAD * 0.32 + spread * 0.45,
      route: route.kind,
      flankSide: route.side,
      flankWidth: route.width,
      flankPeak: route.peak,
      spreadSeed: clamp(rand(-1, 1) + spread * 0.22, -1.5, 1.5),
      siegeSeed: clamp(rand(-1, 1) + spread * 0.34 + lane * 0.08, -2, 2),
      siegeAngle: null,
      siegeRing: null,
      wobble: rand(0, TAU),
      target: enemy,
    });
  }
}

function chooseMarchRoute(order, type, lane, index, count) {
  if (order === "defend") return { kind: "home", side: 0, width: 0, peak: 0.48 };

  const laneSide = Math.abs(lane) > 1.2 ? Math.sign(lane) : (Math.random() < 0.5 ? -1 : 1);
  const sneakBias = type === "pawn" ? 0.08 : type === "knight" ? 0.08 : type === "lancer" ? 0.03 : type === "crown" || type === "sapper" || type === "ram" ? -1 : 0;
  if (Math.random() < SNEAK_ROUTE_CHANCE + sneakBias) {
    return {
      kind: "sneak",
      side: laneSide,
      width: 0,
      peak: rand(0.42, 0.58),
    };
  }

  const typeFlankBias = type === "knight" ? 0.2 : type === "pawn" ? -0.06 : type === "crown" ? -0.18 : type === "sapper" ? 0.05 : type === "ram" ? -0.28 : 0;
  const shouldFlank = Math.random() < FLANK_ROUTE_CHANCE + typeFlankBias;
  if (!shouldFlank) return { kind: "direct", side: 0, width: 0, peak: 0.5 };

  const side = count > 1 && index % 2 === 1 ? -laneSide : laneSide;
  const typeWidth = type === "knight" ? 1.15 : type === "crown" ? 0.78 : type === "sapper" ? 0.72 : type === "ram" ? 0.62 : 1;

  return {
    kind: "flank",
    side,
    width: rand(FLANK_ARC_MIN, FLANK_ARC_MAX) * typeWidth,
    peak: rand(0.38, 0.58),
  };
}

function musterPodCounts(faction) {
  const counts = [0, 0, 0, 0, 0];
  for (const unit of units) {
    if (unit.faction !== faction || unit.hp <= 0 || unit.order !== "muster") continue;
    const pod = clamp(Math.floor(unit.musterPod ?? 0), 0, counts.length - 1);
    counts[pod] += 1;
  }
  return counts;
}

function chooseMusterPod(faction, counts, type = "pawn") {
  if (type === "sapper") return chooseSapperMusterPod(faction, counts);
  if (counts[0] < MUSTER_POD_CAPACITY) return 0;
  if (counts[1] < MUSTER_POD_CAPACITY) return 1;
  return 2;
}

function chooseSapperMusterPod(faction, counts) {
  const sideFirst = faction.musterSide === -1 ? 4 : 3;
  const sideSecond = sideFirst === 3 ? 4 : 3;
  if (counts[sideFirst] < SAPPER_MUSTER_POD_CAPACITY) return sideFirst;
  if (counts[sideSecond] < SAPPER_MUSTER_POD_CAPACITY) return sideSecond;
  return counts[sideFirst] <= counts[sideSecond] ? sideFirst : sideSecond;
}

function musterPodAngle(faction, pod) {
  const base = faction.side === "north" ? Math.PI / 2 : -Math.PI / 2;
  if (pod === 0) return base;
  const side = faction.musterSide ?? 1;
  if (pod >= 3) return base + (pod === 3 ? side : -side) * SAPPER_MUSTER_SIDE_ANGLE;
  return base + (pod === 1 ? side : -side) * 0.72;
}

function musterPointForUnit(unit) {
  const faction = unit.faction;
  const ring = outerRing(faction);
  const pod = clamp(Math.floor(unit.musterPod ?? 0), 0, 4);
  const angle = musterPodAngle(faction, pod);
  const wallRadius = ring ? wallRadiusAt(ring, angle) : 1.45;
  const isSapperPod = unit.type === "sapper" || pod >= 3;
  const radius = wallRadius + (isSapperPod ? SAPPER_MUSTER_HOLD_DISTANCE : MUSTER_HOLD_DISTANCE + pod * 0.28);
  const tangent = angle + Math.PI / 2;
  const spreadLimit = isSapperPod ? SAPPER_MUSTER_SPREAD : MUSTER_SPREAD;
  const offset = clamp(unit.musterOffset ?? 0, -spreadLimit, spreadLimit);
  const wobble = Math.sin(unit.wobble * 0.7 + (unit.spreadSeed ?? 0)) * 0.18;

  return {
    x: faction.wizard.x + Math.cos(angle) * radius + Math.cos(tangent) * (offset + wobble),
    y: faction.wizard.y + Math.sin(angle) * radius + Math.sin(tangent) * (offset + wobble),
  };
}

function updateUnits(dt) {
  const dead = new Set();

  for (const unit of units) {
    if (unit.hp <= 0) continue;

    const enemy = otherFaction(unit.faction);
    const def = unitDefs[unit.type];
    unit.attackCd = Math.max(0, unit.attackCd - dt);
    unit.wobble += dt * 3;
    updateMarchingOrder(unit);
    updateUnitMomentum(unit, enemy, dt);

    if (unit.burrowing) {
      continueSapperBurrow(unit, unit.burrowRing, dt);
      continue;
    }

    if (distance(unit, enemy.wizard) <= wizardTouchDistance(unit)) {
      touchWizard(unit, enemy);
      continue;
    }

    const baseAttacker = unit.order === "defend" ? nearestBaseAttacker(unit, unit.faction) : null;
    if (baseAttacker) {
      engageEnemyUnit(unit, baseAttacker, def, dt);
      continue;
    }

    const fieldBlocker = nearestFieldContactEnemy(unit);
    if (fieldBlocker) {
      engageEnemyUnit(unit, fieldBlocker, def, dt);
      continue;
    }

    if (unit.order === "muster") {
      const musterEnemy = nearestEnemyUnit(unit, musterEngageRange(unit));
      if (musterEnemy) {
        engageEnemyUnit(unit, musterEnemy, def, dt);
        continue;
      }

      moveTowardMusterPod(unit, def, dt);
      continue;
    }

    const wallWaypoint = wallTacticWaypoint(unit, enemy);
    if (wallWaypoint) {
      moveTowardPoint(unit, wallWaypoint, def, dt, wallWaypoint.speedScale ?? 1);
      continue;
    }

    const wallBlocker = blockingRing(unit, enemy);
    if (wallBlocker) {
      attackRing(unit, wallBlocker, dt);
      continue;
    }

    const towerRush = shouldAttackWizardTower(unit, enemy);
    if (towerRush) {
      moveTowardWizardTower(unit, enemy, def, dt);
      continue;
    }

    const enemyUnit = nearestEnemyUnit(unit, unitEncounterRange(unit));
    if (enemyUnit) {
      engageEnemyUnit(unit, enemyUnit, def, dt);
      continue;
    }

    moveUnit(unit, enemy, def, dt);
  }

  applyWallContactPressure(dt);
  spreadCrowdedUnits(dt);

  for (const unit of units) if (unit.hp <= 0) dead.add(unit);

  for (let i = units.length - 1; i >= 0; i -= 1) {
    if (!dead.has(units[i])) continue;
    recordUnitKilled(units[i]);
    units.splice(i, 1);
  }
}

function moveUnit(unit, enemy, def, dt) {
  unit.stallTime = Math.max(0, unit.stallTime - dt * 1.6);
  const direction = unit.faction.side === "north" ? 1 : -1;
  const targetX = attackTargetX(unit, enemy);
  const dx = targetX - unit.x;
  const dy = direction * 5.5;
  const crownBoost = nearbyCrownBoost(unit);
  const speed = def.speed * lerp(0.78, 1.12, unit.quality) * (unit.type === "crown" ? 1 : crownBoost);
  moveWithWallCollision(unit, enemy, def, dx, dy, speed * dt);
}

function moveTowardPoint(unit, point, def, dt, speedScale = 1) {
  unit.stallTime = Math.max(0, unit.stallTime - dt * 1.4);
  const dx = point.x - unit.x;
  const dy = point.y - unit.y;
  const crownBoost = nearbyCrownBoost(unit);
  const speed = def.speed * speedScale * lerp(0.78, 1.12, unit.quality) * (unit.type === "crown" ? 1 : crownBoost);
  moveWithWallCollision(unit, otherFaction(unit.faction), def, dx, dy, speed * dt);
}

function moveTowardMusterPod(unit, def, dt) {
  const point = musterPointForUnit(unit);
  const dx = point.x - unit.x;
  const dy = point.y - unit.y;
  const d = Math.hypot(dx, dy);

  if (d <= 0.34) {
    unit.stallTime = Math.max(0, unit.stallTime - dt * 1.8);
    return;
  }

  const speedScale = d > 2.5 ? 0.86 : 0.52;
  moveTowardPoint(unit, point, def, dt, speedScale);
}

function updateUnitMomentum(unit, enemy, dt) {
  if (unit.order === "muster") {
    unit.stallTime = Math.max(0, unit.stallTime - dt * 2);
    unit.previousEnemyDistance = distance(unit, enemy.wizard);
    return;
  }

  const currentDistance = distance(unit, enemy.wizard);
  if (unit.previousEnemyDistance !== undefined && currentDistance > unit.previousEnemyDistance - 0.035) {
    unit.stallTime = Math.min(12, unit.stallTime + dt);
  } else {
    unit.stallTime = Math.max(0, unit.stallTime - dt * 2.2);
  }
  unit.previousEnemyDistance = currentDistance;
}

function pressForward(unit, enemy, def, dt, force) {
  const direction = unit.faction.side === "north" ? 1 : -1;
  const targetX = attackTargetX(unit, enemy);
  const dx = targetX - unit.x;
  const dy = direction * 5.5;
  const push = def.speed * force * (1 + clamp(unit.stallTime / 10, 0, 0.8)) * dt;
  moveWithWallCollision(unit, enemy, def, dx, dy, push);
}

function unitEncounterRange(unit) {
  const def = unitDefs[unit.type];
  const base = UNIT_ENCOUNTER_RANGE + def.range * 0.4 + clamp(unit.stallTime / 8, 0, 0.7);
  if (unit.route === "sneak" && !sneakIsRevealed(unit)) return Math.max(1.25, base * 0.55);
  return base;
}

function musterEngageRange(unit) {
  const def = unitDefs[unit.type];
  const typeFactor = unit.type === "sapper" ? 0.62 : unit.type === "ram" ? 0.72 : unit.type === "lancer" ? 1.1 : 1;
  return (MUSTER_ENGAGE_RANGE + def.range * 0.35) * typeFactor;
}

function unitCombatReach(unit, target) {
  const def = unitDefs[unit.type];
  const targetDef = unitDefs[target.type];
  return def.range + def.radius + targetDef.radius + 0.28;
}

function fieldContactRange(unit, target) {
  const def = unitDefs[unit.type];
  const targetDef = unitDefs[target.type];
  const reachHint = Math.min(def.range, targetDef.range) * 0.35;
  return def.radius + targetDef.radius + UNIT_FIELD_CONTACT_PADDING + reachHint;
}

function engageEnemyUnit(unit, target, def, dt) {
  if (target.hp <= 0) return;

  const d = distance(unit, target);
  if (d <= unitCombatReach(unit, target)) {
    attackUnit(unit, target, dt);
    return;
  }

  moveTowardEnemyUnit(unit, target, def, dt);
}

function moveTowardEnemyUnit(unit, target, def, dt) {
  const dx = target.x - unit.x;
  const dy = target.y - unit.y;
  const crownBoost = nearbyCrownBoost(unit);
  const speed = def.speed * 0.82 * lerp(0.78, 1.12, unit.quality) * (unit.type === "crown" ? 1 : crownBoost);
  moveWithWallCollision(unit, otherFaction(unit.faction), def, dx, dy, speed * dt);
  unit.stallTime = Math.min(12, unit.stallTime + dt * 0.35);
}

function moveTowardWizardTower(unit, enemy, def, dt) {
  const dx = enemy.wizard.x - unit.x;
  const dy = enemy.wizard.y - unit.y;
  const crownBoost = nearbyCrownBoost(unit);
  const speed = def.speed * 1.04 * lerp(0.78, 1.12, unit.quality) * (unit.type === "crown" ? 1 : crownBoost);
  moveWithWallCollision(unit, enemy, def, dx, dy, speed * dt);
  unit.stallTime = Math.max(0, unit.stallTime - dt * 1.8);
}

function moveWithWallCollision(unit, enemy, def, dx, dy, step) {
  const len = Math.hypot(dx, dy);
  if (len < 0.001 || step <= 0) return null;
  const pacedStep = step * unitPaceMultiplier();

  const from = { x: unit.x, y: unit.y };
  const to = {
    x: unit.x + (dx / len) * pacedStep,
    y: unit.y + (dy / len) * pacedStep,
  };
  const blocked = wallCollisionForStep(unit, enemy, def, from, to);

  if (blocked) {
    unit.x = blocked.x;
    unit.y = blocked.y;
    unit.stallTime = Math.min(12, unit.stallTime + 0.18);
    return blocked.ring;
  }

  unit.x = to.x;
  unit.y = to.y;
  return null;
}

function unitPaceMultiplier() {
  const progress = clamp((matchTime - UNIT_PACE_RAMP_START) / UNIT_PACE_RAMP_DURATION, 0, 1);
  return lerp(1, UNIT_PACE_MAX_MULTIPLIER, smoothstep(progress));
}

function wallCollisionForStep(unit, enemy, def, from, to) {
  let closest = null;
  const rings = enemy.rings
    .filter((ring) => ring.build > 0.2 && ring.health > 0)
    .sort((a, b) => b.radius - a.radius);

  for (const ring of rings) {
    if (breachedRingAlreadyPassed(from, ring, distance(from, ring.faction.wizard))) continue;
    const collision = stepCollisionWithRing(unit, ring, def, from, to);
    if (!collision) continue;
    if (!closest || collision.t < closest.t) closest = collision;
  }

  return closest;
}

function stepCollisionWithRing(unit, ring, def, from, to) {
  const padding = wallCollisionPadding(def);
  const fromClearance = wallClearance(from, ring, padding);
  const toClearance = wallClearance(to, ring, padding);
  const movingInward = distance(to, ring.faction.wizard) < distance(from, ring.faction.wizard) + 0.001;
  const crossesWall = fromClearance >= -0.02 && toClearance < -0.02;
  const slippingDeeper = fromClearance < -0.02 && fromClearance > -BREACH_PASS_BAND && toClearance < fromClearance - 0.02;

  if (!movingInward || !crossesWall && !slippingDeeper) return null;

  const hit = findWallStepHit(from, to, ring, padding);
  if (breachAllowsPassageAtPoint(unit, ring, hit.point, def)) {
    widenBreachFromTraffic(unit, ring);
    return null;
  }

  const state = wallPointState(hit.point, ring);
  const stopRadius = state.wallRadius + padding + 0.03;

  return {
    t: hit.t,
    ring,
    x: ring.faction.wizard.x + Math.cos(state.angle) * stopRadius,
    y: ring.faction.wizard.y + Math.sin(state.angle) * stopRadius,
  };
}

function findWallStepHit(from, to, ring, padding) {
  if (wallClearance(from, ring, padding) < 0) {
    return { t: 0, point: from };
  }

  let lo = 0;
  let hi = 1;

  for (let i = 0; i < 8; i += 1) {
    const mid = (lo + hi) / 2;
    const point = {
      x: lerp(from.x, to.x, mid),
      y: lerp(from.y, to.y, mid),
    };

    if (wallClearance(point, ring, padding) >= 0) {
      lo = mid;
    } else {
      hi = mid;
    }
  }

  return {
    t: hi,
    point: {
      x: lerp(from.x, to.x, hi),
      y: lerp(from.y, to.y, hi),
    },
  };
}

function wallCollisionPadding(def) {
  return Math.max(0.18, def.radius * 0.68);
}

function wallTacticWaypoint(unit, enemy) {
  if (unit.order === "defend") return null;
  return breachStormWaypoint(unit, enemy) ?? intactWallSiegeWaypoint(unit, enemy);
}

function breachStormWaypoint(unit, enemy) {
  const breachedRings = enemy.rings
    .filter((ring) => ring.build > 0.2 && ring.health > 0 && ring.breached && ring.breachAngle !== null)
    .sort((a, b) => b.radius - a.radius);

  for (const ring of breachedRings) {
    const d = distance(unit, enemy.wizard);
    const breachAngle = ring.breachAngle ?? ring.gateAngle;
    const wallRadius = ring.radius * fortRadiusFactor(ring, breachAngle);

    if (d < wallRadius - BREACH_STORM_MARGIN) continue;

    const entering = d <= wallRadius + 0.95;
    const radius = entering ? wallRadius - 1.08 : wallRadius + 0.28;
    const angle = breachAngle + clamp(unit.spreadSeed ?? 0, -1.5, 1.5) * 0.018;

    return {
      x: enemy.wizard.x + Math.cos(angle) * radius,
      y: enemy.wizard.y + Math.sin(angle) * radius,
      speedScale: entering ? 1.08 : 1,
    };
  }

  return null;
}

function intactWallSiegeWaypoint(unit, enemy) {
  const def = unitDefs[unit.type];
  const intactRings = enemy.rings
    .filter((ring) => ring.build > 0.2 && ring.health > 0 && !ring.breached)
    .sort((a, b) => b.radius - a.radius);

  for (const ring of intactRings) {
    const d = distance(unit, enemy.wizard);
    const angle = siegeAngleForRing(unit, enemy, ring);
    const wallRadius = ring.radius * fortRadiusFactor(ring, angle);
    if (d <= wallRadius + def.range + 0.92) continue;

    const holdoff = def.range * 0.72 + unitDefs[unit.type].radius + 0.42;

    return {
      x: enemy.wizard.x + Math.cos(angle) * (wallRadius + holdoff),
      y: enemy.wizard.y + Math.sin(angle) * (wallRadius + holdoff),
      speedScale: unit.type === "sapper" ? 1.08 : 0.96,
    };
  }

  unit.siegeRing = null;
  unit.siegeAngle = null;
  return null;
}

function siegeAngleForRing(unit, enemy, ring) {
  if (unit.siegeRing !== ring || unit.siegeAngle === null) {
    const approach = Math.atan2(unit.y - enemy.wizard.y, unit.x - enemy.wizard.x);
    const spread = clamp((unit.siegeSeed ?? 0) * SIEGE_ENCIRCLE_SPREAD + (unit.lane ?? 0) * 0.025, -1.18, 1.18);
    unit.siegeRing = ring;
    unit.siegeAngle = approach + spread;
  }

  return unit.siegeAngle;
}

function tacticalLaneOffset(unit, enemy) {
  const d = distance(unit, enemy.wizard);
  const laneFade = clamp((d - enemy.commandRadius * 0.45) / (enemy.commandRadius + 5), 0, 1);
  return unit.lane * laneFade;
}

function attackTargetX(unit, enemy) {
  if (unit.route === "sneak") return sneakTargetX(unit, enemy);
  return enemy.wizard.x + tacticalLaneOffset(unit, enemy) + flankArcOffset(unit, enemy);
}

function flankArcOffset(unit, enemy) {
  if (unit.route !== "flank") return 0;

  const progress = marchProgress(unit, enemy);
  const peak = unit.flankPeak ?? 0.5;
  const rise = smoothstep(clamp(progress / Math.max(0.12, peak), 0, 1));
  const fall = 1 - smoothstep(clamp((progress - 0.78) / 0.18, 0, 1));
  const envelope = rise * fall;

  return (unit.flankSide || 0) * (unit.flankWidth || 0) * envelope;
}

function sneakTargetX(unit, enemy) {
  const progress = marchProgress(unit, enemy);
  const side = unit.flankSide || 1;
  const edgeX = side < 0 ? SNEAK_EDGE_INSET : BOARD_WIDTH - SNEAK_EDGE_INSET;
  const finalX = enemy.wizard.x + tacticalLaneOffset(unit, enemy) * 0.35;
  const dive = smoothstep(clamp((progress - SNEAK_REVEAL_PROGRESS) / 0.2, 0, 1));
  const edgeDrift = Math.sin(unit.wobble * 0.38 + (unit.flankPeak ?? 0.5) * 9) * 0.35;
  const edgeTarget = edgeX + edgeDrift + side * (unit.spreadSeed ?? 0) * 0.35;

  return lerp(edgeTarget, finalX, dive);
}

function marchProgress(unit, enemy) {
  const total = enemy.wizard.y - unit.faction.wizard.y;
  if (Math.abs(total) < 0.001) return 1;
  return clamp((unit.y - unit.faction.wizard.y) / total, 0, 1);
}

function sneakIsRevealed(unit) {
  const enemy = otherFaction(unit.faction);
  if (marchProgress(unit, enemy) >= SNEAK_REVEAL_PROGRESS) return true;
  if (distance(unit, enemy.wizard) <= enemy.commandRadius + 4) return true;
  return unit.stallTime > 2.4;
}

function shouldAttackWizardTower(unit, enemy) {
  if (unit.order === "defend") return false;
  const d = distance(unit, enemy.wizard);
  if (d <= enemy.commandRadius + WIZARD_TOWER_AGGRO_RADIUS) return true;

  const passedTowerLine = unit.faction.side === "north"
    ? unit.y >= enemy.wizard.y - WIZARD_TOWER_PASS_BAND
    : unit.y <= enemy.wizard.y + WIZARD_TOWER_PASS_BAND;
  if (!passedTowerLine) return false;

  const laneDistance = Math.abs(unit.x - enemy.wizard.x);
  const routeReach = unit.route === "sneak" ? BOARD_WIDTH * 0.5 : enemy.commandRadius + WIZARD_TOWER_AGGRO_RADIUS * 1.35;
  return laneDistance <= routeReach;
}

function wizardTouchDistance(unit) {
  return WIZARD_TOUCH_RADIUS + unitDefs[unit.type].radius;
}

function touchWizard(unit, enemy) {
  unit.faction.stats.wizardTouches += 1;
  enemy.wizardHp = 0;
  enemy.scorePulse = 1;
  unit.hp = 0;
  bursts.push({
    x: enemy.wizard.x,
    y: enemy.wizard.y,
    radius: 3.2,
    color: unit.faction.color,
    age: 0,
    duration: 0.85,
    kind: "break",
  });
}

function applyWallContactPressure(dt) {
  for (const unit of units) {
    if (unit.hp <= 0 || unit.burrowing || unit.order === "defend") continue;
    const def = unitDefs[unit.type];
    if (def.wallDamage <= 0) continue;

    const enemy = otherFaction(unit.faction);
    const ring = nearestEnemyWallInContact(unit, enemy, def);
    if (!ring) continue;

    const crownBoost = nearbyCrownBoost(unit);
    const qualityBoost = lerp(0.72, 1.12, unit.quality);
    const heatBoost = 1 + clamp(ring.siegeHeat, 0, 1.6) * 0.32;
    ring.health -= def.wallDamage * WALL_CONTACT_DAMAGE_RATE * crownBoost * qualityBoost * heatBoost * dt;
    ring.siegeHeat = Math.min(2.4, ring.siegeHeat + dt * (0.08 + def.wallDamage * 0.045));
    unit.stallTime = Math.min(12, unit.stallTime + dt * 0.25);

    if (matchTime - (unit.lastWallContactPulse ?? -Infinity) > 0.55) {
      const impact = ringImpactPoint(unit, ring);
      bursts.push({
        x: impact.x,
        y: impact.y,
        radius: 0.5,
        color: unit.faction.color,
        age: 0,
        duration: 0.2,
        kind: "hit",
      });
      unit.lastWallContactPulse = matchTime;
    }

    finishRingDamage(ring, unit);
  }
}

function nearestEnemyWallInContact(unit, enemy, def) {
  let best = null;
  let bestDistance = Infinity;
  const rings = enemy.rings
    .filter((ring) => ring.build > 0.2 && ring.health > 0)
    .sort((a, b) => b.radius - a.radius);

  for (const ring of rings) {
    const state = wallPointState(unit, ring);
    if (breachedRingAlreadyPassed(unit, ring, state.distance)) continue;
    if (breachAllowsPassage(unit, ring, state.distance)) continue;

    const radialDistance = Math.abs(state.distance - state.wallRadius);
    const contactBand = def.range + def.radius + WALL_CONTACT_BAND;
    if (radialDistance > contactBand || radialDistance >= bestDistance) continue;

    best = ring;
    bestDistance = radialDistance;
  }

  return best;
}

function spreadCrowdedUnits(dt) {
  const boardBottom = factions[1].wizard.y + EDGE_INSET;

  for (const unit of units) {
    if (unit.hp <= 0) continue;
    const enemy = otherFaction(unit.faction);
    const def = unitDefs[unit.type];
    const enemyDistance = distance(unit, enemy.wizard);
    let pushX = 0;
    let pushY = 0;
    let crowd = 0;

    for (const other of units) {
      if (other === unit || other.hp <= 0) continue;
      const otherDef = unitDefs[other.type];
      const sameFaction = other.faction === unit.faction;
      const dx = unit.x - other.x;
      const dy = unit.y - other.y;
      const desired = (sameFaction ? 0.74 : 0.92) + def.radius + otherDef.radius;
      const dSq = dx * dx + dy * dy;

      if (dSq <= 0.0001 || dSq > desired * desired) continue;
      const d = Math.sqrt(dSq);
      const pressure = (desired - d) / desired;
      const bodyForce = sameFaction ? 1 : UNIT_OPPOSING_BODY_FORCE;
      pushX += (dx / d) * pressure * bodyForce;
      pushY += (dy / d) * pressure * bodyForce * 0.72;
      crowd += pressure * (sameFaction ? 1 : 1.25);
      if (!sameFaction && d <= fieldContactRange(unit, other)) {
        unit.stallTime = Math.min(12, unit.stallTime + dt * 0.85);
      }
    }

    if (enemyDistance < enemy.commandRadius + 6 || unit.stallTime > 1.2) {
      const frontageWidth = enemy.commandRadius * 0.92;
      const routeOffset = flankArcOffset(unit, enemy) * 0.55;
      const desiredX = enemy.wizard.x + clamp(unit.lane + routeOffset + unit.spreadSeed * 3.4, -frontageWidth, frontageWidth);
      const frontage = clamp((desiredX - unit.x) / Math.max(1, frontageWidth), -1, 1);
      const urgency = 0.6 + clamp(unit.stallTime / 7, 0, 0.85) + clamp(crowd, 0, 1.2) * 0.25;
      pushX += frontage * urgency * UNIT_FRONTAGE_FORCE;
    }

    if (crowd <= 0 && enemyDistance >= enemy.commandRadius + 6 && unit.stallTime <= 1.2) continue;

    const strength = UNIT_SEPARATION_FORCE * dt;
    unit.x += clamp(pushX, -1.9, 1.9) * strength;
    unit.y += clamp(pushY, -1.25, 1.25) * strength;
    unit.x = clamp(unit.x, 1.2, BOARD_WIDTH - 1.2);
    unit.y = clamp(unit.y, 1.2, boardBottom - 1.2);
  }
}

function homeDefenseRadius(faction) {
  const rushWarning = (faction.rushAlarmUntil ?? 0) > matchTime ? AI_RUSH_WARNING_MARGIN : 0;
  return faction.commandRadius + BASE_DEFENSE_MARGIN + rushWarning;
}

function baseThreats(faction) {
  const radius = homeDefenseRadius(faction);
  return units.filter((unit) => (
    unit.faction !== faction
    && unit.hp > 0
    && distance(unit, faction.wizard) <= radius
  ));
}

function defenseOrdersNeeded(faction) {
  const threats = baseThreats(faction).length;
  if (threats === 0) return 0;

  const activeDefenders = units.filter((unit) => (
    unit.faction === faction
    && unit.hp > 0
    && unit.order === "defend"
    && distance(unit, faction.wizard) <= homeDefenseRadius(faction) + 8
  )).length;

  return Math.max(0, threats * 2 - activeDefenders);
}

function updateMarchingOrder(unit) {
  if (unit.order === "muster" && unit.faction.waveMode === "attack") {
    unit.order = "attack";
    unit.releasedAt = matchTime;
    unit.stallTime = 0;
    return;
  }

  if (unit.order === "defend" && baseThreats(unit.faction).length === 0) {
    unit.order = unit.faction.waveMode === "attack" ? "attack" : "muster";
    if (unit.order === "muster") {
      const podCounts = musterPodCounts(unit.faction);
      unit.musterPod = chooseMusterPod(unit.faction, podCounts, unit.type);
      unit.musteredAt = matchTime;
    }
    unit.stallTime = 0;
  }
}

function nearestBaseAttacker(unit, faction) {
  const threats = baseThreats(faction);
  let best = null;
  let bestScore = Infinity;

  for (const threat of threats) {
    const score = distance(unit, threat) + distance(threat, faction.wizard) * 0.35;
    if (score < bestScore) {
      best = threat;
      bestScore = score;
    }
  }

  return best;
}

function nearestEnemyUnit(unit, range) {
  let best = null;
  let bestDistance = Infinity;

  for (const candidate of units) {
    if (candidate.faction === unit.faction) continue;
    if (candidate.hp <= 0) continue;
    const d = distance(unit, candidate);
    if (d < range && d < bestDistance) {
      best = candidate;
      bestDistance = d;
    }
  }

  return best;
}

function nearestFieldContactEnemy(unit) {
  let best = null;
  let bestDistance = Infinity;

  for (const candidate of units) {
    if (candidate.faction === unit.faction) continue;
    if (candidate.hp <= 0) continue;
    const d = distance(unit, candidate);
    if (d > fieldContactRange(unit, candidate) || d >= bestDistance) continue;
    best = candidate;
    bestDistance = d;
  }

  return best;
}

function attackUnit(unit, target) {
  const def = unitDefs[unit.type];
  if (unit.attackCd > 0) return;
  const crownBoost = nearbyCrownBoost(unit);
  const momentumBoost = 1 + clamp(unit.stallTime / 12, 0, 0.65);
  target.hp -= def.damage * crownBoost * momentumBoost * lerp(0.74, 1.16, unit.quality);
  unit.attackCd = 0.62;
  bursts.push({
    x: (unit.x + target.x) / 2,
    y: (unit.y + target.y) / 2,
    radius: 0.75,
    color: unit.faction.color,
    age: 0,
    duration: 0.28,
    kind: "hit",
  });
}

function openDepartureGates(faction) {
  const rings = faction.rings
    .filter((ring) => ring.build > 0.25 && ring.health > 0)
    .sort((a, b) => a.radius - b.radius);

  for (const ring of rings) {
    if (ring.gateCollapsed) continue;
    ring.gateOpen = Math.max(ring.gateOpen, 1);
  }

}

function blockingRing(unit, enemy) {
  const rings = enemy.rings
    .filter((ring) => ring.build > 0.2 && ring.health > 0)
    .sort((a, b) => b.radius - a.radius);

  for (const ring of rings) {
    const state = wallPointState(unit, ring);
    const d = state.distance;
    if (breachedRingAlreadyPassed(unit, ring, d)) continue;
    const contactBand = unitDefs[unit.type].range + unitDefs[unit.type].radius + 0.55;
    if (d > state.wallRadius + contactBand) continue;
    if (breachAllowsPassage(unit, ring, d)) {
      widenBreachFromTraffic(unit, ring);
      continue;
    }
    return ring;
  }

  return null;
}

function breachedRingAlreadyPassed(unit, ring, distanceToWizard) {
  if (!ring.breached || ring.breachAngle === null) return false;
  const angle = Math.atan2(unit.y - ring.faction.wizard.y, unit.x - ring.faction.wizard.x);
  const wallRadius = wallRadiusAt(ring, angle);
  return distanceToWizard < wallRadius - BREACH_PASS_BAND;
}

function breachAllowsPassage(unit, ring, distanceToWizard) {
  if (!ring.breached || ring.breachAngle === null) return false;
  const def = unitDefs[unit.type];
  const state = wallPointState(unit, ring);
  const radialClearance = Math.abs(distanceToWizard - state.wallRadius) <= def.range + BREACH_PASS_BAND
    || distanceToWizard < state.wallRadius + 0.92;

  return breachAllowsPassageAtPoint(unit, ring, unit, def) && radialClearance;
}

function breachAllowsPassageAtPoint(unit, ring, point, def = unitDefs[unit.type]) {
  if (!ring.breached || ring.breachAngle === null) return false;
  const state = wallPointState(point, ring);
  const angleClearance = (ring.breachWidth || 0.42) + def.radius / Math.max(1, state.wallRadius) + 0.05;

  return angleDistance(state.angle, ring.breachAngle) <= angleClearance;
}

function wallPointState(point, ring) {
  const dx = point.x - ring.faction.wizard.x;
  const dy = point.y - ring.faction.wizard.y;
  const angle = Math.atan2(dy, dx);
  const wallRadius = wallRadiusAt(ring, angle);

  return {
    angle,
    distance: Math.hypot(dx, dy),
    wallRadius,
  };
}

function wallRadiusAt(ring, angle) {
  return ring.radius * fortRadiusFactor(ring, angle);
}

function gateArcLength(ring) {
  return lerp(GATE_CLOSED_ARC_LENGTH, GATE_OPEN_ARC_LENGTH, ring.gateOpen);
}

function gateHalfAngle(ring) {
  return gateArcLength(ring) / (2 * Math.max(0.1, wallRadiusAt(ring, ring.gateAngle)));
}

function wallClearance(point, ring, padding = 0) {
  const state = wallPointState(point, ring);
  return state.distance - state.wallRadius - padding;
}

function widenBreachFromTraffic(unit, ring) {
  if (unit.breachTouchRing === ring && matchTime - (unit.breachTouchTime ?? 0) < 0.85) return;
  const width = (ring.breachWidth || 0.42) + BREACH_TRAFFIC_WIDEN * lerp(0.82, 1.28, unit.quality);
  ring.breachWidth = Math.min(BREACH_MAX_WIDTH, width);
  ring.breachTraffic = (ring.breachTraffic ?? 0) + 1;
  ring.siegeHeat = Math.min(2.4, ring.siegeHeat + 0.04);
  unit.breachTouchRing = ring;
  unit.breachTouchTime = matchTime;
}

function attackRing(unit, ring, dt) {
  const def = unitDefs[unit.type];
  if (unit.type === "sapper") {
    startOrContinueSapperBurrow(unit, ring, dt);
    return;
  }

  if (unit.attackCd > 0) return;
  const crownBoost = nearbyCrownBoost(unit);
  const towerPenalty = ring.towers.length > 0 ? 0.94 : 1;
  const siegeBoost = 1 + clamp(ring.siegeHeat, 0, 1.4) + clamp(unit.stallTime / 10, 0, 0.9);
  const damage = def.wallDamage * WALL_ATTACK_DAMAGE_MULTIPLIER * crownBoost * towerPenalty * siegeBoost * lerp(0.72, 1.12, unit.quality);
  ring.health -= damage;
  ring.siegeHeat = Math.min(1.8, ring.siegeHeat + 0.16 + def.wallDamage * 0.035);
  unit.attackCd = 0.78;
  bursts.push({
    x: unit.x,
    y: unit.y,
    radius: 0.85,
    color: unit.faction.color,
    age: 0,
    duration: 0.32,
    kind: "hit",
  });

  finishRingDamage(ring, unit);
}

function startOrContinueSapperBurrow(unit, ring, dt) {
  if (!unit.burrowing) startSapperBurrow(unit, ring);
  continueSapperBurrow(unit, ring, dt);
}

function startSapperBurrow(unit, ring) {
  const angle = Math.atan2(unit.y - ring.faction.wizard.y, unit.x - ring.faction.wizard.x);
  const site = sapperBurrowSite(ring, angle);

  unit.burrowing = true;
  unit.burrowRing = ring;
  unit.burrowAngle = angle;
  unit.burrowTimer = 0;
  unit.burrowDuration = SAPPER_BURROW_DURATION * lerp(1.14, 0.86, unit.quality);
  unit.x = site.startX;
  unit.y = site.startY;
  unit.attackCd = Math.max(unit.attackCd, 0.35);
  unit.stallTime = Math.min(12, unit.stallTime + 1.2);

  bursts.push({
    x: site.startX,
    y: site.startY,
    radius: 0.72,
    color: unit.faction.accent,
    age: 0,
    duration: 0.4,
    kind: "hit",
  });
}

function continueSapperBurrow(unit, ring, dt) {
  if (!ring || ring.health <= 0) {
    unit.burrowing = false;
    unit.burrowRing = null;
    return;
  }

  const site = sapperBurrowSite(ring, unit.burrowAngle);
  unit.burrowTimer += dt;
  const progress = clamp(unit.burrowTimer / Math.max(0.1, unit.burrowDuration), 0, 1);
  const tunnel = smoothstep(progress) * 0.9;

  unit.x = lerp(site.startX, site.impactX, tunnel);
  unit.y = lerp(site.startY, site.impactY, tunnel);
  unit.stallTime = Math.min(12, unit.stallTime + dt);

  if (progress >= 1) {
    unit.x = site.impactX;
    unit.y = site.impactY;
    explodeSapper(unit, ring, site);
  }
}

function sapperBurrowSite(ring, angle) {
  const wallRadius = ring.radius * fortRadiusFactor(ring, angle);
  const startRadius = wallRadius + SAPPER_BURROW_OUTSIDE;

  return {
    angle,
    startX: ring.faction.wizard.x + Math.cos(angle) * startRadius,
    startY: ring.faction.wizard.y + Math.sin(angle) * startRadius,
    impactX: ring.faction.wizard.x + Math.cos(angle) * wallRadius,
    impactY: ring.faction.wizard.y + Math.sin(angle) * wallRadius,
  };
}

function explodeSapper(unit, ring, burrowSite = null) {
  const impact = burrowSite ?? (unit.burrowing ? sapperBurrowSite(ring, unit.burrowAngle) : ringImpactPoint(unit, ring));
  const x = impact.impactX ?? impact.x;
  const y = impact.impactY ?? impact.y;
  const damage = SAPPER_EXPLOSION_DAMAGE * lerp(0.72, 1.18, unit.quality);
  unit.faction.stats.sapperDetonations += 1;
  ring.health -= damage;
  ring.siegeHeat = Math.min(2.4, ring.siegeHeat + 0.86);
  unit.sapperDetonated = true;
  unit.burrowing = false;
  unit.burrowRing = null;
  unit.hp = 0;

  bursts.push({
    x,
    y,
    radius: SAPPER_EXPLOSION_RADIUS * lerp(0.82, 1.16, unit.quality),
    color: unit.faction.accent,
    age: 0,
    duration: 0.58,
    kind: "blast",
  });

  finishRingDamage(ring, unit);
}

function detonateKilledSapper(unit) {
  if (unit.sapperDetonated) return;

  unit.sapperDetonated = true;
  unit.faction.stats.sapperDetonations += 1;
  const radius = SAPPER_DEATH_EXPLOSION_RADIUS * lerp(0.86, 1.15, unit.quality);
  const unitDamage = SAPPER_DEATH_EXPLOSION_DAMAGE * lerp(0.78, 1.18, unit.quality);
  const wallDamage = SAPPER_DEATH_WALL_DAMAGE * lerp(0.78, 1.18, unit.quality);

  for (const target of units) {
    if (target === unit || target.hp <= 0) continue;
    const d = distance(unit, target);
    if (d > radius + unitDefs[target.type].radius) continue;
    const falloff = 1 - clamp(d / Math.max(0.1, radius), 0, 1);
    target.hp -= unitDamage * lerp(0.38, 1, falloff);
  }

  for (const faction of factions) {
    for (const ring of faction.rings) {
      if (ring.health <= 0 || ring.build <= 0.2) continue;
      const wallHit = wallBlastFactor(unit, ring, radius);
      if (wallHit <= 0) continue;
      ring.health -= wallDamage * wallHit;
      ring.siegeHeat = Math.min(2.4, ring.siegeHeat + 0.35 * wallHit);
      finishRingDamage(ring, unit);
    }
  }

  bursts.push({
    x: unit.x,
    y: unit.y,
    radius,
    color: unit.faction.accent,
    age: 0,
    duration: 0.5,
    kind: "blast",
  });
}

function wallBlastFactor(point, ring, radius) {
  const state = wallPointState(point, ring);
  if (angleInBreach(state.angle, ring, 0.08)) return 0;

  const radialDistance = Math.abs(state.distance - state.wallRadius);
  if (radialDistance > radius) return 0;

  return lerp(1, 0.2, clamp(radialDistance / Math.max(0.1, radius), 0, 1));
}

function ringImpactPoint(unit, ring) {
  const angle = Math.atan2(unit.y - ring.faction.wizard.y, unit.x - ring.faction.wizard.x);
  const radius = ring.radius * fortRadiusFactor(ring, angle);

  return {
    x: ring.faction.wizard.x + Math.cos(angle) * radius,
    y: ring.faction.wizard.y + Math.sin(angle) * radius,
  };
}

function finishRingDamage(ring, unit) {
  if (unit?.faction) ring.lastDamagedBy = unit.faction;

  const healthRatio = clamp(ring.health / ring.maxHealth, 0, 1);
  if (!ring.breached && healthRatio <= WALL_BREACH_HEALTH) {
    const impact = ringImpactPoint(unit, ring);
    ring.breached = true;
    recordLayerBroken(ring);
    ring.breachAngle = Math.atan2(unit.y - ring.faction.wizard.y, unit.x - ring.faction.wizard.x);
    ring.breachWidth = clamp(0.34 + unitDefs[unit.type].radius * 0.2 + (unit.type === "sapper" ? 0.26 : 0), 0.34, 0.72);
    collapseUnsupportedFortParts(ring);
    bursts.push({
      x: impact.x,
      y: impact.y,
      radius: ring.radius * 0.85,
      color: unit.faction.color,
      age: 0,
      duration: 0.72,
      kind: "break",
    });
  }

  if (ring.health <= 0 && !ring.destroyed) {
    destroyRing(ring, unit?.faction);
  }
}

function destroyRing(ring, attackerFaction = null) {
  if (ring.destroyed) return;

  ring.destroyed = true;
  ring.health = 0;
  recordLayerBroken(ring);
  if (attackerFaction) attackerFaction.stats.wallsDestroyed += 1;
  bursts.push({
    x: ring.faction.wizard.x,
    y: ring.faction.wizard.y,
    radius: ring.radius,
    color: "#f5d285",
    age: 0,
    duration: 0.95,
    kind: "break",
  });
}

function nearbyCrownBoost(unit) {
  let boost = 1;
  for (const candidate of units) {
    if (candidate === unit || candidate.faction !== unit.faction || candidate.type !== "crown") continue;
    if (distance(unit, candidate) < unitDefs.crown.aura) boost = Math.max(boost, 1.18);
  }
  return boost;
}

function updateTowerShots(dt, canFire = true) {
  for (const shot of towerShots) shot.age += dt;

  for (let i = towerShots.length - 1; i >= 0; i -= 1) {
    if (towerShots[i].age >= towerShots[i].duration) towerShots.splice(i, 1);
  }

  if (!canFire) return;

  for (const faction of factions) {
    faction.towerCooldown = Math.max(0, faction.towerCooldown - dt);
    if (faction.towerCooldown > 0) continue;

    const target = nearestTowerTarget(faction);
    if (!target) continue;

    fireTowerShot(faction, target);
    const pressure = towerThreatCount(faction);
    faction.towerCooldown = TOWER_SHOT_INTERVAL * lerp(1.12, 0.78, clamp(pressure / 6, 0, 1));
  }

  updateFortDefenses(dt);
}

function nearestTowerTarget(faction) {
  const range = faction.commandRadius;
  let best = null;
  let bestScore = Infinity;

  for (const unit of units) {
    if (unit.faction === faction || unit.hp <= 0) continue;
    const d = distance(unit, faction.wizard);
    if (d > range + unitDefs[unit.type].radius) continue;

    const routePressure = unit.route === "sneak" ? -0.9 : unit.route === "flank" ? -0.35 : 0;
    const woundedPressure = 1 - clamp(unit.hp / unit.maxHp, 0, 1);
    const score = d + routePressure - woundedPressure * 0.7;
    if (score < bestScore) {
      best = unit;
      bestScore = score;
    }
  }

  return best;
}

function towerThreatCount(faction) {
  return units.filter((unit) => (
    unit.faction !== faction
    && unit.hp > 0
    && distance(unit, faction.wizard) <= faction.commandRadius + unitDefs[unit.type].radius
  )).length;
}

function fireTowerShot(faction, target) {
  const toughness = arrowDamageMultiplier(target);
  target.hp -= TOWER_SHOT_DAMAGE * toughness;
  faction.scorePulse = Math.max(faction.scorePulse, 0.35);

  towerShots.push({
    fromX: faction.wizard.x,
    fromY: faction.wizard.y,
    toX: target.x,
    toY: target.y,
    color: faction.accent,
    glow: faction.color,
    width: 0.16,
    age: 0,
    duration: TOWER_SHOT_DURATION,
  });

  bursts.push({
    x: target.x,
    y: target.y,
    radius: 0.46,
    color: faction.accent,
    age: 0,
    duration: 0.2,
    kind: "hit",
  });
}

function updateFortDefenses(dt) {
  for (const faction of factions) {
    const activeRings = faction.rings.filter((ring) => ring.build > 0.65 && ring.health > 0);

    for (const ring of activeRings) {
      for (const tower of ring.towers) {
        if (angleInBreach(tower.angle, ring, tower.radius / Math.max(1, ring.radius))) continue;
        tower.shotCd = Math.max(0, tower.shotCd - dt);
        if (tower.shotCd > 0) continue;

        const source = fortTowerPosition(ring, tower);
        const target = nearestFortTarget(faction, source, ring, FORT_TOWER_RANGE, 1);
        if (!target) continue;

        fireFortArrow(faction, source, target, FORT_TOWER_SHOT_DAMAGE, 0.11);
        tower.wake = 0.42;
        tower.shotCd = FORT_TOWER_SHOT_INTERVAL * rand(0.82, 1.18);
      }

      for (const bastion of ring.bastions) {
        if (angleInBreach(bastion.angle, ring, 0.08)) continue;
        bastion.shotCd = Math.max(0, bastion.shotCd - dt);
        if (bastion.shotCd > 0) continue;

        const source = fortPointPosition(ring, bastion.angle);
        const targets = nearestFortTargets(faction, source, ring, BASTION_RANGE, 0, 2);
        if (targets.length === 0) continue;

        for (const target of targets) {
          fireFortArrow(faction, source, target, BASTION_SHOT_DAMAGE, 0.095);
        }
        bastion.shotCd = BASTION_SHOT_INTERVAL * rand(0.86, 1.2);
      }
    }
  }
}

function nearestFortTarget(faction, source, sourceRing, range, wallPierce) {
  return nearestFortTargets(faction, source, sourceRing, range, wallPierce, 1)[0] ?? null;
}

function nearestFortTargets(faction, source, sourceRing, range, wallPierce, limit) {
  const candidates = [];

  for (const unit of units) {
    if (unit.faction === faction || unit.hp <= 0) continue;
    const d = distance(source, unit);
    if (d > range + unitDefs[unit.type].radius) continue;
    if (friendlyWallsBetween(source, unit, faction, sourceRing) > wallPierce) continue;

    const woundedPressure = 1 - clamp(unit.hp / unit.maxHp, 0, 1);
    const siegePressure = unit.type === "sapper" ? -1.15 : unit.type === "ram" ? -0.95 : 0;
    candidates.push({ unit, score: d + siegePressure - woundedPressure * 0.45 });
  }

  candidates.sort((a, b) => a.score - b.score);
  return candidates.slice(0, limit).map((candidate) => candidate.unit);
}

function friendlyWallsBetween(source, target, faction, sourceRing) {
  let crossings = 0;

  for (const ring of faction.rings) {
    if (ring === sourceRing || ring.build <= 0.65 || ring.health <= 0) continue;
    const sourceDistance = distance(source, ring.faction.wizard);
    const targetDistance = distance(target, ring.faction.wizard);
    const radius = ring.radius;
    const sourceInside = sourceDistance < radius - 0.18;
    const targetInside = targetDistance < radius - 0.18;
    const sourceOutside = sourceDistance > radius + 0.18;
    const targetOutside = targetDistance > radius + 0.18;

    if (sourceInside && targetOutside || sourceOutside && targetInside) {
      if (lineCrossesBreach(source, target, ring, sourceDistance, targetDistance)) continue;
      crossings += 1;
    }
  }

  return crossings;
}

function lineCrossesBreach(source, target, ring, sourceDistance, targetDistance) {
  if (!ring.breached || ring.breachAngle === null) return false;
  const denom = targetDistance - sourceDistance;
  const t = Math.abs(denom) < 0.001 ? 0.5 : clamp((ring.radius - sourceDistance) / denom, 0, 1);
  const x = lerp(source.x, target.x, t);
  const y = lerp(source.y, target.y, t);
  const angle = Math.atan2(y - ring.faction.wizard.y, x - ring.faction.wizard.x);

  return angleDistance(angle, ring.breachAngle) <= (ring.breachWidth || 0.42) + 0.04;
}

function fortPointPosition(ring, angle) {
  const radius = ring.radius * fortRadiusFactor(ring, angle);
  return {
    x: ring.faction.wizard.x + Math.cos(angle) * radius,
    y: ring.faction.wizard.y + Math.sin(angle) * radius,
  };
}

function fortTowerPosition(ring, tower) {
  const radius = (tower.visualRadius ?? ring.radius) * fortRadiusFactor(ring, tower.angle);
  return {
    x: ring.faction.wizard.x + Math.cos(tower.angle) * radius,
    y: ring.faction.wizard.y + Math.sin(tower.angle) * radius,
  };
}

function fireFortArrow(faction, source, target, damage, width) {
  const toughness = arrowDamageMultiplier(target);
  target.hp -= damage * toughness;

  towerShots.push({
    fromX: source.x,
    fromY: source.y,
    toX: target.x,
    toY: target.y,
    color: faction.accent,
    glow: faction.color,
    width,
    age: 0,
    duration: FORT_ARROW_DURATION,
  });

  bursts.push({
    x: target.x,
    y: target.y,
    radius: 0.32,
    color: faction.accent,
    age: 0,
    duration: 0.16,
    kind: "hit",
  });
}

function arrowDamageMultiplier(unit) {
  if (unit.type === "ram") return 0.34;
  if (unit.type === "knight") return 0.82;
  if (unit.type === "crown") return 0.72;
  return 1;
}

function updateBursts(dt) {
  for (const burst of bursts) burst.age += dt;
  for (let i = bursts.length - 1; i >= 0; i -= 1) {
    if (bursts[i].age >= bursts[i].duration) bursts.splice(i, 1);
  }
}

function checkWinner() {
  if (winner) return;

  for (const faction of factions) {
    if (faction.wizardHp <= 0) {
      winner = otherFaction(faction);
      gamePhase = "ended";
      resetTimer = 0;
      finishedMatchTime = matchTime;
      bursts.push({
        x: faction.wizard.x,
        y: faction.wizard.y,
        radius: 8,
        color: winner.color,
        age: 0,
        duration: 1.8,
        kind: "break",
      });
      showEndScreen();
      return;
    }
  }
}

function recordProduced(faction, type, count) {
  faction.stats.produced[type] += count;
}

function recordUnitKilled(unit) {
  if (unit.killedRecorded) return;
  unit.killedRecorded = true;
  if (unit.type === "sapper") detonateKilledSapper(unit);
  unit.faction.stats.killed[unit.type] += 1;
}

function recordLayerBroken(ring) {
  if (ring.brokenRecorded) return;
  ring.brokenRecorded = true;
  ring.faction.stats.layersBroken += 1;
}

function showEndScreen() {
  const playerWon = winner?.side === PLAYER_SIDE;
  const resultText = playerWon ? "VICTORY!" : "Vanquished";
  currentScoreResult = playerWon ? "victory" : "vanquished";
  currentScoreSaved = false;
  currentWinStreak = updateWinStreak(playerWon);
  resultPill.textContent = resultText;
  resultPill.dataset.result = resultText;
  resultPill.classList.toggle("is-vanquished", !playerWon);
  prepareHighScoreEntry();
  renderHighScores();
  renderStats();
  syncCommandControls();
  endScreen.hidden = false;
  highScoreName.focus({ preventScroll: true });
}

function prepareHighScoreEntry() {
  highScoreName.value = "";
  highScoreName.disabled = false;
  saveHighScoreButton.disabled = true;
  highScoreStatus.textContent = currentScoreResult === "victory"
    ? "Fastest victories rank lowest time first."
    : "Vanquished runs rank longest survival first.";
}

async function saveCurrentHighScore(event) {
  event.preventDefault();
  if (currentScoreSaved || !currentScoreResult) return;

  const name = sanitizeHighScoreName(highScoreName.value).trim();
  if (!name) {
    highScoreStatus.textContent = "Use letters, numbers, and spaces only.";
    updateHighScoreControls();
    return;
  }

  saveHighScoreButton.disabled = true;
  highScoreStatus.textContent = "Saving score...";
  const score = createCurrentHighScore(name);
  addLocalHighScore(score, currentScoreResult);

  currentScoreSaved = true;
  highScoreName.disabled = true;

  try {
    await saveSupabaseHighScore(score, currentScoreResult);
    highScoreStatus.textContent = "Score saved online.";
    await refreshRemoteHighScores();
  } catch (error) {
    console.warn("TowerLine high score online save failed", error);
    highScoreStatus.textContent = "Score saved on this device. Online save failed.";
    renderHighScoreLists(loadHighScores());
  }
}

function createCurrentHighScore(name) {
  const playerStats = playerFaction().stats;
  const rivalStats = otherFaction(playerFaction()).stats;
  return {
    name,
    time: Math.max(0, finishedMatchTime),
    piecesKilled: totalPiecesKilled(rivalStats),
    piecesLost: totalPiecesKilled(playerStats),
    winStreak: currentWinStreak,
    at: Date.now(),
  };
}

function addLocalHighScore(score, result) {
  const scores = loadHighScores();
  scores[result].push(score);
  scores.victory = sortHighScores(scores.victory, "victory").slice(0, HIGH_SCORE_LIMIT);
  scores.vanquished = sortHighScores(scores.vanquished, "vanquished").slice(0, HIGH_SCORE_LIMIT);
  saveHighScores(scores);
}

function updateHighScoreControls() {
  if (currentScoreSaved) {
    saveHighScoreButton.disabled = true;
    return;
  }

  saveHighScoreButton.disabled = sanitizeHighScoreName(highScoreName.value).trim().length === 0;
}

function sanitizeHighScoreName(value) {
  return String(value ?? "")
    .replace(/[^A-Za-z0-9 ]/g, "")
    .replace(/\s+/g, " ")
    .slice(0, HIGH_SCORE_NAME_LIMIT);
}

function loadHighScores() {
  try {
    const parsed = JSON.parse(localStorage.getItem(HIGH_SCORE_KEY) ?? "{}");
    return {
      victory: Array.isArray(parsed.victory) ? parsed.victory.filter(isValidHighScore) : [],
      vanquished: Array.isArray(parsed.vanquished) ? parsed.vanquished.filter(isValidHighScore) : [],
    };
  } catch {
    return { victory: [], vanquished: [] };
  }
}

function saveHighScores(scores) {
  localStorage.setItem(HIGH_SCORE_KEY, JSON.stringify(scores));
}

function isValidHighScore(score) {
  return typeof score?.name === "string" && Number.isFinite(score.time);
}

function loadWinStreak() {
  try {
    return Math.max(0, Number.parseInt(localStorage.getItem(WIN_STREAK_KEY) ?? "0", 10) || 0);
  } catch {
    return 0;
  }
}

function saveWinStreak(streak) {
  localStorage.setItem(WIN_STREAK_KEY, String(Math.max(0, streak)));
}

function updateWinStreak(playerWon) {
  const previousStreak = loadWinStreak();
  if (playerWon) {
    const nextStreak = previousStreak + 1;
    saveWinStreak(nextStreak);
    return nextStreak;
  }

  saveWinStreak(0);
  return previousStreak;
}

function totalPiecesKilled(stats) {
  return Object.values(stats.killed).reduce((total, count) => total + count, 0);
}

function sortHighScores(scores, result) {
  return [...scores].sort((a, b) => {
    const timeDelta = result === "victory" ? a.time - b.time : b.time - a.time;
    return timeDelta || (a.at ?? 0) - (b.at ?? 0);
  });
}

function renderHighScores() {
  const scores = loadHighScores();
  renderHighScoreLists(scores);
  refreshRemoteHighScores();
}

function renderHighScoreLists(scores) {
  victoryScores.innerHTML = renderHighScoreRows(sortHighScores(scores.victory, "victory"), "No victories yet");
  vanquishedScores.innerHTML = renderHighScoreRows(sortHighScores(scores.vanquished, "vanquished"), "No last stands yet");
}

async function refreshRemoteHighScores() {
  try {
    const remoteScores = await loadSupabaseHighScores();
    saveHighScores(remoteScores);
    renderHighScoreLists(remoteScores);
  } catch (error) {
    console.warn("TowerLine high score online load failed", error);
  }
}

async function saveSupabaseHighScore(score, result) {
  const response = await fetch(supabaseScoreUrl(), {
    method: "POST",
    headers: supabaseHeaders("return=minimal"),
    body: JSON.stringify({
      player_name: score.name,
      result,
      elapsed_seconds: score.time,
      win_streak: score.winStreak ?? 0,
      pieces_killed: score.piecesKilled ?? 0,
      pieces_lost: score.piecesLost ?? 0,
    }),
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }
}

async function loadSupabaseHighScores() {
  const [victory, vanquished] = await Promise.all([
    loadSupabaseScoresForResult("victory", "elapsed_seconds.asc,created_at.asc"),
    loadSupabaseScoresForResult("vanquished", "elapsed_seconds.desc,created_at.asc"),
  ]);
  return { victory, vanquished };
}

async function loadSupabaseScoresForResult(result, order) {
  const params = new URLSearchParams({
    select: "player_name,result,elapsed_seconds,win_streak,pieces_killed,pieces_lost,created_at",
    result: `eq.${result}`,
    order,
    limit: String(HIGH_SCORE_LIMIT),
  });
  const response = await fetch(`${supabaseScoreUrl()}?${params}`, {
    headers: supabaseHeaders(),
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  const rows = await response.json();
  return rows.map(scoreFromSupabaseRow).filter(isValidHighScore);
}

function scoreFromSupabaseRow(row) {
  return {
    name: row.player_name,
    time: Number(row.elapsed_seconds),
    winStreak: Number(row.win_streak) || 0,
    piecesKilled: Number(row.pieces_killed) || 0,
    piecesLost: Number(row.pieces_lost) || 0,
    at: Date.parse(row.created_at),
  };
}

function supabaseScoreUrl() {
  return `${SUPABASE_URL}/rest/v1/${encodeURIComponent(SUPABASE_SCORE_TABLE)}`;
}

function supabaseHeaders(prefer) {
  const headers = {
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    "Content-Type": "application/json",
  };
  if (prefer) headers.Prefer = prefer;
  return headers;
}

function renderHighScoreRows(scores, emptyText) {
  if (scores.length === 0) {
    return `<li><div class="score-main"><span class="score-name">${emptyText}</span><span class="score-time">--</span></div></li>`;
  }

  return scores.slice(0, HIGH_SCORE_LIMIT).map((score) => (
    `<li>
      <div class="score-main">
        <span class="score-name">${escapeHtml(score.name)}</span>
        <span class="score-time">${formatMatchTime(score.time)}</span>
      </div>
      <div class="score-detail">
        ${formatScoreDate(score.at)} · Streak ${score.winStreak ?? 0} · Killed ${score.piecesKilled ?? 0} · Lost ${score.piecesLost ?? 0}
      </div>
    </li>`
  )).join("");
}

function formatScoreDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Today";
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function renderStats() {
  const player = factions.find((faction) => faction.side === PLAYER_SIDE) ?? factions[1];
  const rival = otherFaction(player);
  const playerStats = player.stats;
  const rivalStats = rival.stats;

  statsSummary.innerHTML = [
    summaryChip(formatMatchTime(finishedMatchTime), "Elapsed Time"),
    summaryChip(`${playerStats.layersBroken}/${playerStats.layersBuilt}`, "Your Layers"),
    summaryChip(`${rivalStats.layersBroken}/${rivalStats.layersBuilt}`, "Rival Layers"),
    summaryChip(`${playerStats.sapperDetonations}/${rivalStats.sapperDetonations}`, "Sapper Blasts"),
    summaryChip(`${playerStats.wizardTouches}/${rivalStats.wizardTouches}`, "Wizard Touches"),
  ].join("");

  statsBody.innerHTML = Object.keys(unitDefs).map((type) => (
    `<tr>
      <td>${unitLabels[type]}</td>
      <td>${playerStats.produced[type]}</td>
      <td>${playerStats.killed[type]}</td>
      <td>${rivalStats.produced[type]}</td>
      <td>${rivalStats.killed[type]}</td>
    </tr>`
  )).join("");
}

function summaryChip(value, label) {
  return `<div class="stats-chip"><strong>${value}</strong><span>${label}</span></div>`;
}

function formatMatchTime(seconds) {
  const total = Math.max(0, Math.floor(seconds));
  const minutes = Math.floor(total / 60);
  const remainder = String(total % 60).padStart(2, "0");
  return `${minutes}:${remainder}`;
}

async function unlockAndStartMusic() {
  if (music.enabled || music.loading) return;

  music.tracks = fallbackMusicTracks;
  music.enabled = true;
  startMusicTrack(0, null);
  music.loading = true;

  try {
    const response = await fetch(MUSIC_MANIFEST_URL);
    const manifest = await response.json();
    music.tracks = manifest.tracks?.length ? manifest.tracks : fallbackMusicTracks;
    music.fadeSeconds = manifest.fadeSeconds ?? 2;
  } catch {
    music.tracks = fallbackMusicTracks;
  } finally {
    music.loading = false;
  }
}

function startMusicTrack(index, previousAudio) {
  if (!music.enabled || music.tracks.length === 0) return;
  const trackIndex = index % music.tracks.length;
  const audio = new Audio(music.tracks[trackIndex].src);
  let queuedNext = false;

  music.current = audio;
  music.currentIndex = trackIndex;
  audio.preload = "auto";
  audio.volume = 0;

  const queueNext = () => {
    if (queuedNext || music.current !== audio) return;
    queuedNext = true;
    startMusicTrack(trackIndex + 1, audio);
  };

  audio.addEventListener("timeupdate", () => {
    if (!Number.isFinite(audio.duration)) return;
    if (audio.duration - audio.currentTime <= music.fadeSeconds) queueNext();
  });
  audio.addEventListener("ended", queueNext);

  audio.play()
    .then(() => {
      fadeAudio(audio, 0, MUSIC_VOLUME, music.fadeSeconds);
      if (previousAudio) {
        fadeAudio(previousAudio, previousAudio.volume, 0, music.fadeSeconds)
          .then(() => stopAudio(previousAudio));
      }
    })
    .catch(() => {
      music.enabled = false;
      stopAudio(audio);
    });
}

function fadeAudio(audio, from, to, seconds) {
  const startedAt = performance.now();
  const duration = Math.max(0.1, seconds) * 1000;

  return new Promise((resolve) => {
    const tick = (now) => {
      const p = clamp((now - startedAt) / duration, 0, 1);
      audio.volume = clamp(lerp(from, to, smoothstep(p)), 0, 1);
      if (p < 1) {
        requestAnimationFrame(tick);
        return;
      }
      resolve();
    };

    requestAnimationFrame(tick);
  });
}

function stopAudio(audio) {
  audio.pause();
  audio.removeAttribute("src");
  audio.load();
}

function otherFaction(faction) {
  return factions[0] === faction ? factions[1] : factions[0];
}

function outerRing(faction) {
  return faction.rings
    .filter((ring) => ring.health > 0)
    .sort((a, b) => b.radius - a.radius)[0];
}

function distance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function render() {
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  ctx.clearRect(0, 0, width, height);

  const camera = makeCamera(width, height);
  drawBackdrop(width, height);
  drawBoard(camera);
  drawGrid(camera);
  drawCommandZones(camera);

  for (const faction of factions) drawFort(faction, camera);
  drawManifests(camera);
  drawUnits(camera);
  drawTowerShots(camera);
  for (const faction of factions) drawWizard(faction, camera);
  for (const faction of factions) drawPlannedWalls(faction, camera);
  for (const faction of factions) drawActiveDraw(faction, camera);
  drawSpellTrails();
  drawBursts(camera);
  drawHud(width, height);
  drawOpeningWallHint(width, height);

  if (winner) drawVictoryPulse(winner, camera, width, height);
}

function makeCamera(width, height) {
  const radius = commandRadiusAt(matchTime);
  const topY = factions[0].wizard.y - Math.max(7, radius + 3);
  const bottomY = factions[1].wizard.y + Math.max(7, radius + 3);
  const visibleH = bottomY - topY;
  const visibleW = Math.max(BOARD_WIDTH + 10, radius * 2 + 22);
  const hudPad = 32;
  const scale = Math.min((width - hudPad * 2) / visibleW, (height - 28) / visibleH);
  const worldLeft = BOARD_WIDTH / 2 - visibleW / 2;
  const xPad = (width - visibleW * scale) / 2;
  const yPad = (height - visibleH * scale) / 2;

  return {
    scale,
    left: worldLeft,
    top: topY,
    width,
    height,
    toScreenX: (x) => xPad + (x - worldLeft) * scale,
    toScreenY: (y) => yPad + (y - topY) * scale,
    worldSize: (value) => value * scale,
  };
}

function drawBackdrop(width, height) {
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, "#131720");
  gradient.addColorStop(0.48, "#1b1718");
  gradient.addColorStop(1, "#111821");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  ctx.save();
  ctx.globalAlpha = 0.18;
  for (let y = 0; y < height; y += 18) {
    ctx.fillStyle = y % 36 === 0 ? "#f2cf9c" : "#679b9a";
    ctx.fillRect(0, y, width, 1);
  }
  ctx.restore();
}

function drawBoard(camera) {
  const radius = commandRadiusAt(matchTime);
  const boardTop = 0;
  const boardBottom = factions[1].wizard.y + EDGE_INSET;
  const x = camera.toScreenX(0);
  const y = camera.toScreenY(boardTop);
  const w = camera.worldSize(BOARD_WIDTH);
  const h = camera.worldSize(boardBottom - boardTop);

  ctx.save();
  roundedRect(x, y, w, h, 8);
  const table = ctx.createLinearGradient(0, y, 0, y + h);
  table.addColorStop(0, "#26211d");
  table.addColorStop(0.5, "#35302a");
  table.addColorStop(1, "#252528");
  ctx.fillStyle = table;
  ctx.fill();
  ctx.strokeStyle = "rgba(244, 219, 165, 0.35)";
  ctx.lineWidth = 1.3;
  ctx.stroke();

  ctx.globalAlpha = 0.14;
  ctx.fillStyle = "#eed7a4";
  ctx.fillRect(x, camera.toScreenY(EDGE_INSET), w, Math.max(1, camera.worldSize(0.12)));
  ctx.fillRect(x, camera.toScreenY(boardBottom - EDGE_INSET), w, Math.max(1, camera.worldSize(0.12)));

  ctx.globalAlpha = 0.1;
  ctx.strokeStyle = radius > 9 ? "#75cfc4" : "#e8c27b";
  ctx.beginPath();
  ctx.moveTo(x + w * 0.16, camera.toScreenY(factions[0].wizard.y + radius + CENTER_GAP * 0.5));
  ctx.lineTo(x + w * 0.84, camera.toScreenY(factions[0].wizard.y + radius + CENTER_GAP * 0.5));
  ctx.stroke();
  ctx.restore();
}

function drawGrid(camera) {
  const boardBottom = factions[1].wizard.y + EDGE_INSET;
  ctx.save();
  ctx.strokeStyle = "rgba(246, 224, 180, 0.07)";
  ctx.lineWidth = 1;

  for (let x = 0; x <= BOARD_WIDTH; x += 6) {
    ctx.beginPath();
    ctx.moveTo(camera.toScreenX(x), camera.toScreenY(0));
    ctx.lineTo(camera.toScreenX(x), camera.toScreenY(boardBottom));
    ctx.stroke();
  }

  for (let y = 0; y <= boardBottom; y += 6) {
    ctx.beginPath();
    ctx.moveTo(camera.toScreenX(0), camera.toScreenY(y));
    ctx.lineTo(camera.toScreenX(BOARD_WIDTH), camera.toScreenY(y));
    ctx.stroke();
  }

  ctx.restore();
}

function drawCommandZones(camera) {
  for (const faction of factions) {
    const x = camera.toScreenX(faction.wizard.x);
    const y = camera.toScreenY(faction.wizard.y);
    const r = camera.worldSize(faction.commandRadius);
    ctx.save();
    ctx.globalAlpha = 0.22;
    ctx.strokeStyle = faction.color;
    ctx.lineWidth = 1.4;
    ctx.setLineDash([5, 7]);
    ctx.beginPath();
    ctx.arc(x, y, r, 0, TAU);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.globalAlpha = 0.07;
    ctx.fillStyle = faction.color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, TAU);
    ctx.fill();

    const pressure = faction.idlePressure ?? 0;
    if (pressure > 0.02) {
      ctx.globalAlpha = 0.16 + pressure * 0.32;
      ctx.strokeStyle = "#fbd98e";
      ctx.lineWidth = 1.2 + pressure * 1.6;
      ctx.setLineDash([2, 6]);
      ctx.beginPath();
      ctx.arc(x, y, r + camera.worldSize(0.45), -Math.PI / 2, -Math.PI / 2 + TAU * pressure);
      ctx.stroke();
      ctx.setLineDash([]);
    }
    ctx.restore();
  }
}

function drawFort(faction, camera) {
  const rings = faction.rings.slice().sort((a, b) => a.radius - b.radius);
  for (const ring of rings) drawRing(ring, camera);
}

function drawRing(ring, camera) {
  const faction = ring.faction;
  const cx = camera.toScreenX(faction.wizard.x);
  const cy = camera.toScreenY(faction.wizard.y);
  const r = camera.worldSize(ring.radius);
  const progressAlpha = lerp(0.24, 1, ring.build);
  const wallWidth = clamp(camera.worldSize(0.42), 3, 8);
  const damageRatio = clamp(ring.health / ring.maxHealth, 0, 1);
  const weakness = wallWeaknessRatio(ring);
  const wallCoreColor = wallWeaknessColor(faction, weakness);

  ctx.save();
  ctx.globalAlpha = progressAlpha;
  ctx.lineWidth = wallWidth + 2;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.strokeStyle = "rgba(14, 15, 18, 0.55)";
  strokeFortPath(ring, camera);
  ctx.stroke();

  const wallGradient = ctx.createLinearGradient(cx - r, cy - r, cx + r, cy + r);
  wallGradient.addColorStop(0, "#f7dfb6");
  wallGradient.addColorStop(0.48, wallCoreColor);
  wallGradient.addColorStop(1, weakness > 0.5 ? wallWeaknessEdgeColor(faction, weakness) : "#9fa6b0");
  ctx.strokeStyle = wallGradient;
  ctx.lineWidth = wallWidth;
  strokeFortPath(ring, camera);
  ctx.stroke();

  if (weakness > 0.05) {
    ctx.globalAlpha = progressAlpha * weakness * 0.46;
    ctx.strokeStyle = wallWeaknessGlowColor(faction);
    ctx.lineWidth = wallWidth + 1.4;
    strokeFortPath(ring, camera);
    ctx.stroke();
    ctx.globalAlpha = progressAlpha;
  }

  ctx.globalAlpha = progressAlpha * (1 - damageRatio) * 0.85;
  ctx.strokeStyle = "#1d1611";
  ctx.lineWidth = 1.2;
  for (const spot of ring.weakSpots) {
    const sx = cx + Math.cos(spot.angle) * r;
    const sy = cy + Math.sin(spot.angle) * r;
    ctx.beginPath();
    ctx.moveTo(sx - 4, sy - 3);
    ctx.lineTo(sx + 4, sy + 3);
    ctx.moveTo(sx + 2, sy - 5);
    ctx.lineTo(sx - 2, sy + 5);
    ctx.stroke();
  }

  drawTowers(ring, camera, progressAlpha);
  drawGate(ring, camera);
  ctx.restore();
}

function wallWeaknessRatio(ring) {
  const healthRatio = clamp(ring.health / ring.maxHealth, 0, 1);
  return smoothstep(clamp((0.62 - healthRatio) / 0.62, 0, 1));
}

function wallWeaknessColor(faction, weakness) {
  const base = faction.side === "south" ? [98, 210, 197] : [217, 107, 95];
  const weak = faction.side === "south" ? [255, 74, 64] : [188, 83, 255];
  return rgbColor(mixRgb(base, weak, weakness));
}

function wallWeaknessEdgeColor(faction, weakness) {
  const base = [159, 166, 176];
  const weak = faction.side === "south" ? [255, 132, 96] : [221, 144, 255];
  return rgbColor(mixRgb(base, weak, weakness));
}

function wallWeaknessGlowColor(faction) {
  return faction.side === "south" ? "rgba(255, 58, 49, 0.92)" : "rgba(191, 79, 255, 0.92)";
}

function mixRgb(a, b, t) {
  return [
    Math.round(lerp(a[0], b[0], t)),
    Math.round(lerp(a[1], b[1], t)),
    Math.round(lerp(a[2], b[2], t)),
  ];
}

function rgbColor(rgb) {
  return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
}

function strokeFortPath(ring, camera) {
  const faction = ring.faction;
  const cx = camera.toScreenX(faction.wizard.x);
  const cy = camera.toScreenY(faction.wizard.y);
  const r = camera.worldSize(ring.radius);
  const gateHalf = gateHalfAngle(ring);
  const skipStart = normalizeAngle(ring.gateAngle - gateHalf);
  const skipEnd = normalizeAngle(ring.gateAngle + gateHalf);
  const breachStart = ring.breached && ring.breachAngle !== null
    ? normalizeAngle(ring.breachAngle - (ring.breachWidth || 0.42))
    : null;
  const breachEnd = ring.breached && ring.breachAngle !== null
    ? normalizeAngle(ring.breachAngle + (ring.breachWidth || 0.42))
    : null;
  const baseCount = ring.style === "round" ? 130 : ring.vertices * 20;
  const count = Math.max(baseCount, Math.ceil(TAU * ring.radius / FORT_PATH_SAMPLE_ARC));
  let drawing = false;

  ctx.beginPath();

  for (let i = 0; i <= count; i += 1) {
    const angle = ring.phase + (i / count) * TAU;
    const local = normalizeAngle(angle);
    const inGate = angleBetween(local, skipStart, skipEnd);
    const inBreach = breachStart !== null && angleBetween(local, breachStart, breachEnd);
    if (inGate || inBreach) {
      drawing = false;
      continue;
    }

    const fortRadius = r * fortRadiusFactor(ring, angle);
    const x = cx + Math.cos(angle) * fortRadius;
    const y = cy + Math.sin(angle) * fortRadius;
    if (!drawing) {
      ctx.moveTo(x, y);
      drawing = true;
    } else {
      ctx.lineTo(x, y);
    }
  }
}

function fortRadiusFactor(ring, angle) {
  const unevenness = ring.unevenness ?? 0;
  if (ring.style === "round") {
    const handWobble = Math.sin(angle * 5 + ring.phase) * (0.012 * (1 - ring.quality) + unevenness * 0.035);
    const secondaryWobble = Math.sin(angle * 9 - ring.phase * 0.7) * unevenness * 0.014;
    return 1 + handWobble + secondaryWobble;
  }
  if (ring.style === "square") {
    const a = normalizeAngle(angle - ring.phase + Math.PI / 4);
    const c = Math.max(Math.abs(Math.cos(a)), Math.abs(Math.sin(a)));
    return 0.9 / c;
  }
  if (ring.style === "angular") {
    const vertices = Math.max(3, ring.vertices || 4);
    const sector = TAU / vertices;
    const local = Math.abs((((angle - ring.phase + sector / 2) % sector) + sector) % sector - sector / 2);
    const polygonFactor = Math.cos(Math.PI / vertices) / Math.max(0.18, Math.cos(local));
    const sharpness = lerp(0.72, 1, ring.quality);
    const wobble = Math.sin(angle * (vertices + 2) + ring.phase) * (0.014 * (1 - ring.quality) + unevenness * 0.026);
    return lerp(1, polygonFactor, sharpness) + wobble;
  }

  return 1;
}

function drawTowers(ring, camera, alpha) {
  const faction = ring.faction;
  const cx = camera.toScreenX(faction.wizard.x);
  const cy = camera.toScreenY(faction.wizard.y);

  for (const tower of ring.towers) {
    if (angleInBreach(tower.angle, ring, tower.radius / Math.max(1, ring.radius))) continue;
    const wallR = camera.worldSize(tower.visualRadius ?? ring.radius);
    const groundX = cx + Math.cos(tower.angle) * wallR * fortRadiusFactor(ring, tower.angle);
    const groundY = cy + Math.sin(tower.angle) * wallR * fortRadiusFactor(ring, tower.angle);
    const lift = rookHopLift(tower, camera);
    const x = groundX;
    const y = groundY - lift;
    const r = clamp(camera.worldSize(tower.radius), 4, 10);

    ctx.save();
    ctx.globalAlpha = alpha * lerp(0.7, 1, ring.build);
    ctx.fillStyle = "#1b1615";
    ctx.beginPath();
    ctx.arc(groundX + 1, groundY + 2, r + 1, 0, TAU);
    ctx.fill();
    ctx.fillStyle = faction.color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, TAU);
    ctx.fill();
    ctx.strokeStyle = "#fee2ad";
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.arc(x, y, r * 0.68, 0, TAU);
    ctx.stroke();
    ctx.restore();
  }
}

function rookHopLift(tower, camera) {
  if ((tower.hopAge ?? ROOK_HOP_DURATION) >= ROOK_HOP_DURATION) return 0;
  const p = clamp(tower.hopAge / ROOK_HOP_DURATION, 0, 1);
  return Math.sin(p * Math.PI) * clamp(camera.worldSize(0.32), 2, 5);
}

function drawGate(ring, camera) {
  if (ring.gateCollapsed) return;

  const faction = ring.faction;
  const cx = camera.toScreenX(faction.wizard.x);
  const cy = camera.toScreenY(faction.wizard.y);
  const r = camera.worldSize(ring.radius);
  const angle = ring.gateAngle;
  const x = cx + Math.cos(angle) * r * fortRadiusFactor(ring, angle);
  const y = cy + Math.sin(angle) * r * fortRadiusFactor(ring, angle);
  const open = ring.gateOpen;
  const doorW = clamp(camera.worldSize(GATE_OPEN_ARC_LENGTH), 7, 15);
  const doorH = clamp(camera.worldSize(0.42), 3, 8);

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle + Math.PI / 2);
  const gap = open * doorW * 0.62;
  const panelW = doorW * 0.5;

  ctx.globalAlpha = 0.2 + open * 0.45;
  ctx.fillStyle = faction.accent;
  roundedRect(-gap / 2 - doorW * 0.18, -doorH / 2 - 2, gap + doorW * 0.36, doorH + 4, 3);
  ctx.fill();

  ctx.globalAlpha = 0.88;
  ctx.fillStyle = "#2a1a15";
  roundedRect(-doorW / 2 - gap / 2, -doorH / 2, panelW, doorH, 2);
  ctx.fill();
  roundedRect(gap / 2, -doorH / 2, panelW, doorH, 2);
  ctx.fill();

  ctx.globalAlpha = 0.72;
  ctx.strokeStyle = open > 0.08 ? "#fbd98e" : faction.color;
  ctx.lineWidth = 1;
  roundedRect(-doorW / 2 - gap / 2, -doorH / 2, panelW, doorH, 2);
  ctx.stroke();
  roundedRect(gap / 2, -doorH / 2, panelW, doorH, 2);
  ctx.stroke();
  ctx.restore();
}

function drawManifests(camera) {
  for (const manifest of manifests) {
    const faction = manifest.faction;
    const ring = outerRing(faction);
    const angle = faction.side === "north" ? Math.PI / 2 : -Math.PI / 2;
    const gateRadius = ring ? wallRadiusAt(ring, angle) : 0;
    const glyphScale = manifest.glyphScale ?? 1;
    const x = ring
      ? faction.wizard.x + Math.cos(angle) * gateRadius
      : faction.wizard.x;
    const y = ring
      ? faction.wizard.y + Math.sin(angle) * gateRadius
      : faction.wizard.y + Math.sin(angle) * 1.4;
    const sx = camera.toScreenX(x);
    const sy = camera.toScreenY(y);
    const p = clamp(manifest.age / manifest.duration, 0, 1);

    ctx.save();
    ctx.globalAlpha = 0.22 + p * 0.5;
    ctx.strokeStyle = faction.accent;
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.arc(sx, sy, camera.worldSize(0.85 + glyphScale * 0.55 + p * 1.25), 0, TAU * p);
    ctx.stroke();
    ctx.globalAlpha = 0.4;
    drawGlyphIcon(manifest.type, sx, sy, camera.worldSize(2.8 * glyphScale), faction);
    ctx.restore();
  }
}

function drawUnits(camera) {
  const sorted = units.slice().sort((a, b) => a.y - b.y);
  for (const unit of sorted) drawUnit(unit, camera);
}

function drawTowerShots(camera) {
  for (const shot of towerShots) {
    const p = clamp(shot.age / shot.duration, 0, 1);
    const headT = smoothstep(clamp(p * 1.35, 0, 1));
    const tailT = Math.max(0, headT - 0.26);
    const sx = camera.toScreenX(lerp(shot.fromX, shot.toX, tailT));
    const sy = camera.toScreenY(lerp(shot.fromY, shot.toY, tailT));
    const ex = camera.toScreenX(lerp(shot.fromX, shot.toX, headT));
    const ey = camera.toScreenY(lerp(shot.fromY, shot.toY, headT));
    const angle = Math.atan2(ey - sy, ex - sx);
    const headSize = clamp(camera.worldSize(0.36), 4, 7);

    ctx.save();
    ctx.globalAlpha = (1 - p) * 0.92;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.shadowColor = shot.glow;
    ctx.shadowBlur = 8;
    ctx.strokeStyle = shot.color;
    ctx.lineWidth = clamp(camera.worldSize(shot.width ?? 0.16), 1.2, 3.2);
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.lineTo(ex, ey);
    ctx.stroke();

    ctx.shadowBlur = 0;
    ctx.beginPath();
    ctx.moveTo(ex, ey);
    ctx.lineTo(
      ex - Math.cos(angle - 0.58) * headSize,
      ey - Math.sin(angle - 0.58) * headSize,
    );
    ctx.moveTo(ex, ey);
    ctx.lineTo(
      ex - Math.cos(angle + 0.58) * headSize,
      ey - Math.sin(angle + 0.58) * headSize,
    );
    ctx.stroke();
    ctx.restore();
  }
}

function drawUnit(unit, camera) {
  const sx = camera.toScreenX(unit.x);
  const sy = camera.toScreenY(unit.y);
  const size = clamp(camera.worldSize(unitDefs[unit.type].radius * 1.8), 5, 13);
  const hp = clamp(unit.hp / unit.maxHp, 0, 1);

  ctx.save();
  ctx.translate(sx, sy);
  ctx.globalAlpha = 0.96;
  ctx.fillStyle = "rgba(0, 0, 0, 0.34)";
  ctx.beginPath();
  ctx.ellipse(1.5, size * 0.55, size * 0.75, size * 0.3, 0, 0, TAU);
  ctx.fill();

  if (unit.burrowing) {
    drawBurrowingSapper(unit, size, hp);
    ctx.restore();
    return;
  }

  ctx.translate(Math.sin(unit.wobble) * 0.45, Math.cos(unit.wobble * 1.7) * 0.28);
  ctx.fillStyle = unit.faction.color;
  ctx.strokeStyle = unit.faction.accent;
  ctx.lineWidth = 1.15;

  if (unit.type === "pawn") drawPawnPiece(size);
  if (unit.type === "lancer") drawLancerPiece(size);
  if (unit.type === "blade") drawBladePiece(size);
  if (unit.type === "sapper") drawSapperPiece(size);
  if (unit.type === "ram") drawRamPiece(size);
  if (unit.type === "knight") drawKnightPiece(size);
  if (unit.type === "crown") drawCrownPiece(size);

  if (unit.route === "sneak") {
    ctx.save();
    ctx.globalAlpha = 0.42;
    ctx.strokeStyle = unit.faction.accent;
    ctx.setLineDash([2, 2]);
    ctx.beginPath();
    ctx.arc(0, 0, size * 0.82, -Math.PI * 0.15, Math.PI * 1.1);
    ctx.stroke();
    ctx.restore();
  }

  if (unit.order === "muster") {
    ctx.save();
    ctx.globalAlpha = 0.58;
    ctx.strokeStyle = "#fbd98e";
    ctx.setLineDash([2, 3]);
    ctx.beginPath();
    ctx.arc(0, 0, size * 0.98, -Math.PI * 0.35, Math.PI * 1.2);
    ctx.stroke();
    ctx.restore();
  }

  if (unit.type === "crown") {
    ctx.globalAlpha = 0.17;
    ctx.strokeStyle = unit.faction.accent;
    ctx.beginPath();
    ctx.arc(0, 0, camera.worldSize(unitDefs.crown.aura), 0, TAU);
    ctx.stroke();
  }

  ctx.globalAlpha = 0.75;
  ctx.fillStyle = "#181818";
  roundedRect(-size * 0.62, size * 0.86, size * 1.24, 2.2, 1);
  ctx.fill();
  ctx.fillStyle = hp > 0.48 ? "#bfe889" : "#f08b68";
  roundedRect(-size * 0.62, size * 0.86, size * 1.24 * hp, 2.2, 1);
  ctx.fill();
  ctx.restore();
}

function drawPawnPiece(size) {
  ctx.beginPath();
  ctx.arc(0, -size * 0.42, size * 0.32, 0, TAU);
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(-size * 0.38, size * 0.34);
  ctx.quadraticCurveTo(0, -size * 0.18, size * 0.38, size * 0.34);
  ctx.lineTo(size * 0.52, size * 0.58);
  ctx.lineTo(-size * 0.52, size * 0.58);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}

function drawLancerPiece(size) {
  drawPawnPiece(size * 0.92);
  ctx.beginPath();
  ctx.moveTo(size * 0.12, -size * 1.08);
  ctx.lineTo(size * 0.12, size * 0.48);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(size * 0.12, -size * 1.16);
  ctx.lineTo(size * 0.32, -size * 0.86);
  ctx.lineTo(size * 0.12, -size * 0.94);
  ctx.closePath();
  ctx.fill();
}

function drawBladePiece(size) {
  drawPawnPiece(size * 0.88);
  ctx.beginPath();
  ctx.moveTo(-size * 0.52, -size * 0.92);
  ctx.lineTo(size * 0.52, size * 0.1);
  ctx.moveTo(size * 0.52, -size * 0.92);
  ctx.lineTo(-size * 0.52, size * 0.1);
  ctx.stroke();
}

function drawSapperPiece(size) {
  ctx.beginPath();
  ctx.arc(0, -size * 0.18, size * 0.42, 0, TAU);
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(-size * 0.5, size * 0.46);
  ctx.lineTo(size * 0.5, size * 0.46);
  ctx.lineTo(size * 0.32, size * 0.72);
  ctx.lineTo(-size * 0.32, size * 0.72);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(size * 0.26, -size * 0.52);
  ctx.quadraticCurveTo(size * 0.74, -size * 0.86, size * 0.46, -size * 1.16);
  ctx.stroke();
  ctx.fillStyle = "#f5d285";
  ctx.beginPath();
  ctx.arc(size * 0.48, -size * 1.18, size * 0.11, 0, TAU);
  ctx.fill();
}

function drawRamPiece(size) {
  ctx.save();
  ctx.scale(1.15, 0.92);
  roundedRect(-size * 0.68, -size * 0.16, size * 1.36, size * 0.66, size * 0.12);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#2a211b";
  roundedRect(-size * 0.48, -size * 0.36, size * 0.96, size * 0.22, size * 0.08);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#f5d285";
  ctx.beginPath();
  ctx.moveTo(size * 0.74, -size * 0.18);
  ctx.lineTo(size * 1.02, -size * 0.02);
  ctx.lineTo(size * 0.74, size * 0.14);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#1c1816";
  for (const x of [-0.42, 0.42]) {
    ctx.beginPath();
    ctx.arc(size * x, size * 0.56, size * 0.2, 0, TAU);
    ctx.fill();
    ctx.stroke();
  }
  ctx.restore();
}

function drawBurrowingSapper(unit, size, hp) {
  const progress = clamp((unit.burrowTimer ?? 0) / Math.max(0.1, unit.burrowDuration ?? SAPPER_BURROW_DURATION), 0, 1);
  const pulse = 0.5 + Math.sin(elapsed * 14) * 0.18;
  const moundW = size * lerp(1.25, 1.75, progress);
  const moundH = size * lerp(0.46, 0.68, progress);

  ctx.save();
  ctx.globalAlpha = 0.88;
  ctx.fillStyle = "rgba(42, 30, 22, 0.92)";
  ctx.beginPath();
  ctx.ellipse(0, size * 0.35, moundW, moundH, 0, 0, TAU);
  ctx.fill();

  ctx.globalAlpha = 0.7;
  ctx.strokeStyle = unit.faction.accent;
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.arc(0, size * 0.32, size * (0.82 + pulse * 0.12), -Math.PI * 0.12, Math.PI * (1.1 + progress * 0.6));
  ctx.stroke();

  ctx.globalAlpha = 0.95;
  ctx.fillStyle = unit.faction.color;
  ctx.strokeStyle = unit.faction.accent;
  ctx.beginPath();
  ctx.arc(0, -size * 0.08, size * lerp(0.34, 0.18, progress), 0, TAU);
  ctx.fill();
  ctx.stroke();

  ctx.globalAlpha = 0.82;
  ctx.fillStyle = hp > 0.48 ? "#bfe889" : "#f08b68";
  roundedRect(-moundW * 0.52, size * 0.84, moundW * hp, 2.2, 1);
  ctx.fill();

  ctx.globalAlpha = 0.9;
  ctx.fillStyle = "#f5d285";
  ctx.beginPath();
  ctx.arc(size * 0.42, -size * 0.34, size * (0.08 + pulse * 0.04), 0, TAU);
  ctx.fill();
  ctx.restore();
}

function drawKnightPiece(size) {
  ctx.beginPath();
  ctx.moveTo(-size * 0.48, size * 0.58);
  ctx.lineTo(size * 0.52, size * 0.58);
  ctx.lineTo(size * 0.32, size * 0.22);
  ctx.quadraticCurveTo(size * 0.62, -size * 0.44, -size * 0.12, -size * 0.92);
  ctx.lineTo(-size * 0.52, -size * 0.52);
  ctx.lineTo(-size * 0.24, -size * 0.2);
  ctx.quadraticCurveTo(-size * 0.46, size * 0.06, -size * 0.48, size * 0.58);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(size * 0.14, -size * 0.42, size * 0.045, 0, TAU);
  ctx.fillStyle = "#1c1816";
  ctx.fill();
}

function drawCrownPiece(size) {
  ctx.beginPath();
  ctx.moveTo(-size * 0.62, size * 0.52);
  ctx.lineTo(size * 0.62, size * 0.52);
  ctx.lineTo(size * 0.52, -size * 0.38);
  ctx.lineTo(size * 0.22, -size * 0.04);
  ctx.lineTo(0, -size * 0.72);
  ctx.lineTo(-size * 0.22, -size * 0.04);
  ctx.lineTo(-size * 0.52, -size * 0.38);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, -size * 0.78, size * 0.1, 0, TAU);
  ctx.arc(-size * 0.55, -size * 0.42, size * 0.08, 0, TAU);
  ctx.arc(size * 0.55, -size * 0.42, size * 0.08, 0, TAU);
  ctx.fill();
}

function drawWizard(faction, camera) {
  const sx = camera.toScreenX(faction.wizard.x);
  const sy = camera.toScreenY(faction.wizard.y);
  const pulse = 1 + Math.sin(elapsed * 4.2) * 0.05 + faction.scorePulse * 0.16;
  const r = clamp(camera.worldSize(1.4) * pulse, 8, 17);
  const hp = clamp(faction.wizardHp / faction.wizardMaxHp, 0, 1);

  ctx.save();
  ctx.globalAlpha = 0.16;
  ctx.fillStyle = faction.color;
  ctx.beginPath();
  ctx.arc(sx, sy, r * 2.4, 0, TAU);
  ctx.fill();

  ctx.globalAlpha = 1;
  ctx.fillStyle = "#18151a";
  ctx.beginPath();
  ctx.arc(sx, sy, r * 1.08, 0, TAU);
  ctx.fill();
  ctx.fillStyle = faction.color;
  ctx.beginPath();
  ctx.arc(sx, sy, r * 0.76, 0, TAU);
  ctx.fill();
  ctx.strokeStyle = faction.accent;
  ctx.lineWidth = 1.7;
  ctx.beginPath();
  ctx.arc(sx, sy, r, -Math.PI / 2, -Math.PI / 2 + TAU * hp);
  ctx.stroke();

  ctx.fillStyle = faction.accent;
  ctx.beginPath();
  ctx.moveTo(sx, sy - r * 0.52);
  ctx.lineTo(sx + r * 0.44, sy + r * 0.42);
  ctx.lineTo(sx - r * 0.44, sy + r * 0.42);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawActiveDraw(faction, camera) {
  const draw = faction.draw;
  if (!draw) return;
  ctx.save();
  ctx.globalAlpha = 0.28 + draw.progress * 0.5;
  ctx.strokeStyle = draw.strain > 0 ? "#ff846e" : faction.accent;
  ctx.fillStyle = faction.color;
  ctx.lineWidth = clamp(camera.worldSize(0.2), 2, 5);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  if (draw.kind === "fort") {
    drawFortGlyph(faction, draw, camera);
  } else {
    const offsetY = faction.side === "north" ? faction.commandRadius * 0.46 : -faction.commandRadius * 0.46;
    const x = camera.toScreenX(faction.wizard.x + draw.lane * 0.18);
    const y = camera.toScreenY(faction.wizard.y + offsetY);
    drawGestureGlyph(draw.type, x, y, camera.worldSize(3.8 * (draw.glyphScale ?? 1)), draw.progress);
  }

  ctx.restore();
}

function drawSpellTrails() {
  for (const trail of spellTrails) drawIgnitedSpellTrail(trail);
  if (pendingSpellGesture) drawPendingSpellGesture(pendingSpellGesture);
  if (activeSpellGesture) drawLiveSpellTrail(activeSpellGesture);
}

function drawLiveSpellTrail(gesture) {
  const shimmer = 0.5 + Math.sin(elapsed * 18) * 0.5;
  ctx.save();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.globalCompositeOperation = "screen";
  ctx.shadowColor = gesture.faction.accent;
  ctx.shadowBlur = 18 + shimmer * 10;
  ctx.strokeStyle = gesture.faction.accent;
  ctx.globalAlpha = 0.22;
  ctx.lineWidth = 14;
  strokeScreenSpellStroke(gesture.points);
  ctx.globalAlpha = 0.9;
  ctx.lineWidth = 4.4;
  strokeScreenSpellStroke(gesture.points);
  ctx.strokeStyle = "#fff8d8";
  ctx.globalAlpha = 0.72;
  ctx.lineWidth = 1.4;
  strokeScreenSpellStroke(gesture.points);
  drawSpellSparks(gesture.points, gesture.faction, shimmer, 0.9);
  ctx.restore();
}

function drawIgnitedSpellTrail(trail) {
  const p = clamp(trail.age / Math.max(0.1, trail.duration), 0, 1);
  const burn = clamp((trail.age - trail.igniteAt) / SPELL_IGNITION_DURATION, 0, 1);
  const fade = 1 - smoothstep(p);
  const head = clamp(burn * 1.25, 0, 1);
  const ember = 0.55 + Math.sin(elapsed * 21 + trail.id) * 0.45;
  const strokes = trail.strokes ?? [trail.points];

  ctx.save();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.globalCompositeOperation = "screen";
  ctx.shadowColor = trail.faction.accent;
  ctx.shadowBlur = 24 * fade + ember * 10;
  ctx.strokeStyle = trail.faction.color;
  ctx.globalAlpha = 0.18 * fade;
  ctx.lineWidth = 18;
  for (const stroke of strokes) strokeScreenSpellStroke(stroke);
  ctx.strokeStyle = "#ffd36c";
  ctx.globalAlpha = (0.78 - p * 0.35) * fade;
  ctx.lineWidth = 5.2;
  for (const stroke of strokes) strokeScreenSpellStrokeProgress(stroke, head);
  ctx.strokeStyle = "#fff7d4";
  ctx.globalAlpha = 0.86 * fade;
  ctx.lineWidth = 1.6;
  for (const stroke of strokes) strokeScreenSpellStrokeProgress(stroke, head);
  for (const stroke of strokes) drawSpellSparks(stroke, trail.faction, ember, fade);
  ctx.restore();
}

function drawPendingSpellGesture(pending) {
  const settle = clamp((pending.commitAt - elapsed) / SPELL_SETTLE_DELAY, 0, 1);
  const pulse = 0.5 + Math.sin(elapsed * 14) * 0.5;
  ctx.save();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.globalCompositeOperation = "screen";
  ctx.shadowColor = pending.faction.accent;
  ctx.shadowBlur = 14 + pulse * 12;
  ctx.strokeStyle = pending.faction.accent;
  ctx.globalAlpha = 0.2 + settle * 0.18;
  ctx.lineWidth = 13;
  for (const stroke of pending.strokes) strokeScreenSpellStroke(stroke);
  ctx.strokeStyle = "#fff8d8";
  ctx.globalAlpha = 0.45 + pulse * 0.24;
  ctx.lineWidth = 2;
  for (const stroke of pending.strokes) strokeScreenSpellStroke(stroke);
  for (const stroke of pending.strokes) drawSpellSparks(stroke, pending.faction, pulse, 0.65);
  ctx.restore();
}

function strokeScreenSpellStroke(points) {
  if (points.length < 2) {
    drawSpellDot(points[0]);
    return;
  }
  strokeScreenPolyline(points);
}

function strokeScreenSpellStrokeProgress(points, progress) {
  if (points.length < 2) {
    if (progress > 0.08) drawSpellDot(points[0]);
    return;
  }
  strokeScreenPolylineProgress(points, progress);
}

function drawSpellDot(point) {
  if (!point) return;
  const radius = Math.max(2.2, ctx.lineWidth * 0.55);
  ctx.beginPath();
  ctx.arc(point.x, point.y, radius, 0, TAU);
  ctx.fillStyle = ctx.strokeStyle;
  ctx.fill();
}

function strokeScreenPolyline(points) {
  if (points.length < 2) return;
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i += 1) ctx.lineTo(points[i].x, points[i].y);
  ctx.stroke();
}

function strokeScreenPolylineProgress(points, progress) {
  const total = gestureLength(points);
  if (total <= 0) return;
  const target = total * clamp(progress, 0, 1);
  let covered = 0;

  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i += 1) {
    const a = points[i - 1];
    const b = points[i];
    const segment = distance(a, b);
    if (covered + segment <= target) {
      ctx.lineTo(b.x, b.y);
      covered += segment;
      continue;
    }

    const local = clamp((target - covered) / Math.max(0.001, segment), 0, 1);
    ctx.lineTo(lerp(a.x, b.x, local), lerp(a.y, b.y, local));
    break;
  }
  ctx.stroke();
}

function drawSpellSparks(points, faction, pulse, alpha) {
  const step = Math.max(2, Math.floor(points.length / 12));
  ctx.fillStyle = faction.accent;
  for (let i = 0; i < points.length; i += step) {
    const point = points[i];
    const flicker = 0.55 + Math.sin(elapsed * 13 + i * 1.7) * 0.45;
    const r = 1.2 + flicker * 2.2 + pulse * 0.8;
    ctx.globalAlpha = alpha * (0.18 + flicker * 0.34);
    ctx.beginPath();
    ctx.arc(point.x + Math.sin(i) * 2.4, point.y + Math.cos(i * 1.3) * 2.4, r, 0, TAU);
    ctx.fill();
  }
}

function drawPlannedWalls(faction, camera) {
  if (!faction.plannedWalls?.length) return;

  ctx.save();
  ctx.globalAlpha = 0.16;
  ctx.strokeStyle = faction.accent;
  ctx.fillStyle = faction.color;
  ctx.lineWidth = clamp(camera.worldSize(0.16), 1.5, 4);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.setLineDash([6, 7]);

  for (const draw of faction.plannedWalls) {
    drawFortGlyph(faction, { ...draw, progress: 1 }, camera);
  }

  ctx.setLineDash([]);
  ctx.restore();
}

function drawFortGlyph(faction, draw, camera) {
  const cx = camera.toScreenX(faction.wizard.x);
  const cy = camera.toScreenY(faction.wizard.y);
  const r = camera.worldSize(draw.radius);
  const end = draw.progress * TAU;

  ctx.beginPath();
  if (draw.style === "round") {
    ctx.arc(cx, cy, r, draw.phase, draw.phase + end);
  } else {
    const points = [];
    const count = draw.style === "square" ? 80 : 130;
    for (let i = 0; i <= count * draw.progress; i += 1) {
      const angle = draw.phase + (i / count) * TAU;
      const rr = r * fortRadiusFactor({
        style: draw.style,
        vertices: draw.vertices,
        phase: draw.phase,
        quality: draw.quality,
      }, angle);
      points.push({ x: cx + Math.cos(angle) * rr, y: cy + Math.sin(angle) * rr });
    }
    if (points.length > 1) {
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i += 1) ctx.lineTo(points[i].x, points[i].y);
    }
  }
  ctx.stroke();

  const towerVisible = Math.floor(draw.towerCount * draw.progress);
  for (let i = 0; i < towerVisible; i += 1) {
    const a = draw.phase + (i / Math.max(1, draw.towerCount)) * TAU;
    const towerRadius = r * fortRadiusFactor(draw, a);
    const x = cx + Math.cos(a) * towerRadius;
    const y = cy + Math.sin(a) * towerRadius;
    ctx.beginPath();
    ctx.arc(x, y, clamp(camera.worldSize(0.68), 4, 9), 0, TAU);
    ctx.stroke();
  }
}

function drawGestureGlyph(type, x, y, size, progress) {
  const p = clamp(progress, 0, 1);
  ctx.beginPath();

  if (type === "pawn") {
    const length = size * 0.45 * p;
    ctx.moveTo(x - length * 0.5, y);
    ctx.lineTo(x + length * 0.5, y);
  }

  if (type === "lancer") {
    ctx.moveTo(x - size * 0.72, y);
    ctx.lineTo(lerp(x - size * 0.72, x + size * 0.72, p), y);
  }

  if (type === "blade") {
    const points = [
      [0.58, -0.64],
      [0.18, -0.62],
      [-0.34, -0.42],
      [-0.58, -0.06],
      [-0.5, 0.28],
      [-0.12, 0.52],
      [0.42, 0.62],
    ];
    const segments = points.length - 1;
    const maxSegment = p * segments;
    ctx.moveTo(x + points[0][0] * size, y + points[0][1] * size);
    for (let i = 1; i < points.length; i += 1) {
      const local = clamp(maxSegment - (i - 1), 0, 1);
      if (local <= 0) break;
      const ax = points[i - 1][0];
      const ay = points[i - 1][1];
      const bx = points[i][0];
      const by = points[i][1];
      ctx.lineTo(x + lerp(ax, bx, local) * size, y + lerp(ay, by, local) * size);
    }
  }

  if (type === "sapper") {
    const points = [
      [-0.66, -0.58],
      [-0.32, 0.02],
      [0, 0.64],
      [0.34, 0.02],
      [0.66, -0.58],
    ];
    const segments = points.length - 1;
    const maxSegment = p * segments;
    ctx.moveTo(x + points[0][0] * size, y + points[0][1] * size);
    for (let i = 1; i < points.length; i += 1) {
      const local = clamp(maxSegment - (i - 1), 0, 1);
      if (local <= 0) break;
      const ax = points[i - 1][0];
      const ay = points[i - 1][1];
      const bx = points[i][0];
      const by = points[i][1];
      ctx.lineTo(x + lerp(ax, bx, local) * size, y + lerp(ay, by, local) * size);
    }
  }

  if (type === "ram") {
    const points = [
      [-0.72, -0.5],
      [0.72, -0.5],
      [-0.72, 0.5],
      [0.72, 0.5],
    ];
    const segments = points.length - 1;
    const maxSegment = p * segments;
    ctx.moveTo(x + points[0][0] * size, y + points[0][1] * size);
    for (let i = 1; i < points.length; i += 1) {
      const local = clamp(maxSegment - (i - 1), 0, 1);
      if (local <= 0) break;
      const ax = points[i - 1][0];
      const ay = points[i - 1][1];
      const bx = points[i][0];
      const by = points[i][1];
      ctx.lineTo(x + lerp(ax, bx, local) * size, y + lerp(ay, by, local) * size);
    }
  }

  if (type === "knight" || type === "crown") {
    const points = type === "knight"
      ? [[-0.78, 0.48], [-0.58, -0.18], [-0.24, -0.58], [0.18, -0.62], [0.56, -0.18], [0.78, 0.48]]
      : [[-0.75, -0.48], [-0.38, 0.52], [0, -0.48], [0.38, 0.52], [0.75, -0.48]];
    const segments = points.length - 1;
    const maxSegment = p * segments;
    ctx.moveTo(x + points[0][0] * size, y + points[0][1] * size);
    for (let i = 1; i < points.length; i += 1) {
      const local = clamp(maxSegment - (i - 1), 0, 1);
      if (local <= 0) break;
      const ax = points[i - 1][0];
      const ay = points[i - 1][1];
      const bx = points[i][0];
      const by = points[i][1];
      ctx.lineTo(x + lerp(ax, bx, local) * size, y + lerp(ay, by, local) * size);
    }
  }

  ctx.stroke();
}

function drawGlyphIcon(type, x, y, size, faction) {
  ctx.save();
  ctx.strokeStyle = faction.accent;
  ctx.fillStyle = faction.color;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.lineWidth = 2;
  drawGestureGlyph(type, x, y, size, 1);
  ctx.restore();
}

function drawBursts(camera) {
  for (const burst of bursts) {
    const p = clamp(burst.age / burst.duration, 0, 1);
    const x = camera.toScreenX(burst.x);
    const y = camera.toScreenY(burst.y);
    const r = camera.worldSize(burst.radius) * lerp(0.2, 1.3, p);

    ctx.save();
    ctx.globalAlpha = (1 - p) * (burst.kind === "break" ? 0.7 : 0.55);
    ctx.strokeStyle = burst.color;
    ctx.lineWidth = burst.kind === "ring" ? 2.2 : 1.6;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, TAU);
    ctx.stroke();
    if (burst.kind === "hit") {
      ctx.fillStyle = burst.color;
      ctx.beginPath();
      ctx.arc(x, y, Math.max(1.5, r * 0.25), 0, TAU);
      ctx.fill();
    }

    if (burst.kind === "blast") {
      ctx.fillStyle = burst.color;
      ctx.globalAlpha = (1 - p) * 0.22;
      ctx.beginPath();
      ctx.arc(x, y, r * 0.68, 0, TAU);
      ctx.fill();
      ctx.globalAlpha = (1 - p) * 0.78;
      ctx.beginPath();
      for (let i = 0; i < 8; i += 1) {
        const a = (i / 8) * TAU + p * 0.4;
        ctx.moveTo(x + Math.cos(a) * r * 0.24, y + Math.sin(a) * r * 0.24);
        ctx.lineTo(x + Math.cos(a) * r, y + Math.sin(a) * r);
      }
      ctx.stroke();
    }
    ctx.restore();
  }
}

function drawHud(width, height) {
  drawManaCluster(factions[1], 12, height - 18, height * 0.34, false, 1);
  drawManaCluster(factions[0], width - 12, 18, height * 0.34, true, -1);
  drawTimeSigil(width, height);
}

function drawManaCluster(faction, x, y, h, invert, inward) {
  drawManaBar(faction, x, y, h, invert);
  drawRegenBar(faction, x + inward * 11, y, h, invert);
}

function drawManaBar(faction, x, y, h, invert) {
  const w = 8;
  const fill = clamp(faction.energy / MAX_ENERGY, 0, 1);
  const top = invert ? y : y - h;
  const filledH = h * fill;

  ctx.save();
  ctx.globalAlpha = 0.78;
  roundedRect(x - w / 2, top, w, h, 4);
  ctx.fillStyle = "rgba(0, 0, 0, 0.34)";
  ctx.fill();

  const grad = ctx.createLinearGradient(0, top + h, 0, top);
  grad.addColorStop(0, "#e95d4f");
  grad.addColorStop(0.28, "#e9b85e");
  grad.addColorStop(0.66, "#8be07c");
  grad.addColorStop(1, faction.accent);

  ctx.fillStyle = grad;
  const fy = invert ? top : top + h - filledH;
  roundedRect(x - w / 2, fy, w, filledH, 4);
  ctx.fill();

  if (faction.debt > 0 || faction.draw?.strain > 0) {
    ctx.globalAlpha = 0.32 + Math.sin(elapsed * 10) * 0.12;
    ctx.strokeStyle = "#ff7568";
    ctx.lineWidth = 2;
    roundedRect(x - w / 2 - 3, top - 3, w + 6, h + 6, 7);
    ctx.stroke();
  }

  ctx.globalAlpha = 0.45;
  ctx.strokeStyle = faction.color;
  ctx.lineWidth = 1;
  roundedRect(x - w / 2, top, w, h, 4);
  ctx.stroke();
  ctx.restore();
}

function drawRegenBar(faction, x, y, h, invert) {
  const w = 4;
  const top = invert ? y : y - h;
  const rate = currentManaRegenRate(faction);
  const fill = clamp(rate / REGEN_GREEN, 0, 1);
  const pulse = faction.draw || faction.debt > 0 ? 0.45 + Math.sin(elapsed * 11) * 0.18 : 1;
  const filledH = h * fill;

  ctx.save();
  ctx.globalAlpha = 0.45;
  roundedRect(x - w / 2, top, w, h, 3);
  ctx.fillStyle = "rgba(0, 0, 0, 0.28)";
  ctx.fill();

  const grad = ctx.createLinearGradient(0, top + h, 0, top);
  grad.addColorStop(0, "#e95d4f");
  grad.addColorStop(0.4, "#e9b85e");
  grad.addColorStop(1, faction.accent);
  ctx.globalAlpha = 0.78 * pulse;
  ctx.fillStyle = rate === 0 ? "#e95d4f" : grad;

  if (rate === 0) {
    const warningH = Math.max(10, h * 0.08);
    const warningY = invert ? top : top + h - warningH;
    roundedRect(x - w / 2, warningY, w, warningH, 3);
  } else {
    const fy = invert ? top : top + h - filledH;
    roundedRect(x - w / 2, fy, w, filledH, 3);
  }
  ctx.fill();

  ctx.globalAlpha = 0.35;
  ctx.strokeStyle = faction.color;
  ctx.lineWidth = 1;
  roundedRect(x - w / 2, top, w, h, 3);
  ctx.stroke();
  ctx.restore();
}

function drawTimeSigil(width, height) {
  const cx = width / 2;
  const cy = height * 0.5;
  const p = (matchTime % 20) / 20;

  ctx.save();
  ctx.globalAlpha = 0.22;
  ctx.strokeStyle = "#f1d99a";
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.arc(cx, cy, 12, -Math.PI / 2, -Math.PI / 2 + TAU * p);
  ctx.stroke();
  ctx.globalAlpha = 0.1;
  ctx.beginPath();
  ctx.arc(cx, cy, 19 + Math.sin(elapsed * 2) * 2, 0, TAU);
  ctx.stroke();
  ctx.restore();
}

function drawVictoryPulse(faction, camera, width, height) {
  const p = clamp(resetTimer / 4.2, 0, 1);
  ctx.save();
  ctx.globalAlpha = (1 - p) * 0.18;
  ctx.fillStyle = faction.color;
  ctx.fillRect(0, 0, width, height);
  ctx.restore();
}

function drawOpeningWallHint(width, height) {
  if (gamePhase !== "playing" || winner || openingHintDismissed || matchTime < OPENING_HINT_DELAY) return;

  const age = matchTime - OPENING_HINT_DELAY;
  const alpha = smoothstep(clamp(age / OPENING_HINT_FADE, 0, 1));
  const cycle = (age % OPENING_HINT_LOOP) / OPENING_HINT_LOOP;
  const progress = clamp(cycle * 1.14, 0, 1);
  const cx = width / 2;
  const cy = height * 0.64;
  const scale = clamp(Math.min(width, height) / 410, 0.72, 1.08);
  const path = openingWallHintPath(cx, cy + 12 * scale, 42 * scale);
  const cursor = pointOnPolyline(path, progress);

  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.globalCompositeOperation = "source-over";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const label = "Build a wall";
  ctx.font = `${Math.round(14 * scale)}px Georgia, serif`;
  const labelW = ctx.measureText(label).width + 34 * scale;
  roundedRect(cx - labelW / 2, cy - 78 * scale, labelW, 32 * scale, 16 * scale);
  ctx.fillStyle = "rgba(13, 10, 18, 0.7)";
  ctx.fill();
  ctx.strokeStyle = "rgba(255, 248, 216, 0.45)";
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.fillStyle = "#fff8d8";
  ctx.fillText(label, cx, cy - 62 * scale);

  ctx.globalCompositeOperation = "screen";
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.shadowColor = playerFaction().accent;
  ctx.shadowBlur = 18 * scale;
  ctx.strokeStyle = playerFaction().accent;
  ctx.globalAlpha = alpha * 0.18;
  ctx.lineWidth = 14 * scale;
  strokeScreenPolyline(path);
  ctx.globalAlpha = alpha * 0.8;
  ctx.lineWidth = 4 * scale;
  strokeScreenPolylineProgress(path, progress);
  ctx.strokeStyle = "#fff8d8";
  ctx.globalAlpha = alpha * 0.72;
  ctx.lineWidth = 1.35 * scale;
  strokeScreenPolylineProgress(path, progress);
  drawSpellSparks(path.slice(0, Math.max(1, Math.floor(path.length * progress))), playerFaction(), cycle, alpha * 0.72);

  if (cursor) drawHintCursor(cursor, scale, alpha);
  ctx.restore();
}

function openingWallHintPath(cx, cy, r) {
  const points = [];
  for (let i = 0; i <= 30; i += 1) {
    const angle = -0.44 + (i / 30) * (Math.PI + 0.42);
    points.push({ x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r });
  }

  const loopCx = cx - r * 1.08;
  const loopCy = cy + r * 0.03;
  const loopR = r * 0.28;
  for (let i = 0; i <= 18; i += 1) {
    const angle = 0.05 + (i / 18) * TAU;
    points.push({ x: loopCx + Math.cos(angle) * loopR, y: loopCy + Math.sin(angle) * loopR });
  }

  for (let i = 0; i <= 30; i += 1) {
    const angle = Math.PI + 0.42 + (i / 30) * (Math.PI - 0.86);
    points.push({ x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r });
  }

  points.push({ x: cx + r * 1.28, y: cy - r * 0.34 });
  points.push({ x: cx + r * 0.82, y: cy });
  points.push({ x: cx + r * 1.28, y: cy + r * 0.34 });
  return points;
}

function pointOnPolyline(points, progress) {
  const total = gestureLength(points);
  if (total <= 0) return points[0] ?? null;
  const target = total * clamp(progress, 0, 1);
  let covered = 0;

  for (let i = 1; i < points.length; i += 1) {
    const a = points[i - 1];
    const b = points[i];
    const segment = distance(a, b);
    if (covered + segment < target) {
      covered += segment;
      continue;
    }

    const local = clamp((target - covered) / Math.max(0.001, segment), 0, 1);
    return {
      x: lerp(a.x, b.x, local),
      y: lerp(a.y, b.y, local),
      angle: Math.atan2(b.y - a.y, b.x - a.x),
    };
  }

  const last = points.at(-1);
  const previous = points.at(-2) ?? last;
  return { ...last, angle: Math.atan2(last.y - previous.y, last.x - previous.x) };
}

function drawHintCursor(point, scale, alpha) {
  ctx.save();
  ctx.globalCompositeOperation = "source-over";
  ctx.globalAlpha = alpha;
  ctx.translate(point.x + 12 * scale, point.y + 10 * scale);
  ctx.rotate((point.angle ?? 0) - 0.75);
  ctx.shadowColor = "rgba(0, 0, 0, 0.55)";
  ctx.shadowBlur = 8 * scale;
  ctx.fillStyle = "#fff8d8";
  ctx.strokeStyle = playerFaction().accent;
  ctx.lineWidth = 1.3 * scale;
  ctx.beginPath();
  ctx.moveTo(0, -13 * scale);
  ctx.lineTo(10 * scale, 12 * scale);
  ctx.lineTo(2 * scale, 8 * scale);
  ctx.lineTo(-4 * scale, 18 * scale);
  ctx.lineTo(-8 * scale, 16 * scale);
  ctx.lineTo(-3 * scale, 6 * scale);
  ctx.lineTo(-12 * scale, 7 * scale);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

function roundedRect(x, y, w, h, r) {
  const radius = Math.min(r, Math.abs(w) / 2, Math.abs(h) / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + w - radius, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
  ctx.lineTo(x + w, y + h - radius);
  ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
  ctx.lineTo(x + radius, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
}

function normalizeAngle(angle) {
  let result = angle % TAU;
  if (result < 0) result += TAU;
  return result;
}

function angleDistance(a, b) {
  return Math.abs(Math.atan2(Math.sin(a - b), Math.cos(a - b)));
}

function angleInBreach(angle, ring, padding = 0) {
  if (!ring.breached || ring.breachAngle === null) return false;
  return angleDistance(angle, ring.breachAngle) <= (ring.breachWidth || 0.42) + padding;
}

function angleBetween(angle, start, end) {
  if (start <= end) return angle >= start && angle <= end;
  return angle >= start || angle <= end;
}
