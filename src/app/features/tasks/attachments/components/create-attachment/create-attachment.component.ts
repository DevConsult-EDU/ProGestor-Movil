import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {CreateAttachmentService} from "../../services/create-attachment-service/create-attachment.service";
import {ModalService} from "../../../../../shared/modal/modal.service";

export interface CreateAttachment {
  file_name: string | undefined;
  file: any
}

@Component({
  selector: 'app-create-attachment',
  standalone: false,
  templateUrl: './create-attachment.component.html',
  styleUrls: ['./create-attachment.component.scss'],
})
export class CreateAttachmentComponent  implements OnInit {

  @ViewChild('fileInput') fileInput: any;
  protected createAttachmentForm!: FormGroup;
  public taskId: string | undefined = undefined;
  public filesSelected: File[] = [];

  constructor(private formBuilder: FormBuilder,
              private createAttachmentService: CreateAttachmentService,
              private modalService: ModalService) {
    this.buildForm();
  }


  ngOnInit() {

  }

  public buildForm() {
    this.createAttachmentForm = this.formBuilder.group<CreateAttachment>({
      file_name: undefined,
      file: undefined,
    });
  }

  public attachFile() {
    this.fileInput.nativeElement.click();
  }

  public storeAttachment($event: any) {
    $event.preventDefault();
    const documentoData = new FormData();
    const nombresArchivos = this.createAttachmentForm.get('file_name')?.value || [];
    const contenidosArchivos = this.createAttachmentForm.get('file')?.value || [];

    for (let i = 0; i < this.filesSelected.length; i++) {
      documentoData.append('file_name[]', nombresArchivos[i]);
      documentoData.append('file[]', contenidosArchivos[i]);
    }

    this.createAttachmentService.uploadAttachment(this.taskId, documentoData).subscribe({
      next: (result) => {
        this.closeModal();
        window.alert('Archivo creado correctamente');
        window.location.reload();
      }, error: (errorResponse) => {
        window.alert('Ha habido un error creando el archivo. Intentelo de nuevo');
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

  public uploadFileChanged($event: any) {
    if ($event.target && $event.target.files.length > 0) {
      const nombresArchivos = this.createAttachmentForm.get('file_name')?.value || [];
      const contenidoArchivos = this.createAttachmentForm.get('file')?.value || [];
      this.createAttachmentForm.get('file_name')?.setValue([]);
      this.createAttachmentForm.get('file')?.setValue([]);

      for (let i = 0; i < $event.target.files.length; i++) {
        const file = $event.target.files[i];
        this.filesSelected.push(file);
        nombresArchivos.push(file.name);

        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = () => {
          if (reader.result) {
            let arrayBuffer = reader.result as ArrayBuffer;
            let blob = new Blob([arrayBuffer], { type: file.type });
            contenidoArchivos.push(blob);
          }
        };
      }
      this.createAttachmentForm.get('file_name')?.setValue(nombresArchivos);
      this.createAttachmentForm.get('file')?.setValue(contenidoArchivos);
    }
  }

  public eliminarDocumentoSubido(index: number): void {
    this.filesSelected.splice(index, 1);
    this.createAttachmentForm.get('file')?.value.splice(index, 1);
    const nombresArchivos = this.createAttachmentForm.get('file_name')?.value || [];
    nombresArchivos.splice(index, 1);
    this.createAttachmentForm.get('file_name')?.setValue(nombresArchivos.length > 0 ? nombresArchivos : null);
  }

}
