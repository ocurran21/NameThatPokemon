# NameThatPokemon

A simple web game of 'Who's that Pokemon?'.

## Description

This application is an Angular website which displays a game of 'Who's that Pokemon?'. A user is shown the silhouette of a random Pokemon and must guess the name of the POkemon from a list of four names. Upon selecting an answer the user is shown the image of the Pokemon along with verification if their guess was correct or incorrect. The user gets a final score out of ten and can play again with a new set of random Pokemon. All pokemon data is retrieved from [Pokémon API](https://pokeapi.co/docs/v2) and processed using a backend API written in Python.

## Getting Started

### Frontend Dependencies

* Node.js
* Angular CLI
* npm

### Backend Dependencies
* Python
* pip
* Python Libraries listed in requirements.txt

### Installing

* Clone the repository: 
   ```bash git clone https://github.com/ocurran21/NameThatPokemon.git```

#### Backend Installation
1. Open a terminal in the NameThatPokemon directory and navigate to the backend project directory:
    ```bash cd .\name-that-pokemon-backend\```
2. Install the required Python packages: 
    ```bash pip install -r requirements.txt``` 

#### Frontend Installation
1. Open a terminal in the NameThatPokemon directory and navigate to the frontend project directory:
    ```bash cd .\name-that-pokemon-frontend\```
2. Install the required npm packages: 
    ```bash npm install ```

### Executing program

* In the _name-that-pokemon-backend_ directory, start the backend api using:
    ```bash python api.py```
* In the _name-that-pokemon-frontend_ directory, start the frontend server using:
    ```bash ng serve```
* Open your browser and navigate to http://localhost:4200 to play 'Who's that Pokemon?'.

### Testing
* Run Python Unit tests using the command:
    ```bash python -m unittest discover```
* Run Angular Unit tests using the command:
    ```bash ng test```