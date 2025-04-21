import { CommonModule} from '@angular/common';
import { Component,Output,EventEmitter,Input } from '@angular/core';

@Component({
  selector: 'app-modal-winner',
  imports: [CommonModule],
  templateUrl: './modal-winner.component.html',
  styleUrl: './modal-winner.component.css'
})
export class ModalWinnerComponent {
  isVisible: boolean = false;
  @Input() winner: string | null = null;
  @Output() reset = new EventEmitter<void>();

  openModal(winner: string) {
    this.winner = winner;
    this.isVisible = true;
  }

  closeModal() {
    this.isVisible = false;
    this.winner = null;
  }
}
