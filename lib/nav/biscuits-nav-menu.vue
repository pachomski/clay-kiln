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

</style>

<template>
  <transition name="nav-menu" v-if="displayNavMenu">
    <nav class="nav-menu">
      <!-- nav menu buttons on small viewport (< 600px) -->
      <ui-icon-button class="nav-menu-button-small" buttonType="button" type="secondary" color="white" icon="arrow_back" @click="closeNav"></ui-icon-button>
    </nav>
  </transition>
</template>

<script>
  import _ from 'lodash';
  import { mapState } from 'vuex';
  import navMenuButton from './nav-menu-button.vue';
  import UiIconButton from 'keen/UiIconButton';
  import UiMenu from 'keen/UiMenu';
  import UiButton from 'keen/UiButton';

  export default {
    computed: mapState({
      displayNavMenu: state => _.get(state, 'ui.showNavBackground', false),
      menuOptions() {
        return [{
          id: 'my-pages',
          label: 'My Pages',
          disabled: this.currentDrawer === 'my-pages',
          action: this.openNav,
          desktopNav: true,
          mobileNav: true
        },
        {
          id: 'all-pages',
          label: 'All Pages',
          disabled: this.currentDrawer === 'all-pages',
          action: this.openNav,
          desktopNav: true,
          mobileNav: true
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
      UiIconButton,
      UiMenu,
      UiButton
    })
  };
</script>
