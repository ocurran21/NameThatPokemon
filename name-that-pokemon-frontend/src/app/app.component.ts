import { Component, OnInit } from '@angular/core';
import { ApiService } from './core/services/api.service';
import { PokemonDetailsResponse } from './core/models/pokemon-details-response.model';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { VerifyAnswerResponse } from './core/models/verify-answer-response.model';
import { FinalScoreComponent } from './core/components/final-score/final-score.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgClass, NgIf, NgFor, FinalScoreComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit {
  pokemonId: number = 0
  pokemonImage: string = ""
  pokemonNames: string[] = []
  revealPokemon: boolean = false;
  totalScore: number = 0;
  correctName: string = "";
  selectedAnswer: string = "";
  showFinalScore: boolean = false;
  disableButtons: boolean = false;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getRandomPokemon();
  }

  public getRandomPokemon(): void {
    this.totalScore = 0;
    this.revealPokemon = false;
    this.showFinalScore = false;
    this.apiService.getRandomPokemon().subscribe((response: PokemonDetailsResponse) => {
      console.log("Data received...")
      this.pokemonId = response.pokemon_id;
      this.pokemonImage = response.pokemon_image;
      this.pokemonNames =this.shuffleAnswers(response.pokemon_names);
    })
  }

  public getNextPokemon(): void {
    this.revealPokemon = false;
    this.disableButtons = false;
    this.apiService.getNextPokemon().subscribe((response: any) => {
      if(response.reset) {
        this.showFinalScore = true;
      } else {
        this.pokemonId = response.pokemon_id;
        this.pokemonImage = response.pokemon_image;
        this.pokemonNames =this.shuffleAnswers(response.pokemon_names);
      }
      console.log("Data received...")
    })
  }

  selectAnswer(answer: string): void {
    this.revealPokemon = true;
    this.selectedAnswer = answer;
    this.disableButtons = true;
    this.apiService.verifyAnswer(this.pokemonId, answer).subscribe((response: VerifyAnswerResponse) => {
      this.correctName = response.correct_pokemon_name;
      if( response.answer_correct ) this.totalScore++;
    });
  }

  public selectedAnswerStyle(answer: string): string {
    if( answer !== this.correctName && answer === this.selectedAnswer && this.revealPokemon) {
      return "incorrect";
    } else {
      return "";
    }
  }

  public revealCorrectAnswer(answer: string): string {
    if( answer === this.correctName && this.revealPokemon) {
      return "correct";
    } else {
      return "";
    }
  }

  public shuffleAnswers(pokemon_names: string[]): string[] {
    let shuffledAnswers = pokemon_names.map(value => ({ value, sort: Math.random() }))
                                       .sort((i, j) => i.sort - j.sort)
                                       .map(({ value }) => value);
                                  
    return shuffledAnswers;
  }

  onPlayAgain(): void { this.getRandomPokemon(); }
}
