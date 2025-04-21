import { Component, ViewChild } from '@angular/core';
import { StatusComponent } from '../status/status.component';
import { BoardComponent } from '../board/board.component';
import { ModalWinnerComponent } from "../modal-winner/modal-winner.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game',
  imports: [StatusComponent, BoardComponent, ModalWinnerComponent, CommonModule],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent {
  title = 'Tic-Tac-Toe';
  currentPlayer: string = '✖';

  winner: string | null = null;
  isDraw: boolean = false;
  // Contadores de victorias
  xWins: number = 0;
  oWins: number = 0;
  draws: number = 0;

  reset: boolean = false;

  @ViewChild(BoardComponent) board!: BoardComponent;

  changeTurn() {
    this.currentPlayer = this.currentPlayer === '✖' ? '⭕' : '✖';
  }

  handleTurnChange() {
    // Verificar si hay un ganador
    if (this.board.checkWinner()) {
      this.winner = this.currentPlayer;
      this.updateScores();
    } else if (this.board.boardState.every((cell) => cell !== '')) {
      this.isDraw = true;
      this.draws++;
    } else {
      this.changeTurn();
    }
  }

  updateScores() {
    // Actualiza las victorias según el ganador
    if (this.winner === '✖') {
      this.xWins++;
    } else if (this.winner === '⭕') {
      this.oWins++;
    }
  }

  resetGame() {
    // Resetear el tablero y el estado del juego
    this.board.resetBoard();
    this.currentPlayer = '✖';
    this.winner = null;
    this.isDraw = false;
    this.reset = !this.reset; // Forzar la actualización del tablero
  }
}
