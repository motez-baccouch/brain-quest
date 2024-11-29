import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlappyDrillComponent } from './flappy-drill.component';

describe('FlappyDrillComponent', () => {
  let component: FlappyDrillComponent;
  let fixture: ComponentFixture<FlappyDrillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlappyDrillComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FlappyDrillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
