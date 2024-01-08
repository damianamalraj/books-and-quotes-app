using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using dotnet_backend.Data;
using dotnet_backend.Models;
using dotnet_backend.Models.DTO;
using dotnet_backend.Models.ViewModel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
  private readonly ApplicationContext _context;
  private readonly IConfiguration _configuration;

  public AuthController(ApplicationContext context, IConfiguration configuration)
  {
    _context = context;
    _configuration = configuration;
  }

  [HttpPost("register")]
  public IActionResult Register([FromBody] UserRegisterDto userDto)
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
  public IActionResult Login([FromBody] UserLoginDto userDto)
  {
    var user = _context.Users.SingleOrDefault(u => u.Email == userDto.Email);

    if (user == null)
    {
      return NotFound("User not found");
    }

    if (!BCrypt.Net.BCrypt.Verify(userDto.Password, user.PasswordHash))
    {
      return BadRequest("Invalid password");
    }

    var token = CreateToken(user);

    return Ok(token);
  }

  private string CreateToken(User user)
  {
    List<Claim> claims = new List<Claim>
    {
      new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
      new Claim(ClaimTypes.Name, user.Name),
      new Claim(ClaimTypes.Email, user.Email)
    };

    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetSection("Jwt:key").Value));
    var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

    var token = new JwtSecurityToken(
      _configuration.GetSection("Jwt:Issuer").Value,
      _configuration.GetSection("Jwt:Audience").Value,
      claims,
      // expires: DateTime.Now.AddMinutes(10),
      expires: DateTime.Now.AddDays(1),
      signingCredentials: credentials
    );

    var jwt = new JwtSecurityTokenHandler().WriteToken(token);

    return jwt;
  }
}