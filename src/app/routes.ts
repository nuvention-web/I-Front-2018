import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScentProfileCard } from './model/profile-card';
import { ProfileCardComponent } from './result-page/profile-card/profile-card.component';
import { SurveyComponent } from './survey/survey.component';
import { ResultPageComponent} from './result-page/result-page.component';
import { ResultComponent } from './result/result.component';

export const router: Routes = [
  { path: '', redirectTo: 'survey', pathMatch: 'full'},
  { path: 'survey', component: SurveyComponent },
  { path: 'card', component: ProfileCardComponent },
  { path: 'resultpage', component: ResultPageComponent },
  { path: 'result', component: ResultComponent}
]

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
