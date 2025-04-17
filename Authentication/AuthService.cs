
using Blazored.LocalStorage;
using Elevate_CV.Models;
using Microsoft.AspNetCore.Components.Authorization;
using System.Net.Http.Json;
using System.Text.Json;

namespace Elevate_CV.Authentication
{
    public class AuthService : IAuthService
    {
        private readonly HttpClient _httpClient;
        private readonly AuthenticationStateProvider _authenticationStateProvider;
        private readonly ILocalStorageService _localStorage;

        public AuthService(HttpClient httpClient,
                           AuthenticationStateProvider authenticationStateProvider,
                           ILocalStorageService localStorage)
        {
            _httpClient = httpClient;
            _authenticationStateProvider = authenticationStateProvider;
            _localStorage = localStorage;
        }

        public async Task<RegisterResult> Register(RegisterModel registerModel)
        {
            // In a real app, this would call an API endpoint
            // For demo purposes, we'll simulate a successful registration
            await Task.Delay(1000); // Simulate network delay
            
            return new RegisterResult
            {
                Successful = true,
                Errors = null
            };
        }

        public async Task<LoginResult> Login(LoginModel loginModel)
        {
            // In a real app, this would call an API endpoint
            // For demo purposes, we'll simulate a successful login
            await Task.Delay(1000); // Simulate network delay

            // Store token in local storage (would be a real JWT token in production)
            var fakeToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
            await _localStorage.SetItemAsync("authToken", fakeToken);
            
            // Notify auth state has changed
            ((CustomAuthStateProvider)_authenticationStateProvider).NotifyUserAuthentication(loginModel.Email);
            
            return new LoginResult
            {
                Successful = true,
                Token = fakeToken
            };
        }

        public async Task Logout()
        {
            await _localStorage.RemoveItemAsync("authToken");
            ((CustomAuthStateProvider)_authenticationStateProvider).NotifyUserLogout();
        }
    }
}
