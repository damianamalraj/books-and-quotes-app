using Microsoft.AspNetCore.Mvc;
using dotnet_backend.Data;
using dotnet_backend.Models;
using dotnet_backend.Models.ViewModel;
using Microsoft.AspNetCore.Authorization;
using dotnet_backend.Models.DTO;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;

[ApiController]
[Route("api/[controller]")]
public class BooksController : ControllerBase
{
  private readonly ApplicationContext _context;

  public BooksController(ApplicationContext context)
  {
    _context = context;
  }

  [HttpGet]
  public IActionResult GetAllBooks()
  {
    var books = _context.Books.Select(book => new BookViewModel
    {
      Id = book.Id,
      UserId = book.UserId,
      Title = book.Title,
      Author = book.Author,
      PublicationDate = book.PublicationDate
    }).ToArray();

    return Ok(books);
  }

  [HttpGet("{id}")]
  public IActionResult GetBookById(int id)
  {
    var book = _context.Books.Find(id);

    if (book == null)
    {
      return NotFound();
    }

    return Ok(new BookViewModel
    {
      Id = book.Id,
      UserId = book.UserId,
      Title = book.Title,
      Author = book.Author,
      PublicationDate = book.PublicationDate
    });
  }

  [HttpPost]
  [Authorize]
  public IActionResult AddBook([FromBody] BookDto bookDto)
  {
    var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

    var book = new Book
    {
      UserId = userId,
      Title = bookDto.Title,
      Author = bookDto.Author,
      PublicationDate = DateTime.Now
    };

    _context.Books.Add(book);
    _context.SaveChanges();

    return Ok(new BookViewModel
    {
      Id = book.Id,
      UserId = book.UserId,
      Title = book.Title,
      Author = book.Author,
      PublicationDate = book.PublicationDate
    });
  }

}
