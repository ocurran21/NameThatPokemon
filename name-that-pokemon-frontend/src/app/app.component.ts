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
  pokemonImage: string = "";
  pokemonId: number = 0;
  pokemonNames: string[] = [];
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
      this.pokemonId = response.pokemon_id;
      this.pokemonImage = response.pokemon_image;
      this.pokemonNames =this.shuffleArrayService.shuffleArray<string>(response.pokemon_names);
    })
  }

  private shuffleAnswers(pokemon_names: string[]): string[] {
    let shuffledAnswers = pokemon_names.map(value => ({ value, sort: Math.random() }))
                                       .sort((i, j) => i.sort - j.sort)
                                       .map(({ value }) => value);
                                  
    return shuffledAnswers;
  }

  onIncrementScore(): void { this.totalScore++; }

  onGameComplete(): void { this.showFinalScore = true; }

  onPlayAgain(): void { this.getRandomPokemon(); }
}
