using System;
using System.ComponentModel.DataAnnotations;

namespace MedicineTracker.API.Models
{
	public class Medicine
	{
		[Key]
		public int Id { get; set; }
		[Required]
		public string Name { get; set; }
		[Required]
		public string Brand { get; set; }
		[Required]
		public int Price { get; set; }
		[Required]
		public int Quantity { get; set; }
		[Required]
		public DateTime ExpiryDate { get; set; }
		public string Notes { get; set; }
	}
}
