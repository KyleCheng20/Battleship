import { currentOrientation } from "../utils/shipOrientation";

export function clearPreview(board){
    const previewCells = board.querySelectorAll(".preview, .preview-invalid");
    previewCells.forEach(cell => {
        cell.classList.remove("preview", "preview-invalid");
    });
   
}

export function showPreview(board, x, y, length){
    clearPreview(board);

    let isValid = true;
    const cells = [];

    for(let i = 0; i < length; i++){
        const cell = board.querySelector(currentOrientation === "horizontal" ? `[data-x="${x}"][data-y="${y + i}"]` : `[data-x="${x + i}"][data-y="${y}"]`);

        if(!cell){
            isValid = false;
            continue;
        }

        if(cell.classList.contains("ship")) isValid = false;

        cells.push(cell);
    }

    cells.forEach(cell => {
        if(!cell) return;

        cell.classList.add(isValid ? "preview" : "preview-invalid");
    });
}