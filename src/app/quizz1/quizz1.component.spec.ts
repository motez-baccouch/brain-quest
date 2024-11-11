import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Quizz1Component } from './quizz1.component';

describe('Quizz1Component', () => {
  let component: Quizz1Component;
  let fixture: ComponentFixture<Quizz1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Quizz1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Quizz1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
