// src/render/ansi.ts
var EMPTY = { char: " ", fg: 252, bg: 233 };
function fgCode(color) {
  if (color >= 0 && color <= 7) return `\x1B[3${color}m`;
  if (color >= 8 && color <= 15) return `\x1B[9${color - 8}m`;
  return `\x1B[38;5;${color}m`;
}
function bgCode(color) {
  if (color >= 0 && color <= 7) return `\x1B[4${color}m`;
  if (color >= 8 && color <= 15) return `\x1B[10${color - 8}m`;
  return `\x1B[48;5;${color}m`;
}
function styleFor(cell, prev) {
  if (prev && prev.fg === cell.fg && prev.bg === cell.bg && !!prev.bold === !!cell.bold) {
    return "";
  }
  const parts = ["\x1B[0m"];
  if (cell.bold) parts.push("\x1B[1m");
  parts.push(fgCode(cell.fg), bgCode(cell.bg));
  return parts.join("");
}
function marginCell(x, y, frameTime) {
  const star = (x * 31 + y * 17 + Math.floor(frameTime * 0.02)) % 97 === 0;
  if (star) {
    return { char: "*", fg: 240, bg: 233 };
  }
  if ((x + y) % 11 === 0) {
    return { char: ".", fg: 236, bg: 233 };
  }
  return { char: " ", fg: 252, bg: 233 };
}
function cellAt(termX, termY, viewportCells, viewportWidth, viewportHeight, offsetX, offsetY, frameTime) {
  const localX = termX - offsetX;
  const localY = termY - offsetY;
  if (localX >= 0 && localX < viewportWidth && localY >= 0 && localY < viewportHeight) {
    return viewportCells[localY * viewportWidth + localX] ?? EMPTY;
  }
  return marginCell(termX, termY, frameTime);
}
function composeFrame(viewportCells, viewportWidth, viewportHeight, termCols, termRows, frameTime) {
  const offsetX = Math.max(0, Math.floor((termCols - viewportWidth) / 2));
  const offsetY = Math.max(0, Math.floor((termRows - viewportHeight) / 2));
  const chunks = [];
  for (let ty = 0; ty < termRows; ty++) {
    chunks.push(`\x1B[${ty + 1};1H`);
    let prev = null;
    for (let tx = 0; tx < termCols; tx++) {
      const cell = cellAt(
        tx,
        ty,
        viewportCells,
        viewportWidth,
        viewportHeight,
        offsetX,
        offsetY,
        frameTime
      );
      chunks.push(styleFor(cell, prev));
      chunks.push(cell.char);
      prev = cell;
    }
  }
  chunks.push("\x1B[0m");
  return chunks.join("");
}

// src/core/config/themes.ts
var themes = {
  club: {
    name: "club",
    background: 233,
    border: 201,
    borderAccent: 213,
    playfieldBg: 235,
    playfieldStars: 240,
    hudBg: 236,
    hudText: 252,
    hudAccent: 213,
    player: 51,
    playerBullet: 226,
    enemy: 203,
    enemyAccent: 199,
    powerUp: 82,
    explosion: 208,
    title: 213,
    subtitle: 252,
    danger: 196
  },
  retro: {
    name: "retro",
    background: 16,
    border: 46,
    borderAccent: 82,
    playfieldBg: 234,
    playfieldStars: 22,
    hudBg: 235,
    hudText: 46,
    hudAccent: 82,
    player: 46,
    playerBullet: 226,
    enemy: 196,
    enemyAccent: 160,
    powerUp: 51,
    explosion: 208,
    title: 46,
    subtitle: 250,
    danger: 196
  },
  neon: {
    name: "neon",
    background: 17,
    border: 45,
    borderAccent: 51,
    playfieldBg: 18,
    playfieldStars: 25,
    hudBg: 17,
    hudText: 51,
    hudAccent: 45,
    player: 51,
    playerBullet: 231,
    enemy: 201,
    enemyAccent: 213,
    powerUp: 46,
    explosion: 214,
    title: 45,
    subtitle: 255,
    danger: 203
  }
};
function getTheme(name) {
  return themes[name ?? "club"] ?? themes.club;
}
var DEFAULT_THEME = "club";

