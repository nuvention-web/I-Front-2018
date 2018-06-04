import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FacebookModule } from 'ngx-facebook';

// Material
import { MatRadioModule, MatButtonModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// component
import { AppComponent } from './app.component';
import { SurveyModule } from './survey/survey.module';

// Service
import { SurveyResultService } from './service/survery-result.service';
import { routes } from './routes';

// pipe
import { SanitizerPipe } from './pipes/sanitizer.pipe';
import { ResultComponent } from './result/result.component';

@NgModule({
  declarations: [
    AppComponent,
    SanitizerPipe,
    ResultComponent,
  ],
  imports: [
    BrowserModule,
    MatRadioModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    MatInputModule,
    BrowserAnimationsModule,
    SurveyModule,
    FacebookModule.forRoot(),
    routes,
  ],
  providers: [SurveyResultService],
  bootstrap: [AppComponent],
})
export class AppModule { }
