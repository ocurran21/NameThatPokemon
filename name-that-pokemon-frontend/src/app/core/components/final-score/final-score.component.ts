import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-final-score',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './final-score.component.html',
  styleUrl: './final-score.component.scss'
})

export class FinalScoreComponent {
  @Input() totalScore!: number; 
  @Output() playAgain = new EventEmitter<void>
  
  onPlayAgainClick(): void { 
      this.playAgain.emit(); 
  }
}
