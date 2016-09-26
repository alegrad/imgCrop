# Social Share

The Social Share module provides an interface for generating social network sharing URLs.
Social network share URLs will share content based on [the Open Graph protocol](http://ogp.me/).

You can compose social network share URLs in two ways:

1. [Imperatively with Javascript](#UsageJavascript)
2. [Declaratively with HTML](#UsageHTML)

**See the [Demo Page](http://mlom.github.io/SocialShare/dist/) for examples.**

##Dependencies

- [jQuery](https://jquery.com/)

##Install

###Bower

```sh
$ bower install --save SocialShare
```

Include the javscript file in your web page:

```html
<!DOCTYPE HTML>
<html>
  <body>
    //...
    <script src="bower_components/jquery/dist/jquery.min.js"></script>
    <script src="bower_components/SocialShare/socialshare.js"></script>
  </body>
</html>
```

###[NPM](https://www.npmjs.com/package/socialshare)

```.sh
$ npm install --save socialshare
```

Include the javscript file in your web page:

```html
<!DOCTYPE HTML>
<html>
  <body>
    //...
    <script src="node_modules/jquery/dist/jquery.min.js"></script>
    <script src="node_modules/SocialShare/socialshare.js"></script>
  </body>
</html>
```

##Supported Social Networks

- [Facebook](https://developers.facebook.com/docs/sharing)
- [Twitter](https://dev.twitter.com/web/tweet-button/web-intent)
- [Linkedin](https://developer.linkedin.com/docs/share-on-linkedin)
- [Google+](https://developers.google.com/+/web/share/#share-link)

##Usage

###<a name="UsageJavascript"></a> Javascript


```javascript
$("#sharebutton").on("click", function() {
    SocialShare.share("twitter", {
        url: "share-page.html",
        text: "Check out this website",
        hashtags: "SocialShareTool, Tooling",
        via: "twitterUserName"
      });
});
```


####API

**#share**


`SocialShare.share(socialNetworkName, [paramOptions])`


The `share` method is used to generate a social share url which contains a query string of passed parameter keys and values. The generated social share url will open in a pop-up window for the user to share the page and content to their social network timeline.


The `paramOptions` object is optional. By invoking the `share` method with only a `socialNetworkName` value, the social share url will generate with the respective social network's required parameters and default to the current page's url. 


#####Arguments:

| **socialNetworkName**   | **paramOptions** |                                      **Notes**                                      |
|-------------------------|------------------|-------------------------------------------------------------------------------------|
| `"facebook"`            | u                | URL to shared page; value is relative from the location.href of the page            |
| `"twitter"`             | text             | Tweet text                                                                          |
|                         | url              | URL to shared page; value is relative from the location.href of the page            |
|                         | hashtags         | Comma-separated list of hashtag values without the preceding # character            |
|                         | via              | A Twitter username to associate with the Tweet                                      |
|                         | related          | Suggest additional Twitter usernames related to the Tweet as comma-separated values |
| `"linkedin"`            | url              | URL to shared page; value is relative from the location.href of the page            |
|                         | mini             | An argument who's value must always be: true                                        |
|                         | title            | The title value that you wish you use                                               |
|                         | summary          | The description that you wish you use                                               |
|                         | source           | The source of the content (e.g. your website or application name)                   |
| `"googleplus"`          | url              | URL to shared page; value is relative from the location.href of the page            |
|                         | hl               | The language code for the locale to use on the Google+ sharing page                 |


- **For each social network, the url parameter will be auto-populated from the `location.href` of the page when not explicitly set.**
- **Any url parameter set will be concatenated to the `location.href` value of the page.**
- **All parameter values are URL encoded.**

- **See [Goolgle+ language codes](https://developers.google.com/+/web/share/#available-languages) for available values.**


###<a name="UsageHTML"></a> HTML Markup

```html
<a href="javacsript:void(0);" share-url="share-page.html" share-text="Check out this website" share-hashtags="SocialShareTool, Tooling" share-via="twitterUserName" class="share-twitter">
  <span>Share on Twitter<span>
</a>
```

#####Markup Requirements:

**Set the social network via class. Each social network name must include the  `share-` prefix:**

```html
<ANY class="share-facebook">...</ANY>
<ANY class="share-twitter">...</ANY>
<ANY class="share-linkedin">...</ANY>
```

**Set URL parameters via `share-` prefixed attributes:**

```html
<ANY share-text="title value" share-hashtags="hashtag1, hashtag2" class="share-twitter">...</ANY>
```

**The `data-*` attribute is also supported:**
```html
<ANY data-share-text="title value" data-share-hashtags="hashtag1, hashtag2" class="share-twitter">...</ANY>
```


------

#####Resources:
- [Facebook Sharing](https://developers.facebook.com/docs/sharing)
- [Twitter Sharing](https://dev.twitter.com/web/tweet-button/web-intent)
- [Linkedin Sharing](https://developer.linkedin.com/docs/share-on-linkedin)
- [Google+](https://developers.google.com/+/web/share/#share-link)
- [Twitter Parameters](https://dev.twitter.com/web/tweet-button/parameters)
- [LinkedIn Parameters](https://developer.linkedin.com/docs/share-on-linkedin) - Click on "Custom URL" tab
- [Scotch.io Article - Sharing on Facebook](https://scotch.io/tutorials/how-to-share-webpages-with-facebook)
- [Scotch.io Article - Sharing on Twitter](https://scotch.io/tutorials/how-to-share-webpages-with-twitter)
