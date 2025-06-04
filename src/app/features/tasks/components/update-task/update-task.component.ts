import { Component, OnInit } from '@angular/core';
import {UserListed} from "../../../../shared/interfaces/userListed.interface";
import {ProjectListed} from "../../../../shared/interfaces/projectListed.interface";
import {Task} from "../../../../shared/interfaces/task.interface";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {UpdateTaskService} from "../../services/update-task-service/update-task.service";
import {TaskDetailsService} from "../../services/task-details-service/task-details.service";
import {UserListService} from "../../../users/services/user-list-service/user-list.service";
import {ProjectListService} from "../../../projects/services/project-list-service/project-list.service";
import {ActivatedRoute, Router} from "@angular/router";

export interface  UpdateTask {
  project_id: string | undefined;
  title: string | undefined;
  description: string | undefined;
  status: string | undefined;
  priority: string | undefined;
  user_id: string | undefined;
  due_date: string | undefined;
}

@Component({
  selector: 'app-update-task',
  standalone: false,
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.scss'],
})
export class UpdateTaskComponent  implements OnInit {

  public projects = [] as ProjectListed[];
  public users = [] as UserListed[];
  protected updateTaskForm!: FormGroup;
  public task: Task = {} as Task;
  public taskId: string;

  constructor(private formBuilder: FormBuilder,
              private updateTaskService: UpdateTaskService,
              private taskDetailsService: TaskDetailsService,
              private userListService: UserListService,
              private projectListService: ProjectListService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.buildForm();
    this.taskId = this.activatedRoute.snapshot.params['idTask'];
  }

  public buildForm(){
    this.updateTaskForm = this.formBuilder.group<UpdateTask>({
      project_id: undefined,
      title: undefined,
      description: undefined,
      status: undefined,
      priority: undefined,
      user_id: undefined,
      due_date: undefined,
    });
  }

  ngOnInit() {
    this.taskDetailsService.invoke(this.taskId).subscribe({
      next: result => {
        this.task = result;
        this.fillForm()
      }
    })

    this.projectListService.invoke().subscribe((response: ProjectListed[]) => {
      this.projects = response;
    })

    this.userListService.invoke().subscribe((response: UserListed[]) => {
      this.users = response;
    })

  }

  public editTask($event: any) {
    $event.preventDefault();
    this.updateTaskService.updateTask(this.updateTaskForm.value, this.taskId).subscribe({
      next: (result) => {
        this.router.navigateByUrl('/tasks');
      }, error: (errorResponse) => {
        console.log(errorResponse);
      }
    });
  }

  private fillForm() {
    this.updateTaskForm.patchValue({
      project_id: this.task.project_id,
      title: this.task.title,
      description: this.task.description,
      status: this.task.status,
      priority: this.task.priority,
      user_id: this.task.user_id,
    })
  }

}
