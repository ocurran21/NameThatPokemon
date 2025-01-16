export interface ApiResponse {
    pokemon_name: string,
    pokemon_image: string,
    wrong_answers: [
        wrong_answer1: string,
        wrong_answer2: string,
        wrong_answer3: string,
    ]
}