// src/core/systems/input.ts
function normalizeKey(raw) {
  switch (raw) {
    case "\x1B[D":
      return "ArrowLeft";
    case "\x1B[C":
      return "ArrowRight";
    case " ":
      return "Space";
    case "a":
    case "A":
      return "KeyA";
    case "d":
    case "D":
      return "KeyD";
    case "p":
    case "P":
      return "KeyP";
    case "q":
    case "Q":
      return "KeyQ";
    case "":
      return "ControlC";
    case "\r":
    case "\n":
      return "Enter";
    default:
      return null;
  }
}
function parseInputChunk(data, type = "keydown") {
  const events = [];
  if (data.length > 1 && data.startsWith("\x1B")) {
    const key = normalizeKey(data);
    if (key) events.push({ type, key, raw: data });
    return events;
  }
  for (const char of data) {
    const key = normalizeKey(char);
    if (key) events.push({ type, key, raw: char });
  }
  return events;
}
var InputSource = class {
  holdMs;
  heldUntil = /* @__PURE__ */ new Map();
  queue = [];
  listeners = /* @__PURE__ */ new Set();
  constructor(options = {}) {
    this.holdMs = options.holdMs ?? 120;
  }
  on(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
  push(data, time, type = "keydown") {
    for (const event of parseInputChunk(data, type)) {
      this.queue.push(event);
      if (event.type === "keydown") {
        this.heldUntil.set(event.key, time + this.holdMs);
      } else {
        this.heldUntil.delete(event.key);
      }
      for (const listener of this.listeners) listener(event);
    }
  }
  poll() {
    const events = this.queue;
    this.queue = [];
    return events;
  }
  isHeld(key, time) {
    return (this.heldUntil.get(key) ?? 0) > time;
  }
  clearHold(key) {
    this.heldUntil.delete(key);
  }
  extendHold(key, time) {
    this.heldUntil.set(key, time + this.holdMs);
  }
};

// src/core/config/levels.ts
var EnemyMovementTypes = {
  DUNCE: "DUNCE",
  FOLLOWER: "FOLLOWER",
  SNEK: "SNEK"
};
var levelConfigs = [
  {
    level: 1,
    killsToAdvance: 50,
    winBonus: 360,
    spawnIntervalMs: 850,
    scrollSpeed: 1.4,
    enemyWeights: {
      DUNCE: 0.7,
      FOLLOWER: 0.2,
      SNEK: 0.1
    }
  },
  {
    level: 2,
    killsToAdvance: Infinity,
    winBonus: 720,
    spawnIntervalMs: 550,
    scrollSpeed: 2,
    enemyWeights: {
      DUNCE: 0.4,
      FOLLOWER: 0.35,
      SNEK: 0.25
    }
  }
];
function getLevelConfig(levelIndex) {
  return levelConfigs[Math.min(levelIndex, levelConfigs.length - 1)];
}

// src/render/sprites/explosion.ascii
var explosion_default = "# explosion animation \u2014 frames separated by --- frame ---\n--- frame ---\n * \n* *\n * \n--- frame ---\n\\|/\n-+-\n/|\\\n--- frame ---\n___\n . \n___\n";

// src/render/sprites/player.ascii
var player_default = "# player ship\n /\\ \n/  \\\n\\__/\n";

// src/render/sprites/powerups/life.ascii
var life_default = "<3\n";

// src/render/sprites/powerups/pill.ascii
var pill_default = "=+\n";

// src/render/sprites/powerups/pizza.ascii
var pizza_default = "@>\n";

// src/render/sprites/powerups/shield.ascii
var shield_default = "(O)\n";

// src/render/sprites/tv-small.ascii
var tv_small_default = "# small TV (unused placeholder)\n[]\n/\\\n";

// src/render/sprites/tv.ascii
var tv_default = "# enemy TV\n+--+\n|[]|\n\\__/\n ^ \n";

// src/render/parseAscii.ts
function stripComments(text) {
  return text.split("\n").map((line) => line.replace(/\r$/, "")).filter((line) => !line.startsWith("#"));
}
function normalizeLine(line) {
  if (/^_+$/.test(line)) {
    return " ".repeat(line.length);
  }
  return line;
}
function parseSprite(text) {
  const lines = stripComments(text);
  const trimmed = lines.join("\n").replace(/\n+$/, "");
  if (!trimmed) return [];
  return trimmed.split("\n").map(normalizeLine);
}
function parseAnimation(text) {
  const blocks = text.split(/^---\s*frame\s*---\s*$/im).map((block) => block.replace(/^\n+/, "").replace(/\n+$/, "")).filter((block) => block.trim().length > 0);
  if (blocks.length === 0) {
    const sprite = parseSprite(text);
    return sprite.length > 0 ? [sprite] : [];
  }
  return blocks.map(parseSprite).filter((sprite) => sprite.length > 0);
}

// src/render/sprites.ts
var PLAYER_SPRITE = parseSprite(player_default);
var TV_SPRITE = parseSprite(tv_default);
var TV_SPRITE_SMALL = parseSprite(tv_small_default);
var BULLET_CHAR = "|";
var EXPLOSION_FRAMES = parseAnimation(explosion_default);
var POWERUP_SPRITES = {
  shield: parseSprite(shield_default),
  pizza: parseSprite(pizza_default),
  pill: parseSprite(pill_default),
  life: parseSprite(life_default)
};
function getSpriteSize(lines) {
  return {
    w: Math.max(...lines.map((line) => line.length)),
    h: lines.length
  };
}
var PLAYER_SIZE = getSpriteSize(PLAYER_SPRITE);
var TV_SIZE = getSpriteSize(TV_SPRITE);

// src/core/types.ts
function rectsOverlap(a, b) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}
var nextId = 1;
function createId() {
  return nextId++;
}
function resetIds() {
  nextId = 1;
}

