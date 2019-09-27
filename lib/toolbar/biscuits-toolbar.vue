<style lang="sass">
  @import '../../styleguide/toolbar';

  @include toolbar-base();
</style>

<template>
	<div class="kiln-wrapper storybook-mode">
		<ui-toolbar Title="Storybook" type="colored" text-color="white" :raised=true @nav-icon-click="openMenu"></ui-toolbar>
		<simple-modal></simple-modal>
		<nav-background></nav-background>
		<biscuits-nav-menu></biscuits-nav-menu>
		<div class="kiln-progress">
			<progress-bar></progress-bar>
		</div> 
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