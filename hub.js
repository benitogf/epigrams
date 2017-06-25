(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 68);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var store      = __webpack_require__(34)('wks')
  , uid        = __webpack_require__(24)
  , Symbol     = __webpack_require__(2).Symbol
  , USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function(name){
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(12);
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(11)(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(2)
  , core      = __webpack_require__(0)
  , ctx       = __webpack_require__(17)
  , hide      = __webpack_require__(7)
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , IS_WRAP   = type & $export.W
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE]
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
    , key, own, out;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function(C){
      var F = function(a, b, c){
        if(this instanceof C){
          switch(arguments.length){
            case 0: return new C;
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if(IS_PROTO){
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library` 
module.exports = $export;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var dP         = __webpack_require__(8)
  , createDesc = __webpack_require__(21);
module.exports = __webpack_require__(4) ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var anObject       = __webpack_require__(3)
  , IE8_DOM_DEFINE = __webpack_require__(49)
  , toPrimitive    = __webpack_require__(36)
  , dP             = Object.defineProperty;

exports.f = __webpack_require__(4) ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(50)
  , defined = __webpack_require__(28);
module.exports = function(it){
  return IObject(defined(it));
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(80), __esModule: true };

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = __webpack_require__(55)
  , enumBugKeys = __webpack_require__(30);

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _promise = __webpack_require__(10);

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (fn) {
  return function () {
    var gen = fn.apply(this, arguments);
    return new _promise2.default(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }

        if (info.done) {
          resolve(value);
        } else {
          return _promise2.default.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }

      return step("next");
    });
  };
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(121);


/***/ }),
/* 16 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(27);
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = {};

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = true;

/***/ }),
/* 20 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(8).f
  , has = __webpack_require__(6)
  , TAG = __webpack_require__(1)('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(28);
module.exports = function(it){
  return Object(defined(it));
};

/***/ }),
/* 24 */
/***/ (function(module, exports) {

var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

/***/ }),
/* 25 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};

/***/ }),
/* 28 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(12)
  , document = __webpack_require__(2).document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};

/***/ }),
/* 30 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject    = __webpack_require__(3)
  , dPs         = __webpack_require__(99)
  , enumBugKeys = __webpack_require__(30)
  , IE_PROTO    = __webpack_require__(33)('IE_PROTO')
  , Empty       = function(){ /* empty */ }
  , PROTOTYPE   = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function(){
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(29)('iframe')
    , i      = enumBugKeys.length
    , lt     = '<'
    , gt     = '>'
    , iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(48).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties){
  var result;
  if(O !== null){
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty;
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 32 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(34)('keys')
  , uid    = __webpack_require__(24);
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2)
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};

/***/ }),
/* 35 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(12);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

var global         = __webpack_require__(2)
  , core           = __webpack_require__(0)
  , LIBRARY        = __webpack_require__(19)
  , wksExt         = __webpack_require__(38)
  , defineProperty = __webpack_require__(8).f;
module.exports = function(name){
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
};

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(1);

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at  = __webpack_require__(105)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(51)(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(108);
var global        = __webpack_require__(2)
  , hide          = __webpack_require__(7)
  , Iterators     = __webpack_require__(18)
  , TO_STRING_TAG = __webpack_require__(1)('toStringTag');

for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
  var NAME       = collections[i]
    , Collection = global[NAME]
    , proto      = Collection && Collection.prototype;
  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(74), __esModule: true };

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(77), __esModule: true };

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(78), __esModule: true };

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _setPrototypeOf = __webpack_require__(71);

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = __webpack_require__(70);

var _create2 = _interopRequireDefault(_create);

var _typeof2 = __webpack_require__(46);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof2 = __webpack_require__(46);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(73);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(72);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(16)
  , TAG = __webpack_require__(1)('toStringTag')
  // ES3 wrong here
  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function(it, key){
  try {
    return it[key];
  } catch(e){ /* empty */ }
};

module.exports = function(it){
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2).document && document.documentElement;

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(4) && !__webpack_require__(11)(function(){
  return Object.defineProperty(__webpack_require__(29)('div'), 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(16);
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY        = __webpack_require__(19)
  , $export        = __webpack_require__(5)
  , redefine       = __webpack_require__(57)
  , hide           = __webpack_require__(7)
  , has            = __webpack_require__(6)
  , Iterators      = __webpack_require__(18)
  , $iterCreate    = __webpack_require__(92)
  , setToStringTag = __webpack_require__(22)
  , getPrototypeOf = __webpack_require__(54)
  , ITERATOR       = __webpack_require__(1)('iterator')
  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
  , FF_ITERATOR    = '@@iterator'
  , KEYS           = 'keys'
  , VALUES         = 'values';

var returnThis = function(){ return this; };

module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
    , methods, key, IteratorPrototype;
  // Fix native
  if($anyNative){
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
    if(IteratorPrototype !== Object.prototype){
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if(DEF_VALUES && $native && $native.name !== VALUES){
    VALUES_BUG = true;
    $default = function values(){ return $native.call(this); };
  }
  // Define iterator
  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES ? $default : getMethod(VALUES),
      keys:    IS_SET     ? $default : getMethod(KEYS),
      entries: $entries
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

var pIE            = __webpack_require__(20)
  , createDesc     = __webpack_require__(21)
  , toIObject      = __webpack_require__(9)
  , toPrimitive    = __webpack_require__(36)
  , has            = __webpack_require__(6)
  , IE8_DOM_DEFINE = __webpack_require__(49)
  , gOPD           = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(4) ? gOPD : function getOwnPropertyDescriptor(O, P){
  O = toIObject(O);
  P = toPrimitive(P, true);
  if(IE8_DOM_DEFINE)try {
    return gOPD(O, P);
  } catch(e){ /* empty */ }
  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
};

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys      = __webpack_require__(55)
  , hiddenKeys = __webpack_require__(30).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
  return $keys(O, hiddenKeys);
};

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has         = __webpack_require__(6)
  , toObject    = __webpack_require__(23)
  , IE_PROTO    = __webpack_require__(33)('IE_PROTO')
  , ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function(O){
  O = toObject(O);
  if(has(O, IE_PROTO))return O[IE_PROTO];
  if(typeof O.constructor == 'function' && O instanceof O.constructor){
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

var has          = __webpack_require__(6)
  , toIObject    = __webpack_require__(9)
  , arrayIndexOf = __webpack_require__(85)(false)
  , IE_PROTO     = __webpack_require__(33)('IE_PROTO');

module.exports = function(object, names){
  var O      = toIObject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while(names.length > i)if(has(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(5)
  , core    = __webpack_require__(0)
  , fails   = __webpack_require__(11);
module.exports = function(KEY, exec){
  var fn  = (core.Object || {})[KEY] || Object[KEY]
    , exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
};

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(7);

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

var ctx                = __webpack_require__(17)
  , invoke             = __webpack_require__(88)
  , html               = __webpack_require__(48)
  , cel                = __webpack_require__(29)
  , global             = __webpack_require__(2)
  , process            = global.process
  , setTask            = global.setImmediate
  , clearTask          = global.clearImmediate
  , MessageChannel     = global.MessageChannel
  , counter            = 0
  , queue              = {}
  , ONREADYSTATECHANGE = 'onreadystatechange'
  , defer, channel, port;
var run = function(){
  var id = +this;
  if(queue.hasOwnProperty(id)){
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function(event){
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if(!setTask || !clearTask){
  setTask = function setImmediate(fn){
    var args = [], i = 1;
    while(arguments.length > i)args.push(arguments[i++]);
    queue[++counter] = function(){
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id){
    delete queue[id];
  };
  // Node.js 0.8-
  if(__webpack_require__(16)(process) == 'process'){
    defer = function(id){
      process.nextTick(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if(MessageChannel){
    channel = new MessageChannel;
    port    = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
    defer = function(id){
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if(ONREADYSTATECHANGE in cel('script')){
    defer = function(id){
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function(id){
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set:   setTask,
  clear: clearTask
};

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(35)
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

var classof   = __webpack_require__(47)
  , ITERATOR  = __webpack_require__(1)('iterator')
  , Iterators = __webpack_require__(18);
module.exports = __webpack_require__(0).getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

/***/ }),
/* 61 */
/***/ (function(module, exports) {



/***/ }),
/* 62 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Hub; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_core_js_promise__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_core_js_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_core_js_get_iterator__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_core_js_get_iterator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_babel_runtime_core_js_get_iterator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_babel_runtime_regenerator__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_babel_runtime_helpers_asyncToGenerator__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_babel_runtime_helpers_asyncToGenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_babel_runtime_helpers_asyncToGenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__lib_C137_item__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__lib_C137_session__ = __webpack_require__(67);




var hub = {
  set: function set(hub) {var _this = this;return __WEBPACK_IMPORTED_MODULE_8_babel_runtime_helpers_asyncToGenerator___default()(__WEBPACK_IMPORTED_MODULE_7_babel_runtime_regenerator___default.a.mark(function _callee() {var pack;return __WEBPACK_IMPORTED_MODULE_7_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_context.next = 2;return (
                _this.session.pack(hub, 'public'));case 2:pack = _context.sent;_context.next = 5;return (
                _this.set(['hub', hub.id], pack));case 5:return _context.abrupt('return', _context.sent);case 6:case 'end':return _context.stop();}}}, _callee, _this);}))();
  },

  getAll: function getAll() {var _this2 = this;return __WEBPACK_IMPORTED_MODULE_8_babel_runtime_helpers_asyncToGenerator___default()(__WEBPACK_IMPORTED_MODULE_7_babel_runtime_regenerator___default.a.mark(function _callee2() {var keys, hubs, result, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _hub, data;return __WEBPACK_IMPORTED_MODULE_7_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:
              keys = ['hub'];_context2.next = 3;return (
                _this2.getAll(keys));case 3:hubs = _context2.sent;
              result = [];_iteratorNormalCompletion = true;_didIteratorError = false;_iteratorError = undefined;_context2.prev = 8;_iterator = __WEBPACK_IMPORTED_MODULE_6_babel_runtime_core_js_get_iterator___default()(
              hubs);case 10:if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {_context2.next = 19;break;}_hub = _step.value;_context2.next = 14;return (
                _this2.session.unpack(_hub.data, 'public'));case 14:data = _context2.sent;
              result.push(data);case 16:_iteratorNormalCompletion = true;_context2.next = 10;break;case 19:_context2.next = 25;break;case 21:_context2.prev = 21;_context2.t0 = _context2['catch'](8);_didIteratorError = true;_iteratorError = _context2.t0;case 25:_context2.prev = 25;_context2.prev = 26;if (!_iteratorNormalCompletion && _iterator.return) {_iterator.return();}case 28:_context2.prev = 28;if (!_didIteratorError) {_context2.next = 31;break;}throw _iteratorError;case 31:return _context2.finish(28);case 32:return _context2.finish(25);case 33:return _context2.abrupt('return',

              result);case 34:case 'end':return _context2.stop();}}}, _callee2, _this2, [[8, 21, 25, 33], [26,, 28, 32]]);}))();
  },

  select: function select(key, keyword) {var _this3 = this;return __WEBPACK_IMPORTED_MODULE_8_babel_runtime_helpers_asyncToGenerator___default()(__WEBPACK_IMPORTED_MODULE_7_babel_runtime_regenerator___default.a.mark(function _callee3() {return __WEBPACK_IMPORTED_MODULE_7_babel_runtime_regenerator___default.a.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:_context3.next = 2;return (
                _this3.session.setKeyword(keyword, key));case 2:return _context3.abrupt('return',
              _this3.item.getAll());case 3:case 'end':return _context3.stop();}}}, _callee3, _this3);}))();
  },

  create: function create(key, keyword) {var _this4 = this;return __WEBPACK_IMPORTED_MODULE_8_babel_runtime_helpers_asyncToGenerator___default()(__WEBPACK_IMPORTED_MODULE_7_babel_runtime_regenerator___default.a.mark(function _callee4() {var now, hub, keys;return __WEBPACK_IMPORTED_MODULE_7_babel_runtime_regenerator___default.a.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:
              now = Date.now() / 1000;
              hub = {
                id: key,
                created: now,
                updated: now };

              keys = ['hub', key];_context4.next = 5;return (
                _this4.free(keys));case 5:_context4.next = 7;return (
                _this4.hub.set(hub));case 7:_context4.next = 9;return (
                _this4.session.setKeyword(keyword, key));case 9:return _context4.abrupt('return',
              hub);case 10:case 'end':return _context4.stop();}}}, _callee4, _this4);}))();
  },

  update: function update(key, newKey, newKeyword) {var _this5 = this;return __WEBPACK_IMPORTED_MODULE_8_babel_runtime_helpers_asyncToGenerator___default()(__WEBPACK_IMPORTED_MODULE_7_babel_runtime_regenerator___default.a.mark(function _callee5() {var selectedHub, data, items, _hub2, keyword;return __WEBPACK_IMPORTED_MODULE_7_babel_runtime_regenerator___default.a.wrap(function _callee5$(_context5) {while (1) {switch (_context5.prev = _context5.next) {case 0:_context5.next = 2;return (
                _this5.session.get());case 2:selectedHub = _context5.sent;if (!(
              selectedHub && selectedHub.id === key)) {_context5.next = 34;break;}_context5.next = 6;return (
                _this5.free(['hub', newKey]));case 6:_context5.next = 8;return (
                _this5.exist(['hub', key]));case 8:_context5.next = 10;return (
                _this5.get(['hub', key]));case 10:data = _context5.sent;_context5.next = 13;return (
                _this5.item.getAll());case 13:items = _context5.sent;_context5.next = 16;return (
                _this5.delAll(['item', key]));case 16:_context5.next = 18;return (
                _this5.del(['hub', key]));case 18:_context5.next = 20;return (
                _this5.session.unpack(data, 'public'));case 20:_hub2 = _context5.sent;
              _hub2.id = newKey;
              _hub2.updated = Date.now() / 1000;_context5.next = 25;return (
                _this5.hub.set(_hub2));case 25:
              keyword = newKeyword || selectedHub.keyword;_context5.next = 28;return (
                _this5.session.setKeyword(keyword, newKey));case 28:_context5.next = 30;return (
                _this5.item.setMany(items));case 30:
              _this5.session.clearKeyword();return _context5.abrupt('return',
              newKey);case 34:return _context5.abrupt('return',

              new __WEBPACK_IMPORTED_MODULE_5_babel_runtime_core_js_promise___default.a(function (resolve, reject) {return reject(new Error('UPDATE_HUB_NOT_SELECTED'));}));case 35:case 'end':return _context5.stop();}}}, _callee5, _this5);}))();

  },

  upsert: function upsert(key, keyword) {var _this6 = this;return __WEBPACK_IMPORTED_MODULE_8_babel_runtime_helpers_asyncToGenerator___default()(__WEBPACK_IMPORTED_MODULE_7_babel_runtime_regenerator___default.a.mark(function _callee6() {return __WEBPACK_IMPORTED_MODULE_7_babel_runtime_regenerator___default.a.wrap(function _callee6$(_context6) {while (1) {switch (_context6.prev = _context6.next) {case 0:_context6.prev = 0;_context6.next = 3;return (

                _this6.exist(['hub', key]));case 3:_context6.next = 5;return (
                _this6.hub.select(key, keyword));case 5:_context6.next = 12;break;case 7:_context6.prev = 7;_context6.t0 = _context6['catch'](0);_context6.next = 11;return (

                _this6.hub.create(key, keyword));case 11:return _context6.abrupt('return', _context6.sent);case 12:case 'end':return _context6.stop();}}}, _callee6, _this6, [[0, 7]]);}))();

  },

  delete: function _delete(id) {var _this7 = this;return __WEBPACK_IMPORTED_MODULE_8_babel_runtime_helpers_asyncToGenerator___default()(__WEBPACK_IMPORTED_MODULE_7_babel_runtime_regenerator___default.a.mark(function _callee7() {var hub, _hubs;return __WEBPACK_IMPORTED_MODULE_7_babel_runtime_regenerator___default.a.wrap(function _callee7$(_context7) {while (1) {switch (_context7.prev = _context7.next) {case 0:_context7.next = 2;return (
                _this7.session.getHub());case 2:hub = _context7.sent;if (!(
              hub === id)) {_context7.next = 15;break;}_context7.next = 6;return (
                _this7.delAll(['item', hub]));case 6:_context7.next = 8;return (
                _this7.del(['hub', id]));case 8:_context7.next = 10;return (
                _this7.hub.getAll());case 10:_hubs = _context7.sent;
              _this7.session.clearKeyword();return _context7.abrupt('return',
              _hubs);case 15:return _context7.abrupt('return',

              new __WEBPACK_IMPORTED_MODULE_5_babel_runtime_core_js_promise___default.a(function (resolve, reject) {return reject(new Error('DELETE_HUB_NOT_SELECTED'));}));case 16:case 'end':return _context7.stop();}}}, _callee7, _this7);}))();

  } };var


Hub = function (_Item) {__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(Hub, _Item);
  function Hub(opt) {__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default()(this, Hub);var _this8 = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Hub.__proto__ || __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default()(Hub)).call(this,
    opt));
    _this8.hub = {};
    _this8.session = __WEBPACK_IMPORTED_MODULE_10__lib_C137_session__["a" /* session */];
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default()(hub).forEach(function (method) {
      _this8.hub[method] = hub[method].bind(_this8);
    });return _this8;
  }return Hub;}(__WEBPACK_IMPORTED_MODULE_9__lib_C137_item__["a" /* Item */]);



//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyY1xcbGliXFxDMTM3XFxodWIuanMiXSwibmFtZXMiOlsiSXRlbSIsInNlc3Npb24iLCJodWIiLCJzZXQiLCJwYWNrIiwiaWQiLCJnZXRBbGwiLCJrZXlzIiwiaHVicyIsInJlc3VsdCIsInVucGFjayIsImRhdGEiLCJwdXNoIiwic2VsZWN0Iiwia2V5Iiwia2V5d29yZCIsInNldEtleXdvcmQiLCJpdGVtIiwiY3JlYXRlIiwibm93IiwiRGF0ZSIsImNyZWF0ZWQiLCJ1cGRhdGVkIiwiZnJlZSIsInVwZGF0ZSIsIm5ld0tleSIsIm5ld0tleXdvcmQiLCJnZXQiLCJzZWxlY3RlZEh1YiIsImV4aXN0IiwiaXRlbXMiLCJkZWxBbGwiLCJkZWwiLCJzZXRNYW55IiwiY2xlYXJLZXl3b3JkIiwicmVzb2x2ZSIsInJlamVjdCIsIkVycm9yIiwidXBzZXJ0IiwiZGVsZXRlIiwiZ2V0SHViIiwiSHViIiwib3B0IiwiZm9yRWFjaCIsIm1ldGhvZCIsImJpbmQiXSwibWFwcGluZ3MiOiI7QUFDQSxTQUFTQSxJQUFULFFBQXFCLGlCQUFyQjtBQUNBLFNBQVNDLE9BQVQsUUFBd0Isb0JBQXhCOztBQUVBLElBQU1DLE1BQU07QUFDSkMsS0FESSxlQUNDRCxHQURELEVBQ007QUFDRyxzQkFBS0QsT0FBTCxDQUFhRyxJQUFiLENBQWtCRixHQUFsQixFQUF1QixRQUF2QixDQURILFNBQ1ZFLElBRFU7QUFFRCxzQkFBS0QsR0FBTCxDQUFTLENBQUMsS0FBRCxFQUFRRCxJQUFJRyxFQUFaLENBQVQsRUFBMEJELElBQTFCLENBRkM7QUFHZixHQUpTOztBQU1KRSxRQU5JLG9CQU1NO0FBQ1ZDLGtCQURVLEdBQ0gsQ0FBQyxLQUFELENBREc7QUFFRyx1QkFBS0QsTUFBTCxDQUFZQyxJQUFaLENBRkgsU0FFVkMsSUFGVTtBQUdWQyxvQkFIVSxHQUdELEVBSEM7QUFJRUQsa0JBSkYsdUdBSUxOLElBSks7QUFLSyx1QkFBS0QsT0FBTCxDQUFhUyxNQUFiLENBQW9CUixLQUFJUyxJQUF4QixFQUE4QixRQUE5QixDQUxMLFVBS1JBLElBTFE7QUFNWkYscUJBQU9HLElBQVAsQ0FBWUQsSUFBWixFQU5ZOztBQVFQRixvQkFSTztBQVNmLEdBZlM7O0FBaUJKSSxRQWpCSSxrQkFpQklDLEdBakJKLEVBaUJTQyxPQWpCVCxFQWlCa0I7QUFDcEIsdUJBQUtkLE9BQUwsQ0FBYWUsVUFBYixDQUF3QkQsT0FBeEIsRUFBaUNELEdBQWpDLENBRG9CO0FBRW5CLHFCQUFLRyxJQUFMLENBQVVYLE1BQVYsRUFGbUI7QUFHM0IsR0FwQlM7O0FBc0JKWSxRQXRCSSxrQkFzQklKLEdBdEJKLEVBc0JTQyxPQXRCVCxFQXNCa0I7QUFDdEJJLGlCQURzQixHQUNoQkMsS0FBS0QsR0FBTCxLQUFhLElBREc7QUFFdEJqQixpQkFGc0IsR0FFaEI7QUFDUkcsb0JBQUlTLEdBREk7QUFFUk8seUJBQVNGLEdBRkQ7QUFHUkcseUJBQVNILEdBSEQsRUFGZ0I7O0FBT3RCWixrQkFQc0IsR0FPZixDQUFDLEtBQUQsRUFBUU8sR0FBUixDQVBlO0FBUXBCLHVCQUFLUyxJQUFMLENBQVVoQixJQUFWLENBUm9CO0FBU3BCLHVCQUFLTCxHQUFMLENBQVNDLEdBQVQsQ0FBYUQsR0FBYixDQVRvQjtBQVVwQix1QkFBS0QsT0FBTCxDQUFhZSxVQUFiLENBQXdCRCxPQUF4QixFQUFpQ0QsR0FBakMsQ0FWb0I7QUFXbkJaLGlCQVhtQjtBQVkzQixHQWxDUzs7QUFvQ0pzQixRQXBDSSxrQkFvQ0lWLEdBcENKLEVBb0NTVyxNQXBDVCxFQW9DaUJDLFVBcENqQixFQW9DNkI7QUFDWCx1QkFBS3pCLE9BQUwsQ0FBYTBCLEdBQWIsRUFEVyxTQUMvQkMsV0FEK0I7QUFFakNBLDZCQUFlQSxZQUFZdkIsRUFBWixLQUFtQlMsR0FGRDtBQUc3Qix1QkFBS1MsSUFBTCxDQUFVLENBQUMsS0FBRCxFQUFRRSxNQUFSLENBQVYsQ0FINkI7QUFJN0IsdUJBQUtJLEtBQUwsQ0FBVyxDQUFDLEtBQUQsRUFBUWYsR0FBUixDQUFYLENBSjZCO0FBS2xCLHVCQUFLYSxHQUFMLENBQVMsQ0FBQyxLQUFELEVBQVFiLEdBQVIsQ0FBVCxDQUxrQixVQUsvQkgsSUFMK0I7QUFNakIsdUJBQUtNLElBQUwsQ0FBVVgsTUFBVixFQU5pQixVQU0vQndCLEtBTitCO0FBTzdCLHVCQUFLQyxNQUFMLENBQVksQ0FBQyxNQUFELEVBQVNqQixHQUFULENBQVosQ0FQNkI7QUFRN0IsdUJBQUtrQixHQUFMLENBQVMsQ0FBQyxLQUFELEVBQVFsQixHQUFSLENBQVQsQ0FSNkI7QUFTbkIsdUJBQUtiLE9BQUwsQ0FBYVMsTUFBYixDQUFvQkMsSUFBcEIsRUFBMEIsUUFBMUIsQ0FUbUIsVUFTL0JULEtBVCtCO0FBVW5DQSxvQkFBSUcsRUFBSixHQUFTb0IsTUFBVDtBQUNBdkIsb0JBQUlvQixPQUFKLEdBQWNGLEtBQUtELEdBQUwsS0FBYSxJQUEzQixDQVhtQztBQVk3Qix1QkFBS2pCLEdBQUwsQ0FBU0MsR0FBVCxDQUFhRCxLQUFiLENBWjZCO0FBYS9CYSxxQkFiK0IsR0FhckJXLGNBQWNFLFlBQVliLE9BYkw7QUFjN0IsdUJBQUtkLE9BQUwsQ0FBYWUsVUFBYixDQUF3QkQsT0FBeEIsRUFBaUNVLE1BQWpDLENBZDZCO0FBZTdCLHVCQUFLUixJQUFMLENBQVVnQixPQUFWLENBQWtCSCxLQUFsQixDQWY2QjtBQWdCbkMscUJBQUs3QixPQUFMLENBQWFpQyxZQUFiLEdBaEJtQztBQWlCNUJULG9CQWpCNEI7O0FBbUI1QiwyQkFBWSxVQUFDVSxPQUFELEVBQVVDLE1BQVYsVUFBcUJBLE9BQU8sSUFBSUMsS0FBSixDQUFVLHlCQUFWLENBQVAsQ0FBckIsRUFBWixDQW5CNEI7O0FBcUJ0QyxHQXpEUzs7QUEyREpDLFFBM0RJLGtCQTJESXhCLEdBM0RKLEVBMkRTQyxPQTNEVCxFQTJEa0I7O0FBRWxCLHVCQUFLYyxLQUFMLENBQVcsQ0FBQyxLQUFELEVBQVFmLEdBQVIsQ0FBWCxDQUZrQjtBQUdsQix1QkFBS1osR0FBTCxDQUFTVyxNQUFULENBQWdCQyxHQUFoQixFQUFxQkMsT0FBckIsQ0FIa0I7O0FBS1gsdUJBQUtiLEdBQUwsQ0FBU2dCLE1BQVQsQ0FBZ0JKLEdBQWhCLEVBQXFCQyxPQUFyQixDQUxXOztBQU8zQixHQWxFUzs7QUFvRUp3QixRQXBFSSxtQkFvRUlsQyxFQXBFSixFQW9FUTtBQUNFLHVCQUFLSixPQUFMLENBQWF1QyxNQUFiLEVBREYsU0FDVnRDLEdBRFU7QUFFWkEsc0JBQVFHLEVBRkk7QUFHUix1QkFBSzBCLE1BQUwsQ0FBWSxDQUFDLE1BQUQsRUFBUzdCLEdBQVQsQ0FBWixDQUhRO0FBSVIsdUJBQUs4QixHQUFMLENBQVMsQ0FBQyxLQUFELEVBQVEzQixFQUFSLENBQVQsQ0FKUTtBQUtHLHVCQUFLSCxHQUFMLENBQVNJLE1BQVQsRUFMSCxVQUtWRSxLQUxVO0FBTWQscUJBQUtQLE9BQUwsQ0FBYWlDLFlBQWIsR0FOYztBQU9QMUIsbUJBUE87O0FBU1AsMkJBQVksVUFBQzJCLE9BQUQsRUFBVUMsTUFBVixVQUFxQkEsT0FBTyxJQUFJQyxLQUFKLENBQVUseUJBQVYsQ0FBUCxDQUFyQixFQUFaLENBVE87O0FBV2pCLEdBL0VTLEVBQVosQzs7O0FBa0ZNSSxHO0FBQ0osZUFBYUMsR0FBYixFQUFrQjtBQUNWQSxPQURVO0FBRWhCLFdBQUt4QyxHQUFMLEdBQVcsRUFBWDtBQUNBLFdBQUtELE9BQUwsR0FBZUEsT0FBZjtBQUNBLGlCQUFZQyxHQUFaLEVBQWlCeUMsT0FBakIsQ0FBeUIsVUFBQ0MsTUFBRCxFQUFZO0FBQ25DLGFBQUsxQyxHQUFMLENBQVMwQyxNQUFULElBQW1CMUMsSUFBSTBDLE1BQUosRUFBWUMsSUFBWixRQUFuQjtBQUNELEtBRkQsRUFKZ0I7QUFPakIsRyxhQVJlN0MsSTs7O0FBV2xCLFNBQVN5QyxHQUFUIiwiZmlsZSI6Imh1Yi5qcyIsInNvdXJjZVJvb3QiOiJDOi9Vc2Vycy9CZW5pdG8vRG9jdW1lbnRzL2VwaWdyYW1zIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQGZsb3dcclxuaW1wb3J0IHsgSXRlbSB9IGZyb20gJ0AvbGliL0MxMzcvaXRlbSdcclxuaW1wb3J0IHsgc2Vzc2lvbiB9IGZyb20gJ0AvbGliL0MxMzcvc2Vzc2lvbidcclxuXHJcbmNvbnN0IGh1YiA9IHtcclxuICBhc3luYyBzZXQgKGh1Yikge1xuICAgIGxldCBwYWNrID0gYXdhaXQgdGhpcy5zZXNzaW9uLnBhY2soaHViLCAncHVibGljJylcclxuICAgIHJldHVybiBhd2FpdCB0aGlzLnNldChbJ2h1YicsIGh1Yi5pZF0sIHBhY2spXHJcbiAgfSxcclxuXHJcbiAgYXN5bmMgZ2V0QWxsICgpIHtcclxuICAgIGxldCBrZXlzID0gWydodWInXVxyXG4gICAgbGV0IGh1YnMgPSBhd2FpdCB0aGlzLmdldEFsbChrZXlzKVxyXG4gICAgdmFyIHJlc3VsdCA9IFtdXHJcbiAgICBmb3IgKGxldCBodWIgb2YgaHVicykge1xuICAgICAgbGV0IGRhdGEgPSBhd2FpdCB0aGlzLnNlc3Npb24udW5wYWNrKGh1Yi5kYXRhLCAncHVibGljJylcbiAgICAgIHJlc3VsdC5wdXNoKGRhdGEpXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdFxyXG4gIH0sXHJcblxyXG4gIGFzeW5jIHNlbGVjdCAoa2V5LCBrZXl3b3JkKSB7XHJcbiAgICBhd2FpdCB0aGlzLnNlc3Npb24uc2V0S2V5d29yZChrZXl3b3JkLCBrZXkpXHJcbiAgICByZXR1cm4gdGhpcy5pdGVtLmdldEFsbCgpXHJcbiAgfSxcclxuXHJcbiAgYXN5bmMgY3JlYXRlIChrZXksIGtleXdvcmQpIHtcclxuICAgIHZhciBub3cgPSBEYXRlLm5vdygpIC8gMTAwMFxyXG4gICAgdmFyIGh1YiA9IHtcclxuICAgICAgaWQ6IGtleSxcclxuICAgICAgY3JlYXRlZDogbm93LFxyXG4gICAgICB1cGRhdGVkOiBub3dcclxuICAgIH1cclxuICAgIHZhciBrZXlzID0gWydodWInLCBrZXldXHJcbiAgICBhd2FpdCB0aGlzLmZyZWUoa2V5cylcclxuICAgIGF3YWl0IHRoaXMuaHViLnNldChodWIpXHJcbiAgICBhd2FpdCB0aGlzLnNlc3Npb24uc2V0S2V5d29yZChrZXl3b3JkLCBrZXkpXHJcbiAgICByZXR1cm4gaHViXHJcbiAgfSxcclxuXHJcbiAgYXN5bmMgdXBkYXRlIChrZXksIG5ld0tleSwgbmV3S2V5d29yZCkge1xyXG4gICAgY29uc3Qgc2VsZWN0ZWRIdWIgPSBhd2FpdCB0aGlzLnNlc3Npb24uZ2V0KClcclxuICAgIGlmIChzZWxlY3RlZEh1YiAmJiBzZWxlY3RlZEh1Yi5pZCA9PT0ga2V5KSB7XHJcbiAgICAgIGF3YWl0IHRoaXMuZnJlZShbJ2h1YicsIG5ld0tleV0pXHJcbiAgICAgIGF3YWl0IHRoaXMuZXhpc3QoWydodWInLCBrZXldKVxyXG4gICAgICBsZXQgZGF0YSA9IGF3YWl0IHRoaXMuZ2V0KFsnaHViJywga2V5XSlcclxuICAgICAgbGV0IGl0ZW1zID0gYXdhaXQgdGhpcy5pdGVtLmdldEFsbCgpXHJcbiAgICAgIGF3YWl0IHRoaXMuZGVsQWxsKFsnaXRlbScsIGtleV0pXHJcbiAgICAgIGF3YWl0IHRoaXMuZGVsKFsnaHViJywga2V5XSlcclxuICAgICAgbGV0IGh1YiA9IGF3YWl0IHRoaXMuc2Vzc2lvbi51bnBhY2soZGF0YSwgJ3B1YmxpYycpXHJcbiAgICAgIGh1Yi5pZCA9IG5ld0tleVxyXG4gICAgICBodWIudXBkYXRlZCA9IERhdGUubm93KCkgLyAxMDAwXHJcbiAgICAgIGF3YWl0IHRoaXMuaHViLnNldChodWIpXHJcbiAgICAgIHZhciBrZXl3b3JkID0gbmV3S2V5d29yZCB8fCBzZWxlY3RlZEh1Yi5rZXl3b3JkXHJcbiAgICAgIGF3YWl0IHRoaXMuc2Vzc2lvbi5zZXRLZXl3b3JkKGtleXdvcmQsIG5ld0tleSlcclxuICAgICAgYXdhaXQgdGhpcy5pdGVtLnNldE1hbnkoaXRlbXMpXHJcbiAgICAgIHRoaXMuc2Vzc2lvbi5jbGVhcktleXdvcmQoKVxyXG4gICAgICByZXR1cm4gbmV3S2V5XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4gcmVqZWN0KG5ldyBFcnJvcignVVBEQVRFX0hVQl9OT1RfU0VMRUNURUQnKSkpXHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgYXN5bmMgdXBzZXJ0IChrZXksIGtleXdvcmQpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGF3YWl0IHRoaXMuZXhpc3QoWydodWInLCBrZXldKVxyXG4gICAgICBhd2FpdCB0aGlzLmh1Yi5zZWxlY3Qoa2V5LCBrZXl3b3JkKVxyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICByZXR1cm4gYXdhaXQgdGhpcy5odWIuY3JlYXRlKGtleSwga2V5d29yZClcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBhc3luYyBkZWxldGUgKGlkKSB7XHJcbiAgICBjb25zdCBodWIgPSBhd2FpdCB0aGlzLnNlc3Npb24uZ2V0SHViKClcclxuICAgIGlmIChodWIgPT09IGlkKSB7XHJcbiAgICAgIGF3YWl0IHRoaXMuZGVsQWxsKFsnaXRlbScsIGh1Yl0pXHJcbiAgICAgIGF3YWl0IHRoaXMuZGVsKFsnaHViJywgaWRdKVxyXG4gICAgICBsZXQgaHVicyA9IGF3YWl0IHRoaXMuaHViLmdldEFsbCgpXHJcbiAgICAgIHRoaXMuc2Vzc2lvbi5jbGVhcktleXdvcmQoKVxyXG4gICAgICByZXR1cm4gaHVic1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHJlamVjdChuZXcgRXJyb3IoJ0RFTEVURV9IVUJfTk9UX1NFTEVDVEVEJykpKVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuY2xhc3MgSHViIGV4dGVuZHMgSXRlbSB7XHJcbiAgY29uc3RydWN0b3IgKG9wdCkge1xyXG4gICAgc3VwZXIob3B0KVxyXG4gICAgdGhpcy5odWIgPSB7fVxyXG4gICAgdGhpcy5zZXNzaW9uID0gc2Vzc2lvblxyXG4gICAgT2JqZWN0LmtleXMoaHViKS5mb3JFYWNoKChtZXRob2QpID0+IHtcclxuICAgICAgdGhpcy5odWJbbWV0aG9kXSA9IGh1YlttZXRob2RdLmJpbmQodGhpcylcclxuICAgIH0pXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBIdWIgfVxyXG4iXX0=

/***/ }),
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return C137; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_C137_localStorage__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_C137_indexedDB__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_dexie__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_dexie___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_dexie__);



var

C137 =
function C137(opt) {__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, C137);
  try {
    if (window.Worker) {
      window.sessionWorker = new Worker('/static/worker.js');
    }
    this.name = opt && opt.name ? opt.name : 'c137';
    this.version = opt && opt.version ? opt.version : 1;
    this.db = new __WEBPACK_IMPORTED_MODULE_4_dexie___default.a(this.name);
    this.db.version(this.version).stores({
      items: '&id, data, created, updated' });

    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default()(this, __WEBPACK_IMPORTED_MODULE_3__lib_C137_indexedDB__["a" /* indexedDB */]);
  } catch (e) {
    console.log(e);
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default()(this, __WEBPACK_IMPORTED_MODULE_2__lib_C137_localStorage__["a" /* localStorage */]);
  }
};



//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyY1xcbGliXFxDMTM3XFxDMTM3LmpzIl0sIm5hbWVzIjpbImxvY2FsU3RvcmFnZSIsImluZGV4ZWREQiIsIkRleGllIiwiQzEzNyIsIm9wdCIsIndpbmRvdyIsIldvcmtlciIsInNlc3Npb25Xb3JrZXIiLCJuYW1lIiwidmVyc2lvbiIsImRiIiwic3RvcmVzIiwiaXRlbXMiLCJlIiwiY29uc29sZSIsImxvZyJdLCJtYXBwaW5ncyI6IjtBQUNBLFNBQVNBLFlBQVQsUUFBNkIseUJBQTdCO0FBQ0EsU0FBU0MsU0FBVCxRQUEwQixzQkFBMUI7QUFDQSxPQUFPQyxLQUFQLE1BQWtCLE9BQWxCLEM7O0FBRU1DLEk7QUFDSixjQUFhQyxHQUFiLEVBQWtCO0FBQ2hCLE1BQUk7QUFDRixRQUFJQyxPQUFPQyxNQUFYLEVBQW1CO0FBQ2pCRCxhQUFPRSxhQUFQLEdBQXVCLElBQUlELE1BQUosQ0FBVyxtQkFBWCxDQUF2QjtBQUNEO0FBQ0QsU0FBS0UsSUFBTCxHQUFhSixPQUFPQSxJQUFJSSxJQUFaLEdBQW9CSixJQUFJSSxJQUF4QixHQUErQixNQUEzQztBQUNBLFNBQUtDLE9BQUwsR0FBZ0JMLE9BQU9BLElBQUlLLE9BQVosR0FBdUJMLElBQUlLLE9BQTNCLEdBQXFDLENBQXBEO0FBQ0EsU0FBS0MsRUFBTCxHQUFVLElBQUlSLEtBQUosQ0FBVSxLQUFLTSxJQUFmLENBQVY7QUFDQSxTQUFLRSxFQUFMLENBQVFELE9BQVIsQ0FBZ0IsS0FBS0EsT0FBckIsRUFBOEJFLE1BQTlCLENBQXFDO0FBQ25DQyxhQUFPLDZCQUQ0QixFQUFyQzs7QUFHQSxtQkFBYyxJQUFkLEVBQW9CWCxTQUFwQjtBQUNELEdBWEQsQ0FXRSxPQUFPWSxDQUFQLEVBQVU7QUFDVkMsWUFBUUMsR0FBUixDQUFZRixDQUFaO0FBQ0EsbUJBQWMsSUFBZCxFQUFvQmIsWUFBcEI7QUFDRDtBQUNGLEM7OztBQUdILFNBQVNHLElBQVQiLCJmaWxlIjoiQzEzNy5qcyIsInNvdXJjZVJvb3QiOiJDOi9Vc2Vycy9CZW5pdG8vRG9jdW1lbnRzL2VwaWdyYW1zIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQGZsb3dcclxuaW1wb3J0IHsgbG9jYWxTdG9yYWdlIH0gZnJvbSAnQC9saWIvQzEzNy9sb2NhbFN0b3JhZ2UnXHJcbmltcG9ydCB7IGluZGV4ZWREQiB9IGZyb20gJ0AvbGliL0MxMzcvaW5kZXhlZERCJ1xyXG5pbXBvcnQgRGV4aWUgZnJvbSAnZGV4aWUnXHJcblxyXG5jbGFzcyBDMTM3IHtcclxuICBjb25zdHJ1Y3RvciAob3B0KSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBpZiAod2luZG93Lldvcmtlcikge1xyXG4gICAgICAgIHdpbmRvdy5zZXNzaW9uV29ya2VyID0gbmV3IFdvcmtlcignL3N0YXRpYy93b3JrZXIuanMnKVxyXG4gICAgICB9XHJcbiAgICAgIHRoaXMubmFtZSA9IChvcHQgJiYgb3B0Lm5hbWUpID8gb3B0Lm5hbWUgOiAnYzEzNydcclxuICAgICAgdGhpcy52ZXJzaW9uID0gKG9wdCAmJiBvcHQudmVyc2lvbikgPyBvcHQudmVyc2lvbiA6IDFcclxuICAgICAgdGhpcy5kYiA9IG5ldyBEZXhpZSh0aGlzLm5hbWUpXHJcbiAgICAgIHRoaXMuZGIudmVyc2lvbih0aGlzLnZlcnNpb24pLnN0b3Jlcyh7XHJcbiAgICAgICAgaXRlbXM6ICcmaWQsIGRhdGEsIGNyZWF0ZWQsIHVwZGF0ZWQnXHJcbiAgICAgIH0pXHJcbiAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgaW5kZXhlZERCKVxyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhlKVxyXG4gICAgICBPYmplY3QuYXNzaWduKHRoaXMsIGxvY2FsU3RvcmFnZSlcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IEMxMzcgfVxyXG4iXX0=

/***/ }),
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return indexedDB; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator__);

var indexedDB = {
  create: function () {var _ref = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default()(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.mark(function _callee() {return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:case 'end':return _context.stop();}}}, _callee, this);}));function create() {return _ref.apply(this, arguments);}return create;}(),


  update: function () {var _ref2 = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default()(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.mark(function _callee2() {return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:case 'end':return _context2.stop();}}}, _callee2, this);}));function update() {return _ref2.apply(this, arguments);}return update;}(),


  get: function () {var _ref3 = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default()(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.mark(function _callee3(keys) {var db, result;return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:_context3.next = 2;return (
                this.__operate());case 2:db = _context3.sent;_context3.next = 5;return (
                db.items.where('id').equals(keys.join(':')).toArray());case 5:result = _context3.sent;if (!
              result[0]) {_context3.next = 10;break;}return _context3.abrupt('return',
              result[0].data);case 10:throw (

                new Error('GET_FAIL'));case 11:case 'end':return _context3.stop();}}}, _callee3, this);}));function get(_x) {return _ref3.apply(this, arguments);}return get;}(),


  getAll: function () {var _ref4 = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default()(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.mark(function _callee4(keys) {var db, result;return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:_context4.next = 2;return (
                this.__operate());case 2:db = _context4.sent;_context4.next = 5;return (
                db.items.filter(function (item) {
                  return item.id.indexOf(keys.join(':') + ':') === 0;
                }).toArray());case 5:result = _context4.sent;if (!
              result) {_context4.next = 10;break;}return _context4.abrupt('return',
              result);case 10:throw (

                new Error('GET_ALL_FAIL'));case 11:case 'end':return _context4.stop();}}}, _callee4, this);}));function getAll(_x2) {return _ref4.apply(this, arguments);}return getAll;}(),


  set: function () {var _ref5 = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default()(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.mark(function _callee5(keys, data) {var db;return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.wrap(function _callee5$(_context5) {while (1) {switch (_context5.prev = _context5.next) {case 0:_context5.next = 2;return (
                this.__operate());case 2:db = _context5.sent;_context5.next = 5;return (
                db.items.put({ id: keys.join(':'), data: data }));case 5:return _context5.abrupt('return', _context5.sent);case 6:case 'end':return _context5.stop();}}}, _callee5, this);}));function set(_x3, _x4) {return _ref5.apply(this, arguments);}return set;}(),

  setMany: function () {var _ref6 = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default()(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.mark(function _callee6(data) {var db;return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.wrap(function _callee6$(_context6) {while (1) {switch (_context6.prev = _context6.next) {case 0:_context6.next = 2;return (
                this.__operate());case 2:db = _context6.sent;_context6.next = 5;return (
                db.items.bulkPut(data));case 5:return _context6.abrupt('return', _context6.sent);case 6:case 'end':return _context6.stop();}}}, _callee6, this);}));function setMany(_x5) {return _ref6.apply(this, arguments);}return setMany;}(),

  del: function () {var _ref7 = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default()(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.mark(function _callee7(keys, key) {var db;return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.wrap(function _callee7$(_context7) {while (1) {switch (_context7.prev = _context7.next) {case 0:_context7.next = 2;return (
                this.__operate());case 2:db = _context7.sent;_context7.next = 5;return (
                db.items.where('id').equals(keys.join(':')).delete());case 5:return _context7.abrupt('return',
              key);case 6:case 'end':return _context7.stop();}}}, _callee7, this);}));function del(_x6, _x7) {return _ref7.apply(this, arguments);}return del;}(),

  delSome: function () {var _ref8 = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default()(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.mark(function _callee8(keys) {var db;return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.wrap(function _callee8$(_context8) {while (1) {switch (_context8.prev = _context8.next) {case 0:_context8.next = 2;return (
                this.__operate());case 2:db = _context8.sent;_context8.next = 5;return (
                db.items.filter(function (item) {
                  return keys.indexOf(item.id) !== -1;
                }).delete());case 5:return _context8.abrupt('return',
              keys);case 6:case 'end':return _context8.stop();}}}, _callee8, this);}));function delSome(_x8) {return _ref8.apply(this, arguments);}return delSome;}(),

  delAll: function () {var _ref9 = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default()(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.mark(function _callee9(keys) {var db;return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.wrap(function _callee9$(_context9) {while (1) {switch (_context9.prev = _context9.next) {case 0:_context9.next = 2;return (
                this.__operate());case 2:db = _context9.sent;_context9.next = 5;return (
                db.items.filter(function (item) {
                  return item.id.indexOf(keys.join(':') + ':') === 0;
                }).delete());case 5:return _context9.abrupt('return',
              keys);case 6:case 'end':return _context9.stop();}}}, _callee9, this);}));function delAll(_x9) {return _ref9.apply(this, arguments);}return delAll;}(),

  free: function () {var _ref10 = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default()(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.mark(function _callee10(keys) {var db, result;return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.wrap(function _callee10$(_context10) {while (1) {switch (_context10.prev = _context10.next) {case 0:_context10.next = 2;return (
                this.__operate());case 2:db = _context10.sent;_context10.next = 5;return (
                db.items.where('id').
                equals(keys.join(':')).
                toArray());case 5:result = _context10.sent;if (!(
              result.length === 0)) {_context10.next = 10;break;}return _context10.abrupt('return',
              keys);case 10:throw (

                new Error('IS_NOT_FREE'));case 11:case 'end':return _context10.stop();}}}, _callee10, this);}));function free(_x10) {return _ref10.apply(this, arguments);}return free;}(),


  exist: function () {var _ref11 = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default()(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.mark(function _callee11(keys) {var db, result;return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.wrap(function _callee11$(_context11) {while (1) {switch (_context11.prev = _context11.next) {case 0:_context11.next = 2;return (
                this.__operate());case 2:db = _context11.sent;_context11.next = 5;return (
                db.items.where('id').
                equals(keys.join(':')).
                toArray());case 5:result = _context11.sent;if (!(
              result.length > 0)) {_context11.next = 10;break;}return _context11.abrupt('return',
              result[0].data);case 10:throw (

                new Error('DOES_NOT_EXIST'));case 11:case 'end':return _context11.stop();}}}, _callee11, this);}));function exist(_x11) {return _ref11.apply(this, arguments);}return exist;}(),


  __operate: function () {var _ref12 = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default()(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.mark(function _callee12() {var _this = this;return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.wrap(function _callee12$(_context12) {while (1) {switch (_context12.prev = _context12.next) {case 0:if (
              this.db.isOpen()) {_context12.next = 6;break;}_context12.next = 3;return (
                this.db.open());case 3:return _context12.abrupt('return', _context12.sent);case 6:return _context12.abrupt('return',

              new __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a(function (resolve) {return resolve(_this.db);}));case 7:case 'end':return _context12.stop();}}}, _callee12, this);}));function __operate() {return _ref12.apply(this, arguments);}return __operate;}() };





//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyY1xcbGliXFxDMTM3XFxpbmRleGVkREIuanMiXSwibmFtZXMiOlsiaW5kZXhlZERCIiwiY3JlYXRlIiwidXBkYXRlIiwiZ2V0Iiwia2V5cyIsIl9fb3BlcmF0ZSIsImRiIiwiaXRlbXMiLCJ3aGVyZSIsImVxdWFscyIsImpvaW4iLCJ0b0FycmF5IiwicmVzdWx0IiwiZGF0YSIsIkVycm9yIiwiZ2V0QWxsIiwiZmlsdGVyIiwiaXRlbSIsImlkIiwiaW5kZXhPZiIsInNldCIsInB1dCIsInNldE1hbnkiLCJidWxrUHV0IiwiZGVsIiwia2V5IiwiZGVsZXRlIiwiZGVsU29tZSIsImRlbEFsbCIsImZyZWUiLCJsZW5ndGgiLCJleGlzdCIsImlzT3BlbiIsIm9wZW4iLCJyZXNvbHZlIl0sIm1hcHBpbmdzIjoiO0FBQ0EsSUFBTUEsWUFBWTtBQUNoQkMsNkVBQVEsa01BQVIsMkVBRGdCOzs7QUFJaEJDLDhFQUFRLHlNQUFSLDRFQUpnQjs7O0FBT2hCQywyRUFBSyxrQkFBZ0JDLElBQWhCO0FBQ1kscUJBQUtDLFNBQUwsRUFEWixTQUNDQyxFQUREO0FBRWdCQSxtQkFBR0MsS0FBSCxDQUFTQyxLQUFULENBQWUsSUFBZixFQUFxQkMsTUFBckIsQ0FBNEJMLEtBQUtNLElBQUwsQ0FBVSxHQUFWLENBQTVCLEVBQTRDQyxPQUE1QyxFQUZoQixTQUVDQyxNQUZEO0FBR0NBLHFCQUFPLENBQVAsQ0FIRDtBQUlNQSxxQkFBTyxDQUFQLEVBQVVDLElBSmhCOztBQU1LLG9CQUFJQyxLQUFKLENBQVUsVUFBVixDQU5MLG1FQUFMLHdFQVBnQjs7O0FBZ0JoQkMsOEVBQVEsa0JBQWdCWCxJQUFoQjtBQUNTLHFCQUFLQyxTQUFMLEVBRFQsU0FDRkMsRUFERTtBQUVhQSxtQkFBR0MsS0FBSCxDQUFTUyxNQUFULENBQWdCLFVBQVVDLElBQVYsRUFBZ0I7QUFDakQseUJBQU9BLEtBQUtDLEVBQUwsQ0FBUUMsT0FBUixDQUFnQmYsS0FBS00sSUFBTCxDQUFVLEdBQVYsSUFBaUIsR0FBakMsTUFBMEMsQ0FBakQ7QUFDRCxpQkFGa0IsRUFFaEJDLE9BRmdCLEVBRmIsU0FFRkMsTUFGRTtBQUtGQSxvQkFMRTtBQU1HQSxvQkFOSDs7QUFRRSxvQkFBSUUsS0FBSixDQUFVLGNBQVYsQ0FSRixtRUFBUiwrRUFoQmdCOzs7QUEyQmhCTSwyRUFBSyxrQkFBZ0JoQixJQUFoQixFQUFzQlMsSUFBdEI7QUFDWSxxQkFBS1IsU0FBTCxFQURaLFNBQ0NDLEVBREQ7QUFFVUEsbUJBQUdDLEtBQUgsQ0FBU2MsR0FBVCxDQUFhLEVBQUVILElBQUlkLEtBQUtNLElBQUwsQ0FBVSxHQUFWLENBQU4sRUFBc0JHLE1BQU1BLElBQTVCLEVBQWIsQ0FGViwySEFBTCw4RUEzQmdCOztBQStCaEJTLCtFQUFTLGtCQUFnQlQsSUFBaEI7QUFDUSxxQkFBS1IsU0FBTCxFQURSLFNBQ0hDLEVBREc7QUFFTUEsbUJBQUdDLEtBQUgsQ0FBU2dCLE9BQVQsQ0FBaUJWLElBQWpCLENBRk4sMkhBQVQsaUZBL0JnQjs7QUFtQ2hCVywyRUFBSyxrQkFBZ0JwQixJQUFoQixFQUFzQnFCLEdBQXRCO0FBQ1kscUJBQUtwQixTQUFMLEVBRFosU0FDQ0MsRUFERDtBQUVHQSxtQkFBR0MsS0FBSCxDQUFTQyxLQUFULENBQWUsSUFBZixFQUFxQkMsTUFBckIsQ0FBNEJMLEtBQUtNLElBQUwsQ0FBVSxHQUFWLENBQTVCLEVBQTRDZ0IsTUFBNUMsRUFGSDtBQUdJRCxpQkFISixrRUFBTCw4RUFuQ2dCOztBQXdDaEJFLCtFQUFTLGtCQUFnQnZCLElBQWhCO0FBQ1EscUJBQUtDLFNBQUwsRUFEUixTQUNIQyxFQURHO0FBRURBLG1CQUFHQyxLQUFILENBQVNTLE1BQVQsQ0FBZ0IsVUFBVUMsSUFBVixFQUFnQjtBQUNwQyx5QkFBT2IsS0FBS2UsT0FBTCxDQUFhRixLQUFLQyxFQUFsQixNQUEwQixDQUFDLENBQWxDO0FBQ0QsaUJBRkssRUFFSFEsTUFGRyxFQUZDO0FBS0F0QixrQkFMQSxrRUFBVCxpRkF4Q2dCOztBQStDaEJ3Qiw4RUFBUSxrQkFBZ0J4QixJQUFoQjtBQUNTLHFCQUFLQyxTQUFMLEVBRFQsU0FDRkMsRUFERTtBQUVBQSxtQkFBR0MsS0FBSCxDQUFTUyxNQUFULENBQWdCLFVBQVVDLElBQVYsRUFBZ0I7QUFDcEMseUJBQU9BLEtBQUtDLEVBQUwsQ0FBUUMsT0FBUixDQUFnQmYsS0FBS00sSUFBTCxDQUFVLEdBQVYsSUFBaUIsR0FBakMsTUFBMEMsQ0FBakQ7QUFDRCxpQkFGSyxFQUVIZ0IsTUFGRyxFQUZBO0FBS0N0QixrQkFMRCxrRUFBUiwrRUEvQ2dCOztBQXNEaEJ5Qiw2RUFBTSxtQkFBZ0J6QixJQUFoQjtBQUNXLHFCQUFLQyxTQUFMLEVBRFgsU0FDQUMsRUFEQTtBQUVlQSxtQkFBR0MsS0FBSCxDQUFTQyxLQUFULENBQWUsSUFBZjtBQUNoQkMsc0JBRGdCLENBQ1RMLEtBQUtNLElBQUwsQ0FBVSxHQUFWLENBRFM7QUFFaEJDLHVCQUZnQixFQUZmLFNBRUFDLE1BRkE7QUFLQUEscUJBQU9rQixNQUFQLEtBQWtCLENBTGxCO0FBTUsxQixrQkFOTDs7QUFRSSxvQkFBSVUsS0FBSixDQUFVLGFBQVYsQ0FSSixxRUFBTiw2RUF0RGdCOzs7QUFpRWhCaUIsOEVBQU8sbUJBQWdCM0IsSUFBaEI7QUFDVSxxQkFBS0MsU0FBTCxFQURWLFNBQ0RDLEVBREM7QUFFY0EsbUJBQUdDLEtBQUgsQ0FBU0MsS0FBVCxDQUFlLElBQWY7QUFDaEJDLHNCQURnQixDQUNUTCxLQUFLTSxJQUFMLENBQVUsR0FBVixDQURTO0FBRWhCQyx1QkFGZ0IsRUFGZCxTQUVEQyxNQUZDO0FBS0RBLHFCQUFPa0IsTUFBUCxHQUFnQixDQUxmO0FBTUlsQixxQkFBTyxDQUFQLEVBQVVDLElBTmQ7O0FBUUcsb0JBQUlDLEtBQUosQ0FBVSxnQkFBVixDQVJILHFFQUFQLCtFQWpFZ0I7OztBQTRFaEJULGtGQUFXO0FBQ0osbUJBQUtDLEVBQUwsQ0FBUTBCLE1BQVIsRUFESTtBQUVNLHFCQUFLMUIsRUFBTCxDQUFRMkIsSUFBUixFQUZOOztBQUlBLDJCQUFZLDJCQUFXQyxRQUFRLE1BQUs1QixFQUFiLENBQVgsRUFBWixDQUpBLG9FQUFYLG1GQTVFZ0IsRUFBbEI7Ozs7O0FBcUZBLFNBQVNOLFNBQVQiLCJmaWxlIjoiaW5kZXhlZERCLmpzIiwic291cmNlUm9vdCI6IkM6L1VzZXJzL0Jlbml0by9Eb2N1bWVudHMvZXBpZ3JhbXMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBAZmxvd1xyXG5jb25zdCBpbmRleGVkREIgPSB7XHJcbiAgY3JlYXRlOiBhc3luYyBmdW5jdGlvbiAoKSB7XHJcblxyXG4gIH0sXHJcbiAgdXBkYXRlOiBhc3luYyBmdW5jdGlvbiAoKSB7XHJcblxyXG4gIH0sXHJcbiAgZ2V0OiBhc3luYyBmdW5jdGlvbiAoa2V5cykge1xyXG4gICAgbGV0IGRiID0gYXdhaXQgdGhpcy5fX29wZXJhdGUoKVxyXG4gICAgbGV0IHJlc3VsdCA9IGF3YWl0IGRiLml0ZW1zLndoZXJlKCdpZCcpLmVxdWFscyhrZXlzLmpvaW4oJzonKSkudG9BcnJheSgpXHJcbiAgICBpZiAocmVzdWx0WzBdKSB7XHJcbiAgICAgIHJldHVybiByZXN1bHRbMF0uZGF0YVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdHRVRfRkFJTCcpXHJcbiAgICB9XHJcbiAgfSxcclxuICBnZXRBbGw6IGFzeW5jIGZ1bmN0aW9uIChrZXlzKSB7XHJcbiAgICBsZXQgZGIgPSBhd2FpdCB0aGlzLl9fb3BlcmF0ZSgpXHJcbiAgICBsZXQgcmVzdWx0ID0gYXdhaXQgZGIuaXRlbXMuZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgIHJldHVybiBpdGVtLmlkLmluZGV4T2Yoa2V5cy5qb2luKCc6JykgKyAnOicpID09PSAwXHJcbiAgICB9KS50b0FycmF5KClcclxuICAgIGlmIChyZXN1bHQpIHtcclxuICAgICAgcmV0dXJuIHJlc3VsdFxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdHRVRfQUxMX0ZBSUwnKVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgc2V0OiBhc3luYyBmdW5jdGlvbiAoa2V5cywgZGF0YSkge1xyXG4gICAgbGV0IGRiID0gYXdhaXQgdGhpcy5fX29wZXJhdGUoKVxyXG4gICAgcmV0dXJuIGF3YWl0IGRiLml0ZW1zLnB1dCh7IGlkOiBrZXlzLmpvaW4oJzonKSwgZGF0YTogZGF0YSB9KVxyXG4gIH0sXHJcbiAgc2V0TWFueTogYXN5bmMgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgIGxldCBkYiA9IGF3YWl0IHRoaXMuX19vcGVyYXRlKClcclxuICAgIHJldHVybiBhd2FpdCBkYi5pdGVtcy5idWxrUHV0KGRhdGEpXHJcbiAgfSxcclxuICBkZWw6IGFzeW5jIGZ1bmN0aW9uIChrZXlzLCBrZXkpIHtcclxuICAgIGxldCBkYiA9IGF3YWl0IHRoaXMuX19vcGVyYXRlKClcclxuICAgIGF3YWl0IGRiLml0ZW1zLndoZXJlKCdpZCcpLmVxdWFscyhrZXlzLmpvaW4oJzonKSkuZGVsZXRlKClcclxuICAgIHJldHVybiBrZXlcclxuICB9LFxyXG4gIGRlbFNvbWU6IGFzeW5jIGZ1bmN0aW9uIChrZXlzKSB7XHJcbiAgICBsZXQgZGIgPSBhd2FpdCB0aGlzLl9fb3BlcmF0ZSgpXHJcbiAgICBhd2FpdCBkYi5pdGVtcy5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgcmV0dXJuIGtleXMuaW5kZXhPZihpdGVtLmlkKSAhPT0gLTFcclxuICAgIH0pLmRlbGV0ZSgpXHJcbiAgICByZXR1cm4ga2V5c1xyXG4gIH0sXHJcbiAgZGVsQWxsOiBhc3luYyBmdW5jdGlvbiAoa2V5cykge1xyXG4gICAgbGV0IGRiID0gYXdhaXQgdGhpcy5fX29wZXJhdGUoKVxyXG4gICAgYXdhaXQgZGIuaXRlbXMuZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgIHJldHVybiBpdGVtLmlkLmluZGV4T2Yoa2V5cy5qb2luKCc6JykgKyAnOicpID09PSAwXHJcbiAgICB9KS5kZWxldGUoKVxyXG4gICAgcmV0dXJuIGtleXNcclxuICB9LFxyXG4gIGZyZWU6IGFzeW5jIGZ1bmN0aW9uIChrZXlzKSB7XHJcbiAgICBsZXQgZGIgPSBhd2FpdCB0aGlzLl9fb3BlcmF0ZSgpXHJcbiAgICBsZXQgcmVzdWx0ID0gYXdhaXQgZGIuaXRlbXMud2hlcmUoJ2lkJylcclxuICAgICAgLmVxdWFscyhrZXlzLmpvaW4oJzonKSlcclxuICAgICAgLnRvQXJyYXkoKVxyXG4gICAgaWYgKHJlc3VsdC5sZW5ndGggPT09IDApIHtcclxuICAgICAgcmV0dXJuIGtleXNcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignSVNfTk9UX0ZSRUUnKVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgZXhpc3Q6IGFzeW5jIGZ1bmN0aW9uIChrZXlzKSB7XHJcbiAgICBsZXQgZGIgPSBhd2FpdCB0aGlzLl9fb3BlcmF0ZSgpXHJcbiAgICBsZXQgcmVzdWx0ID0gYXdhaXQgZGIuaXRlbXMud2hlcmUoJ2lkJylcclxuICAgICAgLmVxdWFscyhrZXlzLmpvaW4oJzonKSlcclxuICAgICAgLnRvQXJyYXkoKVxyXG4gICAgaWYgKHJlc3VsdC5sZW5ndGggPiAwKSB7XHJcbiAgICAgIHJldHVybiByZXN1bHRbMF0uZGF0YVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdET0VTX05PVF9FWElTVCcpXHJcbiAgICB9XHJcbiAgfSxcclxuICBfX29wZXJhdGU6IGFzeW5jIGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICghdGhpcy5kYi5pc09wZW4oKSkge1xyXG4gICAgICByZXR1cm4gYXdhaXQgdGhpcy5kYi5vcGVuKClcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHJlc29sdmUodGhpcy5kYikpXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBpbmRleGVkREIgfVxyXG4iXX0=

/***/ }),
/* 65 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Item; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_core_js_get_iterator__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_core_js_get_iterator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_core_js_get_iterator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_regenerator__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_babel_runtime_core_js_promise__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_babel_runtime_core_js_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_babel_runtime_helpers_asyncToGenerator__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_babel_runtime_helpers_asyncToGenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_babel_runtime_helpers_asyncToGenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__lib_C137_C137__ = __webpack_require__(63);



var item = {
  set: function set(item) {var _this = this;return __WEBPACK_IMPORTED_MODULE_8_babel_runtime_helpers_asyncToGenerator___default()(__WEBPACK_IMPORTED_MODULE_6_babel_runtime_regenerator___default.a.mark(function _callee() {var selectedHub, data;return __WEBPACK_IMPORTED_MODULE_6_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_context.next = 2;return (
                _this.session.get());case 2:selectedHub = _context.sent;if (!
              selectedHub) {_context.next = 14;break;}if (
              item.id) {_context.next = 8;break;}_context.next = 7;return (
                _this.session.hash(item.label));case 7:item.id = _context.sent;case 8:_context.next = 10;return (

                _this.session.pack(item, selectedHub.keyword));case 10:data = _context.sent;return _context.abrupt('return',
              _this.set(['item', selectedHub.id, item.id], data));case 14:return _context.abrupt('return',

              new __WEBPACK_IMPORTED_MODULE_7_babel_runtime_core_js_promise___default.a(function (resolve, reject) {return reject(new Error('SET_ITEM_NOT_SELECTED'));}));case 15:case 'end':return _context.stop();}}}, _callee, _this);}))();

  },

  setMany: function setMany(items) {var _this2 = this;return __WEBPACK_IMPORTED_MODULE_8_babel_runtime_helpers_asyncToGenerator___default()(__WEBPACK_IMPORTED_MODULE_6_babel_runtime_regenerator___default.a.mark(function _callee2() {var selectedHub, newItems;return __WEBPACK_IMPORTED_MODULE_6_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:_context2.next = 2;return (
                _this2.session.get());case 2:selectedHub = _context2.sent;if (!
              selectedHub) {_context2.next = 10;break;}_context2.next = 6;return (
                _this2.item.pack(items, selectedHub));case 6:newItems = _context2.sent;return _context2.abrupt('return',
              _this2.setMany(newItems));case 10:return _context2.abrupt('return',

              new __WEBPACK_IMPORTED_MODULE_7_babel_runtime_core_js_promise___default.a(function (resolve, reject) {return reject(new Error('SET_ITEMS_NOT_SELECTED'));}));case 11:case 'end':return _context2.stop();}}}, _callee2, _this2);}))();

  },

  create: function create(item) {var _this3 = this;return __WEBPACK_IMPORTED_MODULE_8_babel_runtime_helpers_asyncToGenerator___default()(__WEBPACK_IMPORTED_MODULE_6_babel_runtime_regenerator___default.a.mark(function _callee3() {var selectedHub, now, keys;return __WEBPACK_IMPORTED_MODULE_6_babel_runtime_regenerator___default.a.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:_context3.next = 2;return (
                _this3.session.get());case 2:selectedHub = _context3.sent;if (!
              selectedHub) {_context3.next = 16;break;}
              now = Date.now() / 1000;_context3.next = 7;return (
                _this3.session.hash(item.label));case 7:item.id = _context3.sent;
              item.created = now;
              item.updated = now;
              keys = ['item', selectedHub.id, item.id];_context3.next = 13;return (
                _this3.free(keys));case 13:return _context3.abrupt('return',
              _this3.item.set(item));case 16:return _context3.abrupt('return',

              new __WEBPACK_IMPORTED_MODULE_7_babel_runtime_core_js_promise___default.a(function (resolve, reject) {return reject(new Error('CREATE_ITEM_NOT_SELECTED'));}));case 17:case 'end':return _context3.stop();}}}, _callee3, _this3);}))();

  },

  update: function update(item) {var _this4 = this;return __WEBPACK_IMPORTED_MODULE_8_babel_runtime_helpers_asyncToGenerator___default()(__WEBPACK_IMPORTED_MODULE_6_babel_runtime_regenerator___default.a.mark(function _callee4() {var selectedHub, oldKeys, id, keys, now;return __WEBPACK_IMPORTED_MODULE_6_babel_runtime_regenerator___default.a.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:_context4.next = 2;return (
                _this4.session.get());case 2:selectedHub = _context4.sent;if (!
              selectedHub) {_context4.next = 29;break;}
              oldKeys = ['item', selectedHub.id, item.id];_context4.next = 7;return (
                _this4.session.hash(item.label));case 7:id = _context4.sent;
              keys = ['item', selectedHub.id, id];_context4.prev = 9;_context4.next = 12;return (

                _this4.exist(oldKeys));case 12:_context4.next = 14;return (
                _this4.free(keys));case 14:_context4.next = 16;return (
                _this4.del(oldKeys));case 16:
              now = Date.now() / 1000;_context4.next = 19;return (
                _this4.session.hash(item.label));case 19:item.id = _context4.sent;
              item.updated = now;return _context4.abrupt('return',
              _this4.item.set(item));case 24:_context4.prev = 24;_context4.t0 = _context4['catch'](9);throw _context4.t0;case 27:_context4.next = 30;break;case 29:return _context4.abrupt('return',




              new __WEBPACK_IMPORTED_MODULE_7_babel_runtime_core_js_promise___default.a(function (resolve, reject) {return reject(new Error('UPDATE_ITEM_NOT_SELECTED'));}));case 30:case 'end':return _context4.stop();}}}, _callee4, _this4, [[9, 24]]);}))();

  },

  upsert: function upsert(item) {var _this5 = this;return __WEBPACK_IMPORTED_MODULE_8_babel_runtime_helpers_asyncToGenerator___default()(__WEBPACK_IMPORTED_MODULE_6_babel_runtime_regenerator___default.a.mark(function _callee5() {var hub;return __WEBPACK_IMPORTED_MODULE_6_babel_runtime_regenerator___default.a.wrap(function _callee5$(_context5) {while (1) {switch (_context5.prev = _context5.next) {case 0:_context5.prev = 0;_context5.next = 3;return (

                _this5.session.getHub());case 3:hub = _context5.sent;_context5.next = 6;return (
                _this5.free(['item', hub, item.id]));case 6:return _context5.abrupt('return',
              _this5.item.create(item));case 9:_context5.prev = 9;_context5.t0 = _context5['catch'](0);return _context5.abrupt('return',


              _this5.item.set(item));case 12:case 'end':return _context5.stop();}}}, _callee5, _this5, [[0, 9]]);}))();

  },

  delSome: function delSome(ids) {var _this6 = this;return __WEBPACK_IMPORTED_MODULE_8_babel_runtime_helpers_asyncToGenerator___default()(__WEBPACK_IMPORTED_MODULE_6_babel_runtime_regenerator___default.a.mark(function _callee6() {var selectedHub, toDel;return __WEBPACK_IMPORTED_MODULE_6_babel_runtime_regenerator___default.a.wrap(function _callee6$(_context6) {while (1) {switch (_context6.prev = _context6.next) {case 0:_context6.next = 2;return (
                _this6.session.get());case 2:selectedHub = _context6.sent;if (!
              selectedHub) {_context6.next = 9;break;}
              toDel = [];
              ids.forEach(function (id) {
                toDel.push('item:' + selectedHub.id + ':' + id);
              });return _context6.abrupt('return',
              _this6.delSome(toDel));case 9:return _context6.abrupt('return',

              new __WEBPACK_IMPORTED_MODULE_7_babel_runtime_core_js_promise___default.a(function (resolve, reject) {reject(new Error('DELETE_ITEMS_NOT_SELECTED'));}));case 10:case 'end':return _context6.stop();}}}, _callee6, _this6);}))();

  },

  get: function get(label) {var _this7 = this;return __WEBPACK_IMPORTED_MODULE_8_babel_runtime_helpers_asyncToGenerator___default()(__WEBPACK_IMPORTED_MODULE_6_babel_runtime_regenerator___default.a.mark(function _callee7() {var selectedHub, id, keys, data, dec;return __WEBPACK_IMPORTED_MODULE_6_babel_runtime_regenerator___default.a.wrap(function _callee7$(_context7) {while (1) {switch (_context7.prev = _context7.next) {case 0:_context7.next = 2;return (
                _this7.session.get());case 2:selectedHub = _context7.sent;if (!
              selectedHub) {_context7.next = 23;break;}_context7.prev = 4;_context7.next = 7;return (

                _this7.session.hash(label));case 7:id = _context7.sent;
              keys = ['item', selectedHub.id, id];_context7.next = 11;return (
                _this7.get(keys));case 11:data = _context7.sent;_context7.next = 14;return (
                _this7.session.unpack(data, selectedHub.keyword));case 14:dec = _context7.sent;return _context7.abrupt('return',
              dec);case 18:_context7.prev = 18;_context7.t0 = _context7['catch'](4);throw _context7.t0;case 21:_context7.next = 24;break;case 23:throw (




                new Error('GET_ITEM_NOT_SELECTED'));case 24:case 'end':return _context7.stop();}}}, _callee7, _this7, [[4, 18]]);}))();

  },

  getAll: function getAll() {var _this8 = this;return __WEBPACK_IMPORTED_MODULE_8_babel_runtime_helpers_asyncToGenerator___default()(__WEBPACK_IMPORTED_MODULE_6_babel_runtime_regenerator___default.a.mark(function _callee8() {var selectedHub, keys, items;return __WEBPACK_IMPORTED_MODULE_6_babel_runtime_regenerator___default.a.wrap(function _callee8$(_context8) {while (1) {switch (_context8.prev = _context8.next) {case 0:_context8.next = 2;return (
                _this8.session.get());case 2:selectedHub = _context8.sent;if (!
              selectedHub) {_context8.next = 18;break;}
              keys = ['item', selectedHub.id];_context8.next = 7;return (
                _this8.getAll(keys));case 7:items = _context8.sent;_context8.prev = 8;return _context8.abrupt('return',

              _this8.item.unpack(items, selectedHub));case 12:_context8.prev = 12;_context8.t0 = _context8['catch'](8);

              _this8.session.clearKeyword();return _context8.abrupt('return',
              new Error('ITEMS_READ_FAIL'));case 16:_context8.next = 19;break;case 18:return _context8.abrupt('return',


              new Error('GET_ITEMS_NOT_SELECTED'));case 19:case 'end':return _context8.stop();}}}, _callee8, _this8, [[8, 12]]);}))();

  },

  pack: function pack(items, hub) {var _this9 = this;return __WEBPACK_IMPORTED_MODULE_8_babel_runtime_helpers_asyncToGenerator___default()(__WEBPACK_IMPORTED_MODULE_6_babel_runtime_regenerator___default.a.mark(function _callee9() {var result, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _item, data, id;return __WEBPACK_IMPORTED_MODULE_6_babel_runtime_regenerator___default.a.wrap(function _callee9$(_context9) {while (1) {switch (_context9.prev = _context9.next) {case 0:
              result = [];_iteratorNormalCompletion = true;_didIteratorError = false;_iteratorError = undefined;_context9.prev = 4;_iterator = __WEBPACK_IMPORTED_MODULE_5_babel_runtime_core_js_get_iterator___default()(
              items);case 6:if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {_context9.next = 16;break;}_item = _step.value;_context9.next = 10;return (
                _this9.session.pack(_item, hub.keyword));case 10:data = _context9.sent;
              id = ['item', hub.id, _item.id].join(':');
              result.push({ id: id, data: data });case 13:_iteratorNormalCompletion = true;_context9.next = 6;break;case 16:_context9.next = 22;break;case 18:_context9.prev = 18;_context9.t0 = _context9['catch'](4);_didIteratorError = true;_iteratorError = _context9.t0;case 22:_context9.prev = 22;_context9.prev = 23;if (!_iteratorNormalCompletion && _iterator.return) {_iterator.return();}case 25:_context9.prev = 25;if (!_didIteratorError) {_context9.next = 28;break;}throw _iteratorError;case 28:return _context9.finish(25);case 29:return _context9.finish(22);case 30:return _context9.abrupt('return',

              result);case 31:case 'end':return _context9.stop();}}}, _callee9, _this9, [[4, 18, 22, 30], [23,, 25, 29]]);}))();
  },

  unpack: function unpack(items, hub) {var _this10 = this;return __WEBPACK_IMPORTED_MODULE_8_babel_runtime_helpers_asyncToGenerator___default()(__WEBPACK_IMPORTED_MODULE_6_babel_runtime_regenerator___default.a.mark(function _callee10() {var result, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _item2, unpack;return __WEBPACK_IMPORTED_MODULE_6_babel_runtime_regenerator___default.a.wrap(function _callee10$(_context10) {while (1) {switch (_context10.prev = _context10.next) {case 0:
              result = [];_iteratorNormalCompletion2 = true;_didIteratorError2 = false;_iteratorError2 = undefined;_context10.prev = 4;_iterator2 = __WEBPACK_IMPORTED_MODULE_5_babel_runtime_core_js_get_iterator___default()(
              items);case 6:if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {_context10.next = 15;break;}_item2 = _step2.value;_context10.next = 10;return (
                _this10.session.unpack(_item2.data, hub.keyword));case 10:unpack = _context10.sent;
              if (unpack && result) {
                result.push(unpack);
              } else {
                result = false;
              }case 12:_iteratorNormalCompletion2 = true;_context10.next = 6;break;case 15:_context10.next = 21;break;case 17:_context10.prev = 17;_context10.t0 = _context10['catch'](4);_didIteratorError2 = true;_iteratorError2 = _context10.t0;case 21:_context10.prev = 21;_context10.prev = 22;if (!_iteratorNormalCompletion2 && _iterator2.return) {_iterator2.return();}case 24:_context10.prev = 24;if (!_didIteratorError2) {_context10.next = 27;break;}throw _iteratorError2;case 27:return _context10.finish(24);case 28:return _context10.finish(21);case 29:return _context10.abrupt('return',

              result);case 30:case 'end':return _context10.stop();}}}, _callee10, _this10, [[4, 17, 21, 29], [22,, 24, 28]]);}))();
  } };var


Item = function (_C) {__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(Item, _C);
  function Item(opt) {__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default()(this, Item);var _this11 = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Item.__proto__ || __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default()(Item)).call(this,
    opt));
    _this11.item = {};
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default()(item).forEach(function (method) {
      _this11.item[method] = item[method].bind(_this11);
    });return _this11;
  }return Item;}(__WEBPACK_IMPORTED_MODULE_9__lib_C137_C137__["a" /* C137 */]);



//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyY1xcbGliXFxDMTM3XFxpdGVtLmpzIl0sIm5hbWVzIjpbIkMxMzciLCJpdGVtIiwic2V0Iiwic2Vzc2lvbiIsImdldCIsInNlbGVjdGVkSHViIiwiaWQiLCJoYXNoIiwibGFiZWwiLCJwYWNrIiwia2V5d29yZCIsImRhdGEiLCJyZXNvbHZlIiwicmVqZWN0IiwiRXJyb3IiLCJzZXRNYW55IiwiaXRlbXMiLCJuZXdJdGVtcyIsImNyZWF0ZSIsIm5vdyIsIkRhdGUiLCJjcmVhdGVkIiwidXBkYXRlZCIsImtleXMiLCJmcmVlIiwidXBkYXRlIiwib2xkS2V5cyIsImV4aXN0IiwiZGVsIiwidXBzZXJ0IiwiZ2V0SHViIiwiaHViIiwiZGVsU29tZSIsImlkcyIsInRvRGVsIiwiZm9yRWFjaCIsInB1c2giLCJ1bnBhY2siLCJkZWMiLCJnZXRBbGwiLCJjbGVhcktleXdvcmQiLCJyZXN1bHQiLCJqb2luIiwiSXRlbSIsIm9wdCIsIm1ldGhvZCIsImJpbmQiXSwibWFwcGluZ3MiOiI7QUFDQSxTQUFTQSxJQUFULFFBQXFCLGlCQUFyQjs7QUFFQSxJQUFNQyxPQUFPO0FBQ0xDLEtBREssZUFDQUQsSUFEQSxFQUNNO0FBQ1csc0JBQUtFLE9BQUwsQ0FBYUMsR0FBYixFQURYLFNBQ1RDLFdBRFM7QUFFWEEseUJBRlc7QUFHUkosbUJBQUtLLEVBSEc7QUFJSyxzQkFBS0gsT0FBTCxDQUFhSSxJQUFiLENBQWtCTixLQUFLTyxLQUF2QixDQUpMLFNBSVhQLEtBQUtLLEVBSk07O0FBTUksc0JBQUtILE9BQUwsQ0FBYU0sSUFBYixDQUFrQlIsSUFBbEIsRUFBd0JJLFlBQVlLLE9BQXBDLENBTkosVUFNVEMsSUFOUztBQU9OLG9CQUFLVCxHQUFMLENBQVMsQ0FBQyxNQUFELEVBQVNHLFlBQVlDLEVBQXJCLEVBQXlCTCxLQUFLSyxFQUE5QixDQUFULEVBQTRDSyxJQUE1QyxDQVBNOztBQVNOLDJCQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixVQUFxQkEsT0FBTyxJQUFJQyxLQUFKLENBQVUsdUJBQVYsQ0FBUCxDQUFyQixFQUFaLENBVE07O0FBV2hCLEdBWlU7O0FBY0xDLFNBZEssbUJBY0lDLEtBZEosRUFjVztBQUNNLHVCQUFLYixPQUFMLENBQWFDLEdBQWIsRUFETixTQUNkQyxXQURjO0FBRWhCQSx5QkFGZ0I7QUFHRyx1QkFBS0osSUFBTCxDQUFVUSxJQUFWLENBQWVPLEtBQWYsRUFBc0JYLFdBQXRCLENBSEgsU0FHZFksUUFIYztBQUlYLHFCQUFLRixPQUFMLENBQWFFLFFBQWIsQ0FKVzs7QUFNWCwyQkFBWSxVQUFDTCxPQUFELEVBQVVDLE1BQVYsVUFBcUJBLE9BQU8sSUFBSUMsS0FBSixDQUFVLHdCQUFWLENBQVAsQ0FBckIsRUFBWixDQU5XOztBQVFyQixHQXRCVTs7QUF3QkxJLFFBeEJLLGtCQXdCR2pCLElBeEJILEVBd0JTO0FBQ1EsdUJBQUtFLE9BQUwsQ0FBYUMsR0FBYixFQURSLFNBQ1pDLFdBRFk7QUFFZEEseUJBRmM7QUFHWmMsaUJBSFksR0FHTkMsS0FBS0QsR0FBTCxLQUFhLElBSFA7QUFJQSx1QkFBS2hCLE9BQUwsQ0FBYUksSUFBYixDQUFrQk4sS0FBS08sS0FBdkIsQ0FKQSxTQUloQlAsS0FBS0ssRUFKVztBQUtoQkwsbUJBQUtvQixPQUFMLEdBQWVGLEdBQWY7QUFDQWxCLG1CQUFLcUIsT0FBTCxHQUFlSCxHQUFmO0FBQ0lJLGtCQVBZLEdBT0wsQ0FBQyxNQUFELEVBQVNsQixZQUFZQyxFQUFyQixFQUF5QkwsS0FBS0ssRUFBOUIsQ0FQSztBQVFWLHVCQUFLa0IsSUFBTCxDQUFVRCxJQUFWLENBUlU7QUFTVCxxQkFBS3RCLElBQUwsQ0FBVUMsR0FBVixDQUFjRCxJQUFkLENBVFM7O0FBV1QsMkJBQVksVUFBQ1csT0FBRCxFQUFVQyxNQUFWLFVBQXFCQSxPQUFPLElBQUlDLEtBQUosQ0FBVSwwQkFBVixDQUFQLENBQXJCLEVBQVosQ0FYUzs7QUFhbkIsR0FyQ1U7O0FBdUNMVyxRQXZDSyxrQkF1Q0d4QixJQXZDSCxFQXVDUztBQUNRLHVCQUFLRSxPQUFMLENBQWFDLEdBQWIsRUFEUixTQUNaQyxXQURZO0FBRWRBLHlCQUZjO0FBR1pxQixxQkFIWSxHQUdGLENBQUMsTUFBRCxFQUFTckIsWUFBWUMsRUFBckIsRUFBeUJMLEtBQUtLLEVBQTlCLENBSEU7QUFJRCx1QkFBS0gsT0FBTCxDQUFhSSxJQUFiLENBQWtCTixLQUFLTyxLQUF2QixDQUpDLFNBSVpGLEVBSlk7QUFLWmlCLGtCQUxZLEdBS0wsQ0FBQyxNQUFELEVBQVNsQixZQUFZQyxFQUFyQixFQUF5QkEsRUFBekIsQ0FMSzs7QUFPUix1QkFBS3FCLEtBQUwsQ0FBV0QsT0FBWCxDQVBRO0FBUVIsdUJBQUtGLElBQUwsQ0FBVUQsSUFBVixDQVJRO0FBU1IsdUJBQUtLLEdBQUwsQ0FBU0YsT0FBVCxDQVRRO0FBVVZQLGlCQVZVLEdBVUpDLEtBQUtELEdBQUwsS0FBYSxJQVZUO0FBV0UsdUJBQUtoQixPQUFMLENBQWFJLElBQWIsQ0FBa0JOLEtBQUtPLEtBQXZCLENBWEYsVUFXZFAsS0FBS0ssRUFYUztBQVlkTCxtQkFBS3FCLE9BQUwsR0FBZUgsR0FBZixDQVpjO0FBYVAscUJBQUtsQixJQUFMLENBQVVDLEdBQVYsQ0FBY0QsSUFBZCxDQWJPOzs7OztBQWtCVCwyQkFBWSxVQUFDVyxPQUFELEVBQVVDLE1BQVYsVUFBcUJBLE9BQU8sSUFBSUMsS0FBSixDQUFVLDBCQUFWLENBQVAsQ0FBckIsRUFBWixDQWxCUzs7QUFvQm5CLEdBM0RVOztBQTZETGUsUUE3REssa0JBNkRHNUIsSUE3REgsRUE2RFM7O0FBRUEsdUJBQUtFLE9BQUwsQ0FBYTJCLE1BQWIsRUFGQSxTQUVaQyxHQUZZO0FBR1YsdUJBQUtQLElBQUwsQ0FBVSxDQUFDLE1BQUQsRUFBU08sR0FBVCxFQUFjOUIsS0FBS0ssRUFBbkIsQ0FBVixDQUhVO0FBSVQscUJBQUtMLElBQUwsQ0FBVWlCLE1BQVYsQ0FBaUJqQixJQUFqQixDQUpTOzs7QUFPVCxxQkFBS0EsSUFBTCxDQUFVQyxHQUFWLENBQWNELElBQWQsQ0FQUzs7QUFTbkIsR0F0RVU7O0FBd0VMK0IsU0F4RUssbUJBd0VJQyxHQXhFSixFQXdFUztBQUNRLHVCQUFLOUIsT0FBTCxDQUFhQyxHQUFiLEVBRFIsU0FDWkMsV0FEWTtBQUVkQSx5QkFGYztBQUdaNkIsbUJBSFksR0FHSixFQUhJO0FBSWhCRCxrQkFBSUUsT0FBSixDQUFZLFVBQVU3QixFQUFWLEVBQWM7QUFDeEI0QixzQkFBTUUsSUFBTixDQUFXLFVBQVUvQixZQUFZQyxFQUF0QixHQUEyQixHQUEzQixHQUFpQ0EsRUFBNUM7QUFDRCxlQUZELEVBSmdCO0FBT1QscUJBQUswQixPQUFMLENBQWFFLEtBQWIsQ0FQUzs7QUFTVCwyQkFBWSxVQUFVdEIsT0FBVixFQUFtQkMsTUFBbkIsRUFBMkIsQ0FBRUEsT0FBTyxJQUFJQyxLQUFKLENBQVUsMkJBQVYsQ0FBUCxFQUFnRCxDQUF6RixDQVRTOztBQVduQixHQW5GVTs7QUFxRkxWLEtBckZLLGVBcUZBSSxLQXJGQSxFQXFGTztBQUNVLHVCQUFLTCxPQUFMLENBQWFDLEdBQWIsRUFEVixTQUNWQyxXQURVO0FBRVpBLHlCQUZZOztBQUlHLHVCQUFLRixPQUFMLENBQWFJLElBQWIsQ0FBa0JDLEtBQWxCLENBSkgsU0FJUkYsRUFKUTtBQUtSaUIsa0JBTFEsR0FLRCxDQUFDLE1BQUQsRUFBU2xCLFlBQVlDLEVBQXJCLEVBQXlCQSxFQUF6QixDQUxDO0FBTUssdUJBQUtGLEdBQUwsQ0FBU21CLElBQVQsQ0FOTCxVQU1SWixJQU5RO0FBT0ksdUJBQUtSLE9BQUwsQ0FBYWtDLE1BQWIsQ0FBb0IxQixJQUFwQixFQUEwQk4sWUFBWUssT0FBdEMsQ0FQSixVQU9SNEIsR0FQUTtBQVFMQSxpQkFSSzs7Ozs7QUFhUixvQkFBSXhCLEtBQUosQ0FBVSx1QkFBVixDQWJROztBQWVqQixHQXBHVTs7QUFzR0x5QixRQXRHSyxvQkFzR0s7QUFDWSx1QkFBS3BDLE9BQUwsQ0FBYUMsR0FBYixFQURaLFNBQ1JDLFdBRFE7QUFFVkEseUJBRlU7QUFHUmtCLGtCQUhRLEdBR0QsQ0FBQyxNQUFELEVBQVNsQixZQUFZQyxFQUFyQixDQUhDO0FBSU0sdUJBQUtpQyxNQUFMLENBQVloQixJQUFaLENBSk4sU0FJUlAsS0FKUTs7QUFNSCxxQkFBS2YsSUFBTCxDQUFVb0MsTUFBVixDQUFpQnJCLEtBQWpCLEVBQXdCWCxXQUF4QixDQU5HOztBQVFWLHFCQUFLRixPQUFMLENBQWFxQyxZQUFiLEdBUlU7QUFTSCxrQkFBSTFCLEtBQUosQ0FBVSxpQkFBVixDQVRHOzs7QUFZTCxrQkFBSUEsS0FBSixDQUFVLHdCQUFWLENBWks7O0FBY2YsR0FwSFU7O0FBc0hMTCxNQXRISyxnQkFzSENPLEtBdEhELEVBc0hRZSxHQXRIUixFQXNIYTtBQUNsQlUsb0JBRGtCLEdBQ1QsRUFEUztBQUVMekIsbUJBRkssc0dBRWJmLEtBRmE7QUFHSCx1QkFBS0UsT0FBTCxDQUFhTSxJQUFiLENBQWtCUixLQUFsQixFQUF3QjhCLElBQUlyQixPQUE1QixDQUhHLFVBR2hCQyxJQUhnQjtBQUloQkwsZ0JBSmdCLEdBSVgsQ0FBQyxNQUFELEVBQVN5QixJQUFJekIsRUFBYixFQUFpQkwsTUFBS0ssRUFBdEIsRUFBMEJvQyxJQUExQixDQUErQixHQUEvQixDQUpXO0FBS3BCRCxxQkFBT0wsSUFBUCxDQUFZLEVBQUU5QixNQUFGLEVBQU1LLFVBQU4sRUFBWixFQUxvQjs7QUFPZjhCLG9CQVBlO0FBUXZCLEdBOUhVOztBQWdJTEosUUFoSUssa0JBZ0lHckIsS0FoSUgsRUFnSVVlLEdBaElWLEVBZ0llO0FBQ3BCVSxvQkFEb0IsR0FDWCxFQURXO0FBRVB6QixtQkFGTywwR0FFZmYsTUFGZTtBQUdILHdCQUFLRSxPQUFMLENBQWFrQyxNQUFiLENBQW9CcEMsT0FBS1UsSUFBekIsRUFBK0JvQixJQUFJckIsT0FBbkMsQ0FIRyxVQUdsQjJCLE1BSGtCO0FBSXRCLGtCQUFJQSxVQUFVSSxNQUFkLEVBQXNCO0FBQ3BCQSx1QkFBT0wsSUFBUCxDQUFZQyxNQUFaO0FBQ0QsZUFGRCxNQUVPO0FBQ0xJLHlCQUFTLEtBQVQ7QUFDRCxlQVJxQjs7QUFVakJBLG9CQVZpQjtBQVd6QixHQTNJVSxFQUFiLEM7OztBQThJTUUsSTtBQUNKLGdCQUFhQyxHQUFiLEVBQWtCO0FBQ1ZBLE9BRFU7QUFFaEIsWUFBSzNDLElBQUwsR0FBWSxFQUFaO0FBQ0EsaUJBQVlBLElBQVosRUFBa0JrQyxPQUFsQixDQUEwQixVQUFDVSxNQUFELEVBQVk7QUFDcEMsY0FBSzVDLElBQUwsQ0FBVTRDLE1BQVYsSUFBb0I1QyxLQUFLNEMsTUFBTCxFQUFhQyxJQUFiLFNBQXBCO0FBQ0QsS0FGRCxFQUhnQjtBQU1qQixHLGNBUGdCOUMsSTs7O0FBVW5CLFNBQVMyQyxJQUFUIiwiZmlsZSI6Iml0ZW0uanMiLCJzb3VyY2VSb290IjoiQzovVXNlcnMvQmVuaXRvL0RvY3VtZW50cy9lcGlncmFtcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEBmbG93XHJcbmltcG9ydCB7IEMxMzcgfSBmcm9tICdAL2xpYi9DMTM3L0MxMzcnXHJcblxyXG5jb25zdCBpdGVtID0ge1xyXG4gIGFzeW5jIHNldCAoaXRlbSkge1xyXG4gICAgY29uc3Qgc2VsZWN0ZWRIdWIgPSBhd2FpdCB0aGlzLnNlc3Npb24uZ2V0KClcclxuICAgIGlmIChzZWxlY3RlZEh1Yikge1xyXG4gICAgICBpZiAoIWl0ZW0uaWQpIHtcclxuICAgICAgICBpdGVtLmlkID0gYXdhaXQgdGhpcy5zZXNzaW9uLmhhc2goaXRlbS5sYWJlbClcclxuICAgICAgfVxyXG4gICAgICBsZXQgZGF0YSA9IGF3YWl0IHRoaXMuc2Vzc2lvbi5wYWNrKGl0ZW0sIHNlbGVjdGVkSHViLmtleXdvcmQpXHJcbiAgICAgIHJldHVybiB0aGlzLnNldChbJ2l0ZW0nLCBzZWxlY3RlZEh1Yi5pZCwgaXRlbS5pZF0sIGRhdGEpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4gcmVqZWN0KG5ldyBFcnJvcignU0VUX0lURU1fTk9UX1NFTEVDVEVEJykpKVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGFzeW5jIHNldE1hbnkgKGl0ZW1zKSB7XHJcbiAgICBjb25zdCBzZWxlY3RlZEh1YiA9IGF3YWl0IHRoaXMuc2Vzc2lvbi5nZXQoKVxyXG4gICAgaWYgKHNlbGVjdGVkSHViKSB7XHJcbiAgICAgIHZhciBuZXdJdGVtcyA9IGF3YWl0IHRoaXMuaXRlbS5wYWNrKGl0ZW1zLCBzZWxlY3RlZEh1YilcclxuICAgICAgcmV0dXJuIHRoaXMuc2V0TWFueShuZXdJdGVtcylcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiByZWplY3QobmV3IEVycm9yKCdTRVRfSVRFTVNfTk9UX1NFTEVDVEVEJykpKVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGFzeW5jIGNyZWF0ZSAoaXRlbSkge1xyXG4gICAgY29uc3Qgc2VsZWN0ZWRIdWIgPSBhd2FpdCB0aGlzLnNlc3Npb24uZ2V0KClcclxuICAgIGlmIChzZWxlY3RlZEh1Yikge1xyXG4gICAgICB2YXIgbm93ID0gRGF0ZS5ub3coKSAvIDEwMDBcclxuICAgICAgaXRlbS5pZCA9IGF3YWl0IHRoaXMuc2Vzc2lvbi5oYXNoKGl0ZW0ubGFiZWwpXHJcbiAgICAgIGl0ZW0uY3JlYXRlZCA9IG5vd1xyXG4gICAgICBpdGVtLnVwZGF0ZWQgPSBub3dcclxuICAgICAgdmFyIGtleXMgPSBbJ2l0ZW0nLCBzZWxlY3RlZEh1Yi5pZCwgaXRlbS5pZF1cclxuICAgICAgYXdhaXQgdGhpcy5mcmVlKGtleXMpXHJcbiAgICAgIHJldHVybiB0aGlzLml0ZW0uc2V0KGl0ZW0pXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4gcmVqZWN0KG5ldyBFcnJvcignQ1JFQVRFX0lURU1fTk9UX1NFTEVDVEVEJykpKVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGFzeW5jIHVwZGF0ZSAoaXRlbSkge1xyXG4gICAgY29uc3Qgc2VsZWN0ZWRIdWIgPSBhd2FpdCB0aGlzLnNlc3Npb24uZ2V0KClcclxuICAgIGlmIChzZWxlY3RlZEh1Yikge1xyXG4gICAgICB2YXIgb2xkS2V5cyA9IFsnaXRlbScsIHNlbGVjdGVkSHViLmlkLCBpdGVtLmlkXVxyXG4gICAgICBsZXQgaWQgPSBhd2FpdCB0aGlzLnNlc3Npb24uaGFzaChpdGVtLmxhYmVsKVxyXG4gICAgICB2YXIga2V5cyA9IFsnaXRlbScsIHNlbGVjdGVkSHViLmlkLCBpZF1cclxuICAgICAgdHJ5IHtcclxuICAgICAgICBhd2FpdCB0aGlzLmV4aXN0KG9sZEtleXMpXHJcbiAgICAgICAgYXdhaXQgdGhpcy5mcmVlKGtleXMpXHJcbiAgICAgICAgYXdhaXQgdGhpcy5kZWwob2xkS2V5cylcclxuICAgICAgICB2YXIgbm93ID0gRGF0ZS5ub3coKSAvIDEwMDBcclxuICAgICAgICBpdGVtLmlkID0gYXdhaXQgdGhpcy5zZXNzaW9uLmhhc2goaXRlbS5sYWJlbClcclxuICAgICAgICBpdGVtLnVwZGF0ZWQgPSBub3dcclxuICAgICAgICByZXR1cm4gdGhpcy5pdGVtLnNldChpdGVtKVxyXG4gICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgdGhyb3cgZVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4gcmVqZWN0KG5ldyBFcnJvcignVVBEQVRFX0lURU1fTk9UX1NFTEVDVEVEJykpKVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGFzeW5jIHVwc2VydCAoaXRlbSkge1xyXG4gICAgdHJ5IHtcbiAgICAgIGxldCBodWIgPSBhd2FpdCB0aGlzLnNlc3Npb24uZ2V0SHViKClcclxuICAgICAgYXdhaXQgdGhpcy5mcmVlKFsnaXRlbScsIGh1YiwgaXRlbS5pZF0pXHJcbiAgICAgIHJldHVybiB0aGlzLml0ZW0uY3JlYXRlKGl0ZW0pXHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgIC8vIGxldCBodWIgPSBhd2FpdCB0aGlzLmh1Yi5zZWxlY3QoaXRlbSlcclxuICAgICAgcmV0dXJuIHRoaXMuaXRlbS5zZXQoaXRlbSlcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBhc3luYyBkZWxTb21lIChpZHMpIHtcclxuICAgIGNvbnN0IHNlbGVjdGVkSHViID0gYXdhaXQgdGhpcy5zZXNzaW9uLmdldCgpXHJcbiAgICBpZiAoc2VsZWN0ZWRIdWIpIHtcclxuICAgICAgdmFyIHRvRGVsID0gW11cclxuICAgICAgaWRzLmZvckVhY2goZnVuY3Rpb24gKGlkKSB7XHJcbiAgICAgICAgdG9EZWwucHVzaCgnaXRlbTonICsgc2VsZWN0ZWRIdWIuaWQgKyAnOicgKyBpZClcclxuICAgICAgfSlcclxuICAgICAgcmV0dXJuIHRoaXMuZGVsU29tZSh0b0RlbClcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHJlamVjdChuZXcgRXJyb3IoJ0RFTEVURV9JVEVNU19OT1RfU0VMRUNURUQnKSkgfSlcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBhc3luYyBnZXQgKGxhYmVsKSB7XHJcbiAgICBjb25zdCBzZWxlY3RlZEh1YiA9IGF3YWl0IHRoaXMuc2Vzc2lvbi5nZXQoKVxyXG4gICAgaWYgKHNlbGVjdGVkSHViKSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgbGV0IGlkID0gYXdhaXQgdGhpcy5zZXNzaW9uLmhhc2gobGFiZWwpXHJcbiAgICAgICAgbGV0IGtleXMgPSBbJ2l0ZW0nLCBzZWxlY3RlZEh1Yi5pZCwgaWRdXHJcbiAgICAgICAgbGV0IGRhdGEgPSBhd2FpdCB0aGlzLmdldChrZXlzKVxyXG4gICAgICAgIHZhciBkZWMgPSBhd2FpdCB0aGlzLnNlc3Npb24udW5wYWNrKGRhdGEsIHNlbGVjdGVkSHViLmtleXdvcmQpXHJcbiAgICAgICAgcmV0dXJuIGRlY1xyXG4gICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgdGhyb3cgZVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0dFVF9JVEVNX05PVF9TRUxFQ1RFRCcpXHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgYXN5bmMgZ2V0QWxsICgpIHtcclxuICAgIGNvbnN0IHNlbGVjdGVkSHViID0gYXdhaXQgdGhpcy5zZXNzaW9uLmdldCgpXHJcbiAgICBpZiAoc2VsZWN0ZWRIdWIpIHtcclxuICAgICAgdmFyIGtleXMgPSBbJ2l0ZW0nLCBzZWxlY3RlZEh1Yi5pZF1cclxuICAgICAgbGV0IGl0ZW1zID0gYXdhaXQgdGhpcy5nZXRBbGwoa2V5cylcclxuICAgICAgdHJ5IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pdGVtLnVucGFjayhpdGVtcywgc2VsZWN0ZWRIdWIpXHJcbiAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICB0aGlzLnNlc3Npb24uY2xlYXJLZXl3b3JkKClcclxuICAgICAgICByZXR1cm4gbmV3IEVycm9yKCdJVEVNU19SRUFEX0ZBSUwnKVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gbmV3IEVycm9yKCdHRVRfSVRFTVNfTk9UX1NFTEVDVEVEJylcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBhc3luYyBwYWNrIChpdGVtcywgaHViKSB7XHJcbiAgICB2YXIgcmVzdWx0ID0gW11cclxuICAgIGZvciAobGV0IGl0ZW0gb2YgaXRlbXMpIHtcclxuICAgICAgbGV0IGRhdGEgPSBhd2FpdCB0aGlzLnNlc3Npb24ucGFjayhpdGVtLCBodWIua2V5d29yZClcclxuICAgICAgbGV0IGlkID0gWydpdGVtJywgaHViLmlkLCBpdGVtLmlkXS5qb2luKCc6JylcclxuICAgICAgcmVzdWx0LnB1c2goeyBpZCwgZGF0YSB9KVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdFxyXG4gIH0sXHJcblxyXG4gIGFzeW5jIHVucGFjayAoaXRlbXMsIGh1Yikge1xyXG4gICAgdmFyIHJlc3VsdCA9IFtdXHJcbiAgICBmb3IgKGxldCBpdGVtIG9mIGl0ZW1zKSB7XHJcbiAgICAgIGxldCB1bnBhY2sgPSBhd2FpdCB0aGlzLnNlc3Npb24udW5wYWNrKGl0ZW0uZGF0YSwgaHViLmtleXdvcmQpXHJcbiAgICAgIGlmICh1bnBhY2sgJiYgcmVzdWx0KSB7XHJcbiAgICAgICAgcmVzdWx0LnB1c2godW5wYWNrKVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJlc3VsdCA9IGZhbHNlXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHRcclxuICB9XHJcbn1cclxuXHJcbmNsYXNzIEl0ZW0gZXh0ZW5kcyBDMTM3IHtcclxuICBjb25zdHJ1Y3RvciAob3B0KSB7XHJcbiAgICBzdXBlcihvcHQpXHJcbiAgICB0aGlzLml0ZW0gPSB7fVxyXG4gICAgT2JqZWN0LmtleXMoaXRlbSkuZm9yRWFjaCgobWV0aG9kKSA9PiB7XHJcbiAgICAgIHRoaXMuaXRlbVttZXRob2RdID0gaXRlbVttZXRob2RdLmJpbmQodGhpcylcclxuICAgIH0pXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBJdGVtIH1cclxuIl19

/***/ }),
/* 66 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return localStorage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator__);

var localStorage = {
  create: function () {var _ref = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default()(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.mark(function _callee() {return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:case 'end':return _context.stop();}}}, _callee, this);}));function create() {return _ref.apply(this, arguments);}return create;}(),


  update: function () {var _ref2 = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default()(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.mark(function _callee2() {return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:case 'end':return _context2.stop();}}}, _callee2, this);}));function update() {return _ref2.apply(this, arguments);}return update;}(),


  get: function get(keys) {
    return new __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
      try {
        var data = window.localStorage.getItem(keys.join(':'));
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  },
  getAll: function getAll(keys) {
    return new __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
      try {
        var data = [];
        for (var i = 0; i < window.localStorage.length; i++) {
          if (window.localStorage.key(i).indexOf(keys.join(':') + ':') === 0) {
            data.push({ id: window.localStorage.key(i), data: window.localStorage.getItem(window.localStorage.key(i)) });
          }
        }
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  },
  set: function set(keys, data) {
    return new __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
      try {
        window.localStorage.setItem(keys.join(':'), data);
        resolve(keys);
      } catch (e) {
        reject(e);
      }
    });
  },
  setMany: function setMany(data) {
    return new __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
      try {
        data.forEach(function (item) {
          window.localStorage.setItem(item.id, item.data);
        });
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  },
  del: function del(keys) {
    return new __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
      try {
        window.localStorage.removeItem(keys.join(':'));
        resolve(keys);
      } catch (e) {
        reject(e);
      }
    });
  },
  delSome: function delSome(keys) {
    return new __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
      try {
        for (var i = 0; i < window.localStorage.length; i++) {
          if (keys.indexOf(window.localStorage.key(i)) !== -1) {
            window.localStorage.removeItem(window.localStorage.key(i));
          }
        }
        resolve(keys);
      } catch (e) {
        reject(e);
      }
    });
  },
  delAll: function delAll(keys) {
    return new __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
      try {
        for (var i = 0; i < window.localStorage.length; i++) {
          if (window.localStorage.key(i).indexOf(keys.join(':') + ':') === 0) {
            window.localStorage.removeItem(window.localStorage.key(i));
          }
        }
        resolve(keys);
      } catch (e) {
        reject(e);
      }
    });
  },
  free: function free(keys) {
    return new __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
      try {
        var result = true;
        for (var i = 0; i < window.localStorage.length; i++) {
          if (window.localStorage.key(i) === keys.join(':')) {
            result = false;
            break;
          }
        }
        if (result) {
          resolve(keys);
        } else {
          reject(new Error('IS_NOT_FREE'));
        }
      } catch (e) {
        reject(e);
      }
    });
  },
  exist: function exist(keys) {
    return new __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
      try {
        var result = false;
        for (var i = 0; i < window.localStorage.length; i++) {
          if (window.localStorage.key(i) === keys.join(':')) {
            result = window.localStorage.getItem(window.localStorage.key(i));
            break;
          }
        }
        if (result) {
          resolve(result);
        } else {
          reject(new Error('DOES_NOT_EXIST'));
        }
      } catch (e) {
        reject(e);
      }
    });
  } };



//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyY1xcbGliXFxDMTM3XFxsb2NhbFN0b3JhZ2UuanMiXSwibmFtZXMiOlsibG9jYWxTdG9yYWdlIiwiY3JlYXRlIiwidXBkYXRlIiwiZ2V0Iiwia2V5cyIsInJlc29sdmUiLCJyZWplY3QiLCJkYXRhIiwid2luZG93IiwiZ2V0SXRlbSIsImpvaW4iLCJlIiwiZ2V0QWxsIiwiaSIsImxlbmd0aCIsImtleSIsImluZGV4T2YiLCJwdXNoIiwiaWQiLCJzZXQiLCJzZXRJdGVtIiwic2V0TWFueSIsImZvckVhY2giLCJpdGVtIiwiZGVsIiwicmVtb3ZlSXRlbSIsImRlbFNvbWUiLCJkZWxBbGwiLCJmcmVlIiwicmVzdWx0IiwiRXJyb3IiLCJleGlzdCJdLCJtYXBwaW5ncyI6IjtBQUNBLElBQU1BLGVBQWU7QUFDbkJDLDZFQUFRLGtNQUFSLDJFQURtQjs7O0FBSW5CQyw4RUFBUSx5TUFBUiw0RUFKbUI7OztBQU9uQkMsT0FBSyxhQUFVQyxJQUFWLEVBQWdCO0FBQ25CLFdBQU8sYUFBWSxVQUFVQyxPQUFWLEVBQW1CQyxNQUFuQixFQUEyQjtBQUM1QyxVQUFJO0FBQ0YsWUFBSUMsT0FBT0MsT0FBT1IsWUFBUCxDQUFvQlMsT0FBcEIsQ0FBNEJMLEtBQUtNLElBQUwsQ0FBVSxHQUFWLENBQTVCLENBQVg7QUFDQUwsZ0JBQVFFLElBQVI7QUFDRCxPQUhELENBR0UsT0FBT0ksQ0FBUCxFQUFVO0FBQ1ZMLGVBQU9LLENBQVA7QUFDRDtBQUNGLEtBUE0sQ0FBUDtBQVFELEdBaEJrQjtBQWlCbkJDLFVBQVEsZ0JBQVVSLElBQVYsRUFBZ0I7QUFDdEIsV0FBTyxhQUFZLFVBQVVDLE9BQVYsRUFBbUJDLE1BQW5CLEVBQTJCO0FBQzVDLFVBQUk7QUFDRixZQUFJQyxPQUFPLEVBQVg7QUFDQSxhQUFLLElBQUlNLElBQUksQ0FBYixFQUFnQkEsSUFBSUwsT0FBT1IsWUFBUCxDQUFvQmMsTUFBeEMsRUFBZ0RELEdBQWhELEVBQXFEO0FBQ25ELGNBQUlMLE9BQU9SLFlBQVAsQ0FBb0JlLEdBQXBCLENBQXdCRixDQUF4QixFQUEyQkcsT0FBM0IsQ0FBbUNaLEtBQUtNLElBQUwsQ0FBVSxHQUFWLElBQWlCLEdBQXBELE1BQTZELENBQWpFLEVBQW9FO0FBQ2xFSCxpQkFBS1UsSUFBTCxDQUFVLEVBQUVDLElBQUlWLE9BQU9SLFlBQVAsQ0FBb0JlLEdBQXBCLENBQXdCRixDQUF4QixDQUFOLEVBQWtDTixNQUFNQyxPQUFPUixZQUFQLENBQW9CUyxPQUFwQixDQUE0QkQsT0FBT1IsWUFBUCxDQUFvQmUsR0FBcEIsQ0FBd0JGLENBQXhCLENBQTVCLENBQXhDLEVBQVY7QUFDRDtBQUNGO0FBQ0RSLGdCQUFRRSxJQUFSO0FBQ0QsT0FSRCxDQVFFLE9BQU9JLENBQVAsRUFBVTtBQUNWTCxlQUFPSyxDQUFQO0FBQ0Q7QUFDRixLQVpNLENBQVA7QUFhRCxHQS9Ca0I7QUFnQ25CUSxPQUFLLGFBQVVmLElBQVYsRUFBZ0JHLElBQWhCLEVBQXNCO0FBQ3pCLFdBQU8sYUFBWSxVQUFVRixPQUFWLEVBQW1CQyxNQUFuQixFQUEyQjtBQUM1QyxVQUFJO0FBQ0ZFLGVBQU9SLFlBQVAsQ0FBb0JvQixPQUFwQixDQUE0QmhCLEtBQUtNLElBQUwsQ0FBVSxHQUFWLENBQTVCLEVBQTRDSCxJQUE1QztBQUNBRixnQkFBUUQsSUFBUjtBQUNELE9BSEQsQ0FHRSxPQUFPTyxDQUFQLEVBQVU7QUFDVkwsZUFBT0ssQ0FBUDtBQUNEO0FBQ0YsS0FQTSxDQUFQO0FBUUQsR0F6Q2tCO0FBMENuQlUsV0FBUyxpQkFBVWQsSUFBVixFQUFnQjtBQUN2QixXQUFPLGFBQVksVUFBVUYsT0FBVixFQUFtQkMsTUFBbkIsRUFBMkI7QUFDNUMsVUFBSTtBQUNGQyxhQUFLZSxPQUFMLENBQWEsVUFBVUMsSUFBVixFQUFnQjtBQUMzQmYsaUJBQU9SLFlBQVAsQ0FBb0JvQixPQUFwQixDQUE0QkcsS0FBS0wsRUFBakMsRUFBcUNLLEtBQUtoQixJQUExQztBQUNELFNBRkQ7QUFHQUYsZ0JBQVFFLElBQVI7QUFDRCxPQUxELENBS0UsT0FBT0ksQ0FBUCxFQUFVO0FBQ1ZMLGVBQU9LLENBQVA7QUFDRDtBQUNGLEtBVE0sQ0FBUDtBQVVELEdBckRrQjtBQXNEbkJhLE9BQUssYUFBVXBCLElBQVYsRUFBZ0I7QUFDbkIsV0FBTyxhQUFZLFVBQVVDLE9BQVYsRUFBbUJDLE1BQW5CLEVBQTJCO0FBQzVDLFVBQUk7QUFDRkUsZUFBT1IsWUFBUCxDQUFvQnlCLFVBQXBCLENBQStCckIsS0FBS00sSUFBTCxDQUFVLEdBQVYsQ0FBL0I7QUFDQUwsZ0JBQVFELElBQVI7QUFDRCxPQUhELENBR0UsT0FBT08sQ0FBUCxFQUFVO0FBQ1ZMLGVBQU9LLENBQVA7QUFDRDtBQUNGLEtBUE0sQ0FBUDtBQVFELEdBL0RrQjtBQWdFbkJlLFdBQVMsaUJBQVV0QixJQUFWLEVBQWdCO0FBQ3ZCLFdBQU8sYUFBWSxVQUFVQyxPQUFWLEVBQW1CQyxNQUFuQixFQUEyQjtBQUM1QyxVQUFJO0FBQ0YsYUFBSyxJQUFJTyxJQUFJLENBQWIsRUFBZ0JBLElBQUlMLE9BQU9SLFlBQVAsQ0FBb0JjLE1BQXhDLEVBQWdERCxHQUFoRCxFQUFxRDtBQUNuRCxjQUFJVCxLQUFLWSxPQUFMLENBQWFSLE9BQU9SLFlBQVAsQ0FBb0JlLEdBQXBCLENBQXdCRixDQUF4QixDQUFiLE1BQTZDLENBQUMsQ0FBbEQsRUFBcUQ7QUFDbkRMLG1CQUFPUixZQUFQLENBQW9CeUIsVUFBcEIsQ0FBK0JqQixPQUFPUixZQUFQLENBQW9CZSxHQUFwQixDQUF3QkYsQ0FBeEIsQ0FBL0I7QUFDRDtBQUNGO0FBQ0RSLGdCQUFRRCxJQUFSO0FBQ0QsT0FQRCxDQU9FLE9BQU9PLENBQVAsRUFBVTtBQUNWTCxlQUFPSyxDQUFQO0FBQ0Q7QUFDRixLQVhNLENBQVA7QUFZRCxHQTdFa0I7QUE4RW5CZ0IsVUFBUSxnQkFBVXZCLElBQVYsRUFBZ0I7QUFDdEIsV0FBTyxhQUFZLFVBQVVDLE9BQVYsRUFBbUJDLE1BQW5CLEVBQTJCO0FBQzVDLFVBQUk7QUFDRixhQUFLLElBQUlPLElBQUksQ0FBYixFQUFnQkEsSUFBSUwsT0FBT1IsWUFBUCxDQUFvQmMsTUFBeEMsRUFBZ0RELEdBQWhELEVBQXFEO0FBQ25ELGNBQUlMLE9BQU9SLFlBQVAsQ0FBb0JlLEdBQXBCLENBQXdCRixDQUF4QixFQUEyQkcsT0FBM0IsQ0FBbUNaLEtBQUtNLElBQUwsQ0FBVSxHQUFWLElBQWlCLEdBQXBELE1BQTZELENBQWpFLEVBQW9FO0FBQ2xFRixtQkFBT1IsWUFBUCxDQUFvQnlCLFVBQXBCLENBQStCakIsT0FBT1IsWUFBUCxDQUFvQmUsR0FBcEIsQ0FBd0JGLENBQXhCLENBQS9CO0FBQ0Q7QUFDRjtBQUNEUixnQkFBUUQsSUFBUjtBQUNELE9BUEQsQ0FPRSxPQUFPTyxDQUFQLEVBQVU7QUFDVkwsZUFBT0ssQ0FBUDtBQUNEO0FBQ0YsS0FYTSxDQUFQO0FBWUQsR0EzRmtCO0FBNEZuQmlCLFFBQU0sY0FBVXhCLElBQVYsRUFBZ0I7QUFDcEIsV0FBTyxhQUFZLFVBQVVDLE9BQVYsRUFBbUJDLE1BQW5CLEVBQTJCO0FBQzVDLFVBQUk7QUFDRixZQUFJdUIsU0FBUyxJQUFiO0FBQ0EsYUFBSyxJQUFJaEIsSUFBSSxDQUFiLEVBQWdCQSxJQUFJTCxPQUFPUixZQUFQLENBQW9CYyxNQUF4QyxFQUFnREQsR0FBaEQsRUFBcUQ7QUFDbkQsY0FBSUwsT0FBT1IsWUFBUCxDQUFvQmUsR0FBcEIsQ0FBd0JGLENBQXhCLE1BQStCVCxLQUFLTSxJQUFMLENBQVUsR0FBVixDQUFuQyxFQUFtRDtBQUNqRG1CLHFCQUFTLEtBQVQ7QUFDQTtBQUNEO0FBQ0Y7QUFDRCxZQUFJQSxNQUFKLEVBQVk7QUFDVnhCLGtCQUFRRCxJQUFSO0FBQ0QsU0FGRCxNQUVPO0FBQ0xFLGlCQUFPLElBQUl3QixLQUFKLENBQVUsYUFBVixDQUFQO0FBQ0Q7QUFDRixPQWJELENBYUUsT0FBT25CLENBQVAsRUFBVTtBQUNWTCxlQUFPSyxDQUFQO0FBQ0Q7QUFDRixLQWpCTSxDQUFQO0FBa0JELEdBL0drQjtBQWdIbkJvQixTQUFPLGVBQVUzQixJQUFWLEVBQWdCO0FBQ3JCLFdBQU8sYUFBWSxVQUFVQyxPQUFWLEVBQW1CQyxNQUFuQixFQUEyQjtBQUM1QyxVQUFJO0FBQ0YsWUFBSXVCLFNBQVMsS0FBYjtBQUNBLGFBQUssSUFBSWhCLElBQUksQ0FBYixFQUFnQkEsSUFBSUwsT0FBT1IsWUFBUCxDQUFvQmMsTUFBeEMsRUFBZ0RELEdBQWhELEVBQXFEO0FBQ25ELGNBQUlMLE9BQU9SLFlBQVAsQ0FBb0JlLEdBQXBCLENBQXdCRixDQUF4QixNQUErQlQsS0FBS00sSUFBTCxDQUFVLEdBQVYsQ0FBbkMsRUFBbUQ7QUFDakRtQixxQkFBU3JCLE9BQU9SLFlBQVAsQ0FBb0JTLE9BQXBCLENBQTRCRCxPQUFPUixZQUFQLENBQW9CZSxHQUFwQixDQUF3QkYsQ0FBeEIsQ0FBNUIsQ0FBVDtBQUNBO0FBQ0Q7QUFDRjtBQUNELFlBQUlnQixNQUFKLEVBQVk7QUFDVnhCLGtCQUFRd0IsTUFBUjtBQUNELFNBRkQsTUFFTztBQUNMdkIsaUJBQU8sSUFBSXdCLEtBQUosQ0FBVSxnQkFBVixDQUFQO0FBQ0Q7QUFDRixPQWJELENBYUUsT0FBT25CLENBQVAsRUFBVTtBQUNWTCxlQUFPSyxDQUFQO0FBQ0Q7QUFDRixLQWpCTSxDQUFQO0FBa0JELEdBbklrQixFQUFyQjs7O0FBc0lBLFNBQVNYLFlBQVQiLCJmaWxlIjoibG9jYWxTdG9yYWdlLmpzIiwic291cmNlUm9vdCI6IkM6L1VzZXJzL0Jlbml0by9Eb2N1bWVudHMvZXBpZ3JhbXMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBAZmxvd1xyXG5jb25zdCBsb2NhbFN0b3JhZ2UgPSB7XHJcbiAgY3JlYXRlOiBhc3luYyBmdW5jdGlvbiAoKSB7XHJcblxyXG4gIH0sXHJcbiAgdXBkYXRlOiBhc3luYyBmdW5jdGlvbiAoKSB7XHJcblxyXG4gIH0sXHJcbiAgZ2V0OiBmdW5jdGlvbiAoa2V5cykge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICB2YXIgZGF0YSA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXlzLmpvaW4oJzonKSlcclxuICAgICAgICByZXNvbHZlKGRhdGEpXHJcbiAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICByZWplY3QoZSlcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9LFxyXG4gIGdldEFsbDogZnVuY3Rpb24gKGtleXMpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgdmFyIGRhdGEgPSBbXVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgd2luZG93LmxvY2FsU3RvcmFnZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgaWYgKHdpbmRvdy5sb2NhbFN0b3JhZ2Uua2V5KGkpLmluZGV4T2Yoa2V5cy5qb2luKCc6JykgKyAnOicpID09PSAwKSB7XHJcbiAgICAgICAgICAgIGRhdGEucHVzaCh7IGlkOiB3aW5kb3cubG9jYWxTdG9yYWdlLmtleShpKSwgZGF0YTogd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKHdpbmRvdy5sb2NhbFN0b3JhZ2Uua2V5KGkpKSB9KVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXNvbHZlKGRhdGEpXHJcbiAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICByZWplY3QoZSlcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9LFxyXG4gIHNldDogZnVuY3Rpb24gKGtleXMsIGRhdGEpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleXMuam9pbignOicpLCBkYXRhKVxyXG4gICAgICAgIHJlc29sdmUoa2V5cylcclxuICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgIHJlamVjdChlKVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH0sXHJcbiAgc2V0TWFueTogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgZGF0YS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oaXRlbS5pZCwgaXRlbS5kYXRhKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmVzb2x2ZShkYXRhKVxyXG4gICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgcmVqZWN0KGUpXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfSxcclxuICBkZWw6IGZ1bmN0aW9uIChrZXlzKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShrZXlzLmpvaW4oJzonKSlcclxuICAgICAgICByZXNvbHZlKGtleXMpXHJcbiAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICByZWplY3QoZSlcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9LFxyXG4gIGRlbFNvbWU6IGZ1bmN0aW9uIChrZXlzKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgd2luZG93LmxvY2FsU3RvcmFnZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgaWYgKGtleXMuaW5kZXhPZih3aW5kb3cubG9jYWxTdG9yYWdlLmtleShpKSkgIT09IC0xKSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSh3aW5kb3cubG9jYWxTdG9yYWdlLmtleShpKSlcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmVzb2x2ZShrZXlzKVxyXG4gICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgcmVqZWN0KGUpXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfSxcclxuICBkZWxBbGw6IGZ1bmN0aW9uIChrZXlzKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgd2luZG93LmxvY2FsU3RvcmFnZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgaWYgKHdpbmRvdy5sb2NhbFN0b3JhZ2Uua2V5KGkpLmluZGV4T2Yoa2V5cy5qb2luKCc6JykgKyAnOicpID09PSAwKSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSh3aW5kb3cubG9jYWxTdG9yYWdlLmtleShpKSlcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmVzb2x2ZShrZXlzKVxyXG4gICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgcmVqZWN0KGUpXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfSxcclxuICBmcmVlOiBmdW5jdGlvbiAoa2V5cykge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICB2YXIgcmVzdWx0ID0gdHJ1ZVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgd2luZG93LmxvY2FsU3RvcmFnZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgaWYgKHdpbmRvdy5sb2NhbFN0b3JhZ2Uua2V5KGkpID09PSBrZXlzLmpvaW4oJzonKSkge1xyXG4gICAgICAgICAgICByZXN1bHQgPSBmYWxzZVxyXG4gICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocmVzdWx0KSB7XHJcbiAgICAgICAgICByZXNvbHZlKGtleXMpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoJ0lTX05PVF9GUkVFJykpXHJcbiAgICAgICAgfVxyXG4gICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgcmVqZWN0KGUpXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfSxcclxuICBleGlzdDogZnVuY3Rpb24gKGtleXMpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9IGZhbHNlXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB3aW5kb3cubG9jYWxTdG9yYWdlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICBpZiAod2luZG93LmxvY2FsU3RvcmFnZS5rZXkoaSkgPT09IGtleXMuam9pbignOicpKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSh3aW5kb3cubG9jYWxTdG9yYWdlLmtleShpKSlcclxuICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHJlc3VsdCkge1xyXG4gICAgICAgICAgcmVzb2x2ZShyZXN1bHQpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoJ0RPRVNfTk9UX0VYSVNUJykpXHJcbiAgICAgICAgfVxyXG4gICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgcmVqZWN0KGUpXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBsb2NhbFN0b3JhZ2UgfVxyXG4iXX0=

/***/ }),
/* 67 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return session; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_jsonpack__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_jsonpack___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_jsonpack__);




var session = {
  setKeyword: function setKeyword(keyword, id) {var _this = this;return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default()(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.mark(function _callee() {var data, pack;return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
              data = { keyword: keyword, id: id };_context.next = 3;return (
                session.pack(data, '6e6a5910ea9537a7d02e44975f4765726c4a0237c7132d3ea4cf33be76ce678b'));case 3:pack = _context.sent;
              window.sessionStorage.setItem('hub', pack);return _context.abrupt('return');case 6:case 'end':return _context.stop();}}}, _callee, _this);}))();

  },

  getHub: function getHub() {var _this2 = this;return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default()(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.mark(function _callee2() {var pack, hub;return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:
              pack = window.sessionStorage.getItem('hub');if (!
              pack) {_context2.next = 8;break;}_context2.next = 4;return (
                session.unpack(pack, '6e6a5910ea9537a7d02e44975f4765726c4a0237c7132d3ea4cf33be76ce678b'));case 4:hub = _context2.sent;return _context2.abrupt('return',
              hub.id);case 8:return _context2.abrupt('return',

              false);case 9:case 'end':return _context2.stop();}}}, _callee2, _this2);}))();

  },

  get: function get() {var _this3 = this;return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default()(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.mark(function _callee3() {var pack, hub;return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:
              pack = window.sessionStorage.getItem('hub');if (!
              pack) {_context3.next = 8;break;}_context3.next = 4;return (
                session.unpack(pack, '6e6a5910ea9537a7d02e44975f4765726c4a0237c7132d3ea4cf33be76ce678b'));case 4:hub = _context3.sent;return _context3.abrupt('return',
              hub);case 8:return _context3.abrupt('return',

              false);case 9:case 'end':return _context3.stop();}}}, _callee3, _this3);}))();

  },

  clearKeyword: function clearKeyword(cb) {
    window.sessionStorage.removeItem('hub');
    if (cb) {
      cb();
    }
  },

  pack: function pack(data, password) {
    return session.execute('pack', data, password);
  },

  unpack: function unpack(data, password) {
    return session.execute('unpack', data, password);
  },

  hash: function hash(data) {
    return session.execute('hash', data);
  },

  compress: function compress(data) {
    return __WEBPACK_IMPORTED_MODULE_3_jsonpack___default.a.pack(data);
  },

  uncompress: function uncompress(data) {
    return __WEBPACK_IMPORTED_MODULE_3_jsonpack___default.a.unpack(data);
  },

  execute: function execute(action, data, password) {
    return new __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
      var now = Date.now();
      var bounce = setTimeout(reject, 20000);
      window.sessionWorker.onmessage = function (e) {
        if (e.data.id === now) {
          delete window.sessionWorker.onmessage;
          clearTimeout(bounce);
          resolve(e.data.result);
        }
      };
      window.sessionWorker.postMessage(session.compress({
        action: action,
        password: password,
        now: now,
        data: data }));

    });
  } };



//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyY1xcbGliXFxDMTM3XFxzZXNzaW9uLmpzIl0sIm5hbWVzIjpbImpzb25wYWNrIiwic2Vzc2lvbiIsInNldEtleXdvcmQiLCJrZXl3b3JkIiwiaWQiLCJkYXRhIiwicGFjayIsIndpbmRvdyIsInNlc3Npb25TdG9yYWdlIiwic2V0SXRlbSIsImdldEh1YiIsImdldEl0ZW0iLCJ1bnBhY2siLCJodWIiLCJnZXQiLCJjbGVhcktleXdvcmQiLCJjYiIsInJlbW92ZUl0ZW0iLCJwYXNzd29yZCIsImV4ZWN1dGUiLCJoYXNoIiwiY29tcHJlc3MiLCJ1bmNvbXByZXNzIiwiYWN0aW9uIiwicmVzb2x2ZSIsInJlamVjdCIsIm5vdyIsIkRhdGUiLCJib3VuY2UiLCJzZXRUaW1lb3V0Iiwic2Vzc2lvbldvcmtlciIsIm9ubWVzc2FnZSIsImUiLCJjbGVhclRpbWVvdXQiLCJyZXN1bHQiLCJwb3N0TWVzc2FnZSJdLCJtYXBwaW5ncyI6Ijs7QUFFQSxPQUFPQSxRQUFQLE1BQXFCLFVBQXJCOztBQUVBLElBQU1DLFVBQVU7QUFDUkMsWUFEUSxzQkFDSUMsT0FESixFQUNhQyxFQURiLEVBQ2lCO0FBQ3pCQyxrQkFEeUIsR0FDbEIsRUFBRUYsZ0JBQUYsRUFBV0MsTUFBWCxFQURrQjtBQUVaSCx3QkFBUUssSUFBUixDQUFhRCxJQUFiLEVBQW1CLGtFQUFuQixDQUZZLFNBRXpCQyxJQUZ5QjtBQUc3QkMscUJBQU9DLGNBQVAsQ0FBc0JDLE9BQXRCLENBQThCLEtBQTlCLEVBQXFDSCxJQUFyQyxFQUg2Qjs7QUFLOUIsR0FOYTs7QUFRUkksUUFSUSxvQkFRRTtBQUNWSixrQkFEVSxHQUNIQyxPQUFPQyxjQUFQLENBQXNCRyxPQUF0QixDQUE4QixLQUE5QixDQURHO0FBRVZMLGtCQUZVO0FBR0lMLHdCQUFRVyxNQUFSLENBQWVOLElBQWYsRUFBcUIsa0VBQXJCLENBSEosU0FHUk8sR0FIUTtBQUlMQSxrQkFBSVQsRUFKQzs7QUFNTCxtQkFOSzs7QUFRZixHQWhCYTs7QUFrQlJVLEtBbEJRLGlCQWtCRDtBQUNQUixrQkFETyxHQUNBQyxPQUFPQyxjQUFQLENBQXNCRyxPQUF0QixDQUE4QixLQUE5QixDQURBO0FBRVBMLGtCQUZPO0FBR09MLHdCQUFRVyxNQUFSLENBQWVOLElBQWYsRUFBcUIsa0VBQXJCLENBSFAsU0FHTE8sR0FISztBQUlGQSxpQkFKRTs7QUFNRixtQkFORTs7QUFRWixHQTFCYTs7QUE0QmRFLGNBNUJjLHdCQTRCQUMsRUE1QkEsRUE0Qkk7QUFDaEJULFdBQU9DLGNBQVAsQ0FBc0JTLFVBQXRCLENBQWlDLEtBQWpDO0FBQ0EsUUFBSUQsRUFBSixFQUFRO0FBQ05BO0FBQ0Q7QUFDRixHQWpDYTs7QUFtQ2RWLE1BbkNjLGdCQW1DUkQsSUFuQ1EsRUFtQ0ZhLFFBbkNFLEVBbUNRO0FBQ3BCLFdBQU9qQixRQUFRa0IsT0FBUixDQUFnQixNQUFoQixFQUF3QmQsSUFBeEIsRUFBOEJhLFFBQTlCLENBQVA7QUFDRCxHQXJDYTs7QUF1Q2ROLFFBdkNjLGtCQXVDTlAsSUF2Q00sRUF1Q0FhLFFBdkNBLEVBdUNVO0FBQ3RCLFdBQU9qQixRQUFRa0IsT0FBUixDQUFnQixRQUFoQixFQUEwQmQsSUFBMUIsRUFBZ0NhLFFBQWhDLENBQVA7QUFDRCxHQXpDYTs7QUEyQ2RFLE1BM0NjLGdCQTJDUmYsSUEzQ1EsRUEyQ0Y7QUFDVixXQUFPSixRQUFRa0IsT0FBUixDQUFnQixNQUFoQixFQUF3QmQsSUFBeEIsQ0FBUDtBQUNELEdBN0NhOztBQStDZGdCLFVBL0NjLG9CQStDSmhCLElBL0NJLEVBK0NFO0FBQ2QsV0FBT0wsU0FBU00sSUFBVCxDQUFjRCxJQUFkLENBQVA7QUFDRCxHQWpEYTs7QUFtRGRpQixZQW5EYyxzQkFtREZqQixJQW5ERSxFQW1ESTtBQUNoQixXQUFPTCxTQUFTWSxNQUFULENBQWdCUCxJQUFoQixDQUFQO0FBQ0QsR0FyRGE7O0FBdURkYyxTQXZEYyxtQkF1RExJLE1BdkRLLEVBdURHbEIsSUF2REgsRUF1RFNhLFFBdkRULEVBdURtQjtBQUMvQixXQUFPLGFBQVksVUFBVU0sT0FBVixFQUFtQkMsTUFBbkIsRUFBMkI7QUFDNUMsVUFBSUMsTUFBTUMsS0FBS0QsR0FBTCxFQUFWO0FBQ0EsVUFBSUUsU0FBU0MsV0FBV0osTUFBWCxFQUFtQixLQUFuQixDQUFiO0FBQ0FsQixhQUFPdUIsYUFBUCxDQUFxQkMsU0FBckIsR0FBaUMsVUFBQ0MsQ0FBRCxFQUFPO0FBQ3RDLFlBQUlBLEVBQUUzQixJQUFGLENBQU9ELEVBQVAsS0FBY3NCLEdBQWxCLEVBQXVCO0FBQ3JCLGlCQUFPbkIsT0FBT3VCLGFBQVAsQ0FBcUJDLFNBQTVCO0FBQ0FFLHVCQUFhTCxNQUFiO0FBQ0FKLGtCQUFRUSxFQUFFM0IsSUFBRixDQUFPNkIsTUFBZjtBQUNEO0FBQ0YsT0FORDtBQU9BM0IsYUFBT3VCLGFBQVAsQ0FBcUJLLFdBQXJCLENBQWlDbEMsUUFBUW9CLFFBQVIsQ0FBaUI7QUFDaERFLHNCQURnRDtBQUVoREwsMEJBRmdEO0FBR2hEUSxnQkFIZ0Q7QUFJaERyQixrQkFKZ0QsRUFBakIsQ0FBakM7O0FBTUQsS0FoQk0sQ0FBUDtBQWlCRCxHQXpFYSxFQUFoQjs7O0FBNEVBLFNBQVNKLE9BQVQiLCJmaWxlIjoic2Vzc2lvbi5qcyIsInNvdXJjZVJvb3QiOiJDOi9Vc2Vycy9CZW5pdG8vRG9jdW1lbnRzL2VwaWdyYW1zIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQGZsb3dcclxuXHJcbmltcG9ydCBqc29ucGFjayBmcm9tICdqc29ucGFjaydcclxuXHJcbmNvbnN0IHNlc3Npb24gPSB7XHJcbiAgYXN5bmMgc2V0S2V5d29yZCAoa2V5d29yZCwgaWQpIHtcclxuICAgIGxldCBkYXRhID0geyBrZXl3b3JkLCBpZCB9XHJcbiAgICBsZXQgcGFjayA9IGF3YWl0IHNlc3Npb24ucGFjayhkYXRhLCAnNmU2YTU5MTBlYTk1MzdhN2QwMmU0NDk3NWY0NzY1NzI2YzRhMDIzN2M3MTMyZDNlYTRjZjMzYmU3NmNlNjc4YicpXHJcbiAgICB3aW5kb3cuc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSgnaHViJywgcGFjaylcclxuICAgIHJldHVyblxyXG4gIH0sXHJcblxyXG4gIGFzeW5jIGdldEh1YiAoKSB7XHJcbiAgICBsZXQgcGFjayA9IHdpbmRvdy5zZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdodWInKVxyXG4gICAgaWYgKHBhY2spIHtcclxuICAgICAgbGV0IGh1YiA9IGF3YWl0IHNlc3Npb24udW5wYWNrKHBhY2ssICc2ZTZhNTkxMGVhOTUzN2E3ZDAyZTQ0OTc1ZjQ3NjU3MjZjNGEwMjM3YzcxMzJkM2VhNGNmMzNiZTc2Y2U2NzhiJylcclxuICAgICAgcmV0dXJuIGh1Yi5pZFxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgYXN5bmMgZ2V0ICgpIHtcclxuICAgIGxldCBwYWNrID0gd2luZG93LnNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ2h1YicpXHJcbiAgICBpZiAocGFjaykge1xyXG4gICAgICBsZXQgaHViID0gYXdhaXQgc2Vzc2lvbi51bnBhY2socGFjaywgJzZlNmE1OTEwZWE5NTM3YTdkMDJlNDQ5NzVmNDc2NTcyNmM0YTAyMzdjNzEzMmQzZWE0Y2YzM2JlNzZjZTY3OGInKVxyXG4gICAgICByZXR1cm4gaHViXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gZmFsc2VcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBjbGVhcktleXdvcmQgKGNiKSB7XHJcbiAgICB3aW5kb3cuc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbSgnaHViJylcclxuICAgIGlmIChjYikge1xyXG4gICAgICBjYigpXHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgcGFjayAoZGF0YSwgcGFzc3dvcmQpIHtcclxuICAgIHJldHVybiBzZXNzaW9uLmV4ZWN1dGUoJ3BhY2snLCBkYXRhLCBwYXNzd29yZClcclxuICB9LFxyXG5cclxuICB1bnBhY2sgKGRhdGEsIHBhc3N3b3JkKSB7XHJcbiAgICByZXR1cm4gc2Vzc2lvbi5leGVjdXRlKCd1bnBhY2snLCBkYXRhLCBwYXNzd29yZClcclxuICB9LFxyXG5cclxuICBoYXNoIChkYXRhKSB7XHJcbiAgICByZXR1cm4gc2Vzc2lvbi5leGVjdXRlKCdoYXNoJywgZGF0YSlcclxuICB9LFxyXG5cclxuICBjb21wcmVzcyAoZGF0YSkge1xyXG4gICAgcmV0dXJuIGpzb25wYWNrLnBhY2soZGF0YSlcclxuICB9LFxyXG5cclxuICB1bmNvbXByZXNzIChkYXRhKSB7XHJcbiAgICByZXR1cm4ganNvbnBhY2sudW5wYWNrKGRhdGEpXHJcbiAgfSxcclxuXHJcbiAgZXhlY3V0ZSAoYWN0aW9uLCBkYXRhLCBwYXNzd29yZCkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgbGV0IG5vdyA9IERhdGUubm93KClcclxuICAgICAgbGV0IGJvdW5jZSA9IHNldFRpbWVvdXQocmVqZWN0LCAyMDAwMClcclxuICAgICAgd2luZG93LnNlc3Npb25Xb3JrZXIub25tZXNzYWdlID0gKGUpID0+IHtcclxuICAgICAgICBpZiAoZS5kYXRhLmlkID09PSBub3cpIHtcclxuICAgICAgICAgIGRlbGV0ZSB3aW5kb3cuc2Vzc2lvbldvcmtlci5vbm1lc3NhZ2VcclxuICAgICAgICAgIGNsZWFyVGltZW91dChib3VuY2UpXHJcbiAgICAgICAgICByZXNvbHZlKGUuZGF0YS5yZXN1bHQpXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHdpbmRvdy5zZXNzaW9uV29ya2VyLnBvc3RNZXNzYWdlKHNlc3Npb24uY29tcHJlc3Moe1xyXG4gICAgICAgIGFjdGlvbixcclxuICAgICAgICBwYXNzd29yZCxcclxuICAgICAgICBub3csXHJcbiAgICAgICAgZGF0YVxyXG4gICAgICB9KSlcclxuICAgIH0pXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBzZXNzaW9uIH1cclxuIl19

/***/ }),
/* 68 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_C137_hub__ = __webpack_require__(62);



var wh = new __WEBPACK_IMPORTED_MODULE_0__lib_C137_hub__["a" /* Hub */]();

/* harmony default export */ __webpack_exports__["default"] = (wh);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyY1xcbGliXFxjMTM3XFxpbmRleC5qcyJdLCJuYW1lcyI6WyJIdWIiLCJ3aCJdLCJtYXBwaW5ncyI6IjtBQUNBLFNBQVNBLEdBQVQsUUFBb0IsZ0JBQXBCOztBQUVBLElBQU1DLEtBQUssSUFBSUQsR0FBSixFQUFYOztBQUVBLGVBQWVDLEVBQWYiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiQzovVXNlcnMvQmVuaXRvL0RvY3VtZW50cy9lcGlncmFtcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEBmbG93XHJcbmltcG9ydCB7IEh1YiB9IGZyb20gJ0AvbGliL0MxMzcvaHViJ1xyXG5cclxuY29uc3Qgd2ggPSBuZXcgSHViKClcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHdoXHJcbiJdfQ==

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(75), __esModule: true };

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(76), __esModule: true };

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(79), __esModule: true };

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(81), __esModule: true };

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(82), __esModule: true };

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(40);
__webpack_require__(39);
module.exports = __webpack_require__(107);

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(109);
module.exports = __webpack_require__(0).Object.assign;

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(110);
var $Object = __webpack_require__(0).Object;
module.exports = function create(P, D){
  return $Object.create(P, D);
};

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(111);
module.exports = __webpack_require__(0).Object.getPrototypeOf;

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(112);
module.exports = __webpack_require__(0).Object.keys;

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(113);
module.exports = __webpack_require__(0).Object.setPrototypeOf;

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(61);
__webpack_require__(39);
__webpack_require__(40);
__webpack_require__(114);
module.exports = __webpack_require__(0).Promise;

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(115);
__webpack_require__(61);
__webpack_require__(116);
__webpack_require__(117);
module.exports = __webpack_require__(0).Symbol;

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(39);
__webpack_require__(40);
module.exports = __webpack_require__(38).f('iterator');

/***/ }),
/* 83 */
/***/ (function(module, exports) {

module.exports = function(){ /* empty */ };

/***/ }),
/* 84 */
/***/ (function(module, exports) {

module.exports = function(it, Constructor, name, forbiddenField){
  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(9)
  , toLength  = __webpack_require__(59)
  , toIndex   = __webpack_require__(106);
module.exports = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(13)
  , gOPS    = __webpack_require__(32)
  , pIE     = __webpack_require__(20);
module.exports = function(it){
  var result     = getKeys(it)
    , getSymbols = gOPS.f;
  if(getSymbols){
    var symbols = getSymbols(it)
      , isEnum  = pIE.f
      , i       = 0
      , key;
    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
  } return result;
};

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

var ctx         = __webpack_require__(17)
  , call        = __webpack_require__(91)
  , isArrayIter = __webpack_require__(89)
  , anObject    = __webpack_require__(3)
  , toLength    = __webpack_require__(59)
  , getIterFn   = __webpack_require__(60)
  , BREAK       = {}
  , RETURN      = {};
var exports = module.exports = function(iterable, entries, fn, that, ITERATOR){
  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
    , f      = ctx(fn, that, entries ? 2 : 1)
    , index  = 0
    , length, step, iterator, result;
  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if(result === BREAK || result === RETURN)return result;
  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
    result = call(iterator, f, step.value, entries);
    if(result === BREAK || result === RETURN)return result;
  }
};
exports.BREAK  = BREAK;
exports.RETURN = RETURN;

/***/ }),
/* 88 */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function(fn, args, that){
  var un = that === undefined;
  switch(args.length){
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return              fn.apply(that, args);
};

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators  = __webpack_require__(18)
  , ITERATOR   = __webpack_require__(1)('iterator')
  , ArrayProto = Array.prototype;

module.exports = function(it){
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(16);
module.exports = Array.isArray || function isArray(arg){
  return cof(arg) == 'Array';
};

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(3);
module.exports = function(iterator, fn, value, entries){
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch(e){
    var ret = iterator['return'];
    if(ret !== undefined)anObject(ret.call(iterator));
    throw e;
  }
};

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create         = __webpack_require__(31)
  , descriptor     = __webpack_require__(21)
  , setToStringTag = __webpack_require__(22)
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(7)(IteratorPrototype, __webpack_require__(1)('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR     = __webpack_require__(1)('iterator')
  , SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function(){ SAFE_CLOSING = true; };
  Array.from(riter, function(){ throw 2; });
} catch(e){ /* empty */ }

module.exports = function(exec, skipClosing){
  if(!skipClosing && !SAFE_CLOSING)return false;
  var safe = false;
  try {
    var arr  = [7]
      , iter = arr[ITERATOR]();
    iter.next = function(){ return {done: safe = true}; };
    arr[ITERATOR] = function(){ return iter; };
    exec(arr);
  } catch(e){ /* empty */ }
  return safe;
};

/***/ }),
/* 94 */
/***/ (function(module, exports) {

module.exports = function(done, value){
  return {value: value, done: !!done};
};

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

var getKeys   = __webpack_require__(13)
  , toIObject = __webpack_require__(9);
module.exports = function(object, el){
  var O      = toIObject(object)
    , keys   = getKeys(O)
    , length = keys.length
    , index  = 0
    , key;
  while(length > index)if(O[key = keys[index++]] === el)return key;
};

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

var META     = __webpack_require__(24)('meta')
  , isObject = __webpack_require__(12)
  , has      = __webpack_require__(6)
  , setDesc  = __webpack_require__(8).f
  , id       = 0;
var isExtensible = Object.isExtensible || function(){
  return true;
};
var FREEZE = !__webpack_require__(11)(function(){
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function(it){
  setDesc(it, META, {value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  }});
};
var fastKey = function(it, create){
  // return primitive with prefix
  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return 'F';
    // not necessary to add metadata
    if(!create)return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function(it, create){
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return true;
    // not necessary to add metadata
    if(!create)return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function(it){
  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY:      META,
  NEED:     false,
  fastKey:  fastKey,
  getWeak:  getWeak,
  onFreeze: onFreeze
};

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(2)
  , macrotask = __webpack_require__(58).set
  , Observer  = global.MutationObserver || global.WebKitMutationObserver
  , process   = global.process
  , Promise   = global.Promise
  , isNode    = __webpack_require__(16)(process) == 'process';

module.exports = function(){
  var head, last, notify;

  var flush = function(){
    var parent, fn;
    if(isNode && (parent = process.domain))parent.exit();
    while(head){
      fn   = head.fn;
      head = head.next;
      try {
        fn();
      } catch(e){
        if(head)notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if(parent)parent.enter();
  };

  // Node.js
  if(isNode){
    notify = function(){
      process.nextTick(flush);
    };
  // browsers with MutationObserver
  } else if(Observer){
    var toggle = true
      , node   = document.createTextNode('');
    new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
    notify = function(){
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if(Promise && Promise.resolve){
    var promise = Promise.resolve();
    notify = function(){
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function(){
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function(fn){
    var task = {fn: fn, next: undefined};
    if(last)last.next = task;
    if(!head){
      head = task;
      notify();
    } last = task;
  };
};

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys  = __webpack_require__(13)
  , gOPS     = __webpack_require__(32)
  , pIE      = __webpack_require__(20)
  , toObject = __webpack_require__(23)
  , IObject  = __webpack_require__(50)
  , $assign  = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(11)(function(){
  var A = {}
    , B = {}
    , S = Symbol()
    , K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function(k){ B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
  var T     = toObject(target)
    , aLen  = arguments.length
    , index = 1
    , getSymbols = gOPS.f
    , isEnum     = pIE.f;
  while(aLen > index){
    var S      = IObject(arguments[index++])
      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
  } return T;
} : $assign;

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

var dP       = __webpack_require__(8)
  , anObject = __webpack_require__(3)
  , getKeys  = __webpack_require__(13);

module.exports = __webpack_require__(4) ? Object.defineProperties : function defineProperties(O, Properties){
  anObject(O);
  var keys   = getKeys(Properties)
    , length = keys.length
    , i = 0
    , P;
  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(9)
  , gOPN      = __webpack_require__(53).f
  , toString  = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function(it){
  try {
    return gOPN(it);
  } catch(e){
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it){
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

var hide = __webpack_require__(7);
module.exports = function(target, src, safe){
  for(var key in src){
    if(safe && target[key])target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(12)
  , anObject = __webpack_require__(3);
var check = function(O, proto){
  anObject(O);
  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function(test, buggy, set){
      try {
        set = __webpack_require__(17)(Function.call, __webpack_require__(52).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch(e){ buggy = true; }
      return function setPrototypeOf(O, proto){
        check(O, proto);
        if(buggy)O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global      = __webpack_require__(2)
  , core        = __webpack_require__(0)
  , dP          = __webpack_require__(8)
  , DESCRIPTORS = __webpack_require__(4)
  , SPECIES     = __webpack_require__(1)('species');

module.exports = function(KEY){
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
    configurable: true,
    get: function(){ return this; }
  });
};

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject  = __webpack_require__(3)
  , aFunction = __webpack_require__(27)
  , SPECIES   = __webpack_require__(1)('species');
module.exports = function(O, D){
  var C = anObject(O).constructor, S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(35)
  , defined   = __webpack_require__(28);
// true  -> String#at
// false -> String#codePointAt
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(35)
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(3)
  , get      = __webpack_require__(60);
module.exports = __webpack_require__(0).getIterator = function(it){
  var iterFn = get(it);
  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(83)
  , step             = __webpack_require__(94)
  , Iterators        = __webpack_require__(18)
  , toIObject        = __webpack_require__(9);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(51)(Array, 'Array', function(iterated, kind){
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(5);

$export($export.S + $export.F, 'Object', {assign: __webpack_require__(98)});

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(5)
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', {create: __webpack_require__(31)});

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject        = __webpack_require__(23)
  , $getPrototypeOf = __webpack_require__(54);

__webpack_require__(56)('getPrototypeOf', function(){
  return function getPrototypeOf(it){
    return $getPrototypeOf(toObject(it));
  };
});

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(23)
  , $keys    = __webpack_require__(13);

__webpack_require__(56)('keys', function(){
  return function keys(it){
    return $keys(toObject(it));
  };
});

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(5);
$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(102).set});

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY            = __webpack_require__(19)
  , global             = __webpack_require__(2)
  , ctx                = __webpack_require__(17)
  , classof            = __webpack_require__(47)
  , $export            = __webpack_require__(5)
  , isObject           = __webpack_require__(12)
  , aFunction          = __webpack_require__(27)
  , anInstance         = __webpack_require__(84)
  , forOf              = __webpack_require__(87)
  , speciesConstructor = __webpack_require__(104)
  , task               = __webpack_require__(58).set
  , microtask          = __webpack_require__(97)()
  , PROMISE            = 'Promise'
  , TypeError          = global.TypeError
  , process            = global.process
  , $Promise           = global[PROMISE]
  , process            = global.process
  , isNode             = classof(process) == 'process'
  , empty              = function(){ /* empty */ }
  , Internal, GenericPromiseCapability, Wrapper;

var USE_NATIVE = !!function(){
  try {
    // correct subclassing with @@species support
    var promise     = $Promise.resolve(1)
      , FakePromise = (promise.constructor = {})[__webpack_require__(1)('species')] = function(exec){ exec(empty, empty); };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch(e){ /* empty */ }
}();

// helpers
var sameConstructor = function(a, b){
  // with library wrapper special case
  return a === b || a === $Promise && b === Wrapper;
};
var isThenable = function(it){
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var newPromiseCapability = function(C){
  return sameConstructor($Promise, C)
    ? new PromiseCapability(C)
    : new GenericPromiseCapability(C);
};
var PromiseCapability = GenericPromiseCapability = function(C){
  var resolve, reject;
  this.promise = new C(function($$resolve, $$reject){
    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject  = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject  = aFunction(reject);
};
var perform = function(exec){
  try {
    exec();
  } catch(e){
    return {error: e};
  }
};
var notify = function(promise, isReject){
  if(promise._n)return;
  promise._n = true;
  var chain = promise._c;
  microtask(function(){
    var value = promise._v
      , ok    = promise._s == 1
      , i     = 0;
    var run = function(reaction){
      var handler = ok ? reaction.ok : reaction.fail
        , resolve = reaction.resolve
        , reject  = reaction.reject
        , domain  = reaction.domain
        , result, then;
      try {
        if(handler){
          if(!ok){
            if(promise._h == 2)onHandleUnhandled(promise);
            promise._h = 1;
          }
          if(handler === true)result = value;
          else {
            if(domain)domain.enter();
            result = handler(value);
            if(domain)domain.exit();
          }
          if(result === reaction.promise){
            reject(TypeError('Promise-chain cycle'));
          } else if(then = isThenable(result)){
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch(e){
        reject(e);
      }
    };
    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if(isReject && !promise._h)onUnhandled(promise);
  });
};
var onUnhandled = function(promise){
  task.call(global, function(){
    var value = promise._v
      , abrupt, handler, console;
    if(isUnhandled(promise)){
      abrupt = perform(function(){
        if(isNode){
          process.emit('unhandledRejection', value, promise);
        } else if(handler = global.onunhandledrejection){
          handler({promise: promise, reason: value});
        } else if((console = global.console) && console.error){
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if(abrupt)throw abrupt.error;
  });
};
var isUnhandled = function(promise){
  if(promise._h == 1)return false;
  var chain = promise._a || promise._c
    , i     = 0
    , reaction;
  while(chain.length > i){
    reaction = chain[i++];
    if(reaction.fail || !isUnhandled(reaction.promise))return false;
  } return true;
};
var onHandleUnhandled = function(promise){
  task.call(global, function(){
    var handler;
    if(isNode){
      process.emit('rejectionHandled', promise);
    } else if(handler = global.onrejectionhandled){
      handler({promise: promise, reason: promise._v});
    }
  });
};
var $reject = function(value){
  var promise = this;
  if(promise._d)return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if(!promise._a)promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function(value){
  var promise = this
    , then;
  if(promise._d)return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if(promise === value)throw TypeError("Promise can't be resolved itself");
    if(then = isThenable(value)){
      microtask(function(){
        var wrapper = {_w: promise, _d: false}; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch(e){
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch(e){
    $reject.call({_w: promise, _d: false}, e); // wrap
  }
};

// constructor polyfill
if(!USE_NATIVE){
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor){
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch(err){
      $reject.call(this, err);
    }
  };
  Internal = function Promise(executor){
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(101)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected){
      var reaction    = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok     = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail   = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if(this._a)this._a.push(reaction);
      if(this._s)notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function(onRejected){
      return this.then(undefined, onRejected);
    }
  });
  PromiseCapability = function(){
    var promise  = new Internal;
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject  = ctx($reject, promise, 1);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: $Promise});
__webpack_require__(22)($Promise, PROMISE);
__webpack_require__(103)(PROMISE);
Wrapper = __webpack_require__(0)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r){
    var capability = newPromiseCapability(this)
      , $$reject   = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x){
    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
    if(x instanceof $Promise && sameConstructor(x.constructor, this))return x;
    var capability = newPromiseCapability(this)
      , $$resolve  = capability.resolve;
    $$resolve(x);
    return capability.promise;
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(93)(function(iter){
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable){
    var C          = this
      , capability = newPromiseCapability(C)
      , resolve    = capability.resolve
      , reject     = capability.reject;
    var abrupt = perform(function(){
      var values    = []
        , index     = 0
        , remaining = 1;
      forOf(iterable, false, function(promise){
        var $index        = index++
          , alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function(value){
          if(alreadyCalled)return;
          alreadyCalled  = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable){
    var C          = this
      , capability = newPromiseCapability(C)
      , reject     = capability.reject;
    var abrupt = perform(function(){
      forOf(iterable, false, function(promise){
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  }
});

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global         = __webpack_require__(2)
  , has            = __webpack_require__(6)
  , DESCRIPTORS    = __webpack_require__(4)
  , $export        = __webpack_require__(5)
  , redefine       = __webpack_require__(57)
  , META           = __webpack_require__(96).KEY
  , $fails         = __webpack_require__(11)
  , shared         = __webpack_require__(34)
  , setToStringTag = __webpack_require__(22)
  , uid            = __webpack_require__(24)
  , wks            = __webpack_require__(1)
  , wksExt         = __webpack_require__(38)
  , wksDefine      = __webpack_require__(37)
  , keyOf          = __webpack_require__(95)
  , enumKeys       = __webpack_require__(86)
  , isArray        = __webpack_require__(90)
  , anObject       = __webpack_require__(3)
  , toIObject      = __webpack_require__(9)
  , toPrimitive    = __webpack_require__(36)
  , createDesc     = __webpack_require__(21)
  , _create        = __webpack_require__(31)
  , gOPNExt        = __webpack_require__(100)
  , $GOPD          = __webpack_require__(52)
  , $DP            = __webpack_require__(8)
  , $keys          = __webpack_require__(13)
  , gOPD           = $GOPD.f
  , dP             = $DP.f
  , gOPN           = gOPNExt.f
  , $Symbol        = global.Symbol
  , $JSON          = global.JSON
  , _stringify     = $JSON && $JSON.stringify
  , PROTOTYPE      = 'prototype'
  , HIDDEN         = wks('_hidden')
  , TO_PRIMITIVE   = wks('toPrimitive')
  , isEnum         = {}.propertyIsEnumerable
  , SymbolRegistry = shared('symbol-registry')
  , AllSymbols     = shared('symbols')
  , OPSymbols      = shared('op-symbols')
  , ObjectProto    = Object[PROTOTYPE]
  , USE_NATIVE     = typeof $Symbol == 'function'
  , QObject        = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function(){
  return _create(dP({}, 'a', {
    get: function(){ return dP(this, 'a', {value: 7}).a; }
  })).a != 7;
}) ? function(it, key, D){
  var protoDesc = gOPD(ObjectProto, key);
  if(protoDesc)delete ObjectProto[key];
  dP(it, key, D);
  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function(tag){
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
  return typeof it == 'symbol';
} : function(it){
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D){
  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if(has(AllSymbols, key)){
    if(!D.enumerable){
      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
      D = _create(D, {enumerable: createDesc(0, false)});
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P){
  anObject(it);
  var keys = enumKeys(P = toIObject(P))
    , i    = 0
    , l = keys.length
    , key;
  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P){
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key){
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
  it  = toIObject(it);
  key = toPrimitive(key, true);
  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
  var D = gOPD(it, key);
  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it){
  var names  = gOPN(toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
  var IS_OP  = it === ObjectProto
    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if(!USE_NATIVE){
  $Symbol = function Symbol(){
    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function(value){
      if(this === ObjectProto)$set.call(OPSymbols, value);
      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f   = $defineProperty;
  __webpack_require__(53).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(20).f  = $propertyIsEnumerable;
  __webpack_require__(32).f = $getOwnPropertySymbols;

  if(DESCRIPTORS && !__webpack_require__(19)){
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function(name){
    return wrap(wks(name));
  }
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

for(var symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function(key){
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(key){
    if(isSymbol(key))return keyOf(SymbolRegistry, key);
    throw TypeError(key + ' is not a symbol!');
  },
  useSetter: function(){ setter = true; },
  useSimple: function(){ setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it){
    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
    var args = [it]
      , i    = 1
      , replacer, $replacer;
    while(arguments.length > i)args.push(arguments[i++]);
    replacer = args[1];
    if(typeof replacer == 'function')$replacer = replacer;
    if($replacer || !isArray(replacer))replacer = function(key, value){
      if($replacer)value = $replacer.call(this, key, value);
      if(!isSymbol(value))return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(7)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(37)('asyncIterator');

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(37)('observable');

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, setImmediate) {(function (global, factory) {
    true ? module.exports = factory() :
   typeof define === 'function' && define.amd ? define(factory) :
   (global.Dexie = factory());
}(this, (function () { 'use strict';

/*
* Dexie.js - a minimalistic wrapper for IndexedDB
* ===============================================
*
* By David Fahlander, david.fahlander@gmail.com
*
* Version 1.5.1, Tue Nov 01 2016
* www.dexie.com
* Apache License Version 2.0, January 2004, http://www.apache.org/licenses/
*/
var keys = Object.keys;
var isArray = Array.isArray;
var _global = typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : global;

function extend(obj, extension) {
    if (typeof extension !== 'object') return obj;
    keys(extension).forEach(function (key) {
        obj[key] = extension[key];
    });
    return obj;
}

var getProto = Object.getPrototypeOf;
var _hasOwn = {}.hasOwnProperty;
function hasOwn(obj, prop) {
    return _hasOwn.call(obj, prop);
}

function props(proto, extension) {
    if (typeof extension === 'function') extension = extension(getProto(proto));
    keys(extension).forEach(function (key) {
        setProp(proto, key, extension[key]);
    });
}

function setProp(obj, prop, functionOrGetSet, options) {
    Object.defineProperty(obj, prop, extend(functionOrGetSet && hasOwn(functionOrGetSet, "get") && typeof functionOrGetSet.get === 'function' ? { get: functionOrGetSet.get, set: functionOrGetSet.set, configurable: true } : { value: functionOrGetSet, configurable: true, writable: true }, options));
}

function derive(Child) {
    return {
        from: function (Parent) {
            Child.prototype = Object.create(Parent.prototype);
            setProp(Child.prototype, "constructor", Child);
            return {
                extend: props.bind(null, Child.prototype)
            };
        }
    };
}

var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

function getPropertyDescriptor(obj, prop) {
    var pd = getOwnPropertyDescriptor(obj, prop),
        proto;
    return pd || (proto = getProto(obj)) && getPropertyDescriptor(proto, prop);
}

var _slice = [].slice;
function slice(args, start, end) {
    return _slice.call(args, start, end);
}

function override(origFunc, overridedFactory) {
    return overridedFactory(origFunc);
}

function doFakeAutoComplete(fn) {
    var to = setTimeout(fn, 1000);
    clearTimeout(to);
}

function assert(b) {
    if (!b) throw new Error("Assertion Failed");
}

function asap(fn) {
    if (_global.setImmediate) setImmediate(fn);else setTimeout(fn, 0);
}



/** Generate an object (hash map) based on given array.
 * @param extractor Function taking an array item and its index and returning an array of 2 items ([key, value]) to
 *        instert on the resulting object for each item in the array. If this function returns a falsy value, the
 *        current item wont affect the resulting object.
 */
function arrayToObject(array, extractor) {
    return array.reduce(function (result, item, i) {
        var nameAndValue = extractor(item, i);
        if (nameAndValue) result[nameAndValue[0]] = nameAndValue[1];
        return result;
    }, {});
}

function trycatcher(fn, reject) {
    return function () {
        try {
            fn.apply(this, arguments);
        } catch (e) {
            reject(e);
        }
    };
}

function tryCatch(fn, onerror, args) {
    try {
        fn.apply(null, args);
    } catch (ex) {
        onerror && onerror(ex);
    }
}

function getByKeyPath(obj, keyPath) {
    // http://www.w3.org/TR/IndexedDB/#steps-for-extracting-a-key-from-a-value-using-a-key-path
    if (hasOwn(obj, keyPath)) return obj[keyPath]; // This line is moved from last to first for optimization purpose.
    if (!keyPath) return obj;
    if (typeof keyPath !== 'string') {
        var rv = [];
        for (var i = 0, l = keyPath.length; i < l; ++i) {
            var val = getByKeyPath(obj, keyPath[i]);
            rv.push(val);
        }
        return rv;
    }
    var period = keyPath.indexOf('.');
    if (period !== -1) {
        var innerObj = obj[keyPath.substr(0, period)];
        return innerObj === undefined ? undefined : getByKeyPath(innerObj, keyPath.substr(period + 1));
    }
    return undefined;
}

function setByKeyPath(obj, keyPath, value) {
    if (!obj || keyPath === undefined) return;
    if ('isFrozen' in Object && Object.isFrozen(obj)) return;
    if (typeof keyPath !== 'string' && 'length' in keyPath) {
        assert(typeof value !== 'string' && 'length' in value);
        for (var i = 0, l = keyPath.length; i < l; ++i) {
            setByKeyPath(obj, keyPath[i], value[i]);
        }
    } else {
        var period = keyPath.indexOf('.');
        if (period !== -1) {
            var currentKeyPath = keyPath.substr(0, period);
            var remainingKeyPath = keyPath.substr(period + 1);
            if (remainingKeyPath === "") {
                if (value === undefined) delete obj[currentKeyPath];else obj[currentKeyPath] = value;
            } else {
                var innerObj = obj[currentKeyPath];
                if (!innerObj) innerObj = obj[currentKeyPath] = {};
                setByKeyPath(innerObj, remainingKeyPath, value);
            }
        } else {
            if (value === undefined) delete obj[keyPath];else obj[keyPath] = value;
        }
    }
}

function delByKeyPath(obj, keyPath) {
    if (typeof keyPath === 'string') setByKeyPath(obj, keyPath, undefined);else if ('length' in keyPath) [].map.call(keyPath, function (kp) {
        setByKeyPath(obj, kp, undefined);
    });
}

function shallowClone(obj) {
    var rv = {};
    for (var m in obj) {
        if (hasOwn(obj, m)) rv[m] = obj[m];
    }
    return rv;
}

function deepClone(any) {
    if (!any || typeof any !== 'object') return any;
    var rv;
    if (isArray(any)) {
        rv = [];
        for (var i = 0, l = any.length; i < l; ++i) {
            rv.push(deepClone(any[i]));
        }
    } else if (any instanceof Date) {
        rv = new Date();
        rv.setTime(any.getTime());
    } else {
        rv = any.constructor ? Object.create(any.constructor.prototype) : {};
        for (var prop in any) {
            if (hasOwn(any, prop)) {
                rv[prop] = deepClone(any[prop]);
            }
        }
    }
    return rv;
}

function getObjectDiff(a, b, rv, prfx) {
    // Compares objects a and b and produces a diff object.
    rv = rv || {};
    prfx = prfx || '';
    keys(a).forEach(function (prop) {
        if (!hasOwn(b, prop)) rv[prfx + prop] = undefined; // Property removed
        else {
                var ap = a[prop],
                    bp = b[prop];
                if (typeof ap === 'object' && typeof bp === 'object' && ap && bp && ap.constructor === bp.constructor)
                    // Same type of object but its properties may have changed
                    getObjectDiff(ap, bp, rv, prfx + prop + ".");else if (ap !== bp) rv[prfx + prop] = b[prop]; // Primitive value changed
            }
    });
    keys(b).forEach(function (prop) {
        if (!hasOwn(a, prop)) {
            rv[prfx + prop] = b[prop]; // Property added
        }
    });
    return rv;
}

// If first argument is iterable or array-like, return it as an array
var iteratorSymbol = typeof Symbol !== 'undefined' && Symbol.iterator;
var getIteratorOf = iteratorSymbol ? function (x) {
    var i;
    return x != null && (i = x[iteratorSymbol]) && i.apply(x);
} : function () {
    return null;
};

var NO_CHAR_ARRAY = {};
// Takes one or several arguments and returns an array based on the following criteras:
// * If several arguments provided, return arguments converted to an array in a way that
//   still allows javascript engine to optimize the code.
// * If single argument is an array, return a clone of it.
// * If this-pointer equals NO_CHAR_ARRAY, don't accept strings as valid iterables as a special
//   case to the two bullets below.
// * If single argument is an iterable, convert it to an array and return the resulting array.
// * If single argument is array-like (has length of type number), convert it to an array.
function getArrayOf(arrayLike) {
    var i, a, x, it;
    if (arguments.length === 1) {
        if (isArray(arrayLike)) return arrayLike.slice();
        if (this === NO_CHAR_ARRAY && typeof arrayLike === 'string') return [arrayLike];
        if (it = getIteratorOf(arrayLike)) {
            a = [];
            while (x = it.next(), !x.done) {
                a.push(x.value);
            }return a;
        }
        if (arrayLike == null) return [arrayLike];
        i = arrayLike.length;
        if (typeof i === 'number') {
            a = new Array(i);
            while (i--) {
                a[i] = arrayLike[i];
            }return a;
        }
        return [arrayLike];
    }
    i = arguments.length;
    a = new Array(i);
    while (i--) {
        a[i] = arguments[i];
    }return a;
}

var concat = [].concat;
function flatten(a) {
    return concat.apply([], a);
}

function nop() {}
function mirror(val) {
    return val;
}
function pureFunctionChain(f1, f2) {
    // Enables chained events that takes ONE argument and returns it to the next function in chain.
    // This pattern is used in the hook("reading") event.
    if (f1 == null || f1 === mirror) return f2;
    return function (val) {
        return f2(f1(val));
    };
}

function callBoth(on1, on2) {
    return function () {
        on1.apply(this, arguments);
        on2.apply(this, arguments);
    };
}

function hookCreatingChain(f1, f2) {
    // Enables chained events that takes several arguments and may modify first argument by making a modification and then returning the same instance.
    // This pattern is used in the hook("creating") event.
    if (f1 === nop) return f2;
    return function () {
        var res = f1.apply(this, arguments);
        if (res !== undefined) arguments[0] = res;
        var onsuccess = this.onsuccess,
            // In case event listener has set this.onsuccess
        onerror = this.onerror; // In case event listener has set this.onerror
        this.onsuccess = null;
        this.onerror = null;
        var res2 = f2.apply(this, arguments);
        if (onsuccess) this.onsuccess = this.onsuccess ? callBoth(onsuccess, this.onsuccess) : onsuccess;
        if (onerror) this.onerror = this.onerror ? callBoth(onerror, this.onerror) : onerror;
        return res2 !== undefined ? res2 : res;
    };
}

function hookDeletingChain(f1, f2) {
    if (f1 === nop) return f2;
    return function () {
        f1.apply(this, arguments);
        var onsuccess = this.onsuccess,
            // In case event listener has set this.onsuccess
        onerror = this.onerror; // In case event listener has set this.onerror
        this.onsuccess = this.onerror = null;
        f2.apply(this, arguments);
        if (onsuccess) this.onsuccess = this.onsuccess ? callBoth(onsuccess, this.onsuccess) : onsuccess;
        if (onerror) this.onerror = this.onerror ? callBoth(onerror, this.onerror) : onerror;
    };
}

function hookUpdatingChain(f1, f2) {
    if (f1 === nop) return f2;
    return function (modifications) {
        var res = f1.apply(this, arguments);
        extend(modifications, res); // If f1 returns new modifications, extend caller's modifications with the result before calling next in chain.
        var onsuccess = this.onsuccess,
            // In case event listener has set this.onsuccess
        onerror = this.onerror; // In case event listener has set this.onerror
        this.onsuccess = null;
        this.onerror = null;
        var res2 = f2.apply(this, arguments);
        if (onsuccess) this.onsuccess = this.onsuccess ? callBoth(onsuccess, this.onsuccess) : onsuccess;
        if (onerror) this.onerror = this.onerror ? callBoth(onerror, this.onerror) : onerror;
        return res === undefined ? res2 === undefined ? undefined : res2 : extend(res, res2);
    };
}

function reverseStoppableEventChain(f1, f2) {
    if (f1 === nop) return f2;
    return function () {
        if (f2.apply(this, arguments) === false) return false;
        return f1.apply(this, arguments);
    };
}



function promisableChain(f1, f2) {
    if (f1 === nop) return f2;
    return function () {
        var res = f1.apply(this, arguments);
        if (res && typeof res.then === 'function') {
            var thiz = this,
                i = arguments.length,
                args = new Array(i);
            while (i--) {
                args[i] = arguments[i];
            }return res.then(function () {
                return f2.apply(thiz, args);
            });
        }
        return f2.apply(this, arguments);
    };
}

// By default, debug will be true only if platform is a web platform and its page is served from localhost.
// When debug = true, error's stacks will contain asyncronic long stacks.
var debug = typeof location !== 'undefined' &&
// By default, use debug mode if served from localhost.
/^(http|https):\/\/(localhost|127\.0\.0\.1)/.test(location.href);

function setDebug(value, filter) {
    debug = value;
    libraryFilter = filter;
}

var libraryFilter = function () {
    return true;
};

var NEEDS_THROW_FOR_STACK = !new Error("").stack;

function getErrorWithStack() {
    "use strict";

    if (NEEDS_THROW_FOR_STACK) try {
        // Doing something naughty in strict mode here to trigger a specific error
        // that can be explicitely ignored in debugger's exception settings.
        // If we'd just throw new Error() here, IE's debugger's exception settings
        // will just consider it as "exception thrown by javascript code" which is
        // something you wouldn't want it to ignore.
        getErrorWithStack.arguments;
        throw new Error(); // Fallback if above line don't throw.
    } catch (e) {
        return e;
    }
    return new Error();
}

function prettyStack(exception, numIgnoredFrames) {
    var stack = exception.stack;
    if (!stack) return "";
    numIgnoredFrames = numIgnoredFrames || 0;
    if (stack.indexOf(exception.name) === 0) numIgnoredFrames += (exception.name + exception.message).split('\n').length;
    return stack.split('\n').slice(numIgnoredFrames).filter(libraryFilter).map(function (frame) {
        return "\n" + frame;
    }).join('');
}

function deprecated(what, fn) {
    return function () {
        console.warn(what + " is deprecated. See https://github.com/dfahlander/Dexie.js/wiki/Deprecations. " + prettyStack(getErrorWithStack(), 1));
        return fn.apply(this, arguments);
    };
}

var dexieErrorNames = ['Modify', 'Bulk', 'OpenFailed', 'VersionChange', 'Schema', 'Upgrade', 'InvalidTable', 'MissingAPI', 'NoSuchDatabase', 'InvalidArgument', 'SubTransaction', 'Unsupported', 'Internal', 'DatabaseClosed', 'IncompatiblePromise'];

var idbDomErrorNames = ['Unknown', 'Constraint', 'Data', 'TransactionInactive', 'ReadOnly', 'Version', 'NotFound', 'InvalidState', 'InvalidAccess', 'Abort', 'Timeout', 'QuotaExceeded', 'Syntax', 'DataClone'];

var errorList = dexieErrorNames.concat(idbDomErrorNames);

var defaultTexts = {
    VersionChanged: "Database version changed by other database connection",
    DatabaseClosed: "Database has been closed",
    Abort: "Transaction aborted",
    TransactionInactive: "Transaction has already completed or failed"
};

//
// DexieError - base class of all out exceptions.
//
function DexieError(name, msg) {
    // Reason we don't use ES6 classes is because:
    // 1. It bloats transpiled code and increases size of minified code.
    // 2. It doesn't give us much in this case.
    // 3. It would require sub classes to call super(), which
    //    is not needed when deriving from Error.
    this._e = getErrorWithStack();
    this.name = name;
    this.message = msg;
}

derive(DexieError).from(Error).extend({
    stack: {
        get: function () {
            return this._stack || (this._stack = this.name + ": " + this.message + prettyStack(this._e, 2));
        }
    },
    toString: function () {
        return this.name + ": " + this.message;
    }
});

function getMultiErrorMessage(msg, failures) {
    return msg + ". Errors: " + failures.map(function (f) {
        return f.toString();
    }).filter(function (v, i, s) {
        return s.indexOf(v) === i;
    }) // Only unique error strings
    .join('\n');
}

//
// ModifyError - thrown in WriteableCollection.modify()
// Specific constructor because it contains members failures and failedKeys.
//
function ModifyError(msg, failures, successCount, failedKeys) {
    this._e = getErrorWithStack();
    this.failures = failures;
    this.failedKeys = failedKeys;
    this.successCount = successCount;
}
derive(ModifyError).from(DexieError);

function BulkError(msg, failures) {
    this._e = getErrorWithStack();
    this.name = "BulkError";
    this.failures = failures;
    this.message = getMultiErrorMessage(msg, failures);
}
derive(BulkError).from(DexieError);

//
//
// Dynamically generate error names and exception classes based
// on the names in errorList.
//
//

// Map of {ErrorName -> ErrorName + "Error"}
var errnames = errorList.reduce(function (obj, name) {
    return obj[name] = name + "Error", obj;
}, {});

// Need an alias for DexieError because we're gonna create subclasses with the same name.
var BaseException = DexieError;
// Map of {ErrorName -> exception constructor}
var exceptions = errorList.reduce(function (obj, name) {
    // Let the name be "DexieError" because this name may
    // be shown in call stack and when debugging. DexieError is
    // the most true name because it derives from DexieError,
    // and we cannot change Function.name programatically without
    // dynamically create a Function object, which would be considered
    // 'eval-evil'.
    var fullName = name + "Error";
    function DexieError(msgOrInner, inner) {
        this._e = getErrorWithStack();
        this.name = fullName;
        if (!msgOrInner) {
            this.message = defaultTexts[name] || fullName;
            this.inner = null;
        } else if (typeof msgOrInner === 'string') {
            this.message = msgOrInner;
            this.inner = inner || null;
        } else if (typeof msgOrInner === 'object') {
            this.message = msgOrInner.name + ' ' + msgOrInner.message;
            this.inner = msgOrInner;
        }
    }
    derive(DexieError).from(BaseException);
    obj[name] = DexieError;
    return obj;
}, {});

// Use ECMASCRIPT standard exceptions where applicable:
exceptions.Syntax = SyntaxError;
exceptions.Type = TypeError;
exceptions.Range = RangeError;

var exceptionMap = idbDomErrorNames.reduce(function (obj, name) {
    obj[name + "Error"] = exceptions[name];
    return obj;
}, {});

function mapError(domError, message) {
    if (!domError || domError instanceof DexieError || domError instanceof TypeError || domError instanceof SyntaxError || !domError.name || !exceptionMap[domError.name]) return domError;
    var rv = new exceptionMap[domError.name](message || domError.message, domError);
    if ("stack" in domError) {
        // Derive stack from inner exception if it has a stack
        setProp(rv, "stack", { get: function () {
                return this.inner.stack;
            } });
    }
    return rv;
}

var fullNameExceptions = errorList.reduce(function (obj, name) {
    if (["Syntax", "Type", "Range"].indexOf(name) === -1) obj[name + "Error"] = exceptions[name];
    return obj;
}, {});

fullNameExceptions.ModifyError = ModifyError;
fullNameExceptions.DexieError = DexieError;
fullNameExceptions.BulkError = BulkError;

function Events(ctx) {
    var evs = {};
    var rv = function (eventName, subscriber) {
        if (subscriber) {
            // Subscribe. If additional arguments than just the subscriber was provided, forward them as well.
            var i = arguments.length,
                args = new Array(i - 1);
            while (--i) {
                args[i - 1] = arguments[i];
            }evs[eventName].subscribe.apply(null, args);
            return ctx;
        } else if (typeof eventName === 'string') {
            // Return interface allowing to fire or unsubscribe from event
            return evs[eventName];
        }
    };
    rv.addEventType = add;

    for (var i = 1, l = arguments.length; i < l; ++i) {
        add(arguments[i]);
    }

    return rv;

    function add(eventName, chainFunction, defaultFunction) {
        if (typeof eventName === 'object') return addConfiguredEvents(eventName);
        if (!chainFunction) chainFunction = reverseStoppableEventChain;
        if (!defaultFunction) defaultFunction = nop;

        var context = {
            subscribers: [],
            fire: defaultFunction,
            subscribe: function (cb) {
                if (context.subscribers.indexOf(cb) === -1) {
                    context.subscribers.push(cb);
                    context.fire = chainFunction(context.fire, cb);
                }
            },
            unsubscribe: function (cb) {
                context.subscribers = context.subscribers.filter(function (fn) {
                    return fn !== cb;
                });
                context.fire = context.subscribers.reduce(chainFunction, defaultFunction);
            }
        };
        evs[eventName] = rv[eventName] = context;
        return context;
    }

    function addConfiguredEvents(cfg) {
        // events(this, {reading: [functionChain, nop]});
        keys(cfg).forEach(function (eventName) {
            var args = cfg[eventName];
            if (isArray(args)) {
                add(eventName, cfg[eventName][0], cfg[eventName][1]);
            } else if (args === 'asap') {
                // Rather than approaching event subscription using a functional approach, we here do it in a for-loop where subscriber is executed in its own stack
                // enabling that any exception that occur wont disturb the initiator and also not nescessary be catched and forgotten.
                var context = add(eventName, mirror, function fire() {
                    // Optimazation-safe cloning of arguments into args.
                    var i = arguments.length,
                        args = new Array(i);
                    while (i--) {
                        args[i] = arguments[i];
                    } // All each subscriber:
                    context.subscribers.forEach(function (fn) {
                        asap(function fireEvent() {
                            fn.apply(null, args);
                        });
                    });
                });
            } else throw new exceptions.InvalidArgument("Invalid event config");
        });
    }
}

//
// Promise Class for Dexie library
//
// I started out writing this Promise class by copying promise-light (https://github.com/taylorhakes/promise-light) by
// https://github.com/taylorhakes - an A+ and ECMASCRIPT 6 compliant Promise implementation.
//
// Modifications needed to be done to support indexedDB because it wont accept setTimeout()
// (See discussion: https://github.com/promises-aplus/promises-spec/issues/45) .
// This topic was also discussed in the following thread: https://github.com/promises-aplus/promises-spec/issues/45
//
// This implementation will not use setTimeout or setImmediate when it's not needed. The behavior is 100% Promise/A+ compliant since
// the caller of new Promise() can be certain that the promise wont be triggered the lines after constructing the promise.
//
// In previous versions this was fixed by not calling setTimeout when knowing that the resolve() or reject() came from another
// tick. In Dexie v1.4.0, I've rewritten the Promise class entirely. Just some fragments of promise-light is left. I use
// another strategy now that simplifies everything a lot: to always execute callbacks in a new tick, but have an own microTick
// engine that is used instead of setImmediate() or setTimeout().
// Promise class has also been optimized a lot with inspiration from bluebird - to avoid closures as much as possible.
// Also with inspiration from bluebird, asyncronic stacks in debug mode.
//
// Specific non-standard features of this Promise class:
// * Async static context support (Promise.PSD)
// * Promise.follow() method built upon PSD, that allows user to track all promises created from current stack frame
//   and below + all promises that those promises creates or awaits.
// * Detect any unhandled promise in a PSD-scope (PSD.onunhandled). 
//
// David Fahlander, https://github.com/dfahlander
//

// Just a pointer that only this module knows about.
// Used in Promise constructor to emulate a private constructor.
var INTERNAL = {};

// Async stacks (long stacks) must not grow infinitely.
var LONG_STACKS_CLIP_LIMIT = 100;
var MAX_LONG_STACKS = 20;
var stack_being_generated = false;

/* The default "nextTick" function used only for the very first promise in a promise chain.
   As soon as then promise is resolved or rejected, all next tasks will be executed in micro ticks
   emulated in this module. For indexedDB compatibility, this means that every method needs to 
   execute at least one promise before doing an indexedDB operation. Dexie will always call 
   db.ready().then() for every operation to make sure the indexedDB event is started in an
   emulated micro tick.
*/
var schedulePhysicalTick = _global.setImmediate ?
// setImmediate supported. Those modern platforms also supports Function.bind().
setImmediate.bind(null, physicalTick) : _global.MutationObserver ?
// MutationObserver supported
function () {
    var hiddenDiv = document.createElement("div");
    new MutationObserver(function () {
        physicalTick();
        hiddenDiv = null;
    }).observe(hiddenDiv, { attributes: true });
    hiddenDiv.setAttribute('i', '1');
} :
// No support for setImmediate or MutationObserver. No worry, setTimeout is only called
// once time. Every tick that follows will be our emulated micro tick.
// Could have uses setTimeout.bind(null, 0, physicalTick) if it wasnt for that FF13 and below has a bug 
function () {
    setTimeout(physicalTick, 0);
};

// Confifurable through Promise.scheduler.
// Don't export because it would be unsafe to let unknown
// code call it unless they do try..catch within their callback.
// This function can be retrieved through getter of Promise.scheduler though,
// but users must not do Promise.scheduler (myFuncThatThrows exception)!
var asap$1 = function (callback, args) {
    microtickQueue.push([callback, args]);
    if (needsNewPhysicalTick) {
        schedulePhysicalTick();
        needsNewPhysicalTick = false;
    }
};

var isOutsideMicroTick = true;
var needsNewPhysicalTick = true;
var unhandledErrors = [];
var rejectingErrors = [];
var currentFulfiller = null;
var rejectionMapper = mirror; // Remove in next major when removing error mapping of DOMErrors and DOMExceptions

var globalPSD = {
    global: true,
    ref: 0,
    unhandleds: [],
    onunhandled: globalError,
    //env: null, // Will be set whenever leaving a scope using wrappers.snapshot()
    finalize: function () {
        this.unhandleds.forEach(function (uh) {
            try {
                globalError(uh[0], uh[1]);
            } catch (e) {}
        });
    }
};

var PSD = globalPSD;

var microtickQueue = []; // Callbacks to call in this or next physical tick.
var numScheduledCalls = 0; // Number of listener-calls left to do in this physical tick.
var tickFinalizers = []; // Finalizers to call when there are no more async calls scheduled within current physical tick.

// Wrappers are not being used yet. Their framework is functioning and can be used
// to replace environment during a PSD scope (a.k.a. 'zone').
/* **KEEP** export var wrappers = (() => {
    var wrappers = [];

    return {
        snapshot: () => {
            var i = wrappers.length,
                result = new Array(i);
            while (i--) result[i] = wrappers[i].snapshot();
            return result;
        },
        restore: values => {
            var i = wrappers.length;
            while (i--) wrappers[i].restore(values[i]);
        },
        wrap: () => wrappers.map(w => w.wrap()),
        add: wrapper => {
            wrappers.push(wrapper);
        }
    };
})();
*/

function Promise(fn) {
    if (typeof this !== 'object') throw new TypeError('Promises must be constructed via new');
    this._listeners = [];
    this.onuncatched = nop; // Deprecate in next major. Not needed. Better to use global error handler.

    // A library may set `promise._lib = true;` after promise is created to make resolve() or reject()
    // execute the microtask engine implicitely within the call to resolve() or reject().
    // To remain A+ compliant, a library must only set `_lib=true` if it can guarantee that the stack
    // only contains library code when calling resolve() or reject().
    // RULE OF THUMB: ONLY set _lib = true for promises explicitely resolving/rejecting directly from
    // global scope (event handler, timer etc)!
    this._lib = false;
    // Current async scope
    var psd = this._PSD = PSD;

    if (debug) {
        this._stackHolder = getErrorWithStack();
        this._prev = null;
        this._numPrev = 0; // Number of previous promises (for long stacks)
        linkToPreviousPromise(this, currentFulfiller);
    }

    if (typeof fn !== 'function') {
        if (fn !== INTERNAL) throw new TypeError('Not a function');
        // Private constructor (INTERNAL, state, value).
        // Used internally by Promise.resolve() and Promise.reject().
        this._state = arguments[1];
        this._value = arguments[2];
        if (this._state === false) handleRejection(this, this._value); // Map error, set stack and addPossiblyUnhandledError().
        return;
    }

    this._state = null; // null (=pending), false (=rejected) or true (=resolved)
    this._value = null; // error or result
    ++psd.ref; // Refcounting current scope
    executePromiseTask(this, fn);
}

props(Promise.prototype, {

    then: function (onFulfilled, onRejected) {
        var _this = this;

        var rv = new Promise(function (resolve, reject) {
            propagateToListener(_this, new Listener(onFulfilled, onRejected, resolve, reject));
        });
        debug && (!this._prev || this._state === null) && linkToPreviousPromise(rv, this);
        return rv;
    },

    _then: function (onFulfilled, onRejected) {
        // A little tinier version of then() that don't have to create a resulting promise.
        propagateToListener(this, new Listener(null, null, onFulfilled, onRejected));
    },

    catch: function (onRejected) {
        if (arguments.length === 1) return this.then(null, onRejected);
        // First argument is the Error type to catch
        var type = arguments[0],
            handler = arguments[1];
        return typeof type === 'function' ? this.then(null, function (err) {
            return (
                // Catching errors by its constructor type (similar to java / c++ / c#)
                // Sample: promise.catch(TypeError, function (e) { ... });
                err instanceof type ? handler(err) : PromiseReject(err)
            );
        }) : this.then(null, function (err) {
            return (
                // Catching errors by the error.name property. Makes sense for indexedDB where error type
                // is always DOMError but where e.name tells the actual error type.
                // Sample: promise.catch('ConstraintError', function (e) { ... });
                err && err.name === type ? handler(err) : PromiseReject(err)
            );
        });
    },

    finally: function (onFinally) {
        return this.then(function (value) {
            onFinally();
            return value;
        }, function (err) {
            onFinally();
            return PromiseReject(err);
        });
    },

    // Deprecate in next major. Needed only for db.on.error.
    uncaught: function (uncaughtHandler) {
        var _this2 = this;

        // Be backward compatible and use "onuncatched" as the event name on this.
        // Handle multiple subscribers through reverseStoppableEventChain(). If a handler returns `false`, bubbling stops.
        this.onuncatched = reverseStoppableEventChain(this.onuncatched, uncaughtHandler);
        // In case caller does this on an already rejected promise, assume caller wants to point out the error to this promise and not
        // a previous promise. Reason: the prevous promise may lack onuncatched handler. 
        if (this._state === false && unhandledErrors.indexOf(this) === -1) {
            // Replace unhandled error's destinaion promise with this one!
            unhandledErrors.some(function (p, i, l) {
                return p._value === _this2._value && (l[i] = _this2);
            });
            // Actually we do this shit because we need to support db.on.error() correctly during db.open(). If we deprecate db.on.error, we could
            // take away this piece of code as well as the onuncatched and uncaught() method.
        }
        return this;
    },

    stack: {
        get: function () {
            if (this._stack) return this._stack;
            try {
                stack_being_generated = true;
                var stacks = getStack(this, [], MAX_LONG_STACKS);
                var stack = stacks.join("\nFrom previous: ");
                if (this._state !== null) this._stack = stack; // Stack may be updated on reject.
                return stack;
            } finally {
                stack_being_generated = false;
            }
        }
    }
});

function Listener(onFulfilled, onRejected, resolve, reject) {
    this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
    this.onRejected = typeof onRejected === 'function' ? onRejected : null;
    this.resolve = resolve;
    this.reject = reject;
    this.psd = PSD;
}

// Promise Static Properties
props(Promise, {
    all: function () {
        var values = getArrayOf.apply(null, arguments); // Supports iterables, implicit arguments and array-like.
        return new Promise(function (resolve, reject) {
            if (values.length === 0) resolve([]);
            var remaining = values.length;
            values.forEach(function (a, i) {
                return Promise.resolve(a).then(function (x) {
                    values[i] = x;
                    if (! --remaining) resolve(values);
                }, reject);
            });
        });
    },

    resolve: function (value) {
        if (value instanceof Promise) return value;
        if (value && typeof value.then === 'function') return new Promise(function (resolve, reject) {
            value.then(resolve, reject);
        });
        return new Promise(INTERNAL, true, value);
    },

    reject: PromiseReject,

    race: function () {
        var values = getArrayOf.apply(null, arguments);
        return new Promise(function (resolve, reject) {
            values.map(function (value) {
                return Promise.resolve(value).then(resolve, reject);
            });
        });
    },

    PSD: {
        get: function () {
            return PSD;
        },
        set: function (value) {
            return PSD = value;
        }
    },

    newPSD: newScope,

    usePSD: usePSD,

    scheduler: {
        get: function () {
            return asap$1;
        },
        set: function (value) {
            asap$1 = value;
        }
    },

    rejectionMapper: {
        get: function () {
            return rejectionMapper;
        },
        set: function (value) {
            rejectionMapper = value;
        } // Map reject failures
    },

    follow: function (fn) {
        return new Promise(function (resolve, reject) {
            return newScope(function (resolve, reject) {
                var psd = PSD;
                psd.unhandleds = []; // For unhandled standard- or 3rd party Promises. Checked at psd.finalize()
                psd.onunhandled = reject; // Triggered directly on unhandled promises of this library.
                psd.finalize = callBoth(function () {
                    var _this3 = this;

                    // Unhandled standard or 3rd part promises are put in PSD.unhandleds and
                    // examined upon scope completion while unhandled rejections in this Promise
                    // will trigger directly through psd.onunhandled
                    run_at_end_of_this_or_next_physical_tick(function () {
                        _this3.unhandleds.length === 0 ? resolve() : reject(_this3.unhandleds[0]);
                    });
                }, psd.finalize);
                fn();
            }, resolve, reject);
        });
    },

    on: Events(null, { "error": [reverseStoppableEventChain, defaultErrorHandler] // Default to defaultErrorHandler
    })

});

var PromiseOnError = Promise.on.error;
PromiseOnError.subscribe = deprecated("Promise.on('error')", PromiseOnError.subscribe);
PromiseOnError.unsubscribe = deprecated("Promise.on('error').unsubscribe", PromiseOnError.unsubscribe);

/**
* Take a potentially misbehaving resolver function and make sure
* onFulfilled and onRejected are only called once.
*
* Makes no guarantees about asynchrony.
*/
function executePromiseTask(promise, fn) {
    // Promise Resolution Procedure:
    // https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
    try {
        fn(function (value) {
            if (promise._state !== null) return;
            if (value === promise) throw new TypeError('A promise cannot be resolved with itself.');
            var shouldExecuteTick = promise._lib && beginMicroTickScope();
            if (value && typeof value.then === 'function') {
                executePromiseTask(promise, function (resolve, reject) {
                    value instanceof Promise ? value._then(resolve, reject) : value.then(resolve, reject);
                });
            } else {
                promise._state = true;
                promise._value = value;
                propagateAllListeners(promise);
            }
            if (shouldExecuteTick) endMicroTickScope();
        }, handleRejection.bind(null, promise)); // If Function.bind is not supported. Exception is handled in catch below
    } catch (ex) {
        handleRejection(promise, ex);
    }
}

function handleRejection(promise, reason) {
    rejectingErrors.push(reason);
    if (promise._state !== null) return;
    var shouldExecuteTick = promise._lib && beginMicroTickScope();
    reason = rejectionMapper(reason);
    promise._state = false;
    promise._value = reason;
    debug && reason !== null && typeof reason === 'object' && !reason._promise && tryCatch(function () {
        var origProp = getPropertyDescriptor(reason, "stack");
        reason._promise = promise;
        setProp(reason, "stack", {
            get: function () {
                return stack_being_generated ? origProp && (origProp.get ? origProp.get.apply(reason) : origProp.value) : promise.stack;
            }
        });
    });
    // Add the failure to a list of possibly uncaught errors
    addPossiblyUnhandledError(promise);
    propagateAllListeners(promise);
    if (shouldExecuteTick) endMicroTickScope();
}

function propagateAllListeners(promise) {
    //debug && linkToPreviousPromise(promise);
    var listeners = promise._listeners;
    promise._listeners = [];
    for (var i = 0, len = listeners.length; i < len; ++i) {
        propagateToListener(promise, listeners[i]);
    }
    var psd = promise._PSD;
    --psd.ref || psd.finalize(); // if psd.ref reaches zero, call psd.finalize();
    if (numScheduledCalls === 0) {
        // If numScheduledCalls is 0, it means that our stack is not in a callback of a scheduled call,
        // and that no deferreds where listening to this rejection or success.
        // Since there is a risk that our stack can contain application code that may
        // do stuff after this code is finished that may generate new calls, we cannot
        // call finalizers here.
        ++numScheduledCalls;
        asap$1(function () {
            if (--numScheduledCalls === 0) finalizePhysicalTick(); // Will detect unhandled errors
        }, []);
    }
}

function propagateToListener(promise, listener) {
    if (promise._state === null) {
        promise._listeners.push(listener);
        return;
    }

    var cb = promise._state ? listener.onFulfilled : listener.onRejected;
    if (cb === null) {
        // This Listener doesnt have a listener for the event being triggered (onFulfilled or onReject) so lets forward the event to any eventual listeners on the Promise instance returned by then() or catch()
        return (promise._state ? listener.resolve : listener.reject)(promise._value);
    }
    var psd = listener.psd;
    ++psd.ref;
    ++numScheduledCalls;
    asap$1(callListener, [cb, promise, listener]);
}

function callListener(cb, promise, listener) {
    var outerScope = PSD;
    var psd = listener.psd;
    try {
        if (psd !== outerScope) {
            // **KEEP** outerScope.env = wrappers.snapshot(); // Snapshot outerScope's environment.
            PSD = psd;
            // **KEEP** wrappers.restore(psd.env); // Restore PSD's environment.
        }

        // Set static variable currentFulfiller to the promise that is being fullfilled,
        // so that we connect the chain of promises (for long stacks support)
        currentFulfiller = promise;

        // Call callback and resolve our listener with it's return value.
        var value = promise._value,
            ret;
        if (promise._state) {
            ret = cb(value);
        } else {
            if (rejectingErrors.length) rejectingErrors = [];
            ret = cb(value);
            if (rejectingErrors.indexOf(value) === -1) markErrorAsHandled(promise); // Callback didnt do Promise.reject(err) nor reject(err) onto another promise.
        }
        listener.resolve(ret);
    } catch (e) {
        // Exception thrown in callback. Reject our listener.
        listener.reject(e);
    } finally {
        // Restore PSD, env and currentFulfiller.
        if (psd !== outerScope) {
            PSD = outerScope;
            // **KEEP** wrappers.restore(outerScope.env); // Restore outerScope's environment
        }
        currentFulfiller = null;
        if (--numScheduledCalls === 0) finalizePhysicalTick();
        --psd.ref || psd.finalize();
    }
}

function getStack(promise, stacks, limit) {
    if (stacks.length === limit) return stacks;
    var stack = "";
    if (promise._state === false) {
        var failure = promise._value,
            errorName,
            message;

        if (failure != null) {
            errorName = failure.name || "Error";
            message = failure.message || failure;
            stack = prettyStack(failure, 0);
        } else {
            errorName = failure; // If error is undefined or null, show that.
            message = "";
        }
        stacks.push(errorName + (message ? ": " + message : "") + stack);
    }
    if (debug) {
        stack = prettyStack(promise._stackHolder, 2);
        if (stack && stacks.indexOf(stack) === -1) stacks.push(stack);
        if (promise._prev) getStack(promise._prev, stacks, limit);
    }
    return stacks;
}

function linkToPreviousPromise(promise, prev) {
    // Support long stacks by linking to previous completed promise.
    var numPrev = prev ? prev._numPrev + 1 : 0;
    if (numPrev < LONG_STACKS_CLIP_LIMIT) {
        // Prohibit infinite Promise loops to get an infinite long memory consuming "tail".
        promise._prev = prev;
        promise._numPrev = numPrev;
    }
}

/* The callback to schedule with setImmediate() or setTimeout().
   It runs a virtual microtick and executes any callback registered in microtickQueue.
 */
function physicalTick() {
    beginMicroTickScope() && endMicroTickScope();
}

function beginMicroTickScope() {
    var wasRootExec = isOutsideMicroTick;
    isOutsideMicroTick = false;
    needsNewPhysicalTick = false;
    return wasRootExec;
}

/* Executes micro-ticks without doing try..catch.
   This can be possible because we only use this internally and
   the registered functions are exception-safe (they do try..catch
   internally before calling any external method). If registering
   functions in the microtickQueue that are not exception-safe, this
   would destroy the framework and make it instable. So we don't export
   our asap method.
*/
function endMicroTickScope() {
    var callbacks, i, l;
    do {
        while (microtickQueue.length > 0) {
            callbacks = microtickQueue;
            microtickQueue = [];
            l = callbacks.length;
            for (i = 0; i < l; ++i) {
                var item = callbacks[i];
                item[0].apply(null, item[1]);
            }
        }
    } while (microtickQueue.length > 0);
    isOutsideMicroTick = true;
    needsNewPhysicalTick = true;
}

function finalizePhysicalTick() {
    var unhandledErrs = unhandledErrors;
    unhandledErrors = [];
    unhandledErrs.forEach(function (p) {
        p._PSD.onunhandled.call(null, p._value, p);
    });
    var finalizers = tickFinalizers.slice(0); // Clone first because finalizer may remove itself from list.
    var i = finalizers.length;
    while (i) {
        finalizers[--i]();
    }
}

function run_at_end_of_this_or_next_physical_tick(fn) {
    function finalizer() {
        fn();
        tickFinalizers.splice(tickFinalizers.indexOf(finalizer), 1);
    }
    tickFinalizers.push(finalizer);
    ++numScheduledCalls;
    asap$1(function () {
        if (--numScheduledCalls === 0) finalizePhysicalTick();
    }, []);
}

function addPossiblyUnhandledError(promise) {
    // Only add to unhandledErrors if not already there. The first one to add to this list
    // will be upon the first rejection so that the root cause (first promise in the
    // rejection chain) is the one listed.
    if (!unhandledErrors.some(function (p) {
        return p._value === promise._value;
    })) unhandledErrors.push(promise);
}

function markErrorAsHandled(promise) {
    // Called when a reject handled is actually being called.
    // Search in unhandledErrors for any promise whos _value is this promise_value (list
    // contains only rejected promises, and only one item per error)
    var i = unhandledErrors.length;
    while (i) {
        if (unhandledErrors[--i]._value === promise._value) {
            // Found a promise that failed with this same error object pointer,
            // Remove that since there is a listener that actually takes care of it.
            unhandledErrors.splice(i, 1);
            return;
        }
    }
}

// By default, log uncaught errors to the console
function defaultErrorHandler(e) {
    console.warn('Unhandled rejection: ' + (e.stack || e));
}

function PromiseReject(reason) {
    return new Promise(INTERNAL, false, reason);
}

function wrap(fn, errorCatcher) {
    var psd = PSD;
    return function () {
        var wasRootExec = beginMicroTickScope(),
            outerScope = PSD;

        try {
            if (outerScope !== psd) {
                // **KEEP** outerScope.env = wrappers.snapshot(); // Snapshot outerScope's environment
                PSD = psd;
                // **KEEP** wrappers.restore(psd.env); // Restore PSD's environment.
            }
            return fn.apply(this, arguments);
        } catch (e) {
            errorCatcher && errorCatcher(e);
        } finally {
            if (outerScope !== psd) {
                PSD = outerScope;
                // **KEEP** wrappers.restore(outerScope.env); // Restore outerScope's environment
            }
            if (wasRootExec) endMicroTickScope();
        }
    };
}

function newScope(fn, a1, a2, a3) {
    var parent = PSD,
        psd = Object.create(parent);
    psd.parent = parent;
    psd.ref = 0;
    psd.global = false;
    // **KEEP** psd.env = wrappers.wrap(psd);

    // unhandleds and onunhandled should not be specifically set here.
    // Leave them on parent prototype.
    // unhandleds.push(err) will push to parent's prototype
    // onunhandled() will call parents onunhandled (with this scope's this-pointer though!)
    ++parent.ref;
    psd.finalize = function () {
        --this.parent.ref || this.parent.finalize();
    };
    var rv = usePSD(psd, fn, a1, a2, a3);
    if (psd.ref === 0) psd.finalize();
    return rv;
}

function usePSD(psd, fn, a1, a2, a3) {
    var outerScope = PSD;
    try {
        if (psd !== outerScope) {
            // **KEEP** outerScope.env = wrappers.snapshot(); // snapshot outerScope's environment.
            PSD = psd;
            // **KEEP** wrappers.restore(psd.env); // Restore PSD's environment.
        }
        return fn(a1, a2, a3);
    } finally {
        if (psd !== outerScope) {
            PSD = outerScope;
            // **KEEP** wrappers.restore(outerScope.env); // Restore outerScope's environment.
        }
    }
}

var UNHANDLEDREJECTION = "unhandledrejection";

function globalError(err, promise) {
    var rv;
    try {
        rv = promise.onuncatched(err);
    } catch (e) {}
    if (rv !== false) try {
        var event,
            eventData = { promise: promise, reason: err };
        if (_global.document && document.createEvent) {
            event = document.createEvent('Event');
            event.initEvent(UNHANDLEDREJECTION, true, true);
            extend(event, eventData);
        } else if (_global.CustomEvent) {
            event = new CustomEvent(UNHANDLEDREJECTION, { detail: eventData });
            extend(event, eventData);
        }
        if (event && _global.dispatchEvent) {
            dispatchEvent(event);
            if (!_global.PromiseRejectionEvent && _global.onunhandledrejection)
                // No native support for PromiseRejectionEvent but user has set window.onunhandledrejection. Manually call it.
                try {
                    _global.onunhandledrejection(event);
                } catch (_) {}
        }
        if (!event.defaultPrevented) {
            // Backward compatibility: fire to events registered at Promise.on.error
            Promise.on.error.fire(err, promise);
        }
    } catch (e) {}
}

/* **KEEP** 

export function wrapPromise(PromiseClass) {
    var proto = PromiseClass.prototype;
    var origThen = proto.then;
    
    wrappers.add({
        snapshot: () => proto.then,
        restore: value => {proto.then = value;},
        wrap: () => patchedThen
    });

    function patchedThen (onFulfilled, onRejected) {
        var promise = this;
        var onFulfilledProxy = wrap(function(value){
            var rv = value;
            if (onFulfilled) {
                rv = onFulfilled(rv);
                if (rv && typeof rv.then === 'function') rv.then(); // Intercept that promise as well.
            }
            --PSD.ref || PSD.finalize();
            return rv;
        });
        var onRejectedProxy = wrap(function(err){
            promise._$err = err;
            var unhandleds = PSD.unhandleds;
            var idx = unhandleds.length,
                rv;
            while (idx--) if (unhandleds[idx]._$err === err) break;
            if (onRejected) {
                if (idx !== -1) unhandleds.splice(idx, 1); // Mark as handled.
                rv = onRejected(err);
                if (rv && typeof rv.then === 'function') rv.then(); // Intercept that promise as well.
            } else {
                if (idx === -1) unhandleds.push(promise);
                rv = PromiseClass.reject(err);
                rv._$nointercept = true; // Prohibit eternal loop.
            }
            --PSD.ref || PSD.finalize();
            return rv;
        });
        
        if (this._$nointercept) return origThen.apply(this, arguments);
        ++PSD.ref;
        return origThen.call(this, onFulfilledProxy, onRejectedProxy);
    }
}

// Global Promise wrapper
if (_global.Promise) wrapPromise(_global.Promise);

*/

doFakeAutoComplete(function () {
    // Simplify the job for VS Intellisense. This piece of code is one of the keys to the new marvellous intellisense support in Dexie.
    asap$1 = function (fn, args) {
        setTimeout(function () {
            fn.apply(null, args);
        }, 0);
    };
});

function rejection(err, uncaughtHandler) {
    // Get the call stack and return a rejected promise.
    var rv = Promise.reject(err);
    return uncaughtHandler ? rv.uncaught(uncaughtHandler) : rv;
}

/*
 * Dexie.js - a minimalistic wrapper for IndexedDB
 * ===============================================
 *
 * By David Fahlander, david.fahlander@gmail.com
 *
 * Version 1.5.1, Tue Nov 01 2016
 *
 * http://dexie.org
 *
 * Apache License Version 2.0, January 2004, http://www.apache.org/licenses/
 */

var DEXIE_VERSION = '1.5.1';
var maxString = String.fromCharCode(65535);
var maxKey = function () {
    try {
        IDBKeyRange.only([[]]);return [[]];
    } catch (e) {
        return maxString;
    }
}();
var INVALID_KEY_ARGUMENT = "Invalid key provided. Keys must be of type string, number, Date or Array<string | number | Date>.";
var STRING_EXPECTED = "String expected.";
var connections = [];
var isIEOrEdge = typeof navigator !== 'undefined' && /(MSIE|Trident|Edge)/.test(navigator.userAgent);
var hasIEDeleteObjectStoreBug = isIEOrEdge;
var hangsOnDeleteLargeKeyRange = isIEOrEdge;
var dexieStackFrameFilter = function (frame) {
    return !/(dexie\.js|dexie\.min\.js)/.test(frame);
};

setDebug(debug, dexieStackFrameFilter);

function Dexie(dbName, options) {
    /// <param name="options" type="Object" optional="true">Specify only if you wich to control which addons that should run on this instance</param>
    var deps = Dexie.dependencies;
    var opts = extend({
        // Default Options
        addons: Dexie.addons, // Pick statically registered addons by default
        autoOpen: true, // Don't require db.open() explicitely.
        indexedDB: deps.indexedDB, // Backend IndexedDB api. Default to IDBShim or browser env.
        IDBKeyRange: deps.IDBKeyRange // Backend IDBKeyRange api. Default to IDBShim or browser env.
    }, options);
    var addons = opts.addons,
        autoOpen = opts.autoOpen,
        indexedDB = opts.indexedDB,
        IDBKeyRange = opts.IDBKeyRange;

    var globalSchema = this._dbSchema = {};
    var versions = [];
    var dbStoreNames = [];
    var allTables = {};
    ///<var type="IDBDatabase" />
    var idbdb = null; // Instance of IDBDatabase
    var dbOpenError = null;
    var isBeingOpened = false;
    var openComplete = false;
    var READONLY = "readonly",
        READWRITE = "readwrite";
    var db = this;
    var dbReadyResolve,
        dbReadyPromise = new Promise(function (resolve) {
        dbReadyResolve = resolve;
    }),
        cancelOpen,
        openCanceller = new Promise(function (_, reject) {
        cancelOpen = reject;
    });
    var autoSchema = true;
    var hasNativeGetDatabaseNames = !!getNativeGetDatabaseNamesFn(indexedDB),
        hasGetAll;

    function init() {
        // Default subscribers to "versionchange" and "blocked".
        // Can be overridden by custom handlers. If custom handlers return false, these default
        // behaviours will be prevented.
        db.on("versionchange", function (ev) {
            // Default behavior for versionchange event is to close database connection.
            // Caller can override this behavior by doing db.on("versionchange", function(){ return false; });
            // Let's not block the other window from making it's delete() or open() call.
            // NOTE! This event is never fired in IE,Edge or Safari.
            if (ev.newVersion > 0) console.warn('Another connection wants to upgrade database \'' + db.name + '\'. Closing db now to resume the upgrade.');else console.warn('Another connection wants to delete database \'' + db.name + '\'. Closing db now to resume the delete request.');
            db.close();
            // In many web applications, it would be recommended to force window.reload()
            // when this event occurs. To do that, subscribe to the versionchange event
            // and call window.location.reload(true) if ev.newVersion > 0 (not a deletion)
            // The reason for this is that your current web app obviously has old schema code that needs
            // to be updated. Another window got a newer version of the app and needs to upgrade DB but
            // your window is blocking it unless we close it here.
        });
        db.on("blocked", function (ev) {
            if (!ev.newVersion || ev.newVersion < ev.oldVersion) console.warn('Dexie.delete(\'' + db.name + '\') was blocked');else console.warn('Upgrade \'' + db.name + '\' blocked by other connection holding version ' + ev.oldVersion / 10);
        });
    }

    //
    //
    //
    // ------------------------- Versioning Framework---------------------------
    //
    //
    //

    this.version = function (versionNumber) {
        /// <param name="versionNumber" type="Number"></param>
        /// <returns type="Version"></returns>
        if (idbdb || isBeingOpened) throw new exceptions.Schema("Cannot add version when database is open");
        this.verno = Math.max(this.verno, versionNumber);
        var versionInstance = versions.filter(function (v) {
            return v._cfg.version === versionNumber;
        })[0];
        if (versionInstance) return versionInstance;
        versionInstance = new Version(versionNumber);
        versions.push(versionInstance);
        versions.sort(lowerVersionFirst);
        return versionInstance;
    };

    function Version(versionNumber) {
        this._cfg = {
            version: versionNumber,
            storesSource: null,
            dbschema: {},
            tables: {},
            contentUpgrade: null
        };
        this.stores({}); // Derive earlier schemas by default.
    }

    extend(Version.prototype, {
        stores: function (stores) {
            /// <summary>
            ///   Defines the schema for a particular version
            /// </summary>
            /// <param name="stores" type="Object">
            /// Example: <br/>
            ///   {users: "id++,first,last,&amp;username,*email", <br/>
            ///   passwords: "id++,&amp;username"}<br/>
            /// <br/>
            /// Syntax: {Table: "[primaryKey][++],[&amp;][*]index1,[&amp;][*]index2,..."}<br/><br/>
            /// Special characters:<br/>
            ///  "&amp;"  means unique key, <br/>
            ///  "*"  means value is multiEntry, <br/>
            ///  "++" means auto-increment and only applicable for primary key <br/>
            /// </param>
            this._cfg.storesSource = this._cfg.storesSource ? extend(this._cfg.storesSource, stores) : stores;

            // Derive stores from earlier versions if they are not explicitely specified as null or a new syntax.
            var storesSpec = {};
            versions.forEach(function (version) {
                // 'versions' is always sorted by lowest version first.
                extend(storesSpec, version._cfg.storesSource);
            });

            var dbschema = this._cfg.dbschema = {};
            this._parseStoresSpec(storesSpec, dbschema);
            // Update the latest schema to this version
            // Update API
            globalSchema = db._dbSchema = dbschema;
            removeTablesApi([allTables, db, Transaction.prototype]);
            setApiOnPlace([allTables, db, Transaction.prototype, this._cfg.tables], keys(dbschema), READWRITE, dbschema);
            dbStoreNames = keys(dbschema);
            return this;
        },
        upgrade: function (upgradeFunction) {
            /// <param name="upgradeFunction" optional="true">Function that performs upgrading actions.</param>
            var self = this;
            fakeAutoComplete(function () {
                upgradeFunction(db._createTransaction(READWRITE, keys(self._cfg.dbschema), self._cfg.dbschema)); // BUGBUG: No code completion for prev version's tables wont appear.
            });
            this._cfg.contentUpgrade = upgradeFunction;
            return this;
        },
        _parseStoresSpec: function (stores, outSchema) {
            keys(stores).forEach(function (tableName) {
                if (stores[tableName] !== null) {
                    var instanceTemplate = {};
                    var indexes = parseIndexSyntax(stores[tableName]);
                    var primKey = indexes.shift();
                    if (primKey.multi) throw new exceptions.Schema("Primary key cannot be multi-valued");
                    if (primKey.keyPath) setByKeyPath(instanceTemplate, primKey.keyPath, primKey.auto ? 0 : primKey.keyPath);
                    indexes.forEach(function (idx) {
                        if (idx.auto) throw new exceptions.Schema("Only primary key can be marked as autoIncrement (++)");
                        if (!idx.keyPath) throw new exceptions.Schema("Index must have a name and cannot be an empty string");
                        setByKeyPath(instanceTemplate, idx.keyPath, idx.compound ? idx.keyPath.map(function () {
                            return "";
                        }) : "");
                    });
                    outSchema[tableName] = new TableSchema(tableName, primKey, indexes, instanceTemplate);
                }
            });
        }
    });

    function runUpgraders(oldVersion, idbtrans, reject) {
        var trans = db._createTransaction(READWRITE, dbStoreNames, globalSchema);
        trans.create(idbtrans);
        trans._completion.catch(reject);
        var rejectTransaction = trans._reject.bind(trans);
        newScope(function () {
            PSD.trans = trans;
            if (oldVersion === 0) {
                // Create tables:
                keys(globalSchema).forEach(function (tableName) {
                    createTable(idbtrans, tableName, globalSchema[tableName].primKey, globalSchema[tableName].indexes);
                });
                Promise.follow(function () {
                    return db.on.populate.fire(trans);
                }).catch(rejectTransaction);
            } else updateTablesAndIndexes(oldVersion, trans, idbtrans).catch(rejectTransaction);
        });
    }

    function updateTablesAndIndexes(oldVersion, trans, idbtrans) {
        // Upgrade version to version, step-by-step from oldest to newest version.
        // Each transaction object will contain the table set that was current in that version (but also not-yet-deleted tables from its previous version)
        var queue = [];
        var oldVersionStruct = versions.filter(function (version) {
            return version._cfg.version === oldVersion;
        })[0];
        if (!oldVersionStruct) throw new exceptions.Upgrade("Dexie specification of currently installed DB version is missing");
        globalSchema = db._dbSchema = oldVersionStruct._cfg.dbschema;
        var anyContentUpgraderHasRun = false;

        var versToRun = versions.filter(function (v) {
            return v._cfg.version > oldVersion;
        });
        versToRun.forEach(function (version) {
            /// <param name="version" type="Version"></param>
            queue.push(function () {
                var oldSchema = globalSchema;
                var newSchema = version._cfg.dbschema;
                adjustToExistingIndexNames(oldSchema, idbtrans);
                adjustToExistingIndexNames(newSchema, idbtrans);
                globalSchema = db._dbSchema = newSchema;
                var diff = getSchemaDiff(oldSchema, newSchema);
                // Add tables           
                diff.add.forEach(function (tuple) {
                    createTable(idbtrans, tuple[0], tuple[1].primKey, tuple[1].indexes);
                });
                // Change tables
                diff.change.forEach(function (change) {
                    if (change.recreate) {
                        throw new exceptions.Upgrade("Not yet support for changing primary key");
                    } else {
                        var store = idbtrans.objectStore(change.name);
                        // Add indexes
                        change.add.forEach(function (idx) {
                            addIndex(store, idx);
                        });
                        // Update indexes
                        change.change.forEach(function (idx) {
                            store.deleteIndex(idx.name);
                            addIndex(store, idx);
                        });
                        // Delete indexes
                        change.del.forEach(function (idxName) {
                            store.deleteIndex(idxName);
                        });
                    }
                });
                if (version._cfg.contentUpgrade) {
                    anyContentUpgraderHasRun = true;
                    return Promise.follow(function () {
                        version._cfg.contentUpgrade(trans);
                    });
                }
            });
            queue.push(function (idbtrans) {
                if (!anyContentUpgraderHasRun || !hasIEDeleteObjectStoreBug) {
                    // Dont delete old tables if ieBug is present and a content upgrader has run. Let tables be left in DB so far. This needs to be taken care of.
                    var newSchema = version._cfg.dbschema;
                    // Delete old tables
                    deleteRemovedTables(newSchema, idbtrans);
                }
            });
        });

        // Now, create a queue execution engine
        function runQueue() {
            return queue.length ? Promise.resolve(queue.shift()(trans.idbtrans)).then(runQueue) : Promise.resolve();
        }

        return runQueue().then(function () {
            createMissingTables(globalSchema, idbtrans); // At last, make sure to create any missing tables. (Needed by addons that add stores to DB without specifying version)
        });
    }

    function getSchemaDiff(oldSchema, newSchema) {
        var diff = {
            del: [], // Array of table names
            add: [], // Array of [tableName, newDefinition]
            change: [] // Array of {name: tableName, recreate: newDefinition, del: delIndexNames, add: newIndexDefs, change: changedIndexDefs}
        };
        for (var table in oldSchema) {
            if (!newSchema[table]) diff.del.push(table);
        }
        for (table in newSchema) {
            var oldDef = oldSchema[table],
                newDef = newSchema[table];
            if (!oldDef) {
                diff.add.push([table, newDef]);
            } else {
                var change = {
                    name: table,
                    def: newDef,
                    recreate: false,
                    del: [],
                    add: [],
                    change: []
                };
                if (oldDef.primKey.src !== newDef.primKey.src) {
                    // Primary key has changed. Remove and re-add table.
                    change.recreate = true;
                    diff.change.push(change);
                } else {
                    // Same primary key. Just find out what differs:
                    var oldIndexes = oldDef.idxByName;
                    var newIndexes = newDef.idxByName;
                    for (var idxName in oldIndexes) {
                        if (!newIndexes[idxName]) change.del.push(idxName);
                    }
                    for (idxName in newIndexes) {
                        var oldIdx = oldIndexes[idxName],
                            newIdx = newIndexes[idxName];
                        if (!oldIdx) change.add.push(newIdx);else if (oldIdx.src !== newIdx.src) change.change.push(newIdx);
                    }
                    if (change.del.length > 0 || change.add.length > 0 || change.change.length > 0) {
                        diff.change.push(change);
                    }
                }
            }
        }
        return diff;
    }

    function createTable(idbtrans, tableName, primKey, indexes) {
        /// <param name="idbtrans" type="IDBTransaction"></param>
        var store = idbtrans.db.createObjectStore(tableName, primKey.keyPath ? { keyPath: primKey.keyPath, autoIncrement: primKey.auto } : { autoIncrement: primKey.auto });
        indexes.forEach(function (idx) {
            addIndex(store, idx);
        });
        return store;
    }

    function createMissingTables(newSchema, idbtrans) {
        keys(newSchema).forEach(function (tableName) {
            if (!idbtrans.db.objectStoreNames.contains(tableName)) {
                createTable(idbtrans, tableName, newSchema[tableName].primKey, newSchema[tableName].indexes);
            }
        });
    }

    function deleteRemovedTables(newSchema, idbtrans) {
        for (var i = 0; i < idbtrans.db.objectStoreNames.length; ++i) {
            var storeName = idbtrans.db.objectStoreNames[i];
            if (newSchema[storeName] == null) {
                idbtrans.db.deleteObjectStore(storeName);
            }
        }
    }

    function addIndex(store, idx) {
        store.createIndex(idx.name, idx.keyPath, { unique: idx.unique, multiEntry: idx.multi });
    }

    function dbUncaught(err) {
        return db.on.error.fire(err);
    }

    //
    //
    //      Dexie Protected API
    //
    //

    this._allTables = allTables;

    this._tableFactory = function createTable(mode, tableSchema) {
        /// <param name="tableSchema" type="TableSchema"></param>
        if (mode === READONLY) return new Table(tableSchema.name, tableSchema, Collection);else return new WriteableTable(tableSchema.name, tableSchema);
    };

    this._createTransaction = function (mode, storeNames, dbschema, parentTransaction) {
        return new Transaction(mode, storeNames, dbschema, parentTransaction);
    };

    /* Generate a temporary transaction when db operations are done outside a transactino scope.
    */
    function tempTransaction(mode, storeNames, fn) {
        // Last argument is "writeLocked". But this doesnt apply to oneshot direct db operations, so we ignore it.
        if (!openComplete && !PSD.letThrough) {
            if (!isBeingOpened) {
                if (!autoOpen) return rejection(new exceptions.DatabaseClosed(), dbUncaught);
                db.open().catch(nop); // Open in background. If if fails, it will be catched by the final promise anyway.
            }
            return dbReadyPromise.then(function () {
                return tempTransaction(mode, storeNames, fn);
            });
        } else {
            var trans = db._createTransaction(mode, storeNames, globalSchema);
            return trans._promise(mode, function (resolve, reject) {
                newScope(function () {
                    // OPTIMIZATION POSSIBLE? newScope() not needed because it's already done in _promise.
                    PSD.trans = trans;
                    fn(resolve, reject, trans);
                });
            }).then(function (result) {
                // Instead of resolving value directly, wait with resolving it until transaction has completed.
                // Otherwise the data would not be in the DB if requesting it in the then() operation.
                // Specifically, to ensure that the following expression will work:
                //
                //   db.friends.put({name: "Arne"}).then(function () {
                //       db.friends.where("name").equals("Arne").count(function(count) {
                //           assert (count === 1);
                //       });
                //   });
                //
                return trans._completion.then(function () {
                    return result;
                });
            }); /*.catch(err => { // Don't do this as of now. If would affect bulk- and modify methods in a way that could be more intuitive. But wait! Maybe change in next major.
                 trans._reject(err);
                 return rejection(err);
                });*/
        }
    }

    this._whenReady = function (fn) {
        return new Promise(fake || openComplete || PSD.letThrough ? fn : function (resolve, reject) {
            if (!isBeingOpened) {
                if (!autoOpen) {
                    reject(new exceptions.DatabaseClosed());
                    return;
                }
                db.open().catch(nop); // Open in background. If if fails, it will be catched by the final promise anyway.
            }
            dbReadyPromise.then(function () {
                fn(resolve, reject);
            });
        }).uncaught(dbUncaught);
    };

    //
    //
    //
    //
    //      Dexie API
    //
    //
    //

    this.verno = 0;

    this.open = function () {
        if (isBeingOpened || idbdb) return dbReadyPromise.then(function () {
            return dbOpenError ? rejection(dbOpenError, dbUncaught) : db;
        });
        debug && (openCanceller._stackHolder = getErrorWithStack()); // Let stacks point to when open() was called rather than where new Dexie() was called.
        isBeingOpened = true;
        dbOpenError = null;
        openComplete = false;

        // Function pointers to call when the core opening process completes.
        var resolveDbReady = dbReadyResolve,

        // upgradeTransaction to abort on failure.
        upgradeTransaction = null;

        return Promise.race([openCanceller, new Promise(function (resolve, reject) {
            doFakeAutoComplete(function () {
                return resolve();
            });

            // Make sure caller has specified at least one version
            if (versions.length > 0) autoSchema = false;

            // Multiply db.verno with 10 will be needed to workaround upgrading bug in IE:
            // IE fails when deleting objectStore after reading from it.
            // A future version of Dexie.js will stopover an intermediate version to workaround this.
            // At that point, we want to be backward compatible. Could have been multiplied with 2, but by using 10, it is easier to map the number to the real version number.

            // If no API, throw!
            if (!indexedDB) throw new exceptions.MissingAPI("indexedDB API not found. If using IE10+, make sure to run your code on a server URL " + "(not locally). If using old Safari versions, make sure to include indexedDB polyfill.");

            var req = autoSchema ? indexedDB.open(dbName) : indexedDB.open(dbName, Math.round(db.verno * 10));
            if (!req) throw new exceptions.MissingAPI("IndexedDB API not available"); // May happen in Safari private mode, see https://github.com/dfahlander/Dexie.js/issues/134
            req.onerror = wrap(eventRejectHandler(reject));
            req.onblocked = wrap(fireOnBlocked);
            req.onupgradeneeded = wrap(function (e) {
                upgradeTransaction = req.transaction;
                if (autoSchema && !db._allowEmptyDB) {
                    // Unless an addon has specified db._allowEmptyDB, lets make the call fail.
                    // Caller did not specify a version or schema. Doing that is only acceptable for opening alread existing databases.
                    // If onupgradeneeded is called it means database did not exist. Reject the open() promise and make sure that we
                    // do not create a new database by accident here.
                    req.onerror = preventDefault; // Prohibit onabort error from firing before we're done!
                    upgradeTransaction.abort(); // Abort transaction (would hope that this would make DB disappear but it doesnt.)
                    // Close database and delete it.
                    req.result.close();
                    var delreq = indexedDB.deleteDatabase(dbName); // The upgrade transaction is atomic, and javascript is single threaded - meaning that there is no risk that we delete someone elses database here!
                    delreq.onsuccess = delreq.onerror = wrap(function () {
                        reject(new exceptions.NoSuchDatabase('Database ' + dbName + ' doesnt exist'));
                    });
                } else {
                    upgradeTransaction.onerror = wrap(eventRejectHandler(reject));
                    var oldVer = e.oldVersion > Math.pow(2, 62) ? 0 : e.oldVersion; // Safari 8 fix.
                    runUpgraders(oldVer / 10, upgradeTransaction, reject, req);
                }
            }, reject);

            req.onsuccess = wrap(function () {
                // Core opening procedure complete. Now let's just record some stuff.
                upgradeTransaction = null;
                idbdb = req.result;
                connections.push(db); // Used for emulating versionchange event on IE/Edge/Safari.

                if (autoSchema) readGlobalSchema();else if (idbdb.objectStoreNames.length > 0) {
                    try {
                        adjustToExistingIndexNames(globalSchema, idbdb.transaction(safariMultiStoreFix(idbdb.objectStoreNames), READONLY));
                    } catch (e) {
                        // Safari may bail out if > 1 store names. However, this shouldnt be a showstopper. Issue #120.
                    }
                }

                idbdb.onversionchange = wrap(function (ev) {
                    db._vcFired = true; // detect implementations that not support versionchange (IE/Edge/Safari)
                    db.on("versionchange").fire(ev);
                });

                if (!hasNativeGetDatabaseNames) {
                    // Update localStorage with list of database names
                    globalDatabaseList(function (databaseNames) {
                        if (databaseNames.indexOf(dbName) === -1) return databaseNames.push(dbName);
                    });
                }

                resolve();
            }, reject);
        })]).then(function () {
            // Before finally resolving the dbReadyPromise and this promise,
            // call and await all on('ready') subscribers:
            // Dexie.vip() makes subscribers able to use the database while being opened.
            // This is a must since these subscribers take part of the opening procedure.
            return Dexie.vip(db.on.ready.fire);
        }).then(function () {
            // Resolve the db.open() with the db instance.
            isBeingOpened = false;
            return db;
        }).catch(function (err) {
            try {
                // Did we fail within onupgradeneeded? Make sure to abort the upgrade transaction so it doesnt commit.
                upgradeTransaction && upgradeTransaction.abort();
            } catch (e) {}
            isBeingOpened = false; // Set before calling db.close() so that it doesnt reject openCanceller again (leads to unhandled rejection event).
            db.close(); // Closes and resets idbdb, removes connections, resets dbReadyPromise and openCanceller so that a later db.open() is fresh.
            // A call to db.close() may have made on-ready subscribers fail. Use dbOpenError if set, since err could be a follow-up error on that.
            dbOpenError = err; // Record the error. It will be used to reject further promises of db operations.
            return rejection(dbOpenError, dbUncaught); // dbUncaught will make sure any error that happened in any operation before will now bubble to db.on.error() thanks to the special handling in Promise.uncaught().
        }).finally(function () {
            openComplete = true;
            resolveDbReady(); // dbReadyPromise is resolved no matter if open() rejects or resolved. It's just to wake up waiters.
        });
    };

    this.close = function () {
        var idx = connections.indexOf(db);
        if (idx >= 0) connections.splice(idx, 1);
        if (idbdb) {
            try {
                idbdb.close();
            } catch (e) {}
            idbdb = null;
        }
        autoOpen = false;
        dbOpenError = new exceptions.DatabaseClosed();
        if (isBeingOpened) cancelOpen(dbOpenError);
        // Reset dbReadyPromise promise:
        dbReadyPromise = new Promise(function (resolve) {
            dbReadyResolve = resolve;
        });
        openCanceller = new Promise(function (_, reject) {
            cancelOpen = reject;
        });
    };

    this.delete = function () {
        var hasArguments = arguments.length > 0;
        return new Promise(function (resolve, reject) {
            if (hasArguments) throw new exceptions.InvalidArgument("Arguments not allowed in db.delete()");
            if (isBeingOpened) {
                dbReadyPromise.then(doDelete);
            } else {
                doDelete();
            }
            function doDelete() {
                db.close();
                var req = indexedDB.deleteDatabase(dbName);
                req.onsuccess = wrap(function () {
                    if (!hasNativeGetDatabaseNames) {
                        globalDatabaseList(function (databaseNames) {
                            var pos = databaseNames.indexOf(dbName);
                            if (pos >= 0) return databaseNames.splice(pos, 1);
                        });
                    }
                    resolve();
                });
                req.onerror = wrap(eventRejectHandler(reject));
                req.onblocked = fireOnBlocked;
            }
        }).uncaught(dbUncaught);
    };

    this.backendDB = function () {
        return idbdb;
    };

    this.isOpen = function () {
        return idbdb !== null;
    };
    this.hasFailed = function () {
        return dbOpenError !== null;
    };
    this.dynamicallyOpened = function () {
        return autoSchema;
    };

    //
    // Properties
    //
    this.name = dbName;

    // db.tables - an array of all Table instances.
    setProp(this, "tables", {
        get: function () {
            /// <returns type="Array" elementType="WriteableTable" />
            return keys(allTables).map(function (name) {
                return allTables[name];
            });
        }
    });

    //
    // Events
    //
    this.on = Events(this, "error", "populate", "blocked", "versionchange", { ready: [promisableChain, nop] });
    this.on.error.subscribe = deprecated("Dexie.on.error", this.on.error.subscribe);
    this.on.error.unsubscribe = deprecated("Dexie.on.error.unsubscribe", this.on.error.unsubscribe);

    this.on.ready.subscribe = override(this.on.ready.subscribe, function (subscribe) {
        return function (subscriber, bSticky) {
            Dexie.vip(function () {
                if (openComplete) {
                    // Database already open. Call subscriber asap.
                    if (!dbOpenError) Promise.resolve().then(subscriber);
                    // bSticky: Also subscribe to future open sucesses (after close / reopen) 
                    if (bSticky) subscribe(subscriber);
                } else {
                    // Database not yet open. Subscribe to it.
                    subscribe(subscriber);
                    // If bSticky is falsy, make sure to unsubscribe subscriber when fired once.
                    if (!bSticky) subscribe(function unsubscribe() {
                        db.on.ready.unsubscribe(subscriber);
                        db.on.ready.unsubscribe(unsubscribe);
                    });
                }
            });
        };
    });

    fakeAutoComplete(function () {
        db.on("populate").fire(db._createTransaction(READWRITE, dbStoreNames, globalSchema));
        db.on("error").fire(new Error());
    });

    this.transaction = function (mode, tableInstances, scopeFunc) {
        /// <summary>
        ///
        /// </summary>
        /// <param name="mode" type="String">"r" for readonly, or "rw" for readwrite</param>
        /// <param name="tableInstances">Table instance, Array of Table instances, String or String Array of object stores to include in the transaction</param>
        /// <param name="scopeFunc" type="Function">Function to execute with transaction</param>

        // Let table arguments be all arguments between mode and last argument.
        var i = arguments.length;
        if (i < 2) throw new exceptions.InvalidArgument("Too few arguments");
        // Prevent optimzation killer (https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#32-leaking-arguments)
        // and clone arguments except the first one into local var 'args'.
        var args = new Array(i - 1);
        while (--i) {
            args[i - 1] = arguments[i];
        } // Let scopeFunc be the last argument and pop it so that args now only contain the table arguments.
        scopeFunc = args.pop();
        var tables = flatten(args); // Support using array as middle argument, or a mix of arrays and non-arrays.
        var parentTransaction = PSD.trans;
        // Check if parent transactions is bound to this db instance, and if caller wants to reuse it
        if (!parentTransaction || parentTransaction.db !== db || mode.indexOf('!') !== -1) parentTransaction = null;
        var onlyIfCompatible = mode.indexOf('?') !== -1;
        mode = mode.replace('!', '').replace('?', ''); // Ok. Will change arguments[0] as well but we wont touch arguments henceforth.

        try {
            //
            // Get storeNames from arguments. Either through given table instances, or through given table names.
            //
            var storeNames = tables.map(function (table) {
                var storeName = table instanceof Table ? table.name : table;
                if (typeof storeName !== 'string') throw new TypeError("Invalid table argument to Dexie.transaction(). Only Table or String are allowed");
                return storeName;
            });

            //
            // Resolve mode. Allow shortcuts "r" and "rw".
            //
            if (mode == "r" || mode == READONLY) mode = READONLY;else if (mode == "rw" || mode == READWRITE) mode = READWRITE;else throw new exceptions.InvalidArgument("Invalid transaction mode: " + mode);

            if (parentTransaction) {
                // Basic checks
                if (parentTransaction.mode === READONLY && mode === READWRITE) {
                    if (onlyIfCompatible) {
                        // Spawn new transaction instead.
                        parentTransaction = null;
                    } else throw new exceptions.SubTransaction("Cannot enter a sub-transaction with READWRITE mode when parent transaction is READONLY");
                }
                if (parentTransaction) {
                    storeNames.forEach(function (storeName) {
                        if (parentTransaction && parentTransaction.storeNames.indexOf(storeName) === -1) {
                            if (onlyIfCompatible) {
                                // Spawn new transaction instead.
                                parentTransaction = null;
                            } else throw new exceptions.SubTransaction("Table " + storeName + " not included in parent transaction.");
                        }
                    });
                }
            }
        } catch (e) {
            return parentTransaction ? parentTransaction._promise(null, function (_, reject) {
                reject(e);
            }) : rejection(e, dbUncaught);
        }
        // If this is a sub-transaction, lock the parent and then launch the sub-transaction.
        return parentTransaction ? parentTransaction._promise(mode, enterTransactionScope, "lock") : db._whenReady(enterTransactionScope);

        function enterTransactionScope(resolve) {
            var parentPSD = PSD;
            resolve(Promise.resolve().then(function () {
                return newScope(function () {
                    // Keep a pointer to last non-transactional PSD to use if someone calls Dexie.ignoreTransaction().
                    PSD.transless = PSD.transless || parentPSD;
                    // Our transaction.
                    //return new Promise((resolve, reject) => {
                    var trans = db._createTransaction(mode, storeNames, globalSchema, parentTransaction);
                    // Let the transaction instance be part of a Promise-specific data (PSD) value.
                    PSD.trans = trans;

                    if (parentTransaction) {
                        // Emulate transaction commit awareness for inner transaction (must 'commit' when the inner transaction has no more operations ongoing)
                        trans.idbtrans = parentTransaction.idbtrans;
                    } else {
                        trans.create(); // Create the backend transaction so that complete() or error() will trigger even if no operation is made upon it.
                    }

                    // Provide arguments to the scope function (for backward compatibility)
                    var tableArgs = storeNames.map(function (name) {
                        return allTables[name];
                    });
                    tableArgs.push(trans);

                    var returnValue;
                    return Promise.follow(function () {
                        // Finally, call the scope function with our table and transaction arguments.
                        returnValue = scopeFunc.apply(trans, tableArgs); // NOTE: returnValue is used in trans.on.complete() not as a returnValue to this func.
                        if (returnValue) {
                            if (typeof returnValue.next === 'function' && typeof returnValue.throw === 'function') {
                                // scopeFunc returned an iterator with throw-support. Handle yield as await.
                                returnValue = awaitIterator(returnValue);
                            } else if (typeof returnValue.then === 'function' && !hasOwn(returnValue, '_PSD')) {
                                throw new exceptions.IncompatiblePromise("Incompatible Promise returned from transaction scope (read more at http://tinyurl.com/znyqjqc). Transaction scope: " + scopeFunc.toString());
                            }
                        }
                    }).uncaught(dbUncaught).then(function () {
                        if (parentTransaction) trans._resolve(); // sub transactions don't react to idbtrans.oncomplete. We must trigger a acompletion.
                        return trans._completion; // Even if WE believe everything is fine. Await IDBTransaction's oncomplete or onerror as well.
                    }).then(function () {
                        return returnValue;
                    }).catch(function (e) {
                        //reject(e);
                        trans._reject(e); // Yes, above then-handler were maybe not called because of an unhandled rejection in scopeFunc!
                        return rejection(e);
                    });
                    //});
                });
            }));
        }
    };

    this.table = function (tableName) {
        /// <returns type="WriteableTable"></returns>
        if (fake && autoSchema) return new WriteableTable(tableName);
        if (!hasOwn(allTables, tableName)) {
            throw new exceptions.InvalidTable('Table ' + tableName + ' does not exist');
        }
        return allTables[tableName];
    };

    //
    //
    //
    // Table Class
    //
    //
    //
    function Table(name, tableSchema, collClass) {
        /// <param name="name" type="String"></param>
        this.name = name;
        this.schema = tableSchema;
        this.hook = allTables[name] ? allTables[name].hook : Events(null, {
            "creating": [hookCreatingChain, nop],
            "reading": [pureFunctionChain, mirror],
            "updating": [hookUpdatingChain, nop],
            "deleting": [hookDeletingChain, nop]
        });
        this._collClass = collClass || Collection;
    }

    props(Table.prototype, {

        //
        // Table Protected Methods
        //

        _trans: function getTransaction(mode, fn, writeLocked) {
            var trans = PSD.trans;
            return trans && trans.db === db ? trans._promise(mode, fn, writeLocked) : tempTransaction(mode, [this.name], fn);
        },
        _idbstore: function getIDBObjectStore(mode, fn, writeLocked) {
            if (fake) return new Promise(fn); // Simplify the work for Intellisense/Code completion.
            var trans = PSD.trans,
                tableName = this.name;
            function supplyIdbStore(resolve, reject, trans) {
                fn(resolve, reject, trans.idbtrans.objectStore(tableName), trans);
            }
            return trans && trans.db === db ? trans._promise(mode, supplyIdbStore, writeLocked) : tempTransaction(mode, [this.name], supplyIdbStore);
        },

        //
        // Table Public Methods
        //
        get: function (key, cb) {
            var self = this;
            return this._idbstore(READONLY, function (resolve, reject, idbstore) {
                fake && resolve(self.schema.instanceTemplate);
                var req = idbstore.get(key);
                req.onerror = eventRejectHandler(reject);
                req.onsuccess = wrap(function () {
                    resolve(self.hook.reading.fire(req.result));
                }, reject);
            }).then(cb);
        },
        where: function (indexName) {
            return new WhereClause(this, indexName);
        },
        count: function (cb) {
            return this.toCollection().count(cb);
        },
        offset: function (offset) {
            return this.toCollection().offset(offset);
        },
        limit: function (numRows) {
            return this.toCollection().limit(numRows);
        },
        reverse: function () {
            return this.toCollection().reverse();
        },
        filter: function (filterFunction) {
            return this.toCollection().and(filterFunction);
        },
        each: function (fn) {
            return this.toCollection().each(fn);
        },
        toArray: function (cb) {
            return this.toCollection().toArray(cb);
        },
        orderBy: function (index) {
            return new this._collClass(new WhereClause(this, index));
        },

        toCollection: function () {
            return new this._collClass(new WhereClause(this));
        },

        mapToClass: function (constructor, structure) {
            /// <summary>
            ///     Map table to a javascript constructor function. Objects returned from the database will be instances of this class, making
            ///     it possible to the instanceOf operator as well as extending the class using constructor.prototype.method = function(){...}.
            /// </summary>
            /// <param name="constructor">Constructor function representing the class.</param>
            /// <param name="structure" optional="true">Helps IDE code completion by knowing the members that objects contain and not just the indexes. Also
            /// know what type each member has. Example: {name: String, emailAddresses: [String], password}</param>
            this.schema.mappedClass = constructor;
            var instanceTemplate = Object.create(constructor.prototype);
            if (structure) {
                // structure and instanceTemplate is for IDE code competion only while constructor.prototype is for actual inheritance.
                applyStructure(instanceTemplate, structure);
            }
            this.schema.instanceTemplate = instanceTemplate;

            // Now, subscribe to the when("reading") event to make all objects that come out from this table inherit from given class
            // no matter which method to use for reading (Table.get() or Table.where(...)... )
            var readHook = function (obj) {
                if (!obj) return obj; // No valid object. (Value is null). Return as is.
                // Create a new object that derives from constructor:
                var res = Object.create(constructor.prototype);
                // Clone members:
                for (var m in obj) {
                    if (hasOwn(obj, m)) try {
                        res[m] = obj[m];
                    } catch (_) {}
                }return res;
            };

            if (this.schema.readHook) {
                this.hook.reading.unsubscribe(this.schema.readHook);
            }
            this.schema.readHook = readHook;
            this.hook("reading", readHook);
            return constructor;
        },
        defineClass: function (structure) {
            /// <summary>
            ///     Define all members of the class that represents the table. This will help code completion of when objects are read from the database
            ///     as well as making it possible to extend the prototype of the returned constructor function.
            /// </summary>
            /// <param name="structure">Helps IDE code completion by knowing the members that objects contain and not just the indexes. Also
            /// know what type each member has. Example: {name: String, emailAddresses: [String], properties: {shoeSize: Number}}</param>
            return this.mapToClass(Dexie.defineClass(structure), structure);
        }
    });

    //
    //
    //
    // WriteableTable Class (extends Table)
    //
    //
    //
    function WriteableTable(name, tableSchema, collClass) {
        Table.call(this, name, tableSchema, collClass || WriteableCollection);
    }

    function BulkErrorHandlerCatchAll(errorList, done, supportHooks) {
        return (supportHooks ? hookedEventRejectHandler : eventRejectHandler)(function (e) {
            errorList.push(e);
            done && done();
        });
    }

    function bulkDelete(idbstore, trans, keysOrTuples, hasDeleteHook, deletingHook) {
        // If hasDeleteHook, keysOrTuples must be an array of tuples: [[key1, value2],[key2,value2],...],
        // else keysOrTuples must be just an array of keys: [key1, key2, ...].
        return new Promise(function (resolve, reject) {
            var len = keysOrTuples.length,
                lastItem = len - 1;
            if (len === 0) return resolve();
            if (!hasDeleteHook) {
                for (var i = 0; i < len; ++i) {
                    var req = idbstore.delete(keysOrTuples[i]);
                    req.onerror = wrap(eventRejectHandler(reject));
                    if (i === lastItem) req.onsuccess = wrap(function () {
                        return resolve();
                    });
                }
            } else {
                var hookCtx,
                    errorHandler = hookedEventRejectHandler(reject),
                    successHandler = hookedEventSuccessHandler(null);
                tryCatch(function () {
                    for (var i = 0; i < len; ++i) {
                        hookCtx = { onsuccess: null, onerror: null };
                        var tuple = keysOrTuples[i];
                        deletingHook.call(hookCtx, tuple[0], tuple[1], trans);
                        var req = idbstore.delete(tuple[0]);
                        req._hookCtx = hookCtx;
                        req.onerror = errorHandler;
                        if (i === lastItem) req.onsuccess = hookedEventSuccessHandler(resolve);else req.onsuccess = successHandler;
                    }
                }, function (err) {
                    hookCtx.onerror && hookCtx.onerror(err);
                    throw err;
                });
            }
        }).uncaught(dbUncaught);
    }

    derive(WriteableTable).from(Table).extend({
        bulkDelete: function (keys$$1) {
            if (this.hook.deleting.fire === nop) {
                return this._idbstore(READWRITE, function (resolve, reject, idbstore, trans) {
                    resolve(bulkDelete(idbstore, trans, keys$$1, false, nop));
                });
            } else {
                return this.where(':id').anyOf(keys$$1).delete().then(function () {}); // Resolve with undefined.
            }
        },
        bulkPut: function (objects, keys$$1) {
            var _this = this;

            return this._idbstore(READWRITE, function (resolve, reject, idbstore) {
                if (!idbstore.keyPath && !_this.schema.primKey.auto && !keys$$1) throw new exceptions.InvalidArgument("bulkPut() with non-inbound keys requires keys array in second argument");
                if (idbstore.keyPath && keys$$1) throw new exceptions.InvalidArgument("bulkPut(): keys argument invalid on tables with inbound keys");
                if (keys$$1 && keys$$1.length !== objects.length) throw new exceptions.InvalidArgument("Arguments objects and keys must have the same length");
                if (objects.length === 0) return resolve(); // Caller provided empty list.
                var done = function (result) {
                    if (errorList.length === 0) resolve(result);else reject(new BulkError(_this.name + '.bulkPut(): ' + errorList.length + ' of ' + numObjs + ' operations failed', errorList));
                };
                var req,
                    errorList = [],
                    errorHandler,
                    numObjs = objects.length,
                    table = _this;
                if (_this.hook.creating.fire === nop && _this.hook.updating.fire === nop) {
                    //
                    // Standard Bulk (no 'creating' or 'updating' hooks to care about)
                    //
                    errorHandler = BulkErrorHandlerCatchAll(errorList);
                    for (var i = 0, l = objects.length; i < l; ++i) {
                        req = keys$$1 ? idbstore.put(objects[i], keys$$1[i]) : idbstore.put(objects[i]);
                        req.onerror = errorHandler;
                    }
                    // Only need to catch success or error on the last operation
                    // according to the IDB spec.
                    req.onerror = BulkErrorHandlerCatchAll(errorList, done);
                    req.onsuccess = eventSuccessHandler(done);
                } else {
                    var effectiveKeys = keys$$1 || idbstore.keyPath && objects.map(function (o) {
                        return getByKeyPath(o, idbstore.keyPath);
                    });
                    // Generate map of {[key]: object}
                    var objectLookup = effectiveKeys && arrayToObject(effectiveKeys, function (key, i) {
                        return key != null && [key, objects[i]];
                    });
                    var promise = !effectiveKeys ?

                    // Auto-incremented key-less objects only without any keys argument.
                    table.bulkAdd(objects) :

                    // Keys provided. Either as inbound in provided objects, or as a keys argument.
                    // Begin with updating those that exists in DB:
                    table.where(':id').anyOf(effectiveKeys.filter(function (key) {
                        return key != null;
                    })).modify(function () {
                        this.value = objectLookup[this.primKey];
                        objectLookup[this.primKey] = null; // Mark as "don't add this"
                    }).catch(ModifyError, function (e) {
                        errorList = e.failures; // No need to concat here. These are the first errors added.
                    }).then(function () {
                        // Now, let's examine which items didnt exist so we can add them:
                        var objsToAdd = [],
                            keysToAdd = keys$$1 && [];
                        // Iterate backwards. Why? Because if same key was used twice, just add the last one.
                        for (var i = effectiveKeys.length - 1; i >= 0; --i) {
                            var key = effectiveKeys[i];
                            if (key == null || objectLookup[key]) {
                                objsToAdd.push(objects[i]);
                                keys$$1 && keysToAdd.push(key);
                                if (key != null) objectLookup[key] = null; // Mark as "dont add again"
                            }
                        }
                        // The items are in reverse order so reverse them before adding.
                        // Could be important in order to get auto-incremented keys the way the caller
                        // would expect. Could have used unshift instead of push()/reverse(),
                        // but: http://jsperf.com/unshift-vs-reverse
                        objsToAdd.reverse();
                        keys$$1 && keysToAdd.reverse();
                        return table.bulkAdd(objsToAdd, keysToAdd);
                    }).then(function (lastAddedKey) {
                        // Resolve with key of the last object in given arguments to bulkPut():
                        var lastEffectiveKey = effectiveKeys[effectiveKeys.length - 1]; // Key was provided.
                        return lastEffectiveKey != null ? lastEffectiveKey : lastAddedKey;
                    });

                    promise.then(done).catch(BulkError, function (e) {
                        // Concat failure from ModifyError and reject using our 'done' method.
                        errorList = errorList.concat(e.failures);
                        done();
                    }).catch(reject);
                }
            }, "locked"); // If called from transaction scope, lock transaction til all steps are done.
        },
        bulkAdd: function (objects, keys$$1) {
            var self = this,
                creatingHook = this.hook.creating.fire;
            return this._idbstore(READWRITE, function (resolve, reject, idbstore, trans) {
                if (!idbstore.keyPath && !self.schema.primKey.auto && !keys$$1) throw new exceptions.InvalidArgument("bulkAdd() with non-inbound keys requires keys array in second argument");
                if (idbstore.keyPath && keys$$1) throw new exceptions.InvalidArgument("bulkAdd(): keys argument invalid on tables with inbound keys");
                if (keys$$1 && keys$$1.length !== objects.length) throw new exceptions.InvalidArgument("Arguments objects and keys must have the same length");
                if (objects.length === 0) return resolve(); // Caller provided empty list.
                function done(result) {
                    if (errorList.length === 0) resolve(result);else reject(new BulkError(self.name + '.bulkAdd(): ' + errorList.length + ' of ' + numObjs + ' operations failed', errorList));
                }
                var req,
                    errorList = [],
                    errorHandler,
                    successHandler,
                    numObjs = objects.length;
                if (creatingHook !== nop) {
                    //
                    // There are subscribers to hook('creating')
                    // Must behave as documented.
                    //
                    var keyPath = idbstore.keyPath,
                        hookCtx;
                    errorHandler = BulkErrorHandlerCatchAll(errorList, null, true);
                    successHandler = hookedEventSuccessHandler(null);

                    tryCatch(function () {
                        for (var i = 0, l = objects.length; i < l; ++i) {
                            hookCtx = { onerror: null, onsuccess: null };
                            var key = keys$$1 && keys$$1[i];
                            var obj = objects[i],
                                effectiveKey = keys$$1 ? key : keyPath ? getByKeyPath(obj, keyPath) : undefined,
                                keyToUse = creatingHook.call(hookCtx, effectiveKey, obj, trans);
                            if (effectiveKey == null && keyToUse != null) {
                                if (keyPath) {
                                    obj = deepClone(obj);
                                    setByKeyPath(obj, keyPath, keyToUse);
                                } else {
                                    key = keyToUse;
                                }
                            }
                            req = key != null ? idbstore.add(obj, key) : idbstore.add(obj);
                            req._hookCtx = hookCtx;
                            if (i < l - 1) {
                                req.onerror = errorHandler;
                                if (hookCtx.onsuccess) req.onsuccess = successHandler;
                            }
                        }
                    }, function (err) {
                        hookCtx.onerror && hookCtx.onerror(err);
                        throw err;
                    });

                    req.onerror = BulkErrorHandlerCatchAll(errorList, done, true);
                    req.onsuccess = hookedEventSuccessHandler(done);
                } else {
                    //
                    // Standard Bulk (no 'creating' hook to care about)
                    //
                    errorHandler = BulkErrorHandlerCatchAll(errorList);
                    for (var i = 0, l = objects.length; i < l; ++i) {
                        req = keys$$1 ? idbstore.add(objects[i], keys$$1[i]) : idbstore.add(objects[i]);
                        req.onerror = errorHandler;
                    }
                    // Only need to catch success or error on the last operation
                    // according to the IDB spec.
                    req.onerror = BulkErrorHandlerCatchAll(errorList, done);
                    req.onsuccess = eventSuccessHandler(done);
                }
            });
        },
        add: function (obj, key) {
            /// <summary>
            ///   Add an object to the database. In case an object with same primary key already exists, the object will not be added.
            /// </summary>
            /// <param name="obj" type="Object">A javascript object to insert</param>
            /// <param name="key" optional="true">Primary key</param>
            var creatingHook = this.hook.creating.fire;
            return this._idbstore(READWRITE, function (resolve, reject, idbstore, trans) {
                var hookCtx = { onsuccess: null, onerror: null };
                if (creatingHook !== nop) {
                    var effectiveKey = key != null ? key : idbstore.keyPath ? getByKeyPath(obj, idbstore.keyPath) : undefined;
                    var keyToUse = creatingHook.call(hookCtx, effectiveKey, obj, trans); // Allow subscribers to when("creating") to generate the key.
                    if (effectiveKey == null && keyToUse != null) {
                        // Using "==" and "!=" to check for either null or undefined!
                        if (idbstore.keyPath) setByKeyPath(obj, idbstore.keyPath, keyToUse);else key = keyToUse;
                    }
                }
                try {
                    var req = key != null ? idbstore.add(obj, key) : idbstore.add(obj);
                    req._hookCtx = hookCtx;
                    req.onerror = hookedEventRejectHandler(reject);
                    req.onsuccess = hookedEventSuccessHandler(function (result) {
                        // TODO: Remove these two lines in next major release (2.0?)
                        // It's no good practice to have side effects on provided parameters
                        var keyPath = idbstore.keyPath;
                        if (keyPath) setByKeyPath(obj, keyPath, result);
                        resolve(result);
                    });
                } catch (e) {
                    if (hookCtx.onerror) hookCtx.onerror(e);
                    throw e;
                }
            });
        },

        put: function (obj, key) {
            /// <summary>
            ///   Add an object to the database but in case an object with same primary key alread exists, the existing one will get updated.
            /// </summary>
            /// <param name="obj" type="Object">A javascript object to insert or update</param>
            /// <param name="key" optional="true">Primary key</param>
            var self = this,
                creatingHook = this.hook.creating.fire,
                updatingHook = this.hook.updating.fire;
            if (creatingHook !== nop || updatingHook !== nop) {
                //
                // People listens to when("creating") or when("updating") events!
                // We must know whether the put operation results in an CREATE or UPDATE.
                //
                return this._trans(READWRITE, function (resolve, reject, trans) {
                    // Since key is optional, make sure we get it from obj if not provided
                    var effectiveKey = key !== undefined ? key : self.schema.primKey.keyPath && getByKeyPath(obj, self.schema.primKey.keyPath);
                    if (effectiveKey == null) {
                        // "== null" means checking for either null or undefined.
                        // No primary key. Must use add().
                        self.add(obj).then(resolve, reject);
                    } else {
                        // Primary key exist. Lock transaction and try modifying existing. If nothing modified, call add().
                        trans._lock(); // Needed because operation is splitted into modify() and add().
                        // clone obj before this async call. If caller modifies obj the line after put(), the IDB spec requires that it should not affect operation.
                        obj = deepClone(obj);
                        self.where(":id").equals(effectiveKey).modify(function () {
                            // Replace extisting value with our object
                            // CRUD event firing handled in WriteableCollection.modify()
                            this.value = obj;
                        }).then(function (count) {
                            if (count === 0) {
                                // Object's key was not found. Add the object instead.
                                // CRUD event firing will be done in add()
                                return self.add(obj, key); // Resolving with another Promise. Returned Promise will then resolve with the new key.
                            } else {
                                return effectiveKey; // Resolve with the provided key.
                            }
                        }).finally(function () {
                            trans._unlock();
                        }).then(resolve, reject);
                    }
                });
            } else {
                // Use the standard IDB put() method.
                return this._idbstore(READWRITE, function (resolve, reject, idbstore) {
                    var req = key !== undefined ? idbstore.put(obj, key) : idbstore.put(obj);
                    req.onerror = eventRejectHandler(reject);
                    req.onsuccess = function (ev) {
                        var keyPath = idbstore.keyPath;
                        if (keyPath) setByKeyPath(obj, keyPath, ev.target.result);
                        resolve(req.result);
                    };
                });
            }
        },

        'delete': function (key) {
            /// <param name="key">Primary key of the object to delete</param>
            if (this.hook.deleting.subscribers.length) {
                // People listens to when("deleting") event. Must implement delete using WriteableCollection.delete() that will
                // call the CRUD event. Only WriteableCollection.delete() will know whether an object was actually deleted.
                return this.where(":id").equals(key).delete();
            } else {
                // No one listens. Use standard IDB delete() method.
                return this._idbstore(READWRITE, function (resolve, reject, idbstore) {
                    var req = idbstore.delete(key);
                    req.onerror = eventRejectHandler(reject);
                    req.onsuccess = function () {
                        resolve(req.result);
                    };
                });
            }
        },

        clear: function () {
            if (this.hook.deleting.subscribers.length) {
                // People listens to when("deleting") event. Must implement delete using WriteableCollection.delete() that will
                // call the CRUD event. Only WriteableCollection.delete() will knows which objects that are actually deleted.
                return this.toCollection().delete();
            } else {
                return this._idbstore(READWRITE, function (resolve, reject, idbstore) {
                    var req = idbstore.clear();
                    req.onerror = eventRejectHandler(reject);
                    req.onsuccess = function () {
                        resolve(req.result);
                    };
                });
            }
        },

        update: function (keyOrObject, modifications) {
            if (typeof modifications !== 'object' || isArray(modifications)) throw new exceptions.InvalidArgument("Modifications must be an object.");
            if (typeof keyOrObject === 'object' && !isArray(keyOrObject)) {
                // object to modify. Also modify given object with the modifications:
                keys(modifications).forEach(function (keyPath) {
                    setByKeyPath(keyOrObject, keyPath, modifications[keyPath]);
                });
                var key = getByKeyPath(keyOrObject, this.schema.primKey.keyPath);
                if (key === undefined) return rejection(new exceptions.InvalidArgument("Given object does not contain its primary key"), dbUncaught);
                return this.where(":id").equals(key).modify(modifications);
            } else {
                // key to modify
                return this.where(":id").equals(keyOrObject).modify(modifications);
            }
        }
    });

    //
    //
    //
    // Transaction Class
    //
    //
    //
    function Transaction(mode, storeNames, dbschema, parent) {
        var _this2 = this;

        /// <summary>
        ///    Transaction class. Represents a database transaction. All operations on db goes through a Transaction.
        /// </summary>
        /// <param name="mode" type="String">Any of "readwrite" or "readonly"</param>
        /// <param name="storeNames" type="Array">Array of table names to operate on</param>
        this.db = db;
        this.mode = mode;
        this.storeNames = storeNames;
        this.idbtrans = null;
        this.on = Events(this, "complete", "error", "abort");
        this.parent = parent || null;
        this.active = true;
        this._tables = null;
        this._reculock = 0;
        this._blockedFuncs = [];
        this._psd = null;
        this._dbschema = dbschema;
        this._resolve = null;
        this._reject = null;
        this._completion = new Promise(function (resolve, reject) {
            _this2._resolve = resolve;
            _this2._reject = reject;
        }).uncaught(dbUncaught);

        this._completion.then(function () {
            _this2.on.complete.fire();
        }, function (e) {
            _this2.on.error.fire(e);
            _this2.parent ? _this2.parent._reject(e) : _this2.active && _this2.idbtrans && _this2.idbtrans.abort();
            _this2.active = false;
            return rejection(e); // Indicate we actually DO NOT catch this error.
        });
    }

    props(Transaction.prototype, {
        //
        // Transaction Protected Methods (not required by API users, but needed internally and eventually by dexie extensions)
        //
        _lock: function () {
            assert(!PSD.global); // Locking and unlocking reuires to be within a PSD scope.
            // Temporary set all requests into a pending queue if they are called before database is ready.
            ++this._reculock; // Recursive read/write lock pattern using PSD (Promise Specific Data) instead of TLS (Thread Local Storage)
            if (this._reculock === 1 && !PSD.global) PSD.lockOwnerFor = this;
            return this;
        },
        _unlock: function () {
            assert(!PSD.global); // Locking and unlocking reuires to be within a PSD scope.
            if (--this._reculock === 0) {
                if (!PSD.global) PSD.lockOwnerFor = null;
                while (this._blockedFuncs.length > 0 && !this._locked()) {
                    var fnAndPSD = this._blockedFuncs.shift();
                    try {
                        usePSD(fnAndPSD[1], fnAndPSD[0]);
                    } catch (e) {}
                }
            }
            return this;
        },
        _locked: function () {
            // Checks if any write-lock is applied on this transaction.
            // To simplify the Dexie API for extension implementations, we support recursive locks.
            // This is accomplished by using "Promise Specific Data" (PSD).
            // PSD data is bound to a Promise and any child Promise emitted through then() or resolve( new Promise() ).
            // PSD is local to code executing on top of the call stacks of any of any code executed by Promise():
            //         * callback given to the Promise() constructor  (function (resolve, reject){...})
            //         * callbacks given to then()/catch()/finally() methods (function (value){...})
            // If creating a new independant Promise instance from within a Promise call stack, the new Promise will derive the PSD from the call stack of the parent Promise.
            // Derivation is done so that the inner PSD __proto__ points to the outer PSD.
            // PSD.lockOwnerFor will point to current transaction object if the currently executing PSD scope owns the lock.
            return this._reculock && PSD.lockOwnerFor !== this;
        },
        create: function (idbtrans) {
            var _this3 = this;

            assert(!this.idbtrans);
            if (!idbtrans && !idbdb) {
                switch (dbOpenError && dbOpenError.name) {
                    case "DatabaseClosedError":
                        // Errors where it is no difference whether it was caused by the user operation or an earlier call to db.open()
                        throw new exceptions.DatabaseClosed(dbOpenError);
                    case "MissingAPIError":
                        // Errors where it is no difference whether it was caused by the user operation or an earlier call to db.open()
                        throw new exceptions.MissingAPI(dbOpenError.message, dbOpenError);
                    default:
                        // Make it clear that the user operation was not what caused the error - the error had occurred earlier on db.open()!
                        throw new exceptions.OpenFailed(dbOpenError);
                }
            }
            if (!this.active) throw new exceptions.TransactionInactive();
            assert(this._completion._state === null);

            idbtrans = this.idbtrans = idbtrans || idbdb.transaction(safariMultiStoreFix(this.storeNames), this.mode);
            idbtrans.onerror = wrap(function (ev) {
                preventDefault(ev); // Prohibit default bubbling to window.error
                _this3._reject(idbtrans.error);
            });
            idbtrans.onabort = wrap(function (ev) {
                preventDefault(ev);
                _this3.active && _this3._reject(new exceptions.Abort());
                _this3.active = false;
                _this3.on("abort").fire(ev);
            });
            idbtrans.oncomplete = wrap(function () {
                _this3.active = false;
                _this3._resolve();
            });
            return this;
        },
        _promise: function (mode, fn, bWriteLock) {
            var self = this;
            var p = self._locked() ?
            // Read lock always. Transaction is write-locked. Wait for mutex.
            new Promise(function (resolve, reject) {
                self._blockedFuncs.push([function () {
                    self._promise(mode, fn, bWriteLock).then(resolve, reject);
                }, PSD]);
            }) : newScope(function () {
                var p_ = self.active ? new Promise(function (resolve, reject) {
                    if (mode === READWRITE && self.mode !== READWRITE) throw new exceptions.ReadOnly("Transaction is readonly");
                    if (!self.idbtrans && mode) self.create();
                    if (bWriteLock) self._lock(); // Write lock if write operation is requested
                    fn(resolve, reject, self);
                }) : rejection(new exceptions.TransactionInactive());
                if (self.active && bWriteLock) p_.finally(function () {
                    self._unlock();
                });
                return p_;
            });

            p._lib = true;
            return p.uncaught(dbUncaught);
        },

        //
        // Transaction Public Properties and Methods
        //
        abort: function () {
            this.active && this._reject(new exceptions.Abort());
            this.active = false;
        },

        tables: {
            get: deprecated("Transaction.tables", function () {
                return arrayToObject(this.storeNames, function (name) {
                    return [name, allTables[name]];
                });
            }, "Use db.tables()")
        },

        complete: deprecated("Transaction.complete()", function (cb) {
            return this.on("complete", cb);
        }),

        error: deprecated("Transaction.error()", function (cb) {
            return this.on("error", cb);
        }),

        table: deprecated("Transaction.table()", function (name) {
            if (this.storeNames.indexOf(name) === -1) throw new exceptions.InvalidTable("Table " + name + " not in transaction");
            return allTables[name];
        })

    });

    //
    //
    //
    // WhereClause
    //
    //
    //
    function WhereClause(table, index, orCollection) {
        /// <param name="table" type="Table"></param>
        /// <param name="index" type="String" optional="true"></param>
        /// <param name="orCollection" type="Collection" optional="true"></param>
        this._ctx = {
            table: table,
            index: index === ":id" ? null : index,
            collClass: table._collClass,
            or: orCollection
        };
    }

    props(WhereClause.prototype, function () {

        // WhereClause private methods

        function fail(collectionOrWhereClause, err, T) {
            var collection = collectionOrWhereClause instanceof WhereClause ? new collectionOrWhereClause._ctx.collClass(collectionOrWhereClause) : collectionOrWhereClause;

            collection._ctx.error = T ? new T(err) : new TypeError(err);
            return collection;
        }

        function emptyCollection(whereClause) {
            return new whereClause._ctx.collClass(whereClause, function () {
                return IDBKeyRange.only("");
            }).limit(0);
        }

        function upperFactory(dir) {
            return dir === "next" ? function (s) {
                return s.toUpperCase();
            } : function (s) {
                return s.toLowerCase();
            };
        }
        function lowerFactory(dir) {
            return dir === "next" ? function (s) {
                return s.toLowerCase();
            } : function (s) {
                return s.toUpperCase();
            };
        }
        function nextCasing(key, lowerKey, upperNeedle, lowerNeedle, cmp, dir) {
            var length = Math.min(key.length, lowerNeedle.length);
            var llp = -1;
            for (var i = 0; i < length; ++i) {
                var lwrKeyChar = lowerKey[i];
                if (lwrKeyChar !== lowerNeedle[i]) {
                    if (cmp(key[i], upperNeedle[i]) < 0) return key.substr(0, i) + upperNeedle[i] + upperNeedle.substr(i + 1);
                    if (cmp(key[i], lowerNeedle[i]) < 0) return key.substr(0, i) + lowerNeedle[i] + upperNeedle.substr(i + 1);
                    if (llp >= 0) return key.substr(0, llp) + lowerKey[llp] + upperNeedle.substr(llp + 1);
                    return null;
                }
                if (cmp(key[i], lwrKeyChar) < 0) llp = i;
            }
            if (length < lowerNeedle.length && dir === "next") return key + upperNeedle.substr(key.length);
            if (length < key.length && dir === "prev") return key.substr(0, upperNeedle.length);
            return llp < 0 ? null : key.substr(0, llp) + lowerNeedle[llp] + upperNeedle.substr(llp + 1);
        }

        function addIgnoreCaseAlgorithm(whereClause, match, needles, suffix) {
            /// <param name="needles" type="Array" elementType="String"></param>
            var upper,
                lower,
                compare,
                upperNeedles,
                lowerNeedles,
                direction,
                nextKeySuffix,
                needlesLen = needles.length;
            if (!needles.every(function (s) {
                return typeof s === 'string';
            })) {
                return fail(whereClause, STRING_EXPECTED);
            }
            function initDirection(dir) {
                upper = upperFactory(dir);
                lower = lowerFactory(dir);
                compare = dir === "next" ? simpleCompare : simpleCompareReverse;
                var needleBounds = needles.map(function (needle) {
                    return { lower: lower(needle), upper: upper(needle) };
                }).sort(function (a, b) {
                    return compare(a.lower, b.lower);
                });
                upperNeedles = needleBounds.map(function (nb) {
                    return nb.upper;
                });
                lowerNeedles = needleBounds.map(function (nb) {
                    return nb.lower;
                });
                direction = dir;
                nextKeySuffix = dir === "next" ? "" : suffix;
            }
            initDirection("next");

            var c = new whereClause._ctx.collClass(whereClause, function () {
                return IDBKeyRange.bound(upperNeedles[0], lowerNeedles[needlesLen - 1] + suffix);
            });

            c._ondirectionchange = function (direction) {
                // This event onlys occur before filter is called the first time.
                initDirection(direction);
            };

            var firstPossibleNeedle = 0;

            c._addAlgorithm(function (cursor, advance, resolve) {
                /// <param name="cursor" type="IDBCursor"></param>
                /// <param name="advance" type="Function"></param>
                /// <param name="resolve" type="Function"></param>
                var key = cursor.key;
                if (typeof key !== 'string') return false;
                var lowerKey = lower(key);
                if (match(lowerKey, lowerNeedles, firstPossibleNeedle)) {
                    return true;
                } else {
                    var lowestPossibleCasing = null;
                    for (var i = firstPossibleNeedle; i < needlesLen; ++i) {
                        var casing = nextCasing(key, lowerKey, upperNeedles[i], lowerNeedles[i], compare, direction);
                        if (casing === null && lowestPossibleCasing === null) firstPossibleNeedle = i + 1;else if (lowestPossibleCasing === null || compare(lowestPossibleCasing, casing) > 0) {
                            lowestPossibleCasing = casing;
                        }
                    }
                    if (lowestPossibleCasing !== null) {
                        advance(function () {
                            cursor.continue(lowestPossibleCasing + nextKeySuffix);
                        });
                    } else {
                        advance(resolve);
                    }
                    return false;
                }
            });
            return c;
        }

        //
        // WhereClause public methods
        //
        return {
            between: function (lower, upper, includeLower, includeUpper) {
                /// <summary>
                ///     Filter out records whose where-field lays between given lower and upper values. Applies to Strings, Numbers and Dates.
                /// </summary>
                /// <param name="lower"></param>
                /// <param name="upper"></param>
                /// <param name="includeLower" optional="true">Whether items that equals lower should be included. Default true.</param>
                /// <param name="includeUpper" optional="true">Whether items that equals upper should be included. Default false.</param>
                /// <returns type="Collection"></returns>
                includeLower = includeLower !== false; // Default to true
                includeUpper = includeUpper === true; // Default to false
                try {
                    if (cmp(lower, upper) > 0 || cmp(lower, upper) === 0 && (includeLower || includeUpper) && !(includeLower && includeUpper)) return emptyCollection(this); // Workaround for idiotic W3C Specification that DataError must be thrown if lower > upper. The natural result would be to return an empty collection.
                    return new this._ctx.collClass(this, function () {
                        return IDBKeyRange.bound(lower, upper, !includeLower, !includeUpper);
                    });
                } catch (e) {
                    return fail(this, INVALID_KEY_ARGUMENT);
                }
            },
            equals: function (value) {
                return new this._ctx.collClass(this, function () {
                    return IDBKeyRange.only(value);
                });
            },
            above: function (value) {
                return new this._ctx.collClass(this, function () {
                    return IDBKeyRange.lowerBound(value, true);
                });
            },
            aboveOrEqual: function (value) {
                return new this._ctx.collClass(this, function () {
                    return IDBKeyRange.lowerBound(value);
                });
            },
            below: function (value) {
                return new this._ctx.collClass(this, function () {
                    return IDBKeyRange.upperBound(value, true);
                });
            },
            belowOrEqual: function (value) {
                return new this._ctx.collClass(this, function () {
                    return IDBKeyRange.upperBound(value);
                });
            },
            startsWith: function (str) {
                /// <param name="str" type="String"></param>
                if (typeof str !== 'string') return fail(this, STRING_EXPECTED);
                return this.between(str, str + maxString, true, true);
            },
            startsWithIgnoreCase: function (str) {
                /// <param name="str" type="String"></param>
                if (str === "") return this.startsWith(str);
                return addIgnoreCaseAlgorithm(this, function (x, a) {
                    return x.indexOf(a[0]) === 0;
                }, [str], maxString);
            },
            equalsIgnoreCase: function (str) {
                /// <param name="str" type="String"></param>
                return addIgnoreCaseAlgorithm(this, function (x, a) {
                    return x === a[0];
                }, [str], "");
            },
            anyOfIgnoreCase: function () {
                var set = getArrayOf.apply(NO_CHAR_ARRAY, arguments);
                if (set.length === 0) return emptyCollection(this);
                return addIgnoreCaseAlgorithm(this, function (x, a) {
                    return a.indexOf(x) !== -1;
                }, set, "");
            },
            startsWithAnyOfIgnoreCase: function () {
                var set = getArrayOf.apply(NO_CHAR_ARRAY, arguments);
                if (set.length === 0) return emptyCollection(this);
                return addIgnoreCaseAlgorithm(this, function (x, a) {
                    return a.some(function (n) {
                        return x.indexOf(n) === 0;
                    });
                }, set, maxString);
            },
            anyOf: function () {
                var set = getArrayOf.apply(NO_CHAR_ARRAY, arguments);
                var compare = ascending;
                try {
                    set.sort(compare);
                } catch (e) {
                    return fail(this, INVALID_KEY_ARGUMENT);
                }
                if (set.length === 0) return emptyCollection(this);
                var c = new this._ctx.collClass(this, function () {
                    return IDBKeyRange.bound(set[0], set[set.length - 1]);
                });

                c._ondirectionchange = function (direction) {
                    compare = direction === "next" ? ascending : descending;
                    set.sort(compare);
                };
                var i = 0;
                c._addAlgorithm(function (cursor, advance, resolve) {
                    var key = cursor.key;
                    while (compare(key, set[i]) > 0) {
                        // The cursor has passed beyond this key. Check next.
                        ++i;
                        if (i === set.length) {
                            // There is no next. Stop searching.
                            advance(resolve);
                            return false;
                        }
                    }
                    if (compare(key, set[i]) === 0) {
                        // The current cursor value should be included and we should continue a single step in case next item has the same key or possibly our next key in set.
                        return true;
                    } else {
                        // cursor.key not yet at set[i]. Forward cursor to the next key to hunt for.
                        advance(function () {
                            cursor.continue(set[i]);
                        });
                        return false;
                    }
                });
                return c;
            },

            notEqual: function (value) {
                return this.inAnyRange([[-Infinity, value], [value, maxKey]], { includeLowers: false, includeUppers: false });
            },

            noneOf: function () {
                var set = getArrayOf.apply(NO_CHAR_ARRAY, arguments);
                if (set.length === 0) return new this._ctx.collClass(this); // Return entire collection.
                try {
                    set.sort(ascending);
                } catch (e) {
                    return fail(this, INVALID_KEY_ARGUMENT);
                }
                // Transform ["a","b","c"] to a set of ranges for between/above/below: [[-Infinity,"a"], ["a","b"], ["b","c"], ["c",maxKey]]
                var ranges = set.reduce(function (res, val) {
                    return res ? res.concat([[res[res.length - 1][1], val]]) : [[-Infinity, val]];
                }, null);
                ranges.push([set[set.length - 1], maxKey]);
                return this.inAnyRange(ranges, { includeLowers: false, includeUppers: false });
            },

            /** Filter out values withing given set of ranges.
            * Example, give children and elders a rebate of 50%:
            *
            *   db.friends.where('age').inAnyRange([[0,18],[65,Infinity]]).modify({Rebate: 1/2});
            *
            * @param {(string|number|Date|Array)[][]} ranges
            * @param {{includeLowers: boolean, includeUppers: boolean}} options
            */
            inAnyRange: function (ranges, options) {
                var ctx = this._ctx;
                if (ranges.length === 0) return emptyCollection(this);
                if (!ranges.every(function (range) {
                    return range[0] !== undefined && range[1] !== undefined && ascending(range[0], range[1]) <= 0;
                })) {
                    return fail(this, "First argument to inAnyRange() must be an Array of two-value Arrays [lower,upper] where upper must not be lower than lower", exceptions.InvalidArgument);
                }
                var includeLowers = !options || options.includeLowers !== false; // Default to true
                var includeUppers = options && options.includeUppers === true; // Default to false

                function addRange(ranges, newRange) {
                    for (var i = 0, l = ranges.length; i < l; ++i) {
                        var range = ranges[i];
                        if (cmp(newRange[0], range[1]) < 0 && cmp(newRange[1], range[0]) > 0) {
                            range[0] = min(range[0], newRange[0]);
                            range[1] = max(range[1], newRange[1]);
                            break;
                        }
                    }
                    if (i === l) ranges.push(newRange);
                    return ranges;
                }

                var sortDirection = ascending;
                function rangeSorter(a, b) {
                    return sortDirection(a[0], b[0]);
                }

                // Join overlapping ranges
                var set;
                try {
                    set = ranges.reduce(addRange, []);
                    set.sort(rangeSorter);
                } catch (ex) {
                    return fail(this, INVALID_KEY_ARGUMENT);
                }

                var i = 0;
                var keyIsBeyondCurrentEntry = includeUppers ? function (key) {
                    return ascending(key, set[i][1]) > 0;
                } : function (key) {
                    return ascending(key, set[i][1]) >= 0;
                };

                var keyIsBeforeCurrentEntry = includeLowers ? function (key) {
                    return descending(key, set[i][0]) > 0;
                } : function (key) {
                    return descending(key, set[i][0]) >= 0;
                };

                function keyWithinCurrentRange(key) {
                    return !keyIsBeyondCurrentEntry(key) && !keyIsBeforeCurrentEntry(key);
                }

                var checkKey = keyIsBeyondCurrentEntry;

                var c = new ctx.collClass(this, function () {
                    return IDBKeyRange.bound(set[0][0], set[set.length - 1][1], !includeLowers, !includeUppers);
                });

                c._ondirectionchange = function (direction) {
                    if (direction === "next") {
                        checkKey = keyIsBeyondCurrentEntry;
                        sortDirection = ascending;
                    } else {
                        checkKey = keyIsBeforeCurrentEntry;
                        sortDirection = descending;
                    }
                    set.sort(rangeSorter);
                };

                c._addAlgorithm(function (cursor, advance, resolve) {
                    var key = cursor.key;
                    while (checkKey(key)) {
                        // The cursor has passed beyond this key. Check next.
                        ++i;
                        if (i === set.length) {
                            // There is no next. Stop searching.
                            advance(resolve);
                            return false;
                        }
                    }
                    if (keyWithinCurrentRange(key)) {
                        // The current cursor value should be included and we should continue a single step in case next item has the same key or possibly our next key in set.
                        return true;
                    } else if (cmp(key, set[i][1]) === 0 || cmp(key, set[i][0]) === 0) {
                        // includeUpper or includeLower is false so keyWithinCurrentRange() returns false even though we are at range border.
                        // Continue to next key but don't include this one.
                        return false;
                    } else {
                        // cursor.key not yet at set[i]. Forward cursor to the next key to hunt for.
                        advance(function () {
                            if (sortDirection === ascending) cursor.continue(set[i][0]);else cursor.continue(set[i][1]);
                        });
                        return false;
                    }
                });
                return c;
            },
            startsWithAnyOf: function () {
                var set = getArrayOf.apply(NO_CHAR_ARRAY, arguments);

                if (!set.every(function (s) {
                    return typeof s === 'string';
                })) {
                    return fail(this, "startsWithAnyOf() only works with strings");
                }
                if (set.length === 0) return emptyCollection(this);

                return this.inAnyRange(set.map(function (str) {
                    return [str, str + maxString];
                }));
            }
        };
    });

    //
    //
    //
    // Collection Class
    //
    //
    //
    function Collection(whereClause, keyRangeGenerator) {
        /// <summary>
        ///
        /// </summary>
        /// <param name="whereClause" type="WhereClause">Where clause instance</param>
        /// <param name="keyRangeGenerator" value="function(){ return IDBKeyRange.bound(0,1);}" optional="true"></param>
        var keyRange = null,
            error = null;
        if (keyRangeGenerator) try {
            keyRange = keyRangeGenerator();
        } catch (ex) {
            error = ex;
        }

        var whereCtx = whereClause._ctx,
            table = whereCtx.table;
        this._ctx = {
            table: table,
            index: whereCtx.index,
            isPrimKey: !whereCtx.index || table.schema.primKey.keyPath && whereCtx.index === table.schema.primKey.name,
            range: keyRange,
            keysOnly: false,
            dir: "next",
            unique: "",
            algorithm: null,
            filter: null,
            replayFilter: null,
            justLimit: true, // True if a replayFilter is just a filter that performs a "limit" operation (or none at all)
            isMatch: null,
            offset: 0,
            limit: Infinity,
            error: error, // If set, any promise must be rejected with this error
            or: whereCtx.or,
            valueMapper: table.hook.reading.fire
        };
    }

    function isPlainKeyRange(ctx, ignoreLimitFilter) {
        return !(ctx.filter || ctx.algorithm || ctx.or) && (ignoreLimitFilter ? ctx.justLimit : !ctx.replayFilter);
    }

    props(Collection.prototype, function () {

        //
        // Collection Private Functions
        //

        function addFilter(ctx, fn) {
            ctx.filter = combine(ctx.filter, fn);
        }

        function addReplayFilter(ctx, factory, isLimitFilter) {
            var curr = ctx.replayFilter;
            ctx.replayFilter = curr ? function () {
                return combine(curr(), factory());
            } : factory;
            ctx.justLimit = isLimitFilter && !curr;
        }

        function addMatchFilter(ctx, fn) {
            ctx.isMatch = combine(ctx.isMatch, fn);
        }

        /** @param ctx {
         *      isPrimKey: boolean,
         *      table: Table,
         *      index: string
         * }
         * @param store IDBObjectStore
         **/
        function getIndexOrStore(ctx, store) {
            if (ctx.isPrimKey) return store;
            var indexSpec = ctx.table.schema.idxByName[ctx.index];
            if (!indexSpec) throw new exceptions.Schema("KeyPath " + ctx.index + " on object store " + store.name + " is not indexed");
            return store.index(indexSpec.name);
        }

        /** @param ctx {
         *      isPrimKey: boolean,
         *      table: Table,
         *      index: string,
         *      keysOnly: boolean,
         *      range?: IDBKeyRange,
         *      dir: "next" | "prev"
         * }
         */
        function openCursor(ctx, store) {
            var idxOrStore = getIndexOrStore(ctx, store);
            return ctx.keysOnly && 'openKeyCursor' in idxOrStore ? idxOrStore.openKeyCursor(ctx.range || null, ctx.dir + ctx.unique) : idxOrStore.openCursor(ctx.range || null, ctx.dir + ctx.unique);
        }

        function iter(ctx, fn, resolve, reject, idbstore) {
            var filter = ctx.replayFilter ? combine(ctx.filter, ctx.replayFilter()) : ctx.filter;
            if (!ctx.or) {
                iterate(openCursor(ctx, idbstore), combine(ctx.algorithm, filter), fn, resolve, reject, !ctx.keysOnly && ctx.valueMapper);
            } else (function () {
                var set = {};
                var resolved = 0;

                function resolveboth() {
                    if (++resolved === 2) resolve(); // Seems like we just support or btwn max 2 expressions, but there are no limit because we do recursion.
                }

                function union(item, cursor, advance) {
                    if (!filter || filter(cursor, advance, resolveboth, reject)) {
                        var key = cursor.primaryKey.toString(); // Converts any Date to String, String to String, Number to String and Array to comma-separated string
                        if (!hasOwn(set, key)) {
                            set[key] = true;
                            fn(item, cursor, advance);
                        }
                    }
                }

                ctx.or._iterate(union, resolveboth, reject, idbstore);
                iterate(openCursor(ctx, idbstore), ctx.algorithm, union, resolveboth, reject, !ctx.keysOnly && ctx.valueMapper);
            })();
        }
        function getInstanceTemplate(ctx) {
            return ctx.table.schema.instanceTemplate;
        }

        return {

            //
            // Collection Protected Functions
            //

            _read: function (fn, cb) {
                var ctx = this._ctx;
                if (ctx.error) return ctx.table._trans(null, function rejector(resolve, reject) {
                    reject(ctx.error);
                });else return ctx.table._idbstore(READONLY, fn).then(cb);
            },
            _write: function (fn) {
                var ctx = this._ctx;
                if (ctx.error) return ctx.table._trans(null, function rejector(resolve, reject) {
                    reject(ctx.error);
                });else return ctx.table._idbstore(READWRITE, fn, "locked"); // When doing write operations on collections, always lock the operation so that upcoming operations gets queued.
            },
            _addAlgorithm: function (fn) {
                var ctx = this._ctx;
                ctx.algorithm = combine(ctx.algorithm, fn);
            },

            _iterate: function (fn, resolve, reject, idbstore) {
                return iter(this._ctx, fn, resolve, reject, idbstore);
            },

            clone: function (props$$1) {
                var rv = Object.create(this.constructor.prototype),
                    ctx = Object.create(this._ctx);
                if (props$$1) extend(ctx, props$$1);
                rv._ctx = ctx;
                return rv;
            },

            raw: function () {
                this._ctx.valueMapper = null;
                return this;
            },

            //
            // Collection Public methods
            //

            each: function (fn) {
                var ctx = this._ctx;

                if (fake) {
                    var item = getInstanceTemplate(ctx),
                        primKeyPath = ctx.table.schema.primKey.keyPath,
                        key = getByKeyPath(item, ctx.index ? ctx.table.schema.idxByName[ctx.index].keyPath : primKeyPath),
                        primaryKey = getByKeyPath(item, primKeyPath);
                    fn(item, { key: key, primaryKey: primaryKey });
                }

                return this._read(function (resolve, reject, idbstore) {
                    iter(ctx, fn, resolve, reject, idbstore);
                });
            },

            count: function (cb) {
                if (fake) return Promise.resolve(0).then(cb);
                var ctx = this._ctx;

                if (isPlainKeyRange(ctx, true)) {
                    // This is a plain key range. We can use the count() method if the index.
                    return this._read(function (resolve, reject, idbstore) {
                        var idx = getIndexOrStore(ctx, idbstore);
                        var req = ctx.range ? idx.count(ctx.range) : idx.count();
                        req.onerror = eventRejectHandler(reject);
                        req.onsuccess = function (e) {
                            resolve(Math.min(e.target.result, ctx.limit));
                        };
                    }, cb);
                } else {
                    // Algorithms, filters or expressions are applied. Need to count manually.
                    var count = 0;
                    return this._read(function (resolve, reject, idbstore) {
                        iter(ctx, function () {
                            ++count;return false;
                        }, function () {
                            resolve(count);
                        }, reject, idbstore);
                    }, cb);
                }
            },

            sortBy: function (keyPath, cb) {
                /// <param name="keyPath" type="String"></param>
                var parts = keyPath.split('.').reverse(),
                    lastPart = parts[0],
                    lastIndex = parts.length - 1;
                function getval(obj, i) {
                    if (i) return getval(obj[parts[i]], i - 1);
                    return obj[lastPart];
                }
                var order = this._ctx.dir === "next" ? 1 : -1;

                function sorter(a, b) {
                    var aVal = getval(a, lastIndex),
                        bVal = getval(b, lastIndex);
                    return aVal < bVal ? -order : aVal > bVal ? order : 0;
                }
                return this.toArray(function (a) {
                    return a.sort(sorter);
                }).then(cb);
            },

            toArray: function (cb) {
                var ctx = this._ctx;
                return this._read(function (resolve, reject, idbstore) {
                    fake && resolve([getInstanceTemplate(ctx)]);
                    if (hasGetAll && ctx.dir === 'next' && isPlainKeyRange(ctx, true) && ctx.limit > 0) {
                        // Special optimation if we could use IDBObjectStore.getAll() or
                        // IDBKeyRange.getAll():
                        var readingHook = ctx.table.hook.reading.fire;
                        var idxOrStore = getIndexOrStore(ctx, idbstore);
                        var req = ctx.limit < Infinity ? idxOrStore.getAll(ctx.range, ctx.limit) : idxOrStore.getAll(ctx.range);
                        req.onerror = eventRejectHandler(reject);
                        req.onsuccess = readingHook === mirror ? eventSuccessHandler(resolve) : wrap(eventSuccessHandler(function (res) {
                            try {
                                resolve(res.map(readingHook));
                            } catch (e) {
                                reject(e);
                            }
                        }));
                    } else {
                        // Getting array through a cursor.
                        var a = [];
                        iter(ctx, function (item) {
                            a.push(item);
                        }, function arrayComplete() {
                            resolve(a);
                        }, reject, idbstore);
                    }
                }, cb);
            },

            offset: function (offset) {
                var ctx = this._ctx;
                if (offset <= 0) return this;
                ctx.offset += offset; // For count()
                if (isPlainKeyRange(ctx)) {
                    addReplayFilter(ctx, function () {
                        var offsetLeft = offset;
                        return function (cursor, advance) {
                            if (offsetLeft === 0) return true;
                            if (offsetLeft === 1) {
                                --offsetLeft;return false;
                            }
                            advance(function () {
                                cursor.advance(offsetLeft);
                                offsetLeft = 0;
                            });
                            return false;
                        };
                    });
                } else {
                    addReplayFilter(ctx, function () {
                        var offsetLeft = offset;
                        return function () {
                            return --offsetLeft < 0;
                        };
                    });
                }
                return this;
            },

            limit: function (numRows) {
                this._ctx.limit = Math.min(this._ctx.limit, numRows); // For count()
                addReplayFilter(this._ctx, function () {
                    var rowsLeft = numRows;
                    return function (cursor, advance, resolve) {
                        if (--rowsLeft <= 0) advance(resolve); // Stop after this item has been included
                        return rowsLeft >= 0; // If numRows is already below 0, return false because then 0 was passed to numRows initially. Otherwise we wouldnt come here.
                    };
                }, true);
                return this;
            },

            until: function (filterFunction, bIncludeStopEntry) {
                var ctx = this._ctx;
                fake && filterFunction(getInstanceTemplate(ctx));
                addFilter(this._ctx, function (cursor, advance, resolve) {
                    if (filterFunction(cursor.value)) {
                        advance(resolve);
                        return bIncludeStopEntry;
                    } else {
                        return true;
                    }
                });
                return this;
            },

            first: function (cb) {
                return this.limit(1).toArray(function (a) {
                    return a[0];
                }).then(cb);
            },

            last: function (cb) {
                return this.reverse().first(cb);
            },

            filter: function (filterFunction) {
                /// <param name="jsFunctionFilter" type="Function">function(val){return true/false}</param>
                fake && filterFunction(getInstanceTemplate(this._ctx));
                addFilter(this._ctx, function (cursor) {
                    return filterFunction(cursor.value);
                });
                // match filters not used in Dexie.js but can be used by 3rd part libraries to test a
                // collection for a match without querying DB. Used by Dexie.Observable.
                addMatchFilter(this._ctx, filterFunction);
                return this;
            },

            and: function (filterFunction) {
                return this.filter(filterFunction);
            },

            or: function (indexName) {
                return new WhereClause(this._ctx.table, indexName, this);
            },

            reverse: function () {
                this._ctx.dir = this._ctx.dir === "prev" ? "next" : "prev";
                if (this._ondirectionchange) this._ondirectionchange(this._ctx.dir);
                return this;
            },

            desc: function () {
                return this.reverse();
            },

            eachKey: function (cb) {
                var ctx = this._ctx;
                ctx.keysOnly = !ctx.isMatch;
                return this.each(function (val, cursor) {
                    cb(cursor.key, cursor);
                });
            },

            eachUniqueKey: function (cb) {
                this._ctx.unique = "unique";
                return this.eachKey(cb);
            },

            eachPrimaryKey: function (cb) {
                var ctx = this._ctx;
                ctx.keysOnly = !ctx.isMatch;
                return this.each(function (val, cursor) {
                    cb(cursor.primaryKey, cursor);
                });
            },

            keys: function (cb) {
                var ctx = this._ctx;
                ctx.keysOnly = !ctx.isMatch;
                var a = [];
                return this.each(function (item, cursor) {
                    a.push(cursor.key);
                }).then(function () {
                    return a;
                }).then(cb);
            },

            primaryKeys: function (cb) {
                var ctx = this._ctx;
                if (hasGetAll && ctx.dir === 'next' && isPlainKeyRange(ctx, true) && ctx.limit > 0) {
                    // Special optimation if we could use IDBObjectStore.getAllKeys() or
                    // IDBKeyRange.getAllKeys():
                    return this._read(function (resolve, reject, idbstore) {
                        var idxOrStore = getIndexOrStore(ctx, idbstore);
                        var req = ctx.limit < Infinity ? idxOrStore.getAllKeys(ctx.range, ctx.limit) : idxOrStore.getAllKeys(ctx.range);
                        req.onerror = eventRejectHandler(reject);
                        req.onsuccess = eventSuccessHandler(resolve);
                    }).then(cb);
                }
                ctx.keysOnly = !ctx.isMatch;
                var a = [];
                return this.each(function (item, cursor) {
                    a.push(cursor.primaryKey);
                }).then(function () {
                    return a;
                }).then(cb);
            },

            uniqueKeys: function (cb) {
                this._ctx.unique = "unique";
                return this.keys(cb);
            },

            firstKey: function (cb) {
                return this.limit(1).keys(function (a) {
                    return a[0];
                }).then(cb);
            },

            lastKey: function (cb) {
                return this.reverse().firstKey(cb);
            },

            distinct: function () {
                var ctx = this._ctx,
                    idx = ctx.index && ctx.table.schema.idxByName[ctx.index];
                if (!idx || !idx.multi) return this; // distinct() only makes differencies on multiEntry indexes.
                var set = {};
                addFilter(this._ctx, function (cursor) {
                    var strKey = cursor.primaryKey.toString(); // Converts any Date to String, String to String, Number to String and Array to comma-separated string
                    var found = hasOwn(set, strKey);
                    set[strKey] = true;
                    return !found;
                });
                return this;
            }
        };
    });

    //
    //
    // WriteableCollection Class
    //
    //
    function WriteableCollection() {
        Collection.apply(this, arguments);
    }

    derive(WriteableCollection).from(Collection).extend({

        //
        // WriteableCollection Public Methods
        //

        modify: function (changes) {
            var self = this,
                ctx = this._ctx,
                hook = ctx.table.hook,
                updatingHook = hook.updating.fire,
                deletingHook = hook.deleting.fire;

            fake && typeof changes === 'function' && changes.call({ value: ctx.table.schema.instanceTemplate }, ctx.table.schema.instanceTemplate);

            return this._write(function (resolve, reject, idbstore, trans) {
                var modifyer;
                if (typeof changes === 'function') {
                    // Changes is a function that may update, add or delete propterties or even require a deletion the object itself (delete this.item)
                    if (updatingHook === nop && deletingHook === nop) {
                        // Noone cares about what is being changed. Just let the modifier function be the given argument as is.
                        modifyer = changes;
                    } else {
                        // People want to know exactly what is being modified or deleted.
                        // Let modifyer be a proxy function that finds out what changes the caller is actually doing
                        // and call the hooks accordingly!
                        modifyer = function (item) {
                            var origItem = deepClone(item); // Clone the item first so we can compare laters.
                            if (changes.call(this, item, this) === false) return false; // Call the real modifyer function (If it returns false explicitely, it means it dont want to modify anyting on this object)
                            if (!hasOwn(this, "value")) {
                                // The real modifyer function requests a deletion of the object. Inform the deletingHook that a deletion is taking place.
                                deletingHook.call(this, this.primKey, item, trans);
                            } else {
                                // No deletion. Check what was changed
                                var objectDiff = getObjectDiff(origItem, this.value);
                                var additionalChanges = updatingHook.call(this, objectDiff, this.primKey, origItem, trans);
                                if (additionalChanges) {
                                    // Hook want to apply additional modifications. Make sure to fullfill the will of the hook.
                                    item = this.value;
                                    keys(additionalChanges).forEach(function (keyPath) {
                                        setByKeyPath(item, keyPath, additionalChanges[keyPath]); // Adding {keyPath: undefined} means that the keyPath should be deleted. Handled by setByKeyPath
                                    });
                                }
                            }
                        };
                    }
                } else if (updatingHook === nop) {
                    // changes is a set of {keyPath: value} and no one is listening to the updating hook.
                    var keyPaths = keys(changes);
                    var numKeys = keyPaths.length;
                    modifyer = function (item) {
                        var anythingModified = false;
                        for (var i = 0; i < numKeys; ++i) {
                            var keyPath = keyPaths[i],
                                val = changes[keyPath];
                            if (getByKeyPath(item, keyPath) !== val) {
                                setByKeyPath(item, keyPath, val); // Adding {keyPath: undefined} means that the keyPath should be deleted. Handled by setByKeyPath
                                anythingModified = true;
                            }
                        }
                        return anythingModified;
                    };
                } else {
                    // changes is a set of {keyPath: value} and people are listening to the updating hook so we need to call it and
                    // allow it to add additional modifications to make.
                    var origChanges = changes;
                    changes = shallowClone(origChanges); // Let's work with a clone of the changes keyPath/value set so that we can restore it in case a hook extends it.
                    modifyer = function (item) {
                        var anythingModified = false;
                        var additionalChanges = updatingHook.call(this, changes, this.primKey, deepClone(item), trans);
                        if (additionalChanges) extend(changes, additionalChanges);
                        keys(changes).forEach(function (keyPath) {
                            var val = changes[keyPath];
                            if (getByKeyPath(item, keyPath) !== val) {
                                setByKeyPath(item, keyPath, val);
                                anythingModified = true;
                            }
                        });
                        if (additionalChanges) changes = shallowClone(origChanges); // Restore original changes for next iteration
                        return anythingModified;
                    };
                }

                var count = 0;
                var successCount = 0;
                var iterationComplete = false;
                var failures = [];
                var failKeys = [];
                var currentKey = null;

                function modifyItem(item, cursor) {
                    currentKey = cursor.primaryKey;
                    var thisContext = {
                        primKey: cursor.primaryKey,
                        value: item,
                        onsuccess: null,
                        onerror: null
                    };

                    function onerror(e) {
                        failures.push(e);
                        failKeys.push(thisContext.primKey);
                        checkFinished();
                        return true; // Catch these errors and let a final rejection decide whether or not to abort entire transaction
                    }

                    if (modifyer.call(thisContext, item, thisContext) !== false) {
                        // If a callback explicitely returns false, do not perform the update!
                        var bDelete = !hasOwn(thisContext, "value");
                        ++count;
                        tryCatch(function () {
                            var req = bDelete ? cursor.delete() : cursor.update(thisContext.value);
                            req._hookCtx = thisContext;
                            req.onerror = hookedEventRejectHandler(onerror);
                            req.onsuccess = hookedEventSuccessHandler(function () {
                                ++successCount;
                                checkFinished();
                            });
                        }, onerror);
                    } else if (thisContext.onsuccess) {
                        // Hook will expect either onerror or onsuccess to always be called!
                        thisContext.onsuccess(thisContext.value);
                    }
                }

                function doReject(e) {
                    if (e) {
                        failures.push(e);
                        failKeys.push(currentKey);
                    }
                    return reject(new ModifyError("Error modifying one or more objects", failures, successCount, failKeys));
                }

                function checkFinished() {
                    if (iterationComplete && successCount + failures.length === count) {
                        if (failures.length > 0) doReject();else resolve(successCount);
                    }
                }
                self.clone().raw()._iterate(modifyItem, function () {
                    iterationComplete = true;
                    checkFinished();
                }, doReject, idbstore);
            });
        },

        'delete': function () {
            var _this4 = this;

            var ctx = this._ctx,
                range = ctx.range,
                deletingHook = ctx.table.hook.deleting.fire,
                hasDeleteHook = deletingHook !== nop;
            if (!hasDeleteHook && isPlainKeyRange(ctx) && (ctx.isPrimKey && !hangsOnDeleteLargeKeyRange || !range)) // if no range, we'll use clear().
                {
                    // May use IDBObjectStore.delete(IDBKeyRange) in this case (Issue #208)
                    // For chromium, this is the way most optimized version.
                    // For IE/Edge, this could hang the indexedDB engine and make operating system instable
                    // (https://gist.github.com/dfahlander/5a39328f029de18222cf2125d56c38f7)
                    return this._write(function (resolve, reject, idbstore) {
                        // Our API contract is to return a count of deleted items, so we have to count() before delete().
                        var onerror = eventRejectHandler(reject),
                            countReq = range ? idbstore.count(range) : idbstore.count();
                        countReq.onerror = onerror;
                        countReq.onsuccess = function () {
                            var count = countReq.result;
                            tryCatch(function () {
                                var delReq = range ? idbstore.delete(range) : idbstore.clear();
                                delReq.onerror = onerror;
                                delReq.onsuccess = function () {
                                    return resolve(count);
                                };
                            }, function (err) {
                                return reject(err);
                            });
                        };
                    });
                }

            // Default version to use when collection is not a vanilla IDBKeyRange on the primary key.
            // Divide into chunks to not starve RAM.
            // If has delete hook, we will have to collect not just keys but also objects, so it will use
            // more memory and need lower chunk size.
            var CHUNKSIZE = hasDeleteHook ? 2000 : 10000;

            return this._write(function (resolve, reject, idbstore, trans) {
                var totalCount = 0;
                // Clone collection and change its table and set a limit of CHUNKSIZE on the cloned Collection instance.
                var collection = _this4.clone({
                    keysOnly: !ctx.isMatch && !hasDeleteHook }) // load just keys (unless filter() or and() or deleteHook has subscribers)
                .distinct() // In case multiEntry is used, never delete same key twice because resulting count
                // would become larger than actual delete count.
                .limit(CHUNKSIZE).raw(); // Don't filter through reading-hooks (like mapped classes etc)

                var keysOrTuples = [];

                // We're gonna do things on as many chunks that are needed.
                // Use recursion of nextChunk function:
                var nextChunk = function () {
                    return collection.each(hasDeleteHook ? function (val, cursor) {
                        // Somebody subscribes to hook('deleting'). Collect all primary keys and their values,
                        // so that the hook can be called with its values in bulkDelete().
                        keysOrTuples.push([cursor.primaryKey, cursor.value]);
                    } : function (val, cursor) {
                        // No one subscribes to hook('deleting'). Collect only primary keys:
                        keysOrTuples.push(cursor.primaryKey);
                    }).then(function () {
                        // Chromium deletes faster when doing it in sort order.
                        hasDeleteHook ? keysOrTuples.sort(function (a, b) {
                            return ascending(a[0], b[0]);
                        }) : keysOrTuples.sort(ascending);
                        return bulkDelete(idbstore, trans, keysOrTuples, hasDeleteHook, deletingHook);
                    }).then(function () {
                        var count = keysOrTuples.length;
                        totalCount += count;
                        keysOrTuples = [];
                        return count < CHUNKSIZE ? totalCount : nextChunk();
                    });
                };

                resolve(nextChunk());
            });
        }
    });

    //
    //
    //
    // ------------------------- Help functions ---------------------------
    //
    //
    //

    function lowerVersionFirst(a, b) {
        return a._cfg.version - b._cfg.version;
    }

    function setApiOnPlace(objs, tableNames, mode, dbschema) {
        tableNames.forEach(function (tableName) {
            var tableInstance = db._tableFactory(mode, dbschema[tableName]);
            objs.forEach(function (obj) {
                tableName in obj || (obj[tableName] = tableInstance);
            });
        });
    }

    function removeTablesApi(objs) {
        objs.forEach(function (obj) {
            for (var key in obj) {
                if (obj[key] instanceof Table) delete obj[key];
            }
        });
    }

    function iterate(req, filter, fn, resolve, reject, valueMapper) {

        // Apply valueMapper (hook('reading') or mappped class)
        var mappedFn = valueMapper ? function (x, c, a) {
            return fn(valueMapper(x), c, a);
        } : fn;
        // Wrap fn with PSD and microtick stuff from Promise.
        var wrappedFn = wrap(mappedFn, reject);

        if (!req.onerror) req.onerror = eventRejectHandler(reject);
        if (filter) {
            req.onsuccess = trycatcher(function filter_record() {
                var cursor = req.result;
                if (cursor) {
                    var c = function () {
                        cursor.continue();
                    };
                    if (filter(cursor, function (advancer) {
                        c = advancer;
                    }, resolve, reject)) wrappedFn(cursor.value, cursor, function (advancer) {
                        c = advancer;
                    });
                    c();
                } else {
                    resolve();
                }
            }, reject);
        } else {
            req.onsuccess = trycatcher(function filter_record() {
                var cursor = req.result;
                if (cursor) {
                    var c = function () {
                        cursor.continue();
                    };
                    wrappedFn(cursor.value, cursor, function (advancer) {
                        c = advancer;
                    });
                    c();
                } else {
                    resolve();
                }
            }, reject);
        }
    }

    function parseIndexSyntax(indexes) {
        /// <param name="indexes" type="String"></param>
        /// <returns type="Array" elementType="IndexSpec"></returns>
        var rv = [];
        indexes.split(',').forEach(function (index) {
            index = index.trim();
            var name = index.replace(/([&*]|\+\+)/g, ""); // Remove "&", "++" and "*"
            // Let keyPath of "[a+b]" be ["a","b"]:
            var keyPath = /^\[/.test(name) ? name.match(/^\[(.*)\]$/)[1].split('+') : name;

            rv.push(new IndexSpec(name, keyPath || null, /\&/.test(index), /\*/.test(index), /\+\+/.test(index), isArray(keyPath), /\./.test(index)));
        });
        return rv;
    }

    function cmp(key1, key2) {
        return indexedDB.cmp(key1, key2);
    }

    function min(a, b) {
        return cmp(a, b) < 0 ? a : b;
    }

    function max(a, b) {
        return cmp(a, b) > 0 ? a : b;
    }

    function ascending(a, b) {
        return indexedDB.cmp(a, b);
    }

    function descending(a, b) {
        return indexedDB.cmp(b, a);
    }

    function simpleCompare(a, b) {
        return a < b ? -1 : a === b ? 0 : 1;
    }

    function simpleCompareReverse(a, b) {
        return a > b ? -1 : a === b ? 0 : 1;
    }

    function combine(filter1, filter2) {
        return filter1 ? filter2 ? function () {
            return filter1.apply(this, arguments) && filter2.apply(this, arguments);
        } : filter1 : filter2;
    }

    function readGlobalSchema() {
        db.verno = idbdb.version / 10;
        db._dbSchema = globalSchema = {};
        dbStoreNames = slice(idbdb.objectStoreNames, 0);
        if (dbStoreNames.length === 0) return; // Database contains no stores.
        var trans = idbdb.transaction(safariMultiStoreFix(dbStoreNames), 'readonly');
        dbStoreNames.forEach(function (storeName) {
            var store = trans.objectStore(storeName),
                keyPath = store.keyPath,
                dotted = keyPath && typeof keyPath === 'string' && keyPath.indexOf('.') !== -1;
            var primKey = new IndexSpec(keyPath, keyPath || "", false, false, !!store.autoIncrement, keyPath && typeof keyPath !== 'string', dotted);
            var indexes = [];
            for (var j = 0; j < store.indexNames.length; ++j) {
                var idbindex = store.index(store.indexNames[j]);
                keyPath = idbindex.keyPath;
                dotted = keyPath && typeof keyPath === 'string' && keyPath.indexOf('.') !== -1;
                var index = new IndexSpec(idbindex.name, keyPath, !!idbindex.unique, !!idbindex.multiEntry, false, keyPath && typeof keyPath !== 'string', dotted);
                indexes.push(index);
            }
            globalSchema[storeName] = new TableSchema(storeName, primKey, indexes, {});
        });
        setApiOnPlace([allTables, Transaction.prototype], keys(globalSchema), READWRITE, globalSchema);
    }

    function adjustToExistingIndexNames(schema, idbtrans) {
        /// <summary>
        /// Issue #30 Problem with existing db - adjust to existing index names when migrating from non-dexie db
        /// </summary>
        /// <param name="schema" type="Object">Map between name and TableSchema</param>
        /// <param name="idbtrans" type="IDBTransaction"></param>
        var storeNames = idbtrans.db.objectStoreNames;
        for (var i = 0; i < storeNames.length; ++i) {
            var storeName = storeNames[i];
            var store = idbtrans.objectStore(storeName);
            hasGetAll = 'getAll' in store;
            for (var j = 0; j < store.indexNames.length; ++j) {
                var indexName = store.indexNames[j];
                var keyPath = store.index(indexName).keyPath;
                var dexieName = typeof keyPath === 'string' ? keyPath : "[" + slice(keyPath).join('+') + "]";
                if (schema[storeName]) {
                    var indexSpec = schema[storeName].idxByName[dexieName];
                    if (indexSpec) indexSpec.name = indexName;
                }
            }
        }
    }

    function fireOnBlocked(ev) {
        db.on("blocked").fire(ev);
        // Workaround (not fully*) for missing "versionchange" event in IE,Edge and Safari:
        connections.filter(function (c) {
            return c.name === db.name && c !== db && !c._vcFired;
        }).map(function (c) {
            return c.on("versionchange").fire(ev);
        });
    }

    extend(this, {
        Collection: Collection,
        Table: Table,
        Transaction: Transaction,
        Version: Version,
        WhereClause: WhereClause,
        WriteableCollection: WriteableCollection,
        WriteableTable: WriteableTable
    });

    init();

    addons.forEach(function (fn) {
        fn(db);
    });
}

var fakeAutoComplete = function () {}; // Will never be changed. We just fake for the IDE that we change it (see doFakeAutoComplete())
var fake = false; // Will never be changed. We just fake for the IDE that we change it (see doFakeAutoComplete())

function parseType(type) {
    if (typeof type === 'function') {
        return new type();
    } else if (isArray(type)) {
        return [parseType(type[0])];
    } else if (type && typeof type === 'object') {
        var rv = {};
        applyStructure(rv, type);
        return rv;
    } else {
        return type;
    }
}

function applyStructure(obj, structure) {
    keys(structure).forEach(function (member) {
        var value = parseType(structure[member]);
        obj[member] = value;
    });
    return obj;
}

function eventSuccessHandler(done) {
    return function (ev) {
        done(ev.target.result);
    };
}

function hookedEventSuccessHandler(resolve) {
    // wrap() is needed when calling hooks because the rare scenario of:
    //  * hook does a db operation that fails immediately (IDB throws exception)
    //    For calling db operations on correct transaction, wrap makes sure to set PSD correctly.
    //    wrap() will also execute in a virtual tick.
    //  * If not wrapped in a virtual tick, direct exception will launch a new physical tick.
    //  * If this was the last event in the bulk, the promise will resolve after a physical tick
    //    and the transaction will have committed already.
    // If no hook, the virtual tick will be executed in the reject()/resolve of the final promise,
    // because it is always marked with _lib = true when created using Transaction._promise().
    return wrap(function (event) {
        var req = event.target,
            result = req.result,
            ctx = req._hookCtx,
            // Contains the hook error handler. Put here instead of closure to boost performance.
        hookSuccessHandler = ctx && ctx.onsuccess;
        hookSuccessHandler && hookSuccessHandler(result);
        resolve && resolve(result);
    }, resolve);
}

function eventRejectHandler(reject) {
    return function (event) {
        preventDefault(event);
        reject(event.target.error);
        return false;
    };
}

function hookedEventRejectHandler(reject) {
    return wrap(function (event) {
        // See comment on hookedEventSuccessHandler() why wrap() is needed only when supporting hooks.

        var req = event.target,
            err = req.error,
            ctx = req._hookCtx,
            // Contains the hook error handler. Put here instead of closure to boost performance.
        hookErrorHandler = ctx && ctx.onerror;
        hookErrorHandler && hookErrorHandler(err);
        preventDefault(event);
        reject(err);
        return false;
    });
}

function preventDefault(event) {
    if (event.stopPropagation) // IndexedDBShim doesnt support this on Safari 8 and below.
        event.stopPropagation();
    if (event.preventDefault) // IndexedDBShim doesnt support this on Safari 8 and below.
        event.preventDefault();
}

function globalDatabaseList(cb) {
    var val,
        localStorage = Dexie.dependencies.localStorage;
    if (!localStorage) return cb([]); // Envs without localStorage support
    try {
        val = JSON.parse(localStorage.getItem('Dexie.DatabaseNames') || "[]");
    } catch (e) {
        val = [];
    }
    if (cb(val)) {
        localStorage.setItem('Dexie.DatabaseNames', JSON.stringify(val));
    }
}

function awaitIterator(iterator) {
    var callNext = function (result) {
        return iterator.next(result);
    },
        doThrow = function (error) {
        return iterator.throw(error);
    },
        onSuccess = step(callNext),
        onError = step(doThrow);

    function step(getNext) {
        return function (val) {
            var next = getNext(val),
                value = next.value;

            return next.done ? value : !value || typeof value.then !== 'function' ? isArray(value) ? Promise.all(value).then(onSuccess, onError) : onSuccess(value) : value.then(onSuccess, onError);
        };
    }

    return step(callNext)();
}

//
// IndexSpec struct
//
function IndexSpec(name, keyPath, unique, multi, auto, compound, dotted) {
    /// <param name="name" type="String"></param>
    /// <param name="keyPath" type="String"></param>
    /// <param name="unique" type="Boolean"></param>
    /// <param name="multi" type="Boolean"></param>
    /// <param name="auto" type="Boolean"></param>
    /// <param name="compound" type="Boolean"></param>
    /// <param name="dotted" type="Boolean"></param>
    this.name = name;
    this.keyPath = keyPath;
    this.unique = unique;
    this.multi = multi;
    this.auto = auto;
    this.compound = compound;
    this.dotted = dotted;
    var keyPathSrc = typeof keyPath === 'string' ? keyPath : keyPath && '[' + [].join.call(keyPath, '+') + ']';
    this.src = (unique ? '&' : '') + (multi ? '*' : '') + (auto ? "++" : "") + keyPathSrc;
}

//
// TableSchema struct
//
function TableSchema(name, primKey, indexes, instanceTemplate) {
    /// <param name="name" type="String"></param>
    /// <param name="primKey" type="IndexSpec"></param>
    /// <param name="indexes" type="Array" elementType="IndexSpec"></param>
    /// <param name="instanceTemplate" type="Object"></param>
    this.name = name;
    this.primKey = primKey || new IndexSpec();
    this.indexes = indexes || [new IndexSpec()];
    this.instanceTemplate = instanceTemplate;
    this.mappedClass = null;
    this.idxByName = arrayToObject(indexes, function (index) {
        return [index.name, index];
    });
}

// Used in when defining dependencies later...
// (If IndexedDBShim is loaded, prefer it before standard indexedDB)
var idbshim = _global.idbModules && _global.idbModules.shimIndexedDB ? _global.idbModules : {};

function safariMultiStoreFix(storeNames) {
    return storeNames.length === 1 ? storeNames[0] : storeNames;
}

function getNativeGetDatabaseNamesFn(indexedDB) {
    var fn = indexedDB && (indexedDB.getDatabaseNames || indexedDB.webkitGetDatabaseNames);
    return fn && fn.bind(indexedDB);
}

// Export Error classes
props(Dexie, fullNameExceptions); // Dexie.XXXError = class XXXError {...};

//
// Static methods and properties
// 
props(Dexie, {

    //
    // Static delete() method.
    //
    delete: function (databaseName) {
        var db = new Dexie(databaseName),
            promise = db.delete();
        promise.onblocked = function (fn) {
            db.on("blocked", fn);
            return this;
        };
        return promise;
    },

    //
    // Static exists() method.
    //
    exists: function (name) {
        return new Dexie(name).open().then(function (db) {
            db.close();
            return true;
        }).catch(Dexie.NoSuchDatabaseError, function () {
            return false;
        });
    },

    //
    // Static method for retrieving a list of all existing databases at current host.
    //
    getDatabaseNames: function (cb) {
        return new Promise(function (resolve, reject) {
            var getDatabaseNames = getNativeGetDatabaseNamesFn(indexedDB);
            if (getDatabaseNames) {
                // In case getDatabaseNames() becomes standard, let's prepare to support it:
                var req = getDatabaseNames();
                req.onsuccess = function (event) {
                    resolve(slice(event.target.result, 0)); // Converst DOMStringList to Array<String>
                };
                req.onerror = eventRejectHandler(reject);
            } else {
                globalDatabaseList(function (val) {
                    resolve(val);
                    return false;
                });
            }
        }).then(cb);
    },

    defineClass: function (structure) {
        /// <summary>
        ///     Create a javascript constructor based on given template for which properties to expect in the class.
        ///     Any property that is a constructor function will act as a type. So {name: String} will be equal to {name: new String()}.
        /// </summary>
        /// <param name="structure">Helps IDE code completion by knowing the members that objects contain and not just the indexes. Also
        /// know what type each member has. Example: {name: String, emailAddresses: [String], properties: {shoeSize: Number}}</param>

        // Default constructor able to copy given properties into this object.
        function Class(properties) {
            /// <param name="properties" type="Object" optional="true">Properties to initialize object with.
            /// </param>
            properties ? extend(this, properties) : fake && applyStructure(this, structure);
        }
        return Class;
    },

    applyStructure: applyStructure,

    ignoreTransaction: function (scopeFunc) {
        // In case caller is within a transaction but needs to create a separate transaction.
        // Example of usage:
        //
        // Let's say we have a logger function in our app. Other application-logic should be unaware of the
        // logger function and not need to include the 'logentries' table in all transaction it performs.
        // The logging should always be done in a separate transaction and not be dependant on the current
        // running transaction context. Then you could use Dexie.ignoreTransaction() to run code that starts a new transaction.
        //
        //     Dexie.ignoreTransaction(function() {
        //         db.logentries.add(newLogEntry);
        //     });
        //
        // Unless using Dexie.ignoreTransaction(), the above example would try to reuse the current transaction
        // in current Promise-scope.
        //
        // An alternative to Dexie.ignoreTransaction() would be setImmediate() or setTimeout(). The reason we still provide an
        // API for this because
        //  1) The intention of writing the statement could be unclear if using setImmediate() or setTimeout().
        //  2) setTimeout() would wait unnescessary until firing. This is however not the case with setImmediate().
        //  3) setImmediate() is not supported in the ES standard.
        //  4) You might want to keep other PSD state that was set in a parent PSD, such as PSD.letThrough.
        return PSD.trans ? usePSD(PSD.transless, scopeFunc) : // Use the closest parent that was non-transactional.
        scopeFunc(); // No need to change scope because there is no ongoing transaction.
    },

    vip: function (fn) {
        // To be used by subscribers to the on('ready') event.
        // This will let caller through to access DB even when it is blocked while the db.ready() subscribers are firing.
        // This would have worked automatically if we were certain that the Provider was using Dexie.Promise for all asyncronic operations. The promise PSD
        // from the provider.connect() call would then be derived all the way to when provider would call localDatabase.applyChanges(). But since
        // the provider more likely is using non-promise async APIs or other thenable implementations, we cannot assume that.
        // Note that this method is only useful for on('ready') subscribers that is returning a Promise from the event. If not using vip()
        // the database could deadlock since it wont open until the returned Promise is resolved, and any non-VIPed operation started by
        // the caller will not resolve until database is opened.
        return newScope(function () {
            PSD.letThrough = true; // Make sure we are let through if still blocking db due to onready is firing.
            return fn();
        });
    },

    async: function (generatorFn) {
        return function () {
            try {
                var rv = awaitIterator(generatorFn.apply(this, arguments));
                if (!rv || typeof rv.then !== 'function') return Promise.resolve(rv);
                return rv;
            } catch (e) {
                return rejection(e);
            }
        };
    },

    spawn: function (generatorFn, args, thiz) {
        try {
            var rv = awaitIterator(generatorFn.apply(thiz, args || []));
            if (!rv || typeof rv.then !== 'function') return Promise.resolve(rv);
            return rv;
        } catch (e) {
            return rejection(e);
        }
    },

    // Dexie.currentTransaction property
    currentTransaction: {
        get: function () {
            return PSD.trans || null;
        }
    },

    // Export our Promise implementation since it can be handy as a standalone Promise implementation
    Promise: Promise,

    // Dexie.debug proptery:
    // Dexie.debug = false
    // Dexie.debug = true
    // Dexie.debug = "dexie" - don't hide dexie's stack frames.
    debug: {
        get: function () {
            return debug;
        },
        set: function (value) {
            setDebug(value, value === 'dexie' ? function () {
                return true;
            } : dexieStackFrameFilter);
        }
    },

    // Export our derive/extend/override methodology
    derive: derive,
    extend: extend,
    props: props,
    override: override,
    // Export our Events() function - can be handy as a toolkit
    Events: Events,
    events: { get: deprecated(function () {
            return Events;
        }) }, // Backward compatible lowercase version.
    // Utilities
    getByKeyPath: getByKeyPath,
    setByKeyPath: setByKeyPath,
    delByKeyPath: delByKeyPath,
    shallowClone: shallowClone,
    deepClone: deepClone,
    getObjectDiff: getObjectDiff,
    asap: asap,
    maxKey: maxKey,
    // Addon registry
    addons: [],
    // Global DB connection list
    connections: connections,

    MultiModifyError: exceptions.Modify, // Backward compatibility 0.9.8. Deprecate.
    errnames: errnames,

    // Export other static classes
    IndexSpec: IndexSpec,
    TableSchema: TableSchema,

    //
    // Dependencies
    //
    // These will automatically work in browsers with indexedDB support, or where an indexedDB polyfill has been included.
    //
    // In node.js, however, these properties must be set "manually" before instansiating a new Dexie().
    // For node.js, you need to require indexeddb-js or similar and then set these deps.
    //
    dependencies: {
        // Required:
        indexedDB: idbshim.shimIndexedDB || _global.indexedDB || _global.mozIndexedDB || _global.webkitIndexedDB || _global.msIndexedDB,
        IDBKeyRange: idbshim.IDBKeyRange || _global.IDBKeyRange || _global.webkitIDBKeyRange
    },

    // API Version Number: Type Number, make sure to always set a version number that can be comparable correctly. Example: 0.9, 0.91, 0.92, 1.0, 1.01, 1.1, 1.2, 1.21, etc.
    semVer: DEXIE_VERSION,
    version: DEXIE_VERSION.split('.').map(function (n) {
        return parseInt(n);
    }).reduce(function (p, c, i) {
        return p + c / Math.pow(10, i * 2);
    }),
    fakeAutoComplete: fakeAutoComplete,

    // https://github.com/dfahlander/Dexie.js/issues/186
    // typescript compiler tsc in mode ts-->es5 & commonJS, will expect require() to return
    // x.default. Workaround: Set Dexie.default = Dexie.
    default: Dexie
});

tryCatch(function () {
    // Optional dependencies
    // localStorage
    Dexie.dependencies.localStorage = (typeof chrome !== "undefined" && chrome !== null ? chrome.storage : void 0) != null ? null : _global.localStorage;
});

// Map DOMErrors and DOMExceptions to corresponding Dexie errors. May change in Dexie v2.0.
Promise.rejectionMapper = mapError;

// Fool IDE to improve autocomplete. Tested with Visual Studio 2013 and 2015.
doFakeAutoComplete(function () {
    Dexie.fakeAutoComplete = fakeAutoComplete = doFakeAutoComplete;
    Dexie.fake = fake = true;
});

return Dexie;

})));
//# sourceMappingURL=dexie.js.map

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(25), __webpack_require__(124).setImmediate))

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
 Copyright (c) 2013, Rodrigo González, Sapienlab All Rights Reserved.
 Available via MIT LICENSE. See https://github.com/roro89/jsonpack/blob/master/LICENSE.md for details.
 */
(function(define) {

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {

		var TOKEN_TRUE = -1;
		var TOKEN_FALSE = -2;
		var TOKEN_NULL = -3;
		var TOKEN_EMPTY_STRING = -4;
		var TOKEN_UNDEFINED = -5;

		var pack = function(json, options) {

			// Canonizes the options
			options = options || {};

			// A shorthand for debugging
			var verbose = options.verbose || false;

			verbose && console.log('Normalize the JSON Object');

			// JSON as Javascript Object (Not string representation)
			json = typeof json === 'string' ? this.JSON.parse(json) : json;

			verbose && console.log('Creating a empty dictionary');

			// The dictionary
			var dictionary = {
				strings : [],
				integers : [],
				floats : []
			};

			verbose && console.log('Creating the AST');

			// The AST
			var ast = (function recursiveAstBuilder(item) {

				verbose && console.log('Calling recursiveAstBuilder with ' + this.JSON.stringify(item));

				// The type of the item
				var type = typeof item;

				// Case 7: The item is null
				if (item === null) {
					return {
						type : 'null',
						index : TOKEN_NULL
					};
				}
				
				//add undefined 
				if (typeof item === 'undefined') {
					return {
						type : 'undefined',
						index : TOKEN_UNDEFINED
					};
				}

				// Case 1: The item is Array Object
				if ( item instanceof Array) {

					// Create a new sub-AST of type Array (@)
					var ast = ['@'];

					// Add each items
					for (var i in item) {
						
						if (!item.hasOwnProperty(i)) continue;

						ast.push(recursiveAstBuilder(item[i]));
					}

					// And return
					return ast;

				}

				// Case 2: The item is Object
				if (type === 'object') {

					// Create a new sub-AST of type Object ($)
					var ast = ['$'];

					// Add each items
					for (var key in item) {

						if (!item.hasOwnProperty(key))
							continue;

						ast.push(recursiveAstBuilder(key));
						ast.push(recursiveAstBuilder(item[key]));
					}

					// And return
					return ast;

				}

				// Case 3: The item empty string
				if (item === '') {
					return {
						type : 'empty',
						index : TOKEN_EMPTY_STRING
					};
				}

				// Case 4: The item is String
				if (type === 'string') {

					// The index of that word in the dictionary
					var index = _indexOf.call(dictionary.strings, item);

					// If not, add to the dictionary and actualize the index
					if (index == -1) {
						dictionary.strings.push(_encode(item));
						index = dictionary.strings.length - 1;
					}

					// Return the token
					return {
						type : 'strings',
						index : index
					};
				}

				// Case 5: The item is integer
				if (type === 'number' && item % 1 === 0) {

					// The index of that number in the dictionary
					var index = _indexOf.call(dictionary.integers, item);

					// If not, add to the dictionary and actualize the index
					if (index == -1) {
						dictionary.integers.push(_base10To36(item));
						index = dictionary.integers.length - 1;
					}

					// Return the token
					return {
						type : 'integers',
						index : index
					};
				}

				// Case 6: The item is float
				if (type === 'number') {
					// The index of that number in the dictionary
					var index = _indexOf.call(dictionary.floats, item);

					// If not, add to the dictionary and actualize the index
					if (index == -1) {
						// Float not use base 36
						dictionary.floats.push(item);
						index = dictionary.floats.length - 1;
					}

					// Return the token
					return {
						type : 'floats',
						index : index
					};
				}

				// Case 7: The item is boolean
				if (type === 'boolean') {
					return {
						type : 'boolean',
						index : item ? TOKEN_TRUE : TOKEN_FALSE
					};
				}

				// Default
				throw new Error('Unexpected argument of type ' + typeof (item));

			})(json);

			// A set of shorthands proxies for the length of the dictionaries
			var stringLength = dictionary.strings.length;
			var integerLength = dictionary.integers.length;
			var floatLength = dictionary.floats.length;

			verbose && console.log('Parsing the dictionary');

			// Create a raw dictionary
			var packed = dictionary.strings.join('|');
			packed += '^' + dictionary.integers.join('|');
			packed += '^' + dictionary.floats.join('|');

			verbose && console.log('Parsing the structure');

			// And add the structure
			packed += '^' + (function recursiveParser(item) {

				verbose && console.log('Calling a recursiveParser with ' + this.JSON.stringify(item));

				// If the item is Array, then is a object of
				// type [object Object] or [object Array]
				if ( item instanceof Array) {

					// The packed resulting
					var packed = item.shift();

					for (var i in item) {
						
						if (!item.hasOwnProperty(i)) 
							continue;
						
						packed += recursiveParser(item[i]) + '|';
					}

					return (packed[packed.length - 1] === '|' ? packed.slice(0, -1) : packed) + ']';

				}

				// A shorthand proxies
				var type = item.type, index = item.index;

				if (type === 'strings') {
					// Just return the base 36 of index
					return _base10To36(index);
				}

				if (type === 'integers') {
					// Return a base 36 of index plus stringLength offset
					return _base10To36(stringLength + index);
				}

				if (type === 'floats') {
					// Return a base 36 of index plus stringLength and integerLength offset
					return _base10To36(stringLength + integerLength + index);
				}

				if (type === 'boolean') {
					return item.index;
				}

				if (type === 'null') {
					return TOKEN_NULL;
				}

				if (type === 'undefined') {
					return TOKEN_UNDEFINED;
				}

				if (type === 'empty') {
					return TOKEN_EMPTY_STRING;
				}

				throw new TypeError('The item is alien!');

			})(ast);

			verbose && console.log('Ending parser');

			// If debug, return a internal representation of dictionary and stuff
			if (options.debug)
				return {
					dictionary : dictionary,
					ast : ast,
					packed : packed
				};

			return packed;

		};

		var unpack = function(packed, options) {

			// Canonizes the options
			options = options || {};

			// A raw buffer
			var rawBuffers = packed.split('^');

			// Create a dictionary
			options.verbose && console.log('Building dictionary');
			var dictionary = [];

			// Add the strings values
			var buffer = rawBuffers[0];
			if (buffer !== '') {
				buffer = buffer.split('|');
				options.verbose && console.log('Parse the strings dictionary');
				for (var i=0, n=buffer.length; i<n; i++){
					dictionary.push(_decode(buffer[i]));
				}
			}

			// Add the integers values
			buffer = rawBuffers[1];
			if (buffer !== '') {
				buffer = buffer.split('|');
				options.verbose && console.log('Parse the integers dictionary');
				for (var i=0, n=buffer.length; i<n; i++){
					dictionary.push(_base36To10(buffer[i]));
				}
			}

			// Add the floats values
			buffer = rawBuffers[2];
			if (buffer !== '') {
				buffer = buffer.split('|')
				options.verbose && console.log('Parse the floats dictionary');
				for (var i=0, n=buffer.length; i<n; i++){
					dictionary.push(parseFloat(buffer[i]));
				}
			}
			// Free memory
			buffer = null;

			options.verbose && console.log('Tokenizing the structure');

			// Tokenizer the structure
			var number36 = '';
			var tokens = [];
			var len=rawBuffers[3].length;
			for (var i = 0; i < len; i++) {
				var symbol = rawBuffers[3].charAt(i);
				if (symbol === '|' || symbol === '$' || symbol === '@' || symbol === ']') {
					if (number36) {
						tokens.push(_base36To10(number36));
						number36 = '';
					}
					symbol !== '|' && tokens.push(symbol);
				} else {
					number36 += symbol;
				}
			}

			// A shorthand proxy for tokens.length
			var tokensLength = tokens.length;

			// The index of the next token to read
			var tokensIndex = 0;

			options.verbose && console.log('Starting recursive parser');

			return (function recursiveUnpackerParser() {

				// Maybe '$' (object) or '@' (array)
				var type = tokens[tokensIndex++];

				options.verbose && console.log('Reading collection type ' + (type === '$' ? 'object' : 'Array'));

				// Parse an array
				if (type === '@') {

					var node = [];

					for (; tokensIndex < tokensLength; tokensIndex++) {
						var value = tokens[tokensIndex];
						options.verbose && console.log('Read ' + value + ' symbol');
						if (value === ']')
							return node;
						if (value === '@' || value === '$') {
							node.push(recursiveUnpackerParser());
						} else {
							switch(value) {
								case TOKEN_TRUE:
									node.push(true);
									break;
								case TOKEN_FALSE:
									node.push(false);
									break;
								case TOKEN_NULL:
									node.push(null);
									break;
								case TOKEN_UNDEFINED:
									node.push(undefined);
									break;
								case TOKEN_EMPTY_STRING:
									node.push('');
									break;
								default:
									node.push(dictionary[value]);
							}

						}
					}

					options.verbose && console.log('Parsed ' + this.JSON.stringify(node));

					return node;

				}

				// Parse a object
				if (type === '$') {
					var node = {};

					for (; tokensIndex < tokensLength; tokensIndex++) {

						var key = tokens[tokensIndex];

						if (key === ']')
							return node;

						if (key === TOKEN_EMPTY_STRING)
							key = '';
						else
							key = dictionary[key];

						var value = tokens[++tokensIndex];

						if (value === '@' || value === '$') {
							node[key] = recursiveUnpackerParser();
						} else {
							switch(value) {
								case TOKEN_TRUE:
									node[key] = true;
									break;
								case TOKEN_FALSE:
									node[key] = false;
									break;
								case TOKEN_NULL:
									node[key] = null;
									break;
								case TOKEN_UNDEFINED:
									node[key] = undefined;
									break;
								case TOKEN_EMPTY_STRING:
									node[key] = '';
									break;
								default:
									node[key] = dictionary[value];
							}

						}
					}

					options.verbose && console.log('Parsed ' + this.JSON.stringify(node));

					return node;
				}

				throw new TypeError('Bad token ' + type + ' isn\'t a type');

			})();

		}
		/**
		 * Get the index value of the dictionary
		 * @param {Object} dictionary a object that have two array attributes: 'string' and 'number'
		 * @param {Object} data
		 */
		var _indexOfDictionary = function(dictionary, value) {

			// The type of the value
			var type = typeof value;

			// If is boolean, return a boolean token
			if (type === 'boolean')
				return value ? TOKEN_TRUE : TOKEN_FALSE;

			// If is null, return a... yes! the null token
			if (value === null)
				return TOKEN_NULL;

			//add undefined
			if (typeof value === 'undefined')
				return TOKEN_UNDEFINED;


			if (value === '') {
				return TOKEN_EMPTY_STRING;
			}

			if (type === 'string') {
				value = _encode(value);
				var index = _indexOf.call(dictionary.strings, value);
				if (index === -1) {
					dictionary.strings.push(value);
					index = dictionary.strings.length - 1;
				}
			}

			// If has an invalid JSON type (example a function)
			if (type !== 'string' && type !== 'number') {
				throw new Error('The type is not a JSON type');
			};

			if (type === 'string') {// string
				value = _encode(value);
			} else if (value % 1 === 0) {// integer
				value = _base10To36(value);
			} else {// float

			}

			// If is number, "serialize" the value
			value = type === 'number' ? _base10To36(value) : _encode(value);

			// Retrieve the index of that value in the dictionary
			var index = _indexOf.call(dictionary[type], value);

			// If that value is not in the dictionary
			if (index === -1) {
				// Push the value
				dictionary[type].push(value);
				// And return their index
				index = dictionary[type].length - 1;
			}

			// If the type is a number, then add the '+'  prefix character
			// to differentiate that they is a number index. If not, then
			// just return a 36-based representation of the index
			return type === 'number' ? '+' + index : index;

		};

		var _encode = function(str) {
			if ( typeof str !== 'string')
				return str;

			return str.replace(/[\+ \|\^\%]/g, function(a) {
				return ({
				' ' : '+',
				'+' : '%2B',
				'|' : '%7C',
				'^' : '%5E',
				'%' : '%25'
				})[a]
			});
		};

		var _decode = function(str) {
			if ( typeof str !== 'string')
				return str;

			return str.replace(/\+|%2B|%7C|%5E|%25/g, function(a) {
				return ({
				'+' : ' ',
				'%2B' : '+',
				'%7C' : '|',
				'%5E' : '^',
				'%25' : '%'
				})[a]
			})
		};

		var _base10To36 = function(number) {
			return Number.prototype.toString.call(number, 36).toUpperCase();
		};

		var _base36To10 = function(number) {
			return parseInt(number, 36);
		};

		var _indexOf = Array.prototype.indexOf ||
		function(obj, start) {
			for (var i = (start || 0), j = this.length; i < j; i++) {
				if (this[i] === obj) {
					return i;
				}
			}
			return -1;
		};

		return {
			JSON : JSON,
			pack : pack,
			unpack : unpack
		};

	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

})( __webpack_require__(125));


/***/ }),
/* 120 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g =
  typeof global === "object" ? global :
  typeof window === "object" ? window :
  typeof self === "object" ? self : this;

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(122);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(25)))

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    if (typeof global.process === "object" && global.process.domain) {
      invoke = global.process.domain.bind(invoke);
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // Among the various tricks for obtaining a reference to the global
  // object, this seems to be the most reliable technique that does not
  // use indirect eval (which violates Content Security Policy).
  typeof global === "object" ? global :
  typeof window === "object" ? window :
  typeof self === "object" ? self : this
);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(25)))

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(25), __webpack_require__(120)))

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(123);
exports.setImmediate = setImmediate;
exports.clearImmediate = clearImmediate;


/***/ }),
/* 125 */
/***/ (function(module, exports) {

module.exports = function() {
	throw new Error("define cannot be used indirect");
};


/***/ })
/******/ ]);
});