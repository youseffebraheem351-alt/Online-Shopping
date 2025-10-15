import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectorincComponent } from './electorinc.component';

describe('ElectorincComponent', () => {
  let component: ElectorincComponent;
  let fixture: ComponentFixture<ElectorincComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElectorincComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ElectorincComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
