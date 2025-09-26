import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopDetailComponent } from './workshop-detail.component';

describe('WorkshopDetail', () => {
  let component: WorkshopDetailComponent;
  let fixture: ComponentFixture<WorkshopDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkshopDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkshopDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
