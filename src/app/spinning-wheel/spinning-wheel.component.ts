import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-spinning-wheel',
  standalone: true,
  templateUrl: './spinning-wheel.component.html',
  styleUrls: ['./spinning-wheel.component.scss'],
  imports: [CommonModule]
})
export class SpinningWheelComponent {
  options = ['Preis 1', 'Preis 2', 'Preis 3', 'Preis 4', 'Preis 5', 'Preis 6'];
  selectedOption: string | null = null;
  wheelRotation = 'rotate(0deg)';
  isSpinning = false;
  showQRCode = false; 

  spinWheel() {
    if (this.isSpinning) return; 
    this.isSpinning = true;
    const randomDegree = Math.floor(360 * 5 + Math.random() * 360); 
    this.wheelRotation = `rotate(${randomDegree}deg)`;
    
    const selectedIndex = this.calculateSelectedIndex(randomDegree);
    this.selectedOption = this.options[selectedIndex];

    setTimeout(() => {
      this.showQRCode = true;
      this.isSpinning = false;
    }, 4000); 
  }

  calculateSelectedIndex(degrees: number) {
    const segmentDegree = 360 / this.options.length;
    const normalizedDegrees = degrees % 360;
    return Math.floor((360 - normalizedDegrees) / segmentDegree) % this.options.length;
  }

  getSegmentStyle(index: number) {
    const segmentDegree = 360 / this.options.length;
    return {
      transform: `rotate(${index * segmentDegree}deg)`,
    };
  }
}
