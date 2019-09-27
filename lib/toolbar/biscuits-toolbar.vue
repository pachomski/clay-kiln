<template>
	<div class="kiln-wrapper storybook-mode">
		<!-- <alert-container></alert-container> -->
		<div class="kiln-progress">
			<progress-bar></progress-bar>
		</div> 
		<ui-toolbar Title="Storybook" :raised="false" @nav-icon-click="openMenu"></ui-toolbar>
		<simple-modal></simple-modal>
		<nav-background></nav-background>
		<biscuits-nav-menu></biscuits-nav-menu>
	</div>
</template>

<script>
// import { mapState } from 'vuex';
import UiToolbar from 'keen/UiToolbar';
import UiIconButton from 'keen/UiIconButton';
import alertContainer from './alert-container.vue';
import progressBar from './progress.vue';
import simpleModal from './simple-modal.vue';
import navBackground from '../nav/nav-background.vue';
import biscuitsNavMenu from '../nav/biscuits-nav-menu.vue';

export default {
  data() {
    return {};
  },
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

<style lang="sass">
   	@import '../../styleguide/toolbar';
	@import '../../styleguide/layers';

	.kiln-wrapper {
    	@include toolbar-wrapper();
	}
</style>