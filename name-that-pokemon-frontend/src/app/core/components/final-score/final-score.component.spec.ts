import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FinalScoreComponent } from './final-score.component';

describe('FinalScoreComponent', () => {
  let component: FinalScoreComponent;
  let fixture: ComponentFixture<FinalScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FinalScoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinalScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create final-score component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit when play again is clicked', () => {
    let emitted = false;
    component.playAgain.subscribe(() => emitted = true);
    
    component.onPlayAgainClick();
    expect(emitted).toBeTruthy();
  });
});
