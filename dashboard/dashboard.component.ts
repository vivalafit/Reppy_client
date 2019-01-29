import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service'

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit, OnDestroy {
    user: any;
    mode: string;
    modeSubscribtion: any;
    userSubscribtion: any;
    constructor(
        private authService: AuthService
    ) { }
    ngOnInit() {

        this.mode = this.authService.getMode();
        this.modeSubscribtion = this.authService.modeSubject
            .subscribe((mode: string) => {
                this.mode = mode;
        });
        this.user = this.authService.getUserData();
        this.userSubscribtion = this.authService.userSubject
            .subscribe((user: any) => {
                this.user = user;
        });
    }
    setMode(e) {
        const mode = e ? 'c' : 'f';
        this.authService.setMode(mode);
    }
    ngOnDestroy() {
        this.modeSubscribtion.unsubscribe();
        this.userSubscribtion.unsubscribe();
    }
}
