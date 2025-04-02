import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { catchError, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  uploadPropertyImage(propertyId: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post(`${this.baseUrl}/property/upload-image/${propertyId}`, formData)
      .pipe(
        map((response: any) => {
          console.log('Image upload service response:', response);
          return response;
        }),
        catchError(error => {
          console.error('Error in image upload service:', error);
          throw error;
        })
      );
  }
}
