# NameThatPokemon

A simple web game of 'Who's that Pokemon?'.

## Description

This application is an Angular website which displays a game of 'Who's that Pokemon?'. A user is shown the silhouette of a random Pokemon and must guess the name of the Pokemon from a list of four names. Upon selecting an answer the user is shown the image of the Pokemon along with verification if their guess was correct or incorrect. The user gets a final score out of ten and can play again with a new set of random Pokemon. All pokemon data is retrieved from [Pokémon API](https://pokeapi.co/docs/v2) and processed using a backend API written in Python.

## Getting Started

### Frontend Dependencies

* Node.js >= v22.13.0
* Angular CLI >= 19.0.7
* npm >= 11.0.0

### Backend Dependencies
* Python >= v3.9.13
* pip >= v24.3.1
* Python Libraries listed in requirements.txt

### API Documentation
OpenAI Documentation on cutom Python API can be found at: https://ocurran21.github.io/NameThatPokemon/name-that-pokemon-backend/docs/swagger-ui/dist/ 

### Installing

* Clone the repository: 
   ```git clone https://github.com/ocurran21/NameThatPokemon.git```

#### Backend Installation
1. Open a terminal in the NameThatPokemon directory and navigate to the backend project directory:
    ```cd .\name-that-pokemon-backend\```
2. Install the required Python packages: 
    ```pip install -r requirements.txt``` 

#### Frontend Installation
1. Open a terminal in the NameThatPokemon directory and navigate to the frontend project directory:
    ```cd .\name-that-pokemon-frontend\```
2. Install the required npm packages: 
    ```npm install ```

### Executing program

* In the _name-that-pokemon-backend_ directory, start the backend api using:
    ```python api.py```
* In the _name-that-pokemon-frontend_ directory, start the frontend server using:
    ```ng serve```
* Open your browser and navigate to http://localhost:4200 to play 'Who's that Pokemon?'.

### Testing
* Run Python Unit tests using the command:
    ```python -m unittest discover```
* Run Angular Unit tests using the command:
    ```ng test```

### What I learned
* Create more Gener models for responses.
* Avoid globals so that API can be serverless.
* Add integration tests for APIs.
* Try to not applying styles to specific tags such as button (look into BEM methodology)
* Create an interface for the game state.
