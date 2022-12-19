using System.ComponentModel.DataAnnotations;


namespace Makineduruslari.Models
{
    public class DurusModel
    {
        public long id { get; set; }
        public string? makine_adi { get; set; }

        public string? Name { get; set; }

        public DateTime baslangic_tarihi { get; set; }

        public DateTime bitis_tarihi { get; set; }

        public long personel_id { get; set; }

        public long ariza_grup2 { get; set; }

        public long ariza_grup3 { get; set; }

        public int durus_suresi { get; set; }

        public int yil { get; set; }

        public string tezgah { get; set; }
        public string? adi_soyadi { get; set; }

        public string ariza_nedeni { get; set; }


        public string arizayeri { get; set; }

    }
}
