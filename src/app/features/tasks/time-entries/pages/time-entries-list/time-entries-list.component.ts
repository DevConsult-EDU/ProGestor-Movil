import {Component, inject, Input, OnInit} from '@angular/core';
import { TimeEntriesListed } from 'src/app/shared/interfaces/time-entries-listed';
import { UserListed } from 'src/app/shared/interfaces/userListed.interface';
import {TimeEntriesListService} from "../../services/time-entries-list-service/time-entries-list.service";
import {UserListService} from "../../../../users/services/user-list-service/user-list.service";
import {Router} from "@angular/router";
import {CreateTimeEntryComponent} from "../../components/create-time-entry/create-time-entry.component";

@Component({
  selector: 'app-time-entries-list',
  standalone: false,
  templateUrl: './time-entries-list.component.html',
  styleUrls: ['./time-entries-list.component.scss'],
})
export class TimeEntriesListComponent  implements OnInit {

  public users = [] as UserListed[];
  public timeEntries = [] as TimeEntriesListed[];
  public _taskId!: string;

  //@ViewChild (CommentsComponent) private commentsComponent!: CommentsComponent;

  @Input()
  set taskId(taskId: string) {
    this._taskId = taskId;
  }

  timeEntriesListService = inject(TimeEntriesListService);
  userListService = inject(UserListService);
  router = inject(Router)
  //deleteTimeEntryService = inject(DeleteTimeEntryService);

  ngOnInit() {

    this.getTimeEntries();

    this.userListService.invoke().subscribe((response: UserListed[]) => {
      this.users = response;
    })

  }

  public getTimeEntries() {
    this.timeEntriesListService.invoke(this._taskId).subscribe((response: TimeEntriesListed[]) => {
      this.timeEntries = response;
    })
  }

  // public navigateDetailsTimeEntry(id: string): void {
  //   this.router.navigate(['/auth/time-entries', id]);
  // }
  //
  // deleteTimeEntry(id: string) {
  //
  //   const confirmDelete = window.confirm('¿Estas seguro de que deseas eliminar esta entrada de tiempo?');
  //
  //   if (confirmDelete) {
  //     this.deleteTimeEntryService.deleteTimeEntry(id)
  //       .subscribe({
  //         next: () => {
  //           window.location.reload();
  //         },
  //         error: (error) => {
  //           console.error('Error al eliminar la entrada:', error);
  //         }
  //       });
  //   }
}
