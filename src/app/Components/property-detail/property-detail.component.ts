import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { HousingService } from '../../Services/housing.service';
import { Property } from '../../Interfaces/property';
import { IPropertyBase } from '../../Interfaces/IPropertyBase';
import { IProperty } from '../../Interfaces/IProperty';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryModule, NgxGalleryOptions } from '@kolkov/ngx-gallery';


@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css'],
  standalone: true,
  imports: [RouterModule, TabsModule, NgxGalleryModule],
})
export class PropertyDetailComponent implements OnInit {
  propertyId = signal<number>(0); // Inicializamos signal con un valor por defecto
  property = new Property();
  galleryOptions!: NgxGalleryOptions[];
  galleryImages!: NgxGalleryImage[];

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

    this.galleryOptions = [
      {
        width: '100%',
        height: '465px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,

      },

    ];

    this.galleryImages = [
      {
        small: 'assets/Images/internal-1.jpg',
        medium: 'assets/Images/internal-1.jpg',
        big: 'assets/Images/internal-1.jpg'
      },
      {
        small: 'assets/Images/internal-2.jpg',
        medium: 'assets/Images/internal-2.jpg',
        big: 'assets/Images/internal-2.jpg'
      },
      {
        small: 'assets/Images/internal-3.jpg',
        medium: 'assets/Images/internal-3.jpg',
        big: 'assets/Images/internal-3.jpg'
      },
      {
        small: 'assets/Images/internal-4.jpg',
        medium: 'assets/Images/internal-4.jpg',
        big: 'assets/Images/internal-4.jpg'
      },
      {
        small: 'assets/Images/internal-5.jpg',
        medium: 'assets/Images/internal-5.jpg',
        big: 'assets/Images/internal-5.jpg'
      },

    ];
  }


}

