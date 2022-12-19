using System.ComponentModel.DataAnnotations;

namespace Makineduruslari.Models
{
    public class KullaniciModel
    {
        public long id { get; set; }

        public char adi { get; set; }

        public char soyadi { get; set; }

        public string kullanici_adi { get; set; }

        public string sifre { get; set; }




    }
}
