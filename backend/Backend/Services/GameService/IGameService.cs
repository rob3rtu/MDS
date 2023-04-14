﻿using Backend.Models;
using Backend.Models.DTOs;

namespace Backend.Services.GameService
{
    public interface IGameService
    {
        Task Create(GameDTO game);
        Game GetByGameName(string gamename);
    }
}