using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Text;

namespace WebSite.Data
{
    public partial class postReplyData : ajaxlibrary
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            string ajaxUrl = Request.Params["ajaxurl"];
            string prarm = string.Empty;
            bool flag = true;
            if (Request.Params["m"] != null)
            {
                prarm += "&m=" + System.Web.HttpUtility.UrlEncode(Request.Params["m"].ToString(), Encoding.GetEncoding("gbk"));
            }
            if (Request.Params["o"] != null && Request.Params["o"] == "init")
            {
                if (Session["username"] != null && Session["userid"] != null)
                {
                    string uncode = Session["username"].ToString() + "-" + Session["userid"].ToString() + "-1";
                    prarm += "&o=" + System.Web.HttpUtility.UrlEncode(uncode, Encoding.GetEncoding("gbk"));
                }
                else
                {
                    flag = false;
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
            if ((ss == string.Empty || ss == "") && flag)
            {
                Response.Write("sucess");
            }
            else
            {
                string subject = System.Web.HttpUtility.UrlDecode(ss, Encoding.GetEncoding("gbk")).Replace("'", "‘").Replace("\"\"", "\"").Replace("\" \"", "\"").Replace("\\", "\\\\");
                Response.Write("fail");
            }
        }
    }
}