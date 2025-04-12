import { Component, input, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

import { RouterModule } from '@angular/router';
import { IPropertyBase } from '../../Interfaces/IPropertyBase';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CardModule,ButtonModule, RouterModule, CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

@Input() property!:IPropertyBase;
@Input() hideIcons!:boolean;

getPropertyImage(): string {

  // Si hay una imagen específica, usarla
  if (this.property.photo) {
    return this.property.photo;
  }

  // Si no, usar la imagen por defecto

  return '/assets/Images/house_default.jpg';
}

}
