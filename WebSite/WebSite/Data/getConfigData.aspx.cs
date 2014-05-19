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
            if(Request.Params["t"] != null)
            {
                string type = Request.Params["t"].ToString();
                if (type.Contains(","))
                {
                    string[] types = type.Split(',');
                    prarm += "&t=";
                    foreach(string s in types)
                    {
                        prarm += System.Web.HttpUtility.UrlEncode(Request.Params["t"].ToString(), Encoding.GetEncoding("gbk"))+",";
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
                prarm += "&s=" + System.Web.HttpUtility.UrlEncode(Request.Params["s"].ToString(),Encoding.GetEncoding("gbk"));
            }
            if (Request.Params["tid"] != null)
            {
                prarm += "&tid=" + Request.Params["tid"].ToString();
            }
            if(prarm != string.Empty)
            {
                ajaxUrl = ajaxUrl + "?" + prarm;
                ajaxUrl.Replace("?&", "?");
            }
            string ss = GetUrltoHtml(ajaxUrl, "utf-8");
            string subject = System.Web.HttpUtility.UrlDecode(ss, Encoding.GetEncoding("gbk")).Replace("'", "‘");
            Response.Write(subject);
        }
    }
}