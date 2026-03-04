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

describe("receiveAttack(coordinates) method", () => {
    test("Correctly attacks a ship on a board space", () => {
        const ship = new Ship(3);
        const gameboard = new Gameboard();

        gameboard.placeShip(ship, [0, 0], 'horizontal');
        gameboard.receiveAttack([0, 1]);

        expect(ship.hitCount).toEqual(1);
    });

    test("Ignore attacks on the same coordinate", () => {
        const ship = new Ship(3);
        const gameboard = new Gameboard();

        gameboard.placeShip(ship, [0, 0], 'horizontal');
        gameboard.receiveAttack([0, 1]);
        gameboard.receiveAttack([0, 1]);

        expect(ship.hitCount).toEqual(1);
    });

    test("Records missed attacks", () => {
        const ship = new Ship(3);
        const gameboard = new Gameboard();

        gameboard.placeShip(ship, [0, 0], 'horizontal');
        gameboard.receiveAttack([5, 2]);
        gameboard.receiveAttack([2, 7]);

        expect(gameboard.missedAttacks).toEqual(['5,2', '2,7']);
    });

    
});