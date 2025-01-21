import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ApiService } from './core/services/api.service';
import { ShuffleArrayService } from './core/services/shuffle-array.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [
            AppComponent, 
            FormsModule
        ], 
        providers: [
            ApiService, 
            ShuffleArrayService,
            provideHttpClient()
        ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create app component', () => {
    expect(component).toBeTruthy();
  });

  describe('getRandomPokemon()', () => {
    it('should set totalScore to 0 and showFinalScore to false', () => {
      component.totalScore = 11;
      component.showFinalScore = true;

      component.getRandomPokemon();

      expect(component.totalScore).toBe(0); 
      expect(component.showFinalScore).toBeFalsy();
    })
  });

  describe('onIncrementScore()', () => {
    it('should be 1 if score was 0', () => {
        component.totalScore = 0;
        component.onIncrementScore()
        let result = component.totalScore;
        expect(result).toBe(1);
    });

    it('should be 16 if score was 15', () => {
        component.totalScore = 15;
        component.onIncrementScore()
        let result = component.totalScore;
        expect(result).toBe(16);
    });
  });

  describe('onGameComplete()', () => {
    it('showFinalScore should be set to true', () => {
      component.showFinalScore
      component.onGameComplete();
      let result = component.showFinalScore;
      expect(result).toBeTruthy();
    });
  });
});