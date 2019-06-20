# Swinity Ad Server Scripts
Public scripts that work with the swinity.com Ad server and services. Client side pure javascript, style sheets for
 "Buy Advertisement Banner Spots" and [React](https://reactjs.org) component is included.
 
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

Once placed you now can put anywhere in your DOM an ins tag to cause the script to write spots on that exact place(Ie: children of a DIV parent).

```HTML
<ins data-key="300x250" data-channel="topbanners" data-class="custom-class" count="2" data-minbuyads="1" />

```



