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

            if (checkFigure) {
                if (target === checkFigure.cell) {
                    return true;
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
                    return true;
                }
                
                if (target.board.checkFigure[0].canMove(target)) {
                    return false;
                }
            }
            return true;
        }
        return false;
    }
}