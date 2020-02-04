import {
    Component, Input, Output, EventEmitter
} from '@angular/core';

import { <%= entity.capitalize %>Model } from '../models';

@Component({
    selector: '[<%= entity.singularUncapitalize %>-delete-ui]',
    templateUrl: './<%= entity.singularUncapitalize %>Delete.component.html'
})
export class <%= entity.capitalize %>DeleteComponent {
    @Input() <%= entity.singularUncapitalize %>: <%= entity.capitalize %>Model;
    @Output() onDeleteHandler = new EventEmitter();

    onDelete() {
        this.onDeleteHandler.next(this.<%= entity.singularUncapitalize %>.<%= entity.key %>);
    }
}
