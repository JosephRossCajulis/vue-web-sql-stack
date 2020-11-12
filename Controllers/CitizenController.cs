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

        [HttpGet]
        public IHttpActionResult GetCitizenById(string citizen_id, string citizen_name)
        {
            Citizen objEmp = new Citizen();
            int id = Convert.ToInt32(citizen_id);
            object[] priKey = new object[] { id, citizen_name };
            try
            {
                objEmp = objCit.Citizens.Find(priKey) ;
                if (objEmp == null)
                {
                    return NotFound();
                }

            }
            catch (Exception)
            {
                throw;
            }

            return Ok(objEmp);
        }

        [HttpPost]
        [Route("InsertCitizenDetails")]
        public IHttpActionResult Post(Citizen data)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                objCit.Citizens.Add(data);
                objCit.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }

            return Ok(data);
        }

        [HttpPut]
        [Route("UpdateCitizenDetails")]
        public IHttpActionResult Put(Citizen employee)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                Citizen objEmp = new Citizen();
                objEmp = objCit.Citizens.Find(employee.ID, employee.CName);
                if (objEmp != null)
                {
                    objEmp.CName = employee.CName;
                    objEmp.Gender = employee.Gender;
                    objEmp.Email = employee.Email;
                    objEmp.citizenid = employee.citizenid;

                }
                int i = this.objCit.SaveChanges();

            }
            catch (Exception)
            {
                throw;
            }
            return Ok(employee);
        }

        [HttpDelete]
        public IHttpActionResult Delete(string citizen_id, string citizen_name)
        {
            int id = Convert.ToInt32(citizen_id);  
            Citizen citizen = objCit.Citizens.Find(id, citizen_name);
            if (citizen == null)
            {
                return NotFound();
            }

            objCit.Citizens.Remove(citizen);
            objCit.SaveChanges();

            return Ok(objCit.Citizens);
        }
    }
}
