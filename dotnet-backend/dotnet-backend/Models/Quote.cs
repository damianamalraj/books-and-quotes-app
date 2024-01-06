using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dotnet_backend.Models
{
  public class Quote
  {
    public int Id { get; set; }
    public int userId { get; set; }
    public string Content { get; set; }

    public virtual User user { get; set; }
  }
}