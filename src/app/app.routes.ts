import { Routes } from '@angular/router';
import { Quizz1Component } from './quizz1/quizz1.component';

export const routes: Routes = [
  { path: 'quizz1', component: Quizz1Component }, 
  { path: '', redirectTo: '/quizz1', pathMatch: 'full' } 
];
