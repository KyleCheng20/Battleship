export class Gameboard {
    constructor(){
        this.boardSize = 10;
        this.board = {};    // Stores dictionary maps of coordinates as key, ships as value
        this.ships = [];
        this.missedAttacks = [];
        this.hitAttacks = [];
    }

    placeShip(ship, startCoord, direction){
        const [x, y] = startCoord;

        if(direction === "horizontal" && y + ship.length > this.boardSize) throw new Error("Ship is out of bounds");
        if(direction === "vertical" && x + ship.length > this.boardSize) throw new Error("Ship is out of bounds");

        const coords = [];

        for(let i = 0; i < ship.length; i++){
            let shipCoords = direction === "horizontal" ? `${x},${y + i}` : `${x + i},${y}`;

            if(this.board[shipCoords]) throw new Error("Ships cannot overlap");

            coords.push(shipCoords);
        }

        coords.forEach(coord => this.board[coord] = ship);

        this.ships.push(ship);        
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
            return true;
        } else{
            this.missedAttacks.push(attackCoords);
            return false;
        }
    }

    allShipsSunk(){
        return this.ships.every(ship => ship.isSunk());
    }
}