import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {PostsService} from '../../services/posts.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { ActionResultNotificatorPopUpComponent } from '../action-result-notificator-pop-up/action-result-notificator-pop-up.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
    selector: 'legal-entity-registration',
    templateUrl: './legal-entity-registration.component.html',
    styleUrls: ['./legal-entity-registration.component.sass']
  })
  export class LegalEntityRegistrationComponent implements OnInit {
      registrationForm: FormGroup;
      //
      locations: any;
      categories: any;
      // multipleCategories : Array[];
      multipleCategories: number[] = new Array();
      selectedlistOfCategories: string[] = new Array();
      catString: string ;
      constructor(
        private authService: AuthService,
        private postsService: PostsService,
        private router: Router,
        private modalService: NgbModal
      ) {}
      removeCategory(event) {
          let indexOfValue =  this.selectedlistOfCategories.indexOf(event.target.innerText);
          this.selectedlistOfCategories.splice(indexOfValue, 1);
          this.multipleCategories.splice(indexOfValue, 1);
          this.catString = this.multipleCategories.join();
      }
      // Add multiple categories
      multiplyCategory(event: any, categoryString: string) {
        let existsIndexStrings = this.selectedlistOfCategories.indexOf(categoryString);
        if (existsIndexStrings === -1) {
            this.selectedlistOfCategories.push(categoryString);
        }
        // id`s
        let existsIndexId = this.multipleCategories.indexOf(this.registrationForm.value.categoryId);
        if (existsIndexId === -1) {
            this.multipleCategories.push(this.registrationForm.value.categoryId);
        }
        this.catString = this.multipleCategories.join();

      }
      registerCompany(){
        this.authService.registerCompany({
          name : this.registrationForm.value.name,
          workingYears : this.registrationForm.value.age,
          workersCount :  this.registrationForm.value.employeeCount,
          email : this.registrationForm.value.email,
          tel : this.registrationForm.value.tel,
          password : this.registrationForm.value.password,
          locationId : this.registrationForm.value.cityId,
          categoryId :  this.catString,
          specialization : this.registrationForm.value.specialization,
          taxStatus : this.registrationForm.value.taxStatus,
          taxSystem : this.registrationForm.value.taxSystem,
          vat : this.registrationForm.value.vat
        }).then((data) => {
            const activePopUp = this.modalService.open(ActionResultNotificatorPopUpComponent);
            activePopUp.componentInstance.succes = true;
            activePopUp.componentInstance.message = "Все функции сайта будут доступны после подтверждения вашых данных. Спасибо за внимание !";
            this.router.navigate(['/home']);
        }).catch(err => {
            let error = err.json().response;
            const activePopUp = this.modalService.open(ActionResultNotificatorPopUpComponent);
            activePopUp.componentInstance.succes = false;
            activePopUp.componentInstance.message = error;
        });
      }
      ngOnInit(){

        //    vat - НДС\без НДС(на бек отправляем 1 если с НДС или 0 если без НДС)
        this.postsService.getallCategories().then((result) => {
              this.categories = result;
            });
        this.postsService.getallLocations().then((result) => {
              this.locations = result.response;
            });
        this.registrationForm = new FormGroup(
              {
              'name': new FormControl('', [
                Validators.required,
                Validators.pattern('^.*[a-zA-Z_а-яА-Я]{3,20}.*$')
              ]),
              'age': new FormControl('', [
                Validators.required,
                Validators.pattern('[0-9]{1,}')
              ]),
              'employeeCount': new FormControl('', [
                Validators.required,
                Validators.pattern('[0-9]{1,}')
              ]),
              'email': new FormControl('', [
                Validators.required,
                Validators.pattern('[a-zA-Z_0-9]+@[a-zA-Z_]+?\.com')
              ]),
              'tel': new FormControl('', [
                Validators.required,
                Validators.pattern('380[0-9]{9}')
                //  Validators.pattern('[0-9]{3}[0-9]{9}') - чекни
              ]),
              'password': new FormControl('', [
                  Validators.required,
                  Validators.pattern(/^(?=.*\d)(?=.*[A-Za-z]).{11,}$/),
              ]),
              'cityId': new FormControl('', Validators.required),
              'categoryId': new FormControl('', Validators.required),
              'specialization': new FormControl('',[
              Validators.required,
              Validators.minLength(1)
              ]),
              'taxStatus': new FormControl('default', Validators.required), // passdefault
              'taxSystem': new FormControl('', Validators.required),
              'vat': new FormControl('', Validators.required)
              });
      }
  }
