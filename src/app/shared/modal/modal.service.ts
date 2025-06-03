import {Injectable, Type} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {ModalComponent} from "./modal.component";
import {DeteccionCambiosService} from '../services/deteccion-cambios.service';
import {Options} from '../interfaces/modal';

@Injectable({
  providedIn: 'root'
})


export class ModalService {

  private isOpenSubject = new BehaviorSubject<boolean>(false);
  public isOpen$ = this.isOpenSubject.asObservable();

  private _loadComponent = new Subject<Type<any>>();
  public componentToLoad$ = this._loadComponent.asObservable();
  private modalComponentRef!: ModalComponent;
  private _onDidDismiss = new Subject<any>();
  public onDidDismiss$ = this._onDidDismiss.asObservable();
  public primaryButtonAction: () => void = () => {};

  constructor(private detectaUIService: DeteccionCambiosService) {

  }

  public setTitulo(titulo: string): void {
    this.modalComponentRef.titulo = titulo;
    this.detectaUIService.setActualizaUI();
  }

  public setModalComponentRef(ref: ModalComponent): void {
    this.modalComponentRef = ref;
    this.detectaUIService.setActualizaUI();
  }

  public setPrimaryButtonAction(action: () => void): void {
    this.primaryButtonAction = action;
  }

  public open() {
    this.isOpenSubject.next(true);
    this.detectaUIService.setActualizaUI();
  }

  public close(data: any = true) {
    this.isOpenSubject.next(false);
    this._onDidDismiss.next(data);
    this.primaryButtonAction = () => {};
    this.detectaUIService.setActualizaUI();
  }

  public dismiss() {
    this.isOpenSubject.next(false);
    this._onDidDismiss.next(false);
    this.primaryButtonAction = () => {};
    this.detectaUIService.setActualizaUI();
  }

  public toggle() {
    this.isOpenSubject.next(!this.isOpenSubject.value);
  }

  public loadComponent(component: Type<any>, options?: Options) {
    this.setTitulo('');
    this._onDidDismiss = new Subject<any>();
    this.onDidDismiss$ = this._onDidDismiss.asObservable();
    this.detectaUIService.setActualizaUI();
    return this.modalComponentRef.loadComponent(component, options);
  }
}
