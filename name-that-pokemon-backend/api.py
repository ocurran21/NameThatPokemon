import json
import requests
import random
from collections import deque
from http.server import BaseHTTPRequestHandler, HTTPServer

pokemonapi_url = "https://pokeapi.co/api/v2/pokemon?limit=50"
pokemon_list_json = ''
pokemon_ids = deque()
answers_pokemon_ids = deque()
correct_pokemon = ''

def get_all_pokemon(api_url):
    return requests.get(api_url)

def get_pokemon(pokemon_id: int):
    return requests.get(pokemon_list_json['results'][pokemon_id-1]['url']).json()

def get_random_pokemon_ids():
    pokemon_ids.clear()
    random_pokemon_ids = random.sample(range(0,50), 10)

    for id in random_pokemon_ids: 
        pokemon_ids.append(id)

def get_answers(correct_pokemon_id):
    correct_answer = get_pokemon_name(get_pokemon(correct_pokemon_id))
    print('answer:',correct_answer)

    id_range = list(range(0,50))
    id_range.remove(correct_pokemon_id)
    random_pokemon_ids = random.sample(id_range, 4)

    for id in random_pokemon_ids: 
        answers_pokemon_ids.append(id)
    
    wrong_answer1 = get_pokemon_name(get_pokemon(answers_pokemon_ids.pop()))
    wrong_answer2 = get_pokemon_name(get_pokemon(answers_pokemon_ids.pop()))
    wrong_answer3 = get_pokemon_name(get_pokemon(answers_pokemon_ids.pop()))

    return [ correct_answer, wrong_answer1, wrong_answer2, wrong_answer3 ]

def get_pokemon_name(pokemon_json):
    return pokemon_json['forms'][0]['name']   

def get_pokemon_image(pokemon_json):
    return pokemon_json['sprites']['front_default']

def check_answer_correct():
    return True

def random_pokemon_details():
    get_random_pokemon_ids()
    correct_pokemon_id = pokemon_ids.pop()
    print('correct_pokemon_id:',correct_pokemon_id)
    correct_pokemon = get_pokemon(correct_pokemon_id)
    print('first pokemon:',get_pokemon_image(correct_pokemon))
    print('first pokemon:',get_pokemon_name(correct_pokemon))
    response = {
                        'pokemon_id' : correct_pokemon_id,
                        'pokemon_image': get_pokemon_image(correct_pokemon),
                        'pokemon_names': get_answers(correct_pokemon_id)
               }  
    return response

def next_pokemon_details():
    correct_pokemon_id = pokemon_ids.pop()
    print('correct_pokemon_id:',correct_pokemon_id)
    correct_pokemon = get_pokemon(correct_pokemon_id)
    print('first pokemon:',get_pokemon_image(correct_pokemon))
    print('first pokemon:',get_pokemon_name(correct_pokemon))
    response = {
                        'pokemon_id' : correct_pokemon_id,
                        'pokemon_image': get_pokemon_image(correct_pokemon),
                        'pokemon_names': get_answers(correct_pokemon_id)
               }  

    return response

def verify_pokemon_details():
    response = {
                        # 'correct_pokemon_name' : get_pokemon_name(correct_pokemon),
                        # 'answer_correct': check_answer_correct()
               }  

    return response

class RequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        split_path = self.path.split('/')
        endpoint = split_path[1]

        endpoint_handlers = { 
            'random-pokemon': random_pokemon_details(), 
            'next-pokemon': next_pokemon_details(), 
            'verify-pokemon': verify_pokemon_details()
        }

        response = endpoint_handlers.get(endpoint)

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
    pokemon_list_json = get_all_pokemon(pokemonapi_url).json()
    run_server()