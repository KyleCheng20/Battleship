import { Gameboard } from "../modules/classes/gameBoard.js";
import { Ship } from "../modules/classes/ship.js";

describe("Placing ships", () => {
    test("Returns ship placed horizontally of length 3", () => {
        const ship = new Ship(3);
        const gameboard = new Gameboard();

        gameboard.placeShip(ship, [0, 0], 'horizontal');

        expect(gameboard.getShip([0, 0])).toBe(ship);
        expect(gameboard.getShip([0, 1])).toBe(ship);
        expect(gameboard.getShip([0, 2])).toBe(ship);
    });

    test("Returns ship placed vertically of length 2", () => {
        const ship = new Ship(2);
        const gameboard = new Gameboard();

        gameboard.placeShip(ship, [0, 0], 'vertical');

        expect(gameboard.getShip([0, 0])).toBe(ship);
        expect(gameboard.getShip([1, 0])).toBe(ship);
    });

    test("Returns undefined if getting ship on empty spot", () => {
        const ship = new Ship(2);
        const gameboard = new Gameboard();

        gameboard.placeShip(ship, [0, 0], 'vertical');

        expect(gameboard.getShip([2, 2])).toBe(undefined);
    });
});