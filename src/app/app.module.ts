import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Material
import { MatRadioModule, MatButtonModule } from '@angular/material';

import { AppComponent } from './app.component';
import { SurveyComponent } from './survey/survey.component';

// Service
import { SuveryResultService } from './service/suvery-result.service';


@NgModule({
  declarations: [
    AppComponent,
    SurveyComponent
  ],
  imports: [
    BrowserModule,
    MatRadioModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
  ],
  providers: [SuveryResultService],
  bootstrap: [AppComponent]
})
export class AppModule { }
