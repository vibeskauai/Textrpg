// Main entry point for Textrpg
import { game, player, saveGame, loadGame } from './game-state.js';
import { renderStats, renderEnemy, setControls, btn } from './ui.js';
import { randomEvent } from './adventure.js';

// Example usage: load game state if available
if(loadGame()) {
  renderStats(player, game, document.getElementById('stats'));
} else {
  renderStats(player, game, document.getElementById('stats'));
}

// Add save/load buttons to UI for demonstration
const elControls = document.getElementById('controls');
setControls(elControls,
  btn('Save Game', () => { saveGame(); alert('Game saved!'); }),
  btn('Load Game', () => { loadGame(); renderStats(player, game, document.getElementById('stats')); alert('Game loaded!'); })
);
