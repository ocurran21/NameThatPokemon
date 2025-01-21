import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core"
import { catchError, Observable, throwError } from "rxjs";
import { PokemonDetailsResponse } from "../models/pokemon-details-response.model";
import { VerifyAnswerResponse } from "../models/verify-answer-response.model";

@Injectable({ 
    providedIn: 'root' 
})

export class ApiService {
    private backendApiUrl = "http://127.0.0.1:8080";

    constructor(private apiClient: HttpClient) { }

    getRandomPokemon(): Observable<PokemonDetailsResponse> {
        try {
            return this.apiClient.get<PokemonDetailsResponse>(`${this.backendApiUrl}/random-pokemon`).pipe( 
                catchError((error: HttpErrorResponse) => { 
                    return throwError(() => new Error('Error fetching random Pokémon' + error.message)); 
                 })
            );
        } catch (error) { 
            return throwError(() => new Error('An unexpected error occurred' + error)); 
        }
    }

    getNextPokemon(): Observable<PokemonDetailsResponse> {
        try {
            return this.apiClient.get<PokemonDetailsResponse>(`${this.backendApiUrl}/next-pokemon`).pipe( 
                catchError((error: HttpErrorResponse) => { 
                    return throwError(() => new Error('Error fetching next Pokémon' + error.message)); 
                 })
            );
        } catch (error) { 
            return throwError(() => new Error('An unexpected error occurred' + error)); 
        }
    }

    verifyAnswer(pokemonId: number, selectedAnswer: string): Observable<VerifyAnswerResponse> {
        const params = new HttpParams() 
             .set('pokemon_id', pokemonId.toString()) 
             .set('guessed_name', selectedAnswer);
            
        try {
            return this.apiClient.get<VerifyAnswerResponse>(`${this.backendApiUrl}/verify-pokemon`, { params }).pipe( 
                catchError((error: HttpErrorResponse) => { 
                    return throwError(() => new Error('Error whilst verifying Pokémon guess' + error.message)); 
                    })
            );
        } catch (error) { 
            return throwError(() => new Error('An unexpected error occurred' + error)); 
        }
    }
}