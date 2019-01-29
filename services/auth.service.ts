import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {
  private env = environment;
  private user: any;
  private mode: string;
  public userSubject = new Subject();
  public modeSubject = new Subject();
  constructor(private http: Http) {
      const token = localStorage.getItem('token');
      if (token && token !== '') {
          this.getUserProfile(token);
      }
  }
  getMode() {
      return this.mode;
  }
  checkMode() {
      const mode = localStorage.getItem('mode');
      if ((mode === 'c' || mode === 'f') && this.user && this.user.checked) {
          return mode;
      } else {
          return 'c';
      }
  }
  setMode(mode: string) {
      if ((mode === 'c' || mode === 'f') && this.user && this.user.checked) {
          localStorage.setItem('mode', mode);
          this.mode = mode;
      } else {
          localStorage.setItem('mode', 'c');
          this.mode = 'c';
      }
      this.changeModeSubject(this.mode);
      return this.mode === mode;
  }
  generateHttpHeaders() {
      // return new Headers( {'Content-Type': 'multipart/form-data'} );
      return new Headers( {'Content-Type': 'application/json;charset=utf-8'} );
      // return new Headers( {'Access-Control-Allow-Origin': 'http://localhost:4200'} );
  }
  getToken() {
    const token = localStorage.getItem('token');
    return token;
  }
  getGoodToken() {
      const token = localStorage.getItem('token');
      return token;
  }
  generateXAccesToken(token) {
      return new Headers( {'x-access-token': token } );
  }
  generateToken(token) {
      return new Headers( {'x-access-token': token } );
  }
  getUserData() {
      const token = localStorage.getItem('token');
      return this.getUserProfile(token).then(() => {
          return this.user;
      }).catch(err => {
          this.user = undefined;
          return this.user;
      });
  }
  preparePosts(response: any): any {
      const resp = response.json();
      if (resp && resp.posts) {
          return resp.posts;
      }
      return resp;
  }
  // User_logic
  // register
  //  registerUser(form){
  //  const headers = this.generateHttpHeaders();
  //  const body=JSON.stringify(form);
  //  return this.http.post(this.env.api + 'v1/auth/register/',body, { headers });
  //  }
  registerCompany(form){
    return this.http.post(this.env.api + 'v1/auth/companyRegister/', form).toPromise().then(result => {
      const data = result.json();
      //this.getUserProfile(data.token);
      return result;
    });
  }
  registerUser(form) {
      return this.http.post(this.env.api + 'v1/auth/register/', form).toPromise().then(result => {
          const data = result.json();
          this.getUserProfile(data.token);
          return result;
      });
  }

  /// edit user profile
  editUser(form) {
  let token = this.getToken();
  const headers = this.generateXAccesToken(token);
    return this.http.put(this.env.api + 'v1/auth/edit-profile', form, {headers}).toPromise().then(result => {
      return result;
    });
  }
//// login
//  loginUser(form){ //ADDED HEADERS
//      const headers = this.generateHttpHeaders();
//      const body = JSON.stringify(form);
//      return this.http.post(this.env.api + 'v1/auth/', body, { headers });
//  }
  // login
  loginUser(form) { // ADDED HEADERS
      const headers = this.generateHttpHeaders();
      const body = JSON.stringify(form);
      return this.http.post(this.env.api + 'v1/auth/', body, {headers}).toPromise().then((result) => {
          const data = result.json();
          return this.getUserProfile(data.token);
      });
  }
  // forget password
  forgetPassword(form) {
  const headers = this.generateHttpHeaders();
  const body = JSON.stringify(form);
  return this.http.post(this.env.api + 'v1/auth/forgetpassword/', body, {headers});
  }
  // resetForm
  resetPassword(form, token, sender) {
  const headers = this.generateHttpHeaders();
  const body = JSON.stringify(form);
  return this.http.post(this.env.api + 'v1/auth/resetpassword?token=' + token + '&sender=' + sender, body, {headers});
  // <a href='http://localhost:4300/v1/auth/activate?token="+token+"&sender="+email+"'>Activate account</a>"
  }
  // getUserProfile
  getUserProfile(token) {
   // generate x-acces header with token
   const headers = this.generateToken(token);
   return this.http.get(this.env.api + 'v1/auth/profile', { headers }).toPromise()
            .then((response) => {
                localStorage.setItem('token', token);
                const parsed = response.json();
                this.user = parsed;
                this.changeUserSubject(parsed);
                this.mode = this.checkMode();
                this.changeModeSubject(this.mode);
            });

  }
  getAllFreelancersByCategory(category, userId?) {
      const userIdParam = userId ? 'userId=' + userId : '';
    // http://localhost:4300/v1/auth/freelancers
    return this.http.get(this.env.api + 'v1/auth/freelancers?categoryId=' + category + '&' + userIdParam).toPromise()
        .then(results => {
            return this.preparePosts(results);
        });
  }
  getAllFreelancers(userId?) {
      const userIdParam = userId ? 'userId=' + userId : '';
        // http://localhost:4300/v1/auth/freelancers
        return this.http.get(this.env.api + 'v1/auth/freelancers?' + userIdParam).toPromise()
            .then(results => {
                return this.preparePosts(results);
            });
    }
  changeUserSubject(userData) {
      this.userSubject.next(userData);
  }
  changeModeSubject(mode) {
      this.modeSubject.next(mode);
  }
}
