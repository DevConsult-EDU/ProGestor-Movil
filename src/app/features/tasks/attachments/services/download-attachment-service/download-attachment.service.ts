import {inject, Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../../environments/environment.prod";
import {Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DownloadAttachmentService {

  public http = inject(HttpClient)

  public apiUrl = environment.baseUrl;

  downloadAttachment(id: string, fileName?: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/attachments/${id}/downloadAttachment`, {
      responseType: 'blob',
      observe: 'body'
    }).pipe(
      tap(blob => this.startDownload(blob, fileName))
    );
  }

  /**
   * Inicia la descarga del archivo en el navegador
   * @param blob Contenido del archivo
   * @param customFileName Nombre opcional para el archivo
   */
  private startDownload(blob: Blob, customFileName?: string): void {
    // Crear URL del objeto blob
    const url = window.URL.createObjectURL(blob);

    // Determinar el nombre del archivo
    const fileName = customFileName || 'attachment';

    // Crear elemento para la descarga
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;

    // Agregar al DOM, hacer clic y limpiar
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Liberar recursos
    setTimeout(() => window.URL.revokeObjectURL(url), 100);
  }
}
