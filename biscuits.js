import Vue from 'vue';
import store from './lib/core-data/store';
import utilsAPI from './lib/utils/api';
import VueNProgress from 'vue-nprogress';
import conditionalFocus from './directives/conditional-focus';
import storybookToolbar from './lib/toolbar/biscuits-toolbar.vue';
import VueClickOutside from 'vue-click-outside';
import 'keen-ui/src/bootstrap'; // import this once, for KeenUI components

// export api for plugins, validators, inputs, buttons, etc
window.kiln = window.kiln || {};

// .plugins, .inputs, .validators, and .panes objects should already exist
window.kiln.utils = utilsAPI;

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

document.addEventListener('DOMContentLoaded', () => {
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
});
