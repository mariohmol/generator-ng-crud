import {
    Component,
    Input,
    Output,
    EventEmitter
} from '@angular/core';

import {
  <% if(relations) {%><% relations.forEach(function (relation) {%><%= relation.capitalize %>Model,<% })%><% }%>
  <%= entity.capitalize %>Model
} from '../models';

@Component({
    selector: '[<%= entity.singularUncapitalize %>-ui]',
    templateUrl: './<%= entity.singularUncapitalize %>View.component.html'
})
export class <%= entity.capitalize %>ViewComponent {
    @Input() <%= entity.singularUncapitalize %>: <%= entity.capitalize %>Model;
<% if(relations) { -%>
<% relations.forEach(function (relation) { -%>
    @Input() <%= relation.singularUncapitalize %>: <%= relation.capitalize %>Model;
    @Input() <%= relation.pluralizeUncapitalize %>: Array<<%= relation.capitalize %>Model>;
<% }) -%>
<% } -%>

    @Output() onEditHandler = new EventEmitter();
    @Output() onDeleteHandler = new EventEmitter();

    onEdit<%= entity.capitalize %>(data) {
        this.onEditHandler.next(data);
    }

    onDelete<%= entity.capitalize %>() {
        this.onDeleteHandler.next(this.<%= entity.singularUncapitalize %>.<%= entity.key %>);
    }
}
