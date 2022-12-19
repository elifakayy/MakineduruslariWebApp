using Npgsql;
using System;
using System.Data;
using System.Data.SqlClient;

namespace veritabani
{
    public class VeriTabani
    {
        const string VT_HATA01 = "Veritabanı bağlantı hatası";
        const string VT_HATA02 = "Dataset oluşturulamıyor";
        const string VT_HATA03 = "Datatable oluşturulamıyor";
        const string VT_HATA05 = "SQL cümlesi işletilemedi";

        // HATA KODLARI
        // 1   bağlantı hatası
        // 2   dataset hatası
        // 3   filldatatable hatası
        // 4   updatedataset hatası,,
        // 5   execute hatası
        // 6   opendatareader hatası
        // 7   begintrans hatası
        // 8   rollback hatası
        // 9   committrans hatası
        // 10  new hatası
        // 11  counter tanımsız hatası

        const long _CommandTimeout = 54000;

        public struct vt_parameters
        {
            public string adi;
            public System.Data.SqlDbType tip;
            public string deger;
            public System.Data.ParameterDirection direction;
            public bool isNullValue;
        }

        public static vt_parameters parameters;

        private NpgsqlConnection myconnection_Sql;
        private NpgsqlCommand myCommand_sql;
        private NpgsqlDataReader myDataReader_sql;
        private NpgsqlTransaction myTrans_sql;

        private DataTable myDatatableSchema;
        private long m_RowsAffected = 0;

        private string myconnectionStr;
        private string myconnectionStrInCaseError;

        private int myhataKodu;
        private string myhataKodu_str;
        private string myhatasqlstr;
        private string mycaption;

        //private string m_provider;
        //private string m_webservisurl;
        //private string m_dataSource;
        //private string m_username;
        //private string m_passWord;
        //private string m_catalog;
        //private string m_port;

        public long RowsAffected
        {
            get
            {
                return m_RowsAffected;
            }
            set
            {
                m_RowsAffected = value;
            }
        }

        //public string provider
        //{
        //    get
        //    {
        //        return m_provider;
        //    }
        //}
        //public string dataSource
        //{
        //    get
        //    {
        //        return m_dataSource;
        //    }
        //}
        //public string username
        //{
        //    get
        //    {
        //        return m_username;
        //    }
        //}
        //public string passWord
        //{
        //    get
        //    {
        //        return m_passWord;
        //    }
        //}
        //public string catalog
        //{
        //    get
        //    {
        //        return m_catalog;
        //    }
        //}
        //public object ConnectionObject
        //{
        //    get
        //    {
        //        return myconnection_Sql;
        //    }
        //}
        private string m_dateformat;
        public string DBDateFormat
        {
            get
            {
                return m_dateformat;
            }
            set
            {
                m_dateformat = value;
            }
        }

        private void setConnectionString()
        {
            myconnectionStr = "Server=192.168.1.51; Port=5432; Database=totomakv2 ;User Id=postgres;Password=Semafor4.";
        }

        public void getDBDateTime(ref DateTime DateValue, ref string DateStr)
        {

        }

        public string getDBDateField(string DateStr) // 16/7/2012
        {
            return DateStr;
        }

        public long getNextCounter(string seqAdi)
        {
            return 1;
        }
        private void SetException(int kod, string msg, string sqlstr, string caption, bool HandleError)
        {
            myhataKodu = kod;
            myhataKodu_str = msg;
        }

        public bool openDatabase(bool HandleError = true)
        {
            myhataKodu = 0;
            myhataKodu_str = "";


            try
            {
                myconnection_Sql = new NpgsqlConnection(myconnectionStr);
                myconnection_Sql.Open();

                myCommand_sql = new NpgsqlCommand();
                myCommand_sql.Connection = myconnection_Sql;

                return true;

            }
            //catch (SqlException ex)
            //{
            //    SetException(1, ex.Message, myconnectionStrInCaseError, VT_HATA01, HandleError);
            //    return false;
            //}
            catch (Exception ex)
            {
                SetException(1, ex.Message, myconnectionStrInCaseError, VT_HATA01, HandleError);
                return false;
            }
        }



        public void closeDatabase()
        {
            try
            {
                myconnection_Sql.Close();
            }
            catch (SqlException ex)
            {
            }
        }


        public bool fillDataSet(ref DataSet myDataSet, string srctable, string SqlStr, bool HandleError = true, bool ReadSchema = true)
        {
            myhataKodu = 0;
            myhataKodu_str = "";
            SqlStr = ParseSQL(SqlStr);

            try
            {


                return true;
            }
            //catch (SqlException ex)
            //{
            //    SetException(2, ex.Message, SqlStr, VT_HATA02, HandleError);
            //    return false;
            //}
            catch (Exception ex)
            {
                SetException(2, ex.Message, SqlStr, VT_HATA02, HandleError);
                return false;
            }
        }

