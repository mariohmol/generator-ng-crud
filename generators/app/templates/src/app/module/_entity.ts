import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { <%= entity.capitalize %>Routes } from './<%= entity.uncapitalize %>.routing';
import { <%= entity.capitalize %>Service } from './<%= entity.uncapitalize %>.service';
import { <%= entity.capitalize %>Component } from './<%= entity.uncapitalize %>.component';
import { <%= entity.capitalize %>CreateComponent } from './<%= entity.uncapitalize %>Create.component';
import { <%= entity.capitalize %>DeleteComponent } from './<%= entity.uncapitalize %>Delete.component';
import { <%= entity.capitalize %>EditComponent } from './<%= entity.uncapitalize %>Edit.component';


@NgModule({
  declarations: [
    <%= entity.capitalize %>Component,
    <%= entity.capitalize %>CreateComponent,
    <%= entity.capitalize %>DeleteComponent,
    <%= entity.capitalize %>EditComponent],
  exports: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(<%= entity.capitalize %>Routes),
  ],
  providers: [<%= entity.capitalize %>Service]
})
export class <%= entity.capitalize %>Module { }
