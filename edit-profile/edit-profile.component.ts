import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { PostsService } from '../../services/posts.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../../environments/environment';
import { ActionResultNotificatorPopUpComponent } from '../action-result-notificator-pop-up/action-result-notificator-pop-up.component';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.sass']
})
export class EditProfileComponent implements OnInit {
  private env = environment;
  api = 'localhost:4300/'
  user: any;
  userSubscription: any;
  editUserForm: FormGroup;
  visibility = false;
  locations: any;
  categories : any;
  locSelected: number;
  selectedFile: File;
  userAvatar: File;
  showFile: File;
  photoUrl1 = '';
  photoUrl2 = '';
  //
  multipleCategories: number[] = new Array();
  selectedlistOfCategories: string[] = new Array();
  catString: string ;
  catPrev : number = 1;
  //
  name : string ;
  lastName : string;
  constructor(
    private authService: AuthService,
    private postsService: PostsService,
    private router: Router,
    private modalService: NgbModal
   ) { }
   removeCategory(event) {
       let indexOfValue =  this.selectedlistOfCategories.indexOf(event.target.innerText);
       this.selectedlistOfCategories.splice(indexOfValue, 1);
       this.multipleCategories.splice(indexOfValue, 1);
       this.catString = this.multipleCategories.join();
   }
   multiplyCategory(event: any, categoryString: string) {
     let existsIndexStrings = this.selectedlistOfCategories.indexOf(categoryString);
     if (existsIndexStrings === -1) {
         this.selectedlistOfCategories.push(categoryString);
     }
     // id`s
     let existsIndexId = this.multipleCategories.indexOf(this.editUserForm.value.categoryId);
     if (existsIndexId === -1) {
         this.multipleCategories.push(this.editUserForm.value.categoryId);
     }
     this.catString = this.multipleCategories.join();
   }
   readUrl(event: any, element: HTMLInputElement, img: HTMLInputElement) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event: any) => {
        if (img.name === 'photo1') {
          this.photoUrl1 = event.target.result;
        } else {
          this.photoUrl2 = event.target.result;
        }
      }
      reader.readAsDataURL(event.target.files[0]);
      // checkvisibility
      this.visibility = !this.visibility;
    }
    // inputValue check
    this.selectedFile = event.target.files[0];
  }

  saveUser() {
    const input = new FormData();
    if (this.editUserForm.value.name != undefined){
        input.append('name', this.editUserForm.value.name);
    }
    if (this.editUserForm.value.lastName != undefined){
    input.append('lastName', this.editUserForm.value.lastName);
    }
    input.append('city', this.editUserForm.value.city);
    if (this.selectedFile != undefined ){
      input.append('avatar', this.selectedFile, this.selectedFile.name);
    }
    if (this.catString != undefined || this.catString != ''  ){
    input.append('categoryId', this.catString);
    }
    input.append('locationId', this.editUserForm.value.city);
    // CHANGE TO FORM DATA
    this.authService.editUser(input).then(() => {
      this.authService.getUserData();
      // need to reload page for proper name property changing
      //document.location.href =  'http://localhost:4200/dashboard';
      this.router.navigate(['/dashboard']);
    }).catch(err => {
      let error = err.json().response;
      const activeModal = this.modalService.open(ActionResultNotificatorPopUpComponent);
      activeModal.componentInstance.error = error;
      activeModal.result.then((data) => {
        // on close
      }, (reason) => {
      });
    });
  }

  formatPath(path) {
    if (path == undefined) {
    } else if (path) {
      return path.replace('\\', '/');
    }
  }

  ngOnInit() {

    this.user = this.authService.getUserData();
    this.userSubscription = this.authService.userSubject
      .subscribe((user: any) => {
        this.user = user;
        this.editUserForm.controls['name'].setValue(user.name);
        this.editUserForm.controls['lastName'].setValue(user.lastName);
        // id`s
        for (let i = 0; i < user.categories.length; i++) {
          if( this.selectedlistOfCategories.indexOf(user.categories[i].title) == -1)
           this.selectedlistOfCategories.push(user.categories[i].title);
           this.multipleCategories.push(user.categories[i].id);
        }
        this.locSelected = user.location.id;
      });
    this.postsService.getallLocations().then((result) => {
      this.locations = result.response;
    });
    this.postsService.getallCategories().then((result) => {
      this.categories = result;
    });
    this.editUserForm = new FormGroup(
      {
        'name': new FormControl('', [
          Validators.required,
          Validators.pattern('^[a-zA-Z_а-яА-Я]{3,20}$')
        ]),
        'lastName': new FormControl('', [
          Validators.required,
          Validators.pattern('^[a-zA-Z_а-яА-Я]{3,20}$')
        ]),
        'categoryId': new FormControl('', Validators.required),
        'city': new FormControl('', Validators.required),
        'photo': new FormControl('', Validators.required)
      });
  }



}
