import React, { Component } from 'react';


const AppUrl = 'https://app.swinity.com/api/creatives';

class SwBanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Id: this.isNullOrUndefined(props.id) ? "" : props.id,
      Channel: this.isNullOrUndefined(props.channel) ? "" : props.channel,
      Class: this.isNullOrUndefined(props.className) ? "" : props.className,
      Count: this.isNullOrUndefined(props.count) ? "" : props.count,
      Min: this.isNullOrUndefined(props.min) ? "" : props.min,
      MinBuyAds: this.isNullOrUndefined(props.minBuyAds) ? "0" : props.minBuyAds,
      Country: this.isNullOrUndefined(props.country) ? "" : props.country,
      ApiAnonId: this.isNullOrUndefined(props.apiAnonId) ? "" : props.apiAnonId, //Required Only Is SSR, Otherwise cookies contains the id.
      DomId: this.MakeId(10), DoApiClick: this.isNullOrUndefined(props.doApiClick) ? true : props.doApiClick,
      ApiResult: {
        Code: 500, Message: "New", Result: []
      }
    };
    this.state.MaxBuyAds = this.isNullOrUndefined(props.maxBuyAds) ? this.state.MinBuyAds : props.maxBuyAds;
  }

  componentDidMount() {
    if(typeof window !== "undefined") { //In Case Of SSR
      this.load();
    }
  }

  handleClick(e,cre) {
    try {
      console.log("here",window.ga);
      if(typeof window !== "undefined" && typeof window.ga !== "undefined") {
        window.ga('send', 'event', 'Banner', 'Click', cre.Click.Name);
      }
    } catch(ex) {}
    if(this.state.DoApiClick) {
      this.apiClick(cre.Click.Guid)
    }
  }


  apiClick(id) {
    let headers = {
      "X-Alt-Referer": window.location.href,
      "Content-type": "application/json"
    };
    if(this.state.ApiAnonId) {
      headers["X-Alt-AnonymousId"] = this.state.ApiAnonId;
    } //Do Not Need Any Resp, Etc.. Log On Error Thats It
    fetch(`${AppUrl}/click`, {headers: headers, method: "POST", body: JSON.stringify({Guid: id})})
      .catch((ex) => {
        console.log("Error in click call swbanner",ex);
      });
  }
  load() {
    if(!this.isMoreThenZero(this.props.count)) { return; }
    let headers = {
      "X-Alt-Referer": window.location.href
    };
    if(this.state.ApiAnonId) {
      headers["X-Alt-AnonymousId"] = this.state.ApiAnonId;
    }
    let qry = "";
    if(this.isMoreThenZero(this.props.min)) {
      qry += `&min=${this.props.min}`;
    }
    if(!this.isNullOrEmpty(this.props.country)) {
      qry += `&countryCode=${this.props.country}`;
    }
    if(!this.isNullOrEmpty(this.props.channel)) {
      qry += `&channel=${this.props.channel}`;
    }
    fetch(`${AppUrl}/${this.props.id}?max=${this.props.count}&minAdvertiseHere=${this.props.minBuyAds}&maxAdvertiseHere=${this.props.maxBuyAds}${qry}`, {headers: headers})
      .then(resp => resp.json())
      .then((data) => {
        if(data.Code == 200) {
          this.setState({ApiResult: data});
        } else {
          this.setState({ApiResult: data});
        }
      })
      .catch((ex) => {
        this.setState({ApiResult: {Code: 501, Message: `Internal error: ${ex.toString()}`, Result: [] }});
        console.warn("Error in swbanner comp",ex);
      });
  }

  renderBanners() {

    let resp = null; //Render NOTHING
    try {
      let bans = this.state.ApiResult.Result;
      if(!this.isNullOrUndefined(bans) && bans.length>0) {
        resp = bans.map((v,i) =>{
          let type = "banner";
          if(v.Creative.Code == "ADVERTISEHERE") {
            type = "ad";
          }
          return (
            <React.Fragment key={`${this.state.DomId}-${v.Creative.Code}-${i}`}>
          {type=="banner" &&
          <div className={this.props.className}><a onClick={(e) => {this.handleClick(e,v)}} href={v.Creative.TargetUrl} target={"_blank"} title={v.Creative.Title} className={this.props.className} rel={v.Creative.NoFollow ? "nofollow" : ""}>
            <img src={v.Creative.Url} alt={v.Creative.Title} className={this.props.className}/>
          </a></div>
          }
          {type=="ad" &&
          <div className={this.props.className}>
            {this.props.children}
            </div>
          }
        </React.Fragment>
        );
        });
      }
    } catch(ex) {
    }
    return resp;
  }


  render() {

    if(!this.isMoreThenZero(this.props.count)) {
      console.warn("Count is not valid in swbanner");
      return null;
    }
    return this.renderBanners();
  }

  componentDidUpdate() {
    if(this.props.country !== this.state.Country) {
      this.load();
      this.setState({
        Country: this.props.country
      });
    }
  }


  //Utils Here
  isNullOrUndefined(val) {
    return val === null || typeof val === "undefined";
  }
  isNullOrEmpty(obj) {
    if(typeof obj === "undefined") { return true;}
    if(obj === null) { return true;}
    if(typeof obj === "string") { return obj === "" }
    return false;
  }
  isMoreThenZero(tInt) {
    if(this.isNullOrUndefined(tInt)) return false;
    if(typeof tInt === "string") {
      let cInt = parseInt(tInt,10);
      if(isNaN(cInt)) {
        return false;
      }
      return cInt > 0;
    } else {
      if(typeof tInt === "number") {
        return tInt > 0;
      }
    }
    return false;
  }
  MakeId(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}

export default SwBanner

