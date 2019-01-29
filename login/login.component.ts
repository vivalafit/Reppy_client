import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from '../../services/auth.service';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  token: string;
  error: string;
  constructor(private authService: AuthService, private router: Router, private activeModal: NgbActiveModal) { }
  loginUser() {
      this.authService.loginUser(this.loginForm.value).then((data) => {
       this.activeModal.close();
       this.router.navigate(['/posts']);
      }).catch(err => {
      });
  }
  ngOnInit() {
    this.loginForm = new FormGroup(
        {
        'email': new FormControl('', [
                            Validators.required,
                            Validators.pattern('[a-zA-Z_0-9]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}')
                        ]),
        'password': new FormControl('', Validators.required)
        // helppls1234
        });

  }

}
