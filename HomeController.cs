using Makineduruslari.Models;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Diagnostics;
using veritabani;


namespace Makineduruslari.Controllers
{
    public class HomeController : Controller
    {
        

        public IActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Index(KullaniciModel kullanici)
        {
            VeriTabani vt = new VeriTabani();

            vt.openDatabase();

            if (vt.isOpen())
            {


                string sqlstr;
                sqlstr = "SELECT * FROM public.\"Account\" WHERE kullanici_adi= '" + kullanici.kullanici_adi + "'";
                sqlstr += "AND sifre='" + kullanici.sifre + "'";
                DataRow user = vt.Read(sqlstr);

                if (user == null)
                    throw new Exception(sqlstr);


                else if (user != null)
                {
                    //Kullanicilar acc = new Kullanicilar();
                    //acc.KullaniciId = (int)user["kullanici_id"];
                    //HttpContext.Session.SetString("currentUserId", acc.KullaniciId.ToString());


                    return RedirectToAction("AnaSayfaIndex", "Anasayfa");

                }

            }
            vt.closeDatabase();
            return View();

        }

        //public IActionResult Privacy()
        //{
        //    return View();
        //}

        //[ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        //public IActionResult Error()
        //{
        //    return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        //}
    }
}