// src/core/entities/Enemy.ts
function createEnemy(x, y, movementType) {
  return {
    id: createId(),
    dead: false,
    x,
    y,
    w: TV_SIZE.w,
    h: TV_SIZE.h,
    vx: 0,
    vy: 0.8,
    movementType,
    sinePhase: Math.random() * Math.PI * 2,
    hp: 1
  };
}
function updateEnemy(enemy, dt, scrollSpeed, playerX, _playerY, playfieldWidth) {
  enemy.y += (enemy.vy + scrollSpeed) * dt;
  switch (enemy.movementType) {
    case "DUNCE":
      break;
    case "FOLLOWER": {
      const dx = playerX - enemy.x;
      enemy.x += Math.sign(dx) * Math.min(Math.abs(dx), 14 * dt);
      break;
    }
    case "SNEK": {
      enemy.sinePhase += dt * 4;
      enemy.x += Math.sin(enemy.sinePhase) * 18 * dt;
      break;
    }
  }
  enemy.x = Math.max(0, Math.min(playfieldWidth - enemy.w, enemy.x));
}

// src/core/entities/Explosion.ts
function createExplosion(x, y) {
  return {
    id: createId(),
    dead: false,
    x,
    y,
    frame: 0,
    maxFrames: 3
  };
}
function updateExplosion(explosion, dt) {
  explosion.frame += dt * 12;
  if (explosion.frame >= explosion.maxFrames) {
    explosion.dead = true;
  }
}

// src/core/entities/PowerUp.ts
var POWERUP_TYPES = Object.keys(POWERUP_SPRITES);
function randomPowerUpType() {
  return POWERUP_TYPES[Math.floor(Math.random() * POWERUP_TYPES.length)];
}
function createPowerUp(x, y, type) {
  const size = getSpriteSize(POWERUP_SPRITES[type]);
  return {
    id: createId(),
    dead: false,
    x,
    y,
    w: size.w,
    h: size.h,
    type,
    vy: 0.6
  };
}
function updatePowerUp(powerUp, dt, scrollSpeed) {
  powerUp.y += (powerUp.vy + scrollSpeed * 0.5) * dt;
}
function applyPowerUp(type, player, now) {
  switch (type) {
    case "shield":
      player.shieldUntil = now + 8e3;
      break;
    case "pizza":
      player.invincibleUntil = now + 4e3;
      break;
    case "pill":
      player.fireCooldown = 0;
      break;
    case "life":
      player.lives += 1;
      break;
  }
}

// src/render/types.ts
var ANSI = {
  reset: "\x1B[0m",
  hideCursor: "\x1B[?25l",
  showCursor: "\x1B[?25h",
  altScreenEnter: "\x1B[?1049h",
  altScreenExit: "\x1B[?1049l",
  home: "\x1B[H",
  clear: "\x1B[2J"
};
var VIEWPORT_WIDTH = 80;
var VIEWPORT_HEIGHT = 40;
var PLAYFIELD_X = 2;
var PLAYFIELD_Y = 1;
var PLAYFIELD_WIDTH = 76;
var PLAYFIELD_HEIGHT = 34;
var HUD_X = 2;
var HUD_Y = 36;
var HUD_WIDTH = 76;
var HUD_HEIGHT = 4;

// src/core/entities/Player.ts
var PLAYER_SPEED = 30;
var FIRE_COOLDOWN_MS = 110;
function createPlayer(lives = 3) {
  return {
    id: createId(),
    dead: false,
    x: PLAYFIELD_WIDTH / 2 - PLAYER_SIZE.w / 2,
    y: PLAYFIELD_HEIGHT - PLAYER_SIZE.h - 1,
    w: PLAYER_SIZE.w,
    h: PLAYER_SIZE.h,
    lives,
    invincibleUntil: 0,
    shieldUntil: 0,
    fireCooldown: 0
  };
}
function updatePlayer(player, actions, dt, now) {
  if (actions.moveLeft) player.x -= PLAYER_SPEED * dt;
  if (actions.moveRight) player.x += PLAYER_SPEED * dt;
  player.x = Math.max(0, Math.min(PLAYFIELD_WIDTH - player.w, player.x));
  if (player.fireCooldown > 0) {
    player.fireCooldown -= dt * 1e3;
  }
  if (actions.fire && player.fireCooldown <= 0) {
    player.fireCooldown = FIRE_COOLDOWN_MS;
    player.lastShot = now;
  }
}
function playerWantsToShoot(player, now) {
  return player.lastShot === now;
}
function damagePlayer(player, now) {
  if (now < player.invincibleUntil || now < player.shieldUntil) {
    return false;
  }
  player.lives -= 1;
  player.invincibleUntil = now + 2e3;
  if (player.lives <= 0) {
    player.dead = true;
  }
  return true;
}

// src/core/entities/Projectile.ts
function createProjectile(player) {
  return {
    id: createId(),
    dead: false,
    x: player.x + player.w / 2 - 0.5,
    y: player.y - 1,
    w: 1,
    h: 1,
    vy: -18
  };
}
function updateProjectile(projectile, dt) {
  projectile.y += projectile.vy * dt;
}

