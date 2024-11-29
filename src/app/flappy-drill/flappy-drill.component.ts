import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-flappy-drill',
  standalone: true,
  templateUrl: './flappy-drill.component.html',
  styleUrls: ['./flappy-drill.component.scss']
})
export class FlappyDrillComponent {
  @ViewChild('gameCanvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private birdX = 50;
  private birdY = 150;
  private birdVelocity = 0;
  private gravity = 0.2;
  private lift = -6;
  private pipes: { x: number; top: number; bottom: number }[] = [];
  private pipeWidth = 50;
  private pipeGap = 160;
  private pipeSpeed = 2;
  private score = 0;
  private gameRunning = false;
  private backgroundImage = new Image();
  private backgroundOffset = 0;
  private highscore = this.getHighscore();



constructor(private router: Router) {}

  ngOnInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d')!;
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());
    this.backgroundImage.src = '/assets/bg.png';

    this.backgroundImage.onload = () => {
      this.drawStartScreen();
    };
  }

  private resizeCanvas() {
    const canvas = this.canvas.nativeElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  @HostListener('window:resize')
  setCanvasSize() {
    const canvas = this.canvas.nativeElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  @HostListener('click')
  onClick() {
    if (!this.gameRunning) {
      this.startGame();
    } else {
      this.birdVelocity = this.lift;
    }
  }

  private startGame() {
    this.resetGame();
    this.gameRunning = true;
    this.spawnPipes();
    this.gameLoop();
  }

  private resetGame() {
    this.birdY = 150;
    this.birdVelocity = 0;
    this.pipes = [];
    this.score = 0;
    this.backgroundOffset = 0;
  }

  private gameLoop() {
    if (!this.gameRunning) return;

    this.update();
    this.draw();

    if (this.checkCollision()) {
      this.endGame();
    } else {
      requestAnimationFrame(() => this.gameLoop());
    }
  }

  private update() {
    // Update bird position
    this.birdVelocity += this.gravity;
    this.birdY += this.birdVelocity;

    // Update pipes
    for (const pipe of this.pipes) {
      pipe.x -= this.pipeSpeed;
    }

    // Remove old pipes and add new ones
    if (this.pipes[0].x + this.pipeWidth < 0) {
      this.pipes.shift();
      this.spawnPipe(window.innerWidth);
      this.score++;
    }

    // Update background position
    this.backgroundOffset -= this.pipeSpeed;
    if (this.backgroundOffset <= -this.canvas.nativeElement.width) {
      this.backgroundOffset = 0;
    }
  }

  private draw() {
    const canvas = this.canvas.nativeElement;
    const ctx = this.ctx;

    // Draw scrolling background
    ctx.drawImage(this.backgroundImage, this.backgroundOffset, 0, canvas.width / 0.3, canvas.height);
    ctx.drawImage(this.backgroundImage, this.backgroundOffset + canvas.width, 0, canvas.width / 0.3, canvas.height);

    // Draw pipes
    for (const pipe of this.pipes) {
      const pipeX = pipe.x;
      const pipeGradient = ctx.createLinearGradient(pipeX, 0, pipeX, canvas.height);
      pipeGradient.addColorStop(0, '#9e9e9e');
      pipeGradient.addColorStop(1, '#616161');
  
      ctx.fillStyle = pipeGradient;
      ctx.fillRect(pipe.x, 0, this.pipeWidth, pipe.top);
      ctx.fillRect(pipe.x, canvas.height - pipe.bottom, this.pipeWidth, pipe.bottom);
  
      ctx.strokeStyle = '#424242';
      ctx.lineWidth = 4;
      ctx.strokeRect(pipe.x, 0, this.pipeWidth, pipe.top);
      ctx.strokeRect(pipe.x, canvas.height - pipe.bottom, this.pipeWidth, pipe.bottom);
    }

    // Draw bird
    ctx.fillStyle = '#FFD700';
    ctx.beginPath();
    ctx.arc(this.birdX, this.birdY, 15, 0, Math.PI * 2);
    ctx.fill();

    // Draw score and highscore
    ctx.fillStyle = '#fff';
    ctx.font = '30px Arial';
    ctx.fillText(`Punktzahl: ${this.score}`, 85, 30);
    ctx.fillText(`Hohe Punktzahl: ${this.highscore}`, 125, 60);
  }

  private drawStartScreen() {
    const canvas = this.canvas.nativeElement;
    const ctx = this.ctx;

    ctx.drawImage(this.backgroundImage, 0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#fff';
    ctx.font = '30px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Klicken Sie zum Starten', canvas.width / 2, canvas.height / 2);
  }

  private checkCollision(): boolean {
    if (this.birdY < 0 || this.birdY > this.canvas.nativeElement.height) return true;

    for (const pipe of this.pipes) {
      if (
        this.birdX + 15 > pipe.x &&
        this.birdX - 15 < pipe.x + this.pipeWidth &&
        (this.birdY - 15 < pipe.top || this.birdY + 15 > this.canvas.nativeElement.height - pipe.bottom)
      ) {
        return true;
      }
    }
    return false;
  }

  private spawnPipes() {
    const pipeX = this.canvas.nativeElement.width;
    this.spawnPipe(pipeX);
    this.spawnPipe(pipeX + 200);
  }

  private spawnPipe(pipeX: number) {
    const pipeTopHeight = Math.random() * (this.canvas.nativeElement.height / 2) + 50;
    const pipeBottomHeight = this.canvas.nativeElement.height - pipeTopHeight - this.pipeGap;
    this.pipes.push({ x: pipeX, top: pipeTopHeight, bottom: pipeBottomHeight });
  }

  private endGame() {
    this.gameRunning = false;
    if (this.score > this.highscore) {
      this.highscore = this.score;
      this.setHighscore(this.highscore);
    }
    this.drawGameOverScreen();
  }

  private drawGameOverScreen() {
    const canvas = this.canvas.nativeElement;
    const ctx = this.ctx;

    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#fff';
    ctx.font = '25px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Spiel vorbei', canvas.width / 2, canvas.height / 2);
    ctx.fillText('Klicken Sie zum Wiederholen', canvas.width / 2, canvas.height / 2 + 60);

    // Add button for highscore
    ctx.fillText('Überprüfen Sie die Bestenliste', canvas.width / 2, canvas.height / 2 + 400);

    // Add an event listener to navigate to the leaderboard page
    canvas.addEventListener('click', (event) => {
      const x = event.offsetX;
      const y = event.offsetY;
  
      // Check if click is in the bottom half of the canvas
      if (y > canvas.height / 1.25) {
        this.router.navigate(['/leaderboard']); // Navigate to leaderboard
      }
    });
  }

  // Get highscore from cookie
  private getHighscore(): number {
    const cookie = document.cookie.split('; ').find(row => row.startsWith('highscore='));
    return cookie ? parseInt(cookie.split('=')[1], 10) : 0;
  }

  // Set highscore in cookie
  private setHighscore(score: number) {
    document.cookie = `highscore=${score}; path=/; max-age=${60 * 60 * 24 * 365}`;
  }
}
