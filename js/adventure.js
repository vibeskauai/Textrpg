// Adventure and random event logic
import { player, game } from './game-state.js';
import { renderStats } from './ui.js';

export function randomEvent(flashLog) {
  const events = [
    () => {
      const gold = (5 + (Math.random()*6|0)) * game.multiplier;
      const gain = Math.floor(gold);
      player.gold += gain;
      flashLog(`You find a hidden stash. +${gain} gold.`, 'good');
    },
    () => {
      const dmg = 5 + (Math.random()*6|0);
      player.hp = Math.max(player.hp - dmg, 0);
      flashLog(`A snare trap snaps your leg! -${dmg} HP.`, 'bad');
    },
    () => {
      const heal = 10 + (Math.random()*6|0);
      player.hp = Math.min(player.hp + heal, player.maxHp);
      flashLog(`A wayside shrine soothes your wounds. +${heal} HP.`, 'good');
    },
    () => {
      flashLog('A shimmering portal appears. You step through and feel time shift.', 'info');
      player.xp += 5;
    },
    () => {
      const dmg = 8 + (Math.random()*4|0);
      player.hp = Math.max(player.hp - dmg, 0);
      flashLog('A treasure chest bites you! It was a mimic. -'+dmg+' HP.', 'bad');
    },
    () => {
      const gold = 10;
      if(player.gold>=gold){
        player.gold -= gold;
        player.inventory[0].count += 1;
        flashLog('A wandering merchant sells you a health potion for 10 gold.', 'info');
      } else {
        flashLog('A merchant offers a potion, but you lack the gold.', 'muted');
      }
    },
    () => {
      player.spellPower += 1;
      flashLog('You discover an ancient rune. Spell Power +1.', 'good');
    },
    () => {
      const dmg = 12;
      player.hp = Math.max(player.hp - dmg, 0);
      flashLog('You fall into a pit! -'+dmg+' HP.', 'bad');
    },
    () => {
      player.buffs.strength += 2;
      flashLog('A passing cleric blesses you. Strength buff +2 turns.', 'good');
    },
    () => {
      player.buffs.shield = 0;
      flashLog('You touch a cursed idol. Your shield buff is removed!', 'bad');
    },
    () => {
      flashLog('A sphinx asks you a riddle. You ponder, but gain wisdom. XP +3.', 'info');
      player.xp += 3;
    },
    () => {
      player.mana = Math.min(player.mana + 4, player.maxMana);
      flashLog('A surge of magic restores 4 mana.', 'good');
    },
    () => {
      player.xp += 2;
      flashLog('You find a lost map. XP +2.', 'info');
    },
    () => {
      const dmg = 7;
      player.hp = Math.max(player.hp - dmg, 0);
      flashLog('A cloud of poison gas envelops you. -'+dmg+' HP.', 'bad');
    },
    () => {
      player.gold += 5;
      flashLog('You find a lucky coin. +5 gold.', 'good');
    },
    () => {
      player.hp = Math.min(player.hp + 8, player.maxHp);
      flashLog('You drink from an enchanted spring. +8 HP.', 'good');
    },
    () => {
      player.gold = Math.max(0, player.gold-3);
      flashLog('A goblin steals 3 gold from your pouch.', 'bad');
    },
    () => {
      flashLog('A mysterious fog confuses you. Nothing happens.', 'muted');
    },
  ];
  const event = events[Math.floor(Math.random()*events.length)];
  event();
  renderStats(player, game, document.getElementById('stats'));
}
