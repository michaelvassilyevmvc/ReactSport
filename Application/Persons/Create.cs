using System.Threading.Tasks;
using MediatR;
using Domain;
using Persistence;
using System.Threading;

namespace Application.Persons
{
  public class Create
  {
    public class Command : IRequest
    {
      public Person Person { get; set; }
    }

    public class Handler : IRequestHandler<Command>
    {
      private readonly DataContext _context;

      public Handler(DataContext context)
      {
        _context = context;
      }

      public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
      {
        _context.Persons.Add(request.Person);
        await _context.SaveChangesAsync();

        return Unit.Value;
      }
    }
  }
}