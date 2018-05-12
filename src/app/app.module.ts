import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Material
import { MatRadioModule, MatButtonModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { SurveyModule } from './survey/survey.module';
import { ProfileCardComponent } from './result-page/profile-card/profile-card.component';

// Service
import { SurveyResultService } from './service/survery-result.service';
import { routes } from './routes';

// pipe
import { SanitizerPipe } from './pipes/sanitizer.pipe';
import { ResultPageComponent } from './result-page/result-page.component';
import { ResultComponent } from './result/result.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfileCardComponent,
    SanitizerPipe,
    ResultPageComponent,
    ResultComponent,
  ],
  imports: [
    BrowserModule,
    MatRadioModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatInputModule,
    BrowserAnimationsModule,
    SurveyModule,
    routes,
  ],
  providers: [SurveyResultService],
  bootstrap: [AppComponent],
})
export class AppModule { }
