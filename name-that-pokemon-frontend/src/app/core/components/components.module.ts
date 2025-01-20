import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinalScoreComponent } from './final-score/final-score.component';

@NgModule({
  declarations: [
    FinalScoreComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FinalScoreComponent
  ]
})
export class ComponentsModule { }