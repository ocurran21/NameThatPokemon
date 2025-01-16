import { Component, OnInit } from '@angular/core';
import { ApiService } from './core/services/api.service';
import { ApiResponse } from './core/models/api-response.model';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [NgClass, NgIf]
})

export class AppComponent implements OnInit {
  pokemonName: string = ""
  pokemonImage: string = ""
  wrongAnswers: string[] = []
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
    })
  }

  getNextPokemon(): void {
    this.revealPokemon = false;
    this.getRandomPokemon()
  }

  answerButtonClick(): void {
    this.revealPokemon = true;
  }
}
