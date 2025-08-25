// UI helpers for Textrpg
export function renderStats(player, game, elStats) {
  const buffBits = [];
  if(player.buffs.strength>0) buffBits.push(`<span class='info'>STR:+5(${player.buffs.strength})</span>`);
  if(player.buffs.shield>0)   buffBits.push(`<span class='info'>SHIELD(${player.buffs.shield})</span>`);
  const buffTxt = buffBits.length? ` | Buffs: ${buffBits.join(' ')}`:'';
  elStats.innerHTML =
    `<span class='good'>HP: ${player.hp}/${player.maxHp}</span> | `+
    `<span class='bad'>DMG: ${player.baseDamage + (player.buffs.strength>0 ? 5 : 0)}</span> | `+
    `<span class='accent'>Gold: ${player.gold}</span> | `+
    `<span class='info'>XP: ${player.xp}</span> | `+
    `<span class='muted'>LV: ${player.level}</span> | `+
    `<span style='color:purple'>Mana: ${player.mana}/${player.maxMana}</span> | `+
    `<span class='accent'>Mult: x${game.multiplier.toFixed(1)}</span>${buffTxt}`;
}

export function renderEnemy(enemy, game, elEnemy) {
  if(game.inBattle && enemy){
    elEnemy.textContent = `Enemy: ${enemy.name} — HP: ${Math.max(enemy.hp,0)}`;
  } else {
    elEnemy.textContent = '';
  }
}

export function setControls(elControls, ...buttons) {
  elControls.innerHTML = '';
  buttons.forEach(b=>elControls.appendChild(b));
}

export function btn(label, onclick, opts={}) {
  const b = document.createElement('button');
  b.textContent = label;
  if (opts.className) b.className = opts.className;
  if (opts.colorClass) b.classList.add(opts.colorClass);
  b.onclick = onclick;
  return b;
}