        public DataRow Read(string SqlStr, bool HandleError = true)
        {
            DataTable dt = new DataTable();
            fillDataTable(dt, SqlStr, HandleError);
            //if (dt.Rows.Count = 0)
            //    return DataRow();

            return dt.Rows[0];
        }
        public bool fillDataTable(DataTable myDataTable, string SqlStr, bool ReadSchema = true, bool HandleError = true)
        {
            SqlStr = ParseSQL(SqlStr);
            myhataKodu = 0;
            myhataKodu_str = "";
            myDataTable.Clear();
            NpgsqlDataAdapter myDataAdapter;
            try
            {
                myDataAdapter = new NpgsqlDataAdapter(SqlStr, myconnection_Sql);
                myCommand_sql.CommandText = SqlStr;
                myDataAdapter.SelectCommand = myCommand_sql;
                //myDataAdapter.SelectCommand.CommandTimeout = _CommandTimeout;
                myDataTable.TableName = "T";
                if (ReadSchema)
                    myDataAdapter.FillSchema(myDataTable, SchemaType.Mapped);
                myDataAdapter.Fill(myDataTable);
                if (ReadSchema)
                    myDataAdapter.MissingSchemaAction = MissingSchemaAction.AddWithKey;
                return true;
            }
            catch (NpgsqlException ex)
            {
                SetException(3, ex.Message, SqlStr, VT_HATA03, HandleError);
                return false;
            }
            catch (Exception ex)
            {
                SetException(-1, ex.Message, SqlStr, VT_HATA03, false);
                return false;
            }
            return true;
        }

        public string ConvertSQL(string sqlstr)
        {
            return sqlstr;
            string temp = "";
            string temp1;
            bool InQuote;
            int i;
            int j;
            temp = "";
            InQuote = false;
            sqlstr = sqlstr.Trim();
            for (i = 0; i <= sqlstr.Length - 1; i++)
            {
                temp1 = sqlstr.Substring(i, 1);
                if (temp1 == "'" | temp1 == "`")
                    InQuote = !InQuote;
                if (!InQuote)
                {
                    j = ("İĞÜŞÖÇğüşıöç").IndexOf(temp1);
                    if (j > 0)
                        temp1 = ("IGUSOCGUSIOC").Substring(j, 1);
                    else
                        temp1 = temp1.ToUpper();
                }
                temp = temp + temp1;
            }
            return temp.Replace("`", "");
        }

        private string ParseSQL(string sqlstr)
        {
            return sqlstr;
            string temp = ConvertSQL(sqlstr);
            temp = temp.Replace("LENGTH(", "LEN(");
            temp = temp.Replace("NVL(", "ISNULL(");
            temp = temp.Replace("||", "+");
            temp = temp.Replace("SUBSTR(", "SUBSTRING(");
            temp = temp.Replace("SYSDATE", "GETDATE()");
            temp = temp.Replace(" FROM DUAL", " ");
            return temp;
        }

        public long Execute(string sqlStr, bool HandleError = true)
        {
            long affectedRow = 0;
            myhataKodu = 0;
            myhataKodu_str = "";
            sqlStr = ParseSQL(sqlStr);
            try
            {

                myCommand_sql.CommandText = sqlStr;
                myDataReader_sql = myCommand_sql.ExecuteReader();
                affectedRow = myDataReader_sql.RecordsAffected;
                RowsAffected = RowsAffected + affectedRow;
                myDataReader_sql.Close();
                myDataReader_sql.Dispose();
                return affectedRow;

            }
            //catch (SqlException ex)
            //{
            //    SetException(5, ex.Message, sqlStr, VT_HATA05, HandleError);
            //    return -1;
            //}
            catch (Exception ex)
            {
                SetException(5, ex.Message, sqlStr, VT_HATA05, HandleError);
                return -1;
            }
        }

        public void Addparameters(ref vt_parameters prm, string adi, string deger, System.Data.ParameterDirection direction, SqlDbType dbtype)
        {
            if (deger == DBNull.Value.ToString())
                prm.isNullValue = true;
            else
                prm.isNullValue = false;
            prm.adi = adi;
            prm.deger = deger;
            prm.direction = direction;
            prm.tip = dbtype;
        }

        //public DataSet ExecuteSP(string objeName, ref vt_parameters[] my_parameters, bool HandleError = true)
        //{
        //    result = null;
        //    myhataKodu = 0;
        //    myhataKodu_str = "";
        //    ExecuteSP = result;

        //    try
        //    {

