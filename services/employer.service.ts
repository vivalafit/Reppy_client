import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class EmployerService {
  private env = environment;
  public employerSubject = new Subject();
  constructor(private http: Http) { }
  // Token
  getToken() {
    const token = localStorage.getItem('token');
    return token;
  }
  // Headers
  generateXAccesToken(token) {
      return new Headers( {'x-access-token': token } );
  }
  generateAuthorizationToken(token) {
      return new Headers( {'Authorization': token } );
  }
  //
  preparePosts(response: any): any {
    const resp = response.json();
    if (resp && resp.posts) {

      return resp.posts;
    }
    return resp;
  }
  // Check opened Posts
  checkOpenedPosts() {
      let token = this.getToken();
      const headers = this.generateXAccesToken(token);
      // form
      // const body= JSON.stringify(form);
      return this.http.get(this.env.api + 'v1/posts/work/myPostCustomer?status=open', {headers}).toPromise()
          .then(results => {
            return this.preparePosts(results);
          });
  }
  // Check offered Posts
  checkOfferedPosts() {
      let token = this.getToken();
      const headers = this.generateXAccesToken(token);
      // form
      // const body= JSON.stringify(form);
      return this.http.get(this.env.api + 'v1/posts/work/myPostCustomer?status=offer', {headers}).toPromise()
          .then(results => {
            return this.preparePosts(results);
          });
  }
  // Check inWork Posts
  checkInWorkPosts() {
      let token = this.getToken();
      const headers = this.generateXAccesToken(token);
      // form
      // const body= JSON.stringify(form);
      return this.http.get(this.env.api + 'v1/posts/work/myPostCustomer?status=in_work', {headers}).toPromise()
          .then(results => {
            //send all In work posts to header for checking if they are ended
            this.employerSubject.next({ inWork : results.json()})
            return this.preparePosts(results);
          });
  }
  // Check finished Posts
  checkCompletedPosts() {
      let token = this.getToken();
      const headers = this.generateXAccesToken(token);
      // form
      // const body= JSON.stringify(form);
      return this.http.get(this.env.api + 'v1/posts/work/myPostCustomer?status=completed', {headers}).toPromise()
          .then(results => {
            return this.preparePosts(results);
          });
  }
  // Check Employee posts
  checkAll() {
      let token = this.getToken();
      const headers = this.generateXAccesToken(token);
      // form
      // const body= JSON.stringify(form);
      return this.http.get(this.env.api + 'v1/posts/work/myPostCustomer', {headers}).toPromise()
          .then(results => {
            return this.preparePosts(results);
          });
  }
  //
  cancelOffer(id){
      let token = this.getToken();
      const headers = this.generateAuthorizationToken(token);
      return this.http.delete(this.env.api + 'v1/posts/cancelOffer/' + id, {headers}).toPromise();
  }

}
