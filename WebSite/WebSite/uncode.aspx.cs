using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace WebSite
{
    public partial class uncode : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            string encode = "451452448457452456449";
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
            Response.Write(sss);
        }
    }
}