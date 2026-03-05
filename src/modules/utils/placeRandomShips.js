import { Ship } from "../classes/ship";

export function placeRandomShips(gameboard){
    const shipLengths = [5, 4, 3, 3, 2];

    shipLengths.forEach(length => {
        let placed = false;

        while(!placed){
            const direction = Math.random() > 0.5 ? "horizontal" : "vertical";
            const x = Math.floor(Math.random() * 10);
            const y = Math.floor(Math.random() * 10);

            const ship = new Ship(length);

            try{
                gameboard.placeShip(ship, [x, y], direction);
                placed = true;
            } catch(error){
                placed = false;
            }
        }
    });
}