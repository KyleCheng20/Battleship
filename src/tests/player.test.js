import { Ship } from "../modules/classes/ship";
import { HumanPlayer } from "../modules/classes/humanPlayer";
import { CPUPlayer } from "../modules/classes/cpuPlayer";

describe("Human player attacks", () => {
    test("Human player can attack opponent board", () => {
    const player1 = new HumanPlayer("P1");
    const player2 = new HumanPlayer("P2");

    const ship = new Ship(2);
    player2.gameboard.placeShip(ship, [0,0], "horizontal");

    player1.attack(player2, [0,0]);

    expect(ship.hitCount).toBe(1);
    });
});

describe("CPU player attacks", () => {
    test("CPU player can attack opponent board", () => {
        const player1 = new HumanPlayer("P1");
        const cpuPlayer = new CPUPlayer("CPU");

        const ship = new Ship(2);
        player1.gameboard.placeShip(ship, [0,0], "horizontal");

        cpuPlayer.attack(player1);

        expect(cpuPlayer.previousAttacks.size).toBe(1);
    });
});
