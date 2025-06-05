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
  public rol!: string|null;
  public name!: string|null;

  @Input()
  set taskId(taskId: string) {
    this._taskId = taskId;
  }

  attachmentListService = inject(AttachmentsListService);
  downloadAttachmentService = inject(DownloadAttachmentService);
  userListService = inject(UserListService);
  deleteAttachmentService = inject(DeleteAttachmentService);

  constructor() {
    this.rol = localStorage.getItem('rol')
    this.name = localStorage.getItem('name')
  }

  ngOnInit() {

    this.getAttachments();

    this.userListService.invoke().subscribe((response: UserListed[]) => {
      this.users = response;
    })

  }

  public getUserName(userId: string | number): string {
    if (!this.users || this.users.length === 0) {
      return 'Cargando...';
    }

    const user = this.users.find(u => String(u.id) === String(userId));
    return user ? user.name : 'Usuario Desconocido';
  }

  public getAttachments() {
    this.attachmentListService.invoke(this._taskId).subscribe((response: AttachmentsListed[]) => {
      this.attachments = response;
    })
  }



  getFileIconName(fileName: string): string {
    const extension = fileName.split('.').pop()?.toLowerCase();
    if (extension === 'pdf') {
      return 'document-text-outline'; // O un icono específico de PDF si tienes
    } else if (['png', 'jpg', 'jpeg', 'gif', 'webp'].includes(extension || '')) {
      return 'image-outline';
    } else if (['doc', 'docx'].includes(extension || '')) {
      return 'document-text-outline'; // O icono de Word
    } else if (['xls', 'xlsx'].includes(extension || '')) {
      return 'stats-chart-outline'; // O icono de Excel
    }
    return 'document-outline'; // Icono por defecto
  }

}
