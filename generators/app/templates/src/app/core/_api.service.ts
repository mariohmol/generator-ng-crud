import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ApiService {
  apiUrl = environment.serverUrl;
  constructor(public http: HttpClient) {
    this.http = http;
  }

  static deleteKeys(obj) {
    Object.keys(obj).forEach(k => {
      delete obj[k];
    });
  }

  static parseJwt(token) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload: any = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload).user || {};
    } catch (e) {
      return {};
    }
  }

  doHeaders(data: any = null) {
    const headerVals: any = { 'Content-Type': 'application/json' };
    if (localStorage.authToken) {
      headerVals['Authorization'] = 'Bearer ' + localStorage.authToken;
    }
    return new HttpHeaders(headerVals);
  }

  doQueryString(url, queries) {
    if (queries) {
      url += '?';
      for (const key in queries) {
        if (key) {
          url += `&${key}=${queries[key]}`;
        }
      }
    }
    return url;
  }

  get(url: string, query = null) {
    return new Promise((resolve, reject) => {
      const headers = this.doHeaders(null);
      const finalUrl = this.doQueryString(this.apiUrl + url, query);
      const promise = this.http.get(finalUrl, { headers: headers });
      return promise.subscribe(data => {
        resolve(data);
      },
        error => {
          reject(error);
        });
    });
  }

  post(url: string, data: any, files: any = null) {
    return new Promise((resolve, reject) => {
      const headers = this.doHeaders(data); 
      if (files) {
        headers.delete('content-type');
      }
      if (!data) {
        data = {};
      }

      let formData;

      if (files) {
        formData = new FormData();
        if (files.length === 1) {
          formData.append('uploads', files[0], files[0].name);
        } else {
          for (let i = 0; i < files.length; i++) {
            formData.append('uploads[]', files[i], files[i].name);
          }
        }
      } else {
        formData = JSON.stringify(data);
      }
      return this.http.post(this.apiUrl + url, formData, { headers: headers })
        .subscribe(dataResponse => {
          resolve(dataResponse);
        },
          error => {
            reject(error);
          });
    });
  }


  put(url: string, data: any = null) {
    return new Promise((resolve, reject) => {
      const headers = this.doHeaders(data);
      if (!data) {
        data = {};
      }
      return this.http.put(this.apiUrl + url, JSON.stringify(data), { headers: headers })
        .subscribe(dataResponse => {
          resolve(dataResponse);
        },
          error => {
            reject(error);
          });
    });
  }

  delete(url: string) {
    return new Promise((resolve, reject) => {
      const headers = this.doHeaders();
      return this.http.delete(this.apiUrl + url, { headers: headers })
        .subscribe(data => {
          resolve(data);
        },
          error => {
            reject(error);
          });
    });
  }
}
