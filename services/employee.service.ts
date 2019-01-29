import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class EmployeeService {
  private env = environment;
  public employeeSubject = new Subject();

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
  // Check requests
  checkRequests() {
    let token = this.getToken();
    const headers = this.generateXAccesToken(token);
    // form
    // const body= JSON.stringify(form);
    return this.http.get(this.env.api + 'v1/posts/work/myPostExecutor?status=request', {headers}).toPromise()
        .then(results => {
          return this.preparePosts(results);
        });
  }
  // Check offers
  checkOffers() {
    let token = this.getToken();
    const headers = this.generateXAccesToken(token);
    // form
    // const body= JSON.stringify(form);
    return this.http.get(this.env.api + 'v1/posts/work/myPostExecutor?status=offer', {headers}).toPromise()
        .then(results => {
          //this.employeeSubject.next({ inWork : results.json()})
          return this.preparePosts(results);
        });
  }

  // Check opened Posts
  checkOpenedPosts() {
  let token = this.getToken();
  const headers = this.generateXAccesToken(token);
  // form
  // const body= JSON.stringify(form);
  return this.http.get(this.env.api + 'v1/posts/work/myPostExecutor?status=open', {headers}).toPromise()
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
  return this.http.get(this.env.api + 'v1/posts/work/myPostExecutor?status=in_work', {headers}).toPromise()
      .then(results => {
        this.employeeSubject.next({ inWork : results.json()})
        return this.preparePosts(results);
      });
  }
  // Check finished Posts
  checkCompletedPosts() {
  let token = this.getToken();
  const headers = this.generateXAccesToken(token);
  // form
  // const body= JSON.stringify(form);
  return this.http.get(this.env.api + 'v1/posts/work/myPostExecutor?status=completed', {headers}).toPromise()
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
  return this.http.get(this.env.api + 'v1/posts/work/myPostExecutor', {headers}).toPromise()
      .then(results => {
        return this.preparePosts(results);
      });
  }
  // Cancel emploeyer`s offer
  cancelOffer(id){
      let token = this.getToken();
      const headers = this.generateAuthorizationToken(token);
      return this.http.delete(this.env.api + 'v1/posts/declineByExecutor/' + id, {headers}).toPromise();
  }
  // Cancel request for a job
  cancelRequest(id) {
    let token = this.getToken();
    const headers = this.generateXAccesToken(token);
    return this.http.delete(this.env.api + 'v1/posts/request/' + id, {headers}).toPromise();
  }
  // Accept request for a job
  acceptRequest(form) {
    let token = this.getToken();
    const headers = this.generateXAccesToken(token);
    return this.http.post(this.env.api + 'v1/posts/acceptRequestByExecutor', form, {headers}).toPromise()
      .then(data => {
        console.log("DATA : ",data);
    }).catch(err => { });
  }
}
