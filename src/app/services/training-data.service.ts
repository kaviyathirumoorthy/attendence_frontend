import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrainingDataService {
  private apiUrl = 'http://localhost:8080/training-data/upload';

  constructor(private http: HttpClient) {}

  uploadTrainingData(file: File, company: string, monthYear: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('company', company);
    formData.append('monthYear', monthYear);

    return this.http.post<any>(this.apiUrl, formData);
  }
}
