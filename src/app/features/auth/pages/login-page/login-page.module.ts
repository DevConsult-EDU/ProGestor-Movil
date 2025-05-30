import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginPageComponent} from "./login-page.component";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterLink, RouterModule} from "@angular/router";
import {IonicModule} from "@ionic/angular";


@NgModule({
  declarations: [LoginPageComponent],
  imports: [
    ReactiveFormsModule,
    RouterLink,
    CommonModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: LoginPageComponent
      }
    ]),
  ]
})
export class LoginPageModule {
}
