using System;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dotnet_backend.Models.ViewModel
{
  public class QuoteViewModel
  {
    public int Id { get; set; }
    public int UserId { get; set; }
    public string Content { get; set; }
    public string Source { get; set; }
  }
}