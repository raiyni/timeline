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

  var applyStyle = function applyStyle(el, style) {
    Object.keys(style).forEach(function (k) {
      // el.style(k, style[k])
      el.attr(k, style[k]);
    });
  };
  var clamp = function clamp(num, min, max) {
    return Math.min(Math.max(num, 0), 1);
  };

  var Column = /*#__PURE__*/function () {
    function Column(tasks, options) {
      _classCallCheck(this, Column);

      _defineProperty(this, "tasks", void 0);

      _defineProperty(this, "options", void 0);

      _defineProperty(this, "dom", void 0);

      _defineProperty(this, "parent", void 0);

      this.tasks = tasks;
      this.options = options;
      this.options.padding = this.options.padding || 5;
    }

    _createClass(Column, [{
      key: "render",
      value: function render(parent) {
        var _this = this;

        this.parent = parent;
        this.dom = parent.append('g').attr('class', 'column');
        var title = this.dom.append('text').text(this.options.text);
        var offset = {
          x: this.options.padding,
          y: 10
        };
        this.tasks.forEach(function (task, idx) {
          offset.y += 5;
          var labels = task.labels[_this.options.field];
          labels.forEach(function (l, idx2) {
            var height = task.heights[idx2];

            var label = _this.dom.append('text').text(l.label).attr('y', offset.y + height / 2).attr('alignment-baseline', 'central').attr('x', offset.x);

            offset.y += height;
            applyStyle(label, l.labelStyle || {});
          });
        });
        var width = this.getBounds().width + this.options.padding;
        this.dom.attr('width', width);
        title.attr('x', width / 2).attr('text-anchor', 'middle');
        this.dom.selectAll('[textAnchor=end]').each(function (_, i, a) {
          var node = a[i];
          node.setAttribute('text-anchor', 'end');
          node.setAttribute('x', width - _this.options.padding);
        });
        this.dom.selectAll('[textAnchor=middle]').each(function (_, i, a) {
          var node = a[i];
          node.setAttribute('text-anchor', 'middle');
          node.setAttribute('x', width / 2);
        });
        offset.y = 10;
        offset.x = 0;
        this.tasks.forEach(function (task, idx) {
          offset.y += 5;
          var labels = task.labels[_this.options.field];
          labels.forEach(function (l, idx2) {
            var height = task.heights[idx2];
            var style = l.backgroundStyle || {};

            if (Object.keys(style).length == 0) {
              offset.y += height;
              return;
            }

            var rect = _this.dom.insert('rect', ':first-child').attr('y', offset.y).attr('x', offset.x).attr('height', height).attr('width', width);

            offset.y += height;
            applyStyle(rect, style);
          });
        });
      }
    }, {
      key: "getBounds",
      value: function getBounds() {
        return this.dom.node().getBBox();
      }
    }]);

    return Column;
  }();

  var Columns = /*#__PURE__*/function () {
    function Columns(tasks, options) {
      var _this = this;

      _classCallCheck(this, Columns);

      _defineProperty(this, "tasks", void 0);

      _defineProperty(this, "options", void 0);

      _defineProperty(this, "columns", void 0);

      _defineProperty(this, "dom", void 0);

      this.tasks = tasks;
      this.options = options;
      this.columns = options.columns.map(function (o) {
        return new Column(_this.tasks, o);
      });
    }

    _createClass(Columns, [{
      key: "render",
      value: function render(svg) {
        var _this2 = this;

        this.dom = svg.append('g').attr('class', 'columns').attr('transform', 'translate(0, 0)');
        if (this.columns.length == 0) return;
        var offset = {
          x: 0,
          y: 20
        };
        this.columns.forEach(function (c, idx) {
          c.render(_this2.dom);
          c.dom.attr('transform', "translate(".concat(offset.x, ", ").concat(offset.y, ")"));
          offset.x += Number(c.dom.attr('width'));
        });
        this.dom.attr('width', offset.x);
      }
    }, {
      key: "getWidth",
      value: function getWidth() {
        return this.dom.node().getBBox().width;
      }
    }]);

    return Columns;
  }();

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var dayjs_min = createCommonjsModule(function (module, exports) {
  !function(t,e){module.exports=e();}(commonjsGlobal,function(){var t="millisecond",e="second",n="minute",r="hour",i="day",s="week",u="month",a="quarter",o="year",f="date",h=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[^0-9]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?.?(\d+)?$/,c=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,d={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},$=function(t,e,n){var r=String(t);return !r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},l={s:$,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return (e<=0?"+":"-")+$(r,2,"0")+":"+$(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return -t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,u),s=n-i<0,a=e.clone().add(r+(s?-1:1),u);return +(-(r+(n-i)/(s?i-a:a-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(h){return {M:u,y:o,w:s,d:i,D:f,h:r,m:n,s:e,ms:t,Q:a}[h]||String(h||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},y="en",M={};M[y]=d;var m=function(t){return t instanceof S},D=function(t,e,n){var r;if(!t)return y;if("string"==typeof t)M[t]&&(r=t),e&&(M[t]=e,r=t);else {var i=t.name;M[i]=t,r=i;}return !n&&r&&(y=r),r||!n&&y},v=function(t,e){if(m(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new S(n)},g=l;g.l=D,g.i=m,g.w=function(t,e){return v(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var S=function(){function d(t){this.$L=D(t.locale,null,!0),this.parse(t);}var $=d.prototype;return $.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(g.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match(h);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.$x=t.x||{},this.init();},$.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds();},$.$utils=function(){return g},$.isValid=function(){return !("Invalid Date"===this.$d.toString())},$.isSame=function(t,e){var n=v(t);return this.startOf(e)<=n&&n<=this.endOf(e)},$.isAfter=function(t,e){return v(t)<this.startOf(e)},$.isBefore=function(t,e){return this.endOf(e)<v(t)},$.$g=function(t,e,n){return g.u(t)?this[e]:this.set(n,t)},$.unix=function(){return Math.floor(this.valueOf()/1e3)},$.valueOf=function(){return this.$d.getTime()},$.startOf=function(t,a){var h=this,c=!!g.u(a)||a,d=g.p(t),$=function(t,e){var n=g.w(h.$u?Date.UTC(h.$y,e,t):new Date(h.$y,e,t),h);return c?n:n.endOf(i)},l=function(t,e){return g.w(h.toDate()[t].apply(h.toDate("s"),(c?[0,0,0,0]:[23,59,59,999]).slice(e)),h)},y=this.$W,M=this.$M,m=this.$D,D="set"+(this.$u?"UTC":"");switch(d){case o:return c?$(1,0):$(31,11);case u:return c?$(1,M):$(0,M+1);case s:var v=this.$locale().weekStart||0,S=(y<v?y+7:y)-v;return $(c?m-S:m+(6-S),M);case i:case f:return l(D+"Hours",0);case r:return l(D+"Minutes",1);case n:return l(D+"Seconds",2);case e:return l(D+"Milliseconds",3);default:return this.clone()}},$.endOf=function(t){return this.startOf(t,!1)},$.$set=function(s,a){var h,c=g.p(s),d="set"+(this.$u?"UTC":""),$=(h={},h[i]=d+"Date",h[f]=d+"Date",h[u]=d+"Month",h[o]=d+"FullYear",h[r]=d+"Hours",h[n]=d+"Minutes",h[e]=d+"Seconds",h[t]=d+"Milliseconds",h)[c],l=c===i?this.$D+(a-this.$W):a;if(c===u||c===o){var y=this.clone().set(f,1);y.$d[$](l),y.init(),this.$d=y.set(f,Math.min(this.$D,y.daysInMonth())).$d;}else $&&this.$d[$](l);return this.init(),this},$.set=function(t,e){return this.clone().$set(t,e)},$.get=function(t){return this[g.p(t)]()},$.add=function(t,a){var f,h=this;t=Number(t);var c=g.p(a),d=function(e){var n=v(h);return g.w(n.date(n.date()+Math.round(e*t)),h)};if(c===u)return this.set(u,this.$M+t);if(c===o)return this.set(o,this.$y+t);if(c===i)return d(1);if(c===s)return d(7);var $=(f={},f[n]=6e4,f[r]=36e5,f[e]=1e3,f)[c]||1,l=this.$d.getTime()+t*$;return g.w(l,this)},$.subtract=function(t,e){return this.add(-1*t,e)},$.format=function(t){var e=this;if(!this.isValid())return "Invalid Date";var n=t||"YYYY-MM-DDTHH:mm:ssZ",r=g.z(this),i=this.$locale(),s=this.$H,u=this.$m,a=this.$M,o=i.weekdays,f=i.months,h=function(t,r,i,s){return t&&(t[r]||t(e,n))||i[r].substr(0,s)},d=function(t){return g.s(s%12||12,t,"0")},$=i.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},l={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:g.s(a+1,2,"0"),MMM:h(i.monthsShort,a,f,3),MMMM:h(f,a),D:this.$D,DD:g.s(this.$D,2,"0"),d:String(this.$W),dd:h(i.weekdaysMin,this.$W,o,2),ddd:h(i.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(s),HH:g.s(s,2,"0"),h:d(1),hh:d(2),a:$(s,u,!0),A:$(s,u,!1),m:String(u),mm:g.s(u,2,"0"),s:String(this.$s),ss:g.s(this.$s,2,"0"),SSS:g.s(this.$ms,3,"0"),Z:r};return n.replace(c,function(t,e){return e||l[t]||r.replace(":","")})},$.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},$.diff=function(t,f,h){var c,d=g.p(f),$=v(t),l=6e4*($.utcOffset()-this.utcOffset()),y=this-$,M=g.m(this,$);return M=(c={},c[o]=M/12,c[u]=M,c[a]=M/3,c[s]=(y-l)/6048e5,c[i]=(y-l)/864e5,c[r]=y/36e5,c[n]=y/6e4,c[e]=y/1e3,c)[d]||y,h?M:g.a(M)},$.daysInMonth=function(){return this.endOf(u).$D},$.$locale=function(){return M[this.$L]},$.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=D(t,e,!0);return r&&(n.$L=r),n},$.clone=function(){return g.w(this.$d,this)},$.toDate=function(){return new Date(this.valueOf())},$.toJSON=function(){return this.isValid()?this.toISOString():null},$.toISOString=function(){return this.$d.toISOString()},$.toString=function(){return this.$d.toUTCString()},d}(),p=S.prototype;return v.prototype=p,[["$ms",t],["$s",e],["$m",n],["$H",r],["$W",i],["$M",u],["$y",o],["$D",f]].forEach(function(t){p[t[1]]=function(e){return this.$g(e,t[0],t[1])};}),v.extend=function(t,e){return t.$i||(t(e,S,v),t.$i=!0),v},v.locale=D,v.isDayjs=m,v.unix=function(t){return v(1e3*t)},v.en=M[y],v.Ls=M,v.p={},v});
  });

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

  var Plan = function Plan(options) {
    _classCallCheck(this, Plan);

    _defineProperty(this, "start", void 0);

    _defineProperty(this, "end", void 0);

    _defineProperty(this, "progress", void 0);

    _defineProperty(this, "height", void 0);

    _defineProperty(this, "label", void 0);

    _defineProperty(this, "progressStyle", void 0);

    _defineProperty(this, "backgroundStyle", void 0);

    _defineProperty(this, "labelStyle", void 0);

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
  };

  var Task = /*#__PURE__*/function () {
    function Task(options, timelineOptions) {
      var _this = this;

      _classCallCheck(this, Task);

      _defineProperty(this, "rows", void 0);

      _defineProperty(this, "heights", void 0);

      _defineProperty(this, "labels", void 0);

      _defineProperty(this, "options", void 0);

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
      } else {
        console.error('Plans object is not an array');
      }

      this.options = options;
      this.computeRowHeights();
      this.labels = {};
      if (timelineOptions.columns.length == 0) return;
      timelineOptions.columns.forEach(function (c, idx) {
        _this.labels[c.field] = _this.prepareOptions(c);
      });
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
      key: "render",
      value: function render(x, y, group, offset) {
        var _this2 = this;

        offset.y += 5;
        this.rows.forEach(function (row, idx) {
          row.forEach(function (plan, idx2) {
            var layer = group.append('g').attr('class', 'plan');

            _this2.drawBackground(x, y, layer, plan, offset);

            _this2.drawProgress(x, y, layer, plan, offset);
          });
          offset.y += _this2.heights[idx];
        });
      }
    }, {
      key: "drawBackground",
      value: function drawBackground(x, y, group, plan, offset) {
        var rect = group.append('rect').attr('x', x(plan.start.toDate())).attr('y', offset.y).attr('height', plan.height).attr('width', x(plan.end.toDate()) - x(plan.start.toDate()));
        applyStyle(rect, plan.backgroundStyle);
      }
    }, {
      key: "drawProgress",
      value: function drawProgress(x, y, group, plan, offset) {
        var rect = group.append('rect').attr('x', x(plan.start.toDate())).attr('y', offset.y).attr('height', plan.height).attr('width', (x(plan.end.toDate()) - x(plan.start.toDate())) * clamp(plan.progress / 100));
        applyStyle(rect, plan.progressStyle);
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
              fill: '#000000'
            }, defaults.labelStyle || {}, v.labelStyle || {}]);
            console.log(v);
            v.backgroundStyle = deepmerge(defaults.backgroundStyle || {}, v.backgroundStyle || {}); // v.verticalAlign = v.verticalAlign || defaults.verticalAlign || VERTICAL_ALIGN.MIDDLE
            // v.horizontalAlign = v.horizontalAlign || defaults.horizontalAlign || HORIZONTAL_ALIGN.LEFT
          }
        });

        if (options.length < this.rows.length) {
          options = options.concat(new Array(this.rows.length - options.length).fill({}));
        }

        if (options.length > this.rows.length) {
          options = options.slice(0, this.rows.length);
        }

        return options;
      }
    }]);

    return Task;
  }();

  var VIEW_MODE;

  (function (VIEW_MODE) {
    VIEW_MODE["DAY"] = "day";
    VIEW_MODE["WEEK"] = "week";
    VIEW_MODE["MONTH"] = "month";
    VIEW_MODE["YEAR"] = "year";
    VIEW_MODE["FILL"] = "fill";
  })(VIEW_MODE || (VIEW_MODE = {}));

  var minMax = createCommonjsModule(function (module, exports) {
  !function(n,e){module.exports=e();}(commonjsGlobal,function(){return function(n,e,t){var i=function(n,e){if(!e||!e.length||!e[0]||1===e.length&&!e[0].length)return null;var t;1===e.length&&e[0].length>0&&(e=e[0]),t=e[0];for(var i=1;i<e.length;i+=1)e[i].isValid()&&!e[i][n](t)||(t=e[i]);return t};t.max=function(){var n=[].slice.call(arguments,0);return i("isAfter",n)},t.min=function(){var n=[].slice.call(arguments,0);return i("isBefore",n)};}});
  });

  var View = /*#__PURE__*/function () {
    function View(selector, taskOptions, options) {
      var _this = this;

      _classCallCheck(this, View);

      _defineProperty(this, "svg", void 0);

      _defineProperty(this, "graph", void 0);

      _defineProperty(this, "x", void 0);

      _defineProperty(this, "y", void 0);

      _defineProperty(this, "groups", void 0);

      _defineProperty(this, "parent", void 0);

      _defineProperty(this, "tasks", void 0);

      _defineProperty(this, "minDate", void 0);

      _defineProperty(this, "maxDate", void 0);

      _defineProperty(this, "options", void 0);

      _defineProperty(this, "columns", void 0);

      _defineProperty(this, "id", void 0);

      dayjs_min.extend(minMax);
      this.options = options;
      this.tasks = taskOptions.map(function (t) {
        return new Task(t, _this.options);
      });
      this.columns = new Columns(this.tasks, this.options);
      this.parent = document.body.querySelector(selector);
      this.svg = d3.select(this.parent).append('svg');
      this.render();
    }

    _createClass(View, [{
      key: "computeBoundingDates",
      value: function computeBoundingDates() {
        var dates = this.tasks.map(function (task) {
          return task.rows;
        }).flat(3);
        var startDates = dates.map(function (d) {
          return d.start;
        });
        var endDates = dates.map(function (d) {
          return d.end;
        });
        this.minDate = dayjs_min.min(startDates);
        this.maxDate = dayjs_min.max(endDates);

        switch (this.options.viewMode || VIEW_MODE.WEEK) {
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
      key: "getDateMultiplier",
      value: function getDateMultiplier() {
        switch (this.options.viewMode || VIEW_MODE.WEEK) {
          case VIEW_MODE.DAY:
            return 30;

          case VIEW_MODE.MONTH:
            return 200;

          case VIEW_MODE.YEAR:
            return 400;

          case VIEW_MODE.FILL:
            return -1;

          case VIEW_MODE.WEEK:
          default:
            return 210;
        }
      }
    }, {
      key: "getDateDiff",
      value: function getDateDiff() {
        switch (this.options.viewMode || VIEW_MODE.WEEK) {
          case VIEW_MODE.DAY:
            return Math.ceil(this.maxDate.diff(this.minDate, 'day')) / 31;

          case VIEW_MODE.MONTH:
            return Math.ceil(this.maxDate.diff(this.minDate, 'month')) / 12;

          case VIEW_MODE.YEAR:
            return Math.ceil(this.maxDate.diff(this.minDate, 'year')) / 4;

          case VIEW_MODE.FILL:
            return 1;

          case VIEW_MODE.WEEK:
          default:
            return Math.ceil(this.maxDate.diff(this.minDate, 'week')) / 8;
        }
      }
    }, {
      key: "computeSize",
      value: function computeSize(viewport) {
        var bounds = this.parent.getBoundingClientRect(); // this.maxDate.diff(this.minDate, )

        var diff = this.getDateDiff();
        console.log(this.maxDate.diff(this.minDate, 'year'));
        var width = 1000 * diff;
        var height = this.tasks.map(function (task) {
          return [5].concat(task.heights);
        }).flat(3).reduce(function (a, b) {
          return a + b;
        });
        return {
          width: width,
          height: Math.max(height, bounds.height)
        };
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        this.computeBoundingDates();
        var bounds = this.parent.getBoundingClientRect();
        this.svg.attr('width', bounds.width).attr('height', bounds.height);
        this.graph = this.svg.append('g').attr('transform', "translate(30, 30)");
        this.columns.render(this.svg);
        var colWidth = Number(this.columns.dom.attr('width') || 0);
        this.graph.attr('transform', "translate(".concat(colWidth, ", 30)"));
        var viewport = bounds.width - colWidth;
        var size = this.computeSize(viewport);
        console.log(size);
        this.y = d3.scaleBand().range([size.height, 0]).domain(this.tasks.map(function (c, i) {
          return i + '';
        })).padding(0.1);
        var endDate = this.maxDate;

        if (size.width < viewport) {
          var multiplier = size.width / 1000;
          var days = this.maxDate.diff(this.minDate, 'day');

          if (multiplier > 1) {
            days = days * multiplier;
          } else {
            days = days / multiplier;
          }

          endDate = this.maxDate.add(days, 'day');
        }

        this.x = d3.scaleTime().range([0, Math.max(viewport, size.width)]).domain([this.minDate.add(-1, 'day').toDate(), endDate.toDate()]).nice();
        this.graph.append('g').call(d3.axisLeft(this.y).tickFormat(function () {
          return '';
        }).tickSize(0));
        this.graph.append('g').attr("class", "x axis").call(d3.axisTop(this.x)).selectAll('text').attr('x', 0).attr('text-anchor', 'start');
        console.log([this.minDate.toDate(), this.maxDate.toDate()]);
        this.groups = this.graph.selectAll('.group').data(this.tasks).enter().append('g').classed('group', true);
        var offset = {
          x: 0,
          y: 0
        };
        this.groups.each(function (task, idx, arr) {
          var group = d3.select(arr[idx]);
          task.render(_this2.x, _this2.y, group, offset);
        }); // this.svg.attr('width', bounds.width + this.columns.getWidth())
      }
    }]);

    return View;
  }();

  var Timeline = function Timeline(selector, taskOptions, options) {
    _classCallCheck(this, Timeline);

    _defineProperty(this, "view", void 0);

    _defineProperty(this, "options", void 0);

    this.options = deepmerge({
      columns: [],
      padding: {}
    }, options);
    this.view = new View(selector, taskOptions, this.options); // .call(d3.zoom().on("zoom", function(e) {
    // console.log(e)
    // svg.attr('transform', 'translate(' + e.transform.x + ',' + margin.top + ')')
    // })
  };

  return Timeline;

}(d3));
