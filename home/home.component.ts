import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LogRegComponent } from "../modals/logreg/logreg.component";
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit, OnDestroy {
  user: any;
  userSubscribtion: any;
  constructor(
             private modalService: NgbModal,
             private router: Router,
             private authService: AuthService
  ){ }
  scroll(el) {
    el.scrollIntoView({behavior: 'smooth'});
  }
  createPost() {
    if(!this.user){
      this.router.navigate(['/register'])
    } else {
        this.router.navigate(['/create-post']);
    }
  }
  goRegister() {
    if(!this.user){
      this.router.navigate(['/register']);
    } else {
      this.router.navigate(['/posts']);
    }
  }
  findFreelancers() {
    this.router.navigate(['/freelancers'])
  }
  ngOnInit() {
  //localStorage.removeItem('token');

    this.userSubscribtion = this.authService.userSubject.subscribe((user) => {
      this.user = user;
    })

  }
  ngOnDestroy() {
    this.userSubscribtion.unsubscribe();
  }
}
