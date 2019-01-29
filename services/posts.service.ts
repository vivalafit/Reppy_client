import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from '../../environments/environment';


@Injectable()
export class PostsService {
  public allCategories: any;
  private env = environment;
  constructor(private http: Http) {
    this.getallCategories().then((result) =>{
      localStorage.setItem('categories', JSON.stringify(result));
    })
  }
  //token
  getToken() {
    const token = localStorage.getItem('token');
    return token;
  }
  //Headers
  generateHttpHeaders() {
    return new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
    //return new Headers( {'Access-Control-Allow-Origin': 'http://localhost:4200'} );
  }
  generateAuthorizationHeader(token) {
    return new Headers({ 'Authorization': token });
  }
  generateXAccesToken(token) {
    return new Headers({ 'x-access-token': token, 'Content-Type': 'application/json;charset=utf-8' });
  }
  //getAllCatgegoires
  getCategories(){
    return this.allCategories;
  }
  getallCategories() {
    return this.http.get(this.env.api + 'v1/categories').toPromise()
      .then(results => {
        return this.preparePosts(results);
      });
  }
  getallLocations() {
    return this.http.get(this.env.api + 'v1/location').toPromise()
      .then(results => {
        return this.preparePosts(results);
      });
  }
  preparePosts(response: any): any {
    const resp = response.json();
    if (resp && resp.posts) {
      return resp.posts;
    }
    return resp;
  }
  //Add Posts
  addPost(form) {
    // token
    let token = this.getToken();
    const headers = this.generateAuthorizationHeader(token);
    // form
    const body = JSON.stringify(form);
    return this.http.post(this.env.api + 'v1/posts/', form, { headers }).toPromise()
      .then(data => {
      });
  }
  // edit Post
  addOfferPost(form) {
    // token
    let token = this.getToken();
    const headers = this.generateAuthorizationHeader(token);
    // form
    const body = JSON.stringify(form);
    return this.http.post(this.env.api + 'v1/posts/offer', form, { headers }).toPromise()
      .then(data => {
      });
  }
  editPost(form, id) {
    // token
    let token = this.getToken();
    const headers = this.generateAuthorizationHeader(token);
    // form
    const body = JSON.stringify(form);
    return this.http.put(this.env.api + 'v1/posts/' + id, form, { headers }).toPromise()
      .then(data => {
      });
  }
  // Get all posts
  getPosts() {
    const headers = this.generateHttpHeaders();

    return this.http.get(this.env.api + 'v1/posts/', { headers });
  }
  getAllPosts(userId?) {
    const headers = this.generateHttpHeaders();
    const userIdParam = userId ? 'userId=' + userId : '';
    return this.http.get(this.env.api + 'v1/posts/?' + userIdParam, { headers }).toPromise()
      .then(results => {
        return this.preparePosts(results);
      });
  }
  // Get all posts with certain categoryId
  getPostsWithCategory(categoryId, userId?) {
    const headers = this.generateHttpHeaders();
    const userIdParam = userId ? 'userId=' + userId : '';
    return this.http.get(this.env.api + 'v1/posts/?' + userIdParam + '&categoryId=' + categoryId, { headers }).toPromise()
      .then(results => {
        return this.preparePosts(results);
      });
  }
  //
  doRequest(form) {
    const token = this.getToken();
    const headers = this.generateXAccesToken(token);
    //
    const body = JSON.stringify(form);
    return this.http.post(this.env.api + 'v1/posts/request', body, { headers }).toPromise();
  }
  // Accept doRequest
  acceptRequest(form) {
    const token = this.getToken();
    const headers = this.generateXAccesToken(token);
    //
    const body = JSON.stringify(form);
    //
    return this.http.post(this.env.api + 'v1/posts/acceptRequest', body, { headers }).toPromise()
      .then(results => {
      })
      .catch(err => {  });

  }
  completeTask(form) {
    const token = this.getToken();
    const headers = this.generateXAccesToken(token);
    const body = JSON.stringify(form);
    //
    return this.http.post(this.env.api + 'v1/posts/endByExecutor', body, { headers }).toPromise()
      .then(results => {
      })
      .catch(err => {  });
  }

  //
  reviewPost(form) {
    const token = this.getToken();
    const headers = this.generateXAccesToken(token);
    const body = JSON.stringify(form);
    //
    return this.http.post(this.env.api + 'v1/posts/review', body, { headers }).toPromise()
      .then(results => {
      })
      .catch(err => { });
  }
}
