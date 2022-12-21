using Microsoft.AspNetCore.Mvc;

namespace Makineduruslari.Controllers
{
    public class MakineController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
