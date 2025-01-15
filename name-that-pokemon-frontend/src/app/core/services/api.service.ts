import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core"
import { Observable } from "rxjs";
import { ApiResponse } from "../models/api-response.model";

@Injectable({ 
    providedIn: 'root' 
})

export class ApiService {
    private backendApiUrl = "http://127.0.0.1:8080";

    constructor(private apiClient: HttpClient) { }

    getPokemonData(): Observable<ApiResponse> {
        return this.apiClient.get<ApiResponse>(this.backendApiUrl);
    }
}