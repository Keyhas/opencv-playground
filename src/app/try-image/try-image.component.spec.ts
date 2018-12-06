import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TryImageComponent } from './try-image.component';

describe('TryImageComponent', () => {
  let component: TryImageComponent;
  let fixture: ComponentFixture<TryImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TryImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TryImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
