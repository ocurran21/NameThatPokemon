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

  });

  describe('onIncrementScore()', () => {
    it('if score is 0 then score should be 1', () => {
        component.totalScore = 0;
        component.onIncrementScore()
        let result = component.totalScore;
        expect(result).toBe(1);
    });

    it('if score is 15 then score should be 16', () => {
        component.totalScore = 15;
        component.onIncrementScore()
        let result = component.totalScore;
        expect(result).toBe(16);
    });
  });

  describe('onGameComplete()', () => {

  });

  describe('onPlayAgain()', () => {

  });
});