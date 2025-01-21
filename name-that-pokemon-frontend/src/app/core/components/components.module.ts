import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinalScoreComponent } from './final-score/final-score.component';
import { ApiService } from '../services/api.service';

@NgModule({
  declarations: [
    FinalScoreComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FinalScoreComponent
  ],
  providers: [
    ApiService
  ]
})
export class ComponentsModule { }