export class Gameboard {
    constructor(){
        this.board = {};    // Stores dictionary maps of coordinates as key, ships as value
        this.ships = [];
        this.missedAttacks = [];
        this.hitAttacks = [];
    }

    placeShip(ship, startCoord, direction){
        const [x, y] = startCoord;

        this.ships.push(ship);

        if(direction === 'horizontal'){
            for(let i = 0; i < ship.length; i++){
                let shipCoords = `${x},${y + i}`;
                this.board[shipCoords] = ship;
            }
        } else if(direction === 'vertical'){
            for(let i = 0; i <  ship.length; i++){
                let shipCoords = `${x + i},${y}`;
                this.board[shipCoords] = ship;
            }
        }
    }

    getShip(coordinates){
        const [x, y] = coordinates;
        const shipCoords = `${x},${y}`;
        return this.board[shipCoords];
    }
}