import { Component, OnInit } from '@angular/core';
import {CreateCommentService} from "../../services/create-comment-service/create-comment.service";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {IonicModule, ModalController, ToastController} from "@ionic/angular";
import {CommonModule} from "@angular/common";

export interface CreateComment {
  task_id: string | undefined;
  user_id: string| undefined;
  comment: string | undefined;
  created_at: string | undefined;
}

@Component({
  selector: 'app-create-comment',
  standalone: true,
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule
  ]
})
export class CreateCommentComponent  implements OnInit {

  protected createCommentForm!: FormGroup;
  public taskId: string | undefined = undefined;

  constructor(private formBuilder: FormBuilder,
              private createCommentService: CreateCommentService,
              private toastController: ToastController,
              private modalCtrl: ModalController) {
    this.buildForm();
  }


  ngOnInit() {
    this.createCommentForm.get('task_id')?.setValue(this.taskId);
  }

  public buildForm() {
    this.createCommentForm = this.formBuilder.group<CreateComment>({
      task_id: undefined,
      user_id: undefined,
      comment: undefined,
      created_at: undefined,
    });
  }

  public storeComment($event: any) {

    $event.preventDefault();

    this.createCommentService.createComment(this.createCommentForm.value).subscribe({
      next: async (result) => {
        const toaster = await this.toastController.create({
          message: 'Entrada de tiempo creada correctamente',
          position: 'bottom',
          duration: 3000,
          color: 'success',
        })
        await toaster.present();
        await this.modalCtrl.dismiss(true, 'confirm');
      }, error: async (errorResponse) => {
        const toaster = await this.toastController.create({
          message: 'Error al crear la entrada de tiempo',
          position: 'bottom',
          duration: 3000,
          color: 'danger',
        })
        await toaster.present();
        await this.modalCtrl.dismiss(false, 'close');
      }
    });

  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

}
