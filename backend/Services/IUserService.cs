using TaskManagerAPI.Models;

namespace TaskManagerAPI.Services
{
    public interface IUserService
    {
        Task<User?> GetUserByIdAsync(int id);
        Task<User?> GetUserByUsername(string username);
        Task<User> CreateUserAsync(User user);
        Task<User> UpdateUserAsync(User user);
    }
}
