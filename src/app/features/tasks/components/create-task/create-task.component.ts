import { Component, OnInit } from '@angular/core';
import {ProjectListed} from "../../../../shared/interfaces/projectListed.interface";
import {UserListed} from "../../../../shared/interfaces/userListed.interface";
import {FormBuilder, FormGroup} from "@angular/forms";
import {CreateTaskService} from "../../services/create-task-service/create-task.service";
import {ProjectListService} from "../../../projects/services/project-list-service/project-list.service";
import {UserListService} from "../../../users/services/user-list-service/user-list.service";
import {Router} from "@angular/router";

export interface CreateTask {
  project_id: string | undefined;
  title: string | undefined;
  description: string | undefined;
  priority: string | undefined;
  user_id: string | undefined;
  due_date: string | undefined;
  created_at: string | undefined;
}

@Component({
  selector: 'app-create-task',
  standalone: false,
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
})
export class CreateTaskComponent  implements OnInit {

  public projects = [] as ProjectListed[];
  public users = [] as UserListed[];

  protected createTaskForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private createTaskService: CreateTaskService,
              private projectListService: ProjectListService,
              private userListService: UserListService,
              private router: Router,) {
    this.buildForm();
  }


  ngOnInit() {

    this.projectListService.invoke().subscribe((response: ProjectListed[]) => {
      this.projects = response;
    })

    this.userListService.invoke().subscribe((response: UserListed[]) => {
      this.users = response;
    })

  }

  public buildForm(){
    this.createTaskForm = this.formBuilder.group<CreateTask>({
      project_id: undefined,
      title: undefined,
      description: undefined,
      priority: undefined,
      user_id: undefined,
      due_date: undefined,
      created_at: undefined,
    });
  }

  public storeTask($event: any) {
    $event.preventDefault();
    this.createTaskService.createProject(this.createTaskForm.value).subscribe({
      next: (result) => {
        this.router.navigateByUrl('/tasks');
        window.alert('Tarea creada correctamente');
        window.location.reload();
      }, error: (errorResponse) => {
        window.alert('Ha habido un error creando la tarea. Intentelo de nuevo');
        console.log(errorResponse);
      }
    });

  }

}
