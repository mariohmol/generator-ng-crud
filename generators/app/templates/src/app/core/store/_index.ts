import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { State, defaultState } from './state'
// import { distinctUntilChanged } from 'rxjs/operators';
const _store = new BehaviorSubject<State>(defaultState);

@Injectable()
export class Store {
  private _store = _store;
  // changes = this._store.distinctUntilChanged()

  setState(state: State) {
    this._store.next(state);
  }

  getState(): State {
    return this._store.value;
  }

  purge() {
    this._store.next(defaultState);
  }

  getCollection(collection, prop, state) {
    switch(prop){
      <% entities.forEach(function (entity) { -%>
      case '<%= entity.pluralizeUncapitalize %>': {
        return this.get<%= entity.pluralizeCapitalize %>Collection(collection, state);
      }
      <% }) -%>
    }
  }

  getFilter(collection, prop, id) {
    switch(prop){
      <% entities.forEach(function (entity) { -%>
      case '<%= entity.pluralizeUncapitalize %>': {
        return this.get<%= entity.pluralizeCapitalize %>Filter(collection, id);
      }
      <% }) -%>
    }
  }

  <% entities.forEach(function (entity) { -%>
  private get<%= entity.pluralizeCapitalize %>Collection(collection, state) {
    return collection.map(item => {
      if (item.<%= entity.key %> !== state.<%= entity.key %>) {
        return item;
      }
      return Object.assign({}, item, state)
    })
  }
  <% }) -%>

  <% entities.forEach(function (entity) { -%>
  private get<%= entity.pluralizeCapitalize %>Filter(collection, id) {
    return collection.filter(item => item.<%= entity.key %> !== id)
  }
  <% }) -%>
}

