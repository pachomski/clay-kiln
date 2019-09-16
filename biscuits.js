import _ from 'lodash';
import Vue from 'vue';
import { basename, extname } from 'path';
import utilsAPI from './lib/utils/api';
import VueNProgress from 'vue-nprogress';
import store from './lib/core-data/biscuit-store';
import { getEventPath } from './lib/utils/events';
import { add as addInput } from './lib/forms/inputs';
import conditionalFocus from './directives/conditional-focus';
import biscuitsToolbar from './lib/toolbar/biscuits-toolbar.vue';
import VueClickOutside from 'vue-click-outside';
import 'keen-ui/src/bootstrap'; // import this once, for KeenUI components

// export api for plugins, validators, inputs, buttons, etc
window.kiln = window.kiln || {};

// .plugins, .inputs, .validators, and .panes objects should already exist
window.kiln.utils = utilsAPI;

/**
 * determine if forms, or modals are open
 * @param  {object}  store
 * @return {Boolean}
 */
function isStuffOpen(store) {
  return (
    _.get(store, 'state.ui.currentFocus') ||
    _.get(store, 'state.ui.currentModal') ||
    _.get(store, 'state.ui.currentAddComponentModal') ||
    _.get(store, 'state.ui.currentConfirm') ||
    _.get(store, 'state.ui.currentDrawer')
  );
}

const nprogress = new VueNProgress({
  parent: '.nprogress-container',
  template: '<div class="bar" role="bar"></div>',
  showSpinner: false,
  easing: 'linear',
  speed: 500,
  trickle: false,
  minimum: 0.001
});

// add progress bar
Vue.use(VueNProgress, {
  router: false,
  http: false
});

Vue.directive('conditional-focus', conditionalFocus());
Vue.directive('click-outside', VueClickOutside);

// Require all scss/css files needed
require.context('./styleguide', true, /^.*\.(scss|css)$/);

// Add inputs
const inputReq = require.context('./inputs', false, /\.vue$/);
inputReq.keys().forEach(function(key) {
  addInput(basename(key, extname(key)), inputReq(key));
});

document.addEventListener('DOMContentLoaded', () => {
  // init custom kiln plugins after utils is set (if they exist)
  if (_.has(window, 'modules["kiln_index.kilnplugin"]')) {
    const pluginInitializer = window.require('kiln_index.kilnplugin');

    pluginInitializer();
  }

  new Vue({
    debug: process.env.NODE_ENV !== 'production',
    strict: true,
    el: '#kiln-app',
    render: h => h('biscuits-toolbar'),
    store,
    nprogress,
    components: {
      'biscuits-toolbar': biscuitsToolbar
    }
  });

  // page load indicator. will be finished by the preloader
  store.dispatch('startProgress', 'offline');

  // initialize kiln plugins from app with store
  if (window.kiln.plugins && Array.isArray(window.kiln.plugins)) {
    window.kiln.plugins.forEach(plugin => plugin(store));
  }

  // add `kiln-edit-mode` class to body. this allows certain components
  // (e.g. embeds that rely on client-side js, which doesn't run in edit mode)
  // to add special edit-mode-only styling
  document.body.classList.add('kiln-edit-mode');

  // add `kiln-edit-mode` class to body. this allows certain components
  // (e.g. embeds that rely on client-side js, which doesn't run in edit mode)
  // to add special edit-mode-only styling
  // // document.body.classList.add('kiln-edit-mode');
  store
    .dispatch('preload')
    .then(() => require('./lib/decorators').decorateAll(store));

  // when clicks bubble up to the document, close the current form or pane / unselect components
  document.body.addEventListener('click', e => {
    const ePath = getEventPath(e);
    console.log(ePath);

    if (
      _.find(
        ePath,
        el =>
          el.classList &&
          (el.classList.contains('ui-calendar') ||
            el.classList.contains('kiln-overlay-form'))
      )
    ) {
      return;
    }

    if (
      _.get(store, 'state.ui.currentFocus') &&
      !hasClickedFocusableEl(e) &&
      !window.kiln.isInvalidDrag
    ) {
      // always unfocus if clicking out of the current focus (and not directly clicking into another focusable el)
      // note: isInvalidDrag is set when dragging to select text in a text/wysiwyg field,u
      // since if you drag outside the form it'll trigger a click. ♥ browsers ♥
      store.dispatch('unfocus').catch(_.noop);
    } else if (_.get(store, 'state.ui.currentAddComponentModal')) {
      store.dispatch('closeAddComponent');
    } else if (
      _.get(store, 'state.ui.currentSelection') &&
      !hasClickedSelectableEl(e) &&
      !window.kiln.isInvalidDrag
    ) {
      // unselect if clicking out of the current selection (if user isn't trying to select text)
      // note: stopSelection is set in the 'select' action. see the comments there for details
      store.dispatch('unselect');
    }

    // unset isInvalidDrag after checking for unfocus / unselect
    window.kiln.isInvalidDrag = false;
  });
});
