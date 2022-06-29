using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if (context.Persons.Any()) return;

            var persons = new List<Person>
            {
                new Person
                {
                    LName = "Иванов",
                    FName = "Ивано",
                    MName = "Петрович",
                    DoB = DateTime.Now.AddMonths(-2),
                    IIN = "111111111111"
                },
                new Person
                {
                    LName = "Петров",
                    FName = "Петр",
                    MName = "Викторович",
                    DoB = DateTime.Now.AddMonths(-7),
                    IIN = "2222222222222"
                },
                new Person
                {
                    LName = "Сидоров",
                    FName = "Яков",
                    MName = "Анатольевич",
                    DoB = DateTime.Now.AddMonths(-10),
                    IIN = "333333333333"
                },
                new Person
                {
                    LName = "Афанасьев",
                    FName = "Игорь",
                    MName = "Вячеславович",
                    DoB = DateTime.Now.AddMonths(-25),
                    IIN = "444444444444"
                },
                new Person
                {
                    LName = "Лукашин",
                    FName = "Семен",
                    MName = "Николаевич",
                    DoB = DateTime.Now.AddYears(-10),
                    IIN = "555222123456"
                },
            };

            await context.Persons.AddRangeAsync(persons);
            await context.SaveChangesAsync();
        }
    }
}
