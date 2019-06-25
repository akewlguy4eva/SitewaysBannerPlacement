import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import * as wActs from '../actions/website-actions';
import {connect} from "react-redux";


class BuyAdBanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: wActs.isNullOrUndefined(props.size) ? "" : props.size,
      textTop: wActs.isNullOrUndefined(props.textTop) ? "Get 50x More\nVisitors!" : props.textTop,
      textButton: wActs.isNullOrUndefined(props.textButton) ? "Advertise Here Now" : props.textButton,
      textBottom: wActs.isNullOrUndefined(props.textBottom) ? "Buy A Banner Placement Today" : props.textBottom,
      targetPath: wActs.isNullOrUndefined(props.targetPath) ? "/advertise" : this.targetPath,
      hideTop: wActs.isNullOrUndefined(props.hideTop) ? false : props.hideTop,
      hideButton: wActs.isNullOrUndefined(props.hideButton) ? false : props.hideButton,
      hideBottom: wActs.isNullOrUndefined(props.hideBottom) ? false : props.hideBottom,
    }
  }

  handleClick(e) {

  }
  render() {
    return (
      <Link to={this.state.targetPath} className={"flex-center"}>
        <div onClick={(e) => {this.handleClick(e)}} className={`adbuy-banner ${!wActs.isNullOrEmpty(this.state.size) ? "Size-" + this.state.size : ""}`}>
          {!this.state.hideTop && <div className={`buy-text ${!wActs.isNullOrEmpty(this.state.size) ? "Size-" + this.state.size : ""}`}>{this.state.textTop}</div> }
          {!this.state.hideButton && <div className={`buy-button ${!wActs.isNullOrEmpty(this.state.size) ? "Size-" + this.state.size : ""}`}>{this.state.textButton}</div> }
          {!this.state.hideBottom && <div className={`buy-sub-text ${!wActs.isNullOrEmpty(this.state.size) ? "Size-" + this.state.size : ""}`}>{this.state.textBottom}</div> }
        </div>
      </Link>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    WebPage: state.Website,
  };
}

export default connect(mapStateToProps)(BuyAdBanner);
