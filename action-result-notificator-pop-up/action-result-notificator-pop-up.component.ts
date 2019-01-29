import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-action-result-notificator-pop-up',
  templateUrl: './action-result-notificator-pop-up.component.html',
  styleUrls: ['./action-result-notificator-pop-up.component.sass']
})
export class ActionResultNotificatorPopUpComponent implements OnInit {

  message : string ;
  error: string;
  succes : boolean;
  title: string;

  constructor(
        public activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
    if (!this.succes) this.title = "Ошибка";
    else this.title = "Выполнено!"; 
    if (this.message == "EXISTING_EMAIL")
    this.error = "Указанный адрес электронной почты уже зарегистрирован ранее.";
    else if (this.message == "INCORRECT_FIST_LAST_NAME_LENGTH")
    this.error = "Имя и/или фамилия слишком короткие.";
    else if (this.message == "INCORRECT_FIST_LAST_NAME_SYMBOLS")
    this.error = "Имя и/или фамилия содержат недопустимые символы.";
    else if (this.message == "EXISTING_REQUEST")
    this.error = "Заявка по объявлению уже отправлена.";
    else if (this.message == "REQUEST_ADDED")
    this.error = "Заявка отправлена.";
    else this.error = this.message;
  }

}
