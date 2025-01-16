import json
import requests
from http.server import BaseHTTPRequestHandler, HTTPServer

pokemonapi_url = "https://pokeapi.co/api/v2/pokemon?limit=50"

def get_all_pokemon():
    return requests.get(pokemonapi_url)

pokemon_list_json = get_all_pokemon().json()

def get_pokemon(id):
    return requests.get(pokemon_list_json['results'][id]['url'])

# pokemon_name = get_pokemon(2).json()['forms'][0]['name']
# pokemon_image = get_pokemon(2).json()['sprites']['front_default']
# print(pokemon_name)
# print(pokemon_image)
name = get_pokemon(10).json()['forms'][0]['name']
image = get_pokemon(10).json()['sprites']['front_default']

class RequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json') 
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        response = {
                        'pokemon_name': name,
                        'pokemon_image': image
                   } 
        self.wfile.write(json.dumps(response).encode())

def run_server(): 
    server_address = ('', 8080)

    http_server = HTTPServer(server_address, RequestHandler)
    print('Starting HTTP server on port 8080...')
    http_server.serve_forever()

if __name__ == '__main__':
    run_server()
