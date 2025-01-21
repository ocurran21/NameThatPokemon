import unittest
from pokemon_server import PokemonGame

class TestPokemonGame(unittest.TestCase):
    
    def setUp(self):
        self.game = PokemonGame()
        NUM_QUESTIONS = 10
        self.game.pokemon_list_json = {
            'results': [{'url': f'https://pokeapi.co/api/v2/pokemon/{i}'} for i in range(1, NUM_QUESTIONS + 1)]
        }

    def test_get_pokemon(self):
        pokemon = self.game.get_pokemon(1)
        self.assertEqual(pokemon['forms'][0]['name'], 'bulbasaur')
        self.assertEqual(pokemon['sprites']['front_default'], 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png')

    def test_get_random_pokemon_ids(self):
        self.game.get_random_pokemon_ids()
        NUM_QUESTIONS = 10
        self.assertEqual(len(self.game.all_pokemon_ids), NUM_QUESTIONS)
        unique_ids = set(self.game.all_pokemon_ids)
        self.assertEqual(len(unique_ids), NUM_QUESTIONS)

    def test_verify_pokemon_details(self):
        self.game.correct_pokemon = {
            'forms': [{'name': 'pikachu'}]
        }

        result = self.game.verify_pokemon_details('pikachu')
        self.assertTrue(result['answer_correct'])
        self.assertEqual(result['correct_pokemon_name'], 'pikachu')

        result = self.game.verify_pokemon_details('charmander')
        self.assertFalse(result['answer_correct'])
        self.assertEqual(result['correct_pokemon_name'], 'pikachu')

if __name__ == '__main__':
    unittest.main()