using System;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dotnet_backend.Models.DTO
{
  public class UserRegisterDto
  {
    public string Name { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
  }
}