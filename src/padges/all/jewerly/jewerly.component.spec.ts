import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JewerlyComponent } from './jewerly.component';

describe('JewerlyComponent', () => {
  let component: JewerlyComponent;
  let fixture: ComponentFixture<JewerlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JewerlyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JewerlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
