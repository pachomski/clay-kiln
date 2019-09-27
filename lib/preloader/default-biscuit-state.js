export default {
  componentBiscuits: {},
  components: {},
  user: {},
  ui: {
    showNavBackground: false,
    currentForm: null, // currently opened form, gets { uri, path, data }
    currentAddComponentModal: null, // current "add component" modal, gets { currentURI, parentURI, path, available }
    currentModal: null, // current "simple" modal, gets { title, type, size, data }
    currentConfirm: null, // current "confirmation" modal, gets { title, text, button, onConfirm }
    currentDrawer: null, // current drawer menu
    currentSelection: null, // currently selected component, gets uri
    currentFocus: null, // currently focused field/group, gets { uri, path }
    currentProgress: 0, // progress bar, gets random number (to prevent flashes)
    metaKey: false, // set to true when meta key is pressed, enables additional functionality in kiln
    alerts: [] // array of alerts to display to the user
  },
  // read-only
  schemas: {},
  locals: {},
  models: {},
  componentKilnjs: {},
  templates: {},
  site: {},
  url: {},
  isLoading: true // preloading has started
};
