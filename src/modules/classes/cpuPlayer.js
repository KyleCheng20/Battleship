import { Player } from "./player";

export class CPUPlayer extends Player {
    constructor(name){
        super(name);
        this.previousAttacks = new Set();
        this.successfulHits = [];   // All successful hits
        this.targetQueue = [];      // Next cell target to try
        this.direction = null;
        this.anchorHit = null;
        this.triedDirections = new Set();
        this.pendingHits = [];      // Hits on ships not yet being actively hunted
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
        if(this.previousAttacks.size >= 100) throw new Error("No available moves left");
        const coord = this.getRandomCoord();
        const key = `${coord[0]},${coord[1]}`;
        this.previousAttacks.add(key);
        
        return opponent.gameboard.receiveAttack(coord);
    }

    handleSinkShip(){
        // Any hit recorded in pendingHits belongs to a different ship we clipped during this hunt. 
        // Restart hunting from the oldest one
        if(this.pendingHits.length > 0){
            const nextHit = this.pendingHits.shift();
            this.successfulHits = [nextHit];
            this.anchorHit = nextHit;
            this.triedDirections = new Set();
            this.direction = null;
            this.targetQueue = [];

            // Queue all four neighbors of the preserved hit
            const [x, y] = nextHit;
            let directions = [
                [1,0], [-1,0],
                [0,1], [0,-1]
            ];

            while(directions.length > 0){
                const i = Math.floor(Math.random() * directions.length);
                const [dx, dy] = directions.splice(i, 1)[0];
                const nx = x + dx;
                const ny = y + dy;
                const key = `${nx},${ny}`;
                if(this.isValid(nx, ny) && !this.previousAttacks.has(key)){
                    this.targetQueue.push([nx, ny]);
                }
            }
        } else {
            this.successfulHits = [];
            this.targetQueue = [];
            this.direction = null;
            this.anchorHit = null;
            this.triedDirections = new Set();
        }
    }

    hardModeAttack(opponent){
        if(this.targetQueue.length === 0 && this.successfulHits.length > 0){
            if(!this.direction){
                const [x, y] = this.successfulHits[0];

                const fallbackTargets = [
                    [x, y - 1], // left
                    [x, y + 1], // right
                ];

                fallbackTargets.forEach(([nx,ny]) => {
                    const key = `${nx},${ny}`;
                    if(this.isValid(nx, ny) && !this.previousAttacks.has(key)){
                        this.targetQueue.push([nx, ny]);
                    }
                });
            } else{
                this.extendDirection();
            }
        }
        
        while(this.targetQueue.length > 0){
            const coord = this.targetQueue.shift();
            const key = `${coord[0]},${coord[1]}`;

            if(this.previousAttacks.has(key)) continue;     // Skip duplicates
            this.previousAttacks.add(key);

            const result = opponent.gameboard.receiveAttack(coord);

            if(result.hit){
                this.handleHit(coord);

                if(result.ship.isSunk()){
                    this.handleSinkShip();
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
                    this.handleSinkShip();
                }
            }

        return result.hit;
    }

    extendDirection(){
        if(!this.direction) return;

        const hits = this.successfulHits;
        let targets = [];

        if(this.direction === "horizontal"){
            const ys = hits.map(([, y]) => y);
            const x = hits[0][0];
            targets = [[x, Math.min(...ys) - 1], [x, Math.max(...ys) + 1]];
        }

        if(this.direction === "vertical"){
            const xs = hits.map(([x]) => x);
            const y = hits[0][1];
            targets = [[Math.min(...xs) - 1, y], [Math.max(...xs) + 1, y]];
        }

        if(Math.random() < 0.5) targets.reverse();

        let addedAny = false;
        targets.forEach(([nx, ny]) => {
            const key = `${nx},${ny}`;
            if(this.isValid(nx, ny) && !this.previousAttacks.has(key)){
                this.targetQueue.push([nx, ny]);
                addedAny = true;
            }
        });

        if(!addedAny){
            this.triedDirections.add(this.direction);
            this.direction = null;

            // Any hits beyond the anchor that were absorbed into successfulHits may belong to a stacked ship.
            // Rescue them into pendingHits so handleSinkShip can resume hunting them later
            if(this.successfulHits.length >= 2){
                const nonAnchorHits = this.successfulHits.filter(([hx, hy]) => {
                    return !(this.anchorHit && hx === this.anchorHit[0] && hy === this.anchorHit[1]);
                });
                nonAnchorHits.forEach(hit => {
                    const alreadyPending = this.pendingHits.some(([px, py]) => px === hit[0] && py === hit[1]);
                    if(!alreadyPending) this.pendingHits.push(hit);
                });
            }

            this.successfulHits = this.anchorHit ? [this.anchorHit] : [this.successfulHits[0]];
            this.refillQueueFromAnchor();
        }
    }

    refillQueueFromAnchor(){
        if(!this.anchorHit) return;
        const [ox, oy] = this.anchorHit;

        if(!this.triedDirections.has("horizontal")){
            [[ox, oy - 1], [ox, oy + 1]].forEach(([nx, ny]) => {
                const key = `${nx},${ny}`;
                if(this.isValid(nx, ny) && !this.previousAttacks.has(key)){
                    this.targetQueue.push([nx, ny]);
                }
            });
        }
        if(!this.triedDirections.has("vertical")){
            [[ox - 1, oy], [ox + 1, oy]].forEach(([nx, ny]) => {
                const key = `${nx},${ny}`;
                if(this.isValid(nx, ny) && !this.previousAttacks.has(key)){
                    this.targetQueue.push([nx, ny]);
                }
            });
        }
    }

    handleHit([x, y]){
        // If we're already tracking a ship (anchorHit exists), any hit that doesn't fit the current axis belongs to a different ship
        if(this.anchorHit){
            if(this.direction){
                const [x0, y0] = this.successfulHits[0];
                const onSameAxis = (this.direction === "horizontal" && x === x0) || (this.direction === "vertical" && y === y0);
                if(onSameAxis){
                    this.successfulHits.push([x, y]);
                } else{
                    this.pendingHits.push([x, y]);
                    return;
                }
            } else{
                // Have an anchor but no direction yet.
                // This hit is adjacent but could be a stacked ship. Check if it aligns with anchor.
                const [ax, ay] = this.anchorHit;
                const sameRow = x === ax;
                const sameCol = y === ay;

                if(sameRow || sameCol){
                    this.successfulHits.push([x, y]);
                } else{
                    this.pendingHits.push([x, y]);
                    return;
                }
            }
        } else{
            // Completely fresh hit, start a new hunt
            this.successfulHits.push([x, y]);
            this.anchorHit = [x, y];
            this.triedDirections = new Set();
        }

        if(this.successfulHits.length === 1){
            let directions = [[1,0],[-1,0],[0,1],[0,-1]];
            while(directions.length > 0){
                const i = Math.floor(Math.random() * directions.length);
                const [dx, dy] = directions.splice(i, 1)[0];
                const nx = x + dx;
                const ny = y + dy;
                const key = `${nx},${ny}`;
                if(this.isValid(nx, ny) && !this.previousAttacks.has(key)){
                    this.targetQueue.push([nx, ny]);
                }
            }
        } else if(this.successfulHits.length === 2){
            const [x1, y1] = this.successfulHits[0];
            const [x2, y2] = this.successfulHits[1];
            this.targetQueue = [];
            this.direction = x1 === x2 ? "horizontal" : "vertical";
            this.triedDirections.add(this.direction);
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