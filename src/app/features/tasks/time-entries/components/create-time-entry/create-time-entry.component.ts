import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ModalService} from "../../../../../shared/modal/modal.service";
import {CreateTimeEntryService} from "../../services/create-time-entry-service/create-time-entry.service";

export interface CreateTimeEntry {
  task_id: string | undefined;
  user_id: string | undefined;
  date: string | undefined;
  minutes: number | undefined;
  description: string | undefined;
}

@Component({
  selector: 'app-create-time-entry',
  standalone: false,
  templateUrl: '../../pages/create-time-entry.component.html',
  styleUrls: ['./create-time-entry.component.scss'],
})
export class CreateTimeEntryComponent  implements OnInit {

  protected createTimeEntryForm!: FormGroup;
  public taskId: string | undefined = undefined;

  constructor(private formBuilder: FormBuilder,
              private createTimeEntryService: CreateTimeEntryService,
              private modalService: ModalService) {
    this.buildForm();
  }


  ngOnInit() {
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
      next: (result) => {
        this.closeModal();
        window.alert('Entrada creada correctamente');
      }, error: (errorResponse) => {
        window.alert('Ha habido un error creando la entrada. Intentelo de nuevo');
        console.log(errorResponse);
      }
    });

  }

  public closeModal() {
    this.modalService.close(true);
  }

  public dismissModal() {
    this.modalService.dismiss();
  }

}
