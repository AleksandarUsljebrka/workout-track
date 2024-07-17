using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.DTOs.Result
{
	public class Result : IResult
	{
		public bool Successfull { get; set; }
		public string ErrorMess { get; set; }
		public IDTO Dto { get; set; }
		public ErrorCode ErrorCode { get; set; }
		public string Token { get; set; }
		public int PostId { get; set; }
		public Result(bool successfull, ErrorCode erCode, string mess)
		{
			Successfull = successfull;
			ErrorCode = erCode;
			ErrorMess = mess;
		}
		public Result(bool successfull, ErrorCode erCode)
		{
			Successfull = successfull;
			ErrorCode = erCode;

		}
		public Result(bool successfull)
		{
			Successfull = successfull;
		}
		public Result(bool successfull, int postId)
		{
			PostId = postId;
			Successfull = successfull;
		}
		public Result(bool successfull, string token)
		{
			Successfull = successfull;
			Token = token;
		}
		public Result(bool successfull, IDTO dto)
		{
			Successfull = successfull;
			Dto = dto;
		}
	}
}
