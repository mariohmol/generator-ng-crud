import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
<% if (props.ui === 'ionic') { -%>
import { FormsModule } from '@angular/forms';
import { IonicModule, LoadingController, Platform } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
<% } else if (props.ui === 'bootstrap') { -%>
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
<% } else if (props.ui === 'material') { -%>
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
<% } -%>

import { CoreModule } from '@app/core';
<% if (props.ui === 'material') { -%>
import { SharedModule } from '@app/shared';
import { MaterialModule } from '@app/material.module';
<% } -%>
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
<% if (props.ui === 'ionic') { -%>
        IonicModule.forRoot(),
        FormsModule,
<% } else if (props.ui === 'bootstrap') { -%>
        NgbModule,
<% } else if (props.ui === 'material') { -%>
        BrowserAnimationsModule,
        FlexLayoutModule,
        MaterialModule,
        SharedModule,
<% } -%>
        RouterTestingModule,
        TranslateModule.forRoot(),
        ReactiveFormsModule,
        CoreModule
      ],
<% if (props.ui === 'ionic') { -%>
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        Platform,
        LoadingController,
      ],
<% } -%>
      declarations: [LoginComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
