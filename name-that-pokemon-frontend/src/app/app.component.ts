import { Component, OnInit } from '@angular/core';
import { ApiService } from './core/services/api.service';
import { ApiResponse } from './core/models/api-response.model';
import { NgClass, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [NgClass, NgIf, NgFor]
})

export class AppComponent implements OnInit {
  pokemonName: string = ""
  pokemonImage: string = ""
  wrongAnswers: string[] = []
  shuffledAnswers: string[] = []
  revealPokemon: boolean = false;

  title = 'name-that-pokemon-frontend';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.revealPokemon = false;
    this.getRandomPokemon();
  }

  getRandomPokemon(): void {
    this.apiService.getPokemonData().subscribe((response: ApiResponse) => {
      console.log("Data received...")
      this.pokemonName = response.pokemon_name;
      this.pokemonImage = response.pokemon_image;
      this.wrongAnswers = response.wrong_answers;
      this.shuffleAnswers();
    })
  }

  getNextPokemon(): void {
    this.revealPokemon = false;
    this.getRandomPokemon()
  }

  selectAnswer(): void {
    this.revealPokemon = true;
  }

  checkAnswerCorrect(answer:string): string {
    if( answer !== this.pokemonName && this.revealPokemon ) {
      return "incorrect";
    } else if( answer === this.pokemonName && this.revealPokemon ) {
      return "correct";
    } else {
      return "";
    }
  }

  shuffleAnswers(): void {
    let allAnswers: string[] = this.wrongAnswers;
    allAnswers.push(this.pokemonName);

    this.shuffledAnswers = allAnswers.map(value => ({ value, sort: Math.random() }))
                                     .sort((i, j) => i.sort - j.sort)
                                     .map(({ value }) => value);
  }
}
