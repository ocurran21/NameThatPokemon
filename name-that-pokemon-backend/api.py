import json
import requests
import random
from http.server import BaseHTTPRequestHandler, HTTPServer

pokemonapi_url = "https://pokeapi.co/api/v2/pokemon?limit=50"

def get_all_pokemon():
    return requests.get(pokemonapi_url)

pokemon_list_json = get_all_pokemon().json()

def get_random_pokemon():
    random_id = random.randint(0,50)
    return requests.get(pokemon_list_json['results'][random_id]['url']).json()

def get_other_pokemon():
    random_id = random.randint(0,50)
    return requests.get(pokemon_list_json['results'][random_id]['url']).json()

def get_wrong_pokemon_names(correct_name):
    wrong_answer1 = get_random_pokemon()
    while wrong_answer1 == correct_name:
         wrong_answer1 = get_random_pokemon()

    wrong_answer2 = get_random_pokemon()
    while ( wrong_answer2 == correct_name or wrong_answer2 == wrong_answer1 ):
         wrong_answer2 = get_random_pokemon()

    wrong_answer3 = get_random_pokemon()
    while ( wrong_answer3 == correct_name or wrong_answer3 == wrong_answer2 or wrong_answer3 == wrong_answer1 ):
         wrong_answer3 = get_random_pokemon()
    
    return [ get_pokemon_name(wrong_answer1), get_pokemon_name(wrong_answer2), get_pokemon_name(wrong_answer3) ]

def get_pokemon_name(pokemon_json):
    return pokemon_json['forms'][0]['name']   

def get_pokemon_image(pokemon_json):
    return pokemon_json['sprites']['front_default']

class RequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        random_pokemon = get_random_pokemon()
        correct_pokemon_name = get_pokemon_name(random_pokemon)

        self.send_response(200)
        self.send_header('Content-type', 'application/json') 
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        response = {
                        'pokemon_name': correct_pokemon_name,
                        'pokemon_image': get_pokemon_image(random_pokemon),
                        'wrong_answers': get_wrong_pokemon_names(correct_pokemon_name)
                   } 
        self.wfile.write(json.dumps(response).encode())

def run_server(): 
    server_address = ('', 8080)

    http_server = HTTPServer(server_address, RequestHandler)
    print('Starting HTTP server on port 8080...')
    http_server.serve_forever()

if __name__ == '__main__':
    run_server()
