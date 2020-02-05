
import * as c from './containers';
import { ApiService } from './api';
import { Store } from './store';
import { StoreHelper } from './store/helper'; 
export { AppComponent } from './app.component';

const mapValuesToArray = (obj) => Object.keys(obj).map(key => obj[key]);

// export { routes } from './routes';
export const providers = [
  ApiService,
  Store,
  StoreHelper
  // ...mapValuesToArray(services)
];

export const containers = mapValuesToArray(c);
// export const ui = mapValuesToArray(u);
