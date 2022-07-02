using Application.Persons;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Controllers
{
  public class PersonsController : BaseApiController
  {


    [HttpGet]
    public async Task<ActionResult<List<Person>>> GetPersons()
    {
      return await Mediator.Send(new List.Query());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Person>> GetPerson(Guid id)
    {
      return await Mediator.Send(new Details.Query { Id = id });
    }

    [HttpPost]
    public async Task<IActionResult> CreatePerson(Person person)
    {
      return Ok(await Mediator.Send(new Create.Command { Person = person }));
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> EditPerson(Guid id, Person person)
    {
      person.Id = id;
      return Ok(await Mediator.Send(new Edit.Command { Person = person }));
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletePerson(Guid id)
    {
      return Ok(await Mediator.Send(new Delete.Command { Id = id }));
    }
  }
}
