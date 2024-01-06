using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dotnet_backend.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string PasswordHash { get; set; }

        // public virtual ICollection<Book> Books { get; set; }
        public virtual ICollection<Quote> Quotes { get; set; }
    }
}