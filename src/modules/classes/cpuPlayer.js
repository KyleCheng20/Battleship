import { Player } from "./player";

export class CPUPlayer extends Player {
    constructor(name){
        super(name);
        this.previousAttacks = new Set();
        this.successfulHits = [];   // All successful hits
        this.targetQueue = [];      // Next cell target to try
        this.direction = null;
    }
    
    getRandomCoord(){
        let coord;
        let key;

        // Prevent cpu from generating the same coordinates twice
        do{
            const x = Math.floor(Math.random() * 10);
            const y = Math.floor(Math.random() * 10);
            coord = [x, y];
            key = `${x},${y}`;
        } while(this.previousAttacks.has(key));

        return coord;
    }

    isValid(x, y){
        return x >= 0 && x < 10 && y >= 0 && y < 10;
    }

    randomAttack(opponent){
        let coord;
        let key;

        // Prevent cpu from generating the same coordinates twice
        do{
            const x = Math.floor(Math.random() * 10);
            const y = Math.floor(Math.random() * 10);
            coord = [x, y];
            key = `${x},${y}`;
        } while(this.previousAttacks.has(key));

        if(this.previousAttacks.size >= 100) throw new Error("No available moves left");
        this.previousAttacks.add(key);
        
        return opponent.gameboard.receiveAttack(coord);
    }

    hardModeAttack(opponent){
        while(this.targetQueue.length > 0){
            const coord = this.targetQueue.shift();
            const key = `${coord[0]},${coord[1]}`;

            if(this.previousAttacks.has(key)) continue;     // Skip duplicates
            this.previousAttacks.add(key);

            const result = opponent.gameboard.receiveAttack(coord);

            if(result.hit){
                this.handleHit(coord);

                if(result.ship.isSunk()){
                    this.successfulHits = [];
                    this.targetQueue = [];
                    this.direction = null;

                }
            }

            return result.hit;
        }

        const coord = this.getRandomCoord();
        const key = `${coord[0]},${coord[1]}`;
        this.previousAttacks.add(key);

        const result = opponent.gameboard.receiveAttack(coord);

            if(result.hit){
                this.handleHit(coord);

                if(result.ship.isSunk()){
                    this.successfulHits = [];
                    this.targetQueue = [];
                    this.direction = null;

                }
            }

        return result.hit;
    }

    extendDirection(){
        if(!this.direction) return;

        const hits = this.successfulHits;
        let targets = [];

        if(this.direction === "horizontal"){
            const ys = hits.map(([x, y]) => y);
            const x = hits[0][0];

            const minY = Math.min(...ys);
            const maxY = Math.max(...ys);

            const left = [x, minY - 1];
            const right = [x, maxY + 1];

            targets = [left, right];
        }

        if(this.direction === "vertical"){
            const xs = hits.map(([x, y]) => x);
            const y = hits[0][1];

            const minX = Math.min(...xs);
            const maxX = Math.max(...xs);

            const up = [minX - 1, y];
            const down = [maxX + 1, y];

            targets = [up, down];        
        }

        // Randomly shuffle the end targets 
        if(Math.random() < 0.5) targets.reverse();

        targets.forEach(([nx, ny]) => {
                const key = `${nx},${ny}`;
                if(this.isValid(nx, ny) && !this.previousAttacks.has(key)){
                    this.targetQueue.push([nx, ny]);
                }
            }); 
    }

    handleHit([x, y]){
        this.successfulHits.push([x, y]);

        // If this is the first hit
        if(this.successfulHits.length === 1){
            let directions = [
                [1, 0], [-1, 0],
                [0, 1], [0, -1]
            ];

            // Attack random adjacent cell after hit
            while(directions.length > 0){
                const randomDirectionIndex = Math.floor(Math.random() * (directions.length));

                const [dx, dy] = directions.splice(randomDirectionIndex, 1)[0];

                const newX = x + dx;
                const newY = y + dy;
                const key = `${newX},${newY}`;

                if(this.isValid(newX, newY) && !this.previousAttacks.has(key)) this.targetQueue.push([newX, newY]);
            }
        } else if(this.successfulHits.length === 2) {   // If this is the second hit
            const [x1, y1] = this.successfulHits[0];
            const [x2, y2] = this.successfulHits[1];

            // Clear old guesses
            this.targetQueue = [];

            if(x1 === x2){
                this.direction = "horizontal";
            } else{
                this.direction = "vertical";
            }

            this.extendDirection();
        } else{ 
            this.extendDirection();
        }
    }

    attack(opponent, difficulty){
        if(difficulty === "hard"){
            return this.hardModeAttack(opponent);
        }

        return this.randomAttack(opponent);
    }
}