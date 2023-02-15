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
    isCheckAndMate: Figure[] = [];

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
        const enemyKing = cell.getEnemyKing(cell) as King;
        
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
        
        if (enemyKing && cell.figure?.canMove(enemyKing.cell)) {
            this.checkFigure.length > 0 ? this.checkFigure.splice(0,1) : '';
            this.checkFigure.push(cell.figure);
            enemyKing.wasUnderAttack = true;
        }
        
        this.isChangingPawn.splice(0,1);

        const cells = this.cells;
        let checkAndMate = false;
        let enemyKingSteps = 0;
        let defensiveFigures = 0;

        if (this.checkFigure.length) {
            for (let i = 0; i < cells.length; i++) {
                const row: Cell[] = cells[i];
                for (let j = 0; j < row.length; j++) {
                    const potentialFigure = row[j];
                    const checkFigure = this.checkFigure[0] as Figure;

                    if (potentialFigure.figure?.color === enemyKing.color) {
                        if (this.deffensiveCells(potentialFigure, this.checkFigure[0])?.length) {
                            defensiveFigures += this.deffensiveCells(potentialFigure, this.checkFigure[0])?.length as number;
                        }
                        
                        if (potentialFigure.figure.canMove(checkFigure.cell)) {
                            defensiveFigures += 1;
                        }
                    }

                    if (enemyKing.canMove(potentialFigure)) {                            
                        enemyKingSteps += 1;
                    }
                }
            };
        };

        checkAndMate = this.checkFigure.length ? true : false;
        console.log(checkAndMate, enemyKingSteps, defensiveFigures);

        if (checkAndMate && !enemyKingSteps && !defensiveFigures) {
            this.isCheckAndMate.push(this.checkFigure[0]);
        } 

        for (let i = 0; i < cells.length; i++) {
            const row: Cell[] = cells[i];
            for (let j = 0; j < row.length; j++) {
                const potentialFigure = row[j];
                potentialFigure.available = false;
            }
        }
    }

    public getCopyBoard(): Board {
        const newBoard = new Board();
        newBoard.cells = this.cells;
        newBoard.lostBlackFigures = this.lostBlackFigures;
        newBoard.lostWhiteFigures = this.lostWhiteFigures;
        newBoard.movements = this.movements;
        newBoard.checkFigure = this.checkFigure;
        newBoard.isChangingPawn = this.isChangingPawn;
        newBoard.isCheckAndMate = this.isCheckAndMate;

        // for (let i = 0; i < this.cells.length; i++) {
        //     const row: Cell[] = this.cells[i];
        //     for (let j = 0; j < row.length; j++) {
        //         const potentialFigure = row[j];
        //         if (potentialFigure.available) {
        //             console.log(potentialFigure.x, potentialFigure.y);
        //             // if (potentialFigure.figure?.name !== FigureNames.KING
        //             // && potentialFigure.figure?.canMove()) {
        //             //     potentialFigure.available = false;
        //             // }
        //             // potentialFigure.available = false;
        //         }
        //     }
        // };

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

                if (target.available 
                && selectedCell
                && !checkFigure) {
                    let king = this.getFriendlyKing(selectedCell) as Figure;

                    for (let i = 0; i < this.cells.length; i++) {
                        const row: Cell[] = this.cells[i];
                        for (let j = 0; j < row.length; j++) {
                            const potentialFigure = row[j];
                            
                            if (potentialFigure.figure?.color !== selectedCell?.figure?.color
                            && potentialFigure.figure?.name !== FigureNames.PAWN
                            && potentialFigure.figure?.name !== FigureNames.KING
                            && potentialFigure.figure?.name !== FigureNames.KNIGHT
                            && potentialFigure.figure) {
                                const diagonalCheck = () => {
                                    const min = Math.min(potentialFigure.y, king.cell.y);
                                    const max = Math.max(potentialFigure.y, king.cell.y);

                                    let absX = 0;
                                    let figuresCount = 0;

                                    if (potentialFigure.y < king.cell.y) {
                                        if (potentialFigure.x < king.cell.x) {
                                            absX = potentialFigure.x + 1;   
                                        } else if (potentialFigure.x > king.cell.x) {
                                            absX = potentialFigure.x - 1; 
                                        }

                                        for (let y = min + 1; y < max; y++) {
                                            const currentCell = this.getCell(absX, y);
    
                                            if (!currentCell.isEmpty()
                                            && currentCell.x !== selectedCell.x
                                            && currentCell.y !== selectedCell.y) {
                                                figuresCount += 1;
                                            }
    
                                            if (potentialFigure.x < king.cell.x) {
                                                absX += 1;   
                                            } else if (potentialFigure.x > king.cell.x) {
                                                absX -= 1;   
                                            }
                                        }
                                    } else if (potentialFigure.y > king.cell.y) {
                                        if (potentialFigure.x < king.cell.x) {
                                            absX = king.cell.x - 1;   
                                        } else if (potentialFigure.x > king.cell.x) {
                                            absX = king.cell.x + 1; 
                                        } 

                                        for (let y = min + 1; y < max; y++) {
                                            const currentCell = this.getCell(absX, y);
    
                                            if (!currentCell.isEmpty()
                                            && currentCell.x !== selectedCell.x
                                            && currentCell.y !== selectedCell.y) {
                                                figuresCount += 1;
                                            }
    
                                            if (potentialFigure.x < king.cell.x) {
                                                absX -= 1;   
                                            } else if (potentialFigure.x > king.cell.x) {
                                                absX += 1;   
                                            }
                                        }
                                    }

                                    if (target.x === potentialFigure.x
                                    && target.y === potentialFigure.y) {
                                        return true;
                                    }

                                    return figuresCount ? true : false;
                                }

                                const horizontalCheck = () => {
                                    let figuresCount = 0;

                                    let minAbsX = Math.min(potentialFigure.x, king.cell.x);
                                        let maxAbsX = Math.max(potentialFigure.x, king.cell.x);

                                        for (let x = minAbsX + 1; x < maxAbsX; x++) {
                                            const currentCell = this.getCell(x, potentialFigure.y);
                                            if (!currentCell.isEmpty()
                                            && currentCell.x !== selectedCell.x
                                            && currentCell.y === selectedCell.y) {
                                                figuresCount += 1;
                                            }
                                        }

                                        if ((target.x === potentialFigure.x
                                        && target.y === potentialFigure.y)
                                        || (target.x !== potentialFigure.x
                                        && target.y === potentialFigure.y)) {
                                            return true;
                                        }

                                        return figuresCount ? true : false;
                                }

                                const verticalCheck = () => {
                                    let figuresCount = 0;

                                    let minAbsY = Math.min(potentialFigure.y, king.cell.y);
                                    let maxAbsY = Math.max(potentialFigure.y, king.cell.y);

                                    for (let y = minAbsY + 1; y < maxAbsY; y++) {
                                        const currentCell = this.getCell(potentialFigure.x, y);
                                        if (!currentCell.isEmpty()
                                        && currentCell.x === selectedCell.x
                                        && currentCell.y !== selectedCell.y) {
                                            figuresCount += 1;
                                        }
                                    }

                                    if ((target.x === potentialFigure.x
                                    && target.y === potentialFigure.y)
                                    || (target.x === potentialFigure.x
                                    && target.y !== potentialFigure.y)) {
                                        return true;
                                    }

                                    return figuresCount ? true : false;
                                }

                                if (potentialFigure.figure && potentialFigure.figure?.canMove(selectedCell)) {
                                    if (potentialFigure.figure.name === FigureNames.BISHOP
                                    && Math.abs(potentialFigure.x - king.cell.x) === Math.abs(potentialFigure.y - king.cell.y)
                                    && Math.abs(potentialFigure.x - selectedCell.x) === Math.abs(potentialFigure.y - selectedCell.y)) {
                                        target.available = diagonalCheck();
                                    } else if (potentialFigure.figure.name === FigureNames.ROOK
                                    && (potentialFigure.x === king.cell.x || potentialFigure.y === king.cell.y)) {
                                        if (potentialFigure.y === king.cell.y
                                        && potentialFigure.y === selectedCell.y) {
                                            target.available = horizontalCheck();
                                        } else if (potentialFigure.x === king.cell.x 
                                        && potentialFigure.x === selectedCell.x) {
                                            target.available = verticalCheck();
                                        }
                                    } else if (potentialFigure.figure.name === FigureNames.QUEEN) {
                                        let checkAbs = true;

                                        if (potentialFigure.y === king.cell.y
                                        && selectedCell.y === king.cell.y) {
                                            checkAbs = horizontalCheck();
                                        } else if (potentialFigure.x === king.cell.x
                                        && selectedCell.x === king.cell.x) {
                                            checkAbs = verticalCheck();
                                        } else if (Math.abs(potentialFigure.x - king.cell.x) === Math.abs(potentialFigure.y - king.cell.y)
                                        && Math.abs(potentialFigure.x - selectedCell.x) === Math.abs(potentialFigure.y - selectedCell.y)) {
                                            checkAbs = diagonalCheck();
                                        }

                                        target.available = checkAbs;
                                    }
                                } 
                            }
                        }
                    }
                }
                
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
                        console.log(target.x, target.y, target.available);
                        target.available = false;

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

                        if (target.x === checkFigure.cell.x && target.y === checkFigure.cell.y) {
                            target.available = true;
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

                    // console.log(!!checkFigure, !!target.available, !!selectedCell)
                }
            }
        }
    }

    public deffensiveCells(selectedCell: Cell, checkFigure: Figure) {
       let availableCells = [];

        for (let i = 0; i < this.cells.length; i++) {
            const row: Cell[] = this.cells[i];
            for (let j = 0; j < row.length; j++) {
                const target = row[j];
                target.available = !!selectedCell?.figure?.canMove(target);

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
                            availableCells.push(target);
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

                if (target.available) {
                    availableCells.push(availableCells.length);
                }
            }
        };

        return availableCells;
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