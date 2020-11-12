using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AngularWebAPISample.Models;

namespace AngularWebAPISample.Controllers
{
    [RoutePrefix("api/citizen")]
    public class CitizenController : ApiController
    {
        CitizenEntities objCit = new CitizenEntities();

        [HttpGet]
        [Route("CitizenDetails")]
        public IQueryable<Citizen> GetCitizens()
        {
            try
            {
                return objCit.Citizens;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
