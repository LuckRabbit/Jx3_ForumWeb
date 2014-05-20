using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Text;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Web.SessionState;

namespace WebSite.Data
{
    public partial class saveLoginData : ajaxlibrary
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            string ajaxUrl = "http://msg.j3ui.com:10200/users.php";
            string prarm = string.Empty;
            if ( Request.Params["user"] != null && Request.Params["userid"] != null)
            {
                string uncode = Request.Params["user"].ToString() + "-" + decodestr(Request.Params["userid"].ToString()) + "-1";
                prarm += "&o=" + System.Web.HttpUtility.UrlEncode(uncode, Encoding.GetEncoding("gbk"));
            }
            if (prarm != string.Empty)
            {
                ajaxUrl = ajaxUrl + "?" + prarm;
                ajaxUrl.Replace("?&", "?");
            }
            string ss = GetUrltoHtml(ajaxUrl, "utf-8");
            string subject = System.Web.HttpUtility.UrlDecode(ss, Encoding.GetEncoding("gbk")).Replace("'", "‘").Replace("\"\"", "\"").Replace("\" \"", "\"").Replace("\\", "\\\\");
            
            if(subject.Contains("users"))
            {
                UserInfo ja = JsonConvert.DeserializeObject<UserInfo>(subject);
                //JArray dataarray = ja.users;
                //user userdata = JsonConvert.DeserializeObject<user>(ja.users);
                Session["username"] = ja.users.a;
                Session["userid"] = ja.users.d;
                HttpCookie hc = new HttpCookie("username", ja.users.a);
                hc.Path = "/";
                Response.Cookies.Add(hc);
                Response.Write("sucess");


            }
            else
            {
                Response.Write("fail");
            }
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