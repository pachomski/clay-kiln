<style lang="sass">
  @import '../../styleguide/animations';
  @import '../../styleguide/colors';
  @import '../../styleguide/layers';
  @import '../../styleguide/clay-menu-columns';

  .nav-menu {
    @include nav-layer();
    

    align-items: center;
    background-color: $pure-black;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 48px;
    left: 0;
    position: fixed;
    top: 0;
    width: 100%;

    .nav-menu-top {
      width: 100%;
    }

    .nav-menu-button,
    .nav-menu-divider {
      display: none;
    }

    .nav-menu-button-small {
      display: block;
      flex: 0 0 auto;
    }

    .nav-menu-divider-small {
      display: block;
    }

    .nav-menu-button-small-white {
      color: $pure-white;

      &:hover:not(.is-disabled),
      &.has-dropdown-open,
      &.has-focus-ring:focus,
      body[modality="keyboard"] &:focus {
        background-color: $md-blue-grey-900;
      }

      .ui-button__icon,
      .ui-button__dropdown-icon {
        color: $pure-white;
      }

      .ui-ripple-ink__ink {
        opacity: 0.4;
      }
    }

    .nav-button-small-text {
      font-weight: bold;
    }

    @media screen and (min-width: 600px) {
      height: 100%;
      width: $biscuit-nav-menu-width;

      .nav-menu-button,
      .nav-menu-divider {
        display: flex;
      }

      .nav-menu-button-small,
      .nav-menu-divider-small {
        display: none;
      }
    }
  }

  .nav-menu-divider,
  .nav-menu-divider-small {
    flex: 1 0 auto;
  }

  .nav-menu-enter-to,
  .nav-menu-leave {
    transform: translateX(0);
  }

  .nav-menu-enter,
  .nav-menu-leave-to {
    transform: translateX(-$nav-menu-width - 10px);
  }

  .nav-menu-enter-active {
    transition: transform $enter-viewport-time $deceleration-curve;
  }

  .nav-menu-leave-active {
    transition: transform $leave-viewport-time $sharp-curve;
  }

  .mobile-nav-dropdown{
    .ui-menu-option__text {
      text-transform: capitalize;
    }
  }

  .ui-collapsible {
    margin: 0;
  }

  
  .ui-collapsible__header {
    width: 100%;
    box-sizing: border-box;
    min-height: unset;
    line-height: unset;
    background-color: #ddd;
    text-transform: capitalize;
    font-weight: bold;
  }

  .ui-collapsible__body {
    border: unset;
    padding: 0;
  }

  .ui-collapsible__body-wrapper {
    height: unset ;
  }

  .ui-menu {
    padding: 0;
    max-width: unset;
    min-width: unset;
  }

  .cnn-badge-icon {
    width: 100px;
    margin-bottom: 35px;
  }
</style>

