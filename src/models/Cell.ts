import { Board } from "./Board";
import { Colors } from "./Colors";
import { Coordinates } from "./Coordinates";
import { Figure, FigureNames } from "./figures/Figure";
import { Queen } from "./figures/Queen";

export class Cell {
    readonly x: number;
    readonly y: number;
    readonly color: Colors;
    figure: Figure | null;
    board: Board;
    available: Boolean;
    id: number;

    constructor (board: Board, x: number, y: number, color: Colors, figure: Figure | null) {
        this.board = board;
        this.x = x;
        this.y = y;
        this.color = color;
        this.figure = figure;
        this.available = false;
        this.id = Math.random();
    }

    isEmpty(): boolean {
        return this.figure === null;
    }

    isEnemy(target: Cell): boolean {
        if(target.figure) {
            return target.figure?.color !== this.figure?.color;
        }
        return false;
    }

    isEmptyVertical(target: Cell): boolean {
        if (this.x !== target.x) {
            return false;
        }

        const min = Math.min(this.y, target.y);
        const max = Math.max(this.y, target.y);

        for (let y = min + 1; y < max; y++) {
            if (!this.board.getCell(this.x, y).isEmpty()) {
                return false;
            }
        }

        return true;
    }

    isEmptyHorizontal(target: Cell): boolean {
        if (this.y !== target.y) {
            return false;
        }

        const min = Math.min(this.x, target.x);
        const max = Math.max(this.x, target.x);

        for (let x = min + 1; x < max; x++) {
            if (!this.board.getCell(x, this.y).isEmpty()) {
                return false;
            }
        }

        return true;
    }

    isEmptyDiagonal(target: Cell): boolean {
        const absX = Math.abs(target.x - this.x);
        const absY = Math.abs(target.y - this.y);

        if(absX !== absY) {
            return false;
        }

        const dy = this.y < target.y ? 1 : -1;
        const dx = this.x < target.x ? 1 : -1;

        for (let i = 1; i < absY; i++) {
            if(!this.board.getCell(this.x + dx * i, this.y + dy * i).isEmpty()) {
                return false;
            }
        }

        return true;
    }

    setFigure(figure: Figure, absX: number, absY: number) {

        this.figure = figure;
        this.figure.cell = this;
        
        if (figure.name === FigureNames.PAWN
        && (figure.color === Colors.BLACK && figure.cell.y === 7) || (figure.color === Colors.WHITE && figure.cell.y === 0)) {
            if (figure.color === Colors.BLACK
            && figure.cell.y === 7) {
                this.board.isChangingPawn.length ? this.board.isChangingPawn.splice(0,1) : '';
                this.board.isChangingPawn.push(figure);
                console.log(this.board.isChangingPawn)
            } else if (figure.color === Colors.WHITE
                && figure.cell.y === 0) {
                this.board.isChangingPawn.length ? this.board.isChangingPawn.splice(0,1) : '';
                this.board.isChangingPawn.push(figure);
                console.log(this.board.isChangingPawn)
            }
        } 
                
        this.board.movements.push({
            logo: figure.logo,
            coordinate: `${Coordinates[absX] + absY}`
        })
    }

    addLostFigure(figure: Figure) {
        figure.color === Colors.BLACK
        ? this.board.lostBlackFigures.push(figure)
        : this.board.lostWhiteFigures.push(figure)
    }

    getEnemyKing(target: Cell) {
        for (let i = 0; i < this.board.cells.length; i++) {
            const row: Cell[] = this.board.cells[i];
            for (let j = 0; j < row.length; j++) {
                const currentCell = row[j];
                if (target.figure 
                && currentCell.figure?.color !== target.figure?.color
                && currentCell.figure?.name === FigureNames.KING) {
                    return currentCell.figure;
                }
            }
        }
    }

    isCheck(target: Cell) {
        const king = this.getEnemyKing(target) as Figure;
            
        if (target.figure?.canMove(king?.cell)) {
            this.board.checkFigure.length ? this.board.checkFigure.splice(0,1) : '';
            this.board.checkFigure.push(target.figure);
            return true;
        }

        this.board.checkFigure.splice(0,1);
        return false;
    }

    moveFigure(target: Cell, absX: number, absY: number) {
        if (this.figure && this.figure?.canMove(target)) {   
            this.figure.moveFigure(target);

            if (target.figure) {
                this.addLostFigure(target.figure);
            }
            target.setFigure(this.figure, absX, absY);

            console.log(this.isCheck(target))

            this.figure = null;
        }
    }
}