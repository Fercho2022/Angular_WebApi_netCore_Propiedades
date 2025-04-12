import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Photo } from '../../Interfaces/photo';
import { ImageUploadService } from '../../Services/ImageUpload.service';

@Component({
  selector: 'app-upload-edit-photos',
  standalone: true,
  imports: [],
  templateUrl: './upload-edit-photos.component.html',
  styleUrl: './upload-edit-photos.component.css'
})
export class UploadEditPhotosComponent {

  @Input() propertyId!: number;
  @Input() photos: Photo[] = [];
  @Output() photosUpdated = new EventEmitter<Photo[]>();

  constructor(
    private imageUploadService: ImageUploadService,
    private toastr: ToastrService
  ) {}

  onFileSelected(event: any) {
    const files: FileList = event.target.files;

    Array.from(files).forEach(file => {
      this.imageUploadService.uploadPropertyImage(this.propertyId, file)
        .subscribe({
          next: (response) => {
            // Actualizar la lista de fotos
            const newPhoto: Photo = {
              id: response.id,
              imageUrl: response.imageUrl,
              publicId: response.publicId,
              isPrimary: false
            };

            this.photos.push(newPhoto);
            this.photosUpdated.emit(this.photos);
            this.toastr.success('Imagen subida exitosamente');
          },
          error: (error) => {
            this.toastr.error('Error al subir la imagen');
          }
        });
    });
  }

  setMainPhoto(photoId: string) {
    this.imageUploadService.setMainPhoto(this.propertyId, photoId)
      .subscribe({
        next: () => {
          // Actualizar estado de fotos principales
          this.photos = this.photos.map(photo => ({
            ...photo,
            isPrimary: photo.id === photoId
          }));

          this.photosUpdated.emit(this.photos);
          this.toastr.success('Foto principal actualizada');
        },
        error: () => {
          this.toastr.error('Error al establecer foto principal');
        }
      });
  }

  deletePhoto(photoId: number) {
    this.imageUploadService.deletePhoto(this.propertyId, photoId)
      .subscribe({
        next: () => {
          // Eliminar foto de la lista
          this.photos = this.photos.filter(photo => photo.id !== photoId);

          this.photosUpdated.emit(this.photos);
          this.toastr.success('Foto eliminada');
        },
        error: () => {
          this.toastr.error('Error al eliminar foto');
        }
      });
  }
}

