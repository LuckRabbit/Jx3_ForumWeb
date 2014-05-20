using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq; 

namespace WebSite
{
    public class UserInfo
    {
        public user users { get; set; }
    }
    public class user
    {
        public string uid { get; set; }
        public string a { get; set; }
        public string d { get; set; }
        public string s { get; set; }
    }
}