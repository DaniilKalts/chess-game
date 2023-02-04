import { Cell } from "./Cell";
import { Colors } from "./Colors";
import { Bishop } from "./figures/Bishop";
import { Figure, FigureNames } from "./figures/Figure";
import { King } from "./figures/King";
import { Knight } from "./figures/Knight";
import { Pawn } from "./figures/Pawn";
import { Queen } from "./figures/Queen";
import { Rook } from "./figures/Rook";
import { Movement } from "./Movement";

export class Board {
    cells: Cell[][] = [];
    lostBlackFigures: Figure[] = [];
    lostWhiteFigures: Figure[] = [];
    movements: Movement[] = [];
    checkFigure: Figure[] = [];
    isChangingPawn: Figure[] = [];

    public initCells () {
        for (let i = 0; i < 8; i++) {
            const row: Cell[] = []
            for (let j = 0; j < 8; j++) {
                if((i + j) % 2 !== 0) {
                    row.push(new Cell(this, j, i, Colors.BLACK, null)) // Черные ячейки
                } else {
                    row.push(new Cell(this, j, i, Colors.WHITE, null)) // Белые ячейки
                }
            }
            this.cells.push(row);
        }
    }

    public changePawn(figure: any){
        const changingPawnCell = this.isChangingPawn[0].cell
        const cell = this.getCell(changingPawnCell.x, changingPawnCell.y);
        
        
        if (changingPawnCell.figure?.color) {
            if (figure.name === 'Rook') {
                cell.figure = new Rook(changingPawnCell.figure.color, cell);
            } else if (figure.name === 'Knight') {
                cell.figure = new Knight(changingPawnCell.figure.color, cell);
            } else if (figure.name === 'Queen') {
                cell.figure = new Queen(changingPawnCell.figure.color, cell);
            } else if (figure.name === 'Bishop') {
                cell.figure = new Bishop(changingPawnCell.figure.color, cell);
            }
        }
        // console.log(cell.figure)
        
        this.isChangingPawn.splice(0,1);
    }

    public getCopyBoard(): Board {
        const newBoard = new Board();
        newBoard.cells = this.cells;
        newBoard.lostBlackFigures = this.lostBlackFigures;
        newBoard.lostWhiteFigures = this.lostWhiteFigures;
        newBoard.movements = this.movements;
        newBoard.checkFigure = this.checkFigure;
        newBoard.isChangingPawn = this.isChangingPawn;

        return newBoard;
    }

    public getFriendlyKing(target: Cell) {
        for (let i = 0; i < this.cells.length; i++) {
            const row: Cell[] = this.cells[i];
            for (let j = 0; j < row.length; j++) {
                const currentCell = row[j];

                if (target.figure 
                && currentCell.figure?.color === target?.figure?.color
                && currentCell.figure?.name === FigureNames.KING) {
                    return currentCell.figure;
                }
            }
        }
    }

