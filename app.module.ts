import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {Routes, RouterModule, CanActivate} from '@angular/router';
import { HttpModule} from '@angular/http';
// SERVICES
import { HttpService } from './services/http.service';
import { AuthService } from './services/auth.service';
import { PostsService } from './services/posts.service';
import { EmployeeService } from './services/employee.service';
import { EmployerService } from './services/employer.service';
// Guards
import { RouteGuardService as  AuthGuard} from './guards/route-guard.service';
import { GuestGuardService as  GuestGuard} from './guards/guest-guard.service';
// Components
//
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { OrderComponent } from './components/order/order.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { HomeComponent } from './components/home/home.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { PassportComponent } from './components/passport/passport.component';
import { PortableRegisterComponent } from './components/home/portable-register/portable-register.component';
import { HeaderComponent } from './components/header/header.component';
import { FreelancerComponent } from './components/freelancer/freelancer.component';
import { CustomerComponent } from './components/customer/customer.component';
import { LegalEntityRegistrationComponent } from './components/legal-entity-registration/legal-entity-registration.component';
// ResponseParts
//
import { NotFoundComponent } from './components/response-components/not-found/not-found.component';
import { ResetSuccesComponent } from './components/response-components/reset-succes/reset-succes.component';
import { ResetLinkComponent } from './components/response-components/reset-link/reset-link.component';
// Angular material Pop-up
//
// Token jwtHelper
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
//
import {
  MatButtonModule, MatCardModule, MatDialogModule, MatIconModule, MatMenuModule,
  MatToolbarModule, MatRadioModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TestComponent } from './components/home/test/test.component';
// Angular 2 Stet-by-step-Wizard
//
import { FormWizardModule } from 'angular2-wizard';
// Translate NgModule
//
import {TranslateModule} from '@ngx-translate/core';
// Bootstrap Pop-up Module
//
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PostsComponent } from './components/posts/posts.component';
import { PostsByCategoryComponent } from './components/posts-by-category/posts-by-category.component';
import { UserComponent } from './components/user/user.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FiltersComponent } from './components/posts/filters/filters.component';
import { FreelancersComponent } from './components/freelancers/freelancers.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { LogRegComponent } from './components/modals/logreg/logreg.component';
import { PostPopUpComponent } from './components/post-popup/postpopup.component';
//
// Import ng-circle-progress
import { NgCircleProgressModule } from 'ng-circle-progress';
// Additional component helpers
import { LetterColorComponent } from './components/letter-color/letter.color.component';
import { PieComponent } from './components/pie/pie.component';
import { SearchComponent } from './components/search/search.component';
import { PopoverComponent } from './components/popover/popover.component';
import { SwitchComponent } from './components/switch/switch.component';
import { AdvertBlockComponent } from './components/advert-block/advert-block.component';
import {VersionBuildPopUpComponent} from './components/version-build-pop-up/version-build-pop-up.component';
import {FooterComponent} from './components/footer/footer.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { HirePopUpComponent } from './components/hire-pop-up/hire-pop-up.component';
import { DashboardHirePopUpComponent } from './components/dashboard-hire-pop-up/dashboard-hire-pop-up.component';
import { FaqComponent } from './components/faq/faq.component';
import { DashboardLookPostPopUpComponent } from './components/dashboard-look-post-pop-up/dashboard-look-post-pop-up.component';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { PostsOutputComponent } from './components/posts-output/posts-output.component';
import { DashboardEditPostPopUpComponent } from './components/dashboard-edit-post-pop-up/dashboard-edit-post-pop-up.component'
import { FreelancersOutputComponent } from './components/freelancers-output/freelancers-output.component';
import { DashboardCreateReviewPopUpComponent } from './components/dashboard-create-review-pop-up/dashboard-create-review-pop-up.component';
import { DashboardCompleteTaskPopUpComponent } from './components/dashboard-complete-task-pop-up/dashboard-complete-task-pop-up.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { DashboardCancelRequestPopUpComponent } from './components/dashboard-cancel-request-pop-up/dashboard-cancel-request-pop-up.component';
import { ActionResultNotificatorPopUpComponent } from './components/action-result-notificator-pop-up/action-result-notificator-pop-up.component';
import { DashboardCancelOfferPopUpComponent } from './components/dashboard-cancel-offer-pop-up/dashboard-cancel-offer-pop-up.component';
import { DashboardCancelCustomerOfferPopUpComponent } from './components/dashboard-cancel-customer-offer-pop-up/dashboard-cancel-customer-offer-pop-up.component';
import { DashboardAcceptCustomerOfferPopUpComponent } from './components/dashboard-accept-customer-offer-pop-up/dashboard-accept-customer-offer-pop-up.component';
import { CategoryFilterComponent } from './components/categoty-filter/category-filter.component'
import { NotificationListComponent } from './components/notification-list/notification-list.component';
import { ClickOutsideDirective } from './directives/click-outside.directive';

