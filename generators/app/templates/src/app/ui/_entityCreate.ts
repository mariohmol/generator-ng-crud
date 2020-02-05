import {
    Component, Output, Input, EventEmitter
} from '@angular/core';

import {
<% if(relations) { -%>
<% relations.forEach(function (relation) { -%>
  <%= relation.capitalize %>Model,
<% }) -%>
<% } -%>
  <%= entity.capitalize %>Model
} from '../models';

@Component({
    selector: '<%= entity.singularUncapitalize %>-create-ui',
    templateUrl: './<%= entity.singularUncapitalize %>Create.component.html'
})
export class <%= entity.capitalize %>CreateComponent {
<% if(relations) { -%>
<% relations.forEach(function (relation) { -%>
    @Input() <%= relation.pluralizeUncapitalize %>: Array<<%= relation.capitalize %>Model>;
<% }) -%>
<% } -%>
    @Output() onSaveHandler = new EventEmitter();

    <%= entity.singularUncapitalize %>: <%= entity.capitalize %>Model = {
      //<%= entity.key %>: <%= entity.entity[entity.key].defaultForm %> 
      <% Object.keys(entity.entity).forEach(function(field) { -%>
<% if(field !== entity.key) { -%>
      <%= field %>: null,
<% } -%>
<% }) -%>
    };

    addNew: boolean = false;

    onAddNew() {
      this.addNew = true;
    }

    onCancel() {
      this.addNew = false;
      this.reset();
    }

    onSave() {
      this.addNew = false;
      this.onSaveHandler.next(this.<%= entity.singularUncapitalize %>);
      this.reset();
    }

    reset() {
      this.<%= entity.singularUncapitalize %> = {
        <%= entity.key %>: <%= entity.entity[entity.key].defaultForm %> <% Object.keys(entity.entity).forEach(function(field) { -%>
<% if(!entity.entity[field].key && entity.entity[field].require) { -%>,
        <%= field %>: <%= field.defaultForm %>
<% } -%>
<% }) -%>
      };
    }
}
