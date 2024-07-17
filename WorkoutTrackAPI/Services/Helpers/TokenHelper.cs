using Data.Entities;
using Data.Repository.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Services.DTOs.User;
using Services.Helpers.Interfaces;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Services.Helpers
{
	public class TokenHelper(IUnitOfWork _unitOfWork, IConfiguration _config) : ITokenHelper
	{
		public string GenerateToken(UserSession user)
		{
			var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]!));
			var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
			var userClaims = new[]
			{
				new Claim("id", user.Id),
				new Claim("username", user.Username),
				new Claim("email", user.Email)
			};
			var token = new JwtSecurityToken(
				issuer: _config["Jwt:Issuer"],
				audience: _config["Jwt:Audience"],
				claims: userClaims,
				expires: DateTime.Now.AddMinutes(10),
				signingCredentials: credentials
				);
			return new JwtSecurityTokenHandler().WriteToken(token);
		}
		public async Task<User> UserByToken(string token)
		{
			string id = GetClaim(token, "id");

			var user = await _unitOfWork.UserRepository.Get(u => u.Id == id);

			return user;
		}
		public string GetClaim(string tokenStr, string type)
		{
			JwtSecurityTokenHandler handler = new JwtSecurityTokenHandler();
			JwtSecurityToken token = handler.ReadJwtToken(tokenStr);

			string claim = token.Claims.Where(c => c.Type == type).FirstOrDefault().Value;

			return claim;
		}
	}
}
