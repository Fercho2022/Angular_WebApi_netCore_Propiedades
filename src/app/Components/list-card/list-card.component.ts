import { CommonModule } from '@angular/common';

import { Component, OnInit, inject } from '@angular/core';
import { HousingService } from '../../Services/housing.service';
import { Observable } from 'rxjs';
import { CardComponent } from '../Card/card.component';
import { IProperty } from '../../Interfaces/IProperty';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FilterPipe } from "../../Pipes/filter.pipe";
import { SortPipe } from "../../Pipes/sort.pipe";
import { FormsModule } from '@angular/forms'; // Importa FormsModule

@Component({
  selector: 'app-list-card',
  standalone: true,
  imports: [CommonModule, CardComponent, HttpClientModule, FilterPipe, SortPipe, FormsModule ],
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.css'],
  providers: [HousingService],
})
export class ListCardComponent implements OnInit {
  SellRent = 1;
  properties!: Array<IProperty>;
  City:string='';
  SearchCity:string='';
  SortByParam:keyof IProperty = 'City'; // Asigna un valor inicial
  SortDirection:string='asc';

  private housingService = inject(HousingService);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.SellRent =
      this.route.snapshot.url.toString() === 'rent-property' ? 2 : 1;

    this.housingService.getAllProperties(this.SellRent).subscribe((data) => {
      this.properties = data;
      const newProperty = JSON.parse(localStorage.getItem('properties') || 'null');
      // Check if the new property exists and matches the current SellRent
      if (newProperty && newProperty.VentaAlquiler === this.SellRent) {
        this.properties = [newProperty, ...this.properties];
      };
      console.log(this.properties)
    });
  };

  onCityFilter(){
    this.SearchCity=this.City;
  }

  onCityclearFilter(){
    this.SearchCity='';
    this.City='';
  }

  onSortDirection(){
    if(this.SortDirection==='desc'){
      this.SortDirection='asc';
    }else{
      this.SortDirection='desc';
    }
  }
}
