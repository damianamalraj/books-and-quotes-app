import { Component } from '@angular/core';
import { BooksService } from 'src/app/services/books.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent {
  data: any;

  constructor(private booksService: BooksService, private router: Router) {}

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

  navigateToDetails(bookId: number): void {
    this.router.navigate(['/book', bookId]);
  }
}
