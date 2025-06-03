import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AttachmentsListComponent} from "./attachments-list.component";
import {IonicModule} from "@ionic/angular";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [AttachmentsListComponent],
  exports: [
    AttachmentsListComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: AttachmentsListComponent,
      }
    ])
  ]
})
export class AttachmentsListModule { }
