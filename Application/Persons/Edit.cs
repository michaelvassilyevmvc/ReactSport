using System.Threading.Tasks;
using MediatR;
using Domain;
using Persistence;
using System.Threading;
using AutoMapper;

namespace Application.Persons
{
  public class Edit
  {
    public class Command : IRequest
    {
      public Person Person { get; set; }
    }

    public class Handler : IRequestHandler<Command>
    {
      private readonly DataContext _context;
      private readonly IMapper _mapper;

      public Handler(DataContext context, IMapper mapper)
      {
        _mapper = mapper;
        _context = context;
      }

      public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
      {
        var person = await _context.Persons.FindAsync(request.Person.Id);
        _mapper.Map(request.Person, person);

        await _context.SaveChangesAsync();

        return Unit.Value;
      }
    }
  }
}