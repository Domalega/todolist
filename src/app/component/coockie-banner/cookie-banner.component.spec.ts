import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CookieBannerComponent } from './coockie-banner.component';

describe('CoockieBannerComponent', () => {
  let component: CookieBannerComponent;
  let fixture: ComponentFixture<CookieBannerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CookieBannerComponent],
    });
    fixture = TestBed.createComponent(CookieBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
