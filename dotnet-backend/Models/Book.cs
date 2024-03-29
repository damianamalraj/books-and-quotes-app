using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dotnet_backend.Models
{
  public class Book
  {
    public int Id { get; set; }
    public int UserId { get; set; }
    public string Title { get; set; }
    public string Author { get; set; }
    public DateTime PublicationDate { get; set; }

    public virtual User user { get; set; }
  }
}