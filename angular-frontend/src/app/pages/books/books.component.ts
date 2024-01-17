import { Component } from '@angular/core';
import { BooksService } from 'src/app/services/books.service';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/book';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent {
  data: any;
  book: Book = new Book();
  isAddBookFalse: boolean = true;
  isLoggedIn: boolean = false;

  constructor(
    private booksService: BooksService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getBooks();
    this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
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

  addBook(): void {
    this.booksService.addBook(this.book).subscribe(
      (response) => {
        console.log(response);
        this.getBooks();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  navigateToDetails(bookId: number): void {
    this.router.navigate(['/book', bookId]);
  }

  toggleAddBook(): void {
    this.isAddBookFalse = !this.isAddBookFalse;
    if (!this.isAddBookFalse && !this.isLoggedIn) {
      this.router.navigate(['/login']);
    }
  }
}
