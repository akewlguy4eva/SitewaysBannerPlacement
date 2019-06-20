# Swinity Ad Server Scripts
Public scripts that work with the swinity.com Ad server and services. Client side pure javascript, style sheets for
 "Buy Advertisement Banner Spots" and some [React](https://reactjs.org) components are included.
 
## Features
- Pure client side javascript that works on all browsers/mobile devices
- Simple &lt;ins&gt; interface makes possible for small section blocks with option to serve mutiple banners 
- Abilitie to reload banners as any time for pageless frameworks like [React](https://reactjs.org), [Angular](https://angular.io) etc

## Client Side Javascript
A simple pure JS script that globally reads banner tags and allows for live updates, repeating banners, Buy Ad inclusion and much more.

To use the script simply get from our CDN and put inside your &lt;HEAD&gt;(Suggested) or on the bottom of your page.

```HTML
<script src="https://cdn.swinity.com/static/swbanners.js" type="text/javascript"/>
```

Once placed you now can put anywhere in your DOM an ins tag to cause the script to write spots on that exact place(Ie: children of a DIV parent) automatically. 
The tag is the only code required to draw spots.

```HTML
<ins data-key="300x250" data-channel="topbanners" data-class="custom-class" data-count="2" data-minbuyads="1" />
```

## Attribute Tags
- `data-key` - the key to the ad-zone on the swinity service. Ie: `our-network-300x100` ***required**
- `data-count` - numeric value for the number of banners returned from the api ***required**
- `data-channel` - custom string value that can be used for tracking/grouping
- `data-minbuyads` - the minimum amount of Buy Ad spots returned(explained below in _Buy Ad Spots_) **Default: 0**
- `data-minbuyads` - the maximum amount of Buy Ad spots returned(explained below in _Buy Ad Spots_) **Default: 0**
- `data-buyadtemplate` - a DOM id for the container that holds HTML for a buy ad spots(explained below in _Buy Ad Spots_) 

## Global Methods
- `Swinity.Banners.PlaceBanners()` - A method that causes the ins tags to be rewritten, used on pageless type websites. 





