using Makineduruslari.Models;
using Microsoft.AspNetCore.Mvc;

namespace Makineduruslari.Controllers
{
    public class AnasayfaController : Controller
    {
        public IActionResult AnaSayfaIndex()
        {

            return View();
        }

        [HttpPost]
        public ActionResult AnaSayfaIndex(KullaniciModel kullanici)
        {

            return View();

        }
    }
}
