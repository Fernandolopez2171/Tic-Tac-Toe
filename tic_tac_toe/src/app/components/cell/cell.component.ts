import { Component, Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cell',
  imports: [],
  templateUrl: './cell.component.html',
  styleUrl: './cell.component.css'
})
export class CellComponent {
  @Input() cellId!: number;
  @Input() currentPlayer!: string;
  @Input() disabled: boolean = false;
  @Output() cellClicked = new EventEmitter<number>();

  cellValue: string = '';

  handleClick() {
    if (!this.cellValue && !this.disabled) {
      this.cellValue = this.currentPlayer;
      this.cellClicked.emit(this.cellId);
    }
  }

  resetCell() {
    this.cellValue = '';
  }
}
