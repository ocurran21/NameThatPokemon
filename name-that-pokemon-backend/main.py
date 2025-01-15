import requests

pokemonapi_url = "https://pokeapi.co/api/v2/pokemon/ditto"

pokemonapi_response = requests.get(pokemonapi_url)
response_json = pokemonapi_response.json()
pokemon_name = response_json['forms'][0]['name']
print(pokemon_name)