        //        return result;
        //    }
        //    catch (SqlException ex)
        //    {
        //        ExecuteSP = result;
        //        SetException(5, ex.Message, sqlstr, VT_HATA05, HandleError);
        //    }
        //    catch (Exception ex)
        //    {
        //        ExecuteSP = result;
        //        SetException(5, ex.Message, sqlstr, VT_HATA05, HandleError);
        //    }
        //}

        public long Execute(string objeName, ref vt_parameters[] my_parameters, bool HandleError = true)
        {
            int i;
            string sqlstr = "";
            myhataKodu = 0;
            myhataKodu_str = "";

            try
            {
                return 1;
            }
            //catch (SqlException ex)
            //{
            //    SetException(5, ex.Message, sqlstr, VT_HATA05, HandleError);
            //    return -1;
            //}
            catch (Exception ex)
            {
                SetException(5, ex.Message, sqlstr, VT_HATA05, HandleError);
                return -1;
            }
        }

        //public bool BeginTrans()
        //{
        //    myhataKodu = 0;
        //    myhataKodu_str = "";
        //    try
        //    {
        //        myTrans_sql = myconnection_Sql.BeginTransaction();
        //        myCommand_sql.Transaction = myTrans_sql;
        //        RowsAffected = 0;
        //        return true;
        //    }
        //    catch (Exception ex)
        //    {
        //        myhataKodu = 7;
        //        myhataKodu_str = ex.Message;
        //        return false;
        //    }
        //}

        //public bool RollBack()
        //{
        //    myhataKodu = 0;
        //    myhataKodu_str = "";
        //    try
        //    {
        //        myTrans_sql.Rollback();
        //        RowsAffected = 0;
        //        return true;
        //    }
        //    catch (Exception ex)
        //    {
        //        myhataKodu = 8;
        //        myhataKodu_str = ex.Message;
        //        return false;
        //    }
        //}

        //public bool CommitTrans()
        //{
        //    myhataKodu = 0;
        //    myhataKodu_str = "";
        //    try
        //    {
        //        myTrans_sql.Commit();
        //        return true;
        //    }
        //    catch (Exception ex)
        //    {
        //        myhataKodu = 9;
        //        myhataKodu_str = ex.Message;
        //        return false;
        //    }
        //}

        public bool isOpen()
        {
            if (myconnection_Sql == null)
                return false;
            else if (myconnection_Sql.State != System.Data.ConnectionState.Open)
                return false;
            else
                return true;
        }

        public void checkConnsistency()
        {
            if (!isOpen())
                openDatabase();
        }


        public VeriTabani(string p_ConnectionStr)
        {
            myconnectionStr = p_ConnectionStr;
        }

        public VeriTabani()
        {
            myhataKodu = 0;
            myhataKodu_str = "";
            try
            {
                setConnectionString();
            }
            catch (Exception ex)
            {
                myhataKodu = 10;
                myhataKodu_str = ex.Message;
            }
        }
        public int hataKodu
        {
            get
            {
                return myhataKodu;
            }
        }
        public string hataKoduStr
        {
            get
            {
                return myhataKodu_str;
            }
        }



        //public void GetDateFormat(ref string parseFormat, ref string sqlFormat)
        //{
        //    string x1;
        //    string x2;
        //    string x3;
        //    x1 = UCase(Strings.Left(Retrieve(DateTimeFormatInfo.CurrentInfo.ShortDatePattern, 1, DateTimeFormatInfo.CurrentInfo.DateSeparator), 1));
        //    x2 = UCase(Strings.Left(Retrieve(DateTimeFormatInfo.CurrentInfo.ShortDatePattern, 2, DateTimeFormatInfo.CurrentInfo.DateSeparator), 1));
        //    x3 = UCase(Strings.Left(Retrieve(DateTimeFormatInfo.CurrentInfo.ShortDatePattern, 3, DateTimeFormatInfo.CurrentInfo.DateSeparator), 1));
        //    if (x1 == "D")
        //        parseFormat = parseFormat + "dd/";
        //    else if (x1 == "M")
        //        parseFormat = parseFormat + "MM/";
        //    else
        //        parseFormat = parseFormat + "yyyy/";
        //    if (x2 == "D")
        //        parseFormat = parseFormat + "dd/";
        //    else if (x2 == "M")
        //        parseFormat = parseFormat + "MM/";
        //    else
        //        parseFormat = parseFormat + "yyyy/";
        //    if (x3 == "D")
        //        parseFormat = parseFormat + "dd";
        //    else if (x3 == "M")
        //        parseFormat = parseFormat + "MM";
        //    else
        //        parseFormat = parseFormat + "yyyy";
        //    sqlFormat = x1 + x2 + x3;
        //}
    }

}
