import {
  Component,
  Input,
  Output,
  EventEmitter,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { CellComponent } from '../cell/cell.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-board',
  imports: [CellComponent, CommonModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css',
})
export class BoardComponent {
  @Input() currentPlayer!: string;
  @Output() turnChanged = new EventEmitter<void>();
  @ViewChildren(CellComponent) cells!: QueryList<CellComponent>;
  cellsArray = Array.from({ length: 9 }, (_, i) => i + 1);
  boardState: string[] = Array(9).fill(''); 
  winningCombinations = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];
  isGameOver: boolean = false;

  handleCellClick(cellId: number) {
    console.log('Cell clicked:', cellId);


    const index = cellId - 1;

    // Si la celda está vacía y el juego no ha terminado
    if (this.boardState[index] === '' && !this.isGameOver) {
      this.boardState[index] = this.currentPlayer;
      this.turnChanged.emit();
    }
  }

  checkWinner(): boolean {
    const winner = this.winningCombinations.some((combination) =>
      combination.every((index) => this.boardState[index - 1] === this.currentPlayer)
    );
    if (winner) {
      this.isGameOver = true;
    }
    return winner;
  }

  resetBoard() {
    this.boardState.fill(''); // Vaciar el estado del tablero
    this.cells.forEach((cell) => cell.resetCell()); // Restablecer celdas
    this.isGameOver = false; // Reiniciar el estado de juego
  }
}

