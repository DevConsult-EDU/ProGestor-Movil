import {Injectable} from '@angular/core';
import {Observable, ReplaySubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DeteccionCambiosService {
  private dataSubject: ReplaySubject<string> = new ReplaySubject<string>(1);

  constructor() {
  }


  public setActualizaUI(): void {
    this.dataSubject.next('');
  }

  public getActualizaUI$(): Observable<string> {
    return this.dataSubject.asObservable();
  }
}
