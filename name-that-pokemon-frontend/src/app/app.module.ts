import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import { ServicesModule } from './core/services/services.module';
import { CommonModule } from '@angular/common';
import { FinalScoreComponent } from './core/components/final-score/final-score.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ServicesModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
