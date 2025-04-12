import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { HousingService } from '../../Services/housing.service';
import { Property } from '../../Interfaces/property';
import { IPropertyBase } from '../../Interfaces/IPropertyBase';
import { IProperty } from '../../Interfaces/IProperty';
import {
  NgxGalleryAnimation,
  NgxGalleryImage,
  NgxGalleryModule,
  NgxGalleryOptions,
} from '@kolkov/ngx-gallery';
import { CommonModule } from '@angular/common';
import { UploadEditPhotosComponent } from '../upload-edit-photos/upload-edit-photos.component';
import { Photo } from '../../Interfaces/photo';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css'],
  standalone: true,
  imports: [RouterModule, TabsModule, NgxGalleryModule, CommonModule, UploadEditPhotosComponent],
})
export class PropertyDetailComponent implements OnInit {
  propertyId = signal<number>(0); // Inicializamos signal con un valor por defecto
  property = new Property();
  galleryOptions!: NgxGalleryOptions[];
  galleryImages!: NgxGalleryImage[];
  mainPhotoUrl:string='';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private housingService: HousingService
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      //cuando haces data['property'], estás accediendo al valor devuelto por el
      // resolver que fue asociado con la clave 'property'.
      if (data['property']) {
        this.property = data['property'];
        console.log(this.property.photos)

        this.propertyId.set(this.property.id);
      }
    });

    const age = this.housingService.getPropertyAge(
      this.property.estPossessionOn
    );
    if (typeof age === 'number') {
      this.property.age = age;
    } else {
      this.property.age = undefined; // o un valor predeterminado
    }

    this.galleryOptions = [
      {
        width: '100%',
        height: '545px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
      },
    ];

    this.galleryImages = this.getGalleryImages();
  }

  getGalleryImages(): NgxGalleryImage[] {

    const photosUrl: NgxGalleryImage[] = [];


    if (this.property.photos) {
      for (const photo of this.property.photos) {
        if( photo.isPrimary){
          this.mainPhotoUrl=photo.imageUrl;
          console.log(this.mainPhotoUrl);
        }
          photosUrl.push({
            small: photo.imageUrl,
            medium: photo.imageUrl,
            big: photo.imageUrl,
          });


      }
    }

    return photosUrl;

  }

  updatePhotos(updatedPhotos: Photo[]) {
    // Actualizar las fotos de la propiedad
    this.property.photos = updatedPhotos;
    
    // Reconfigurar imágenes de la galería
    this.configureGalleryImages();
  }
}
