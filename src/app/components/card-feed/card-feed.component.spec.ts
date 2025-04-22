import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardFeedComponent } from './card-feed.component';

describe('CardFeedComponent', () => {
  let component: CardFeedComponent;
  let fixture: ComponentFixture<CardFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardFeedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
