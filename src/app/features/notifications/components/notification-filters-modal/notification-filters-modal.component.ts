import {Component, Input, OnInit} from '@angular/core';
import {IonicModule, ModalController} from "@ionic/angular";

@Component({
  selector: 'app-notification-filters-modal',
  templateUrl: './notification-filters-modal.component.html',
  styleUrls: ['./notification-filters-modal.component.scss'],
  imports: [
    IonicModule
  ]
})
export class NotificationFiltersModalComponent  implements OnInit {

  @Input() currentFilters: string[] = [];

  public selectedFilters: Set<string>;

  public availableFilters = ['Comentario', 'Notificación', 'Modificación', 'Asignación', 'Fecha Límite'];

  constructor(private modalCtrl: ModalController) {
    this.selectedFilters = new Set<string>();
  }

  ngOnInit() {
    this.selectedFilters = new Set(this.currentFilters);
  }

  toggleFilter(filter: string): void {
    if (this.selectedFilters.has(filter)) {
      this.selectedFilters.delete(filter);
    } else {
      this.selectedFilters.add(filter);
    }
  }

  applyFilters(): void {

    this.modalCtrl.dismiss(Array.from(this.selectedFilters), 'apply');
  }

  clearFilters(): void {
    this.selectedFilters.clear();
  }

  dismissModal(): void {
    this.modalCtrl.dismiss(null, 'cancel');
  }

}
