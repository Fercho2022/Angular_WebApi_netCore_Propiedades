import { CommonModule } from '@angular/common';

import { Component, OnInit, inject } from '@angular/core';
import { HousingService } from '../../Services/housing.service';
import { Observable } from 'rxjs';
import { CardComponent } from "../Card/card.component";
import { IProperty } from '../../Interfaces/IProperty';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-list-card',
  standalone: true,
  imports: [CommonModule, CardComponent, HttpClientModule],
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.css'],
  providers:[HousingService]
})
export class ListCardComponent implements OnInit {


properties!: Array<IProperty>;

private housingService=inject(HousingService);


ngOnInit(): void {

  this.housingService.getAllProperties().subscribe(data=>{
  this.properties=data;

  })

}
}

