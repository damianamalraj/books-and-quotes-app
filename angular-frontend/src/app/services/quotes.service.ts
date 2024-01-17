import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class QuotesService {
  constructor(private http: HttpClient) {}

  getQuotes() {
    return this.http.get(`${environment.apiUrl}/quotes`);
  }

  addQuote(data: any) {
    return this.http.post(`${environment.apiUrl}/quotes`, data);
  }

  deleteQuote(id: number) {
    return this.http.delete(`${environment.apiUrl}/quotes/${id}`);
  }
}
