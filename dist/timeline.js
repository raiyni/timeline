var Timeline = (function (d3) {

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  var Events;

  (function (Events) {
    Events["COLLAPSE"] = "collapse";
    Events["TOGGLE"] = "toggle";
  })(Events || (Events = {}));

  var Priority;

  (function (Priority) {
    Priority[Priority["LOW"] = 100] = "LOW";
    Priority[Priority["NORMAL"] = 0] = "NORMAL";
    Priority[Priority["HIGH"] = -100] = "HIGH";
  })(Priority || (Priority = {}));

  var nextId = 0;

  var EventBus = /*#__PURE__*/function () {
    function EventBus() {
      _classCallCheck(this, EventBus);

      _defineProperty(this, "listeners", void 0);

      this.listeners = {};
    }

    _createClass(EventBus, [{
      key: "on",
      value: function on(event, callback) {
        var priority = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Priority.NORMAL;

        if (!this.listeners[event]) {
          this.listeners[event] = [];
        }

        var holder = {
          callback: callback,
          priority: priority,
          id: ++nextId
        };
        this.listeners[event].push(holder);
        this.listeners[event].sort(function (a, b) {
          return a.priority - b.priority;
        });
        return holder.id;
      }
    }, {
      key: "un",
      value: function un(event, callback, id) {
        if (!this.listeners[event]) return;

        if (!!id) {
          this.listeners[event] = this.listeners[event].filter(function (item) {
            return item.id !== id;
          });
        } else {
          this.listeners[event] = this.listeners[event].filter(function (item) {
            return item.callback !== callback;
          });
        }
      }
    }, {
      key: "emit",
      value: function emit(event, arg) {
        if (!this.listeners[event]) return;
        this.listeners[event].forEach(function (holder) {
          return holder.callback(arg);
        });
      }
    }, {
      key: "clear",
      value: function clear() {
        var _this = this;

        Object.keys(this.listeners).forEach(function (k) {
          return delete _this.listeners[k];
        });
      }
    }]);

    return EventBus;
  }();

  function isMergeableObject(val) {
    var nonNullObject = val && _typeof(val) === 'object';
    return nonNullObject && Object.prototype.toString.call(val) !== '[object RegExp]' && Object.prototype.toString.call(val) !== '[object Date]';
  }

  function emptyTarget(val) {
    return Array.isArray(val) ? [] : {};
  }

  function cloneIfNecessary(value, optionsArgument) {
    var clone = optionsArgument && optionsArgument.clone === true;
    return clone && isMergeableObject(value) ? deepmerge(emptyTarget(value), value, optionsArgument) : value;
  }

  function defaultArrayMerge(target, source, optionsArgument) {
    var destination = target.slice();
    source.forEach(function (e, i) {
      if (typeof destination[i] === 'undefined') {
        destination[i] = cloneIfNecessary(e, optionsArgument);
      } else if (isMergeableObject(e)) {
        destination[i] = deepmerge(target[i], e, optionsArgument);
      } else if (target.indexOf(e) === -1) {
        destination.push(cloneIfNecessary(e, optionsArgument));
      }
    });
    return destination;
  }

  function mergeObject(target, source, optionsArgument) {
    var destination = {};

    if (isMergeableObject(target)) {
      Object.keys(target).forEach(function (key) {
        destination[key] = cloneIfNecessary(target[key], optionsArgument);
      });
    }

    Object.keys(source).forEach(function (key) {
      if (!isMergeableObject(source[key]) || !target[key]) {
        destination[key] = cloneIfNecessary(source[key], optionsArgument);
      } else {
        destination[key] = deepmerge(target[key], source[key], optionsArgument);
      }
    });
    return destination;
  }

  function deepmerge(target, source, optionsArgument) {
    var array = Array.isArray(source);
    var options = optionsArgument || {
      arrayMerge: defaultArrayMerge
    };
    var arrayMerge = options.arrayMerge || defaultArrayMerge;

    if (array) {
      return Array.isArray(target) ? arrayMerge(target, source, optionsArgument) : cloneIfNecessary(source, optionsArgument);
    } else {
      return mergeObject(target, source, optionsArgument);
    }
  }

  deepmerge.all = function deepmergeAll(array, optionsArgument) {
    if (!Array.isArray(array) || array.length < 2) {
      throw new Error('first argument should be an array with at least two elements');
    } // we are sure there are at least 2 values, so it is safe to have no initial value


    return array.reduce(function (prev, next) {
      return deepmerge(prev, next, optionsArgument);
    });
  };

  var applyStyle = function applyStyle(el, style) {
    var attr = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    Object.keys(style).forEach(function (k) {
      if (!attr) el.style(k, style[k]);else el.attr(k, style[k]);
    });
  };
  var clamp = function clamp(num, min, max) {
    return Math.min(Math.max(num, 0), 1);
  }; // @ts-ignore

  var IS_IE = function () {
    return document.documentMode || /Edge/.test(navigator.userAgent) || /Edg/.test(navigator.userAgent);
  }();
  var uid = function uid() {
    var d = new Date().getTime(); //Timestamp

    var d2 = performance && performance.now && performance.now() * 1000 || 0; //Time in microseconds since page-load or 0 if unsupported

    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16; //random number between 0 and 16

      if (d > 0) {
        //Use timestamp until depleted
        r = (d + r) % 16 | 0;
        d = Math.floor(d / 16);
      } else {
        //Use microseconds since page-load if supported
        r = (d2 + r) % 16 | 0;
        d2 = Math.floor(d2 / 16);
      }

      return (c === 'x' ? r : r & 0x3 | 0x8).toString(16);
    });
  };
  function debounce(fn, wait) {
    var t;
    return function () {
      clearTimeout(t);
      t = setTimeout(function () {
        fn.call(arguments);
      }, wait);
    };
  }
  var getLabelOptions = function getLabelOptions(input) {
    if (typeof input == 'string') {
      return {
        label: input
      };
    }

    return deepmerge({}, input);
  };

  var Column = /*#__PURE__*/function () {
    function Column(tasks, options, config) {
      _classCallCheck(this, Column);

      _defineProperty(this, "tasks", void 0);

      _defineProperty(this, "options", void 0);

      _defineProperty(this, "config", void 0);

      this.tasks = tasks;
      this.options = options;
      this.config = config;
      this.options.padding = this.options.padding || 5;
    }

    _createClass(Column, [{
      key: "render",
      value: function render(header, parent, columnIdx) {
        var _this = this;

        var titleDiv = header.append('div').style('display', 'flex').style('align-items', 'flex-end').style('justify-content', 'center').text(this.options.text);
        this.tasks.forEach(function (task, idx) {
          var layer = parent.append('div').style('border-top', "".concat(_this.options.taskMargin, "px solid black")).attr('class', 'column-task').attr('data-id', task.id);
          var labels = task.labels[_this.options.field];
          labels.forEach(function (l, idx2) {
            var height = task.heights[idx2];
            var style = l.backgroundStyle || {};
            var div = layer.append('div').style('height', height).style('padding', '0 4px 0 4px').style('display', 'flex').style('align-items', 'center').attr('class', 'column-plan').style('background-color', '#fff');

            if (l.label) {
              var span = div.append('span').text(l.label);
              applyStyle(span, l.labelStyle || {}, false);
            }

            if (Object.keys(style).length == 0) {
              return;
            }
            applyStyle(div, style, false);
          });

          if (task.options.collapsible && columnIdx == 0) {
            var button = layer.selectAll("div:first-child").insert('a', ':first-child').attr('class', task.getButtonCls()).attr('data-id', task.id);
            button.node().addEventListener('click', function (e) {
              _this.config.eventbus.emit(Events.TOGGLE, button.node().getAttribute('data-id'));
            });
            layer.selectAll('div:first-child span').style('margin-left', 5);
          }
        });
        var titleWidth = titleDiv.node().getBoundingClientRect().width;
        var parentWidth = parent.node().getBoundingClientRect().width;
        var maxWidth = Math.max(titleWidth, parentWidth);
        parent.style('width', maxWidth);
        titleDiv.style('width', maxWidth);
      }
    }]);

    return Column;
  }();

  var Columns = /*#__PURE__*/function () {
    function Columns(tasks, config) {
      var _this = this;

      _classCallCheck(this, Columns);

      _defineProperty(this, "tasks", void 0);

      _defineProperty(this, "config", void 0);

      _defineProperty(this, "columns", void 0);

      this.tasks = tasks;
      this.config = config;
      this.columns = this.config.columns.map(function (o) {
        var colOptions = deepmerge({
          taskMargin: _this.config.taskMargin
        }, o);
        return new Column(_this.tasks, colOptions, _this.config);
      });
    }

    _createClass(Columns, [{
      key: "render",
      value: function render(header, holder) {
        this.columns.forEach(function (column, idx) {
          var layer = holder.append('div').style('flex', '0 1 auto').attr('class', 'column');
          column.render(header, layer, idx);
        });
      }
    }]);

    return Columns;
  }();

  /**
   * A collection of shims that provide minimal functionality of the ES6 collections.
   *
   * These implementations are not meant to be used outside of the ResizeObserver
   * modules as they cover only a limited range of use cases.
   */
  /* eslint-disable require-jsdoc, valid-jsdoc */
  var MapShim = (function () {
      if (typeof Map !== 'undefined') {
          return Map;
      }
      /**
       * Returns index in provided array that matches the specified key.
       *
       * @param {Array<Array>} arr
       * @param {*} key
       * @returns {number}
       */
      function getIndex(arr, key) {
          var result = -1;
          arr.some(function (entry, index) {
              if (entry[0] === key) {
                  result = index;
                  return true;
              }
              return false;
          });
          return result;
      }
      return /** @class */ (function () {
          function class_1() {
              this.__entries__ = [];
          }
          Object.defineProperty(class_1.prototype, "size", {
              /**
               * @returns {boolean}
               */
              get: function () {
                  return this.__entries__.length;
              },
              enumerable: true,
              configurable: true
          });
          /**
           * @param {*} key
           * @returns {*}
           */
          class_1.prototype.get = function (key) {
              var index = getIndex(this.__entries__, key);
              var entry = this.__entries__[index];
              return entry && entry[1];
          };
          /**
           * @param {*} key
           * @param {*} value
           * @returns {void}
           */
          class_1.prototype.set = function (key, value) {
              var index = getIndex(this.__entries__, key);
              if (~index) {
                  this.__entries__[index][1] = value;
              }
              else {
                  this.__entries__.push([key, value]);
              }
          };
          /**
           * @param {*} key
           * @returns {void}
           */
          class_1.prototype.delete = function (key) {
              var entries = this.__entries__;
              var index = getIndex(entries, key);
              if (~index) {
                  entries.splice(index, 1);
              }
          };
          /**
           * @param {*} key
           * @returns {void}
           */
          class_1.prototype.has = function (key) {
              return !!~getIndex(this.__entries__, key);
          };
          /**
           * @returns {void}
           */
          class_1.prototype.clear = function () {
              this.__entries__.splice(0);
          };
          /**
           * @param {Function} callback
           * @param {*} [ctx=null]
           * @returns {void}
           */
          class_1.prototype.forEach = function (callback, ctx) {
              if (ctx === void 0) { ctx = null; }
              for (var _i = 0, _a = this.__entries__; _i < _a.length; _i++) {
                  var entry = _a[_i];
                  callback.call(ctx, entry[1], entry[0]);
              }
          };
          return class_1;
      }());
  })();

  /**
   * Detects whether window and document objects are available in current environment.
   */
  var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined' && window.document === document;

  // Returns global object of a current environment.
  var global$1 = (function () {
      if (typeof global !== 'undefined' && global.Math === Math) {
          return global;
      }
      if (typeof self !== 'undefined' && self.Math === Math) {
          return self;
      }
      if (typeof window !== 'undefined' && window.Math === Math) {
          return window;
      }
      // eslint-disable-next-line no-new-func
      return Function('return this')();
  })();

  /**
   * A shim for the requestAnimationFrame which falls back to the setTimeout if
   * first one is not supported.
   *
   * @returns {number} Requests' identifier.
   */
  var requestAnimationFrame$1 = (function () {
      if (typeof requestAnimationFrame === 'function') {
          // It's required to use a bounded function because IE sometimes throws
          // an "Invalid calling object" error if rAF is invoked without the global
          // object on the left hand side.
          return requestAnimationFrame.bind(global$1);
      }
      return function (callback) { return setTimeout(function () { return callback(Date.now()); }, 1000 / 60); };
  })();

  // Defines minimum timeout before adding a trailing call.
  var trailingTimeout = 2;
  /**
   * Creates a wrapper function which ensures that provided callback will be
   * invoked only once during the specified delay period.
   *
   * @param {Function} callback - Function to be invoked after the delay period.
   * @param {number} delay - Delay after which to invoke callback.
   * @returns {Function}
   */
  function throttle (callback, delay) {
      var leadingCall = false, trailingCall = false, lastCallTime = 0;
      /**
       * Invokes the original callback function and schedules new invocation if
       * the "proxy" was called during current request.
       *
       * @returns {void}
       */
      function resolvePending() {
          if (leadingCall) {
              leadingCall = false;
              callback();
          }
          if (trailingCall) {
              proxy();
          }
      }
      /**
       * Callback invoked after the specified delay. It will further postpone
       * invocation of the original function delegating it to the
       * requestAnimationFrame.
       *
       * @returns {void}
       */
      function timeoutCallback() {
          requestAnimationFrame$1(resolvePending);
      }
      /**
       * Schedules invocation of the original function.
       *
       * @returns {void}
       */
      function proxy() {
          var timeStamp = Date.now();
          if (leadingCall) {
              // Reject immediately following calls.
              if (timeStamp - lastCallTime < trailingTimeout) {
                  return;
              }
              // Schedule new call to be in invoked when the pending one is resolved.
              // This is important for "transitions" which never actually start
              // immediately so there is a chance that we might miss one if change
              // happens amids the pending invocation.
              trailingCall = true;
          }
          else {
              leadingCall = true;
              trailingCall = false;
              setTimeout(timeoutCallback, delay);
          }
          lastCallTime = timeStamp;
      }
      return proxy;
  }

  // Minimum delay before invoking the update of observers.
  var REFRESH_DELAY = 20;
  // A list of substrings of CSS properties used to find transition events that
  // might affect dimensions of observed elements.
  var transitionKeys = ['top', 'right', 'bottom', 'left', 'width', 'height', 'size', 'weight'];
  // Check if MutationObserver is available.
  var mutationObserverSupported = typeof MutationObserver !== 'undefined';
  /**
   * Singleton controller class which handles updates of ResizeObserver instances.
   */
  var ResizeObserverController = /** @class */ (function () {
      /**
       * Creates a new instance of ResizeObserverController.
       *
       * @private
       */
      function ResizeObserverController() {
          /**
           * Indicates whether DOM listeners have been added.
           *
           * @private {boolean}
           */
          this.connected_ = false;
          /**
           * Tells that controller has subscribed for Mutation Events.
           *
           * @private {boolean}
           */
          this.mutationEventsAdded_ = false;
          /**
           * Keeps reference to the instance of MutationObserver.
           *
           * @private {MutationObserver}
           */
          this.mutationsObserver_ = null;
          /**
           * A list of connected observers.
           *
           * @private {Array<ResizeObserverSPI>}
           */
          this.observers_ = [];
          this.onTransitionEnd_ = this.onTransitionEnd_.bind(this);
          this.refresh = throttle(this.refresh.bind(this), REFRESH_DELAY);
      }
      /**
       * Adds observer to observers list.
       *
       * @param {ResizeObserverSPI} observer - Observer to be added.
       * @returns {void}
       */
      ResizeObserverController.prototype.addObserver = function (observer) {
          if (!~this.observers_.indexOf(observer)) {
              this.observers_.push(observer);
          }
          // Add listeners if they haven't been added yet.
          if (!this.connected_) {
              this.connect_();
          }
      };
      /**
       * Removes observer from observers list.
       *
       * @param {ResizeObserverSPI} observer - Observer to be removed.
       * @returns {void}
       */
      ResizeObserverController.prototype.removeObserver = function (observer) {
          var observers = this.observers_;
          var index = observers.indexOf(observer);
          // Remove observer if it's present in registry.
          if (~index) {
              observers.splice(index, 1);
          }
          // Remove listeners if controller has no connected observers.
          if (!observers.length && this.connected_) {
              this.disconnect_();
          }
      };
      /**
       * Invokes the update of observers. It will continue running updates insofar
       * it detects changes.
       *
       * @returns {void}
       */
      ResizeObserverController.prototype.refresh = function () {
          var changesDetected = this.updateObservers_();
          // Continue running updates if changes have been detected as there might
          // be future ones caused by CSS transitions.
          if (changesDetected) {
              this.refresh();
          }
      };
      /**
       * Updates every observer from observers list and notifies them of queued
       * entries.
       *
       * @private
       * @returns {boolean} Returns "true" if any observer has detected changes in
       *      dimensions of it's elements.
       */
      ResizeObserverController.prototype.updateObservers_ = function () {
          // Collect observers that have active observations.
          var activeObservers = this.observers_.filter(function (observer) {
              return observer.gatherActive(), observer.hasActive();
          });
          // Deliver notifications in a separate cycle in order to avoid any
          // collisions between observers, e.g. when multiple instances of
          // ResizeObserver are tracking the same element and the callback of one
          // of them changes content dimensions of the observed target. Sometimes
          // this may result in notifications being blocked for the rest of observers.
          activeObservers.forEach(function (observer) { return observer.broadcastActive(); });
          return activeObservers.length > 0;
      };
      /**
       * Initializes DOM listeners.
       *
       * @private
       * @returns {void}
       */
      ResizeObserverController.prototype.connect_ = function () {
          // Do nothing if running in a non-browser environment or if listeners
          // have been already added.
          if (!isBrowser || this.connected_) {
              return;
          }
          // Subscription to the "Transitionend" event is used as a workaround for
          // delayed transitions. This way it's possible to capture at least the
          // final state of an element.
          document.addEventListener('transitionend', this.onTransitionEnd_);
          window.addEventListener('resize', this.refresh);
          if (mutationObserverSupported) {
              this.mutationsObserver_ = new MutationObserver(this.refresh);
              this.mutationsObserver_.observe(document, {
                  attributes: true,
                  childList: true,
                  characterData: true,
                  subtree: true
              });
          }
          else {
              document.addEventListener('DOMSubtreeModified', this.refresh);
              this.mutationEventsAdded_ = true;
          }
          this.connected_ = true;
      };
      /**
       * Removes DOM listeners.
       *
       * @private
       * @returns {void}
       */
      ResizeObserverController.prototype.disconnect_ = function () {
          // Do nothing if running in a non-browser environment or if listeners
          // have been already removed.
          if (!isBrowser || !this.connected_) {
              return;
          }
          document.removeEventListener('transitionend', this.onTransitionEnd_);
          window.removeEventListener('resize', this.refresh);
          if (this.mutationsObserver_) {
              this.mutationsObserver_.disconnect();
          }
          if (this.mutationEventsAdded_) {
              document.removeEventListener('DOMSubtreeModified', this.refresh);
          }
          this.mutationsObserver_ = null;
          this.mutationEventsAdded_ = false;
          this.connected_ = false;
      };
      /**
       * "Transitionend" event handler.
       *
       * @private
       * @param {TransitionEvent} event
       * @returns {void}
       */
      ResizeObserverController.prototype.onTransitionEnd_ = function (_a) {
          var _b = _a.propertyName, propertyName = _b === void 0 ? '' : _b;
          // Detect whether transition may affect dimensions of an element.
          var isReflowProperty = transitionKeys.some(function (key) {
              return !!~propertyName.indexOf(key);
          });
          if (isReflowProperty) {
              this.refresh();
          }
      };
      /**
       * Returns instance of the ResizeObserverController.
       *
       * @returns {ResizeObserverController}
       */
      ResizeObserverController.getInstance = function () {
          if (!this.instance_) {
              this.instance_ = new ResizeObserverController();
          }
          return this.instance_;
      };
      /**
       * Holds reference to the controller's instance.
       *
       * @private {ResizeObserverController}
       */
      ResizeObserverController.instance_ = null;
      return ResizeObserverController;
  }());

  /**
   * Defines non-writable/enumerable properties of the provided target object.
   *
   * @param {Object} target - Object for which to define properties.
   * @param {Object} props - Properties to be defined.
   * @returns {Object} Target object.
   */
  var defineConfigurable = (function (target, props) {
      for (var _i = 0, _a = Object.keys(props); _i < _a.length; _i++) {
          var key = _a[_i];
          Object.defineProperty(target, key, {
              value: props[key],
              enumerable: false,
              writable: false,
              configurable: true
          });
      }
      return target;
  });

  /**
   * Returns the global object associated with provided element.
   *
   * @param {Object} target
   * @returns {Object}
   */
  var getWindowOf = (function (target) {
      // Assume that the element is an instance of Node, which means that it
      // has the "ownerDocument" property from which we can retrieve a
      // corresponding global object.
      var ownerGlobal = target && target.ownerDocument && target.ownerDocument.defaultView;
      // Return the local global object if it's not possible extract one from
      // provided element.
      return ownerGlobal || global$1;
  });

  // Placeholder of an empty content rectangle.
  var emptyRect = createRectInit(0, 0, 0, 0);
  /**
   * Converts provided string to a number.
   *
   * @param {number|string} value
   * @returns {number}
   */
  function toFloat(value) {
      return parseFloat(value) || 0;
  }
  /**
   * Extracts borders size from provided styles.
   *
   * @param {CSSStyleDeclaration} styles
   * @param {...string} positions - Borders positions (top, right, ...)
   * @returns {number}
   */
  function getBordersSize(styles) {
      var positions = [];
      for (var _i = 1; _i < arguments.length; _i++) {
          positions[_i - 1] = arguments[_i];
      }
      return positions.reduce(function (size, position) {
          var value = styles['border-' + position + '-width'];
          return size + toFloat(value);
      }, 0);
  }
  /**
   * Extracts paddings sizes from provided styles.
   *
   * @param {CSSStyleDeclaration} styles
   * @returns {Object} Paddings box.
   */
  function getPaddings(styles) {
      var positions = ['top', 'right', 'bottom', 'left'];
      var paddings = {};
      for (var _i = 0, positions_1 = positions; _i < positions_1.length; _i++) {
          var position = positions_1[_i];
          var value = styles['padding-' + position];
          paddings[position] = toFloat(value);
      }
      return paddings;
  }
  /**
   * Calculates content rectangle of provided SVG element.
   *
   * @param {SVGGraphicsElement} target - Element content rectangle of which needs
   *      to be calculated.
   * @returns {DOMRectInit}
   */
  function getSVGContentRect(target) {
      var bbox = target.getBBox();
      return createRectInit(0, 0, bbox.width, bbox.height);
  }
  /**
   * Calculates content rectangle of provided HTMLElement.
   *
   * @param {HTMLElement} target - Element for which to calculate the content rectangle.
   * @returns {DOMRectInit}
   */
  function getHTMLElementContentRect(target) {
      // Client width & height properties can't be
      // used exclusively as they provide rounded values.
      var clientWidth = target.clientWidth, clientHeight = target.clientHeight;
      // By this condition we can catch all non-replaced inline, hidden and
      // detached elements. Though elements with width & height properties less
      // than 0.5 will be discarded as well.
      //
      // Without it we would need to implement separate methods for each of
      // those cases and it's not possible to perform a precise and performance
      // effective test for hidden elements. E.g. even jQuery's ':visible' filter
      // gives wrong results for elements with width & height less than 0.5.
      if (!clientWidth && !clientHeight) {
          return emptyRect;
      }
      var styles = getWindowOf(target).getComputedStyle(target);
      var paddings = getPaddings(styles);
      var horizPad = paddings.left + paddings.right;
      var vertPad = paddings.top + paddings.bottom;
      // Computed styles of width & height are being used because they are the
      // only dimensions available to JS that contain non-rounded values. It could
      // be possible to utilize the getBoundingClientRect if only it's data wasn't
      // affected by CSS transformations let alone paddings, borders and scroll bars.
      var width = toFloat(styles.width), height = toFloat(styles.height);
      // Width & height include paddings and borders when the 'border-box' box
      // model is applied (except for IE).
      if (styles.boxSizing === 'border-box') {
          // Following conditions are required to handle Internet Explorer which
          // doesn't include paddings and borders to computed CSS dimensions.
          //
          // We can say that if CSS dimensions + paddings are equal to the "client"
          // properties then it's either IE, and thus we don't need to subtract
          // anything, or an element merely doesn't have paddings/borders styles.
          if (Math.round(width + horizPad) !== clientWidth) {
              width -= getBordersSize(styles, 'left', 'right') + horizPad;
          }
          if (Math.round(height + vertPad) !== clientHeight) {
              height -= getBordersSize(styles, 'top', 'bottom') + vertPad;
          }
      }
      // Following steps can't be applied to the document's root element as its
      // client[Width/Height] properties represent viewport area of the window.
      // Besides, it's as well not necessary as the <html> itself neither has
      // rendered scroll bars nor it can be clipped.
      if (!isDocumentElement(target)) {
          // In some browsers (only in Firefox, actually) CSS width & height
          // include scroll bars size which can be removed at this step as scroll
          // bars are the only difference between rounded dimensions + paddings
          // and "client" properties, though that is not always true in Chrome.
          var vertScrollbar = Math.round(width + horizPad) - clientWidth;
          var horizScrollbar = Math.round(height + vertPad) - clientHeight;
          // Chrome has a rather weird rounding of "client" properties.
          // E.g. for an element with content width of 314.2px it sometimes gives
          // the client width of 315px and for the width of 314.7px it may give
          // 314px. And it doesn't happen all the time. So just ignore this delta
          // as a non-relevant.
          if (Math.abs(vertScrollbar) !== 1) {
              width -= vertScrollbar;
          }
          if (Math.abs(horizScrollbar) !== 1) {
              height -= horizScrollbar;
          }
      }
      return createRectInit(paddings.left, paddings.top, width, height);
  }
  /**
   * Checks whether provided element is an instance of the SVGGraphicsElement.
   *
   * @param {Element} target - Element to be checked.
   * @returns {boolean}
   */
  var isSVGGraphicsElement = (function () {
      // Some browsers, namely IE and Edge, don't have the SVGGraphicsElement
      // interface.
      if (typeof SVGGraphicsElement !== 'undefined') {
          return function (target) { return target instanceof getWindowOf(target).SVGGraphicsElement; };
      }
      // If it's so, then check that element is at least an instance of the
      // SVGElement and that it has the "getBBox" method.
      // eslint-disable-next-line no-extra-parens
      return function (target) { return (target instanceof getWindowOf(target).SVGElement &&
          typeof target.getBBox === 'function'); };
  })();
  /**
   * Checks whether provided element is a document element (<html>).
   *
   * @param {Element} target - Element to be checked.
   * @returns {boolean}
   */
  function isDocumentElement(target) {
      return target === getWindowOf(target).document.documentElement;
  }
  /**
   * Calculates an appropriate content rectangle for provided html or svg element.
   *
   * @param {Element} target - Element content rectangle of which needs to be calculated.
   * @returns {DOMRectInit}
   */
  function getContentRect(target) {
      if (!isBrowser) {
          return emptyRect;
      }
      if (isSVGGraphicsElement(target)) {
          return getSVGContentRect(target);
      }
      return getHTMLElementContentRect(target);
  }
  /**
   * Creates rectangle with an interface of the DOMRectReadOnly.
   * Spec: https://drafts.fxtf.org/geometry/#domrectreadonly
   *
   * @param {DOMRectInit} rectInit - Object with rectangle's x/y coordinates and dimensions.
   * @returns {DOMRectReadOnly}
   */
  function createReadOnlyRect(_a) {
      var x = _a.x, y = _a.y, width = _a.width, height = _a.height;
      // If DOMRectReadOnly is available use it as a prototype for the rectangle.
      var Constr = typeof DOMRectReadOnly !== 'undefined' ? DOMRectReadOnly : Object;
      var rect = Object.create(Constr.prototype);
      // Rectangle's properties are not writable and non-enumerable.
      defineConfigurable(rect, {
          x: x, y: y, width: width, height: height,
          top: y,
          right: x + width,
          bottom: height + y,
          left: x
      });
      return rect;
  }
  /**
   * Creates DOMRectInit object based on the provided dimensions and the x/y coordinates.
   * Spec: https://drafts.fxtf.org/geometry/#dictdef-domrectinit
   *
   * @param {number} x - X coordinate.
   * @param {number} y - Y coordinate.
   * @param {number} width - Rectangle's width.
   * @param {number} height - Rectangle's height.
   * @returns {DOMRectInit}
   */
  function createRectInit(x, y, width, height) {
      return { x: x, y: y, width: width, height: height };
  }

  /**
   * Class that is responsible for computations of the content rectangle of
   * provided DOM element and for keeping track of it's changes.
   */
  var ResizeObservation = /** @class */ (function () {
      /**
       * Creates an instance of ResizeObservation.
       *
       * @param {Element} target - Element to be observed.
       */
      function ResizeObservation(target) {
          /**
           * Broadcasted width of content rectangle.
           *
           * @type {number}
           */
          this.broadcastWidth = 0;
          /**
           * Broadcasted height of content rectangle.
           *
           * @type {number}
           */
          this.broadcastHeight = 0;
          /**
           * Reference to the last observed content rectangle.
           *
           * @private {DOMRectInit}
           */
          this.contentRect_ = createRectInit(0, 0, 0, 0);
          this.target = target;
      }
      /**
       * Updates content rectangle and tells whether it's width or height properties
       * have changed since the last broadcast.
       *
       * @returns {boolean}
       */
      ResizeObservation.prototype.isActive = function () {
          var rect = getContentRect(this.target);
          this.contentRect_ = rect;
          return (rect.width !== this.broadcastWidth ||
              rect.height !== this.broadcastHeight);
      };
      /**
       * Updates 'broadcastWidth' and 'broadcastHeight' properties with a data
       * from the corresponding properties of the last observed content rectangle.
       *
       * @returns {DOMRectInit} Last observed content rectangle.
       */
      ResizeObservation.prototype.broadcastRect = function () {
          var rect = this.contentRect_;
          this.broadcastWidth = rect.width;
          this.broadcastHeight = rect.height;
          return rect;
      };
      return ResizeObservation;
  }());

  var ResizeObserverEntry = /** @class */ (function () {
      /**
       * Creates an instance of ResizeObserverEntry.
       *
       * @param {Element} target - Element that is being observed.
       * @param {DOMRectInit} rectInit - Data of the element's content rectangle.
       */
      function ResizeObserverEntry(target, rectInit) {
          var contentRect = createReadOnlyRect(rectInit);
          // According to the specification following properties are not writable
          // and are also not enumerable in the native implementation.
          //
          // Property accessors are not being used as they'd require to define a
          // private WeakMap storage which may cause memory leaks in browsers that
          // don't support this type of collections.
          defineConfigurable(this, { target: target, contentRect: contentRect });
      }
      return ResizeObserverEntry;
  }());

  var ResizeObserverSPI = /** @class */ (function () {
      /**
       * Creates a new instance of ResizeObserver.
       *
       * @param {ResizeObserverCallback} callback - Callback function that is invoked
       *      when one of the observed elements changes it's content dimensions.
       * @param {ResizeObserverController} controller - Controller instance which
       *      is responsible for the updates of observer.
       * @param {ResizeObserver} callbackCtx - Reference to the public
       *      ResizeObserver instance which will be passed to callback function.
       */
      function ResizeObserverSPI(callback, controller, callbackCtx) {
          /**
           * Collection of resize observations that have detected changes in dimensions
           * of elements.
           *
           * @private {Array<ResizeObservation>}
           */
          this.activeObservations_ = [];
          /**
           * Registry of the ResizeObservation instances.
           *
           * @private {Map<Element, ResizeObservation>}
           */
          this.observations_ = new MapShim();
          if (typeof callback !== 'function') {
              throw new TypeError('The callback provided as parameter 1 is not a function.');
          }
          this.callback_ = callback;
          this.controller_ = controller;
          this.callbackCtx_ = callbackCtx;
      }
      /**
       * Starts observing provided element.
       *
       * @param {Element} target - Element to be observed.
       * @returns {void}
       */
      ResizeObserverSPI.prototype.observe = function (target) {
          if (!arguments.length) {
              throw new TypeError('1 argument required, but only 0 present.');
          }
          // Do nothing if current environment doesn't have the Element interface.
          if (typeof Element === 'undefined' || !(Element instanceof Object)) {
              return;
          }
          if (!(target instanceof getWindowOf(target).Element)) {
              throw new TypeError('parameter 1 is not of type "Element".');
          }
          var observations = this.observations_;
          // Do nothing if element is already being observed.
          if (observations.has(target)) {
              return;
          }
          observations.set(target, new ResizeObservation(target));
          this.controller_.addObserver(this);
          // Force the update of observations.
          this.controller_.refresh();
      };
      /**
       * Stops observing provided element.
       *
       * @param {Element} target - Element to stop observing.
       * @returns {void}
       */
      ResizeObserverSPI.prototype.unobserve = function (target) {
          if (!arguments.length) {
              throw new TypeError('1 argument required, but only 0 present.');
          }
          // Do nothing if current environment doesn't have the Element interface.
          if (typeof Element === 'undefined' || !(Element instanceof Object)) {
              return;
          }
          if (!(target instanceof getWindowOf(target).Element)) {
              throw new TypeError('parameter 1 is not of type "Element".');
          }
          var observations = this.observations_;
          // Do nothing if element is not being observed.
          if (!observations.has(target)) {
              return;
          }
          observations.delete(target);
          if (!observations.size) {
              this.controller_.removeObserver(this);
          }
      };
      /**
       * Stops observing all elements.
       *
       * @returns {void}
       */
      ResizeObserverSPI.prototype.disconnect = function () {
          this.clearActive();
          this.observations_.clear();
          this.controller_.removeObserver(this);
      };
      /**
       * Collects observation instances the associated element of which has changed
       * it's content rectangle.
       *
       * @returns {void}
       */
      ResizeObserverSPI.prototype.gatherActive = function () {
          var _this = this;
          this.clearActive();
          this.observations_.forEach(function (observation) {
              if (observation.isActive()) {
                  _this.activeObservations_.push(observation);
              }
          });
      };
      /**
       * Invokes initial callback function with a list of ResizeObserverEntry
       * instances collected from active resize observations.
       *
       * @returns {void}
       */
      ResizeObserverSPI.prototype.broadcastActive = function () {
          // Do nothing if observer doesn't have active observations.
          if (!this.hasActive()) {
              return;
          }
          var ctx = this.callbackCtx_;
          // Create ResizeObserverEntry instance for every active observation.
          var entries = this.activeObservations_.map(function (observation) {
              return new ResizeObserverEntry(observation.target, observation.broadcastRect());
          });
          this.callback_.call(ctx, entries, ctx);
          this.clearActive();
      };
      /**
       * Clears the collection of active observations.
       *
       * @returns {void}
       */
      ResizeObserverSPI.prototype.clearActive = function () {
          this.activeObservations_.splice(0);
      };
      /**
       * Tells whether observer has active observations.
       *
       * @returns {boolean}
       */
      ResizeObserverSPI.prototype.hasActive = function () {
          return this.activeObservations_.length > 0;
      };
      return ResizeObserverSPI;
  }());

  // Registry of internal observers. If WeakMap is not available use current shim
  // for the Map collection as it has all required methods and because WeakMap
  // can't be fully polyfilled anyway.
  var observers = typeof WeakMap !== 'undefined' ? new WeakMap() : new MapShim();
  /**
   * ResizeObserver API. Encapsulates the ResizeObserver SPI implementation
   * exposing only those methods and properties that are defined in the spec.
   */
  var ResizeObserver = /** @class */ (function () {
      /**
       * Creates a new instance of ResizeObserver.
       *
       * @param {ResizeObserverCallback} callback - Callback that is invoked when
       *      dimensions of the observed elements change.
       */
      function ResizeObserver(callback) {
          if (!(this instanceof ResizeObserver)) {
              throw new TypeError('Cannot call a class as a function.');
          }
          if (!arguments.length) {
              throw new TypeError('1 argument required, but only 0 present.');
          }
          var controller = ResizeObserverController.getInstance();
          var observer = new ResizeObserverSPI(callback, controller, this);
          observers.set(this, observer);
      }
      return ResizeObserver;
  }());
  // Expose public methods of ResizeObserver.
  [
      'observe',
      'unobserve',
      'disconnect'
  ].forEach(function (method) {
      ResizeObserver.prototype[method] = function () {
          var _a;
          return (_a = observers.get(this))[method].apply(_a, arguments);
      };
  });

  var index = (function () {
      // Export existing implementation if available.
      if (typeof global$1.ResizeObserver !== 'undefined') {
          return global$1.ResizeObserver;
      }
      return ResizeObserver;
  })();

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn) {
    var module = { exports: {} };
  	return fn(module, module.exports), module.exports;
  }

  var dayjs_min = createCommonjsModule(function (module, exports) {
  !function(t,e){module.exports=e();}(commonjsGlobal,function(){var t="millisecond",e="second",n="minute",r="hour",i="day",s="week",u="month",a="quarter",o="year",f="date",h=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[^0-9]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?.?(\d+)?$/,c=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,d={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},$=function(t,e,n){var r=String(t);return !r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},l={s:$,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return (e<=0?"+":"-")+$(r,2,"0")+":"+$(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return -t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,u),s=n-i<0,a=e.clone().add(r+(s?-1:1),u);return +(-(r+(n-i)/(s?i-a:a-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(h){return {M:u,y:o,w:s,d:i,D:f,h:r,m:n,s:e,ms:t,Q:a}[h]||String(h||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},y="en",M={};M[y]=d;var m=function(t){return t instanceof S},D=function(t,e,n){var r;if(!t)return y;if("string"==typeof t)M[t]&&(r=t),e&&(M[t]=e,r=t);else {var i=t.name;M[i]=t,r=i;}return !n&&r&&(y=r),r||!n&&y},v=function(t,e){if(m(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new S(n)},g=l;g.l=D,g.i=m,g.w=function(t,e){return v(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var S=function(){function d(t){this.$L=D(t.locale,null,!0),this.parse(t);}var $=d.prototype;return $.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(g.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match(h);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.$x=t.x||{},this.init();},$.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds();},$.$utils=function(){return g},$.isValid=function(){return !("Invalid Date"===this.$d.toString())},$.isSame=function(t,e){var n=v(t);return this.startOf(e)<=n&&n<=this.endOf(e)},$.isAfter=function(t,e){return v(t)<this.startOf(e)},$.isBefore=function(t,e){return this.endOf(e)<v(t)},$.$g=function(t,e,n){return g.u(t)?this[e]:this.set(n,t)},$.unix=function(){return Math.floor(this.valueOf()/1e3)},$.valueOf=function(){return this.$d.getTime()},$.startOf=function(t,a){var h=this,c=!!g.u(a)||a,d=g.p(t),$=function(t,e){var n=g.w(h.$u?Date.UTC(h.$y,e,t):new Date(h.$y,e,t),h);return c?n:n.endOf(i)},l=function(t,e){return g.w(h.toDate()[t].apply(h.toDate("s"),(c?[0,0,0,0]:[23,59,59,999]).slice(e)),h)},y=this.$W,M=this.$M,m=this.$D,D="set"+(this.$u?"UTC":"");switch(d){case o:return c?$(1,0):$(31,11);case u:return c?$(1,M):$(0,M+1);case s:var v=this.$locale().weekStart||0,S=(y<v?y+7:y)-v;return $(c?m-S:m+(6-S),M);case i:case f:return l(D+"Hours",0);case r:return l(D+"Minutes",1);case n:return l(D+"Seconds",2);case e:return l(D+"Milliseconds",3);default:return this.clone()}},$.endOf=function(t){return this.startOf(t,!1)},$.$set=function(s,a){var h,c=g.p(s),d="set"+(this.$u?"UTC":""),$=(h={},h[i]=d+"Date",h[f]=d+"Date",h[u]=d+"Month",h[o]=d+"FullYear",h[r]=d+"Hours",h[n]=d+"Minutes",h[e]=d+"Seconds",h[t]=d+"Milliseconds",h)[c],l=c===i?this.$D+(a-this.$W):a;if(c===u||c===o){var y=this.clone().set(f,1);y.$d[$](l),y.init(),this.$d=y.set(f,Math.min(this.$D,y.daysInMonth())).$d;}else $&&this.$d[$](l);return this.init(),this},$.set=function(t,e){return this.clone().$set(t,e)},$.get=function(t){return this[g.p(t)]()},$.add=function(t,a){var f,h=this;t=Number(t);var c=g.p(a),d=function(e){var n=v(h);return g.w(n.date(n.date()+Math.round(e*t)),h)};if(c===u)return this.set(u,this.$M+t);if(c===o)return this.set(o,this.$y+t);if(c===i)return d(1);if(c===s)return d(7);var $=(f={},f[n]=6e4,f[r]=36e5,f[e]=1e3,f)[c]||1,l=this.$d.getTime()+t*$;return g.w(l,this)},$.subtract=function(t,e){return this.add(-1*t,e)},$.format=function(t){var e=this;if(!this.isValid())return "Invalid Date";var n=t||"YYYY-MM-DDTHH:mm:ssZ",r=g.z(this),i=this.$locale(),s=this.$H,u=this.$m,a=this.$M,o=i.weekdays,f=i.months,h=function(t,r,i,s){return t&&(t[r]||t(e,n))||i[r].substr(0,s)},d=function(t){return g.s(s%12||12,t,"0")},$=i.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},l={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:g.s(a+1,2,"0"),MMM:h(i.monthsShort,a,f,3),MMMM:h(f,a),D:this.$D,DD:g.s(this.$D,2,"0"),d:String(this.$W),dd:h(i.weekdaysMin,this.$W,o,2),ddd:h(i.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(s),HH:g.s(s,2,"0"),h:d(1),hh:d(2),a:$(s,u,!0),A:$(s,u,!1),m:String(u),mm:g.s(u,2,"0"),s:String(this.$s),ss:g.s(this.$s,2,"0"),SSS:g.s(this.$ms,3,"0"),Z:r};return n.replace(c,function(t,e){return e||l[t]||r.replace(":","")})},$.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},$.diff=function(t,f,h){var c,d=g.p(f),$=v(t),l=6e4*($.utcOffset()-this.utcOffset()),y=this-$,M=g.m(this,$);return M=(c={},c[o]=M/12,c[u]=M,c[a]=M/3,c[s]=(y-l)/6048e5,c[i]=(y-l)/864e5,c[r]=y/36e5,c[n]=y/6e4,c[e]=y/1e3,c)[d]||y,h?M:g.a(M)},$.daysInMonth=function(){return this.endOf(u).$D},$.$locale=function(){return M[this.$L]},$.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=D(t,e,!0);return r&&(n.$L=r),n},$.clone=function(){return g.w(this.$d,this)},$.toDate=function(){return new Date(this.valueOf())},$.toJSON=function(){return this.isValid()?this.toISOString():null},$.toISOString=function(){return this.$d.toISOString()},$.toString=function(){return this.$d.toUTCString()},d}(),p=S.prototype;return v.prototype=p,[["$ms",t],["$s",e],["$m",n],["$H",r],["$W",i],["$M",u],["$y",o],["$D",f]].forEach(function(t){p[t[1]]=function(e){return this.$g(e,t[0],t[1])};}),v.extend=function(t,e){return t.$i||(t(e,S,v),t.$i=!0),v},v.locale=D,v.isDayjs=m,v.unix=function(t){return v(1e3*t)},v.en=M[y],v.Ls=M,v.p={},v});
  });

  var Plan = /*#__PURE__*/function () {
    function Plan(options) {
      _classCallCheck(this, Plan);

      _defineProperty(this, "start", void 0);

      _defineProperty(this, "end", void 0);

      _defineProperty(this, "progress", void 0);

      _defineProperty(this, "height", void 0);

      _defineProperty(this, "label", void 0);

      _defineProperty(this, "progressStyle", void 0);

      _defineProperty(this, "backgroundStyle", void 0);

      _defineProperty(this, "labelStyle", void 0);

      _defineProperty(this, "name", void 0);

      _defineProperty(this, "startText", void 0);

      _defineProperty(this, "endText", void 0);

      this.start = dayjs_min(options.start);
      this.end = dayjs_min(options.end);
      this.progress = options.progress || 0;
      this.height = options.height || 30;
      this.label = options.label;
      this.progressStyle = deepmerge({
        fill: '#f2c329'
      }, options.progressStyle || {});
      this.backgroundStyle = deepmerge({
        fill: '#acacac'
      }, options.backgroundStyle || {});
      this.labelStyle = deepmerge({}, options.labelStyle || {});

      if (options.name) {
        this.name = getLabelOptions(options.name);
      }

      if (options.startText) {
        this.startText = getLabelOptions(options.startText);
      }

      if (options.endText) {
        this.endText = getLabelOptions(options.endText);
      }
    }

    _createClass(Plan, [{
      key: "render",
      value: function render(parent, x) {
        var layer = parent.append('g').attr('class', 'plan');
        this.drawBackground(layer, x);
        this.drawProgress(layer, x);

        if (this.name) {
          this.drawName(layer, x);
        }

        if (this.startText || this.endText) {
          this.drawSideText(layer, x);
        }
      }
    }, {
      key: "drawBackground",
      value: function drawBackground(group, x) {
        var rect = group.append('rect').attr('x', x(this.start)).attr('y', 0).attr('height', this.height).attr('width', x(this.end) - x(this.start));
        applyStyle(rect, this.backgroundStyle);
      }
    }, {
      key: "drawProgress",
      value: function drawProgress(group, x) {
        var rect = group.append('rect').attr('x', x(this.start.toDate())).attr('y', 0).attr('height', this.height).attr('width', (x(this.end) - x(this.start)) * clamp(this.progress / 100));
        applyStyle(rect, this.progressStyle);
      }
    }, {
      key: "drawName",
      value: function drawName(group, x) {
        var text = group.append('text').attr('x', x(this.start)).attr('y', 0).text(this.name.label);

        if (this.name.labelStyle) {
          applyStyle(text, this.name.labelStyle, false);
        }

        var bbox = text.node().getBoundingClientRect();
        var y = this.height / 2 + bbox.height / 2;
        text.attr('y', y);
        var planWidth = x(this.end) - x(this.start);

        if (bbox.width + 5 < planWidth) {
          var newX = planWidth / 2 - bbox.width / 2 + x(this.start);
          text.attr('x', newX);
        } else {
          text.attr('x', x(this.end) + 5);
        }
      }
    }, {
      key: "drawSideText",
      value: function drawSideText(layer, x) {
        var startLabel, endLabel, startBBox, endBBox;

        if (this.startText) {
          startLabel = layer.append('text').attr('x', x(this.start)).text(this.startText.label);

          if (this.startText.labelStyle) {
            applyStyle(startLabel, this.startText.labelStyle, false);
          }

          startBBox = startLabel.node().getBoundingClientRect();
          var y = this.height / 2 + startBBox.height / 4;
          startLabel.attr('y', y);
        }

        if (this.endText) {
          endLabel = layer.append('text').attr('x', x(this.end)).text(this.endText.label);

          if (this.endText.labelStyle) {
            applyStyle(endLabel, this.endText.labelStyle, false);
          }

          endBBox = endLabel.node().getBoundingClientRect();

          var _y = this.height / 2 + endBBox.height / 4;

          endLabel.attr('y', _y);
        }

        var planWidth = x(this.end) - x(this.start);

        if (startLabel && endLabel) {
          if (!(startBBox.width + endBBox.width + 5 < planWidth)) {
            startLabel.attr('x', x(this.start) - startBBox.width);
          } else {
            endLabel.attr('x', x(this.end) - endBBox.width);
          }
        } else if (startLabel) {
          if (!(startBBox.width + 5 < planWidth)) {
            startLabel.attr('x', x(this.start) - startBBox.width);
          }
        } else {
          if (endBBox.width + 5 < planWidth) {
            endBBox.attr('x', x(this.end) - startBBox.width);
          }
        }
      }
    }]);

    return Plan;
  }();

  var ShapeType;

  (function (ShapeType) {
    ShapeType["SQUARE"] = "square";
    ShapeType["CIRCLE"] = "circle";
    ShapeType["TRIANGLE"] = "triangle";
    ShapeType["ARROW"] = "arrow";
    ShapeType["STAR"] = "star";
  })(ShapeType || (ShapeType = {}));

  var isImage = function isImage(obj) {
    return 'href' in obj;
  };
  var isShape = function isShape(obj) {
    return 'shape' in obj;
  };
  var isLine = function isLine(obj) {
    return 'start' in obj && 'end' in obj;
  };
  var VIEW_MODE;

  (function (VIEW_MODE) {
    VIEW_MODE["DAY"] = "day";
    VIEW_MODE["WEEK"] = "week";
    VIEW_MODE["MONTH"] = "month";
    VIEW_MODE["YEAR"] = "year";
    VIEW_MODE["FILL"] = "fill";
  })(VIEW_MODE || (VIEW_MODE = {}));

  var Milestone = /*#__PURE__*/function () {
    function Milestone(options) {
      _classCallCheck(this, Milestone);

      _defineProperty(this, "x", void 0);

      _defineProperty(this, "y", void 0);

      _defineProperty(this, "image", void 0);

      _defineProperty(this, "line", void 0);

      _defineProperty(this, "shape", void 0);

      this.y = options.y;
      this.x = options.x;

      if (isImage(options)) {
        this.image = {
          date: dayjs_min(options.date),
          href: options.href,
          width: options.width || 15,
          height: options.height || 15,
          style: deepmerge({}, options.style || {})
        };
      } else if (isLine(options)) {
        this.line = {
          start: dayjs_min(options.start),
          end: dayjs_min(options.end),
          style: deepmerge({
            stroke: 'black'
          }, options.style || {})
        };
      } else if (isShape(options)) {
        this.shape = {
          date: dayjs_min(options.date),
          shape: options.shape,
          width: options.width || 15,
          height: options.height || 15,
          rotate: options.rotate || 0,
          style: deepmerge({
            stroke: '#000',
            fill: '#fff',
            'stroke-width': 2,
            'stroke-linejoin': "miter"
          }, options.style || {})
        };
      }
    }

    _createClass(Milestone, [{
      key: "render",
      value: function render(x, layer, height) {
        if (this.image) {
          var y = this.y || (height - this.image.height) / 2;
          var image = layer.append('image').attr('href', this.image.href).attr('height', this.image.height).attr('width', this.image.width).attr('x', x(this.image.date) - this.image.width / 2).attr('y', y);
          applyStyle(image, this.image.style);
        } else if (this.line) {
          var _y = this.y || height / 2;

          var line = layer.append('line').attr('x1', x(this.line.start)).attr('x2', x(this.line.end)).attr('y1', _y).attr('y2', _y);
          applyStyle(line, this.line.style);
        } else if (this.shape) {
          var _y2 = this.y || (height - this.shape.height) / 2;

          var shape = null;

          switch (this.shape.shape) {
            case ShapeType.SQUARE:
              {
                shape = layer.append('rect').attr('x', x(this.shape.date) - this.shape.width / 2).attr('y', _y2).attr('width', this.shape.width).attr('height', this.shape.height);
                break;
              }

            case ShapeType.CIRCLE:
              {
                shape = layer.append('ellipse').attr('cx', x(this.shape.date)).attr('cy', height / 2).attr('rx', this.shape.width / 2).attr('ry', this.shape.height / 2);
                break;
              }

            case ShapeType.TRIANGLE:
              {
                shape = layer.append('svg').attr('width', this.shape.width).attr('height', this.shape.height).attr('preserveAspectRatio', 'none').attr('x', x(this.shape.date) - this.shape.width / 2).attr('y', _y2).attr('viewBox', '0 0 20 20').append('g').attr('transform', "translate(10, 10)").append('g').attr('transform', "rotate(".concat(this.shape.rotate, ")")).append('polygon').attr('points', '10,2 2,18 18,18').attr('transform', "translate(-10, -10)");
                break;
              }

            case ShapeType.STAR:
              {
                shape = layer.append('svg').attr('width', this.shape.width).attr('height', this.shape.height).attr('x', x(this.shape.date) - this.shape.width / 2).attr('y', _y2).attr('preserveAspectRatio', 'none').attr('viewBox', '0 0 20 20').append('polygon').attr('points', "10,1 12,8, 19,8, 13.5,12 15.5,19 10,15, 4.5,19 6.5,12 1,8 8,8");
              }
          }

          if (shape) {
            applyStyle(shape, this.shape.style);
          }
        }
      }
    }]);

    return Milestone;
  }();

  var check = function (it) {
    return it && it.Math == Math && it;
  };

  // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
  var global$2 =
    // eslint-disable-next-line no-undef
    check(typeof globalThis == 'object' && globalThis) ||
    check(typeof window == 'object' && window) ||
    check(typeof self == 'object' && self) ||
    check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
    // eslint-disable-next-line no-new-func
    (function () { return this; })() || Function('return this')();

  var fails = function (exec) {
    try {
      return !!exec();
    } catch (error) {
      return true;
    }
  };

  // Detect IE8's incomplete defineProperty implementation
  var descriptors = !fails(function () {
    return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
  });

  var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
  var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

  // Nashorn ~ JDK8 bug
  var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

  // `Object.prototype.propertyIsEnumerable` method implementation
  // https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
  var f = NASHORN_BUG ? function propertyIsEnumerable(V) {
    var descriptor = getOwnPropertyDescriptor(this, V);
    return !!descriptor && descriptor.enumerable;
  } : nativePropertyIsEnumerable;

  var objectPropertyIsEnumerable = {
  	f: f
  };

  var createPropertyDescriptor = function (bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  };

  var toString = {}.toString;

  var classofRaw = function (it) {
    return toString.call(it).slice(8, -1);
  };

  var split = ''.split;

  // fallback for non-array-like ES3 and non-enumerable old V8 strings
  var indexedObject = fails(function () {
    // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
    // eslint-disable-next-line no-prototype-builtins
    return !Object('z').propertyIsEnumerable(0);
  }) ? function (it) {
    return classofRaw(it) == 'String' ? split.call(it, '') : Object(it);
  } : Object;

  // `RequireObjectCoercible` abstract operation
  // https://tc39.es/ecma262/#sec-requireobjectcoercible
  var requireObjectCoercible = function (it) {
    if (it == undefined) throw TypeError("Can't call method on " + it);
    return it;
  };

  // toObject with fallback for non-array-like ES3 strings



  var toIndexedObject = function (it) {
    return indexedObject(requireObjectCoercible(it));
  };

  var isObject = function (it) {
    return typeof it === 'object' ? it !== null : typeof it === 'function';
  };

  // `ToPrimitive` abstract operation
  // https://tc39.es/ecma262/#sec-toprimitive
  // instead of the ES6 spec version, we didn't implement @@toPrimitive case
  // and the second argument - flag - preferred type is a string
  var toPrimitive = function (input, PREFERRED_STRING) {
    if (!isObject(input)) return input;
    var fn, val;
    if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
    if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
    if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
    throw TypeError("Can't convert object to primitive value");
  };

  var hasOwnProperty = {}.hasOwnProperty;

  var has = function (it, key) {
    return hasOwnProperty.call(it, key);
  };

  var document$1 = global$2.document;
  // typeof document.createElement is 'object' in old IE
  var EXISTS = isObject(document$1) && isObject(document$1.createElement);

  var documentCreateElement = function (it) {
    return EXISTS ? document$1.createElement(it) : {};
  };

  // Thank's IE8 for his funny defineProperty
  var ie8DomDefine = !descriptors && !fails(function () {
    return Object.defineProperty(documentCreateElement('div'), 'a', {
      get: function () { return 7; }
    }).a != 7;
  });

  var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
  var f$1 = descriptors ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
    O = toIndexedObject(O);
    P = toPrimitive(P, true);
    if (ie8DomDefine) try {
      return nativeGetOwnPropertyDescriptor(O, P);
    } catch (error) { /* empty */ }
    if (has(O, P)) return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
  };

  var objectGetOwnPropertyDescriptor = {
  	f: f$1
  };

  var replacement = /#|\.prototype\./;

  var isForced = function (feature, detection) {
    var value = data[normalize(feature)];
    return value == POLYFILL ? true
      : value == NATIVE ? false
      : typeof detection == 'function' ? fails(detection)
      : !!detection;
  };

  var normalize = isForced.normalize = function (string) {
    return String(string).replace(replacement, '.').toLowerCase();
  };

  var data = isForced.data = {};
  var NATIVE = isForced.NATIVE = 'N';
  var POLYFILL = isForced.POLYFILL = 'P';

  var isForced_1 = isForced;

  var path = {};

  var aFunction = function (it) {
    if (typeof it != 'function') {
      throw TypeError(String(it) + ' is not a function');
    } return it;
  };

  // optional / simple context binding
  var functionBindContext = function (fn, that, length) {
    aFunction(fn);
    if (that === undefined) return fn;
    switch (length) {
      case 0: return function () {
        return fn.call(that);
      };
      case 1: return function (a) {
        return fn.call(that, a);
      };
      case 2: return function (a, b) {
        return fn.call(that, a, b);
      };
      case 3: return function (a, b, c) {
        return fn.call(that, a, b, c);
      };
    }
    return function (/* ...args */) {
      return fn.apply(that, arguments);
    };
  };

  var anObject = function (it) {
    if (!isObject(it)) {
      throw TypeError(String(it) + ' is not an object');
    } return it;
  };

  var nativeDefineProperty = Object.defineProperty;

  // `Object.defineProperty` method
  // https://tc39.es/ecma262/#sec-object.defineproperty
  var f$2 = descriptors ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
    anObject(O);
    P = toPrimitive(P, true);
    anObject(Attributes);
    if (ie8DomDefine) try {
      return nativeDefineProperty(O, P, Attributes);
    } catch (error) { /* empty */ }
    if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
    if ('value' in Attributes) O[P] = Attributes.value;
    return O;
  };

  var objectDefineProperty = {
  	f: f$2
  };

  var createNonEnumerableProperty = descriptors ? function (object, key, value) {
    return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
  } : function (object, key, value) {
    object[key] = value;
    return object;
  };

  var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;






  var wrapConstructor = function (NativeConstructor) {
    var Wrapper = function (a, b, c) {
      if (this instanceof NativeConstructor) {
        switch (arguments.length) {
          case 0: return new NativeConstructor();
          case 1: return new NativeConstructor(a);
          case 2: return new NativeConstructor(a, b);
        } return new NativeConstructor(a, b, c);
      } return NativeConstructor.apply(this, arguments);
    };
    Wrapper.prototype = NativeConstructor.prototype;
    return Wrapper;
  };

  /*
    options.target      - name of the target object
    options.global      - target is the global object
    options.stat        - export as static methods of target
    options.proto       - export as prototype methods of target
    options.real        - real prototype method for the `pure` version
    options.forced      - export even if the native feature is available
    options.bind        - bind methods to the target, required for the `pure` version
    options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
    options.unsafe      - use the simple assignment of property instead of delete + defineProperty
    options.sham        - add a flag to not completely full polyfills
    options.enumerable  - export as enumerable property
    options.noTargetGet - prevent calling a getter on target
  */
  var _export = function (options, source) {
    var TARGET = options.target;
    var GLOBAL = options.global;
    var STATIC = options.stat;
    var PROTO = options.proto;

    var nativeSource = GLOBAL ? global$2 : STATIC ? global$2[TARGET] : (global$2[TARGET] || {}).prototype;

    var target = GLOBAL ? path : path[TARGET] || (path[TARGET] = {});
    var targetPrototype = target.prototype;

    var FORCED, USE_NATIVE, VIRTUAL_PROTOTYPE;
    var key, sourceProperty, targetProperty, nativeProperty, resultProperty, descriptor;

    for (key in source) {
      FORCED = isForced_1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
      // contains in native
      USE_NATIVE = !FORCED && nativeSource && has(nativeSource, key);

      targetProperty = target[key];

      if (USE_NATIVE) if (options.noTargetGet) {
        descriptor = getOwnPropertyDescriptor$1(nativeSource, key);
        nativeProperty = descriptor && descriptor.value;
      } else nativeProperty = nativeSource[key];

      // export native or implementation
      sourceProperty = (USE_NATIVE && nativeProperty) ? nativeProperty : source[key];

      if (USE_NATIVE && typeof targetProperty === typeof sourceProperty) continue;

      // bind timers to global for call from export context
      if (options.bind && USE_NATIVE) resultProperty = functionBindContext(sourceProperty, global$2);
      // wrap global constructors for prevent changs in this version
      else if (options.wrap && USE_NATIVE) resultProperty = wrapConstructor(sourceProperty);
      // make static versions for prototype methods
      else if (PROTO && typeof sourceProperty == 'function') resultProperty = functionBindContext(Function.call, sourceProperty);
      // default case
      else resultProperty = sourceProperty;

      // add a flag to not completely full polyfills
      if (options.sham || (sourceProperty && sourceProperty.sham) || (targetProperty && targetProperty.sham)) {
        createNonEnumerableProperty(resultProperty, 'sham', true);
      }

      target[key] = resultProperty;

      if (PROTO) {
        VIRTUAL_PROTOTYPE = TARGET + 'Prototype';
        if (!has(path, VIRTUAL_PROTOTYPE)) {
          createNonEnumerableProperty(path, VIRTUAL_PROTOTYPE, {});
        }
        // export virtual prototype methods
        path[VIRTUAL_PROTOTYPE][key] = sourceProperty;
        // export real prototype methods
        if (options.real && targetPrototype && !targetPrototype[key]) {
          createNonEnumerableProperty(targetPrototype, key, sourceProperty);
        }
      }
    }
  };

  // `IsArray` abstract operation
  // https://tc39.es/ecma262/#sec-isarray
  var isArray = Array.isArray || function isArray(arg) {
    return classofRaw(arg) == 'Array';
  };

  var ceil = Math.ceil;
  var floor = Math.floor;

  // `ToInteger` abstract operation
  // https://tc39.es/ecma262/#sec-tointeger
  var toInteger = function (argument) {
    return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
  };

  var min = Math.min;

  // `ToLength` abstract operation
  // https://tc39.es/ecma262/#sec-tolength
  var toLength = function (argument) {
    return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
  };

  // `FlattenIntoArray` abstract operation
  // https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray
  var flattenIntoArray = function (target, original, source, sourceLen, start, depth, mapper, thisArg) {
    var targetIndex = start;
    var sourceIndex = 0;
    var mapFn = mapper ? functionBindContext(mapper, thisArg, 3) : false;
    var element;

    while (sourceIndex < sourceLen) {
      if (sourceIndex in source) {
        element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];

        if (depth > 0 && isArray(element)) {
          targetIndex = flattenIntoArray(target, original, element, toLength(element.length), targetIndex, depth - 1) - 1;
        } else {
          if (targetIndex >= 0x1FFFFFFFFFFFFF) throw TypeError('Exceed the acceptable array length');
          target[targetIndex] = element;
        }

        targetIndex++;
      }
      sourceIndex++;
    }
    return targetIndex;
  };

  var flattenIntoArray_1 = flattenIntoArray;

  // `ToObject` abstract operation
  // https://tc39.es/ecma262/#sec-toobject
  var toObject = function (argument) {
    return Object(requireObjectCoercible(argument));
  };

  var setGlobal = function (key, value) {
    try {
      createNonEnumerableProperty(global$2, key, value);
    } catch (error) {
      global$2[key] = value;
    } return value;
  };

  var SHARED = '__core-js_shared__';
  var store = global$2[SHARED] || setGlobal(SHARED, {});

  var sharedStore = store;

  var shared = createCommonjsModule(function (module) {
  (module.exports = function (key, value) {
    return sharedStore[key] || (sharedStore[key] = value !== undefined ? value : {});
  })('versions', []).push({
    version: '3.8.2',
    mode:  'pure' ,
    copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
  });
  });

  var id = 0;
  var postfix = Math.random();

  var uid$1 = function (key) {
    return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
  };

  var nativeSymbol = !!Object.getOwnPropertySymbols && !fails(function () {
    // Chrome 38 Symbol has incorrect toString conversion
    // eslint-disable-next-line no-undef
    return !String(Symbol());
  });

  var useSymbolAsUid = nativeSymbol
    // eslint-disable-next-line no-undef
    && !Symbol.sham
    // eslint-disable-next-line no-undef
    && typeof Symbol.iterator == 'symbol';

  var WellKnownSymbolsStore = shared('wks');
  var Symbol$1 = global$2.Symbol;
  var createWellKnownSymbol = useSymbolAsUid ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid$1;

  var wellKnownSymbol = function (name) {
    if (!has(WellKnownSymbolsStore, name)) {
      if (nativeSymbol && has(Symbol$1, name)) WellKnownSymbolsStore[name] = Symbol$1[name];
      else WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
    } return WellKnownSymbolsStore[name];
  };

  var SPECIES = wellKnownSymbol('species');

  // `ArraySpeciesCreate` abstract operation
  // https://tc39.es/ecma262/#sec-arrayspeciescreate
  var arraySpeciesCreate = function (originalArray, length) {
    var C;
    if (isArray(originalArray)) {
      C = originalArray.constructor;
      // cross-realm fallback
      if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
      else if (isObject(C)) {
        C = C[SPECIES];
        if (C === null) C = undefined;
      }
    } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
  };

  // `Array.prototype.flat` method
  // https://tc39.es/ecma262/#sec-array.prototype.flat
  _export({ target: 'Array', proto: true }, {
    flat: function flat(/* depthArg = 1 */) {
      var depthArg = arguments.length ? arguments[0] : undefined;
      var O = toObject(this);
      var sourceLen = toLength(O.length);
      var A = arraySpeciesCreate(O, 0);
      A.length = flattenIntoArray_1(A, O, O, sourceLen, 0, depthArg === undefined ? 1 : toInteger(depthArg));
      return A;
    }
  });

  var aFunction$1 = function (variable) {
    return typeof variable == 'function' ? variable : undefined;
  };

  var getBuiltIn = function (namespace, method) {
    return arguments.length < 2 ? aFunction$1(path[namespace]) || aFunction$1(global$2[namespace])
      : path[namespace] && path[namespace][method] || global$2[namespace] && global$2[namespace][method];
  };

  var entryUnbind = getBuiltIn;

  var flat = entryUnbind('Array', 'flat');

  var flat$1 = flat;

  var max = Math.max;
  var min$1 = Math.min;

  // Helper for a popular repeating case of the spec:
  // Let integer be ? ToInteger(index).
  // If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
  var toAbsoluteIndex = function (index, length) {
    var integer = toInteger(index);
    return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
  };

  // `Array.prototype.fill` method implementation
  // https://tc39.es/ecma262/#sec-array.prototype.fill
  var arrayFill = function fill(value /* , start = 0, end = @length */) {
    var O = toObject(this);
    var length = toLength(O.length);
    var argumentsLength = arguments.length;
    var index = toAbsoluteIndex(argumentsLength > 1 ? arguments[1] : undefined, length);
    var end = argumentsLength > 2 ? arguments[2] : undefined;
    var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
    while (endPos > index) O[index++] = value;
    return O;
  };

  // `Array.prototype.fill` method
  // https://tc39.es/ecma262/#sec-array.prototype.fill
  _export({ target: 'Array', proto: true }, {
    fill: arrayFill
  });

  var fill = entryUnbind('Array', 'fill');

  var fill$1 = fill;

  var Task = /*#__PURE__*/function () {
    function Task(options, config) {
      var _this = this;

      _classCallCheck(this, Task);

      _defineProperty(this, "rows", void 0);

      _defineProperty(this, "milestones", void 0);

      _defineProperty(this, "heights", void 0);

      _defineProperty(this, "labels", void 0);

      _defineProperty(this, "options", void 0);

      _defineProperty(this, "config", void 0);

      _defineProperty(this, "id", void 0);

      _defineProperty(this, "minDate", void 0);

      _defineProperty(this, "maxDate", void 0);

      this.id = uid();
      this.rows = [];
      this.config = config;

      if (options.plan) {
        this.rows = [[new Plan(options.plan)]];
      } else if (options.plans && Array.isArray(options.plans)) {
        // @ts-ignore
        this.rows = options.plans.map(function (p) {
          if (!Array.isArray(p)) {
            return [new Plan(p)];
          }

          return p.map(function (pl) {
            return new Plan(pl);
          });
        });
      } else if (options.plans) {
        console.error('Plans object is not an array');
      }

      this.milestones = [];

      if (options.milestones && Array.isArray(options.milestones)) {
        // @ts-ignore
        this.milestones = options.milestones.map(function (m) {
          if (!Array.isArray(m)) {
            return [new Milestone(m)];
          }

          return m.map(function (ml) {
            return new Milestone(ml);
          });
        });
      }

      if (this.milestones.length > this.rows.length) {
        var _fill = Array.from({
          length: this.milestones.length - this.rows.length
        }, function () {
          return [];
        });

        this.rows = this.rows.concat(_fill);
      } else if (this.rows.length > this.milestones.length) {
        var _fill2 = Array.from({
          length: this.rows.length - this.milestones.length
        }, function () {
          return [];
        });

        this.milestones = this.milestones.concat(_fill2);
      }

      var plans = flat$1(this.rows, 3);
      var milestones = flat$1(this.milestones, 3);
      var iconMilestones = milestones.filter(function (m) {
        return m.date;
      }).map(function (m) {
        return m.date;
      });
      var startDates = plans.map(function (p) {
        return p.start;
      }).concat(iconMilestones);
      var endDates = plans.map(function (p) {
        return p.end;
      }).concat(iconMilestones);
      this.minDate = dayjs_min.min(startDates);
      this.maxDate = dayjs_min.max(endDates);
      this.options = options;
      this.computeRowHeights();
      this.labels = {};
      if (config.columns.length == 0) return;
      config.columns.forEach(function (c, idx) {
        _this.labels[c.field] = _this.prepareOptions(c);
      });

      if (this.options.collapsible) {
        this.config.eventbus.on(Events.TOGGLE, function (id) {
          if (id == _this.id) {
            _this.toggle();
          }
        }, Priority.HIGH);
        this.config.eventbus.on(Events.COLLAPSE, function () {
          if (_this.options.collapsed) {
            _this.collapse();
          }
        }, Priority.HIGH);
      }
    }

    _createClass(Task, [{
      key: "computeRowHeights",
      value: function computeRowHeights() {
        this.heights = this.rows.map(function (row) {
          return row.map(function (plan) {
            return plan.height;
          });
        }).map(function (row) {
          return Math.max.apply(null, row);
        });
      }
    }, {
      key: "getHeight",
      value: function getHeight() {
        if (this.options.collapsed) {
          return this.heights[0];
        }

        return this.heights.reduce(function (a, b) {
          return a + b;
        });
      }
    }, {
      key: "renderDivs",
      value: function renderDivs(x, y, group, offset) {
        var _this2 = this;

        group.attr('data-id', this.id);
        this.rows.forEach(function (row, idx) {
          var rowHeight = _this2.heights[idx];
          var div = group.append('div').style('height', rowHeight).style('width', offset.x).attr('class', 'task-row').style('background-color', '#fff');
          var svg = div.append('svg').attr('height', _this2.heights[idx]).attr('width', offset.x);
          row.forEach(function (plan) {
            plan.render(svg, x);
          });
          var mRow = _this2.milestones[idx];
          mRow.forEach(function (milestone) {
            milestone.render(x, svg, rowHeight);
          });
        });
      }
    }, {
      key: "prepareOptions",
      value: function prepareOptions(columnOptions) {
        var options = this.options[columnOptions.field];
        if (!options) return [];

        if (typeof options == 'string' || typeof options == 'number') {
          options = {
            label: options
          };
        }

        if (options.label) {
          options = [options];
        }

        console.assert(Array.isArray(options), "Column options isn't a string, array, nor label");
        options.forEach(function (v, idx) {
          if (typeof v == 'string' || typeof v == 'number') {
            v = {
              label: v
            };
          }

          options[idx] = v;
          var defaults = columnOptions.defaults || {};

          if (defaults) {
            v.labelStyle = deepmerge.all([{
              color: '#000000'
            }, defaults.labelStyle || {}, v.labelStyle || {}]);
            v.backgroundStyle = deepmerge(defaults.backgroundStyle || {}, v.backgroundStyle || {});
          }
        });

        if (options.length < this.rows.length) {
          options = fill$1(options.concat(new Array(this.rows.length - options.length)), {});
        }

        if (options.length > this.rows.length) {
          options = options.slice(0, this.rows.length);
        }

        return options;
      }
    }, {
      key: "getTaskSubColumns",
      value: function getTaskSubColumns() {
        return this.config.wrapper.selectAll("div[data-id=\"".concat(this.id, "\"]")).selectAll('.column-plan:not(:first-child)');
      }
    }, {
      key: "getTaskSubRows",
      value: function getTaskSubRows() {
        return this.config.wrapper.selectAll("div[data-id=\"".concat(this.id, "\"]")).selectAll('.task-row:not(:first-child)');
      }
    }, {
      key: "collapse",
      value: function collapse() {
        this.getTaskSubColumns().style('display', 'none');
        this.getTaskSubRows().style('display', 'none');
        this.config.wrapper.select("a[data-id=\"".concat(this.id, "\"]")).attr('class', 'task-expand');
      }
    }, {
      key: "expand",
      value: function expand() {
        this.getTaskSubColumns().style('display', 'flex');
        this.getTaskSubRows().style('display', 'flex');
        this.config.wrapper.select("a[data-id=\"".concat(this.id, "\"]")).attr('class', 'task-collapse');
      }
    }, {
      key: "toggle",
      value: function toggle() {
        if (this.options.collapsed) {
          this.expand();
          this.options.collapsed = false;
        } else {
          this.collapse();
          this.options.collapsed = true;
        }

        return !!this.options.collapsed;
      }
    }, {
      key: "getButtonCls",
      value: function getButtonCls() {
        return this.options.collapsed ? 'task-expand' : 'task-collapse';
      }
    }]);

    return Task;
  }();

  var minMax = createCommonjsModule(function (module, exports) {
  !function(n,e){module.exports=e();}(commonjsGlobal,function(){return function(n,e,t){var i=function(n,e){if(!e||!e.length||!e[0]||1===e.length&&!e[0].length)return null;var t;1===e.length&&e[0].length>0&&(e=e[0]),t=e[0];for(var i=1;i<e.length;i+=1)e[i].isValid()&&!e[i][n](t)||(t=e[i]);return t};t.max=function(){var n=[].slice.call(arguments,0);return i("isAfter",n)},t.min=function(){var n=[].slice.call(arguments,0);return i("isBefore",n)};}});
  });

  var View = /*#__PURE__*/function () {
    function View(selector, taskOptions, config) {
      var _this = this;

      _classCallCheck(this, View);

      _defineProperty(this, "x", void 0);

      _defineProperty(this, "y", void 0);

      _defineProperty(this, "groups", void 0);

      _defineProperty(this, "parent", void 0);

      _defineProperty(this, "tasks", void 0);

      _defineProperty(this, "minDate", void 0);

      _defineProperty(this, "maxDate", void 0);

      _defineProperty(this, "config", void 0);

      _defineProperty(this, "columns", void 0);

      _defineProperty(this, "left", void 0);

      _defineProperty(this, "right", void 0);

      _defineProperty(this, "border", void 0);

      _defineProperty(this, "bodyHeader", void 0);

      _defineProperty(this, "headerSvg", void 0);

      _defineProperty(this, "bodyHolder", void 0);

      _defineProperty(this, "columnsBody", void 0);

      _defineProperty(this, "columnsHeader", void 0);

      _defineProperty(this, "highlights", void 0);

      dayjs_min.extend(minMax);

      if (!Array.isArray(taskOptions) || taskOptions.length == 0) {
        console.warn('Tasks required to be an array of data');
        return;
      }

      this.config = config;
      this.tasks = taskOptions.map(function (t) {
        return new Task(t, _this.config);
      });
      this.columns = new Columns(this.tasks, this.config);
      var owner = d3.select(document.body.querySelector(selector));
      owner.html("");
      this.parent = owner.append('div').style('display', 'flex').style('flex-direction', 'row').style('align-items', 'stretch').style('width', '100%').style('height', '100%').style('overflow', 'hidden').style('background-color', 'white');
      config.wrapper = this.parent;

      var updateHeight = function updateHeight() {
        var heights = _this.tasks.map(function (t) {
          return t.getHeight();
        });

        var a = heights.reduce(function (a, b) {
          return a + b;
        });
        var b = _this.tasks.length * _this.config.taskMargin;

        if (_this.config.highlights && _this.config.highlights.length > 0) {
          _this.highlights.attr('height', a + b);
        }

        _this.border.style('height', a + b + 30);
      };

      this.config.eventbus.on(Events.TOGGLE, updateHeight, Priority.LOW);
      this.config.eventbus.on(Events.COLLAPSE, updateHeight, Priority.LOW);
      var renderer = debounce(function () {
        return _this.render();
      }, 150);
      var obeserver = new index(function () {
        return renderer();
      });
      obeserver.observe(owner.node());
    }

    _createClass(View, [{
      key: "createDom",
      value: function createDom() {
        var _this2 = this;

        this.parent.html("");
        this.left = this.parent.append('div').style('display', 'flex').style('flex-direction', 'column').style('overflow', 'hidden').style('flex-shrink', 0);
        this.columnsHeader = this.left.append('div').style('min-height', 30).style('display', 'flex').style('background-color', '#fff'); // .style('border-right', '1px solid #000')

        this.columnsBody = this.left.append('div').style('flex-direction', 'row').style('display', 'flex').style('overflow', 'hidden'); // .style('border-right', '1px solid #000')

        var rightRapper = this.parent.append('div').style('display', 'flex').style('flex', 1).style('overflow', 'hidden');
        this.border = rightRapper.append('div').style('position', 'relative').style('border-right', '1px solid black').style('overflow', 'hidden');
        this.right = rightRapper.append('div').style('position', 'relative').style('flex', 1).style('display', 'flex').style('flex-direction', 'column').style('align-items', 'stretch').style('overflow', 'hidden');
        this.bodyHeader = this.right.append('div').style('overflow', 'hidden').style('padding-right', '18px').style('background-color', '#fff');
        this.headerSvg = this.bodyHeader.append('svg').attr('height', 30);
        this.bodyHolder = this.right.append('div').style('flex', 1).style('overflow-y', 'auto').style('position', 'relative');
        this.highlights = this.bodyHolder.append('svg').style('position', 'absolute').style('left', 0).style('top', 0).style('pointer-events', 'none');
        this.bodyHolder.node().addEventListener('scroll', function (event) {
          _this2.updateScroll(event.target.scrollLeft, event.target.scrollTop);
        });
      }
    }, {
      key: "updateScroll",
      value: function updateScroll(left, top) {
        this.columnsBody.node().scrollTop = top;
        this.bodyHeader.node().scrollLeft = left;
      }
    }, {
      key: "computeBoundingDates",
      value: function computeBoundingDates() {
        var startDates = this.tasks.map(function (d) {
          return d.minDate;
        });
        var endDates = this.tasks.map(function (d) {
          return d.maxDate;
        });
        this.minDate = dayjs_min.min(startDates);
        this.maxDate = dayjs_min.max(endDates);

        switch (this.config.viewMode || VIEW_MODE.WEEK) {
          case VIEW_MODE.DAY:
            this.maxDate = this.maxDate.add(1, 'day');
            break;

          case VIEW_MODE.MONTH:
            this.maxDate = this.maxDate.add(1, 'month');
            break;

          case VIEW_MODE.YEAR:
            this.maxDate = this.maxDate.add(1, 'year');
            break;

          case VIEW_MODE.FILL:
            this.maxDate = this.maxDate.add(1, 'day');
            break;

          case VIEW_MODE.WEEK:
          default:
            this.maxDate = this.maxDate.add(1, 'week');
            break;
        }
      }
    }, {
      key: "getDateDiff",
      value: function getDateDiff() {
        switch (this.config.viewMode || VIEW_MODE.WEEK) {
          case VIEW_MODE.DAY:
            return Math.ceil(this.maxDate.diff(this.minDate, 'day'));

          case VIEW_MODE.MONTH:
            return Math.ceil(this.maxDate.diff(this.minDate, 'month'));

          case VIEW_MODE.YEAR:
            return Math.ceil(this.maxDate.diff(this.minDate, 'year'));

          case VIEW_MODE.FILL:
            return 1;

          case VIEW_MODE.WEEK:
          default:
            return Math.ceil(this.maxDate.diff(this.minDate, 'week'));
        }
      }
    }, {
      key: "getDateWidth",
      value: function getDateWidth() {
        switch (this.config.viewMode || VIEW_MODE.WEEK) {
          case VIEW_MODE.DAY:
            return 30;

          case VIEW_MODE.WEEK:
            return 80;

          case VIEW_MODE.MONTH:
            return 100;

          case VIEW_MODE.YEAR:
            return 365;

          default:
            return 1;
        }
      }
    }, {
      key: "computeSize",
      value: function computeSize(viewport) {
        var bounds = this.parent.node().getBoundingClientRect();
        var diff = this.getDateDiff();
        var width = this.getDateWidth() * diff;
        var height = flat$1(this.tasks.map(function (task) {
          return [5].concat(task.heights);
        }), 3).reduce(function (a, b) {
          return a + b;
        });
        return {
          width: this.config.viewMode == VIEW_MODE.FILL ? 1 : width,
          height: Math.max(height, bounds.height)
        };
      }
    }, {
      key: "getDateType",
      value: function getDateType() {
        switch (this.config.viewMode || VIEW_MODE.WEEK) {
          case VIEW_MODE.DAY:
            return 'day';

          case VIEW_MODE.MONTH:
            return 'month';

          case VIEW_MODE.WEEK:
            return 'week';

          case VIEW_MODE.YEAR:
            return 'year';
        }

        return 'year';
      }
    }, {
      key: "getAxis",
      value: function getAxis() {
        var width = this.getDateWidth();
        var day = dayjs_min();

        switch (this.config.viewMode || VIEW_MODE.WEEK) {
          case VIEW_MODE.DAY:
            day = this.minDate.add(1, 'day');
            break;

          case VIEW_MODE.MONTH:
            day = this.minDate.add(1, 'month');
            break;

          case VIEW_MODE.WEEK:
            day = this.minDate.add(1, 'week');
            break;

          case VIEW_MODE.YEAR:
            day = this.minDate.add(1, 'year');
            break;

          default:
            return 1;
        }

        return d3.scaleTime().range([0, width]).domain([this.minDate, day]);
      }
    }, {
      key: "render",
      value: function render() {
        var _this3 = this;

        this.createDom();
        this.columns.render(this.columnsHeader, this.columnsBody);
        this.computeBoundingDates();
        var bounds = this.bodyHolder.node().getBoundingClientRect();
        var viewport = bounds.width;
        var size = this.computeSize(viewport);
        this.y = d3.scaleBand().range([size.height, 0]).domain(this.tasks.map(function (c, i) {
          return i + '';
        })).padding(0.1);
        var endDate = this.maxDate; // const referenceAxis = this.getAxis()
        // if (size.width < viewport && this.config.viewMode != VM.FILL) {
        //   let date = this.maxDate
        //   let w = size.width
        //   const unit = this.getDateType()
        //   while (w <= viewport) {
        //     date = date.add(1, unit)
        //     w += referenceAxis(date.toDate())
        //   }
        //   endDate = date
        // }

        var startDate = this.minDate;

        switch (this.config.viewMode || VIEW_MODE.WEEK) {
          case VIEW_MODE.DAY:
            startDate = startDate.add(-1, 'day');
            break;

          case VIEW_MODE.MONTH:
            startDate = startDate.add(-1, 'month');
            break;

          case VIEW_MODE.YEAR:
            startDate = startDate.add(-1, 'year');
            break;

          case VIEW_MODE.FILL:
            break;

          case VIEW_MODE.WEEK:
          default:
            startDate = startDate.add(-1, 'week');
            break;
        }

        var fullWidth = Math.max(size.width, viewport);
        this.highlights.attr('width', fullWidth);
        this.x = d3.scaleTime().range([0, fullWidth]).domain([startDate, endDate]);

        if (this.config.viewMode == VIEW_MODE.FILL) {
          this.x = this.x.nice();
        }

        var xAxis = d3.axisTop(this.x);

        switch (this.config.viewMode || VIEW_MODE.WEEK) {
          case VIEW_MODE.DAY:
            xAxis = xAxis.ticks(d3.timeDay.every(3));
            break;

          case VIEW_MODE.MONTH:
            xAxis = xAxis.ticks(d3.timeMonth.every(1));
            break;

          case VIEW_MODE.YEAR:
            xAxis = xAxis.ticks(d3.timeYear.every(1));
            break;

          case VIEW_MODE.FILL:
            break;

          case VIEW_MODE.WEEK:
          default:
            xAxis = xAxis.ticks(d3.timeWeek.every(1));
            break;
        }

        var xAxisSvg = this.headerSvg.append('g').attr('transform', 'translate(-1, 30)').attr('class', 'x axis').call(xAxis);
        xAxisSvg.select('.tick:first-of-type').remove();
        this.headerSvg.attr('width', fullWidth);
        this.groups = this.bodyHolder.selectAll('.group').data(this.tasks).enter().append('div').classed('group', true).style('width', fullWidth).style('border-top', "".concat(this.config.taskMargin, "px solid black"));
        var offset = {
          x: fullWidth,
          y: 0
        };
        this.groups.each(function (task, idx, arr) {
          var group = d3.select(arr[idx]);
          task.renderDivs(_this3.x, _this3.y, group, offset);
        });
        this.bodyHolder.append('div').attr('class', 'group').style('height', '20px').text(' ');
        this.columnsBody.selectAll('.column').append('div').style('height', '40px').text(' ');

        if (this.config.highlights) {
          this.config.highlights.forEach(function (h) {
            h.start = dayjs_min(h.start);
            h.end = dayjs_min(h.end);
          });
          this.highlights.selectAll('.highlight').data(this.config.highlights.filter(function (h) {
            return !h.headerOnly;
          })).enter().append('rect').classed('highlight', true).attr('x', function (obj) {
            return _this3.x(obj.start.toDate());
          }).attr('y', 0).attr('height', '100%').attr('width', function (obj) {
            return _this3.x(obj.end.toDate()) - _this3.x(obj.start.toDate());
          }).style('fill', function (obj) {
            return obj.fill;
          });
          this.headerSvg.selectAll('.highlight').data(this.config.highlights).enter().append('rect').classed('highlight', true).attr('x', function (obj) {
            return _this3.x(obj.start.toDate());
          }).attr('y', 0).attr('height', '100%').attr('width', function (obj) {
            return _this3.x(obj.end.toDate()) - _this3.x(obj.start.toDate());
          }).style('fill', function (obj) {
            return obj.fill;
          });
        }

        this.bodyHeader.node().scrollWidth = this.bodyHolder.node().scrollWidth;
        this.config.eventbus.emit(Events.COLLAPSE);
      }
    }]);

    return View;
  }();

  var Timeline = function Timeline(selector, taskOptions, config) {
    _classCallCheck(this, Timeline);

    _defineProperty(this, "view", void 0);

    _defineProperty(this, "config", void 0);

    this.config = deepmerge({
      columns: [],
      padding: {},
      taskMargin: 2
    }, config);
    this.config.eventbus = new EventBus();
    this.view = new View(selector, taskOptions, this.config);
    this.view.render();
    console.log(this);
  };

  return Timeline;

}(d3));
//# sourceMappingURL=timeline.js.map
