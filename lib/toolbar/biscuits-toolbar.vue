<style lang="sass">
  @import '../../styleguide/toolbar';

  @include toolbar-base();

  .tiny-biscuit {
	  width: 40px;
	  margin-right: 15px;
  }

  .toolbar-right {
	display: flex;
	align-items: center;

	.app-name {
		font-size: 22px;
		margin: 0 5px;
	}
  } 

  .ui-toolbar--type-colored {
	  background-color: #010101;
  }

  .ui-toolbar__brand-text {
	  text-transform: capitalize;
  }
</style>

<template>
	<div class="kiln-wrapper storybook-mode">
		<ui-toolbar :brand="currentBiscuitComponent"  :title="currentBiscuit"  type="colored" text-color="white"  @nav-icon-click="openMenu">
			<div slot="actions" class="toolbar-right">
				<h1 class="app-name">{{appName}}</h1>
				<img class="tiny-biscuit" src="https://i.dlpng.com/static/png/4165299_thumb.png" />
			</div>
		</ui-toolbar>
		<simple-modal></simple-modal>
		<nav-background></nav-background>
		<biscuits-nav-menu></biscuits-nav-menu>
		<div class="kiln-progress">
			<progress-bar></progress-bar>
		</div> 
	</div>
</template>

<script>
import _ from 'lodash';
import { mapState } from 'vuex';
import UiToolbar from 'keen/UiToolbar';
import UiIconButton from 'keen/UiIconButton';
import alertContainer from './alert-container.vue';
import progressBar from './progress.vue';
import simpleModal from './simple-modal.vue';
import navBackground from '../nav/nav-background.vue';
import biscuitsNavMenu from '../nav/biscuits-nav-menu.vue';

export default {
  data() {
    return {
      appName: 'Biscuits'
    };
  },
  computed: mapState({
    currentBiscuitComponent: state => {
      return _.get(state, 'currentBiscuit.componentName', '');
    },
    currentBiscuit: state => {
      return _.get(state, 'currentBiscuit.name', '');
    }
  }),
  methods: {
    openMenu() {
      return this.$store.dispatch('showNavBackground', true);
    }
  },
  components: {
    'alert-container': alertContainer,
    'biscuits-nav-menu': biscuitsNavMenu,
    'nav-background': navBackground,
    'progress-bar': progressBar,
    'simple-modal': simpleModal,
    'ui-icon-button': UiIconButton,
    'ui-toolbar': UiToolbar
  }
};
</script>