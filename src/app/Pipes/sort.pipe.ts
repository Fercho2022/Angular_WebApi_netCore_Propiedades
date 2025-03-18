import { Pipe, PipeTransform } from '@angular/core';
import { IProperty } from '../Interfaces/IProperty';

@Pipe({
  name: 'sort',
  standalone: true
})
export class SortPipe implements PipeTransform {

  transform(value: Array<IProperty>, args: [keyof IProperty, string]): Array<IProperty> {
    const sortField = args[0];
    const sortDirection = args[1];

    if (value) {
      return [...value].sort((a: IProperty, b: IProperty) => {
        // Para ordenamiento numérico (Price)
        if (sortField === 'price') {
          // Convertimos a números y comparamos directamente
          const numA = Number(a[sortField]);
          const numB = Number(b[sortField]);

          return sortDirection === 'asc' ? numA - numB : numB - numA;
        }
        // Para ordenamiento de texto (City)
        else {
          const aValue = String(a[sortField]).toLowerCase();
          const bValue = String(b[sortField]).toLowerCase();

          return sortDirection === 'asc'
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }
      });
    }
    return [];
  }
}
