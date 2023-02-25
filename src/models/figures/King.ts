import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
import blackLogo from '../../assets/images/black-king.png'
import whiteLogo from '../../assets/images/white-king.png'
import { Rook } from "./Rook";

export class King extends Figure {

    isFirstStep: boolean = true;
    wasUnderAttack: boolean = false;

    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
        this.name = FigureNames.KING;
    }   

    canMove(target: Cell): boolean {
        if(!super.canMove(target)){            
            return false;
        }
        
        if (this.isFirstStep && (target.x === 6 && target.y === this.cell.y)
        && !this.wasUnderAttack) {
            let count = 0;
            const rook = target.board.getCell(7, this.cell.y).figure as Rook;

            for (let x = 5; x < 7; x++) {
                if (target.board.getCell(x, this.cell.y).isEmpty()) {
                    count += 1;
                }
            }

            const isSafe = this.cell.isSafe(target.board.getCell(6, this.cell.y), this.color);

            if (rook) {
                if (count === 2 && rook.isFirstStep 
                && this.canMove(target.board.getCell(5, this.cell.y))
                && isSafe
                ) {
                    return true;    
                }
            }
        }

        if (this.isFirstStep && (target.x === 2 && target.y === this.cell.y)
        && !this.wasUnderAttack) {
            let count = 0;
            const rook = target.board.getCell(0, this.cell.y).figure as Rook;

            for (let x = 1; x < 4; x++) {
                if (target.board.getCell(x, this.cell.y).isEmpty()) {
                    count += 1;
                }
            }

            const isSafe = this.cell.isSafe(target.board.getCell(2, this.cell.y), this.color);

            if (rook) {
                if (count === 3 && rook.isFirstStep
                && this.canMove(target.board.getCell(3, this.cell.y))
                && isSafe) {
                    return true;    
                }
            }
        }
        
        if ((Math.abs((this.cell.x + this.cell.y) - (target.x + target.y))) <= 2
        && Math.abs(this.cell.x - target.x) <= 1
        && Math.abs(this.cell.y - target.y) <= 1) {
            const checkFigure = target.board.checkFigure[0];
            const king = target.getEnemyKing(this.cell);

            if (king) {
                if ((Math.abs(target.y - king?.cell.y) <= 1 && Math.abs(target.x - king?.cell.x) <= 1)) {
                    return false;
                } else if ((Math.abs(target.x - king?.cell.x) <= 1 && Math.abs(target.y - king?.cell.y) <= 1)) {
                    return false;
                }
            }

            const willBeUnderAttack = () => {
                let canMove = true;
                let count = 0;
                
                target.board.cells.forEach(cellArray => {
                    cellArray.forEach(guardFigure => {
                        
                        if(guardFigure.figure && this.color !== guardFigure.figure?.color){  

                            if (guardFigure.figure.canMove(target)
                            && guardFigure.figure.name !== FigureNames.PAWN) {
                                canMove = false;
                                count += 1
                            }
    
                            if(guardFigure.figure.name === FigureNames.PAWN
                            && Math.abs(guardFigure.x - this.cell.x) <= 2
                            && Math.abs(guardFigure.y - this.cell.y) <= 2
                            && Math.abs(target.x - guardFigure.x) === 1
                            && Math.abs(target.y - guardFigure.y) === 1
                            && !target.figure ) {
                                if (guardFigure.figure.color === Colors.BLACK
                                && guardFigure.y - target.y === -1) {
                                    canMove = false;
                                    count += 1;
                                } else if (guardFigure.figure.color === Colors.WHITE
                                && guardFigure.y - target.y === 1) {
                                    canMove = false;
                                    count += 1;
                                }
                            } 

                            if(guardFigure.figure.name === FigureNames.PAWN
                            && Math.abs(target.x - guardFigure.x) === 1
                            && target.figure) {
                                if (guardFigure.figure.color === Colors.BLACK
                                && guardFigure.y - target.y === -1) {
                                    canMove = false;
                                    count += 1
                                } else if (guardFigure.figure.color === Colors.WHITE
                                && guardFigure.y - target.y === 1) {
                                    canMove = false;
                                    count += 1
                                }
                            }
                            
                            if (target.figure) {
                                const newCell = new Cell(this.cell.board, target.x, target.y, target.figure.color, null);

                                if (this.color !== newCell.color) {

                                    if (guardFigure.figure?.canMove(newCell)
                                    && (guardFigure.x !== newCell.x || guardFigure.y !== newCell.y)
                                    ) {
                                        canMove = false;
                                        count += 1
                                    }
                                }
                            }
                        }
                    })
                })
                
                if (count === 0) {
                    canMove = true;
                } else if (count > 0) {
                    canMove = false
                }

                return canMove;
            }

            if (checkFigure) {
                if (target === checkFigure.cell) {
                    return willBeUnderAttack();
                }
                
                if ((checkFigure.name === FigureNames.BISHOP || checkFigure.name === FigureNames.QUEEN)
                && Math.abs(checkFigure.cell.x - target.x) === Math.abs(checkFigure.cell.y - target.y)) {
                    return false;
                }

                if ((checkFigure.name === FigureNames.ROOK || checkFigure.name === FigureNames.QUEEN)
                && (target.y === checkFigure.cell.y || target.x === checkFigure.cell.x)) {

                    if (!checkFigure.canMove(target)) {
                        if (target.x === checkFigure.cell.x
                        && this.cell.x !== checkFigure.cell.x
                        && this.cell.board.getCell(target.x, Math.min(target.y, checkFigure.cell.y) + 1).figure) {
                            return willBeUnderAttack();
                        }

                        if (target.y === checkFigure.cell.y
                        && this.cell.y !== checkFigure.cell.y
                        && this.cell.board.getCell(Math.min(target.x, checkFigure.cell.x) + 1, target.y).figure
                        ) {
                            return willBeUnderAttack();
                        }
                    }

                    return false;
                }

                if (checkFigure.name === FigureNames.PAWN) {
                    return willBeUnderAttack();
                }
                
                if (target.board.checkFigure[0].canMove(target)) {
                    return willBeUnderAttack();
                }
            }

            return willBeUnderAttack();
        }

        return false;
    };

    moveFigure(target: Cell): void {
        super.moveFigure(target);
        this.isFirstStep = false;
    }
}