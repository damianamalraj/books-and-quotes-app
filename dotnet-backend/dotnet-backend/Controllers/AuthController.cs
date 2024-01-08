using dotnet_backend.Data;
using dotnet_backend.Models;
using dotnet_backend.Models.ViewModel;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
  private readonly ApplicationContext _context;

  public AuthController(ApplicationContext context)
  {
    _context = context;
  }

  [HttpPost("register")]
  public IActionResult Register([FromBody] UserDto userDto)
  {
    string PasswordHash = BCrypt.Net.BCrypt.HashPassword(userDto.Password);

    var user = new User
    {
      Name = userDto.Name,
      Email = userDto.Email,
      PasswordHash = PasswordHash
    };

    _context.Users.Add(user);
    _context.SaveChanges();

    return Ok(new UserViewModel
    {
      Id = user.Id,
      Name = user.Name,
      Email = user.Email,
      PasswordHash = user.PasswordHash
    });
  }

  [HttpPost("login")]
  public IActionResult Login([FromBody] UserDto userDto)
  {
    var user = _context.Users.SingleOrDefault(u => u.Email == userDto.Email);

    if (user == null)
    {
      return NotFound();
    }

    if (!BCrypt.Net.BCrypt.Verify(userDto.Password, user.PasswordHash))
    {
      return Unauthorized();
    }

    return Ok(new UserViewModel
    {
      Id = user.Id,
      Name = user.Name,
      Email = user.Email,
      PasswordHash = user.PasswordHash
    });
  }
}