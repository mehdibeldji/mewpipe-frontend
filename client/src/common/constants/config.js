'use strict';

var CONFIG = {
  dev: {
    state: 'dev',
    api_url: 'http://localhost:1337/',
    socketIoUrl: 'http://localhost:1337',
    frontUrl: 'http://localhost:3000/#/',
    url_video: 'http://localhost:1337/uploads/videos/convert/',
    url_thumbnail: 'http://localhost:1337/uploads/thumbnails/',
    clipboardPath: 'src/vendor/zeroclipboard/dist/ZeroClipboard.swf',
    defaultImgPath: '/assets/images/user-icon.jpg'
  },
  prod: {
    state: 'prod',
    api_url: 'http://api.mewpipe.com/',
    socketIoUrl: 'http://api.mewpipe.com',
    frontUrl: 'http://mewpipe.com/#/',
    url_video: 'http://api.mewpipe.com/uploads/videos/convert/',
    url_thumbnail: 'http://api.mewpipe.com/uploads/thumbnails/',
    clipboardPath: 'needed/ZeroClipboard.swf',
    defaultImgPath: '/assets/images/user-icon.jpg'
  }
};

CONFIG = CONFIG.prod;
