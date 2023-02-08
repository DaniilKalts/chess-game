import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
import blackLogo from '../../assets/black-king.png'
import whiteLogo from '../../assets/white-king.png'

export class King extends Figure {
    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
        this.name = FigureNames.KING;
    }   

    canMove(target: Cell): boolean {
        if(!super.canMove(target)){            
            return false;
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
                            // const guardFigure = this.cell.board.getCell(cell.x, cell.y);

                            if (guardFigure.figure.canMove(target)
                            && guardFigure.figure.name !== FigureNames.PAWN) {
                                canMove = false;
                                count += 1
                                // console.log(count, target.x, target.y, guardFigure.x, guardFigure.y, canMove)
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
                                
                                console.log(count, target.x, target.y, guardFigure.x, guardFigure.y, canMove)
                            } 

                            if(guardFigure.figure.name === FigureNames.PAWN
                            && Math.abs(target.x - guardFigure.x) === 1
                            && target.figure) {
                                if (guardFigure.figure.color === Colors.BLACK
                                && guardFigure.y - target.y === -1) {
                                    canMove = false;
                                    count += 1
                                    console.log(count, target.x, target.y, guardFigure.x, guardFigure.y, canMove)
                                } else if (guardFigure.figure.color === Colors.WHITE
                                && guardFigure.y - target.y === 1) {
                                    canMove = false;
                                    count += 1
                                    console.log(count, target.x, target.y, guardFigure.x, guardFigure.y, canMove)
                                }
                            }
                            
                            if (target.figure) {
                                const newCell = new Cell(this.cell.board, target.x, target.y, target.figure.color, null);

                                if (this.color !== newCell.color) {
                                    // console.log(target.x, target.y, newCell.x, newCell.y, guardFigure.x, guardFigure.y, guardFigure.figure?.canMove(newCell))

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
                    // return true;
                }
                
                if ((checkFigure.name === FigureNames.BISHOP || checkFigure.name === FigureNames.QUEEN)
                && Math.abs(checkFigure.cell.x - target.x) === Math.abs(checkFigure.cell.y - target.y)) {
                    return false
                }

                if ((checkFigure.name === FigureNames.ROOK || checkFigure.name === FigureNames.QUEEN)
                && (target.y === checkFigure.cell.y || target.x === checkFigure.cell.x)) {
                    return false;
                }

                if (checkFigure.name === FigureNames.PAWN) {
                    return willBeUnderAttack();
                }
                
                if (target.board.checkFigure[0].canMove(target)) {
                    return false;
                }
            }

            return willBeUnderAttack();
        }

        return false;
    }
}