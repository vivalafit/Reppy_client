import { Input, Component, OnInit, EventEmitter, Output } from '@angular/core'
import { PostsService } from '../../services/posts.service';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { FreelancersComponent } from '../freelancers/freelancers.component';
import { forEach } from '@angular/router/src/utils/collection';
import { PostsComponent } from '../posts/posts.component';


@Component({
    selector: 'category-filter',
    templateUrl: './category-filter.component.html',
    styleUrls: ['./category-filter.component.sass']
})

export class CategoryFilterComponent implements OnInit {
    @Input() foundLength: number;
    @Input() mode: string;
    categories: Array<any>;
    length: any;
    public chosenCategory: any;
    observableCategory: BehaviorSubject<any>;
    hidden: any = [];
    user: any;
    counts: any = [];
    counterHidden: boolean = true;
    constructor(private postsService: PostsService, private postsComponent: PostsComponent, private authService: AuthService, private freelancersComponent: FreelancersComponent) {
    }
    ngOnInit() {
        this.categories = JSON.parse(localStorage.getItem('categories'));
        this.authService.getUserData().then((user) => {
            this.user = user;
        });
        const userId = this.user ? this.user.id : this.user;
        for (var i = 2; i < this.categories.length; i++) {
            this.hidden[i] = false;

            console.log("HIDDEN", this.hidden[i]);
            if (this.mode == "freelancers") {
                this.authService.getAllFreelancersByCategory(i, userId).then((response) => {
                    if (response.count > 0) {
                        this.counts[i] = response.count;
                        console.log("Count: " + this.counts[i]);
                    }
                });
            }
            else {
                this.postsService.getPostsWithCategory(i, userId).then((response) => {
                    if (response.length > 0) {
                        this.counts[i] = response.count;
                    }
                })
            }
        }

    }
    chooseCategory(cat: any) {
        if (this.hidden[cat.id] == false) {
            this.counterHidden = false;
            Object.keys(this.hidden).forEach(i => {
                this.hidden[i] = false;
            });
            this.hidden[cat.id] = true;
            this.length = this.counts[cat.id];
            if (this.mode == "freelancers") {
                this.freelancersComponent.getAllFreelancers(cat.id);
            }
            else {
                this.postsComponent.showPosts(cat.id);
            }
        }
        else {
            this.counterHidden = true;
            this.hidden[cat.id] = false;
            if (this.mode == "freelancers") {
                this.freelancersComponent.getAllFreelancers();
            }
            else {
                this.postsComponent.showPosts();
            }
        }

        // if (cat.hidden){
        // cat.hidden = !cat.hidden;
        // this.chosenCategory = cat.id;
        // this.freelancersComponent.getAllFreelancers(cat.id);
        // }
    }
}
