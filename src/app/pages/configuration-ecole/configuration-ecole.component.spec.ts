import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationEcoleComponent } from './configuration-ecole.component';

describe('ConfigurationEcoleComponent', () => {
  let component: ConfigurationEcoleComponent;
  let fixture: ComponentFixture<ConfigurationEcoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigurationEcoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurationEcoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
