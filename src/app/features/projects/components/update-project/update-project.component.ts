import { Component, OnInit } from '@angular/core';
import {CustomerListed} from "../../../../shared/interfaces/customerListed.interface";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Project} from "../../../../shared/interfaces/project.interface";
import {UpdateProjectService} from "../../services/update-project-service/update-project.service";
import {ProjectDetailsService} from "../../services/project-details-service/project-details.service";
import {CustomerListService} from "../../../customers/services/customer-list-service/customer-list.service";
import {ActivatedRoute, Router} from "@angular/router";

export interface UpdateProject {
  name: string | undefined;
  description: string | undefined;
  customer_id: string | undefined;
  status: string | undefined;
  started_at: string | undefined;
  finished_at: string | undefined;
}

@Component({
  selector: 'app-update-project',
  standalone: false,
  templateUrl: '../../pages/update-project.component.html',
  styleUrls: ['./update-project.component.scss'],
})
export class UpdateProjectComponent  implements OnInit {

  public customers = [] as CustomerListed[];
  protected updateProjectForm!: FormGroup;
  public projectOg = {} as Project;
  public projectId: string;

  constructor(private formBuilder: FormBuilder,
              private updateProjectService: UpdateProjectService,
              private projectDetailsService: ProjectDetailsService,
              private customerListService: CustomerListService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.buildForm();
    this.projectId = this.activatedRoute.snapshot.params['idProject'];
  }

  public buildForm(){
    this.updateProjectForm = this.formBuilder.group<UpdateProject>({
      name: undefined,
      description: undefined,
      customer_id: undefined,
      status: undefined,
      started_at: undefined,
      finished_at: undefined,
    });
  }

  ngOnInit() {
    this.projectDetailsService.invoke(this.projectId).subscribe({
      next: result => {
        this.projectOg = result;
        this.fillForm()
      }
    })

    this.customerListService.invoke().subscribe((response: CustomerListed[]) => {
      this.customers = response;
    })
  }

  public editProject($event: any) {
    $event.preventDefault();
    this.updateProjectService.updateProject(this.updateProjectForm.value, this.projectId).subscribe({
      next: (result) => {
        this.router.navigateByUrl('/projects');
      }, error: (errorResponse) => {
        console.log(errorResponse);
      }
    });
  }

  private fillForm() {
    this.updateProjectForm.patchValue({
      name: this.projectOg.name,
      description: this.projectOg.description,
      customer_id: this.projectOg.customer_id,
      status: this.projectOg.status,
      started_at: this.projectOg.started_at,
      finished_at: this.projectOg.finished_at,
    })
  }

}
