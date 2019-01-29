import { Component, OnInit,Input } from '@angular/core';
import { EmployerService } from '../../services/employer.service';
import { environment } from '../../../environments/environment';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DashboardHirePopUpComponent} from '../dashboard-hire-pop-up/dashboard-hire-pop-up.component';
import {PostPopUpComponent} from '../post-popup/postpopup.component';
import {DashboardLookPostPopUpComponent} from '../dashboard-look-post-pop-up/dashboard-look-post-pop-up.component';
import {DashboardCreateReviewPopUpComponent} from '../dashboard-create-review-pop-up/dashboard-create-review-pop-up.component';
import { DashboardEditPostPopUpComponent } from '../dashboard-edit-post-pop-up/dashboard-edit-post-pop-up.component'
import { DashboardCancelCustomerOfferPopUpComponent } from '../dashboard-cancel-customer-offer-pop-up/dashboard-cancel-customer-offer-pop-up.component'

@Component({
    selector: 'app-customer',
    templateUrl: './customer.component.html',
    styleUrls: ['./customer.component.sass']
})
export class CustomerComponent implements OnInit {
    private env = environment;
    postMode: string = 'request';
    user: any;
    active: any;
    completed: any;
    request: any;
    offers: any;
    constructor(private employerService: EmployerService, private modalService: NgbModal, public activeModal: NgbActiveModal) { }
    setButton(mode: string) {
        this.postMode = (['active', 'completed', 'request','offer'].indexOf(mode) > -1) ? mode : 'active';
    }
    formatPath(path) {
        return path.replace('../', '');
    }

    openPopUp(postId, executorId) {
      const modalRef = this.modalService.open(DashboardHirePopUpComponent);
      modalRef.componentInstance.postId = postId;
      modalRef.componentInstance.executorId = executorId;
      modalRef.componentInstance.refresh = this.refresh.bind(this);
    }
    cancelOffer(id){
      const activeModal = this.modalService.open(DashboardCancelCustomerOfferPopUpComponent);
      activeModal.componentInstance.id = id;
      activeModal.componentInstance.refresh = this.refresh.bind(this);
    }
    refresh() {
      Promise.all([
          this.employerService.checkInWorkPosts(),
          this.employerService.checkCompletedPosts(),
          this.employerService.checkOpenedPosts(),
          this.employerService.checkOfferedPosts()
      ]).then(results => {
          this.active = results[0];
          this.completed = results[1];
          this.request = results[2];
          this.offers = results[3];
      });
    }
    showPost(post) {
      const activeModal = this.modalService.open(DashboardLookPostPopUpComponent);
      activeModal.componentInstance.post = post;
      activeModal.componentInstance.user = this.user;
    }
    createReview(post){
      const activeModal = this.modalService.open(DashboardCreateReviewPopUpComponent);
      activeModal.componentInstance.post = post;
      activeModal.componentInstance.user = this.user;
      activeModal.componentInstance.refresh = this.refresh.bind(this);
    }
    editPost(post){
      const activeModal = this.modalService.open(DashboardEditPostPopUpComponent);
      activeModal.componentInstance.post = post;
      activeModal.componentInstance.refresh = this.refresh.bind(this);
    }
    ngOnInit() {
      this.refresh();

    }

}
