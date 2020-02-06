import { Injectable } from '@angular/core';
import { <%= entity.capitalize %>Model } from '../models'
import { ApiService } from '../core/api.service';
import { StoreHelper } from '../core/store/helper';

@Injectable()
export class <%= entity.capitalize %>Service {

    path: string = '<%= relativeURI || '' %>/<%= entity.uncapitalize %>';

    constructor(private apiService: ApiService,
                private storeHelper: StoreHelper) {}

    get<%= entity.pluralizeCapitalize %>() {
        return this.apiService.get(this.path)
                .then((res: any) => this.storeHelper.update('<%= entity.pluralizeUncapitalize %>', res));
    }

    get<%= entity.singularCapitalize %>(id) {
        return this.apiService.get(`${this.path}/${id}`)
                .then(<%= entity.singularUncapitalize %> => this.storeHelper.findAndUpdate('<%= entity.pluralizeUncapitalize %>', <%= entity.singularUncapitalize %>));
    }

    create<%= entity.capitalize %>(<%= entity.singularUncapitalize %>: <%= entity.capitalize %>Model) {
        return this.apiService.post(this.path, <%= entity.singularUncapitalize %>)
                .then(saved<%= entity.singularCapitalize %>=> this.storeHelper.add('<%= entity.pluralizeUncapitalize %>', saved<%= entity.singularCapitalize %>));
    }

    edit<%= entity.capitalize %>(id: string, <%= entity.singularUncapitalize %>: <%= entity.capitalize %>Model) {
        return this.apiService.put(`${this.path}/${id}`, <%= entity.singularUncapitalize %>)
                 .then(edited<%= entity.singularCapitalize %> => this.storeHelper.findAndUpdate('<%= entity.pluralizeUncapitalize %>', edited<%= entity.singularCapitalize %>));
    }

    delete<%= entity.capitalize %>(id: string) {
        return this.apiService.delete(`${this.path}/${id}`)
             .then((res: any) => this.storeHelper.findAndDelete('<%= entity.pluralizeUncapitalize %>', id));
    }
};
