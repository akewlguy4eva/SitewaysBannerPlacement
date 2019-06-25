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
<ins data-key="300x250" data-channel="topbanners" data-class="custom-class" data-count="2" data-minbuyads="1" />
```

## Attribute Tags
- `data-key` - the key to the ad-zone on the swinity service. Ie: `our-network-300x100` ***required**
- `data-count` - numeric value for the number of banners returned from the api ***required**
- `data-country` - an ISO country code for the current user or page **Default: Current Country**
- `data-channel` - custom string value that can be used for tracking/grouping
- `data-minbuyads` - the minimum amount of Buy Ad spots returned(explained below in _Buy Ad Spots_) **Default: 0**
- `data-minbuyads` - the maximum amount of Buy Ad spots returned(explained below in _Buy Ad Spots_) **Default: 0**
- `data-buyadtemplate` - a DOM id for the container that holds HTML for a buy ad spots(explained below in _Buy Ad Spots_) 

## Global Methods
- `Swinity.Banners.PlaceBanners(usecache=false)` - A method that causes the ins tags to be rewritten, used on pageless type websites.
  - `usercache` allows for caching list requests. Useful in frameworks that rerender the content alot without the options changing.
 

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





## License

### GNU General Public License v3.0
Permissions of this strong copyleft license are conditioned on making available complete source code of licensed works and modifications, which include larger works using a licensed work, under the same license. Copyright and license notices must be preserved. Contributors provide an express grant of patent rights. [View](LICENSE)
