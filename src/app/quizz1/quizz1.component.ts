import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quizz1',
  standalone: true,
  templateUrl: './quizz1.component.html',
  styleUrls: ['./quizz1.component.scss'],
  imports: [CommonModule]
})
export class Quizz1Component {
  score = 0; 
  questionIndex = 0;
  questions = [
    {
      question: "1. Wie hoch ist die Mammuth-Achterbahn im Erlebnispark Tripsdrill?",
      options: ['30 Meter', '22 Meter', '25 Meter', '35 Meter'],
      correctAnswer: '22 Meter'
    },
    {
      question: "2. Welches Tierpark gehört zu Tripsdrill?",
      options: ['Serengeti-Park', 'Wildparadies', 'Tiergarten Nürnberg', 'Wilhelma'],
      correctAnswer: 'Wildparadies'
    }
  ];

  selectedOption: string | null = null;
  isCorrect: boolean | null = null;

  constructor(private router: Router) {}

  selectOption(option: string) {
    this.selectedOption = option;
    this.isCorrect = option === this.questions[this.questionIndex].correctAnswer;

    if (this.isCorrect) {
      this.score++; 
    }

    setTimeout(() => {
      this.nextQuestion();
    }, 1000); 
  }

  nextQuestion() {
    if (this.questionIndex < this.questions.length - 1) {
      this.questionIndex++;
      this.selectedOption = null;
      this.isCorrect = null;
    } else {
      this.checkScore();
    }
  }

  checkScore() {
    if (this.score === 0) {
     // this.router.navigate(['/better-luck-next-time']);
    } else if (this.score > 0) {
      this.router.navigate(['/spinning-wheel']); 
    } else {
      alert(`Quiz completed! Your final score is: ${this.score}`);
    }
  }
}
