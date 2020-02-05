import { Routes } from '@angular/router';
import { <%= entity.capitalize %>CreateComponent } from './<%= entity.uncapitalize %>Create.component';
import { <%= entity.capitalize %>DeleteComponent } from './<%= entity.uncapitalize %>Delete.component';
import { <%= entity.capitalize %>EditComponent } from './<%= entity.uncapitalize %>Edit.component';
import { <%= entity.capitalize %>ListComponent } from './<%= entity.uncapitalize %>List.component';
import { <%= entity.capitalize %>ViewComponent } from './<%= entity.uncapitalize %>View.component';

export const <%= entity.capitalize %>Routes: Routes = [
   { path: '<%= entity.uncapitalize %>/:id', component: <%= entity.capitalize %>ViewComponent},
    { path: '<%= entity.uncapitalize %>/create', component: <%= entity.capitalize %>CreateComponent},
    { path: '<%= entity.uncapitalize %>/delete', component: <%= entity.capitalize %>DeleteComponent},
    { path: '<%= entity.uncapitalize %>/edit', component: <%= entity.capitalize %>EditComponent},
    { path: '<%= entity.uncapitalize %>', component: <%= entity.capitalize %>ListComponent}
];


