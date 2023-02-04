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

                target.board.cells.forEach(cellArray => {
                    cellArray.forEach(cell => {
                        if(cell.figure && this.color !== cell.figure?.color){  
                            if (cell.figure.canMove(target)
                            && cell.figure.name !== FigureNames.PAWN) {
                                canMove = false;
                                return
                            }
    
                            if(cell.figure.name === FigureNames.PAWN
                            && Math.abs(cell.x - this.cell.x) <= 2
                            && Math.abs(cell.y - this.cell.y) <= 2
                            && Math.abs(target.x - cell.x) === 1
                            && Math.abs(target.y - cell.y) === 1) {
                                canMove = false;
                                return
                            } 

                            if ((Math.abs((this.cell.x + this.cell.y) - (cell.x + cell.y))) <= 2
                            && Math.abs(this.cell.x - cell.x) <= 1
                            && Math.abs(this.cell.y - cell.y) <= 1
                            && cell.figure) {
                                const newCell = new Cell(this.cell.board, cell.x, cell.y, cell.figure.color, null);

                                target.board.cells.forEach(cellsArr => {
                                    cellsArr.forEach(cellItem => {
    
                                        if (cellItem.figure && this.color !== cellItem.figure?.color) {
                                            const guardFigure = this.cell.board.getCell(cellItem.x, cellItem.y);
                                            
                                            if (guardFigure.figure?.canMove(newCell)
                                            && target.x === newCell.x
                                            && target.y === newCell.y
                                            && (guardFigure.x !== newCell.x || guardFigure.y !== newCell.y)
                                            ) {
                                                // console.log('Coordinates of guard: ', newCell.x, newCell.y, guardFigure, guardFigure.x, guardFigure.y)

                                                canMove = false;
                                                // return;
                                            }

                                            // if (canMove === false && guardFigure.figure?.canMove(newCell) === false) {
                                            //     canMove = true;
                                            //     console.log(newCell.x, newCell.y, guardFigure.x, guardFigure.y, canMove, guardFigure.figure?.canMove(newCell))
                                            // };
                                        }
                                    })
                                })
                            }
                        }
                    })
                })
                

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