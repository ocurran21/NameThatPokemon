import requests

pokemonapi_url = "https://pokeapi.co/api/v2/pokemon?limit=50"

def get_all_pokemon():
    return requests.get(pokemonapi_url)

pokemon_list_json = get_all_pokemon().json()

def get_pokemon(id):
    return requests.get(pokemon_list_json['results'][id]['url'])

pokemon_name = get_pokemon(30).json()['forms'][0]['name']
print(pokemon_name)