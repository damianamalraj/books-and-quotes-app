import { Component } from '@angular/core';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent {
  data: any;

  constructor(private booksService: BooksService) {}

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(): void {
    this.booksService.getBooks().subscribe(
      (data) => {
        this.data = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
