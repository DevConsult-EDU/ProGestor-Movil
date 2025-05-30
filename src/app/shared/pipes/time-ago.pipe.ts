import { Pipe, PipeTransform } from '@angular/core';

import { es } from 'date-fns/locale';
import {formatDistanceToNow} from "date-fns"; // Importar el locale en español

@Pipe({
  name: 'timeAgo',
  standalone: true, // Importante si tu componente también es standalone
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: string | Date | undefined | null): string {
    if (!value) {
      return ''; // O 'Fecha desconocida', o manejar como prefieras
    }

    let dateToCompare: Date;

    if (typeof value === 'string') {
      // Si tu fecha es '25-04-2024 10:13' (dd-MM-yyyy HH:mm)
      // Necesitamos parsearla correctamente porque new Date('dd-MM-yyyy...') no es confiable
      // Opción 1: Asumir que el backend puede enviar formato ISO 8601 (recomendado)
      // Opción 2: Parsear el formato específico
      const parts = value.match(/(\d{2})-(\d{2})-(\d{4}) (\d{2}):(\d{2})/);
      if (parts) {
        // parts = ["25-04-2024 10:13", "25", "04", "2024", "10", "13"]
        // Meses en Date son 0-indexados (0 = Enero, 1 = Febrero, ...)
        dateToCompare = new Date(
          Number(parts[3]), // año
          Number(parts[2]) - 1, // mes
          Number(parts[1]), // día
          Number(parts[4]), // hora
          Number(parts[5]) // minuto
        );
      } else {
        // Intento de parseo genérico si no coincide el formato esperado
        dateToCompare = new Date(value);
      }

      // Si después de intentar parsear, la fecha no es válida
      if (isNaN(dateToCompare.getTime())) {
        console.warn(`TimeAgoPipe: Invalid date string received: ${value}`);
        return 'Fecha inválida'; // O retornar el valor original, o ''
      }
    } else if (value instanceof Date) {
      dateToCompare = value;
    } else {
      console.warn(`TimeAgoPipe: Invalid value type received: ${typeof value}`);
      return 'Fecha inválida';
    }

    try {
      return formatDistanceToNow(dateToCompare, {
        addSuffix: true, // Añade "Hace..." o "En..."
        locale: es, // Usa el idioma español
      });
    } catch (error) {
      console.error('Error formatting date with date-fns:', error);
      return 'Error al formatear fecha';
    }
  }
}
