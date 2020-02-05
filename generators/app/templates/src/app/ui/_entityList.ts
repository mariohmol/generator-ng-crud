import { Component } from '@angular/core';
import {
<% if(relations) { -%>
<% relations.forEach(function (relation) { -%>
  <%= relation.capitalize %>Model,
<% }) -%>
<% } -%>
  <%= entity.capitalize %>Model
} from '../models';

import {
<% if(relations) { -%>
<% relations.forEach(function (relation) { -%>
  <%= relation.capitalize %>Service,
<% }) -%>
<% } -%>
  <%= entity.capitalize %>Service
} from '../<%= entity.uncapitalize %>/<%= entity.uncapitalize %>.service';

import { Store } from '../store';
import 'rxjs/Rx';

@Component({
  selector: '<%= entity.pluralizeUncapitalize %>-container',
  templateUrl: './<%= entity.singularUncapitalize %>List.component.html'
})
export class <%= entity.capitalize %>ListComponent {
  <%= entity.pluralizeUncapitalize %>: <%= entity.capitalize %>Model[] = [];
<% if(relations) { -%>
<% relations.forEach(function (relation) { -%>
  <%= relation.pluralizeUncapitalize %>: <%= relation.capitalize %>Model[] = [];
<% }) -%>
<% } -%>

  constructor(
    private store: Store,
<% if(relations) { -%>
<% relations.forEach(function (relation) { -%>
    private <%= relation.singularUncapitalize %>Service: <%= relation.capitalize %>Service,
<% }) -%>
<% } -%>
    private <%= entity.singularUncapitalize %>Service: <%= entity.capitalize %>Service) {

<% if(relations) { -%>
<% relations.forEach(function (relation) { -%>
    this.<%= relation.singularUncapitalize %>Service.get<%= relation.pluralizeCapitalize %>().subscribe();
<% }) -%>
<% } -%>

    this.<%= entity.singularUncapitalize %>Service.get<%= entity.pluralizeCapitalize %>().subscribe();

<% if(relations){ -%>
<% relations.forEach(function (relation) { -%>
    this.store.changes.pluck('<%= relation.pluralizeUncapitalize %>').subscribe((<%= relation.pluralizeUncapitalize %>: any) => this.<%= relation.pluralizeUncapitalize %> = <%= relation.pluralizeUncapitalize %> );
<% }) -%>
<% }-%>

    this.store.changes.pluck('<%= entity.pluralizeUncapitalize %>').subscribe((<%= entity.pluralizeUncapitalize %>: any) => this.<%= entity.pluralizeUncapitalize %> = <%= entity.pluralizeUncapitalize %> );
  }

  onCreate<%= entity.capitalize %>(<%= entity.singularUncapitalize %>: <%= entity.capitalize %>Model) {
    this.<%= entity.singularUncapitalize %>Service.create<%= entity.capitalize %>(<%= entity.singularUncapitalize %>).subscribe();
  }

  onEdit<%= entity.capitalize %>(payload) {
    this.<%= entity.singularUncapitalize %>Service.edit<%= entity.capitalize %>(payload.id, payload.<%= entity.singularUncapitalize %>).subscribe();
  }

  onDelete<%= entity.capitalize %>(id: string) {
    this.<%= entity.singularUncapitalize %>Service.delete<%= entity.capitalize %>(id).subscribe();
  }

<% if(relations) { -%>
<% relations.forEach(function (relation) { -%>
  get<%= relation.singularCapitalize %>(id: string): <%= relation.capitalize %>Model {
    return this.<%= relation.pluralizeUncapitalize %>.find(f => f.<%= entity.key %> === id );
  }
<% }) -%>
<% } -%>
}
