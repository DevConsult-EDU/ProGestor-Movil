import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CreateAttachmentComponent} from "./create-attachment.component";
import {IonicModule} from "@ionic/angular";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [CreateAttachmentComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: CreateAttachmentComponent,
      }
    ])
  ]
})
export class CreateAttachmentModule { }
