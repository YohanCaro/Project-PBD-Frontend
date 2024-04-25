import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharsViewComponent } from './chars-view.component';

describe('CharsViewComponent', () => {
  let component: CharsViewComponent;
  let fixture: ComponentFixture<CharsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharsViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CharsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
