import { Component, input, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

import { RouterModule } from '@angular/router';
import { IPropertyBase } from '../../Interfaces/IPropertyBase';


@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CardModule,ButtonModule, RouterModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

@Input() property!:IPropertyBase;
@Input() hideIcons!:boolean;



}
