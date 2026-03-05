import { Game } from "../modules/classes/game";
import { Ship } from "../modules/classes/ship";
import { HumanPlayer } from "../modules/classes/humanPlayer";
import { CPUPlayer } from "../modules/classes/cpuPlayer";


describe("Switch player turn", () => {
    test("Current player to start the game should be player1", () => {
        const player1 = new HumanPlayer('P1');
        const player2 = new CPUPlayer('CPU1');
        const game = new Game(player1, player2);

        expect(game.currentPlayer).toBe(player1);
    });

    test("Successfully switch player turns", () => {
        const player1 = new HumanPlayer('P1');
        const player2 = new CPUPlayer('CPU1');
        const game = new Game(player1, player2);

        game.switchTurn();
        expect(game.currentPlayer).toBe(player2);
    });
});

describe("playTurn(coordinate) method", () => {
    test("Successfully switches turn if missed attack", () => {
        const player1 = new HumanPlayer('P1');
        const player2 = new CPUPlayer('CPU1');
        const game = new Game(player1, player2);

        const ship = new Ship(3);
        player2.gameboard.placeShip(ship, [0, 0], 'horizontal');

        game.playTurn([1, 1]);

        expect(ship.hitCount).toBe(0);
        expect(game.currentPlayer).toBe(player2);
    });

    test("Does not switch turn if player successfully hits opponent ship", () => {
        const player1 = new HumanPlayer('P1');
        const player2 = new CPUPlayer('CPU1');
        const game = new Game(player1, player2);

        const ship = new Ship(3);
        player2.gameboard.placeShip(ship, [0, 0], 'horizontal');

        game.playTurn([0, 1]);

        expect(ship.hitCount).toBe(1);
        expect(game.currentPlayer).toBe(player1);
    });
});

describe("isGameOver() method", () => {
    test("Return true if all of player1 ships have been sunk", () => {
        const player1 = new HumanPlayer('P1');
        const player2 = new HumanPlayer('P2');
        const game = new Game(player1, player2);

        const p1Ship = new Ship(2);
        const p2Ship = new Ship(4);

        player1.gameboard.placeShip(p1Ship, [0, 0], 'horizontal');
        player2.gameboard.placeShip(p2Ship, [1, 0], 'horizontal');

        game.playTurn([0, 0]);    //P1 turn, miss
        game.playTurn([0, 0]);    //P2 turn, hit
        game.playTurn([0, 1]);    //P2 turn, hit, sinks P1 ship

        expect(game.isGameOver()).toBe(true);
    });
});