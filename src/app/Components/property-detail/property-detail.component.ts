import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { HousingService } from '../../Services/housing.service';
import { Property } from '../../Interfaces/property';
import { IPropertyBase } from '../../Interfaces/IPropertyBase';
import { IProperty } from '../../Interfaces/IProperty';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css'],
  standalone: true,
  imports: [RouterModule, TabsModule],
})
export class PropertyDetailComponent implements OnInit {
  propertyId = signal<number>(0); // Inicializamos signal con un valor por defecto
  property = new Property();

  constructor(
    private route: ActivatedRoute,
    private router: Router,

  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      if (data['property']) {
        this.property = data['property'];
        this.propertyId.set(this.property.Id);
      }
    });
  }
}
