import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Photo } from '../../Interfaces/photo';
import { ImageUploadService } from '../../Services/ImageUpload.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-upload-edit-photos',
  standalone: true,
  imports: [CommonModule],
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
    // 1. Obtener la lista de archivos seleccionados
  const files: FileList = event.target.files;

  // 2. Convertir FileList a un array para poder iterar
  Array.from(files).forEach(file => {
    // 3. Subir cada archivo individualmente usando el servicio
    this.imageUploadService.uploadPropertyImage(this.propertyId, file)
      .subscribe({
        // 4. Manejo de respuesta exitosa
        next: (response) => {
          // 5. Crear un objeto Photo con los datos de respuesta
          const newPhoto: Photo = {
            id: response.id,            // ID de la foto devuelto por el backend
            imageUrl: response.imageUrl, // URL de la imagen subida
            publicId: response.publicId, // ID público en Cloudinary
            isPrimary: false             // Por defecto, no es foto principal
          };

          // 6. Añadir la nueva foto al arreglo de fotos del componente
          this.photos.push(newPhoto);

          // 7. Emitir evento para notificar que las fotos han cambiado
          this.photosUpdated.emit(this.photos);

          // 8. Mostrar mensaje de éxito
          this.toastr.success('Imagen subida exitosamente');
        },
        // 9. Manejo de errores
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
          isPrimary: photo.publicId === photoId
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

