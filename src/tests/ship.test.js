import { Ship } from "../modules/classes/ship.js";

describe("Create new ships", () => {
    const ship1 = new Ship(2);
    const ship2 = new Ship(4);

    test("Correct ship length", () => {
        expect(ship1.length).toEqual(2);
        expect(ship2.length).toEqual(4);
    });
});

describe("Correct hit count", () => {
    test("Expect 0 hits", () => {
        const ship1 = new Ship(3);

        expect(ship1.hitCount).toEqual(0);
    });

    test("Expect 1 hit", () => {
        const ship1 = new Ship(3);

        ship1.hit();

        expect(ship1.hitCount).toEqual(1);
    });

    test("Expect 2 hits", () => {
        const ship1 = new Ship(3);

        ship1.hit();
        ship1.hit();

        expect(ship1.hitCount).toEqual(2);
    });

    test("Hit different ship 3 times", () => {
        const ship2 = new Ship(4);

        ship2.hit();
        ship2.hit();
        ship2.hit();

        expect(ship2.hitCount).toEqual(3);
    });

    test("Don't allow more hits on a ship that has sunk", () => {
        const ship3 = new Ship(2);

        ship3.hit();
        ship3.hit();
        ship3.hit();

        expect(ship3.hitCount).toEqual(2);
    });
});

describe("Correct sunk state", () => {
    test("Expect not sunk on a ship that has not been hit", () => {
        const ship1 = new Ship(3);

        expect(ship1.isSunk()).toBe(false);
    });

    test("Expect not sunk on a ship that has been hit but hasn't fully sunk", () => {
        const ship1 = new Ship(3);

        ship1.hit();
        ship1.hit();

        expect(ship1.isSunk()).toBe(false);
    });

    test("Expect sunk on a ship that has been hit the exact amount of times as it's length", () => {
        const ship2 = new Ship(2);

        ship2.hit();
        ship2.hit();

        expect(ship2.isSunk()).toBe(true);
    });

    test("Expect sunk on a ship that has been hit more times than it's length", () => {
        const ship3 = new Ship(2);

        ship3.hit();
        ship3.hit();
        ship3.hit();

        expect(ship3.isSunk()).toBe(true);
    });
});