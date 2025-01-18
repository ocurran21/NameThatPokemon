import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core"
import { Observable } from "rxjs";
import { PokemonDetailsResponse } from "../models/pokemon-details-response.model";
import { VerifyAnswerResponse } from "../models/verify-answer-response.model";

@Injectable({ 
    providedIn: 'root' 
})

export class ApiService {
    private backendApiUrl = "http://127.0.0.1:8080";

    constructor(private apiClient: HttpClient) { }

    getRandomPokemon(): Observable<PokemonDetailsResponse> {
        return this.apiClient.get<PokemonDetailsResponse>(`${this.backendApiUrl}/random-pokemon`);
    }

    getNextPokemon(): Observable<PokemonDetailsResponse> {
        return this.apiClient.get<PokemonDetailsResponse>(`${this.backendApiUrl}/next-pokemon`);
    }

    verifyAnswer(): Observable<VerifyAnswerResponse> {
        return this.apiClient.get<VerifyAnswerResponse>(`${this.backendApiUrl}/verify-pokemon`);
    }
}