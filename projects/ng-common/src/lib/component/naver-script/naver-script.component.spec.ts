import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NaverScriptComponent } from './naver-script.component';

describe('NaverScriptComponent', () => {
  let component: NaverScriptComponent;
  let fixture: ComponentFixture<NaverScriptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NaverScriptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NaverScriptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
