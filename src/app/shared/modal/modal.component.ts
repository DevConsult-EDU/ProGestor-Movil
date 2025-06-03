import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentRef,
  EventEmitter,
  HostListener,
  Output,
  Type,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {ModalService} from "./modal.service";
import {Options} from '../interfaces/modal';
import {DeteccionCambiosService} from '../services/deteccion-cambios.service';
import {AsyncPipe, CommonModule} from '@angular/common';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  imports: [
    AsyncPipe,
    CommonModule,
  ],
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements AfterViewInit {
  @ViewChild('container', {read: ViewContainerRef, static: true}) container!: ViewContainerRef;

  public titulo = '';
  protected options: Options = {size: 'sm:my-8 w-full sm:max-w-lg sm:p-6'};
  @Output() cargado = new EventEmitter<boolean>();

  @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    if (event.key === "Escape") {
      this.modalService.close(false);
    } else if (event.key === 'Enter' && event.shiftKey) {
      return;
    } else if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      this.modalService.primaryButtonAction();
    }
  }

  public constructor(public modalService: ModalService,
                     private cdr: ChangeDetectorRef,
                     private detectaUIService: DeteccionCambiosService
  ) {
  }

  public ngOnInit(): void {
    this.modalService.setModalComponentRef(this);
  }

  public ngAfterViewInit() {
    this.modalService.componentToLoad$.subscribe({
      next: (component) => this.loadComponent(component)
    });
  }

  public loadComponent(component: Type<any>, options?: Options): ComponentRef<any> {
    this.container.clear();
    const componentRef = this.container.createComponent(component);
    this.options = {size: 'sm:my-8 w-full sm:max-w-lg sm:p-6'};
    if (options) {
      this.options = options;
    }
    this.modalService.open();
    this.detectaUIService.getActualizaUI$().subscribe(() => {
      this.cdr.markForCheck();
      setTimeout(() => {
        this.cargado.emit(true);
      });
    });
    return componentRef;
  }
}
