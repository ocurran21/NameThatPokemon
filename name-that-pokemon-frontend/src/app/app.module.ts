import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ServicesModule } from './core/services/services.module';
import { CommonModule } from '@angular/common';
import { ApiService } from './core/services/api.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ServicesModule,
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})

export class AppModule { }
