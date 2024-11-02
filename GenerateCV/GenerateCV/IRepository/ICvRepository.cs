﻿using GenerateCV.Model;

namespace GenerateCV.IRepository
{
    public interface ICvRepository
    {
        Task<bool> GenerateAndSaveCvAsync(string userId);
        Task<UserCV> GetCvAsync(string userId);
    }
}
