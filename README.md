# Swinity Ad Server Scripts
Public scripts that work with the swinity.com Ad server and services. Client side pure javascript, style sheets for
 "Buy Advertisement Banner Spots" and some [React](https://reactjs.org) components are included.
 
## Features
- Pure client side javascript that works on all browsers/mobile devices
- Simple &lt;ins&gt; interface makes possible for small section blocks with option to serve mutiple banners 
- Abilitie to reload banners as any time for pageless frameworks like [React](https://reactjs.org), [Angular](https://angular.io) etc

## Client Side Javascript
A simple pure JS script that globally reads banner tags and allows for live updates, repeating banners, Buy Ad inclusion and much more.

To use the script simply get from our CDN and put inside your `<head>` _(suggested)_ or on the bottom of your page.

```html
<script src="https://cdn.swinity.com/scripts/swbanners.js" type="text/javascript"/>
```

Once placed you now can put anywhere in your DOM an ins tag to cause the script to write spots on that exact place(Ie: children of a DIV parent) automatically. 
The tag is the only code required to draw spots.

```html
<ins data-key="300x250" data-channel="topbanners" data-class="custom-class" data-count="2" data-minbuyads="1" data-maxbuyads="1" />
```

## Attribute Tags
- `data-key` - the key to the ad-zone on the swinity service. Ie: `our-network-300x100` ***required**
- `data-count` - numeric value for the number of banners returned from the api ***required**
- `data-country` - an ISO country code for the current user or page **Default: Current Country**
- `data-channel` - custom string value that can be used for tracking/grouping
- `data-minbuyads` - the minimum amount of Buy Ad spots returned(explained below in _Buy Ad Spots_) **Default: 0**
- `data-maxbuyads` - the maximum amount of Buy Ad spots returned(explained below in _Buy Ad Spots_) **Default: 0**
- `data-class` - a css class to be applied to the elements of each banner section.
- `data-buyadtemplate` - a DOM id for the container that holds HTML for a buy ad spots(explained below in _Buy Ad Spots_) 

## Global Methods
- `Swinity.Banners.PlaceBanners(usecache=false)` - A method that causes the ins tags to be rewritten, used on pageless type websites.
  - `usercache` allows for caching list requests. Useful in frameworks that rerender the content alot without the options changing.

## CSS styling
You can style the actual dom elements by simply defining `data-class` in your `<ins>` tags.
### Example

Tag:
```html
<ins ... data-class="banners-350x250" data-count="2" />
```

CSS:
```css
 div.banners-350x250 { display: flex; justify-content: center }
 .banners-350x250 a { border: 0 }
 .banners-350x250 img { max-width: 100%, margin: 5px 5px; }
```
Now each banner spots element will appy this style, the wrapper div, and then the href and img.


## Buy Advertisement Ads
You can also specify a custom `<div> or element` for drawing a buy advertisement banner. You can customize the HTML as you
 like and then simply set in the `<ins>` tag the attribute `data-buyadtemplate`
 
### Example

```html
<ins data-key="300x250" data-channel="topbanners" data-class="custom-class" data-count="2" data-minbuyads="1" data-buyadtemplate="my-custom-200x200" />
<div style="display: none">
    <div id="my-custom-200x200">
        <a href="URLTOBUYADPAGE"><img src="URLTOMYCUSTOMIMAGE" alt="BUY Now"</a>
    </div>
</div>  
```

## Predone Buy Ad Banners
We have included some predone CSS based ad banners for you as well. You may use them instead of setting up your own buy ad images or markup. To use the predone css ad banners simplt add the below to your head tag as well.

```html
<link href="https://cdn.swinity.com/scripts/buyads-yellow.css" rel="stylesheet">
```

And then add the sizes you will use with the predone CSS classes.

### Example

```html
<ins data-key="300x250" data-channel="topbanners" data-class="custom-class" data-count="2" data-minbuyads="1" data-buyadtemplate="my-custom-200x200" />
<div style="display: none">
    <div id="my-custom-200x333">
        <a href="/advertise">
            <div class="adbuy-banner Size-200x333">
                <div class="buy-text Size-200x333">Get 50x More Visitors!</div>
                <div class="buy-button Size-200x333">Advertise here!</div>
                <div class="buy-sub-text Size-200x333">Buy your ad banner right now</div>
            </div>
        </a>
    </div>
</div>  
```


## React Components
For ease with the [React](https://reactjs.org) framework we have created 2 components that will render using react framework. While the props have simpler names
the end result is identical to the client version of the script.

### Example
```javascript
import React from 'react';
import SwBanner from 'SwBanner.js';
import BuyAdBanner from 'BuyAdBanner.js';

class App extends React.Component {
  render() {
      <SwBanner id={"728x90"} channel="my-custom-channel" count={"1"} minBuyAds={"0"} maxBuyAds={"0"} className={"my-custom-class"}>
        <BuyAdBanner size={"728x90"}/>
      </SwBanner>
  }
}

export default App;

```

As you can see the react component renders the children for the BuyAdBanners which in this case is also a react component.
Properties for the react banner spot component are as follows.
- `id` - the key to the ad-zone on the swinity service. Ie: `our-network-300x100` ***required**
- `count` - numeric value for the number of banners returned from the api ***required**
- `country` - an ISO country code for the current user or page **Default: Current Country**
- `channel` - custom string value that can be used for tracking/grouping
- `minBuyAds` - the minimum amount of Buy Ad spots returned(explained below in _Buy Ad Spots_) **Default: 0**
- `maxBuyAds` - the maximum amount of Buy Ad spots returned(explained below in _Buy Ad Spots_) **Default: 0**
- `doApiClick` - call the swinity api with the click id when a banner ad is clicked **Default: true**


## Google Analytics Integration
The script and react component have built in Google GA integration. The script will post a google event if the GA is loaded on your page.

## License

### GNU General Public License v3.0
Permissions of this strong copyleft license are conditioned on making available complete source code of licensed works and modifications, which include larger works using a licensed work, under the same license. Copyright and license notices must be preserved. Contributors provide an express grant of patent rights. [View](LICENSE)
