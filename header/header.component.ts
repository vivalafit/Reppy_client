import { Component, OnInit, OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';
import { FaqComponent } from '../faq/faq.component';
import { NotificationListComponent } from '../notification-list/notification-list.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployerService } from '../../services/employer.service';
import { EmployeeService } from '../../services/employee.service';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit, OnDestroy {
    private env = environment;
    user: any;
    mode: string;
    userSubscribtion: any;
    modeSubscribtion: any;
    employerSubscribtion : any;
    employeeSubscribtion : any;
    hidden = true;
    hiddenList = true;
    notificationCounterEmployee : number = 0 ;
    notificationCounterEmployer : number = 0 ;
    now: Date = new Date();
    //postsForNitprivate _elementRef : ElementRef,ificationlist
    completedNew : any[] = new Array();
    requestAproved: any[] = new Array();
    //offers: any;
    constructor(
        private router: Router,
        private employerService: EmployerService,
        private employeeService: EmployeeService,
        private authService: AuthService,
        private modalService: NgbModal
    ) { }
    // move to Directive
    close(e: Event) {
       if(this.hidden == false){
         this.hidden = true;
       }
    //   console.log(this.hidden);
    }
    closeList(e: Event) {
       if(this.hiddenList == false){
          this.hiddenList = true;
       }
    //  console.log(this.hiddenList );
    }
    //
    showNotificationList(){
        this.hiddenList = !this.hiddenList;
    }
    showFAQ(){

      this.hidden = !this.hidden;
    //  console.log(this.hidden);
    }
    createPost() {
        this.router.navigate(['/create-post'])
    }
    findPost() {
        this.router.navigate(['/posts'])
    }
    findFreelancer() {
        this.router.navigate(['/freelancers']);
    }
    goLegalEntity() {
        this.router.navigate(['/entity-registration']);
    }
    goHome() {
        this.router.navigate(['/'])
    }
    goLogin() {
        this.router.navigate(['/login'])
    }
    goRegister() {
        this.router.navigate(['/register'])
    }
    goDash() {
        this.router.navigate(['/dashboard'])
    }
    formatPath(path) {
        if (path == undefined){
        }
        else if (path) {
            return path.replace('../', '')
        }
    }
    search(event) {
        const queryParams : any = { queryParams: {} };
        if (event) {
            queryParams.queryParams.category = event;
        } else {
            queryParams.queryParams.result = 'noResult';
        }
        if (this.mode === 'c') {
            this.router.navigate(['/search'], queryParams)
        } else if (this.mode === 'f') {
            this.router.navigate(['/search'], queryParams)
        } else {
            this.router.navigate(['/search'], queryParams)
        }
    }
    changeNotificationCounter(posts){

      if (this.mode === 'c'){
        let oldLength = 0;
            if(oldLength != posts.length){
                  this.notificationCounterEmployee = 0;
                  for(let i = 0; i < posts.length ; i++){
                     if(posts[i].endedByExecutor === true){
                        this.notificationCounterEmployee = this.notificationCounterEmployee + 1;
                     }
                }
            }
        oldLength = posts.length;
      }
      //
      else if (this.mode === 'f'){
        this.requestAproved = [];
        let oldLength = 0;
          if(oldLength != posts.length){
            this.notificationCounterEmployer = 0;
            for(let i = 0; i < posts.length ; i++){
                let postUpdated = new Date(posts[i].updatedAt);
                let today = new Date;
                let diff = today.valueOf() - postUpdated.valueOf();
                let diffInHours = Math.round(diff/1000/60/60); // Convert milliseconds to hours
                if(diffInHours < 24 && posts[i].endedByExecutor === false){
                    this.notificationCounterEmployer = this.notificationCounterEmployer + 1;
                    this.requestAproved.push(posts[i]);
                 }
              }
          }
          oldLength = posts.length;
      }

    }
    ngOnInit() {
        this.employerSubscribtion = this.employerService.employerSubject
              .subscribe((posts: any) => {
                this.completedNew = [];
                this.changeNotificationCounter(posts.inWork.posts);
                for(let i = 0; i < posts.inWork.posts.length ; i++){
                   if(posts.inWork.posts[i].endedByExecutor === true){
                     this.completedNew.push(posts.inWork.posts[i]);
                   }
              }
        });
        this.employeeSubscribtion = this.employeeService.employeeSubject
              .subscribe((posts: any) => {
                this.changeNotificationCounter(posts.inWork.posts);


        });
        this.userSubscribtion = this.authService.userSubject
            .subscribe((user: any) => {
                this.user = user;
        });
        this.modeSubscribtion = this.authService.modeSubject
            .subscribe((mode: string) => {
                this.mode = mode;
        })
    }
    ngOnDestroy() {
        this.userSubscribtion.unsubscribe();
        this.modeSubscribtion.unsubscribe();
        this.employerSubscribtion.unsubscribe();
    }

}
