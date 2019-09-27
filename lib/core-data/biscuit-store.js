import Vue from 'vue';
import Vuex from 'vuex';
import AsyncComputed from 'vue-async-computed';
import defaultBiscuitState from '../preloader/default-biscuit-state';
import { biscuitMutations } from './mutations';
import { biscuitActions } from './actions';
import plugins from './plugins';


Vue.use(Vuex);
Vue.use(AsyncComputed);

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production', // only do strict mode when developing
  state: defaultBiscuitState,
  mutations: biscuitMutations,
  actions: biscuitActions,
  plugins: plugins
});

export default store;
