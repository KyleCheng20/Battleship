import { Player } from "../modules/classes/player";
import { Ship } from "../modules/classes/ship";

describe("Player attacks", () => {
    test("Player can attack opponent board", () => {
    const player1 = new Player("P1", "human");
    const player2 = new Player("CPU1", "cpu");

    const ship = new Ship(2);
    player2.gameboard.placeShip(ship, [0,0], "horizontal");

    player1.attack(player2, [0,0]);

    expect(ship.hitCount).toBe(1);
    });
});