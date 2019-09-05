<template>
	<div class="kiln-wrapper storybook-mode">
		<!-- <alert-container></alert-container> -->
		<div class="kiln-progress">
			<progress-bar></progress-bar>
		</div> 
		<ui-toolbar Title="Storybook" :raised="false">
			 <ui-icon-button
				color="black"
				icon="more_vert"
				size="large"
				type="secondary"
			></ui-icon-button>
		</ui-toolbar>
	</div>
</template>

<script>
import UiToolbar from 'keen/UiToolbar';
import UiMenu from 'keen/UiMenu';
import UiIconButton from 'keen/UiIconButton';
import alertContainer from './alert-container.vue';
import progressBar from './progress.vue';

export default {
  data() {
    return {};
  },
  components: {
    'ui-toolbar': UiToolbar,
    'alert-container': alertContainer,
    'progress-bar': progressBar,
    'ui-icon-button': UiIconButton
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