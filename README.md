dogewand
========

You need to have node and postgres

    git clone https://github.com/jtremback/dogewand.git
    cd dogewand
    npm install

Fill in `config/config.js` using `config/config.example.js` as a guide. You're going to have to create Facebook and Reddit apps, and put their credentials in here. We should probably implement local auth at some point for testing purposes.

    gulp build
    gulp watch
    migrations/migrate 001
    node server.js

You'll need to browse to localhost:3700 (or whatever you put in config.js) and accept the self signed ssl cert.
It's easiest to work with the bookmarklet as a chrome extension. It will make your life easier if you use something like [extension reloader](https://chrome.google.com/webstore/detail/extensions-reloader/fimgfedafeadlieiabdeeaodndnlbhid?hl=en).

---

AGPL
