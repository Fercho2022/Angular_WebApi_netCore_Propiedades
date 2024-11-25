import { Component, input, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { IProperty } from '../../Interfaces/IProperty';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CardModule,ButtonModule, RouterModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

@Input() property!:IProperty;



}