// src/core/World.ts
var World = class {
  phase = "menu";
  player = createPlayer();
  projectiles = [];
  enemies = [];
  powerUps = [];
  explosions = [];
  stats = { score: 0, kills: 0, levelIndex: 0, highScore: 0 };
  scrollOffset = 0;
  spawnTimer = 0;
  frameTime = 0;
  levelCompleteTimer = 0;
  get levelConfig() {
    return getLevelConfig(this.stats.levelIndex);
  }
  reset() {
    resetIds();
    this.player = createPlayer();
    this.projectiles = [];
    this.enemies = [];
    this.powerUps = [];
    this.explosions = [];
    this.stats.score = 0;
    this.stats.kills = 0;
    this.stats.levelIndex = 0;
    this.scrollOffset = 0;
    this.spawnTimer = 0;
    this.levelCompleteTimer = 0;
    this.phase = "playing";
  }
  startGame() {
    this.reset();
  }
  pickEnemyType() {
    const weights = this.levelConfig.enemyWeights;
    const roll = Math.random();
    let cumulative = 0;
    for (const type of Object.values(EnemyMovementTypes)) {
      cumulative += weights[type];
      if (roll <= cumulative) return type;
    }
    return EnemyMovementTypes.DUNCE;
  }
  spawnEnemy() {
    const type = this.pickEnemyType();
    const sideSpawn = Math.random() < 0.25;
    const x = sideSpawn ? Math.random() < 0.5 ? 0 : PLAYFIELD_WIDTH - 4 : Math.random() * (PLAYFIELD_WIDTH - 4);
    const y = sideSpawn ? Math.random() * (PLAYFIELD_HEIGHT * 0.4) : -4;
    this.enemies.push(createEnemy(x, y, type));
  }
  update(actions, dt, now) {
    this.frameTime = now;
    if (this.phase === "menu") {
      if (actions.confirm || actions.fire) this.startGame();
      return;
    }
    if (this.phase === "gameover") {
      if (actions.confirm || actions.fire) this.startGame();
      return;
    }
    if (this.phase === "levelcomplete") {
      this.levelCompleteTimer -= dt * 1e3;
      if (this.levelCompleteTimer <= 0 || actions.confirm || actions.fire) {
        this.stats.levelIndex += 1;
        this.spawnTimer = 0;
        this.phase = "playing";
      }
      return;
    }
    if (this.phase === "paused") {
      if (actions.pause || actions.confirm) this.phase = "playing";
      return;
    }
    if (actions.pause) {
      this.phase = "paused";
      return;
    }
    const config = this.levelConfig;
    this.scrollOffset += config.scrollSpeed * dt;
    updatePlayer(this.player, actions, dt, now);
    if (playerWantsToShoot(this.player, now)) {
      this.projectiles.push(createProjectile(this.player));
    }
    this.spawnTimer += dt * 1e3;
    if (this.spawnTimer >= config.spawnIntervalMs) {
      this.spawnTimer = 0;
      this.spawnEnemy();
    }
    for (const enemy of this.enemies) {
      updateEnemy(
        enemy,
        dt,
        config.scrollSpeed,
        this.player.x,
        this.player.y,
        PLAYFIELD_WIDTH
      );
    }
    for (const projectile of this.projectiles) {
      updateProjectile(projectile, dt);
    }
    for (const powerUp of this.powerUps) {
      updatePowerUp(powerUp, dt, config.scrollSpeed);
    }
    for (const explosion of this.explosions) {
      updateExplosion(explosion, dt);
    }
    this.handleCollisions(now);
    this.cleanup();
    if (this.player.dead) {
      this.phase = "gameover";
      this.stats.highScore = Math.max(this.stats.highScore, this.stats.score);
    } else if (this.stats.kills >= config.killsToAdvance && config.killsToAdvance !== Infinity) {
      this.stats.score += config.winBonus;
      this.phase = "levelcomplete";
      this.levelCompleteTimer = 3e3;
    }
  }
  handleCollisions(now) {
    for (const projectile of this.projectiles) {
      if (projectile.dead) continue;
      for (const enemy of this.enemies) {
        if (enemy.dead) continue;
        if (rectsOverlap(projectile, enemy)) {
          projectile.dead = true;
          enemy.hp -= 1;
          if (enemy.hp <= 0) {
            enemy.dead = true;
            this.stats.kills += 1;
            this.stats.score += 100;
            this.explosions.push(createExplosion(enemy.x, enemy.y));
            if (Math.random() < 0.12) {
              this.powerUps.push(createPowerUp(enemy.x, enemy.y, randomPowerUpType()));
            }
          }
          break;
        }
      }
    }
    for (const powerUp of this.powerUps) {
      if (powerUp.dead || this.player.dead) continue;
      if (rectsOverlap(powerUp, this.player)) {
        powerUp.dead = true;
        applyPowerUp(powerUp.type, this.player, now);
        this.stats.score += 50;
      }
    }
    if (now >= this.player.invincibleUntil) {
      for (const enemy of this.enemies) {
        if (enemy.dead) continue;
        if (rectsOverlap(enemy, this.player)) {
          if (damagePlayer(this.player, now)) {
            this.explosions.push(createExplosion(this.player.x, this.player.y));
          }
          enemy.dead = true;
          this.explosions.push(createExplosion(enemy.x, enemy.y));
        }
      }
    }
  }
  cleanup() {
    this.projectiles = this.projectiles.filter(
      (p) => !p.dead && p.y + p.h >= 0
    );
    this.enemies = this.enemies.filter(
      (e) => !e.dead && e.y < PLAYFIELD_HEIGHT + 2
    );
    this.powerUps = this.powerUps.filter(
      (p) => !p.dead && p.y < PLAYFIELD_HEIGHT + 2
    );
    this.explosions = this.explosions.filter((e) => !e.dead);
  }
};

