import { Routes } from '@angular/router';
import { <%= entity.capitalize %>Component } from './<%= entity.uncapitalize %>.component';
import { <%= entity.capitalize %>CreateComponent } from './<%= entity.uncapitalize %>Create.component';
import { <%= entity.capitalize %>DeleteComponent } from './<%= entity.uncapitalize %>Delete.component';
import { <%= entity.capitalize %>EditComponent } from './<%= entity.uncapitalize %>Edit.component';


export const <%= entity.capitalize %>Routes: Routes = [
   { path: '<%= entity.uncapitalize %>/', component: <%= entity.capitalize %>Component},
    { path: '<%= entity.uncapitalize %>/create', component: <%= entity.capitalize %>CreateComponent},
    { path: '<%= entity.uncapitalize %>/delete', component: <%= entity.capitalize %>DeleteComponent},
    { path: '<%= entity.uncapitalize %>/edit', component: <%= entity.capitalize %>EditComponent}
];


