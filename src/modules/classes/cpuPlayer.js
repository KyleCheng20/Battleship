import { Player } from "./player";

export class CPUPlayer extends Player {
    constructor(name){
        super(name);
        this.previousAttacks = new Set();
    }

    attack(opponent){
        let cpuCoord;
        let key;

        // Prevent cpu from generating the same coordinates twice
        do{
            const x = Math.floor(Math.random() * 10);
            const y = Math.floor(Math.random() * 10);
            cpuCoord = [x, y];
            key = `${x},${y}`;
        } while(this.previousAttacks.has(key));

        if(this.previousAttacks.size >= 100) throw new Error("No available moves left");
        this.previousAttacks.add(cpuCoord);
        
        return opponent.gameboard.receiveAttack(cpuCoord);
    }
}