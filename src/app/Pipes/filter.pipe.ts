import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {
  transform(value: any[] | null, filterString: string, propName: string): any[] {
    // Verificar si value es null o undefined
    if (!value) return [];

    // Si no hay filtro o nombre de propiedad, devolver el array original
    if (!filterString || !propName) {
      return value;
    }

    filterString = filterString.toLowerCase();

    return value.filter(item => {
      // Verificar si el item y la propiedad existen
      if (item && item[propName]) {
        // Convertir a minúsculas y buscar coincidencia parcial
        return item[propName].toString().toLowerCase().includes(filterString);
      }
      return false;
    });
  }
}
