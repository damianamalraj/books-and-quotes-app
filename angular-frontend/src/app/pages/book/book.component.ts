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

  constructor(
    private booksServise: BooksService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const bookId = this.route.snapshot.params['id'];

    this.booksServise.getBookById(bookId).subscribe((data) => {
      this.book = data;
      console.log(data);
      console.log(this.book);
    });

    this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
      console.log('✅✅✅✅✅✅✅✅' + this.isLoggedIn);
    });
  }

  navigateToUpdate(bookId: number): void {
    // this.router.navigate(['/update-book', bookId]);
  }

  deleteBook(bookId: number): void {
    // Implement book deletion logic here
  }
}
