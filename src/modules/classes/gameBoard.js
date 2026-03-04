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

    receiveAttack(coordinates){
        let [x, y] = coordinates;
        let attackCoords = `${x},${y}`;

        // Prevent duplicate attacks
        if(this.hitAttacks.includes(attackCoords) || this.missedAttacks.includes(attackCoords)) return;

        let ship = this.board[attackCoords];

        if(ship){
            ship.hit();
            this.hitAttacks.push(attackCoords);
        } else{
            this.missedAttacks.push(attackCoords);
        }
    }

    allShipsSunk(){
        return this.ships.every(ship => ship.isSunk());
    }
}