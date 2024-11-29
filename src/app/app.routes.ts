import { Routes } from '@angular/router';

import { Quizz1Component } from './quizz1/quizz1.component';
import { SpinningWheelComponent } from './spinning-wheel/spinning-wheel.component';
import { FlappyDrillComponent } from './flappy-drill/flappy-drill.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';

export const routes: Routes = [
  { path: 'quizz1', component: Quizz1Component }, 
  { path: 'spinning-wheel', component: SpinningWheelComponent },
  { path: 'flappy', component: FlappyDrillComponent },
  { path: 'leaderboard', component: LeaderboardComponent },
  { path: '', redirectTo: '/quizz1', pathMatch: 'full' } 
];
