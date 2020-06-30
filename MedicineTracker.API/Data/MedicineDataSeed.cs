using MedicineTracker.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;

namespace MedicineTracker.API.Data
{
    public class MedicineDataSeed
    {
        public static void Seed(MedicineDbContext context)
        {
            if(context.Database.EnsureCreated())
            if (!context.Medicines.Any())
            {
                var countries = new List<Medicine>
            {
                new Medicine { Name = "Medicine 1", Brand= "TXR 45", ExpiryDate = DateTime.Now.AddDays(-10), Notes= "Sample Text 1", Price= 25, Quantity=10 },
                new Medicine { Name = "Medicine 1DX", Brand= "TXR MN", ExpiryDate = DateTime.Now.AddDays(-5), Notes= "Sample Text2", Price= 250, Quantity=2 },
                new Medicine { Name = "Medicine 1FV", Brand= "TXR dd", ExpiryDate = DateTime.Now.AddDays(5), Notes= "Sample Text3", Price= 253, Quantity=15 },
                new Medicine { Name = "Medicine SD1", Brand= "TXR FC", ExpiryDate = DateTime.Now.AddDays(-1), Notes= "Sample Text4", Price= 225, Quantity=20 },
                new Medicine { Name = "Medicine VC1", Brand= "TXR SD", ExpiryDate = DateTime.Now.AddDays(15), Notes= "Sample Text5", Price= 265, Quantity=45 },
                new Medicine { Name = "Medicine 1NB", Brand= "TXR DS", ExpiryDate = DateTime.Now.AddDays(15), Notes= "Sample Text6", Price= 825, Quantity=50 },
                new Medicine { Name = "Medicine 1TC", Brand= "XD TXR", ExpiryDate = DateTime.Now.AddDays(-3), Notes= "Sample Text7", Price= 225, Quantity=5 },
                new Medicine { Name = "Medicine 110", Brand= "FV TXR", ExpiryDate = DateTime.Now.AddDays(10), Notes= "Sample Text8", Price= 255, Quantity=5 },
                new Medicine { Name = "Medicine 1cc", Brand= "VCXXX TXR", ExpiryDate = DateTime.Now.AddDays(10), Notes= "Sample Text9", Price= 235, Quantity=10 },
                new Medicine { Name = "Medicine 15rc", Brand= "TTTTTTXR", ExpiryDate = DateTime.Now.AddDays(40), Notes= "Sample Text12", Price= 125, Quantity=50 },
                new Medicine { Name = "Medicine 100", Brand= "T567XR", ExpiryDate = DateTime.Now.AddDays(30), Notes= "Sample Text11", Price= 225, Quantity=100 }
            };
                context.AddRange(countries);
                context.SaveChanges();
            }
        }
    }

    public interface IDbInitializer
    {
        /// <summary>
        /// Applies any pending migrations for the context to the database.
        /// Will create the database if it does not already exist.
        /// </summary>
        void Initialize();

        /// <summary>
        /// Adds some default values to the Db
        /// </summary>
        void SeedData();
    }

    public class DbInitializer : IDbInitializer
    {
        private readonly IServiceScopeFactory _scopeFactory;

        public DbInitializer(IServiceScopeFactory scopeFactory)
        {
            this._scopeFactory = scopeFactory;
        }

        public void Initialize()
        {
            using (var serviceScope = _scopeFactory.CreateScope())
            {
                using (var context = serviceScope.ServiceProvider.GetService<MedicineDbContext>())
                {
                    context.Database.Migrate();
                }
            }
        }

        public void SeedData()
        {
            using (var serviceScope = _scopeFactory.CreateScope())
            {
                using (var context = serviceScope.ServiceProvider.GetService<MedicineDbContext>())
                {

                    //add admin user
                    //if (!context.Medicines.Any())
                    //{
                    //    var adminUser = new User
                    //    {
                    //        IsActive = true,
                    //        Username = "admin",
                    //        Password = "admin1234", // should be hash
                    //        SerialNumber = Guid.NewGuid().ToString()
                    //    };
                    //    context.Users.Add(adminUser);
                    //}

                    context.SaveChanges();
                }
            }
        }
    }
}
