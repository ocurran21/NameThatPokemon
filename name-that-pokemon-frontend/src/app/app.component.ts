import { Component, OnInit } from '@angular/core';
import { ApiService } from './core/services/api.service';
import { ApiResponse } from './core/models/api-response.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit {
  testText:string = ""
  testImage:string = ""
  title = 'name-that-pokemon-frontend';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
      this.apiService.getPokemonData().subscribe((response: ApiResponse) => {
        console.log("Data received...")
        this.testText = response.pokemon_name;
        this.testImage = response.pokemon_image;
        console.log(response.pokemon_name);
      })
  }
}
