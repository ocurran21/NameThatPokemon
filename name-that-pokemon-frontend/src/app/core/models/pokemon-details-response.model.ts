export interface PokemonDetailsResponse {   
    'pokemon_id' : number,
    'pokemon_image': string,
    'pokemon_names': [
        correct_answer: string,
        wrong_answer1: string,
        wrong_answer2: string,
        wrong_answer3: string
    ]
}