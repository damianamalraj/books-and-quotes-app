using Microsoft.AspNetCore.Mvc;
using dotnet_backend.Data;
using dotnet_backend.Models;
using dotnet_backend.Models.ViewModel;
using Microsoft.AspNetCore.Authorization;
using dotnet_backend.Models.DTO;
using System.Security.Claims;

[ApiController]
[Route("api/[controller]")]
public class QuotesController : ControllerBase
{
  private readonly ApplicationContext _context;

  public QuotesController(ApplicationContext context)
  {
    _context = context;
  }

  [HttpGet]
  [Authorize]
  public IActionResult GetAllQuotes()
  {
    var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

    var quotes = _context.Quotes.Where(quote => quote.UserId == userId).Select(quote => new QuoteViewModel
    {
      Id = quote.Id,
      UserId = quote.UserId,
      Content = quote.Content,
      Source = quote.Source
    }).ToArray();

    return Ok(quotes);
  }

  [HttpPost]
  [Authorize]
  public IActionResult AddQuote([FromBody] QuoteDto quoteDto)
  {
    var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

    var quote = new Quote
    {
      UserId = userId,
      Content = quoteDto.Content,
      Source = quoteDto.Source
    };

    _context.Quotes.Add(quote);
    _context.SaveChanges();

    return Ok(new QuoteViewModel
    {
      Id = quote.Id,
      UserId = quote.UserId,
      Content = quote.Content,
      Source = quote.Source
    });
  }

  [HttpDelete("{id}")]
  [Authorize]
  public IActionResult DeleteQuote(int id)
  {
    var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

    var quote = _context.Quotes.Find(id);

    if (quote == null)
    {
      return NotFound();
    }

    if (quote.UserId != userId)
    {
      return Unauthorized();
    }

    _context.Quotes.Remove(quote);
    _context.SaveChanges();

    return Ok(new QuoteViewModel
    {
      Id = quote.Id,
      UserId = quote.UserId,
      Content = quote.Content,
      Source = quote.Source
    });

  }
}