import { Component, Inject, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/models/book';
import { AuthService } from 'src/app/services/auth.service';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
})
export class BookComponent {
  book: any = '';
  isLoggedIn = false;
  isEditBook = false;
  editBook: Book = new Book();
  bookId: number = 0;

  constructor(
    private booksServise: BooksService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.bookId = this.route.snapshot.params['id'];
    this.getBookById();
    this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  toggleEditBook(): void {
    this.isEditBook = !this.isEditBook;
  }

  getBookById(): void {
    this.booksServise.getBookById(this.bookId).subscribe(
      (data) => {
        this.book = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateBook(): void {
    this.booksServise.updateBook(this.bookId, this.editBook).subscribe(
      (response) => {
        console.log(response);
        this.getBookById();
        this.toggleEditBook();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteBook(bookId: number): void {
    this.booksServise.deleteBook(bookId).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(['/books']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
