import { Component, OnInit } from '@angular/core';
import { ApiService } from './core/services/api.service';
import { ApiResponse } from './core/models/api-response.model';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [NgClass]
})

export class AppComponent implements OnInit {
  pokemonName: string = ""
  pokemonImage: string = ""
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
    })
  }

  getNextPokemon(): void {
  
  }

  answerButtonClick(): void {
    this.revealPokemon = true;
  }
}
