// Game state and save/load logic
export const game = {
  streak: 0,
  get multiplier(){ return (1 + this.streak * 0.2); },
  inBattle: false,
  pendingTurn: false
};

export const player = {
  hp: 30, maxHp: 30, baseDamage: 5, spellPower: 0,
  xp: 0, gold: 10, level: 1, skillPoints: 0,
  blocked: false, mana: 12, maxMana: 12,
  buffs: { strength: 0, shield: 0 },
  meleeSkills: [
    { name:"Quick Slash", threshold:8, mult:0.8, desc:"You whip your sword in a quick arc." },
    { name:"Precise Stab", threshold:10, mult:1.0, desc:"You lunge for a precise opening." },
    { name:"Heavy Strike", threshold:12, mult:1.5, desc:"You heave a brutal overhand swing." }
  ],
  inventory: [
    { name:"Health Potion", type:"heal", value:25, count:2, desc:"+25 HP" },
    { name:"Strength Potion",type:"buff", key:"strength", value:3, count:1, desc:"+5 DMG for 3 turns" },
    { name:"Shield Potion", type:"buff", key:"shield", value:3, count:1, desc:"Half damage for 3 turns" },
    { name:"Mana Potion", type:"mana", value:6, count:1, desc:"+6 mana" }
  ]
};

export function saveGame() {
  const state = {
    game: { ...game },
    player: JSON.parse(JSON.stringify(player))
  };
  localStorage.setItem('textrpg-save', JSON.stringify(state));
}

export function loadGame() {
  const state = JSON.parse(localStorage.getItem('textrpg-save'));
  if(state) {
    Object.assign(game, state.game);
    Object.assign(player, state.player);
    return true;
  }
  return false;
}
