import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {CreateTimeEntryService} from "../../services/create-time-entry-service/create-time-entry.service";
import {CommonModule} from "@angular/common";
import {IonicModule, ModalController, ToastController} from "@ionic/angular";

export interface CreateTimeEntry {
  task_id: string | undefined;
  user_id: string | undefined;
  date: string | undefined;
  minutes: number | undefined;
  description: string | undefined;
}

@Component({
  selector: 'app-create-time-entry',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
  ],
  templateUrl: './create-time-entry.component.html',
  styleUrls: ['./create-time-entry.component.scss'],
})
export class CreateTimeEntryComponent implements OnInit {

  protected createTimeEntryForm!: FormGroup;
  public taskId: string | undefined = undefined;

  constructor(private formBuilder: FormBuilder,
              private createTimeEntryService: CreateTimeEntryService,
              private modalCtrl: ModalController,
              private toastController: ToastController) {
    this.buildForm();
  }


  ngOnInit() {
    console.log(this.taskId);
    this.createTimeEntryForm.get('task_id')?.setValue(this.taskId);
  }

  public buildForm() {
    this.createTimeEntryForm = this.formBuilder.group<CreateTimeEntry>({
      task_id: undefined,
      user_id: undefined,
      date: undefined,
      minutes: undefined,
      description: undefined,
    });
  }

  public storeTimeEntry($event: any) {
    $event.preventDefault();

    if (!this.taskId) {
      window.alert('Error: El ID de la tarea es necesario. No se puede crear la entrada de tiempo.');
      console.error('storeTimeEntry - Attempted to create entry but this.taskId is null or undefined:', this.taskId);
      return;
    }


    this.createTimeEntryService.createTimeEntry(this.createTimeEntryForm.value).subscribe({
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
