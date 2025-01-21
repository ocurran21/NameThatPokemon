import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PokemonDetailsResponse } from '@app/core/models/pokemon-details-response.model';
import { ResetGameResponse } from '@app/core/models/reset-game-response.model';
import { VerifyAnswerResponse } from '@app/core/models/verify-answer-response.model';
import { ApiService } from '@app/core/services/api.service';
import { ShuffleArrayService } from '@app/core/services/shuffle-array.service';

@Component({
  selector: 'app-pokemon-quiz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-quiz.component.html',
  styleUrl: './pokemon-quiz.component.scss'
})

export class PokemonQuizComponent {
  @Input() totalScore!: number; 
  @Input() currentPokemon!: PokemonDetailsResponse;
  @Output() gameComplete = new EventEmitter<void>();
  @Output() incrementScore = new EventEmitter<void>();
  
  revealPokemon: boolean = false;
  correctName: string = "";
  selectedAnswer: string = "";
  disableButtons: boolean = false;

  constructor(
    private apiService: ApiService,
    private shuffleArrayService: ShuffleArrayService
  ) {}

  selectAnswer( answer: string ): void {
    this.revealPokemon = true;
    this.selectedAnswer = answer;
    this.disableButtons = true;

    if( this.currentPokemon ) {
      this.apiService.verifyAnswer(this.currentPokemon.pokemon_id, answer).subscribe((response: VerifyAnswerResponse) => {
        this.correctName = response.correct_pokemon_name;
        if( response.answer_correct ) this.incrementScore.emit();
      });
    }
  }

  selectedAnswerStyle( answer: string ): string {
    if( answer !== this.correctName && answer === this.selectedAnswer && this.revealPokemon) {
      return "incorrect";
    } else {
      return "";
    }
  }

  revealCorrectAnswer( answer: string ): string {
    if( answer === this.correctName && this.revealPokemon) {
      return "correct";
    } else {
      return "";
    }
  }

  isResetGameResponse( response: PokemonDetailsResponse | ResetGameResponse ): response is ResetGameResponse {
    return 'reset' in response;
  }

  onNextClick(): void {
    this.revealPokemon = false;
    this.disableButtons = false;
    this.apiService.getNextPokemon().subscribe(( response: PokemonDetailsResponse | ResetGameResponse ) => {
      if( this.isResetGameResponse( response ) ) {
        this.gameComplete.emit();
      } else {
        let shuffledNames = this.shuffleArrayService.shuffleArray<string>( response.pokemon_names );
        if( shuffledNames ) {
          this.currentPokemon = {
            ...response,
            pokemon_names: shuffledNames as [string, string, string, string]
          }
        }
      }
    })
  }

  onGameComplete(): void { 
      this.gameComplete.emit(); 
  }

  onIncrementScore(): void { 
    this.incrementScore.emit(); 
  }
}
