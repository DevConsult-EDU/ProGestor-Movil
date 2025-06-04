import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IonicModule} from "@ionic/angular";
import { ProjectDetailsComponent } from './project-details.component';
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [ProjectDetailsComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProjectDetailsComponent,
      }
    ])
  ]
})
export class ProjectDetailsModule { }
