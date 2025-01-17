import json
import requests
import random
from collections import deque
from http.server import BaseHTTPRequestHandler, HTTPServer

pokemonapi_url = "https://pokeapi.co/api/v2/pokemon?limit=50"
pokemon_list_json = ''
pokemon_ids = deque()
other_pokemon_ids = deque()

def get_all_pokemon(api_url):
    return requests.get(api_url)

def get_pokemon(pokemon_id: int):
    return requests.get(pokemon_list_json['results'][pokemon_id]['url']).json()

def get_next_id():
    if len(pokemon_ids) == 0:
        reset_pokemon()
    return pokemon_ids.pop()

def get_random_pokemon_ids():
    random_pokemon_ids = random.sample(range(0,51), 10)

    for id in random_pokemon_ids: 
        pokemon_ids.append(id)

def get_incorrect_pokemon_names(correct_id):
    id_range = list(range(0,51))
    id_range.remove(correct_id)

    random_pokemon_ids = random.sample(id_range, 3)
    for id in random_pokemon_ids: 
        other_pokemon_ids.append(id)

    wrong_answer1 = get_pokemon_name(get_pokemon(other_pokemon_ids.pop()))
    wrong_answer2 = get_pokemon_name(get_pokemon(other_pokemon_ids.pop()))
    wrong_answer3 = get_pokemon_name(get_pokemon(other_pokemon_ids.pop()))

    return [ wrong_answer1, wrong_answer2, wrong_answer3 ]

def reset_pokemon():
    get_random_pokemon_ids()

def get_pokemon_name(pokemon_json):
    return pokemon_json['forms'][0]['name']   

def get_pokemon_image(pokemon_json):
    return pokemon_json['sprites']['front_default']

class RequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        correct_pokemon_id = get_next_id()
        random_pokemon = get_pokemon(correct_pokemon_id)

        self.send_response(200)
        self.send_header('Content-type', 'application/json') 
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        response = {
                        'pokemon_name': get_pokemon_name(random_pokemon),
                        'pokemon_image': get_pokemon_image(random_pokemon),
                        'wrong_answers': get_incorrect_pokemon_names(correct_pokemon_id)
                   } 
        self.wfile.write(json.dumps(response).encode())

def run_server(): 
    server_address = ('', 8080)

    http_server = HTTPServer(server_address, RequestHandler)
    print('Starting HTTP server on port 8080...')
    http_server.serve_forever()

if __name__ == '__main__':
    pokemon_list_json = get_all_pokemon(pokemonapi_url).json()
    get_random_pokemon_ids()
    run_server()