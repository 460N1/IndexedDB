# IndexedDB
Enhancing browsing experience by making use of IndexedDB. First of, it's by caching. More to add later.

# Caching
By making use of client side IndexedDB, a lot of page content can be cached.
IndexedDB does not have a certain size limit set, unlike localStorage, sessionStorage and cookies.
The storage limit depends on the user's disk space, and is usually in the GBs.
It's still a rather untapped offloading location.

Using IndexedDB, in combination with Base64, the script named '460n1.caching.js', enables you to permanently cache site content on user's devices.

What can be cached?
- Images
- Stylesheets
- Scripts
- Videos
- (possibly more to come, but what else is realistically left that could/should be cached?)

How to use the script?
From your side, all you have to do is replace the src attribute with data-src, as in:
```<img data-src="image-01-01-01.png"/> OR <img data-src="https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg"/>```
<video data-src="intro.mp4" controls autoplay muted></video>
<script data-src="bootstrap.min.js"></script>
<script data-src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<link rel="stylesheet" type="text/css" data-src="bootstrap.min.css"/> OR <link rel="stylesheet" type="text/css" data-src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.3/css/bootstrap.min.css"/>
  
Script must be placed at the bottom of the page, else it might miss scripts or content.
<script src="460n1.caching.js"></script>
Just a heads up - the script removes itself at the end of execution.

Issues
- No support yet for seperate source tags inside video tag. I'll figure it out eventually.
- No checking if the scripts have been updated. Say you're using a style.css or site.js and you change it, it won't change on the client side as this is meant to be a permanent cache. Considering whether I should even add a check for that. The whole point of this is to not need to get the data again from anywhere, for any reason.
- You tell me if you find anything...

Tests
On the first time your clients open the site, the speed of the site will obviously depend on the client's hardware specs as well as their internet speed. On any consecutive run, however, the site will load as fast as their browser can handle the data.
On my end, testing locally, with content on the site amounting to 20.2MB:

1st run: 
- 4.2 kB transferred
- 22.3 MB resources
- Finish: 623 ms

2nd run:
- 731 B transferred
- 1.1 MB resources
- Finish: 279 ms

3rd run and all consecutive runs are pretty much identical to the 2nd, so they will be omitted.
    
I intend to continue this, possibly adding compression down the road, and enhancing performance.
