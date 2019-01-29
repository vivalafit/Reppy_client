import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { PostsService } from '../../services/posts.service'
@Component({
    selector: 'ngx-pie',
    templateUrl: './pie.component.html',
    styleUrls: ['./pie.component.sass']
})
export class PieComponent implements OnInit {
    @Input() url: string;
    @Input() alt: string;
    @Input() percentage: number;
    @Input() size: number;
    @Input() reppyMargin: number;
    TOTAL = 1.58;
    STROKE_WIDTH = 0.5;
    strokeDasharray: string = '0, 158';

    constructor(private cd: ChangeDetectorRef, private postsService: PostsService) { }

    numberFixer(num) {
        const result = ((num * (this.size * this.TOTAL)) / 100);
        return result;
    }
    setPercentage(num) {
        this.strokeDasharray = this.numberFixer(num) + ', ' + (this.size * this.TOTAL);
        return this.strokeDasharray;
    }
    ngOnInit() {
        setTimeout(() => {
            this.setPercentage(this.percentage);
        });
    }

}