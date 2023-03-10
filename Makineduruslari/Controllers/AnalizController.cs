using Makineduruslari.Models;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using veritabani;
namespace Makineduruslari.Controllers
{
    public class AnalizController : Controller
    {

        public IActionResult MakineBilgisi()
        {

            VeriTabani vt = new VeriTabani();
            DataTable h = new DataTable();
            vt.openDatabase();
            vt.fillDataTable(h, @"
                SELECT id, makineadi, durussuresi

                FROM public.""makinesüreler"" 
            ");
            DataRow encokduranmakineRow;
            encokduranmakineRow = vt.Read("SELECT makineadi, durussuresi FROM public.\"makinesüreler\" WHERE durussuresi=(SELECT MAX(durussuresi) FROM public.\"makinesüreler\" )");


            ViewBag.MakineSüreler = h;
            vt.closeDatabase();

            List<MakineModel> MakineSüreler = new List<MakineModel>();
            foreach (DataRow dr in ViewBag.MakineSüreler.Rows)
            {
                MakineModel makinesüre = new MakineModel
                {
                    id = (int)(dr["id"]),
                    makineadi = dr["makineadi"].ToString(),
                    durussuresi = (int)(dr["durussuresi"])


                };

                MakineSüreler.Add(makinesüre);
            }
            return View(MakineSüreler);

        }


       

        public IActionResult PersonelBilgisi()
        {
            VeriTabani vt = new VeriTabani();
            DataTable h = new DataTable();
            vt.openDatabase();
            vt.fillDataTable(h, @"
                SELECT id, personeladi, durussuresi

                FROM public.""personelsüreler"" 
            ");
            DataRow encokduranParcaRow;
            encokduranParcaRow = vt.Read("SELECT personeladi, durussuresi FROM public.\"personelsüreler\" WHERE durussuresi=(SELECT MAX(durussuresi) FROM public.\"personelsüreler\" )");


            ViewBag.PersonelSüreler = h;
            vt.closeDatabase();

            List<PersonelModel> PersonelSüreler = new List<PersonelModel>();
            foreach (DataRow dr in ViewBag.PersonelSüreler.Rows)
            {
                PersonelModel personelsüre = new PersonelModel
                {
                    id = (int)(dr["id"]),
                    personeladi = dr["personeladi"].ToString(),
                    durussuresi = (int)(dr["durussuresi"])


                };

                PersonelSüreler.Add(personelsüre);
            }
            return View(PersonelSüreler);

        }

        [HttpPost]
        public ActionResult PersonelBilgisi(DurusModel durus)
        {

            return View();

        }

        public IActionResult ArizaBilgisi()
        {

            VeriTabani vt = new VeriTabani();
            DataTable h = new DataTable();
            vt.openDatabase();
            vt.fillDataTable(h, @"
                SELECT id, parcaadi, durussuresi

                FROM public.""parcasüreler"" 
            ");
            DataRow encokduranArizalıParcaRow;
            encokduranArizalıParcaRow = vt.Read("SELECT parcaadi, durussuresi FROM public.\"parcasüreler\" WHERE durussuresi=(SELECT MAX(durussuresi) FROM public.\"parcasüreler\" )");


            ViewBag.ArizalıParcaSüreler = h;
            vt.closeDatabase();

            List<ArizaParcaModel> ArizalıParcaSüreler = new List<ArizaParcaModel>();
            foreach (DataRow dr in ViewBag.ArizalıParcaSüreler.Rows)
            {
                ArizaParcaModel arizaparcasüre = new ArizaParcaModel
                {
                    id = (int)(dr["id"]),
                    parcaadi = dr["parcaadi"].ToString(),
                    durussuresi = (int)(dr["durussuresi"])


                };

                ArizalıParcaSüreler.Add(arizaparcasüre);
            }
            return View(ArizalıParcaSüreler);


        }

        [HttpPost]
        public ActionResult ArizaBilgisi(DurusModel durus)
        {

            return View();

        }
        public IActionResult ParcaBilgisi()
        {
            VeriTabani vt = new VeriTabani();
            DataTable h = new DataTable();
            vt.openDatabase();
            vt.fillDataTable(h, @"
                SELECT id, uretilenparcaadi, durussuresi

                FROM public.""uretilenparcadurus"" 
            ");
            DataRow encokduranParcaRow;
            encokduranParcaRow = vt.Read("SELECT uretilenparcaadi, durussuresi FROM public.\"uretilenparcadurus\" WHERE durussuresi=(SELECT MAX(durussuresi) FROM public.\"uretilenparcadurus\" )");

            
            


            ViewBag.ParcaSüreler = h;
            vt.closeDatabase();

            List<ParcaModel> ParcaSüreler = new List<ParcaModel>();
            foreach (DataRow dr in ViewBag.ParcaSüreler.Rows)
            {
                ParcaModel parcasüre = new ParcaModel
                {
                    id = (int)(dr["id"]),
                    uretilenparcaadi = dr["uretilenparcaadi"].ToString(),
                    durussuresi = (int)(dr["durussuresi"])


                };

                ParcaSüreler.Add(parcasüre);
            }
            return View(ParcaSüreler);
        }

        [HttpPost]
        public ActionResult ParcaBilgisi(DurusModel durus)
        {

            return View();

        }
        public IActionResult DuruslarListe()
        {

            VeriTabani vt = new VeriTabani();
            DataTable h = new DataTable(); 
            vt.openDatabase();
            vt.fillDataTable(h, @"
                SELECT 
                    bd.id,
                    makine_adi, 
                    stokkodu_id,
                    baslangic_tarihi, 
                    bitis_tarihi,
                    personel_id,
                    adi_soyadi,
                    ""Name"", 
                    ariza_grup2,
                    ariza_grup3,
                    durus_suresi,
                    ariza_nedeni,
                    arizayeri
                FROM public.""BakimDuruslari"" bd
                LEFT JOIN public.""Personeller"" p on bd.personel_id = p.id
                LEFT JOIN public.""Products"" pr on bd.stokkodu_id = pr.""Id""
                LEFT JOIN public.""ArizaGrup2"" ag2 on bd.ariza_grup2 = ag2.id
                LEFT JOIN public.""ArizaGrup3"" ag3 on bd.ariza_grup3 = ag3.id

            ");

            ViewBag.Duruslar = h;
            vt.closeDatabase();

            List<DurusModel> duruslar = new List<DurusModel>();
            foreach (DataRow dr in ViewBag.Duruslar.Rows)
            {
                DurusModel durus = new DurusModel
                {
                    id = (long)(dr["id"]),
                    makine_adi = dr["makine_adi"].ToString(),
                    Name = dr["Name"].ToString(),
                    baslangic_tarihi = (DateTime)dr["baslangic_tarihi"],
                    bitis_tarihi = (DateTime)dr["bitis_tarihi"],
                    adi_soyadi = dr["adi_soyadi"].ToString(),
                    ariza_nedeni = dr["ariza_nedeni"].ToString(),
                    arizayeri = dr["arizayeri"].ToString(),
                    durus_suresi = (int)(dr["durus_suresi"])


                };

                duruslar.Add(durus);
            }
            return View(duruslar);

        }

        [HttpPost]
        public ActionResult DuruslarListe(DurusModel durus)
        {



            return View();

        }
      


    }

}