import {
    Component, Output, Input, EventEmitter, OnInit
} from '@angular/core'

import {
  <% if(relations) { -%>
<% relations.forEach(function (relation) { -%>
  <%= relation.capitalize %>Model,
<% }) -%>
<% } -%>
  <%= entity.capitalize %>Model
} from '../models';

@Component({
    selector: '[<%= entity.singularUncapitalize %>-edit-ui]',
    templateUrl: './<%= entity.singularUncapitalize %>Edit.component.html'
})
export class <%= entity.capitalize %>EditComponent  implements OnInit {
    @Input() <%= entity.singularUncapitalize %>: <%= entity.capitalize %>Model;
<% if(relations) { -%>
<% relations.forEach(function (relation) { -%>
    @Input() <%= relation.pluralizeUncapitalize %>: Array<<%= relation.capitalize %>Model>;
<% }) -%>
<% } -%>

    @Output() onEditHandler = new EventEmitter();

    edit<%= entity.singularCapitalize %>: <%= entity.capitalize %>Model;

    ngOnInit() {
      // clone the user object
      this.edit<%= entity.singularCapitalize %> = {
        <%= entity.key %>: <%= entity.entity[entity.key].defaultForm %><% Object.keys(entity.entity).forEach(function(field) { -%>
<%if(!entity.entity[field].key && field!= entity.key) { -%>,
        <%= field %>: this.<%= entity.singularUncapitalize %>.<%=field %>
<% } -%>
<% }) -%>
      };
    }

    onSave() {
        this.onEditHandler.next({id: this.<%= entity.singularUncapitalize %>.<%= entity.key %>, <%= entity.singularUncapitalize %> : this.edit<%= entity.singularCapitalize %>});
    }
}
