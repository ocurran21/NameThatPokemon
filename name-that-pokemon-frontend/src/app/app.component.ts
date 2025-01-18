import { Component, OnInit } from '@angular/core';
import { ApiService } from './core/services/api.service';
import { PokemonDetailsResponse } from './core/models/pokemon-details-response.model';
import { NgClass, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [NgClass, NgIf, NgFor]
})

export class AppComponent implements OnInit {
  pokemonId: number = 0
  pokemonImage: string = ""
  pokemonNames: string[] = []
  revealPokemon: boolean = false;
  totalScore: number = 0;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.revealPokemon = false;
    this.getRandomPokemon();

  }

  getRandomPokemon(): void {
    this.apiService.getRandomPokemon().subscribe((response: PokemonDetailsResponse) => {
      console.log("Data received...")
      this.pokemonId = response.pokemon_id;
      this.pokemonImage = response.pokemon_image;
      this.pokemonNames = response.pokemon_names;
      this.shuffleAnswers(this.pokemonNames);
    })
  }

  getNextPokemon(): void {
    this.revealPokemon = false;
    this.apiService.getNextPokemon().subscribe((response: PokemonDetailsResponse) => {
      console.log("Data received...")
      this.pokemonId = response.pokemon_id;
      this.pokemonImage = response.pokemon_image;
      this.pokemonNames = response.pokemon_names;
      this.shuffleAnswers(this.pokemonNames);
    })
  }

  selectAnswer(answer: string): void {
    this.revealPokemon = true;
    // if( answer === this.pokemonName) this.totalScore++;
  }

  checkAnswerCorrect(answer: string): void {
    // if( answer !== this.pokemonName && this.revealPokemon ) {
    //   return "incorrect";
    // } else if( answer === this.pokemonName && this.revealPokemon ) {
    //   return "correct";
    // } else {
    //   return "";
    // }
  }

  shuffleAnswers(pokemon_names: string[]): string[] {
    let shuffledAnswers = pokemon_names.map(value => ({ value, sort: Math.random() }))
                                       .sort((i, j) => i.sort - j.sort)
                                       .map(({ value }) => value);
                                  
    return shuffledAnswers;
  }

  resetScore(): void {
    this.totalScore = 0;
  }
}
