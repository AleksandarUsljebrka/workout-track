using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.DTOs
{
	public class Query
	{
		public int PageNumber { get; set; } = 1;
		public int PageSize { get; set; } = 8;
	}
}
