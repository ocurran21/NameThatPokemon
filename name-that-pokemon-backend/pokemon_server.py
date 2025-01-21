import json
import random
from collections import deque
from http.server import BaseHTTPRequestHandler, HTTPServer
from config import MAX_POKEMON, POKEMONAPI_URL

import requests

ALL_POKEMON_IDS = deque()
ANSWERS_POKEMON_IDS = deque()

pokemon_list_json = ''
correct_pokemon = ''

def get_all_pokemon(api_url):
    return requests.get(api_url)

def get_pokemon(pokemon_id: int):
    if pokemon_id:
        return requests.get(pokemon_list_json['results'][pokemon_id-1]['url']).json()
    else :
        return ""

def get_random_pokemon_ids():
    ALL_POKEMON_IDS.clear()
    random_pokemon_ids = random.sample(range(1,MAX_POKEMON + 1), 10)

    for id in random_pokemon_ids: 
        ALL_POKEMON_IDS.append(id)

def get_answers(correct_pokemon_id):
    correct_answer = get_pokemon_name(get_pokemon(correct_pokemon_id))

    id_range = list(range(1,MAX_POKEMON + 1))
    id_range.remove(correct_pokemon_id)
    random_pokemon_ids = random.sample(id_range, 4)

    for id in random_pokemon_ids: 
        ANSWERS_POKEMON_IDS.append(id)
    
    wrong_answer1 = get_pokemon_name(get_pokemon(ANSWERS_POKEMON_IDS.pop()))
    wrong_answer2 = get_pokemon_name(get_pokemon(ANSWERS_POKEMON_IDS.pop()))
    wrong_answer3 = get_pokemon_name(get_pokemon(ANSWERS_POKEMON_IDS.pop()))

    return [ correct_answer, wrong_answer1, wrong_answer2, wrong_answer3 ]

def get_pokemon_name(pokemon_json):
    if pokemon_json :
        return pokemon_json['forms'][0]['name']   
    else :
        return ""
 
def get_pokemon_image(pokemon_json):
    return pokemon_json['sprites']['front_default']

def check_answer_correct(guessed_name, correct_pokemon):
    print(guessed_name, get_pokemon_name(correct_pokemon))
    return guessed_name == get_pokemon_name(correct_pokemon)

def random_pokemon_details():
    get_random_pokemon_ids()
    correct_pokemon_id = ALL_POKEMON_IDS.pop()
    global correct_pokemon 
    correct_pokemon = get_pokemon(correct_pokemon_id)

    response = {
                    'pokemon_id' : correct_pokemon_id,
                    'pokemon_image': get_pokemon_image(correct_pokemon),
                    'pokemon_names': get_answers(correct_pokemon_id)
               }  

    return response

def next_pokemon_details():
    if len(ALL_POKEMON_IDS) > 0:
        try:
            correct_pokemon_id = ALL_POKEMON_IDS.pop()
            global correct_pokemon 
            correct_pokemon = get_pokemon(correct_pokemon_id)
            response = {
                        'pokemon_id' : correct_pokemon_id,
                        'pokemon_image': get_pokemon_image(correct_pokemon),
                        'pokemon_names': get_answers(correct_pokemon_id)
                    }  
        except (IndexError) as exception:   
              response = {"error": "Invalid parameters or parameter values"} 
    else:
        return { "reset": True }

    return response

def verify_pokemon_details(guessed_name):
    response = {
                    'correct_pokemon_name' : get_pokemon_name(correct_pokemon),
                    'answer_correct': check_answer_correct(guessed_name, correct_pokemon)
               }  
    
    return response

class RequestHandler(BaseHTTPRequestHandler):
    guessed_name = ""
    
    def do_GET(self):
        split_path = self.path.split('/')
        endpoint = split_path[1]

        if 'random-pokemon' in endpoint: 
            response = random_pokemon_details() 
        elif 'next-pokemon' in endpoint: 
            response = next_pokemon_details() 
        elif 'verify-pokemon' in endpoint: 
            try: 
                params = self.path.split('?') 
                split_params = params[1].split('&') 
                guessed_name = split_params[1].split('=')[1] 
                response = verify_pokemon_details(guessed_name) 
            except (IndexError) as exception: 
                response = {"error": "Invalid parameters or parameter values"} 
        else: response = {"error": "Invalid endpoint"}

        self.send_response(200)
        self.send_header('Content-type', 'application/json') 
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        
        self.wfile.write(json.dumps(response).encode())

def run_server(): 
    server_address = ('', 8080)

    http_server = HTTPServer(server_address, RequestHandler)
    print('Starting HTTP server on port 8080...')
    http_server.serve_forever()

if __name__ == '__main__':
    pokemon_list_json = get_all_pokemon(POKEMONAPI_URL).json()
    run_server()