    public highlightCells(selectedCell: Cell | null) {
        for (let i = 0; i < this.cells.length; i++) {
            const row: Cell[] = this.cells[i];
            for (let j = 0; j < row.length; j++) {
                const target = row[j];
                target.available = !!selectedCell?.figure?.canMove(target); 

                const checkFigure = target.board.checkFigure[0];
                
                if (checkFigure && target.available && selectedCell) {
                    let king = this.getFriendlyKing(selectedCell) as Figure;

                    const bishopCheck = () => {
                        if (Math.abs(checkFigure.cell.x - target.x) === Math.abs(checkFigure.cell.y - target.y)
                        && Math.abs(king.cell.x - target.x) === Math.abs(king.cell.y - target.y)) {
                            if (king.cell.y < checkFigure.cell.y
                            && (target.y <= checkFigure.cell.y && target.y > king.cell.y)) {
                                target.available = true;
                            } else if (king.cell.y > checkFigure.cell.y
                            && (target.y >= checkFigure.cell.y && target.y < king.cell.y)) {
                                target.available = true;
                            }
                        }
                    }

                    const rookCheck = () => {
                        if (target.x === checkFigure.cell.x && king.cell.x === target.x
                        && Math.abs(checkFigure.cell.y - king.cell.y) > Math.abs(checkFigure.cell.y - target.y)) {                            
                            if (king.cell.y < checkFigure.cell.y
                            && (target.y <= checkFigure.cell.y && target.y > king.cell.y)) {
                                target.available = true;
                            } else if (king.cell.y > checkFigure.cell.y
                            && (target.y >= checkFigure.cell.y && target.y < king.cell.y)) {
                                target.available = true;
                            }
                        } 
                            
                        if (target.y === checkFigure.cell.y && king.cell.y === target.y
                        && Math.abs(checkFigure.cell.x - king.cell.x) > Math.abs(checkFigure.cell.x - target.x)) {
                            if (king.cell.x < checkFigure.cell.x
                            && (target.x <= checkFigure.cell.x && target.x > king.cell.x)) {
                                target.available = true;
                            } else if (king.cell.x > checkFigure.cell.x
                            && (target.x >= checkFigure.cell.x && target.x < king.cell.x)) {
                                target.available = true;
                            }
                        } 

                        return target.available;
                    }

                    const canAttackCheckFigure = () => {
                        if (target.x === checkFigure.cell.x && target.y === checkFigure.cell.y) {
                            target.available = true;
                        }
                        if (target.x === checkFigure.cell.x && target.y === checkFigure.cell.y) {
                            target.available = true;
                        }
                    }

                    if (checkFigure.name === FigureNames.QUEEN
                        && selectedCell.figure?.name !== FigureNames.KING) {
                        target.available = false;

                        if (target.x === checkFigure.cell.x && target.y === checkFigure.cell.y) {
                            target.available = true;
                            return
                        }

                        bishopCheck();

                        if (target.available ) {
                            if (checkFigure.cell.x === king.cell.x && target.x !== king.cell.x) {
                                target.available = false;
                            } else if (checkFigure.cell.y === king.cell.y && target.y !== king.cell.y) {
                                target.available = false;
                            }
                        }

                        const isRook = rookCheck(); 

                        if (target.available && isRook) {
                            if (target.y === king.cell.y && target.y === checkFigure.cell.y) {
                                if (checkFigure.cell.x < king.cell.x) {
                                    target.available = target.x > checkFigure.cell.x && target.x < king.cell.x;
                                } else if (checkFigure.cell.x > king.cell.x) {
                                    target.available = target.x < checkFigure.cell.x && target.x > king.cell.x;
                                }
                            }

                            if (target.x === king.cell.x && target.x === checkFigure.cell.x) {
                                if (checkFigure.cell.y < king.cell.y) {
                                    target.available = target.y > checkFigure.cell.y && target.y < king.cell.y;
                                } else if (checkFigure.cell.y > king.cell.y) {
                                    target.available = target.y < checkFigure.cell.y && target.y > king.cell.y;
                                }
                            }
                        }
                    }
                    
                    if (checkFigure.name === FigureNames.BISHOP
                    && selectedCell.figure?.name !== FigureNames.KING) {
                        target.available = false;
                        bishopCheck();
                    }
                    
                    if (checkFigure.name === FigureNames.ROOK
                    && selectedCell.figure?.name !== FigureNames.KING) {
                        target.available = false;
                        rookCheck();
                    }

                    if (checkFigure.name === FigureNames.KNIGHT
                    && selectedCell.figure?.name !== FigureNames.KING) {
                        target.available = false;
                        canAttackCheckFigure();
                    }

                    if (checkFigure.name === FigureNames.PAWN
                    && selectedCell.figure?.name !== FigureNames.KING) {
                        target.available = false;
                        canAttackCheckFigure();
                    }
                }
            }
        }
    }

    public getCell(x: number, y: number) {
        return this.cells[y][x];
    }

    private addPawns() {
        for (let i = 0; i < 8; i++) {
            new Pawn(Colors.BLACK, this.getCell(i,1));
            new Pawn(Colors.WHITE, this.getCell(i,6));
        }
    }

    private addKings() {
        new King(Colors.BLACK, this.getCell(4,0));
        new King(Colors.WHITE, this.getCell(4,7));
    }

    private addKnights() {
        new Knight(Colors.BLACK, this.getCell(1,0));
        new Knight(Colors.BLACK, this.getCell(6,0));
        new Knight(Colors.WHITE, this.getCell(1,7));
        new Knight(Colors.WHITE, this.getCell(6,7));
    }

    private addBishops() {
        new Bishop(Colors.BLACK, this.getCell(2,0));
        new Bishop(Colors.BLACK, this.getCell(5,0));
        new Bishop(Colors.WHITE, this.getCell(2,7));
        new Bishop(Colors.WHITE, this.getCell(5,7));
    }

    private addQueens() {
        new Queen(Colors.BLACK, this.getCell(3,0));
        new Queen(Colors.WHITE, this.getCell(3,7));
    }

    private addRooks() {
        new Rook(Colors.BLACK, this.getCell(0,0));
        new Rook(Colors.BLACK, this.getCell(7,0));
        new Rook(Colors.WHITE, this.getCell(0,7));
        new Rook(Colors.WHITE, this.getCell(7,7));
    }

    public addFigures() {
        this.addBishops();
        this.addKings();
        this.addKnights();
        this.addPawns();
        this.addQueens();
        this.addRooks();
    }
}