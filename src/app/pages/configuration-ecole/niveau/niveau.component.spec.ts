import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {FormBuilder, FormGroup} from  '@angular/forms' ;
import {MatFormFieldModule} from '@angular/material/form-field';

import { NiveauComponent } from './niveau.component';

describe('NiveauComponent', () => {
  let component: NiveauComponent;
  let fixture: ComponentFixture<NiveauComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NiveauComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NiveauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
