import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Project} from "../../../../shared/interfaces/project.interface";
import {ProjectDetailsService} from "../../services/project-details-service/project-details.service";
import {DeleteProjectService} from "../../services/delete-project-service/delete-project.service";

@Component({
  selector: 'app-project-details',
  standalone: false,
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
})
export class ProjectDetailsComponent  implements OnInit {

  public rol: string|null;

  activatedRoute = inject(ActivatedRoute)

  public project: Project = {} as Project;

  projectId = this.activatedRoute.snapshot.params['idProject'];

  projectDetailsService = inject(ProjectDetailsService);
  deleteProjectService = inject(DeleteProjectService)

  router = inject(Router)

  constructor() {
    this.rol = localStorage.getItem('rol');
  }


  ngOnInit() {
    this.projectDetailsService.invoke(this.projectId).subscribe({
      next: result => {
        this.project = result;
      }
    })
  }

  navigateUpdateProject() {
    this.router.navigate(['/projects/updateProject/' + this.projectId]);
  }

  executeDeleteProject(){
    const confirmDelete = window.confirm('¿Estas seguro de que deseas eliminar este proyecto?');

    if (confirmDelete) {
      this.deleteProjectService.deleteProject(this.projectId)
        .subscribe({
          next: () => {
            this.router.navigate(['/projects']);
          },
          error: (error) => {
            console.error('Error al eliminar cliente:', error);
          }
        });
    }


  }

}
