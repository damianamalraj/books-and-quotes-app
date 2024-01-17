import { Component } from '@angular/core';
import { Quote } from 'src/app/models/quote';
import { AuthService } from 'src/app/services/auth.service';
import { QuotesService } from 'src/app/services/quotes.service';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css'],
})
export class QuotesComponent {
  quote: Quote = new Quote();
  quotes: any;
  isLoggedIn: boolean = false;
  isAddQuoteFalse: boolean = true;

  constructor(
    private authService: AuthService,
    private quotesService: QuotesService
  ) {}

  ngOnInit(): void {
    this.getQuotes();

    this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  toggleAddQuote(): void {
    this.isAddQuoteFalse = !this.isAddQuoteFalse;
  }

  getQuotes(): void {
    this.quotesService.getQuotes().subscribe(
      (data) => {
        this.quotes = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  addQuote(): void {
    this.quotesService.addQuote(this.quote).subscribe(
      (response) => {
        console.log(response);
        this.getQuotes();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteQuote(id: number): void {
    this.quotesService.deleteQuote(id).subscribe(
      (response) => {
        console.log(response);
        this.getQuotes();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
