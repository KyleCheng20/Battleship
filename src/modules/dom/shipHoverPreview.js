export function clearPreview(board){
    const previewCells = board.querySelectorAll(".preview, .preview-invalid");
    previewCells.forEach(cell => {
        cell.classList.remove("preview");
        cell.classList.remove("preview-invalid");
    });
   
}

export function showPreview(board, x, y, length){
    clearPreview(board);

    let isValid = true;
    const cells = [];

    for(let i = 0; i < length; i++){
        const cell = board.querySelector(`[data-x="${x}"][data-y="${y + i}"]`);

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