// all components get decorated with component bars (which are hidden by default)
// components that are "selected" get their bar (and their parents' bars) shown

var references = require('./references'),
  dom = require('./dom'),
  focus = require('../decorators/focus'),
  forms = require('./forms'),
  groups = require('./groups'),
  currentSelected;

/**
 * Get the closest component element from the DOM. Checks self and then parents.
 * @param {Element} el    Any element within a component.
 * @returns {Element}
 */
function getComponentEl(el) {
  var attr = references.referenceAttribute,
    attrSelector = '[' + attr + ']',
    componentEl = el.hasAttribute(attr) ? el : dom.closest(el, attrSelector);

  return componentEl;
}

/**
 * Get the closest parent component of the component from the DOM.
 * @param {Element} componentEl  A component element
 * @returns {Element}
 */
function getParentEl(componentEl) {
  var parent = componentEl.parentNode && getComponentEl(componentEl.parentNode);

  return parent;
}

/**
 * set selection on a component
 * @param {Element} el editable element or component el
 * @param {{ref: string, path: string, data: object}} options
 * @param {MouseEvent} e
 */
function select(el) {
  var component = getComponentEl(el),
    parent = getParentEl(component);

  // selected component gets .selected, parent gets .selected-parent
  component.classList.add('selected');
  if (parent) {
    parent.classList.add('selected-parent');
  }
  currentSelected = component;
}

function removeClasses(el, parent) {
  if (el) {
    el.classList.remove('selected');
  }
  if (parent) {
    parent.classList.remove('selected-parent');
  }
}

/**
 * remove selection
 */
function unselect() {
  var current, parent;

  if (currentSelected) {
    current = currentSelected;
    parent = dom.closest(currentSelected.parentNode, '[' + references.referenceAttribute + ']');
  } else {
    current = dom.find('.selected');
    parent = dom.find('.selected-parent');
  }

  removeClasses(current, parent);
  currentSelected = null;
}

/**
 * only add select decorator to components' root element
 * @param {Element} el
 * @returns {boolean}
 */
function when(el) {
  return el.hasAttribute(references.referenceAttribute);
}

/**
 * handle clicks on the component itself
 * @param {Element} el
 * @param {MouseEvent} e
 */
function componentClickHandler(el, e) {
  e.stopPropagation();

  if (!el.classList.contains('selected')) {
    unselect();
    select(el);
  }
}

function addIframeOverlays(el) {
  var iframes = dom.findAll(el, 'iframe'),
    i = 0,
    l = iframes.length,
    newDiv;

  for (; i < l; i++) {
    if (!iframes[i].classList.contains('iframe-overlay')) {
      newDiv = document.createElement('div');
      newDiv.style.cssText = getComputedStyle(iframes[i]).cssText;
      newDiv.style.position = 'absolute';
      dom.insertAfter(iframes[i], newDiv);
      iframes[i].classList.add('iframe-overlay');
    }
  }
}

/**
 * Add the settings option to the component bar.
 * @param {Element} componentBar
 * @param {object} data
 * @param {string} ref
 */
function addSettingsOption(componentBar, data, ref) {
  var el,
    hasSettings = groups.getSettingsFields(data).length > 0;

  if (hasSettings) {
    el = dom.create(`<span class="settings" title="Settings"></span>`);
    el.addEventListener('click', function (e) {
      e.stopPropagation();
      // Open the settings overlay.
      focus.unfocus();
      forms.open(ref, document.body);
    });
    componentBar.appendChild(el);
  }
}

/**
 * Scroll user to the component. "Weeee!" or "What the?"
 * @param {Element} el
 */
function scrollToComponent(el) {
  var toolBarHeight = 70,
    componentBarHeight = 30;

  window.scrollTo(0, window.scrollY + el.getBoundingClientRect().top - toolBarHeight - componentBarHeight);
}

/**
 * Add the parent's label to the component bar.
 * @param {Element} componentBar
 * @param {Element} parentEl
 */
function addParentLabel(componentBar, parentEl) {
  var ref = parentEl.getAttribute(references.referenceAttribute),
    label = references.getComponentNameFromReference(ref),
    el = dom.create(`<span class="parent label" title="Parent: ${label.toUpperCase()}">${label}</span>`);

  el.addEventListener('click', function (e) {
    e.stopPropagation();
    // Select the parent.
    focus.unfocus();
    unselect();
    select(parentEl);
    scrollToComponent(parentEl);
  });
  componentBar.appendChild(el);
}

/**
 * Add options that depend on the parent (e.g. parent label).
 * @param {Element} componentBar
 * @param {Element} componentEl   An element that has a ref.
 */
function addParentOptions(componentBar, componentEl) {
  var parentEl = getParentEl(componentEl);

  if (parentEl) {
    addParentLabel(componentBar, parentEl);
  }
}

/**
 * add component bar (with click events)
 * @param {Element} componentEl   An element that has a ref.
 * @param {object} options
 * @param {string} options.ref
 * @param {string} options.path
 * @param {object} options.data
 * @returns {Element}
 */
function handler(componentEl, options) {
  var name = references.getComponentNameFromReference(options.ref),
    tpl = `
    <aside class="component-bar">
      <span class="label" title="${name.toUpperCase()}">${name}</span>
      <span class="fill"></span>
    </aside>
    `,
    componentBar = dom.create(tpl);

  // Add options to the component bar.
  addSettingsOption(componentBar, options.data, options.ref);
  addParentOptions(componentBar, componentEl);

  // add events to the component itself
  // when the component is clicked, it should be selected
  componentEl.addEventListener('click', componentClickHandler.bind(null, componentEl));

  // make sure components are relatively positioned
  componentEl.classList.add('component-bar-wrapper');
  dom.prependChild(componentEl, componentBar); // prepended, so parent components are behind child components
  // add an iframe-overlay to iframes so we can click on components with them
  addIframeOverlays(componentEl);
  return componentEl;
}

// focus and unfocus
module.exports.select = select;
module.exports.unselect = unselect;

// decorators
module.exports.when = when;
module.exports.handler = handler;
