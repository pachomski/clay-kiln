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
    flex-direction: row;
    height: 48px;
    left: 0;
    position: fixed;
    top: 0;
    width: 100%;

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
      align-items: flex-start;
      flex-direction: column;
      height: 100%;
      width: $nav-menu-width;

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
    background-color: #c3c3c3;
  }

  .ui-collapsible__body {
    border: unset;
    padding: 0;
  }

  ui-collapsible__body-wrapper {
    height: unset ;
  }

  ui-menu {
    padding: 0;
  }

</style>

<template>
  <transition name="nav-menu" v-if="displayNavMenu">
    <nav class="nav-menu">
      <!-- nav menu buttons on small viewport (< 600px) -->
      <ui-icon-button class="nav-menu-button-small" buttonType="button" type="secondary" color="white" icon="arrow_back" @click="closeNav"></ui-icon-button>
      <ui-collapsible v-for="c in components" :title="c.label"  v-bind:key="c.id">
         <ui-menu :options="c.biscuits"></ui-menu>
      </ui-collapsible>
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
      displayNavMenu: state => _.get(state, 'ui.showNavBackground', false),
      componentHasBiscuits(component) {
        return component.biscuits && component.biscuits.length > 0;
      },
      components() {
        return [{
          id: 'my-pages',
          label: 'My Pages',
          disabled: this.currentDrawer === 'my-pages',
          action: this.openNav,
          desktopNav: true,
          mobileNav: true,
          biscuits: [
            {
              id: 1,
              label: '1',
              href: '#1'
            },
            {
              id: 2,
              label: '2',
              href: '#2'
            },
            {
              id: 3,
              label: '3',
              href: '#3'
            },
            {
              id: 4,
              label: '4',
              href: '#4'
            },
            {
              id: 5,
              label: '5',
              href: '#5'
            }
          ]
        },
        {
          id: 'all-pages',
          label: 'All Pages',
          disabled: this.currentDrawer === 'all-pages',
          action: this.openNav,
          desktopNav: true,
          mobileNav: true,
          biscuits: [
            {
              id: 1,
              label: '1',
              href: '#1'
            },
            {
              id: 2,
              label: '2',
              href: '#2'
            },
            {
              id: 3,
              label: '3',
              href: '#3'
            },
            {
              id: 4,
              label: '4',
              href: '#4'
            },
            {
              id: 5,
              label: '5',
              href: '#5'
            }
          ]
        },
        {
          id: 'new-page',
          label: 'New Page',
          action: this.openNav,
          desktopNav: true,
          icon: 'add'
        },
        {
          id: 'users',
          label: 'Users',
          action: this.openNav,
          settings: true,
          adminOnly: true
        },
        {
          id: 'signout',
          label: 'Sign Out',
          action: this.signout,
          settings: true
        }
        ];
      }
    }),
    methods: {
      closeNav() {
        this.$store.dispatch('hideNavBackground');
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
