import { Board } from "./Board";
import { Colors } from "./Colors";
import { Figure } from "./figures/Figure";

export class Cell {
    readonly x: Number;
    readonly y: Number;
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

    moveFigure(target: Cell) {
        if (this.figure && this.figure?.canMove(target)) {
            this.figure?.moveFigure(target);
            target.figure = this.figure;
            this.figure = null;
        }
    }
}