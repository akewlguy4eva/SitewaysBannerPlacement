/**************************************************************************************
 Swinity Banner Script.
 A script to read mutiple sources and replace banners setup with <INS tags
 or to do inline replaces.
 **************************************************************************************/


let Swinity = {
  Globals: {
    RootApi: "https://app.swinity.com/api",
    LogEnabled: true,
    BannerSpots: [],
    HttpCache: [],
    BuyImages: [
      {Size: "728x90", Theme: "ENG-Modern", Url: "https://cdn.topescort.com/library/source/v/1/342022cc-a33e-416d-859e-084141ab16a1.gif"},
      {Size: "728x90", Theme: "ENG-Modern", Url: "https://cdn.topescort.com/library/source/v/1/f13833b6-07d1-409c-8938-76dcdb3bd552.gif"},
      {Size: "300x250", Theme: "ENG-Modern", Url: "https://cdn.topescort.com/library/source/v/1/951eb858-ed00-4eef-a741-98b4cd30b3ee.gif"},
      {Size: "300x250", Theme: "ENG-Modern", Url: "https://cdn.topescort.com/library/source/v/1/3019c4fa-6553-472f-b98f-a54aade247e8.gif"},
      {Size: "300x100", Theme: "ENG-Modern", Url: "https://cdn.topescort.com/library/source/v/1/9dfd1981-975a-4698-ba9e-461afb51652f.gif"},
      {Size: "300x100", Theme: "ENG-Modern", Url: "https://cdn.topescort.com/library/source/v/1/d1ae0e1e-d234-4e72-9f08-e1361ab9725e.gif"},
      {Size: "200x333", Theme: "ENG-Modern", Url: "https://cdn.topescort.com/library/source/v/1/9a4d446e-8bcb-4003-8913-d4cd4c9af349.gif"},
      {Size: "200x333", Theme: "ENG-Modern", Url: "https://cdn.topescort.com/library/source/v/1/acebc6d5-1b76-4556-a533-792cb91b8380.gif"},
      {Size: "200x233", Theme: "ENG-Modern", Url: "https://cdn.topescort.com/library/source/v/1/9a4d446e-8bcb-4003-8913-d4cd4c9af349.gif"},
      {Size: "200x233", Theme: "ENG-Modern", Url: "https://cdn.topescort.com/library/source/v/1/acebc6d5-1b76-4556-a533-792cb91b8380.gif"},
      {Size: "200x200", Theme: "ENG-Modern", Url: "https://cdn.topescort.com/library/source/v/1/848ad901-e241-4760-bbcc-a1167bf3f8fe.gif"},
      {Size: "200x200", Theme: "ENG-Modern", Url: "https://cdn.topescort.com/library/source/v/1/ba029d2f-4f30-4b2b-9b20-18f2d15a442a.gif"},
      {Size: "160x600", Theme: "ENG-Modern", Url: "https://cdn.topescort.com/library/source/v/1/b902347e-04f5-46db-b440-1f9ddbd756f8.gif"},
      {Size: "160x600", Theme: "ENG-Modern", Url: "https://cdn.topescort.com/library/source/v/1/9903bbc2-d1f6-4a87-b594-ec9c49c59b1a.gif"},
      {Size: "468x60", Theme: "ENG-Modern", Url: "https://cdn.topescort.com/library/source/v/1/e01cbfaf-4db0-4f6c-967d-c077129517db.jpg"}
    ]
  },
  Log: (txt,obj) => {
    if(Swinity.Globals.LogEnabled) {
      if(typeof obj === "undefined") {
        console.log(txt);
      } else {
        console.log(txt,obj);
      }
    }
  },
  MakeId: (length) => {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  },
  isNullOrUndefined: (val) => {
    return val === null || typeof val === "undefined";
  },

  /**********************************************************************************
   The Below Functions Allow Me To Call HTTP Based APIS Without JQuery All Callz
   Are Supported Down To IE 3.0, And Any Other Browser In The Last 20 Years :)
   **********************************************************************************/
  HttpPostJson: (url,dta,headers,cb) => {
    try {
      let xhr = new XMLHttpRequest();
      xhr.open("POST", url);
      if (typeof headers !== "undefined") {
        for (let k in headers) {
          xhr.setRequestHeader(k, headers[k]);
        }
      }
      xhr.setRequestHeader("Content-type","application/json");
      xhr.onload = () => {
        if (xhr.status === 200) {
          let obj = JSON.parse(xhr.responseText);
          cb(obj); return;
        } else {
          try { //Try To Read The JSON Output If Any
            let obj = JSON.parse(xhr.responseText);
            cb(obj); return;
          } catch (ex) {
          }
          cb({Code: xhr.status, Message: xhr.statusText}); return;
        }
      };
      xhr.send(JSON.stringify(dta));
    } catch (ex) {
      console.error("Error in Swinity.Globals.HttpPost: " + ex.toString(),{Url: url, Data: dta});
    }
  },
  HttpGet: (url,headers,cb,pb,uc=false) => {
    try {
      if(uc) {
        if(Swinity.Globals.HttpCache.filter((t) => {return t.Key === url}).length>0) {
          cb(Swinity.Globals.HttpCache.filter((t) => {return t.Key === url})[0].Value,pb);
          return;
        }
      }
      let xhr = new XMLHttpRequest();
      xhr.open("GET",url);
      if(typeof headers !== "undefined") {
        for(let k in headers) {
          xhr.setRequestHeader(k,headers[k]);
        }
      }
      xhr.onload = () => {
        if(xhr.status === 200) {
          let obj = JSON.parse(xhr.responseText);
          if(uc) {
            Swinity.Globals.HttpCache.push({Key: url, Value: obj});
          }
          cb(obj,pb); return;
        } else {
          try { //Try To Read The JSON Output If Any
            let obj = JSON.parse(xhr.responseText);
            cb(obj,pb); return;
          } catch (ex) {}
          cb({Code: xhr.status, Message: xhr.statusText},pb); return;
        }
      };
      xhr.send();
    } catch(ex) {
      console.error("Error in Swinity.Globals.HttpGet: " + ex.toString());
    }
  },
  Banners: {
    //Function to mimic the $(document).ready() functionality of jQuery
    OnReady: (cb) => {
      if (document.readyState!='loading') cb();
      // modern browsers
      else if (document.addEventListener) document.addEventListener('DOMContentLoaded', cb);
      else document.attachEvent('onreadystatechange', function(){
          if (document.readyState=='complete') cb();
        });
    },
    //This function loads the the page tags, and the banners for the spots
    Init: () => {
      try {
        Swinity.Globals.BannerSpots = [];
        Swinity.Banners.PlaceBanners();
      } catch(ex) {
        console.error("Error in Swinity.Banners.Init: " + ex.toString());
      }
    },
    RandomBuyAdImage: (size) => {
      let bans = Swinity.Globals.BuyImages.filter((t) => { return t.Size === size });
      if(bans.length>0) {
        if(bans.length === 1) {
          return bans[0].Url;
        }
        let ran = Math.floor(Math.random() * (bans.length));
        return bans[ran].Url;
      }

    },
    SizeByKey: (key) => {
      let parts = key.split("-");
      return parts[parts.length-1];
    },
    GenCSSByuAd: (size,url) => {
      let cde = '';
      let blk = url.startsWith("http") ? "_blank" : "_self";
      cde += '<div id="ad-zone-' + size + '"><a class="flex-center" href="' + url + '" target="' + blk + '">';
      cde += '<div class="adbuy-banner Size-' + size + '">';
      cde += '<div class="buy-text Size-' + size + '">Get 50x more visitors!</div>';
      cde += '<div class="buy-button Size-' + size + '">Advertise here!</div>';
      cde += '<div class="buy-sub-text Size-200x200">Buy a banner ad today.</div>'
      cde += '</div>';
      cde += '</a></div>';
      return cde;
    },
    //This Is Function To Call To Set The Current Banners
    PlaceBanners: (usecache=false) => {


      //Always Reload, Maybe They Added New :)
      Swinity.Globals.BannerSpots = [];
      Swinity.Globals.BannerSpots = Swinity.Banners.GetInsertTags();

      Swinity.Globals.BannerSpots.forEach((s) => {
        let ele = s.Element;
        ele.setAttribute("style","display: none");
        let headers = {
          "X-Alt-Referer": document.location.href
        };
        let qry = "";
        if(s.Country !== "") {
          qry += "&countryCode=" + s.Country;
        }
        if(s.MaxStandard !== "") {
          qry += "&maxstandard=" + s.MaxStandard;
        }


        Swinity.HttpGet(Swinity.Globals.RootApi + `/creatives/${s.Id}?channel=${s.Channel}&max=${s.Count}&minAdvertiseHere=${s.MinBuyAds}&maxAdvertiseHere=${s.MaxBuyAds}&min=${s.Min}${qry}`,headers,(data,pb) => {
          if(data.Code === 200) {

            data.Result.forEach((v,i) => {
              let rec = v.Creative;
              if(rec.Code == "ADVERTISEHERE") {
                if(s.BuyAdTemplate == "images") { //Pre Done Image
                  let href = document.createElement("a");
                  let img = document.createElement("img");
                  href.id=s.DomId + "-" + i; href.href=s.BuyAdUrl; href.target="_blank"; href.title=rec.Title; href.className=pb.Class + " site-banner-spot";
                  img.alt=rec.Title; href.onclick = (e)=>{
                    try {
                      if(typeof window !== "undefined" && typeof window.ga !== "undefined") {
                        window.ga('send', 'event', 'Banner', 'Click', v.Click.Name);
                      }
                    } catch(gex) {}
                    try {
                      Swinity.HttpPostJson(Swinity.Globals.RootApi + `/creatives/click`,{Guid: v.Click.Guid},headers,()=>{});
                    } catch(aex) {}
                  };
                  img.src=Swinity.Banners.RandomBuyAdImage(Swinity.Banners.SizeByKey(s.Id)); //The Image Src We Set From Random
                  href.appendChild(img);
                  let ext = document.getElementById(href.id);
                  if(ext !== null) {
                    pb.Element.parentNode.replaceChild(href,ext);
                  } else {
                    pb.Element.parentNode.appendChild(href);
                  }
                } else if(s.BuyAdTemplate.startsWith("css")) { //CSS Based Template
                  let div = document.createElement("div");
                  div.id=s.DomId + "-" + i;
                  div.className=pb.Class + " site-banner-spot";
                  let ext = document.getElementById(div.id);
                  if(ext !== null) {
                    pb.Element.parentNode.replaceChild(div,ext);
                  } else {
                    pb.Element.parentNode.appendChild(div);
                  }
                  div.innerHTML = Swinity.Banners.GenCSSByuAd(Swinity.Banners.SizeByKey(s.Id),s.BuyAdUrl);
                } else { //CUSTOM DIV Template
                  let div = document.createElement("div");
                  div.id=s.DomId + "-" + i;
                  div.className=pb.Class + " site-banner-spot";
                  let ext = document.getElementById(div.id);
                  if(ext !== null) {
                    pb.Element.parentNode.replaceChild(div,ext);
                  } else {
                    pb.Element.parentNode.appendChild(div);
                  }
                  let tmp = document.getElementById(s.BuyAdTemplate);
                  if(tmp!==null) {
                    div.innerHTML = tmp.innerHTML;
                  } else {
                    console.log("Could Not Read Template But Have Ads",s.BuyAdTemplate);
                  }
                }
              } else {
                let href = document.createElement("a");
                let img = document.createElement("img");
                href.id=s.DomId + "-" + i; href.href=rec.TargetUrl; href.target="_blank"; href.title=rec.Title; href.className=pb.Class + " site-banner-spot";
                img.src=rec.Url; img.alt=rec.Title; href.onclick = (e)=>{
                  try {
                    if(typeof window !== "undefined" && typeof window.ga !== "undefined") {
                      window.ga('send', 'event', 'Banner', 'Click', v.Click.Name);
                    }
                  } catch(gex) {}
                  try {
                    Swinity.HttpPostJson(Swinity.Globals.RootApi + `/creatives/click`,{Guid: v.Click.Guid},headers,()=>{});
                  } catch(aex) {}
                };
                href.appendChild(img);
                let ext = document.getElementById(href.id);
                if(ext !== null) {
                  pb.Element.parentNode.replaceChild(href,ext);
                } else {
                  pb.Element.parentNode.appendChild(href);
                }
              }

              //Adding Code Here For Banner Impressions
              try {
                if(typeof window !== "undefined" && typeof window.ga !== "undefined") {
                  if(!Swinity.isNullOrUndefined(rec.Click.Name)) {
                    window.ga('send', 'event', 'Banner', 'Impression', rec.Click.Name);
                  } else {
                    if(rec.Code == "ADVERTISEHERE") {
                      window.ga('send', 'event', 'Banner', 'Impression', s.Id + " - Advertise Here");
                    }
                  }
                }
              } catch(gex) {
                console.warn("Error doing google impression",gex)
              }
            });

            //Remove any previous banners :) On Redo :)
            let col = document.getElementsByClassName("site-banner-spot");
            let eles = Array.from(col);
            for(let xInt=0; xInt<=eles.length-1; xInt++) {
              let nId = eles[xInt].id;
              let rem = false;
              if(eles[xInt].parentNode == pb.Element.parentNode) {
                rem=true;
                data.Result.forEach((v,i) => {
                  let cId = s.DomId + "-" + i;
                  if(cId == nId) {
                    rem=false;
                  }
                });
              }
              if(rem) {
                eles[xInt].parentNode.removeChild(eles[xInt]);
              }
            }
          }
        },s,usecache);
      });
    },
    GetAttributeString(obj,nme) {
      let t = obj.getAttribute(nme);
      return t === null ? "" : t;
    },
    //Function to get a list of insert tags using only standard JS callz, works down to IE 3.0 browsers(WIN 95)
    GetInsertTags: () => {
      let spots = [];
      try {
        let eles = document.getElementsByTagName("ins");
        for(let x=0; x<=eles.length-1; x++) {
          let hObj = eles.item(x);
          //console.log("Getting tag..",hObj);
          let tObj = {
            Element: hObj,
            Id:  Swinity.Banners.GetAttributeString(hObj,"data-key"),
            Channel: Swinity.Banners.GetAttributeString(hObj,"data-channel"),
            Class: Swinity.Banners.GetAttributeString(hObj,"data-class"),
            Count: isNaN(Swinity.Banners.GetAttributeString(hObj,"data-count")) ? "0" : Swinity.Banners.GetAttributeString(hObj,"data-count"),
            MinBuyAds: isNaN(Swinity.Banners.GetAttributeString(hObj,"data-minbuyads")) ? "0" : Swinity.Banners.GetAttributeString(hObj,"data-minbuyads"),
            MaxBuyAds: isNaN(Swinity.Banners.GetAttributeString(hObj,"data-maxbuyads")) ? "0" : Swinity.Banners.GetAttributeString(hObj,"data-maxbuyads"),
            Country: Swinity.Banners.GetAttributeString(hObj,"data-country"),
            BuyAdTemplate: Swinity.Banners.GetAttributeString(hObj,"data-buyadtemplate"),
            BuyAdUrl: Swinity.Banners.GetAttributeString(hObj,"data-buyadurl") == "" ? "/contacts" : Swinity.Banners.GetAttributeString(hObj,"data-buyadurl"),
            MaxStandard: isNaN(Swinity.Banners.GetAttributeString(hObj,"data-maxstandard")) ? "1" : Swinity.Banners.GetAttributeString(hObj,"data-maxstandard"),
            DomId: Swinity.Banners.GetAttributeString(hObj,"data-domid") == "" ? Swinity.MakeId(15) : Swinity.Banners.GetAttributeString(hObj,"data-domid"),
          };
          tObj.Min = isNaN(Swinity.Banners.GetAttributeString(hObj,"data-min")) ? tObj.Count : Swinity.Banners.GetAttributeString(hObj,"data-min");
          hObj.setAttribute("data-domid",tObj.DomId);
          if(tObj.Count > "0") {
            spots.push(tObj);
          }
        }
      } catch(ex) {
        console.error("Error in Swinity.Banners.GetInsertTags: " + ex.toString());
        throw ex;
      }
      return spots;
    },
  }
};
Swinity.Banners.OnReady(()=> {
  Swinity.Banners.Init(); //Call All Needed Jazz :)
});


