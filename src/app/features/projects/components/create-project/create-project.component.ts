import { Component, OnInit } from '@angular/core';
import {CustomerListed} from "../../../../shared/interfaces/customerListed.interface";
import {FormBuilder, FormGroup} from "@angular/forms";
import {CreateProjectService} from "../../services/create-project-service/create-project.service";
import {CustomerListService} from "../../../customers/services/customer-list-service/customer-list.service";
import {Router} from "@angular/router";
import {DescriptionEnhancerService} from "../../services/description-enhancer-service/description-enhancer.service";

export interface CreateProject {
  name: string | undefined;
  description: string | undefined;
  customer_id: string | undefined;
  started_at: string | undefined;
}

@Component({
  selector: 'app-create-project',
  standalone: false,
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss'],
})
export class CreateProjectComponent  implements OnInit {

  public customers = [] as CustomerListed[];

  protected createProjectForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private createProjectService: CreateProjectService,
              private customerListService: CustomerListService,
              private aiDescriptionService: DescriptionEnhancerService,
              private router: Router,) {
    this.buildForm();
  }


  ngOnInit() {

    this.customerListService.invoke().subscribe((response: CustomerListed[]) => {
      this.customers = response;
    })

  }

  public buildForm(){
    this.createProjectForm = this.formBuilder.group<CreateProject>({
      name: undefined,
      description: undefined,
      customer_id: undefined,
      started_at: undefined,
    });
  }

  public storeProject($event: any) {
    $event.preventDefault();
    this.createProjectService.createProject(this.createProjectForm.value).subscribe({
      next: (result) => {
        this.router.navigateByUrl('/projects');
        window.alert('Proyecto creado correctamente');

      }, error: (errorResponse) => {
        window.alert('Ha habido un error creando el proyecto. Intentelo de nuevo');
        console.log(errorResponse);
      }
    });

  }

  getAssistanceAI(){
    const name = this.createProjectForm.get('name')!.value;
    const type = 'project'
    this.aiDescriptionService.invoke(name, type).subscribe({
      next: (descriptionAI) => {
        this.createProjectForm.get('description')!.setValue(descriptionAI.descriptionAI);
    }
    })
  }

}
