import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScentProfileCard } from './model/profile-card';
import { ProfileCardComponent } from './profile-card/profile-card.component';
import { SurveyComponent } from './survey/survey.component';

export const router: Routes = [
  { path: '', redirectTo: 'survey', pathMatch: 'full'},
  { path: 'survey', component: SurveyComponent },
  { path: 'card', component: ProfileCardComponent },
]

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
