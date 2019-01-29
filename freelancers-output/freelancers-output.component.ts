import {Component, Input, OnInit} from '@angular/core';
import {HirePopUpComponent} from '../hire-pop-up/hire-pop-up.component';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-freelancers-output',
  templateUrl: './freelancers-output.component.html',
  styleUrls: ['./freelancers-output.component.sass']
})
export class FreelancersOutputComponent implements OnInit {
  private env = environment;
  user: any;
  // userSubscribtion: any;
  // freelancers: Array<Object>;
  // length: number;
  // category: any;
  // noResult: any;
  avatarSize = 75;

  @Input() freelancers: Array<Object>;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private modalService: NgbModal,
    private router: Router) { }

  ngOnInit() {
    this.changeAvatarSize();
    this.route.queryParams.subscribe(params => {
      this.authService.getUserData().then((user) => {
        this.user = user;

      });
    });
  }
  formatPath(path) {
      if (path == undefined) {
      return 'avatars/Gachi.jpg';
      } else if (path) {
          return path.replace('../', '');
      }
  }
  openPopUp(id) {
    if (this.user) {
      this.router.navigateByUrl('/create-post?status=offer&offerTo=' + id); // сделать страницу послания оффера
    } else if (!this.user) {
      const modalRef = this.modalService.open(HirePopUpComponent);
      modalRef.componentInstance.name = 'Hire';
    }
  }
  // changeAvatarSize
  changeAvatarSize() {
    let bodyWidth = document.body.clientWidth;
    if (bodyWidth < 1200 && bodyWidth > 992) {
      this.avatarSize = 60;
    } else {
      this.avatarSize = 75;
    }
  }

}
