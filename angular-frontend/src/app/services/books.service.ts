import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  constructor(private http: HttpClient) {}

  getBooks() {
    return this.http.get(`${environment.apiUrl}/books`);
  }

  getBookById(id: number) {
    return this.http.get(`${environment.apiUrl}/books/${id}`);
  }

  updateBook(id: number, data: any) {
    return this.http.put(`${environment.apiUrl}/books/${id}`, data);
  }

  deleteBook(id: number) {
    return this.http.delete(`${environment.apiUrl}/books/${id}`);
  }
}
