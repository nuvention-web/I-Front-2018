import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Material
import { MatRadioModule, MatButtonModule } from '@angular/material';

import { AppComponent } from './app.component';
import { SurveyComponent } from './survey/survey.component';
import { ProfileCardComponent } from './profile-card/profile-card.component';

// Service
import { SurveyResultService } from './service/survery-result.service';
import { routes } from './routes';


@NgModule({
  declarations: [
    AppComponent,
    SurveyComponent,
    ProfileCardComponent,
  ],
  imports: [
    BrowserModule,
    MatRadioModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    routes,
  ],
  providers: [SurveyResultService],
  bootstrap: [AppComponent],
})
export class AppModule { }
