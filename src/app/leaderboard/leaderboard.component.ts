import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; // Add this import

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss'],
  standalone: true,
  imports: [CommonModule, HttpClientModule], // Include HttpClientModule here
})
export class LeaderboardComponent implements OnInit {
  leaderboard: { rank: number; name: string; score: number; color: string }[] = [];
  timeLeft: number = 3600000; // Countdown time in milliseconds (1 hour)
  highscore: number = 0; // Store highscore
  userColor: string = "#FFD700"; // Color for your name
  userName: string = "Yadi"; // Your name in the leaderboard

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Get the highscore from the cookie or local storage
    this.highscore = this.getHighscore();

    // Load leaderboard data from JSON
    this.http.get<{ name: string; score: number; color: string }[]>('/assets/leaderboard.json')
      .subscribe((data) => {
        // Add your score to the leaderboard and sort
        this.leaderboard = [
          ...data.map((item, index) => ({
            ...item,
            rank: index + 1,
          })),
          {
            rank: 1,
            name: this.userName,
            score: this.highscore,
            color: this.userColor,
          },
        ].sort((a, b) => b.score - a.score || a.name.localeCompare(b.name));
      });

    // Countdown timer logic (1 second interval)
    interval(1000).subscribe(() => {
      if (this.timeLeft > 0) {
        this.timeLeft -= 1000; // Decrease time
      } else {
        this.timeLeft = 0; // Ensure the countdown does not go below 0
      }
    });
  }

  // Helper method to display countdown time in mm:ss format
  formatTime(ms: number): string {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  // Function to retrieve highscore from cookie or local storage
  private getHighscore(): number {
    const cookie = document.cookie.split('; ').find(row => row.startsWith('highscore='));
    return cookie ? parseInt(cookie.split('=')[1], 10) : 0;
  }
}
