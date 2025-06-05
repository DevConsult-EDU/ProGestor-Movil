import {Component, Input, OnInit} from '@angular/core';
import {UpdateTimeEntryService} from "../../services/update-time-entry-service/update-time-entry.service";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {TimeEntry} from "../../../../../shared/interfaces/time-entry";
import {IonicModule, ModalController, ToastController} from "@ionic/angular";
import {TimeEntriesListService} from "../../services/time-entries-list-service/time-entries-list.service";
import {ShowTimeEntryService} from "../../services/show-time-entry-service/show-time-entry.service";

export interface UpdateTimeEntry {
  task_id: string | undefined;
  user_id: string | undefined;
  date: string | undefined;
  minutes: number | undefined;
  description: string | undefined;
}

@Component({
  selector: 'app-update-time-entry',
  standalone: true,
  templateUrl: './update-time-entry.component.html',
  styleUrls: ['./update-time-entry.component.scss'],
  imports: [
    IonicModule,
    ReactiveFormsModule
  ]
})
export class UpdateTimeEntryComponent {

  protected updateTimeEntryForm!: FormGroup;
  public timeEntryId!: string;
  public _timeEntry!: TimeEntry;

  constructor(private formBuilder: FormBuilder,
              private updateTimeEntryService: UpdateTimeEntryService,
              private modalCtrl: ModalController,
              private toastController: ToastController,
              private showTimeEntryService: ShowTimeEntryService) {
    this.buildForm();
  }

  public ionViewWillEnter() {
    this.showTimeEntryService.invoke(this.timeEntryId).subscribe({
      next: (timeEntry) => {
        this._timeEntry = timeEntry;
        this.fillForm()
      }
    })
  }

  public buildForm() {
    this.updateTimeEntryForm = this.formBuilder.group<UpdateTimeEntry>({
      task_id: undefined,
      user_id: undefined,
      date: undefined,
      minutes: undefined,
      description: undefined,
    });
  }

  private fillForm() {
    this.updateTimeEntryForm.patchValue({
      task_id:  this._timeEntry.task_id,
      user_id:  this._timeEntry.user_id,
      date:  this._timeEntry.date,
      minutes:  this._timeEntry.minutes,
      description:  this._timeEntry.description,
    })
  }

  editTimeEntry($event: any) {
    $event.preventDefault();
    this.updateTimeEntryService.updateTimeEntry(this.updateTimeEntryForm.value, this.timeEntryId).subscribe({
      next: async (result) => {
        const toaster = await this.toastController.create({
          message: 'Entrada de tiempo actualizada correctamente',
          position: 'bottom',
          duration: 3000,
          color: 'success',
        })
        await toaster.present();
        await this.modalCtrl.dismiss(true, 'confirm');
      }, error: async (errorResponse) => {
        const toaster = await this.toastController.create({
          message: 'Error al actualizar la entrada de tiempo',
          position: 'bottom',
          duration: 3000,
          color: 'danger',
        })
        await toaster.present();
        await this.modalCtrl.dismiss(false, 'close');
      }
    })

  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

}
