using System;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dotnet_backend.Models.ViewModel
{
  public class UserViewModel
  {
    public int Id { get; set; }
    public string Username { get; set; }
    public string PasswordHash { get; set; }
  }
}