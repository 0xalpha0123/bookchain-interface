
'use strict';

process.env.NODE_ENV = 'test';
process.env.PUBLIC_URL = '';

import jsdom from 'jsdom';

global.document = jsdom.jsdom('<html><body></body></html>');
global.window = document.defaultView;
global.navigator = window.navigator;
global.window.matchMedia = window.matchMedia || function() {
    return {
        matches : false,
        addListener : function() {},
        removeListener: function() {}
    };
};

function noop() {
  return {};
}

// prevent mocha tests from breaking when trying to require a css file
require.extensions['.css'] = noop;
require.extensions['.svg'] = noop;