// src/render/FrameBuffer.ts
var EMPTY_CELL = { char: " ", fg: 0, bg: 0 };
var FrameBuffer = class _FrameBuffer {
  width;
  height;
  cells;
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.cells = Array.from({ length: width * height }, () => ({ ...EMPTY_CELL }));
  }
  index(x, y) {
    return y * this.width + x;
  }
  get(x, y) {
    return this.cells[this.index(x, y)];
  }
  set(x, y, cell) {
    if (x < 0 || y < 0 || x >= this.width || y >= this.height) return;
    const idx = this.index(x, y);
    this.cells[idx] = { ...this.cells[idx], ...cell };
  }
  fill(char, fg, bg) {
    for (let i = 0; i < this.cells.length; i++) {
      this.cells[i] = { char, fg, bg };
    }
  }
  fillRect(x, y, w, h, char, fg, bg) {
    for (let row = y; row < y + h; row++) {
      for (let col = x; col < x + w; col++) {
        this.set(col, row, { char, fg, bg });
      }
    }
  }
  drawText(x, y, text, fg, bg, bold = false) {
    for (let i = 0; i < text.length; i++) {
      this.set(x + i, y, { char: text[i], fg, bg, bold });
    }
  }
  drawTextCentered(y, text, fg, bg, bold = false) {
    const x = Math.max(0, Math.floor((this.width - text.length) / 2));
    this.drawText(x, y, text, fg, bg, bold);
  }
  drawSprite(x, y, lines, fg, bg, transparentChar = " ") {
    for (let row = 0; row < lines.length; row++) {
      const line = lines[row];
      for (let col = 0; col < line.length; col++) {
        const char = line[col];
        if (char !== transparentChar) {
          this.set(x + col, y + row, { char, fg, bg });
        }
      }
    }
  }
  clone() {
    const copy = new _FrameBuffer(this.width, this.height);
    for (let i = 0; i < this.cells.length; i++) {
      copy.cells[i] = { ...this.cells[i] };
    }
    return copy;
  }
  forEach(callback) {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        callback(this.get(x, y), x, y);
      }
    }
  }
  getCells() {
    return this.cells;
  }
};

