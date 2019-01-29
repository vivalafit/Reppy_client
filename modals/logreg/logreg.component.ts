import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe, DecimalPipe } from '@angular/common';

@Component({
    selector: 'ngx-modal',
    templateUrl: './logreg.component.html',
    styleUrls: ['./logreg.component.sass'],
})
export class LogRegComponent {
    constructor(private activeModal: NgbActiveModal, private router: Router) { }
    closeModal() {
        this.activeModal.close();
    }
    goLogin() {
        this.router.navigate(['/login']);
        this.activeModal.close();
    }
}
