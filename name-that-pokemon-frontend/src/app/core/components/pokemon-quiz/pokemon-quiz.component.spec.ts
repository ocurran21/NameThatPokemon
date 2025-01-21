import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonQuizComponent } from './pokemon-quiz.component';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ApiService } from '@app/core/services/api.service';
import { ShuffleArrayService } from '@app/core/services/shuffle-array.service';

describe('PokemonQuizComponent', () => {
  let component: PokemonQuizComponent;
  let fixture: ComponentFixture<PokemonQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
     imports: [
                 PokemonQuizComponent, 
                 FormsModule
             ], 
             providers: [
                 ApiService, 
                 ShuffleArrayService,
                 provideHttpClient()
             ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonQuizComponent);
    component = fixture.componentInstance;

    component.currentPokemon = { 
        pokemon_id: 24, 
        pokemon_image: 'placeholder.png', 
        pokemon_names: ["Lucario", "Charmander", "Bulbasaur", "Squirtle"]
    }

    fixture.detectChanges();
  });

  it('should create pokemon-quiz component', () => {
    expect(component).toBeTruthy();
  });

  describe('selectAnswer()', () => {

  });

  describe('selectedAnswerStyle()', () => {
    it('', () => {
       
    });
  });

  describe('revealCorrectAnswer()', () => {
    it('should return "correct" if answer equals correctName and revealPokemon is true', () => {
       component.correctName = "Lucario";
       component.revealPokemon = true;

       let result = component.revealCorrectAnswer("Lucario");
       expect(result).toBe("correct");
    });

    it('should return "" if answer does not equal correctName and revealPokemon is true', () => {
       component.correctName = "Lucario";
       component.revealPokemon = true;

       let result = component.revealCorrectAnswer("Magikarp");
       expect(result).toBe("");
    });

    it('should return "" if answer does equals correctName and revealPokemon is false', () => {
        component.correctName = "Lucario";
        component.revealPokemon = false;
 
        let result = component.revealCorrectAnswer("Lucario");
        expect(result).toBe("");
    });
  });

  describe('isResetGameResponse()', () => {

  });

  describe('onNextClick()', () => {

  });

  describe('onGameComplete()', () => {

  });

  describe('onIncrementScore()', () => {

  });
});