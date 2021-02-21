# IndexedDB Caching
Enhancing browsing experience by making use of IndexedDB.

By making use of client side IndexedDB, a lot of page content can be cached. IndexedDB is especially useful for this as it does not have a certain size limit set, unlike localStorage, sessionStorage and cookies. The storage limit depends on the user's disk space, and is usually in the GBs. And despite that, it's still a rather untapped offloading location.

This script itself does not require any other script, i.e. it does not depend on anything like jQuery as it's pure Javascript implementation.

It's also mobile- and browser-friendly - it works for all modern browsers, on desktop and mobile.

What can be cached using this script?
- Images
- Stylesheets
- Scripts
- Videos
- (possibly more to come, but what else is realistically left that could/should be cached?)

How to use it?
  
Script must be placed at the bottom of the page, else it might miss scripts or content:

```<script src="460n1.caching.js"></script>```


As for the content you wish to cache, all you have to do is replace the src attribute with data-src, as in:

- ```<img data-src="image-01-01-01.png"/>```

- ```<img data-src="https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg"/>```

- ```<video data-src="intro.mp4" controls autoplay muted></video>```

- ```<script data-src="bootstrap.min.js"></script>```

- ```<script data-src="https://code.jquery.com/jquery-3.5.1.min.js"></script>```

- ```<link rel="stylesheet" type="text/css" data-src="bootstrap.min.css"/>```

- ```<link rel="stylesheet" type="text/css" data-src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.3/css/bootstrap.min.css"/>```


Issues
- No support yet for seperate source tags inside video tag. I'll figure it out eventually.
- No checking if the scripts have been updated. Say you're using a style.css or site.js and you change it, it won't change on the client side as this is meant to be a permanent cache. Considering whether I should even add a check for that. The whole point of this is to not need to get the data again from anywhere, for any reason.
- You tell me if you find anything...

Tests
On the first time your clients open the site, the speed of the site will obviously depend on the client's hardware specs as well as their internet speed. On any consecutive run, however, the site will load as fast as their browser can handle the data.

On my end, testing locally, with content on the site upwards of 20MB:

1st run:
- 4.2 kB transferred
- 22.3 MB resources
- Finish: 623 ms

2nd run:
- 731 B transferred
- 1.1 MB resources
- Finish: 279 ms

3rd run and all consecutive runs are pretty much identical to the 2nd, so they will be omitted for brevity.

It is also fully mobile browser friendly.

I intend to continue this, especially regarding enhancments on performance and possibly adding compression.
