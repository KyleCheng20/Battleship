export class Ship {
    constructor(length){
        this.length = length;
        this.hitCount = 0;
    }

    hit() {
        if(this.isSunk()) return;

        this.hitCount++;
    }

    isSunk() {
        return this.hitCount >= this.length;
    }
}