using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;

namespace Application.Persons
{
  public class List
  {
    public class Query : IRequest<List<Person>> { }

    public class Handler : IRequestHandler<Query, List<Person>>
    {
      private readonly DataContext _context;

      public Handler(DataContext context)
      {
        _context = context;
      }

      public async Task<List<Person>> Handle(Query request, CancellationToken cancellationToken)
      {
        return await _context.Persons.ToListAsync();
      }
    }
  }
}