<template>
  <transition name="nav-menu" v-if="displayNavMenu">
    <nav class="nav-menu">
      <div class="nav-menu-top">
        <nav-menu-button id="close" icon="arrow_back" size="large" @nav-click="closeNav">Biscuit</nav-menu-button>
        <!-- nav menu buttons on small viewport (< 600px) -->
        <ui-icon-button class="nav-menu-button-small" buttonType="button" type="secondary" color="white" icon="arrow_back" @click="closeNav"></ui-icon-button>
        <ui-collapsible  v-for="component in components" :title="component.name"  v-bind:key="component.name" :open="currentComponentName == component.name">
          <ui-menu  :options="component.biscuits" @select="linkToBiscuit"></ui-menu>
        </ui-collapsible>
      </div>
     <svg class="cnn-badge-icon" viewBox="0 0 240 240" fill="#CC0000" xmlns="https://www.w3.org/2000/svg" aria-hidden="true"><rect x="0" y="0" width="100%" height="100%" fill="#fff"></rect><path d="M.31-.07v240h240V-.07ZM86.54,135.29V92.51c0-16.1,20.81-23.83,31.82-5.12.8,1.35,18.14,31.22,18.14,31.22V92.51c0-16.1,20.8-23.83,31.81-5.12.8,1.35,18.14,31.22,18.14,31.22V76.79h10.38V147a2.11,2.11,0,0,1-1.51,2.14c-1.1.3-2.26-.38-3.11-1.82-.17-.28-9-15.46-17.48-30.13L159.17,90.4c-2.18-3.7-5.43-4.35-7.74-3.72a6.23,6.23,0,0,0-4.55,6.13V147a2.12,2.12,0,0,1-1.51,2.14c-1.11.3-2.27-.38-3.11-1.82-.15-.25-8.34-14.36-16.25-28-10.08-17.38-16.7-28.78-16.8-28.95-2.18-3.71-5.44-4.35-7.77-3.72a6.24,6.24,0,0,0-4.56,6.13v53.05a2.9,2.9,0,0,1-2.72,2.71H67.23a28.64,28.64,0,0,1,0-57.28h14v10.36H67.35a18.28,18.28,0,1,0,0,36.56H83.68A2.84,2.84,0,0,0,86.54,135.29Zm124.77,12.05c0,16.1-20.81,23.83-31.82,5.13-.79-1.35-18.14-31.23-18.14-31.23v26.1c0,16.1-20.8,23.83-31.81,5.13-.8-1.35-18.14-31.23-18.14-31.23v24.61c0,11.17-6.63,17.22-17,17.22H67.25a43.14,43.14,0,0,1,0-86.28h14V87.15h-14a32.78,32.78,0,1,0,0,65.56H94.16a7,7,0,0,0,6.86-6.85V92.81a2.1,2.1,0,0,1,1.51-2.13c1.1-.3,2.26.38,3.11,1.82l16.79,28.93c9.76,16.83,16.17,27.88,16.25,28,2.19,3.7,5.45,4.35,7.78,3.71A6.22,6.22,0,0,0,151,147V92.82a2.11,2.11,0,0,1,1.49-2.14c1.09-.3,2.24.38,3.08,1.82l15.56,26.81,17.49,30.15c1.71,2.9,4.09,3.93,6.16,3.93a6,6,0,0,0,1.61-.22A6.23,6.23,0,0,0,201,147V76.79h10.34Z" transform="translate(-0.31 0.07)"></path></svg>
    </nav>
  </transition>
</template>

<script>
  import _ from 'lodash';
  import { mapState } from 'vuex';
  import navMenuButton from './nav-menu-button.vue';
  import UiIconButton from 'keen/UiIconButton';
  import UiCollapsible from 'keen/UiCollapsible';
  import UiMenu from 'keen/UiMenu';
  import UiButton from 'keen/UiButton';

  export default {
    computed: mapState({
      currentComponentName: state => {
        return _.get(state, 'currentBiscuit.componentName', '');
      },
      displayNavMenu: state => _.get(state, 'ui.showNavBackground', false),
      components: state => {
        const formattedComponents = [],
          componentBiscuits = _.get(state, 'componentBiscuits', {});

        Object.keys(componentBiscuits).sort().map(componentName => {
          const biscuits = _.get(componentBiscuits, `${componentName}._biscuits`);
  
          formattedComponents.push({
            name: componentName,
            biscuits: Object.keys(biscuits).map(biscuitName => ({
              id: biscuitName,
              label: biscuitName,
              href: `/_components/${componentName}.biscuit?b=${biscuitName}`
            }))
          });
        });
        return formattedComponents;
      }
    }),
    methods: {
      closeNav() {
        this.$store.dispatch('hideNavBackground');
      },
      linkToBiscuit({ href }) {
        window.location.href = href;
      }
    },
    components: _.merge({
      'nav-menu-button': navMenuButton,
      UiCollapsible,
      UiIconButton,
      UiMenu,
      UiButton
    })
  };
</script>
