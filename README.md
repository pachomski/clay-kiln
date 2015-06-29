# byline-editor

[![Coverage Status](https://coveralls.io/repos/nymag/byline-editor/badge.svg?t=cuxfVU)](https://coveralls.io/r/nymag/byline-editor)

Editing tools for Byline

## Folder Structure Overview

* [Behaviors](https://github.com/nymag/byline-editor/tree/master/behaviors) - contains `js` and `scss` that are composed when opening forms
* [Controllers](https://github.com/nymag/byline-editor/tree/master/controllers) - `dollar-slice` controllers that are instantiated for components, forms, and overlays. _These are slowly being phased out as their functionality is moved into generic services._
* [Services](https://github.com/nymag/byline-editor/tree/master/services) - `js` services, including services that decorate components when the page is loaded
* [Styleguide](https://github.com/nymag/byline-editor/tree/master/styleguide) - `scss` styles that are reused amongst behaviors, forms, etc

## Client.js

This file bootstraps our behaviors and decorators, and instantiates a `component-edit` controller for each component on the page. This controller calls the decorators it needs (to attach click events to editable elements, or add placeholders, etc).

## Testing

* `npm test` will run `eslint` and `karma` tests (the latter being run on browserify).
* `eslint client.js behaviors controllers services` will run `eslint` locally
* `karma start karma.local.conf.js` will run `karma` tests locally