// src/render/layers.ts
function drawPlayfieldBackground(fb, world, theme) {
  fb.fillRect(
    PLAYFIELD_X,
    PLAYFIELD_Y,
    PLAYFIELD_WIDTH,
    PLAYFIELD_HEIGHT,
    " ",
    theme.playfieldStars,
    theme.playfieldBg
  );
  for (let y = 0; y < PLAYFIELD_HEIGHT; y++) {
    for (let x = 0; x < PLAYFIELD_WIDTH; x++) {
      const star = Math.floor(x * 13 + y * 7 + world.scrollOffset * 2) % 53 === 0;
      if (star) {
        fb.set(PLAYFIELD_X + x, PLAYFIELD_Y + y, {
          char: ".",
          fg: theme.playfieldStars,
          bg: theme.playfieldBg
        });
      }
    }
  }
  for (let x = 0; x < PLAYFIELD_WIDTH; x += 8) {
    const lane = Math.floor((x + world.scrollOffset * 4) / 8) % 3;
    const char = lane === 0 ? ":" : lane === 1 ? "|" : ":";
    fb.set(PLAYFIELD_X + x, PLAYFIELD_Y + PLAYFIELD_HEIGHT - 2, {
      char,
      fg: theme.borderAccent,
      bg: theme.playfieldBg
    });
  }
}
function drawBorder(fb, theme) {
  fb.fill(" ", theme.border, theme.background);
  for (let x = 0; x < VIEWPORT_WIDTH; x++) {
    fb.set(x, 0, { char: "\u2550", fg: theme.border, bg: theme.background, bold: true });
    fb.set(x, 35, { char: "\u2500", fg: theme.borderAccent, bg: theme.background });
    fb.set(x, VIEWPORT_HEIGHT - 1, {
      char: "\u2550",
      fg: theme.border,
      bg: theme.background,
      bold: true
    });
  }
  for (let y = 0; y < VIEWPORT_HEIGHT; y++) {
    fb.set(0, y, { char: "\u2551", fg: theme.border, bg: theme.background, bold: true });
    fb.set(1, y, { char: "\u2502", fg: theme.borderAccent, bg: theme.background });
    fb.set(VIEWPORT_WIDTH - 2, y, {
      char: "\u2502",
      fg: theme.borderAccent,
      bg: theme.background
    });
    fb.set(VIEWPORT_WIDTH - 1, y, {
      char: "\u2551",
      fg: theme.border,
      bg: theme.background,
      bold: true
    });
  }
  fb.drawText(3, 0, " DAMN TV ", theme.borderAccent, theme.background, true);
  fb.drawText(VIEWPORT_WIDTH - 12, 0, " TERMINAL ", theme.borderAccent, theme.background, true);
}
function drawEntities(fb, world, theme, now) {
  for (const enemy of world.enemies) {
    fb.drawSprite(
      PLAYFIELD_X + Math.floor(enemy.x),
      PLAYFIELD_Y + Math.floor(enemy.y),
      TV_SPRITE,
      theme.enemy,
      theme.playfieldBg
    );
  }
  for (const projectile of world.projectiles) {
    fb.set(PLAYFIELD_X + Math.floor(projectile.x), PLAYFIELD_Y + Math.floor(projectile.y), {
      char: BULLET_CHAR,
      fg: theme.playerBullet,
      bg: theme.playfieldBg,
      bold: true
    });
  }
  for (const powerUp of world.powerUps) {
    fb.drawSprite(
      PLAYFIELD_X + Math.floor(powerUp.x),
      PLAYFIELD_Y + Math.floor(powerUp.y),
      POWERUP_SPRITES[powerUp.type],
      theme.powerUp,
      theme.playfieldBg
    );
  }
  for (const explosion of world.explosions) {
    const frame = EXPLOSION_FRAMES[Math.min(
      Math.floor(explosion.frame),
      EXPLOSION_FRAMES.length - 1
    )];
    fb.drawSprite(
      PLAYFIELD_X + Math.floor(explosion.x),
      PLAYFIELD_Y + Math.floor(explosion.y),
      frame,
      theme.explosion,
      theme.playfieldBg
    );
  }
  const blink = now < world.player.invincibleUntil && Math.floor(now / 150) % 2 === 0;
  const hasShield = now < world.player.shieldUntil;
  if (!blink) {
    fb.drawSprite(
      PLAYFIELD_X + Math.floor(world.player.x),
      PLAYFIELD_Y + Math.floor(world.player.y),
      PLAYER_SPRITE,
      hasShield ? theme.hudAccent : theme.player,
      theme.playfieldBg
    );
  }
  if (hasShield) {
    fb.drawText(
      PLAYFIELD_X + Math.floor(world.player.x),
      PLAYFIELD_Y + Math.floor(world.player.y) - 1,
      "SHIELD",
      theme.hudAccent,
      theme.playfieldBg,
      true
    );
  }
}
function drawHud(fb, world, theme) {
  fb.fillRect(HUD_X, HUD_Y, HUD_WIDTH, HUD_HEIGHT, " ", theme.hudText, theme.hudBg);
  const config = world.levelConfig;
  const lives = "\u2665".repeat(Math.max(0, world.player.lives));
  const line1 = ` SCORE ${String(world.stats.score).padStart(8, "0")}   KILLS ${String(world.stats.kills).padStart(4, "0")}/${config.killsToAdvance === Infinity ? "\u221E" : config.killsToAdvance}   LEVEL ${config.level} `;
  const line2 = ` LIVES ${lives.padEnd(8, "\xB7")}   HI ${String(world.stats.highScore).padStart(8, "0")}   ARROWS MOVE \xB7 SPACE SHOOT \xB7 P PAUSE `;
  fb.drawText(HUD_X, HUD_Y, line1, theme.hudAccent, theme.hudBg, true);
  fb.drawText(HUD_X, HUD_Y + 1, line2, theme.hudText, theme.hudBg);
  const status = world.phase === "paused" ? "PAUSED" : world.phase === "levelcomplete" ? "LEVEL COMPLETE!" : world.player.dead ? "" : "KILL THE TVs! *";
  fb.drawText(HUD_X, HUD_Y + 2, status.padEnd(HUD_WIDTH - 2, " "), theme.hudAccent, theme.hudBg, true);
}
function drawMenu(fb, theme) {
  fb.drawTextCentered(10, "DAMN TV!", theme.title, theme.background, true);
  fb.drawTextCentered(12, "(the Terminal Game)", theme.subtitle, theme.background);
  fb.drawTextCentered(16, "Kill the TVs to survive.", theme.subtitle, theme.background);
  fb.drawTextCentered(18, "* You still cannot win a game with no end.", theme.borderAccent, theme.background);
  fb.drawTextCentered(22, "\u2190 \u2192 MOVE    SPACE SHOOT", theme.hudText, theme.background);
  fb.drawTextCentered(24, "PRESS ENTER TO START", theme.title, theme.background, true);
}
function drawGameOver(fb, world, theme) {
  fb.drawTextCentered(14, "GAME OVER", theme.danger, theme.background, true);
  fb.drawTextCentered(16, `SCORE: ${world.stats.score}`, theme.subtitle, theme.background);
  fb.drawTextCentered(18, `HIGH SCORE: ${world.stats.highScore}`, theme.title, theme.background);
  fb.drawTextCentered(22, "PRESS ENTER TO RETRY", theme.title, theme.background, true);
}
function drawPaused(fb, theme) {
  fb.drawTextCentered(16, "PAUSED", theme.title, theme.playfieldBg, true);
  fb.drawTextCentered(18, "PRESS P TO RESUME", theme.subtitle, theme.playfieldBg);
}
function renderWorld(fb, world, theme, now) {
  drawBorder(fb, theme);
  drawPlayfieldBackground(fb, world, theme);
  if (world.phase === "menu") {
    drawMenu(fb, theme);
    return;
  }
  drawEntities(fb, world, theme, now);
  drawHud(fb, world, theme);
  if (world.phase === "paused") drawPaused(fb, theme);
  if (world.phase === "gameover") drawGameOver(fb, world, theme);
  if (world.phase === "levelcomplete") {
    fb.drawTextCentered(
      PLAYFIELD_Y + 14,
      `LEVEL ${world.levelConfig.level} COMPLETE! +${world.levelConfig.winBonus}`,
      theme.title,
      theme.playfieldBg,
      true
    );
  }
}
function createViewportBuffer() {
  return new FrameBuffer(VIEWPORT_WIDTH, VIEWPORT_HEIGHT);
}

