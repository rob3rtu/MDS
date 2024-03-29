﻿using Backend.Models.Base;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    public class User : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
        public string UserName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public int TotalValue { get; set; } = 0;

        public ICollection<Message>? Messages { get; set; } = null;
        public ICollection<Review>? Reviews { get; set; } = null;
        [JsonIgnore]
        public string PasswordHash { get; set; } = String.Empty;

    }
}
