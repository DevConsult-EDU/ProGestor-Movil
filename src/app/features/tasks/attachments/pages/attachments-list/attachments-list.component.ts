import {Component, inject, Input, OnInit} from '@angular/core';
import { UserListed } from 'src/app/shared/interfaces/userListed.interface';
import {AttachmentsListed} from "../../../../../shared/interfaces/attachments-listed";
import {AttachmentsListService} from "../../services/attachments-list-service/attachments-list.service";
import {DownloadAttachmentService} from "../../services/download-attachment-service/download-attachment.service";
import {UserListService} from "../../../../users/services/user-list-service/user-list.service";
import {DeleteAttachmentService} from "../../services/delete-attachment-service/delete-attachment.service";

@Component({
  selector: 'app-attachments-list',
  standalone: false,
  templateUrl: './attachments-list.component.html',
  styleUrls: ['./attachments-list.component.scss'],
})
export class AttachmentsListComponent  implements OnInit {

  public users = [] as UserListed[];
  public attachments = [] as AttachmentsListed[];
  public _taskId!: string;

  @Input()
  set taskId(taskId: string) {
    this._taskId = taskId;
  }

  attachmentListService = inject(AttachmentsListService);
  downloadAttachmentService = inject(DownloadAttachmentService);
  userListService = inject(UserListService);
  deleteAttachmentService = inject(DeleteAttachmentService);

  ngOnInit() {

    this.getAttachments();

    this.userListService.invoke().subscribe((response: UserListed[]) => {
      this.users = response;
    })

  }

  public getAttachments() {
    this.attachmentListService.invoke(this._taskId).subscribe((response: AttachmentsListed[]) => {
      this.attachments = response;
    })
  }

  deleteAttachment(id: string) {

    const confirmDelete = window.confirm('¿Estas seguro de que deseas eliminar este archivo?');

    if (confirmDelete) {
      this.deleteAttachmentService.deleteAttachment(id)
        .subscribe({
          next: () => {
            window.location.reload();
          },
          error: (error) => {
            console.error('Error al eliminar el archivo:', error);
          }
        });
    }

  }

  downloadAttachment(idAttachment: string, fileName: string): void {
    this.downloadAttachmentService.downloadAttachment(idAttachment, fileName)
      .subscribe({
        next: () => console.log('Archivo descargado correctamente'),
        error: (error) => console.error('Error al descargar el archivo:', error)
      });
  }

}
