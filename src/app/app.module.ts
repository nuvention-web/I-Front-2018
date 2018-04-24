import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Material
import { MatRadioModule, MatButtonModule } from '@angular/material';

import { AppComponent } from './app.component';
import { SurveyModule } from './survey/survey.module';
import { ProfileCardComponent } from './profile-card/profile-card.component';

// Service
import { SurveyResultService } from './service/survery-result.service';
import { routes } from './routes';

// pipe
import { SanitizerPipe } from './pipes/sanitizer.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ProfileCardComponent,
    SanitizerPipe,
  ],
  imports: [
    BrowserModule,
    MatRadioModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    SurveyModule,
    routes,
  ],
  providers: [SurveyResultService],
  bootstrap: [AppComponent],
})
export class AppModule { }
