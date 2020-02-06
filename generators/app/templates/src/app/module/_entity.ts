import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CoreModule } from '../core';
import { SharedModule } from '../shared';
<% if (props.ui === 'ionic') { -%>
import { IonicModule } from '@ionic/angular';
<% } else if (props.ui === 'material') { -%>
import { FlexLayoutModule } from '@angular/flex-layout';
<% } -%>
<% if (props.angulartics) { -%>
import { Angulartics2Module } from 'angulartics2';
<% } -%>

<% if (props.ui === 'material') { -%>
import { MaterialModule } from '@app/material.module';
<% } -%>

import { <%= entity.capitalize %>Routes } from './<%= entity.uncapitalize %>.routing';
import { <%= entity.capitalize %>Service } from './<%= entity.uncapitalize %>.service';
import { <%= entity.capitalize %>CreateComponent } from './<%= entity.uncapitalize %>Create.component';
import { <%= entity.capitalize %>DeleteComponent } from './<%= entity.uncapitalize %>Delete.component';
import { <%= entity.capitalize %>EditComponent } from './<%= entity.uncapitalize %>Edit.component';
import { <%= entity.capitalize %>ListComponent } from './<%= entity.uncapitalize %>List.component';
import { <%= entity.capitalize %>ViewComponent } from './<%= entity.uncapitalize %>View.component';
import { <%= entity.capitalize %>DeleteModalPage } from './<%= entity.uncapitalize %>Delete.component';


@NgModule({
  declarations: [
    <%= entity.capitalize %>CreateComponent,
    <%= entity.capitalize %>DeleteComponent,
    <%= entity.capitalize %>EditComponent,
    <%= entity.capitalize %>ViewComponent,
    <%= entity.capitalize %>ListComponent,
    <%= entity.capitalize %>DeleteModalPage
  ],
  exports: [
    <%= entity.capitalize %>CreateComponent,
    <%= entity.capitalize %>DeleteComponent,
    <%= entity.capitalize %>EditComponent,
    <%= entity.capitalize %>ViewComponent,
    <%= entity.capitalize %>ListComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    CommonModule,
    FormsModule,
  <% if (props.ui === 'ionic') { -%>
    IonicModule,
<% } else if (props.ui === 'material') { -%>
    FlexLayoutModule,
    MaterialModule,
<% } -%>
<% if (props.angulartics) { -%>
    Angulartics2Module,
<% } -%>
    RouterModule.forRoot(<%= entity.capitalize %>Routes),
  ],
  <% if (props.ui === 'ionic') { -%>
    entryComponents: [
      <%= entity.capitalize %>CreateComponent,
      <%= entity.capitalize %>DeleteComponent,
      <%= entity.capitalize %>EditComponent,
      <%= entity.capitalize %>ViewComponent,
      <%= entity.capitalize %>ListComponent,
      <%= entity.capitalize %>DeleteModalPage
    ],
  <% } -%>
  providers: [<%= entity.capitalize %>Service]
})
export class <%= entity.capitalize %>Module { }
