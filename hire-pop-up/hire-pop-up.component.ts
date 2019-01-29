import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';


@Component({
  selector: 'app-hire-pop-up',
  templateUrl: './hire-pop-up.component.html',
  styleUrls: ['./hire-pop-up.component.sass']
})
export class HirePopUpComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal, private router: Router) { }
  register() {
    this.activeModal.close();
    this.router.navigate(['/register']);
  }

  ngOnInit() {
  }

}
