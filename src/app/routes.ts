import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScentProfileCard } from './model/profile-card';
import { SurveyComponent } from './survey/survey.component';
import { ResultComponent } from './result/result.component';

export const router: Routes = [
  { path: '', redirectTo: 'survey', pathMatch: 'full'},
  { path: 'survey', component: SurveyComponent },
  { path: 'result', component: ResultComponent}
]

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