// src/game/actions.ts
function createDamnTvActions() {
  return {
    moveLeft: false,
    moveRight: false,
    fire: false,
    pause: false,
    quit: false,
    confirm: false
  };
}

// src/game/bindings.ts
var DAMN_TV_BINDINGS = {
  moveLeft: ["ArrowLeft", "KeyA"],
  moveRight: ["ArrowRight", "KeyD"],
  fire: ["Space"],
  pause: ["KeyP"],
  quit: ["KeyQ", "ControlC"],
  confirm: ["Enter"]
};
function isBoundHeld(source, time, action) {
  return DAMN_TV_BINDINGS[action].some((key) => source.isHeld(key, time));
}
function hadEdge(events, action) {
  return events.some(
    (event) => event.type === "keydown" && DAMN_TV_BINDINGS[action].includes(event.key)
  );
}
function applyHorizontalExclusive(source, events) {
  for (const event of events) {
    if (event.type !== "keydown") continue;
    if (DAMN_TV_BINDINGS.moveLeft.includes(event.key)) {
      for (const key of DAMN_TV_BINDINGS.moveRight) source.clearHold(key);
    }
    if (DAMN_TV_BINDINGS.moveRight.includes(event.key)) {
      for (const key of DAMN_TV_BINDINGS.moveLeft) source.clearHold(key);
    }
  }
}
function buildDamnTvActions(source, events, time) {
  applyHorizontalExclusive(source, events);
  const actions = createDamnTvActions();
  actions.moveLeft = isBoundHeld(source, time, "moveLeft");
  actions.moveRight = isBoundHeld(source, time, "moveRight");
  actions.fire = isBoundHeld(source, time, "fire");
  actions.pause = hadEdge(events, "pause");
  actions.quit = hadEdge(events, "quit");
  actions.confirm = hadEdge(events, "confirm");
  return actions;
}

// src/core/Game.ts
var Game = class {
  constructor(terminal, options = {}) {
    this.terminal = terminal;
    this.theme = getTheme(options.theme);
    this.targetFps = options.targetFps ?? 60;
    this.useAnimationFrame = typeof globalThis.requestAnimationFrame === "function";
  }
  terminal;
  world = new World();
  buffer = createViewportBuffer();
  theme;
  inputSource = new InputSource();
  actions = createDamnTvActions();
  running = false;
  paused = false;
  destroyed = false;
  lastTime = 0;
  rafId = null;
  unsubs = [];
  targetFps;
  useAnimationFrame;
  start() {
    this.terminal.enterAltScreen();
    this.terminal.hideCursor();
    this.terminal.write(ANSI.clear);
    this.unsubs.push(
      this.terminal.onInput((data) => this.handleInput(data)),
      this.terminal.onResize(() => this.render(this.lastTime || performance.now()))
    );
    this.running = true;
    this.lastTime = this.now();
    this.scheduleLoop();
    return this;
  }
  pause() {
    this.paused = true;
    if (this.world.phase === "playing") {
      this.world.phase = "paused";
    }
  }
  resume() {
    this.paused = false;
    if (this.world.phase === "paused") {
      this.world.phase = "playing";
    }
    this.lastTime = this.now();
  }
  destroy() {
    if (this.destroyed) return;
    this.destroyed = true;
    this.running = false;
    if (this.rafId !== null) {
      if (this.useAnimationFrame) {
        cancelAnimationFrame(this.rafId);
      } else {
        clearInterval(this.rafId);
      }
    }
    for (const unsub of this.unsubs) unsub();
    this.unsubs = [];
    this.terminal.showCursor();
    this.terminal.exitAltScreen();
    this.terminal.write(ANSI.reset + "\nThanks for playing Damn TV!\n");
    this.terminal.destroy();
  }
  now() {
    return typeof performance !== "undefined" ? performance.now() : Date.now();
  }
  scheduleLoop() {
    if (this.useAnimationFrame) {
      const tick = (time) => {
        if (!this.running) return;
        this.frame(time);
        this.rafId = requestAnimationFrame(tick);
      };
      this.rafId = requestAnimationFrame(tick);
    } else {
      this.rafId = setInterval(() => this.frame(this.now()), 1e3 / this.targetFps);
    }
  }
  frame(time) {
    const dt = Math.min((time - this.lastTime) / 1e3, 0.05);
    this.lastTime = time;
    const events = this.inputSource.poll();
    this.actions = buildDamnTvActions(this.inputSource, events, time);
    if (!this.paused) {
      this.world.update(this.actions, dt, time);
      if (this.actions.quit) {
        this.destroy();
        return;
      }
    }
    this.render(time);
  }
  handleInput(data) {
    this.inputSource.push(data, this.now());
  }
  render(time) {
    renderWorld(this.buffer, this.world, this.theme, time);
    const { cols, rows } = this.terminal.getSize();
    const output = composeFrame(
      this.buffer.getCells(),
      VIEWPORT_WIDTH,
      VIEWPORT_HEIGHT,
      cols,
      rows,
      time
    );
    this.terminal.write(output);
  }
};
function runGame(terminal, options) {
  return new Game(terminal, options).start();
}

