import { Component, OnInit, Input ,OnChanges, SimpleChanges, SimpleChange} from '@angular/core';

@Component({
    selector: 'letter-color',
    templateUrl: './letter.color.component.html',
    styleUrls: ['./letter.color.component.sass']
})
export class LetterColorComponent implements OnChanges,OnInit {
    @Input() word: string;
    @Input() size: string;
    firstLetter: string;
    otherPart: string;
    constructor() { }

    ngOnChanges(changes: SimpleChanges) {
       const word: SimpleChange = changes.word;
       this.firstLetter = word.currentValue[0];
       this.otherPart = word.currentValue.substr(1);
    }

    ngOnInit() {
          this.firstLetter = this.word[0];
          this.otherPart = this.word.substr(1);
    }

}
