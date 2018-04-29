import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';
import {MatInputModule} from '@angular/material/input';
import { SurveyComponent } from './survey.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatRadioModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  declarations: [
    SurveyComponent
  ],
  providers: [
  ]
})

export class SurveyModule { }
