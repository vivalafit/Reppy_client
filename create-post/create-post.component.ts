import { Component,Injectable, OnInit, Input, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { PostsService } from '../../services/posts.service';
import { MatDatepickerModule, MatNativeDateModule } from "@angular/material";
//response
import { ActionResultNotificatorPopUpComponent } from '../action-result-notificator-pop-up/action-result-notificator-pop-up.component';
//animations
import { trigger, style, animate, transition } from '@angular/animations';
//test-serviec
import { EmployerService } from '../../services/employer.service';
import {NgbDateStruct, NgbCalendar,NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NgbDatepickerI18n} from '@ng-bootstrap/ng-bootstrap';
// ТАНЦЫ С БУБНОМ - перевод
const I18N_VALUES = {
  'rus': {
    weekdays: ['Пон', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'],
    months: ['Янв', 'Фев', 'Март', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сент', 'Окт', 'Ноябрь', 'Дек'],
  }
  // other languages you would support
};
// Define a service holding the language. You probably already have one if your app is i18ned. Or you could also
// use the Angular LOCALE_ID value
@Injectable()
export class I18n {
  language = 'rus';
}
// Define custom service providing the months and weekdays translations
@Injectable()
export class CustomDatepickerI18n extends NgbDatepickerI18n {

  constructor(private _i18n: I18n) {
    super();
  }

  getWeekdayShortName(weekday: number): string {
    return I18N_VALUES[this._i18n.language].weekdays[weekday - 1];
  }
  getMonthShortName(month: number): string {
    return I18N_VALUES[this._i18n.language].months[month - 1];
  }
  getMonthFullName(month: number): string {
    return this.getMonthShortName(month);
  }

  getDayAriaLabel(date: NgbDateStruct): string {
    return `${date.day}-${date.month}-${date.year}`;
  }
}
// ТАНЦЫ С БУБНОМ
@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({transition: ' 0.6s ease', opacity: 0}),
          animate('500ms', style({transition: ' 0.6s ease', opacity: 1}))
        ]),
        transition(':leave', [
          style({transition: ' 0.6s ease', opacity:1}),
            animate('500ms', style({transition: ' 0.6s ease', opacity: 0}))
        ])
      ]
    )
  ],
  styleUrls: ['./create-post.component.sass'],
  providers: [I18n, {provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n}] // define custom NgbDatepickerI18n provider
})
export class CreatePostComponent implements OnInit {
  //date
  model: NgbDateStruct;
  date: {year: number, month: number,day : number};
  formattedDate : string;
  //
  postsCreationForm: FormGroup;
  categories: any;
  locations: any;
  //multipleCategories : Array[];
  multipleCategories: number[] = new Array();
  selectedlistOfCategories: string[] = new Array();
  catString: string;
  statusOfPost: string;
  offeredExecutor: string;
  visibility = false;
  photoName = '';
  photoName2 = '';
  photoUrl1 = '';
  photoUrl2 = '';
  // dynamic change - need REWORK
  width = 0;
  changeTitle : boolean = true;
  changeCategory : boolean = true;
  changeDesc : boolean = true;
  changeCity : boolean = true;
  changeAdress : boolean = true;
  changeData : boolean = true;
  changePrice : boolean = true;
  // check initial width
  initWidth : number ;
  // dynamic change - need REWORK
  //
  discuss : boolean = false;
  //
  // pop ups with additional info - mobile resize
  showCreate : boolean = false;
  showTitle : boolean = false;
  showDetails : boolean = false;
  showCity : boolean = false;
  showDate : boolean = false;
  showPrice : boolean = false;
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private router: Router,
    private postsService: PostsService,
    private testService: EmployerService,
    private route: ActivatedRoute,
    private calendar: NgbCalendar,
    public modalService : NgbModal
  ) { }
  //
  // changeAvatarSize
  changeAvatarSize() {
    this.initWidth = document.body.clientWidth;
    console.log(this.initWidth);
  }
  // я ретард и надо будет перерботать метод
  testMethod(event: any){
    //title
    if(event.name == "title" ){
      if(this.changeTitle == true && event.value != "" && this.width < 100){
          this.width = this.width + 10;
          this.changeTitle = false;
      }
      else if(event.value == ""){
        this.width = this.width - 10;
        this.changeTitle = true;
      }
    }
    //categories
    if(event.name == "categoryId" ){
      if(this.changeCategory == true && this.catString != "" && this.width < 100){
          this.width = this.width + 10;
          this.changeCategory = false;
      }
      else if(this.catString == ""){
        this.width = this.width - 10;
        this.changeCategory = true;
      }
    }
    //description
    if(event.name == "description"){
      if(this.changeDesc == true && event.value != "" && this.width < 100){
          this.width = this.width + 10;
          this.changeDesc = false;
      }
      else if(event.value == ""){
        this.width = this.width - 10;
        this.changeDesc = true;
      }

    }
    //city
    if(event.name == "city"){
      if(this.changeCity == true && event.value != "" && this.width < 100){
          this.width = this.width + 20;
          this.changeCity = false;
      }
      else if(event.value == ""){
        this.width = this.width - 20;
        this.changeCity = true;
      }
    }
    //addres
    if(event.name == "adress"){
      if(this.changeAdress == true && event.value != "" && this.width < 100){
          this.width = this.width + 10;
          this.changeAdress = false;
      }
      else if(event.value == ""){
        this.width = this.width - 10;
        this.changeAdress = true;
      }
    }
    //data
    if(event.navigation == "select"){
      this.castData(event.model.selectedDate);
      if(this.changeData == true && event.model.selectedDate != null && this.width < 100 ){
          this.width = this.width + 20;

          this.changeData = false;
      }
      else if(event.model.selectedDate == null && this.changeData == false ){
        this.width = this.width - 20;
        this.changeData = true;
      }
    }
    //price
    if(event.name == "price"){
      if(this.changePrice == true && event.value != "" && this.width < 100){
          this.width = this.width + 20;
          this.changePrice = false;
      }
      else if(event.value == ""){
        this.width = this.width - 20;
        this.changePrice = true;
      }
    }
  }
  //Cast data Object to normal DataFormat
  castData(date:any){
  //  YYYY-MM-DD HH:MI:SS
  //  2018-12-14 09:12:38.315-08
     let dateString = date.year +'-'+ date.month +'-'+ date.day+' 23:00:00.315-08';
  //   console.log(dateString);
  //   let newDate = new Date(dateString);
     this.formattedDate = dateString;
  }
  // Remove multiple categories
  removeCategory(event) {
    let indexOfValue = this.selectedlistOfCategories.indexOf(event.target.innerText);
    this.selectedlistOfCategories.splice(indexOfValue, 1);
    this.multipleCategories.splice(indexOfValue, 1);
    this.catString = this.multipleCategories.join();
  }
  //Add multiple categories
  multiplyCategory(event: any, categoryString: string) {
    console.log("Working")
    let existsIndexStrings = this.selectedlistOfCategories.indexOf(categoryString);
    if (existsIndexStrings === -1) {
      this.selectedlistOfCategories.push(categoryString);
    }
    // id`s
    let existsIndexId = this.multipleCategories.indexOf(this.postsCreationForm.value.categoryId);
    if (existsIndexId === -1) {
      this.multipleCategories.push(this.postsCreationForm.value.categoryId);
    }
    this.catString = this.multipleCategories.join();
  }
  //send post to server
  addPost() {
    const input = new FormData();
    input.append('title', this.postsCreationForm.value.title);
    input.append('description', this.postsCreationForm.value.description);
    input.append('categoryId', this.catString);
    if(this.postsCreationForm.value.cb == true){
      input.append('price', "0");
    }
    else if (this.postsCreationForm.value.cb == false){
      input.append('price', this.postsCreationForm.value.price);
    }
    input.append('locationId', this.postsCreationForm.value.city);
    input.append('startingDate',this.formattedDate);
    input.append('address', this.postsCreationForm.value.addres);
    if (this.statusOfPost === 'offer' && this.statusOfPost != undefined) {
      input.append('status', 'offer');
      input.append('offeredExecutorId', this.offeredExecutor);
      this.postsService.addOfferPost(input).then(() => {
        this.router.navigate(['/dashboard']);
      });
    } else {
      this.postsService.addPost(input)
        .then(() => {
          this.router.navigate(['/dashboard']);
        })
        .catch((err) => {
          const activePopUp = this.modalService.open(ActionResultNotificatorPopUpComponent);
          activePopUp.componentInstance.succes = false;
          activePopUp.componentInstance.message = "Вы не заполнили форму до конца.";
        });
    }

  }
  readUrl(event: any, element: HTMLInputElement, img: HTMLInputElement) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        if (img.name == "photo1") {
          this.photoUrl1 = event.target.result;
        }
        else {
          this.photoUrl2 = event.target.result;
        }
      }
      reader.readAsDataURL(event.target.files[0]);
      //checkvisibility
      this.visibility = !this.visibility;
    }
    //inputValue check
    let file = event.target.files[0];
    let fileName = file.name;
    if (element.name == 'fileUpload1') {
      this.photoName = fileName;
    }
    if (element.name == 'fileUpload2') {
      this.photoName2 = fileName;
    }

  }
  //REMOVEFILE
  removeFile(img: HTMLInputElement, textInput: HTMLInputElement) {
    img.src = "";
    if (textInput.name == 'fileUpload1') {
      this.photoName = "";
    }
    else {
      this.photoName2 = "";
    }
  }
  //
  // ADDING DYNAMICALY INPUT ELEMENTS
  //
  ngOnInit() {
    //get init width
    this.initWidth = document.body.clientWidth;
    console.log("Init width ",  this.initWidth);
    //console.log("Inner width : ",window.innerWidth); // broken
    //console.log("clientWidth : ",document.body.clientWidth); // true
    //console.log ("InitWidth : ",this.initWidth);
    //
    //console.log(this.date)
    this.postsService.getallCategories().then((result) => {
      this.categories = result;
    });
    this.postsService.getallLocations().then((result) => {
      this.locations = result.response;
    });
    this.route.queryParams.subscribe(params => {
      if (params['status']) {
        this.statusOfPost = params['status'];
      }
      if (params['offerTo']) {
        this.offeredExecutor = params['offerTo'];
      }

    });

    this.postsCreationForm = new FormGroup(
      {
        "price": new FormControl("", Validators.required),
        "title": new FormControl("", Validators.required),// TICK
        //"location": new FormControl("Киев", Validators.required),
        "description": new FormControl("", Validators.required),
        "categoryId": new FormControl("", Validators.required), // TICK
        "city": new FormControl("", Validators.required),
        "address": new FormControl("", Validators.required),
         "cb" : new FormControl(false, Validators.required),
         "date" : new FormControl(""),


      })
  }
}
