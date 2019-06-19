import React, { Component } from 'react';


//A Basic Comp To Do Siteways Style Banners
//*****************************************
// Created: 6/13/2019, Ver: 1.0
//*****************************************

const AppUrl = 'https://app.swinity.com/api/creatives';

class SwBanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Id: this.isNullOrUndefined(props.id) ? "" : props.id,
      Channel: this.isNullOrUndefined(props.channel) ? "" : props.channel,
      Class: this.isNullOrUndefined(props.className) ? "" : props.className,
      Count: this.isNullOrUndefined(props.count) ? "" : props.count,
      MinBuyAds: this.isNullOrUndefined(props.minBuyAds) ? "" : props.minBuyAds,
      MaxBuyAds: this.isNullOrUndefined(props.maxBuyAds) ? "" : props.maxBuyAds,
      Country: this.isNullOrUndefined(props.Country) ? "" : props.Country,
      ApiReferer: this.isNullOrUndefined(props.apireferer) ? "" : props.apireferer,
      DomId: this.MakeId(10),
      ApiResult: {
        Code: 500, Message: "New", Result: []
      }
    };
  }

  componentDidMount() {
    if(typeof window !== "undefined") {
      this.load();
    }
  }


  load() {
    let headers = {"X-Alt-Referer": window.location.href};
    let sBans = fetch(`${AppUrl}/${this.state.Id}?channel=${this.state.Channel}&max=${this.state.Count}&minAdvertiseHere=${this.state.MinBuyAds}&maxAdvertiseHere=${this.state.MaxBuyAds}`, {headers: { headers },})
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
              type = "ad"
            }
            return (
              <React.Fragment key={`${this.state.DomId}-${v.Creative.Code}-${i}`}>
                {type=="banner" &&
                  <div className={this.state.Class}><a href={v.Creative.TargetUrl} target={"_blank"} title={v.Creative.Title} className={this.state.Class} rel={v.Creative.NoFollow ? "nofollow" : ""}>
                    <img src={v.Creative.Url} alt={v.Creative.Title} className={this.state.Class}/>
                  </a></div>
                }
                {type=="ad" &&
                  <div className={this.state.Class}>
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
    return this.renderBanners();
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

