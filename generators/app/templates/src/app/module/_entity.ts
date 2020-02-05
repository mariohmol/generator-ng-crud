import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { <%= entity.capitalize %>Routes } from './<%= entity.uncapitalize %>.routing';
import { <%= entity.capitalize %>Service } from './<%= entity.uncapitalize %>.service';
import { <%= entity.capitalize %>CreateComponent } from './<%= entity.uncapitalize %>Create.component';
import { <%= entity.capitalize %>DeleteComponent } from './<%= entity.uncapitalize %>Delete.component';
import { <%= entity.capitalize %>EditComponent } from './<%= entity.uncapitalize %>Edit.component';
import { <%= entity.capitalize %>ListComponent } from './<%= entity.uncapitalize %>List.component';
import { <%= entity.capitalize %>ViewComponent } from './<%= entity.uncapitalize %>View.component';


@NgModule({
  declarations: [
    <%= entity.capitalize %>CreateComponent,
    <%= entity.capitalize %>DeleteComponent,
    <%= entity.capitalize %>EditComponent,
    <%= entity.capitalize %>ViewComponent,
    <%= entity.capitalize %>ListComponent
  ],
  exports: [
    <%= entity.capitalize %>CreateComponent,
    <%= entity.capitalize %>DeleteComponent,
    <%= entity.capitalize %>EditComponent,
    <%= entity.capitalize %>ViewComponent,
    <%= entity.capitalize %>ListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forRoot(<%= entity.capitalize %>Routes),
  ],
  providers: [<%= entity.capitalize %>Service]
})
export class <%= entity.capitalize %>Module { }
