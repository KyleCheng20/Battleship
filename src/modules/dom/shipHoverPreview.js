export function clearPreview(board){
    const previewCells = board.querySelectorAll(".preview");
    previewCells.forEach(cell => cell.classList.remove("preview"));
}

export function showPreview(board, x, y, length){
    clearPreview(board);

    for(let i = 0; i < length; i++){
        const previewCell = board.querySelector(`[data-x="${x}"][data-y="${y + i}"]`);

        if(!previewCell) break;

        previewCell.classList.add("preview");
    }
}