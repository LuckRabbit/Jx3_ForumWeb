using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Text;

namespace WebSite.Data
{
    public partial class getConfigData : ajaxlibrary
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            string ajaxUrl = Request.Params["ajaxurl"];
            string prarm = string.Empty;
            if (Request.Params["t"] != null)
            {
                string type = Request.Params["t"].ToString();
                if (type.Contains(","))
                {
                    string[] types = type.Split(',');
                    prarm += "&t=";
                    foreach (string s in types)
                    {
                        prarm += System.Web.HttpUtility.UrlEncode(Request.Params["t"].ToString(), Encoding.GetEncoding("gbk")) + ",";
                    }
                    prarm.Substring(0, prarm.Length - 1);
                }
                else
                {
                    prarm += "&t=" + System.Web.HttpUtility.UrlEncode(Request.Params["t"].ToString(), Encoding.GetEncoding("gbk"));
                }
            }
            if (Request.Params["s"] != null)
            {
                prarm += "&s=" + System.Web.HttpUtility.UrlEncode(Request.Params["s"].ToString(), Encoding.GetEncoding("gbk"));
            }
            if (Request.Params["m"] != null)
            {
                prarm += "&m=" + System.Web.HttpUtility.UrlEncode(Request.Params["m"].ToString(), Encoding.GetEncoding("gbk"));
            }
            if (Request.Params["o"] != null && Request.Params["o"]=="init")
            {
                if (Session["username"] != null && Session["userid"] != null)
                {
                    string uncode = Session["username"].ToString() + "-" + Session["userid"].ToString() + "-1";
                    prarm += "&o=" + System.Web.HttpUtility.UrlEncode(uncode, Encoding.GetEncoding("gbk"));
                }
            }
            if (Request.Params["tid"] != null)
            {
                prarm += "&tid=" + Request.Params["tid"].ToString();
            }
            if (prarm != string.Empty)
            {
                ajaxUrl = ajaxUrl + "?" + prarm;
                ajaxUrl.Replace("?&", "?");
            }
            string ss = GetUrltoHtml(ajaxUrl, "utf-8");
            string subject = System.Web.HttpUtility.UrlDecode(ss, Encoding.GetEncoding("gbk")).Replace("'", "‘").Replace("\"\"", "\"").Replace("\" \"", "\"").Replace("\\", "\\\\");
            Response.Write(subject);
        }
        public static string decodestr(string encode)
        {
            char c = '1';
            string sss = string.Empty;
            for (int i = 0; i < encode.Length; i += 3)
            {
                if (encode[i] == '3')
                {
                    c = (char)int.Parse(encode[i + 2].ToString());
                }
                else if (encode[i] == '4')
                {
                    c = (char)int.Parse(encode[i + 1].ToString() + encode[i + 2].ToString());
                }
                else
                {
                    string ss = encode[i].ToString() + encode[i + 1].ToString() + encode[i + 2].ToString();
                    c = (char)int.Parse(encode[i].ToString() + encode[i + 1].ToString() + encode[i + 2].ToString());
                }
                sss += c;
            }
            return sss;
        }
    }
}