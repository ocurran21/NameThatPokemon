import { Component, OnInit } from '@angular/core';
import { ApiService } from './core/services/api.service';
import { PokemonDetailsResponse } from './core/models/pokemon-details-response.model';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { VerifyAnswerResponse } from './core/models/verify-answer-response.model';
import { FinalScoreComponent } from './core/components/final-score/final-score.component';
import { PokemonQuizComponent } from './core/components/pokemon-quiz/pokemon-quiz.component';
import { ShuffleArrayService } from './core/services/shuffle-array.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgIf, PokemonQuizComponent, FinalScoreComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit {
  totalScore: number = 0;
  currentPokemon: PokemonDetailsResponse = {pokemon_id: 0, pokemon_image: "", pokemon_names: ["", "", "", ""]}
  showFinalScore: boolean = false;

  constructor(
    private apiService: ApiService,
    private shuffleArrayService: ShuffleArrayService
  ) {}

  ngOnInit(): void {
    this.getRandomPokemon();
  }

  public getRandomPokemon(): void {
    this.totalScore = 0;
    this.showFinalScore = false;
    this.apiService.getRandomPokemon().subscribe((response: PokemonDetailsResponse) => {
      let shuffledNames = this.shuffleArrayService.shuffleArray<string>(response.pokemon_names);
      if( shuffledNames ) {
        this.currentPokemon = {
          ...response,
          pokemon_names: shuffledNames as [string, string, string, string]
        }
      }
    })
  }

  onIncrementScore(): void { this.totalScore++; }

  onGameComplete(): void { this.showFinalScore = true; }

  onPlayAgain(): void { this.getRandomPokemon(); }
}