// src/io/NodeTerminal.ts
function getStdoutSize() {
  const stdout = process.stdout;
  return {
    cols: stdout.columns ?? 80,
    rows: stdout.rows ?? 24
  };
}
var NodeTerminal = class {
  resizeCallbacks = /* @__PURE__ */ new Set();
  inputCallbacks = /* @__PURE__ */ new Set();
  inputBuffer = "";
  stdinListener = null;
  destroyed = false;
  constructor() {
    process.stdin.setEncoding("utf8");
  }
  write(data) {
    process.stdout.write(data);
  }
  getSize() {
    return getStdoutSize();
  }
  onResize(callback) {
    this.resizeCallbacks.add(callback);
    const handler = () => callback(getStdoutSize());
    process.stdout.on("resize", handler);
    return () => {
      this.resizeCallbacks.delete(callback);
      process.stdout.off("resize", handler);
    };
  }
  onInput(callback) {
    this.inputCallbacks.add(callback);
    if (!this.stdinListener) {
      this.stdinListener = (chunk) => {
        const str = chunk.toString("utf8");
        this.inputBuffer += str;
        while (this.inputBuffer.length > 0) {
          if (this.inputBuffer.startsWith("\x1B")) {
            const arrowMatch = /^\x1b\[[CD]/.exec(this.inputBuffer);
            if (arrowMatch) {
              this.emit(arrowMatch[0]);
              this.inputBuffer = this.inputBuffer.slice(arrowMatch[0].length);
              continue;
            }
            if (this.inputBuffer.length < 3) break;
          }
          this.emit(this.inputBuffer[0]);
          this.inputBuffer = this.inputBuffer.slice(1);
        }
      };
      process.stdin.on("data", this.stdinListener);
      process.stdin.resume();
    }
    return () => {
      this.inputCallbacks.delete(callback);
    };
  }
  emit(data) {
    for (const cb of this.inputCallbacks) cb(data);
  }
  enterAltScreen() {
    if (process.stdin.isTTY) process.stdin.setRawMode(true);
    this.write("\x1B[?1049h\x1B[?25l\x1B[2J\x1B[H");
  }
  exitAltScreen() {
    this.write("\x1B[?1049l\x1B[?25h");
    if (process.stdin.isTTY) process.stdin.setRawMode(false);
  }
  hideCursor() {
    this.write("\x1B[?25l");
  }
  showCursor() {
    this.write("\x1B[?25h");
  }
  destroy() {
    if (this.destroyed) return;
    this.destroyed = true;
    if (this.stdinListener) {
      process.stdin.off("data", this.stdinListener);
      process.stdin.pause();
    }
    this.inputCallbacks.clear();
    this.resizeCallbacks.clear();
  }
};
function createNodeTerminal() {
  return new NodeTerminal();
}

// src/io/XtermTerminal.ts
var XtermTerminal = class {
  constructor(terminal) {
    this.terminal = terminal;
  }
  terminal;
  dataDisposable = null;
  resizeDisposable = null;
  destroyed = false;
  write(data) {
    this.terminal.write(data);
  }
  getSize() {
    return { cols: this.terminal.cols, rows: this.terminal.rows };
  }
  onResize(callback) {
    this.resizeDisposable = this.terminal.onResize(({ cols, rows }) => {
      callback({ cols, rows });
    });
    return () => this.resizeDisposable?.dispose();
  }
  onInput(callback) {
    this.dataDisposable = this.terminal.onData(callback);
    return () => this.dataDisposable?.dispose();
  }
  enterAltScreen() {
    this.terminal.options.cursorBlink = false;
    this.write("\x1B[?1049h\x1B[?25l\x1B[2J\x1B[H");
  }
  exitAltScreen() {
    this.write("\x1B[?1049l\x1B[?25h");
    this.terminal.options.cursorBlink = true;
  }
  hideCursor() {
    this.write("\x1B[?25l");
  }
  showCursor() {
    this.write("\x1B[?25h");
  }
  destroy() {
    if (this.destroyed) return;
    this.destroyed = true;
    this.dataDisposable?.dispose();
    this.resizeDisposable?.dispose();
  }
};
export {
  DEFAULT_THEME,
  InputSource,
  NodeTerminal,
  PLAYFIELD_HEIGHT,
  PLAYFIELD_WIDTH,
  VIEWPORT_HEIGHT,
  VIEWPORT_WIDTH,
  XtermTerminal,
  createNodeTerminal,
  getTheme,
  runGame,
  themes
};
//# sourceMappingURL=index.js.map