// определение маршрутов
const appRoutes: Routes = [
    { path: '', component : HomeComponent},
    { path: 'home', component: HomeComponent},
    { path: 'login', component: LoginComponent, canActivate : [AuthGuard]},
    { path: 'register', component: RegistrationComponent,canActivate : [AuthGuard]},
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'reset-password', component: ResetPasswordComponent },
    { path: 'orders', component : OrderComponent, canActivate : [AuthGuard]},
    { path: 'passport', component: PassportComponent},
    { path: 'not-found', component: NotFoundComponent},
    { path: 'reset-succes', component: ResetSuccesComponent},
    { path: 'reset-send', component: ResetLinkComponent},
    { path: 'posts', component: PostsComponent},
    { path: 'freelancers', component: FreelancersComponent},
    // { path: 'posts/:categoryId',component : PostsByCategoryComponent},
    { path: 'user', component: UserComponent,canActivate : [GuestGuard]},
    { path: 'dashboard', component: DashboardComponent,canActivate : [GuestGuard]},
    { path: 'create-post', component: CreatePostComponent,canActivate : [GuestGuard]},
    { path: 'search', component: SearchPageComponent},
    { path: 'edit-profile', component: EditProfileComponent,canActivate : [GuestGuard]},
    { path: 'entity-registration', component: LegalEntityRegistrationComponent},
    { path: '**', component : NotFoundComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    LegalEntityRegistrationComponent,
    OrderComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    PassportComponent,
    NotFoundComponent,
    ResetSuccesComponent,
    ResetLinkComponent,
    TestComponent,
    PortableRegisterComponent,
    PostsComponent,
    PostsByCategoryComponent,
    UserComponent,
    FiltersComponent,
    FreelancersComponent,
    CreatePostComponent,
    PieComponent,
    LetterColorComponent,
    HomeComponent,
    HeaderComponent,
    SearchComponent,
    PopoverComponent,
    SwitchComponent,
    AdvertBlockComponent,
    LogRegComponent,
    FooterComponent,
    VersionBuildPopUpComponent,
    PaginationComponent,
    DashboardComponent,
    FreelancerComponent,
    HirePopUpComponent,
    CustomerComponent,
    PostPopUpComponent,
    DashboardHirePopUpComponent,
    DashboardLookPostPopUpComponent,
    DashboardEditPostPopUpComponent,
    SearchPageComponent,
    PostsOutputComponent,
    FreelancersOutputComponent,
    DashboardCreateReviewPopUpComponent,
    DashboardCompleteTaskPopUpComponent,
    EditProfileComponent,
    DashboardCancelRequestPopUpComponent,
    ActionResultNotificatorPopUpComponent,
    DashboardCancelOfferPopUpComponent,
    DashboardCancelCustomerOfferPopUpComponent,
    DashboardAcceptCustomerOfferPopUpComponent,
    NotificationListComponent,
    FaqComponent,
    ClickOutsideDirective,
    CategoryFilterComponent
  ],
  imports: [
    BrowserModule,
    JwtModule.forRoot({
     config: {
       blacklistedRoutes: ['localhost:3001/auth/']
     }
    }),
    // Specify ng-circle-progress as an import
    NgCircleProgressModule.forRoot({
  'radius': 60,
  'space': -10,
  'outerStrokeWidth': 10,
  'outerStrokeColor': '#4882c2',
  'innerStrokeColor': '#e7e8ea',
  'innerStrokeWidth': 10,
  'title': 'UI',
  'animateTitle': false,
  'animationDuration': 1000,
  'showUnits': false,
  'showBackground': false,
  'clockwise': false,

  }),
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    MatToolbarModule,
    MatRadioModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    BrowserAnimationsModule,
    FormWizardModule,
    TranslateModule.forRoot(),
    NgbModule.forRoot()
  ],
  providers: [
    HttpService,
    AuthService,
    PostsService,
    AuthGuard,
    GuestGuard,
    JwtHelperService,
    EmployeeService,
    EmployerService,
    NgbActiveModal,
    CategoryFilterComponent,
    FreelancersComponent,
    PostsComponent
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    TestComponent,
    PortableRegisterComponent,
    FiltersComponent,
    LogRegComponent,
    VersionBuildPopUpComponent,
    HirePopUpComponent,
    PostPopUpComponent,
    DashboardHirePopUpComponent,
    FaqComponent,
    DashboardLookPostPopUpComponent,
    DashboardCreateReviewPopUpComponent,
    DashboardEditPostPopUpComponent,
    DashboardCompleteTaskPopUpComponent,
    DashboardCancelRequestPopUpComponent,
    DashboardCancelOfferPopUpComponent,
    DashboardCancelCustomerOfferPopUpComponent,
    ActionResultNotificatorPopUpComponent,
    DashboardAcceptCustomerOfferPopUpComponent,
    CategoryFilterComponent
  ]
})
export class AppModule { }
