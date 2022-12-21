using System.ComponentModel.DataAnnotations;


namespace Makineduruslari.Models
{
    public class BakimDurusModel
    {
        public string? makine_adi { get; set; }

        public string? stok_kodu { get; set; }

        public DateTime baslangic_tarihi { get; set; }

        public DateTime bitis_tarihi { get; set; }

        public long personel { get; set; }

        public long ariza_grup2 { get; set; }

        public long ariza_grup3 { get; set; }

        public int durus_suresi { get; set; }

        public int yil { get; set; }

        public string tezgah { get; set; }




    }
}
