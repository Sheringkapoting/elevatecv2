
using Elevate_CV.Models;
using System.Threading.Tasks;

namespace Elevate_CV.Authentication
{
    public interface IAuthService
    {
        Task<RegisterResult> Register(RegisterModel registerModel);
        Task<LoginResult> Login(LoginModel loginModel);
        Task Logout();
    }
}
