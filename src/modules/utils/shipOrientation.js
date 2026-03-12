export let currentOrientation = "horizontal";

export function rotateShips(){
    currentOrientation = currentOrientation === "horizontal" ? "vertical" : "horizontal";
}