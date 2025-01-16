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
    return requests.get(pokemon_list_json['results'][random_id]['url'])

class RequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        random_pokemon = get_random_pokemon().json()
        self.send_response(200)
        self.send_header('Content-type', 'application/json') 
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        response = {
                        'pokemon_name': random_pokemon['forms'][0]['name'],
                        'pokemon_image': random_pokemon['sprites']['front_default']
                   } 
        self.wfile.write(json.dumps(response).encode())

def run_server(): 
    server_address = ('', 8080)

    http_server = HTTPServer(server_address, RequestHandler)
    print('Starting HTTP server on port 8080...')
    http_server.serve_forever()

if __name__ == '__main__':
    run_server()
