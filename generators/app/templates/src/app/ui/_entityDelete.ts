import {
    Component, Input, Output, EventEmitter
} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';
import { <%= entity.capitalize %>Model } from '../models';

@Component({
    selector: '[<%= entity.singularUncapitalize %>-delete-ui]',
    templateUrl: './<%= entity.singularUncapitalize %>Delete.component.html'
})
export class <%= entity.capitalize %>DeleteComponent {
    @Input() <%= entity.singularUncapitalize %>: <%= entity.capitalize %>Model;

    constructor(public modalController: ModalController) {

    }
    
    async presentModal() {
        const modal = await this.modalController.create({
            component: <%= entity.capitalize %>DeleteModalPage,
            componentProps: {
                <%= entity.singularUncapitalize %>: this.<%= entity.singularUncapitalize %>
            }
        });
        return await modal.present();
    }
}

@Component({
    selector: 'modal-page-<%= entity.singularUncapitalize %>-delete-ui',
    template: `
    <!-- Modal -->
    <div class="modal fade" [id]="'modelDelete-' + <%= entity.singularUncapitalize %>.<%= entity.key %>" tabindex="-1"
        role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <ion-button type="button" class="close" data-dismiss="modal" aria-label="Close" (click)="dismiss()">
                        <span aria-hidden="true">&times;</span>
                    </ion-button>
                    <h4 class="modal-title" id="myModalLabel">Delete <%= entity.singularCapitalize %></h4>
                </div>
                <div class="modal-body">
                    <p>Are you sure to delete this <%= entity.singularCapitalize %>?</p>
                </div>
                <div class="modal-footer">
                    <ion-button type="button" class="btn btn-secondary" (click)="dismiss()">Close</ion-button>
                    <ion-button type="button" class="btn btn-primary" (click)="onDelete()">Confirm</ion-button>
                </div>
            </div>
        </div>
    </div>
    `,
  })
  export class <%= entity.capitalize %>DeleteModalPage {
    @Output() onDeleteHandler = new EventEmitter();
    <%= entity.singularUncapitalize %>: any = {};
    constructor(navParams: NavParams, public modalCtrl: ModalController) {
        this.<%= entity.singularUncapitalize %> = navParams.get('<%= entity.singularUncapitalize %>');
    }

    onDelete() {
        this.onDeleteHandler.next(this.<%= entity.singularUncapitalize %>);
        this.dismiss();
    }

    dismiss() {
        // using the injected ModalController this page
        // can "dismiss" itself and optionally pass back data
        this.modalCtrl.dismiss({
          'dismissed': true
        });
      }
  
  }