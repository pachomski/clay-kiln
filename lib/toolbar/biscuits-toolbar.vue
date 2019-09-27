<style lang="sass">
  @import '../../styleguide/toolbar';

  @include toolbar-base();

  .tiny-biscuit {
	  width: 35px;
	  margin-right: 15px;
  }

  .ui-toolbar--type-colored {
	  background-color: #010101;
  }
</style>

<template>
	<div class="kiln-wrapper storybook-mode">
		<ui-toolbar :brand="appName"  :title="biscuitTitle"  type="colored" text-color="white"  @nav-icon-click="openMenu">
			<div slot="actions">
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
    biscuitTitle: state => {
	  const { name, componentName } = _.get(state, 'currentBiscuit', {});

      if (name) {
        return `${componentName}: [${name}]`;
      } else {
        return componentName;
	  }
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