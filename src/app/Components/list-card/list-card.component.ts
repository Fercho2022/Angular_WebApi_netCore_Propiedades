import { Component, OnInit, inject, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../../Services/housing.service';
import { CardComponent } from '../Card/card.component';
import { FilterPipe } from "../../Pipes/filter.pipe";
import { SortPipe } from "../../Pipes/sort.pipe";
import { IProperty } from '../../Interfaces/IProperty';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-list-card',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardComponent,
    FilterPipe,
    SortPipe
  ],
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.css']
})
export class ListCardComponent implements OnInit {
  private readonly housingService = inject(HousingService);
  private readonly route = inject(ActivatedRoute);

  properties: IProperty[] = [];
  SellRent = 1;
  City = '';
  SearchCity = '';
  SortByParam: keyof IProperty = 'City';
  SortDirection: 'asc' | 'desc' = 'asc';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  async ngOnInit(): Promise<void> {
    await this.initializeComponent();
  }

  private async initializeComponent(): Promise<void> {
    this.setSellRentValue();
    await this.loadProperties();
  }

  private setSellRentValue(): void {
    this.SellRent = this.route.snapshot.url.toString() === 'rent-property' ? 2 : 1;
  }

  private async loadProperties(): Promise<void> {
    try {
      const data = await firstValueFrom(this.housingService.getAllProperties(this.SellRent));
      this.properties = data;

      if (isPlatformBrowser(this.platformId)) {
        this.addNewPropertyIfExists();
      }
    } catch (error) {
      console.error('Error loading properties:', error);
      this.properties = []; // Fallback a un array vacío en caso de error
    }
  }

  private addNewPropertyIfExists(): void {
    try {
      const storedProperties = localStorage.getItem('properties');
      if (storedProperties) {
        const parsedProperties = JSON.parse(storedProperties);
        const matchingProperties = Array.isArray(parsedProperties)
          ? parsedProperties.filter(prop => prop.VentaAlquiler === this.SellRent)
          : parsedProperties.VentaAlquiler === this.SellRent ? [parsedProperties] : [];

        this.properties = [...matchingProperties, ...this.properties];
      }
    } catch (error) {
      console.error('Error parsing stored properties:', error);
    }
  }

  onCityFilter(): void {
    this.SearchCity = this.City;
  }

  onCityclearFilter(): void {
    this.SearchCity = '';
    this.City = '';
  }

  onSortDirection(): void {
    this.SortDirection = this.SortDirection === 'desc' ? 'asc' : 'desc';
  }
}
