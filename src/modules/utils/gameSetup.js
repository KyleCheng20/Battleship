import { Game } from "../classes/game";
import { HumanPlayer } from "../classes/humanPlayer";
import { CPUPlayer } from "../classes/cpuPlayer";
import { placeRandomShips } from "./placeRandomShips";

export function startGame(){
    const player = new HumanPlayer("Player 1");
    const cpu = new CPUPlayer("CPU");

    placeRandomShips(player.gameboard);
    placeRandomShips(cpu.gameboard);

    const game = new Game(player, cpu);

    return game;
} 