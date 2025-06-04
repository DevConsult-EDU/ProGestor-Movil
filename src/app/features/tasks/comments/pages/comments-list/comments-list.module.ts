import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CommentsListComponent} from "./comments-list.component";
import {IonicModule} from "@ionic/angular";



@NgModule({
  declarations: [CommentsListComponent],
  exports: [
    CommentsListComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
  ]
})
export class CommentsListModule { }
