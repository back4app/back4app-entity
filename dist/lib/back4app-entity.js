// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

/*!
 * chai
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Chai version
 */

/*!
 * Assertion Error
 */

/*!
 * Utils for plugins (not exported)
 */

/*!
 * Utility Functions
 */

/*!
 * Configuration
 */

/*!
 * Primary `Assertion` prototype
 */

/*!
 * Core Assertions
 */

/*!
 * Expect interface
 */

/*!
 * Should interface
 */

/*!
 * Assert interface
 */

/*!
 * chai
 * http://chaijs.com
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
   * Module dependencies.
   */

/*!
   * Module export.
   */

/*!
   * Assertion Constructor
   *
   * Creates object for chaining.
   *
   * @api private
   */

/*!
   * ### ._obj
   *
   * Quick reference to stored `actual` value for plugin developers.
   *
   * @api private
   */

/*!
   * Chai dependencies.
   */

/*!
   * ### .ifError(object)
   *
   * Asserts if value is not a false value, and throws if it is a true value.
   * This is added to allow for chai to be a drop-in replacement for Node's
   * assert class.
   *
   *     var err = new Error('I am a custom error');
   *     assert.ifError(err); // Rethrows err!
   *
   * @name ifError
   * @param {Object} object
   * @api public
   */

/*!
   * Aliases.
   */

/*!
 * Chai - addChainingMethod utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Module dependencies
 */

/*!
 * Module variables
 */

/*!
 * Chai - addMethod utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Chai - addProperty utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Chai - expectTypes utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Chai - flag utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Chai - getActual utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Chai - getEnumerableProperties utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Chai - message composition utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Module dependancies
 */

/*!
 * Chai - getName utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Chai - getPathInfo utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * ## parsePath(path)
 *
 * Helper function used to parse string object
 * paths. Use in conjunction with `_getPathValue`.
 *
 *      var parsed = parsePath('myobject.property.subprop');
 *
 * ### Paths:
 *
 * * Can be as near infinitely deep and nested
 * * Arrays are also valid using the formal `myobject.document[3].property`.
 * * Literal dots and brackets (not delimiter) must be backslash-escaped.
 *
 * @param {String} path
 * @returns {Object} parsed
 * @api private
 */

/*!
 * ## _getPathValue(parsed, obj)
 *
 * Helper companion function for `.parsePath` that returns
 * the value located at the parsed address.
 *
 *      var value = getPathValue(parsed, obj);
 *
 * @param {Object} parsed definition from `parsePath`.
 * @param {Object} object to search against
 * @param {Number} object to search against
 * @returns {Object|Undefined} value
 * @api private
 */

/*!
 * Chai - getPathValue utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * @see https://github.com/logicalparadox/filtr
 * MIT Licensed
 */

/*!
 * Chai - getProperties utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Chai - hasProperty utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * chai
 * Copyright(c) 2011 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Main exports
 */

/*!
 * test utility
 */

/*!
 * type utility
 */

/*!
 * expectTypes utility
 */

/*!
 * message utility
 */

/*!
 * actual utility
 */

/*!
 * Inspect util
 */

/*!
 * Object Display util
 */

/*!
 * Flag utility
 */

/*!
 * Flag transferring utility
 */

/*!
 * Deep equal utility
 */

/*!
 * Deep path value
 */

/*!
 * Deep path info
 */

/*!
 * Check if a property exists
 */

/*!
 * Function name
 */

/*!
 * add Property
 */

/*!
 * add Method
 */

/*!
 * overwrite Property
 */

/*!
 * overwrite Method
 */

/*!
 * Add a chainable method
 */

/*!
 * Overwrite chainable method
 */

/*!
 * Chai - overwriteChainableMethod utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Chai - overwriteMethod utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Chai - overwriteProperty utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Chai - test utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Chai - transferFlags utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * assertion-error
 * Copyright(c) 2013 Jake Luer <jake@qualiancy.com>
 * MIT Licensed
 */

/*!
 * Return a function that will copy properties from
 * one object to another excluding any originally
 * listed. Returned function will create a new `{}`.
 *
 * @param {String} excluded properties ...
 * @return {Function}
 */

/*!
 * Primary Exports
 */

/*!
 * Inherit from Error.prototype
 */

/*!
 * Statically set name
 */

/*!
 * Ensure correct constructor
 */

/*!
 * deep-eql
 * Copyright(c) 2013 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Buffer.isBuffer browser shim
 */

/*!
 * Primary Export
 */

/*!
 * Strict (egal) equality test. Ensures that NaN always
 * equals NaN and `-0` does not equal `+0`.
 *
 * @param {Mixed} a
 * @param {Mixed} b
 * @return {Boolean} equal match
 */

/*!
 * Compare the types of two given objects and
 * return if they are equal. Note that an Array
 * has a type of `array` (not `object`) and arguments
 * have a type of `arguments` (not `array`/`object`).
 *
 * @param {Mixed} a
 * @param {Mixed} b
 * @return {Boolean} result
 */

/*!
 * Compare two Date objects by asserting that
 * the time values are equal using `saveValue`.
 *
 * @param {Date} a
 * @param {Date} b
 * @return {Boolean} result
 */

/*!
 * Compare two regular expressions by converting them
 * to string and checking for `sameValue`.
 *
 * @param {RegExp} a
 * @param {RegExp} b
 * @return {Boolean} result
 */

/*!
 * Assert deep equality of two `arguments` objects.
 * Unfortunately, these must be sliced to arrays
 * prior to test to ensure no bad behavior.
 *
 * @param {Arguments} a
 * @param {Arguments} b
 * @param {Array} memoize (optional)
 * @return {Boolean} result
 */

/*!
 * Get enumerable properties of a given object.
 *
 * @param {Object} a
 * @return {Array} property names
 */

/*!
 * Simple equality for flat iterable objects
 * such as Arrays or Node.js buffers.
 *
 * @param {Iterable} a
 * @param {Iterable} b
 * @return {Boolean} result
 */

/*!
 * Extension to `iterableEqual` specifically
 * for Node.js Buffers.
 *
 * @param {Buffer} a
 * @param {Mixed} b
 * @return {Boolean} result
 */

/*!
 * Block for `objectEqual` ensuring non-existing
 * values don't get in.
 *
 * @param {Mixed} object
 * @return {Boolean} result
 */

/*!
 * Recursively check the equality of two objects.
 * Once basic sameness has been established it will
 * defer to `deepEqual` for each enumerable key
 * in the object.
 *
 * @param {Mixed} a
 * @param {Mixed} b
 * @return {Boolean} result
 */

/*!
 * type-detect
 * Copyright(c) 2013 jake luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Detectable javascript natives
 */

//     uuid.js
//
//     Copyright (c) 2010-2012 Robert Kieffer
//     MIT License - http://opensource.org/licenses/mit-license.php

!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define("util",[],e);else{var t;"undefined"!=typeof window?t=window:"undefined"!=typeof global?t=global:"undefined"!=typeof self&&(t=self),t.util=e()}}(function(){var e,t,n;return function r(e,t,n){function i(o,u){if(!t[o]){if(!e[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(s)return s(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=t[o]={exports:{}};e[o][0].call(l.exports,function(t){var n=e[o][1][t];return i(n?n:t)},l,l.exports,r,e,t,n)}return t[o].exports}var s=typeof require=="function"&&require;for(var o=0;o<n.length;o++)i(n[o]);return i}({1:[function(e,t,n){typeof Object.create=="function"?t.exports=function(t,n){t.super_=n,t.prototype=Object.create(n.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}})}:t.exports=function(t,n){t.super_=n;var r=function(){};r.prototype=n.prototype,t.prototype=new r,t.prototype.constructor=t}},{}],2:[function(e,t,n){function i(){}var r=t.exports={};r.nextTick=function(){var e=typeof window!="undefined"&&window.setImmediate,t=typeof window!="undefined"&&window.MutationObserver,n=typeof window!="undefined"&&window.postMessage&&window.addEventListener;if(e)return function(e){return window.setImmediate(e)};var r=[];if(t){var i=document.createElement("div"),s=new MutationObserver(function(){var e=r.slice();r.length=0,e.forEach(function(e){e()})});return s.observe(i,{attributes:!0}),function(t){r.length||i.setAttribute("yes","no"),r.push(t)}}return n?(window.addEventListener("message",function(e){var t=e.source;if((t===window||t===null)&&e.data==="process-tick"){e.stopPropagation();if(r.length>0){var n=r.shift();n()}}},!0),function(t){r.push(t),window.postMessage("process-tick","*")}):function(t){setTimeout(t,0)}}(),r.title="browser",r.browser=!0,r.env={},r.argv=[],r.on=i,r.addListener=i,r.once=i,r.off=i,r.removeListener=i,r.removeAllListeners=i,r.emit=i,r.binding=function(e){throw new Error("process.binding is not supported")},r.cwd=function(){return"/"},r.chdir=function(e){throw new Error("process.chdir is not supported")}},{}],3:[function(e,t,n){t.exports=function(t){return t&&typeof t=="object"&&typeof t.copy=="function"&&typeof t.fill=="function"&&typeof t.readUInt8=="function"}},{}],4:[function(e,t,n){(function(t,r){function u(e,t){var r={seen:[],stylize:f};return arguments.length>=3&&(r.depth=arguments[2]),arguments.length>=4&&(r.colors=arguments[3]),y(t)?r.showHidden=t:t&&n._extend(r,t),T(r.showHidden)&&(r.showHidden=!1),T(r.depth)&&(r.depth=2),T(r.colors)&&(r.colors=!1),T(r.customInspect)&&(r.customInspect=!0),r.colors&&(r.stylize=a),c(r,e,r.depth)}function a(e,t){var n=u.styles[t];return n?"["+u.colors[n][0]+"m"+e+"["+u.colors[n][1]+"m":e}function f(e,t){return e}function l(e){var t={};return e.forEach(function(e,n){t[e]=!0}),t}function c(e,t,r){if(e.customInspect&&t&&A(t.inspect)&&t.inspect!==n.inspect&&(!t.constructor||t.constructor.prototype!==t)){var i=t.inspect(r,e);return S(i)||(i=c(e,i,r)),i}var s=h(e,t);if(s)return s;var o=Object.keys(t),u=l(o);e.showHidden&&(o=Object.getOwnPropertyNames(t));if(L(t)&&(o.indexOf("message")>=0||o.indexOf("description")>=0))return p(t);if(o.length===0){if(A(t)){var a=t.name?": "+t.name:"";return e.stylize("[Function"+a+"]","special")}if(N(t))return e.stylize(RegExp.prototype.toString.call(t),"regexp");if(k(t))return e.stylize(Date.prototype.toString.call(t),"date");if(L(t))return p(t)}var f="",y=!1,b=["{","}"];g(t)&&(y=!0,b=["[","]"]);if(A(t)){var w=t.name?": "+t.name:"";f=" [Function"+w+"]"}N(t)&&(f=" "+RegExp.prototype.toString.call(t)),k(t)&&(f=" "+Date.prototype.toUTCString.call(t)),L(t)&&(f=" "+p(t));if(o.length!==0||!!y&&t.length!=0){if(r<0)return N(t)?e.stylize(RegExp.prototype.toString.call(t),"regexp"):e.stylize("[Object]","special");e.seen.push(t);var E;return y?E=d(e,t,r,u,o):E=o.map(function(n){return v(e,t,r,u,n,y)}),e.seen.pop(),m(E,f,b)}return b[0]+f+b[1]}function h(e,t){if(T(t))return e.stylize("undefined","undefined");if(S(t)){var n="'"+JSON.stringify(t).replace(/^"|"$/g,"").replace(/'/g,"\\'").replace(/\\"/g,'"')+"'";return e.stylize(n,"string")}if(E(t))return e.stylize(""+t,"number");if(y(t))return e.stylize(""+t,"boolean");if(b(t))return e.stylize("null","null")}function p(e){return"["+Error.prototype.toString.call(e)+"]"}function d(e,t,n,r,i){var s=[];for(var o=0,u=t.length;o<u;++o)H(t,String(o))?s.push(v(e,t,n,r,String(o),!0)):s.push("");return i.forEach(function(i){i.match(/^\d+$/)||s.push(v(e,t,n,r,i,!0))}),s}function v(e,t,n,r,i,s){var o,u,a;a=Object.getOwnPropertyDescriptor(t,i)||{value:t[i]},a.get?a.set?u=e.stylize("[Getter/Setter]","special"):u=e.stylize("[Getter]","special"):a.set&&(u=e.stylize("[Setter]","special")),H(r,i)||(o="["+i+"]"),u||(e.seen.indexOf(a.value)<0?(b(n)?u=c(e,a.value,null):u=c(e,a.value,n-1),u.indexOf("\n")>-1&&(s?u=u.split("\n").map(function(e){return"  "+e}).join("\n").substr(2):u="\n"+u.split("\n").map(function(e){return"   "+e}).join("\n"))):u=e.stylize("[Circular]","special"));if(T(o)){if(s&&i.match(/^\d+$/))return u;o=JSON.stringify(""+i),o.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)?(o=o.substr(1,o.length-2),o=e.stylize(o,"name")):(o=o.replace(/'/g,"\\'").replace(/\\"/g,'"').replace(/(^"|"$)/g,"'"),o=e.stylize(o,"string"))}return o+": "+u}function m(e,t,n){var r=0,i=e.reduce(function(e,t){return r++,t.indexOf("\n")>=0&&r++,e+t.replace(/\u001b\[\d\d?m/g,"").length+1},0);return i>60?n[0]+(t===""?"":t+"\n ")+" "+e.join(",\n  ")+" "+n[1]:n[0]+t+" "+e.join(", ")+" "+n[1]}function g(e){return Array.isArray(e)}function y(e){return typeof e=="boolean"}function b(e){return e===null}function w(e){return e==null}function E(e){return typeof e=="number"}function S(e){return typeof e=="string"}function x(e){return typeof e=="symbol"}function T(e){return e===void 0}function N(e){return C(e)&&M(e)==="[object RegExp]"}function C(e){return typeof e=="object"&&e!==null}function k(e){return C(e)&&M(e)==="[object Date]"}function L(e){return C(e)&&(M(e)==="[object Error]"||e instanceof Error)}function A(e){return typeof e=="function"}function O(e){return e===null||typeof e=="boolean"||typeof e=="number"||typeof e=="string"||typeof e=="symbol"||typeof e=="undefined"}function M(e){return Object.prototype.toString.call(e)}function _(e){return e<10?"0"+e.toString(10):e.toString(10)}function P(){var e=new Date,t=[_(e.getHours()),_(e.getMinutes()),_(e.getSeconds())].join(":");return[e.getDate(),D[e.getMonth()],t].join(" ")}function H(e,t){return Object.prototype.hasOwnProperty.call(e,t)}var i=/%[sdj%]/g;n.format=function(e){if(!S(e)){var t=[];for(var n=0;n<arguments.length;n++)t.push(u(arguments[n]));return t.join(" ")}var n=1,r=arguments,s=r.length,o=String(e).replace(i,function(e){if(e==="%%")return"%";if(n>=s)return e;switch(e){case"%s":return String(r[n++]);case"%d":return Number(r[n++]);case"%j":try{return JSON.stringify(r[n++])}catch(t){return"[Circular]"};default:return e}});for(var a=r[n];n<s;a=r[++n])b(a)||!C(a)?o+=" "+a:o+=" "+u(a);return o},n.deprecate=function(e,i){function o(){if(!s){if(t.throwDeprecation)throw new Error(i);t.traceDeprecation?console.trace(i):console.error(i),s=!0}return e.apply(this,arguments)}if(T(r.process))return function(){return n.deprecate(e,i).apply(this,arguments)};if(t.noDeprecation===!0)return e;var s=!1;return o};var s={},o;n.debuglog=function(e){T(o)&&(o=t.env.NODE_DEBUG||""),e=e.toUpperCase();if(!s[e])if((new RegExp("\\b"+e+"\\b","i")).test(o)){var r=t.pid;s[e]=function(){var t=n.format.apply(n,arguments);console.error("%s %d: %s",e,r,t)}}else s[e]=function(){};return s[e]},n.inspect=u,u.colors={bold:[1,22],italic:[3,23],underline:[4,24],inverse:[7,27],white:[37,39],grey:[90,39],black:[30,39],blue:[34,39],cyan:[36,39],green:[32,39],magenta:[35,39],red:[31,39],yellow:[33,39]},u.styles={special:"cyan",number:"yellow","boolean":"yellow","undefined":"grey","null":"bold",string:"green",date:"magenta",regexp:"red"},n.isArray=g,n.isBoolean=y,n.isNull=b,n.isNullOrUndefined=w,n.isNumber=E,n.isString=S,n.isSymbol=x,n.isUndefined=T,n.isRegExp=N,n.isObject=C,n.isDate=k,n.isError=L,n.isFunction=A,n.isPrimitive=O,n.isBuffer=e("./support/isBuffer");var D=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];n.log=function(){console.log("%s - %s",P(),n.format.apply(n,arguments))},n.inherits=e("inherits"),n._extend=function(e,t){if(!t||!C(t))return e;var n=Object.keys(t),r=n.length;while(r--)e[n[r]]=t[n[r]];return e}}).call(this,e("_process"),typeof global!="undefined"?global:typeof self!="undefined"?self:typeof window!="undefined"?window:{})},{"./support/isBuffer":3,_process:2,inherits:1}],5:[function(e,t,n){t.exports=e("util")},{util:4}]},{},[5])(5)}),function(e){if(typeof exports=="object"&&typeof module!="undefined")module.exports=e();else if(typeof define=="function"&&define.amd)define("chai",[],e);else{var t;typeof window!="undefined"?t=window:typeof global!="undefined"?t=global:typeof self!="undefined"?t=self:t=this,t.chai=e()}}(function(){var e,t,n;return function r(e,t,n){function i(o,u){if(!t[o]){if(!e[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(s)return s(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=t[o]={exports:{}};e[o][0].call(l.exports,function(t){var n=e[o][1][t];return i(n?n:t)},l,l.exports,r,e,t,n)}return t[o].exports}var s=typeof require=="function"&&require;for(var o=0;o<n.length;o++)i(n[o]);return i}({1:[function(e,t,n){t.exports=e("./lib/chai")},{"./lib/chai":2}],2:[function(e,t,n){var r=[],n=t.exports={};n.version="3.4.0",n.AssertionError=e("assertion-error");var i=e("./chai/utils");n.use=function(e){return~r.indexOf(e)||(e(this,i),r.push(e)),this},n.util=i;var s=e("./chai/config");n.config=s;var o=e("./chai/assertion");n.use(o);var u=e("./chai/core/assertions");n.use(u);var a=e("./chai/interface/expect");n.use(a);var f=e("./chai/interface/should");n.use(f);var l=e("./chai/interface/assert");n.use(l)},{"./chai/assertion":3,"./chai/config":4,"./chai/core/assertions":5,"./chai/interface/assert":6,"./chai/interface/expect":7,"./chai/interface/should":8,"./chai/utils":22,"assertion-error":30}],3:[function(e,t,n){var r=e("./config");t.exports=function(e,t){function s(e,t,n){i(this,"ssfi",n||arguments.callee),i(this,"object",e),i(this,"message",t)}var n=e.AssertionError,i=t.flag;e.Assertion=s,Object.defineProperty(s,"includeStack",{get:function(){return console.warn("Assertion.includeStack is deprecated, use chai.config.includeStack instead."),r.includeStack},set:function(e){console.warn("Assertion.includeStack is deprecated, use chai.config.includeStack instead."),r.includeStack=e}}),Object.defineProperty(s,"showDiff",{get:function(){return console.warn("Assertion.showDiff is deprecated, use chai.config.showDiff instead."),r.showDiff},set:function(e){console.warn("Assertion.showDiff is deprecated, use chai.config.showDiff instead."),r.showDiff=e}}),s.addProperty=function(e,n){t.addProperty(this.prototype,e,n)},s.addMethod=function(e,n){t.addMethod(this.prototype,e,n)},s.addChainableMethod=function(e,n,r){t.addChainableMethod(this.prototype,e,n,r)},s.overwriteProperty=function(e,n){t.overwriteProperty(this.prototype,e,n)},s.overwriteMethod=function(e,n){t.overwriteMethod(this.prototype,e,n)},s.overwriteChainableMethod=function(e,n,r){t.overwriteChainableMethod(this.prototype,e,n,r)},s.prototype.assert=function(e,s,o,u,a,f){var l=t.test(this,arguments);!0!==f&&(f=!1),!0!==r.showDiff&&(f=!1);if(!l){var s=t.getMessage(this,arguments),c=t.getActual(this,arguments);throw new n(s,{actual:c,expected:u,showDiff:f},r.includeStack?this.assert:i(this,"ssfi"))}},Object.defineProperty(s.prototype,"_obj",{get:function(){return i(this,"object")},set:function(e){i(this,"object",e)}})}},{"./config":4}],4:[function(e,t,n){t.exports={includeStack:!1,showDiff:!0,truncateThreshold:40}},{}],5:[function(e,t,n){t.exports=function(e,t){function s(e,n){n&&i(this,"message",n),e=e.toLowerCase();var r=i(this,"object"),s=~["a","e","i","o","u"].indexOf(e.charAt(0))?"an ":"a ";this.assert(e===t.type(r),"expected #{this} to be "+s+e,"expected #{this} not to be "+s+e)}function o(){i(this,"contains",!0)}function u(e,r){t.expectTypes(this,["array","object","string"]),r&&i(this,"message",r);var s=i(this,"object"),o=!1;if(t.type(s)==="array"&&t.type(e)==="object"){for(var u in s)if(t.eql(s[u],e)){o=!0;break}}else if(t.type(e)==="object"){if(!i(this,"negate")){for(var a in e)(new n(s)).property(a,e[a]);return}var f={};for(var a in e)f[a]=s[a];o=t.eql(f,e)}else o=s!=undefined&&~s.indexOf(e);this.assert(o,"expected #{this} to include "+t.inspect(e),"expected #{this} to not include "+t.inspect(e))}function a(){var e=i(this,"object"),t=Object.prototype.toString.call(e);this.assert("[object Arguments]"===t,"expected #{this} to be arguments but got "+t,"expected #{this} to not be arguments")}function f(e,t){t&&i(this,"message",t);var n=i(this,"object");if(i(this,"deep"))return this.eql(e);this.assert(e===n,"expected #{this} to equal #{exp}","expected #{this} to not equal #{exp}",e,this._obj,!0)}function l(e,n){n&&i(this,"message",n),this.assert(t.eql(e,i(this,"object")),"expected #{this} to deeply equal #{exp}","expected #{this} to not deeply equal #{exp}",e,this._obj,!0)}function c(e,t){t&&i(this,"message",t);var r=i(this,"object");if(i(this,"doLength")){(new n(r,t)).to.have.property("length");var s=r.length;this.assert(s>e,"expected #{this} to have a length above #{exp} but got #{act}","expected #{this} to not have a length above #{exp}",e,s)}else this.assert(r>e,"expected #{this} to be above "+e,"expected #{this} to be at most "+e)}function h(e,t){t&&i(this,"message",t);var r=i(this,"object");if(i(this,"doLength")){(new n(r,t)).to.have.property("length");var s=r.length;this.assert(s>=e,"expected #{this} to have a length at least #{exp} but got #{act}","expected #{this} to have a length below #{exp}",e,s)}else this.assert(r>=e,"expected #{this} to be at least "+e,"expected #{this} to be below "+e)}function p(e,t){t&&i(this,"message",t);var r=i(this,"object");if(i(this,"doLength")){(new n(r,t)).to.have.property("length");var s=r.length;this.assert(s<e,"expected #{this} to have a length below #{exp} but got #{act}","expected #{this} to not have a length below #{exp}",e,s)}else this.assert(r<e,"expected #{this} to be below "+e,"expected #{this} to be at least "+e)}function d(e,t){t&&i(this,"message",t);var r=i(this,"object");if(i(this,"doLength")){(new n(r,t)).to.have.property("length");var s=r.length;this.assert(s<=e,"expected #{this} to have a length at most #{exp} but got #{act}","expected #{this} to have a length above #{exp}",e,s)}else this.assert(r<=e,"expected #{this} to be at most "+e,"expected #{this} to be above "+e)}function v(e,n){n&&i(this,"message",n);var r=t.getName(e);this.assert(i(this,"object")instanceof e,"expected #{this} to be an instance of "+r,"expected #{this} to not be an instance of "+r)}function m(e,n){n&&i(this,"message",n);var r=i(this,"object");this.assert(r.hasOwnProperty(e),"expected #{this} to have own property "+t.inspect(e),"expected #{this} to not have own property "+t.inspect(e))}function g(e,n,r){typeof n=="string"&&(r=n,n=null),r&&i(this,"message",r);var s=i(this,"object"),o=Object.getOwnPropertyDescriptor(Object(s),e);o&&n?this.assert(t.eql(n,o),"expected the own property descriptor for "+t.inspect(e)+" on #{this} to match "+t.inspect(n)+", got "+t.inspect(o),"expected the own property descriptor for "+t.inspect(e)+" on #{this} to not match "+t.inspect(n),n,o,!0):this.assert(o,"expected #{this} to have an own property descriptor for "+t.inspect(e),"expected #{this} to not have an own property descriptor for "+t.inspect(e)),i(this,"object",o)}function y(){i(this,"doLength",!0)}function b(e,t){t&&i(this,"message",t);var r=i(this,"object");(new n(r,t)).to.have.property("length");var s=r.length;this.assert(s==e,"expected #{this} to have a length of #{exp} but got #{act}","expected #{this} to not have a length of #{act}",e,s)}function w(e,t){t&&i(this,"message",t);var n=i(this,"object");this.assert(e.exec(n),"expected #{this} to match "+e,"expected #{this} not to match "+e)}function E(e){var n=i(this,"object"),r,s=!0,o="keys must be given single argument of Array|Object|String, or multiple String arguments";switch(t.type(e)){case"array":if(arguments.length>1)throw new Error(o);break;case"object":if(arguments.length>1)throw new Error(o);e=Object.keys(e);break;default:e=Array.prototype.slice.call(arguments)}if(!e.length)throw new Error("keys required");var u=Object.keys(n),a=e,f=e.length,l=i(this,"any"),c=i(this,"all");!l&&!c&&(c=!0);if(l){var h=a.filter(function(e){return~u.indexOf(e)});s=h.length>0}c&&(s=e.every(function(e){return~u.indexOf(e)}),!i(this,"negate")&&!i(this,"contains")&&(s=s&&e.length==u.length));if(f>1){e=e.map(function(e){return t.inspect(e)});var p=e.pop();c&&(r=e.join(", ")+", and "+p),l&&(r=e.join(", ")+", or "+p)}else r=t.inspect(e[0]);r=(f>1?"keys ":"key ")+r,r=(i(this,"contains")?"contain ":"have ")+r,this.assert(s,"expected #{this} to "+r,"expected #{this} to not "+r,a.slice(0).sort(),u.sort(),!0)}function S(e,r,s){s&&i(this,"message",s);var o=i(this,"object");(new n(o,s)).is.a("function");var u=!1,a=null,f=null,l=null;if(arguments.length===0)r=null,e=null;else if(e&&(e instanceof RegExp||"string"==typeof e))r=e,e=null;else if(e&&e instanceof Error)a=e,e=null,r=null;else if(typeof e=="function"){f=e.prototype.name;if(!f||f==="Error"&&e!==Error)f=e.name||(new e).name}else e=null;try{o()}catch(c){if(a)return this.assert(c===a,"expected #{this} to throw #{exp} but #{act} was thrown","expected #{this} to not throw #{exp}",a instanceof Error?a.toString():a,c instanceof Error?c.toString():c),i(this,"object",c),this;if(e){this.assert(c instanceof e,"expected #{this} to throw #{exp} but #{act} was thrown","expected #{this} to not throw #{exp} but #{act} was thrown",f,c instanceof Error?c.toString():c);if(!r)return i(this,"object",c),this}var h="error"===t.type(c)&&"message"in c?c.message:""+c;if(h!=null&&r&&r instanceof RegExp)return this.assert(r.exec(h),"expected #{this} to throw error matching #{exp} but got #{act}","expected #{this} to throw error not matching #{exp}",r,h),i(this,"object",c),this;if(h!=null&&r&&"string"==typeof r)return this.assert(~h.indexOf(r),"expected #{this} to throw error including #{exp} but got #{act}","expected #{this} to throw error not including #{act}",r,h),i(this,"object",c),this;u=!0,l=c}var p="",d=f!==null?f:a?"#{exp}":"an error";u&&(p=" but #{act} was thrown"),this.assert(u===!0,"expected #{this} to throw "+d+p,"expected #{this} to not throw "+d+p,a instanceof Error?a.toString():a,l instanceof Error?l.toString():l),i(this,"object",l)}function x(e,n){n&&i(this,"message",n);var r=i(this,"object"),s=i(this,"itself"),o="function"===t.type(r)&&!s?r.prototype[e]:r[e];this.assert("function"==typeof o,"expected #{this} to respond to "+t.inspect(e),"expected #{this} to not respond to "+t.inspect(e))}function T(e,n){n&&i(this,"message",n);var r=i(this,"object"),s=e(r);this.assert(s,"expected #{this} to satisfy "+t.objDisplay(e),"expected #{this} to not satisfy"+t.objDisplay(e),this.negate?!1:!0,s)}function N(e,r,s){s&&i(this,"message",s);var o=i(this,"object");(new n(o,s)).is.a("number");if(t.type(e)!=="number"||t.type(r)!=="number")throw new Error("the arguments to closeTo or approximately must be numbers");this.assert(Math.abs(o-e)<=r,"expected #{this} to be close to "+e+" +/- "+r,"expected #{this} not to be close to "+e+" +/- "+r)}function C(e,t,n){return e.every(function(e){return n?t.some(function(t){return n(e,t)}):t.indexOf(e)!==-1})}function k(e,t){t&&i(this,"message",t);var r=i(this,"object");(new n(e)).to.be.an("array"),this.assert(e.indexOf(r)>-1,"expected #{this} to be one of #{exp}","expected #{this} to not be one of #{exp}",e,r)}function L(e,t,r){r&&i(this,"message",r);var s=i(this,"object");(new n(e,r)).to.have.property(t),(new n(s)).is.a("function");var o=e[t];s(),this.assert(o!==e[t],"expected ."+t+" to change","expected ."+t+" to not change")}function A(e,t,r){r&&i(this,"message",r);var s=i(this,"object");(new n(e,r)).to.have.property(t),(new n(s)).is.a("function");var o=e[t];s(),this.assert(e[t]-o>0,"expected ."+t+" to increase","expected ."+t+" to not increase")}function O(e,t,r){r&&i(this,"message",r);var s=i(this,"object");(new n(e,r)).to.have.property(t),(new n(s)).is.a("function");var o=e[t];s(),this.assert(e[t]-o<0,"expected ."+t+" to decrease","expected ."+t+" to not decrease")}var n=e.Assertion,r=Object.prototype.toString,i=t.flag;["to","be","been","is","and","has","have","with","that","which","at","of","same"].forEach(function(e){n.addProperty(e,function(){return this})}),n.addProperty("not",function(){i(this,"negate",!0)}),n.addProperty("deep",function(){i(this,"deep",!0)}),n.addProperty("any",function(){i(this,"any",!0),i(this,"all",!1)}),n.addProperty("all",function(){i(this,"all",!0),i(this,"any",!1)}),n.addChainableMethod("an",s),n.addChainableMethod("a",s),n.addChainableMethod("include",u,o),n.addChainableMethod("contain",u,o),n.addChainableMethod("contains",u,o),n.addChainableMethod("includes",u,o),n.addProperty("ok",function(){this.assert(i(this,"object"),"expected #{this} to be truthy","expected #{this} to be falsy")}),n.addProperty("true",function(){this.assert(!0===i(this,"object"),"expected #{this} to be true","expected #{this} to be false",this.negate?!1:!0)}),n.addProperty("false",function(){this.assert(!1===i(this,"object"),"expected #{this} to be false","expected #{this} to be true",this.negate?!0:!1)}),n.addProperty("null",function(){this.assert(null===i(this,"object"),"expected #{this} to be null","expected #{this} not to be null")}),n.addProperty("undefined",function(){this.assert(undefined===i(this,"object"),"expected #{this} to be undefined","expected #{this} not to be undefined")}),n.addProperty("NaN",function(){this.assert(isNaN(i(this,"object")),"expected #{this} to be NaN","expected #{this} not to be NaN")}),n.addProperty("exist",function(){this.assert(null!=i(this,"object"),"expected #{this} to exist","expected #{this} to not exist")}),n.addProperty("empty",function(){var e=i(this,"object"),t=e;Array.isArray(e)||"string"==typeof object?t=e.length:typeof e=="object"&&(t=Object.keys(e).length),this.assert(!t,"expected #{this} to be empty","expected #{this} not to be empty")}),n.addProperty("arguments",a),n.addProperty("Arguments",a),n.addMethod("equal",f),n.addMethod("equals",f),n.addMethod("eq",f),n.addMethod("eql",l),n.addMethod("eqls",l),n.addMethod("above",c),n.addMethod("gt",c),n.addMethod("greaterThan",c),n.addMethod("least",h),n.addMethod("gte",h),n.addMethod("below",p),n.addMethod("lt",p),n.addMethod("lessThan",p),n.addMethod("most",d),n.addMethod("lte",d),n.addMethod("within",function(e,t,r){r&&i(this,"message",r);var s=i(this,"object"),o=e+".."+t;if(i(this,"doLength")){(new n(s,r)).to.have.property("length");var u=s.length;this.assert(u>=e&&u<=t,"expected #{this} to have a length within "+o,"expected #{this} to not have a length within "+o)}else this.assert(s>=e&&s<=t,"expected #{this} to be within "+o,"expected #{this} to not be within "+o)}),n.addMethod("instanceof",v),n.addMethod("instanceOf",v),n.addMethod("property",function(e,n,r){r&&i(this,"message",r);var s=!!i(this,"deep"),o=s?"deep property ":"property ",u=i(this,"negate"),a=i(this,"object"),f=s?t.getPathInfo(e,a):null,l=s?f.exists:t.hasProperty(e,a),c=s?f.value:a[e];if(u&&arguments.length>1){if(undefined===c)throw r=r!=null?r+": ":"",new Error(r+t.inspect(a)+" has no "+o+t.inspect(e))}else this.assert(l,"expected #{this} to have a "+o+t.inspect(e),"expected #{this} to not have "+o+t.inspect(e));arguments.length>1&&this.assert(n===c,"expected #{this} to have a "+o+t.inspect(e)+" of #{exp}, but got #{act}","expected #{this} to not have a "+o+t.inspect(e)+" of #{act}",n,c),i(this,"object",c)}),n.addMethod("ownProperty",m),n.addMethod("haveOwnProperty",m),n.addMethod("ownPropertyDescriptor",g),n.addMethod("haveOwnPropertyDescriptor",g),n.addChainableMethod("length",b,y),n.addMethod("lengthOf",b),n.addMethod("match",w),n.addMethod("matches",w),n.addMethod("string",function(e,r){r&&i(this,"message",r);var s=i(this,"object");(new n(s,r)).is.a("string"),this.assert(~s.indexOf(e),"expected #{this} to contain "+t.inspect(e),"expected #{this} to not contain "+t.inspect(e))}),n.addMethod("keys",E),n.addMethod("key",E),n.addMethod("throw",S),n.addMethod("throws",S),n.addMethod("Throw",S),n.addMethod("respondTo",x),n.addMethod("respondsTo",x),n.addProperty("itself",function(){i(this,"itself",!0)}),n.addMethod("satisfy",T),n.addMethod("satisfies",T),n.addMethod("closeTo",N),n.addMethod("approximately",N),n.addMethod("members",function(e,r){r&&i(this,"message",r);var s=i(this,"object");(new n(s)).to.be.an("array"),(new n(e)).to.be.an("array");var o=i(this,"deep")?t.eql:undefined;if(i(this,"contains"))return this.assert(C(e,s,o),"expected #{this} to be a superset of #{act}","expected #{this} to not be a superset of #{act}",s,e);this.assert(C(s,e,o)&&C(e,s,o),"expected #{this} to have the same members as #{act}","expected #{this} to not have the same members as #{act}",s,e)}),n.addMethod("oneOf",k),n.addChainableMethod("change",L),n.addChainableMethod("changes",L),n.addChainableMethod("increase",A),n.addChainableMethod("increases",A),n.addChainableMethod("decrease",O),n.addChainableMethod("decreases",O),n.addProperty("extensible",function(){var e=i(this,"object"),t;try{t=Object.isExtensible(e)}catch(n){if(!(n instanceof TypeError))throw n;t=!1}this.assert(t,"expected #{this} to be extensible","expected #{this} to not be extensible")}),n.addProperty("sealed",function(){var e=i(this,"object"),t;try{t=Object.isSealed(e)}catch(n){if(!(n instanceof TypeError))throw n;t=!0}this.assert(t,"expected #{this} to be sealed","expected #{this} to not be sealed")}),n.addProperty("frozen",function(){var e=i(this,"object"),t;try{t=Object.isFrozen(e)}catch(n){if(!(n instanceof TypeError))throw n;t=!0}this.assert(t,"expected #{this} to be frozen","expected #{this} to not be frozen")})}},{}],6:[function(e,t,n){t.exports=function(e,t){var n=e.Assertion,r=t.flag,i=e.assert=function(t,r){var i=new n(null,null,e.assert);i.assert(t,r,"[ negation message unavailable ]")};i.fail=function(t,n,r,s){throw r=r||"assert.fail()",new e.AssertionError(r,{actual:t,expected:n,operator:s},i.fail)},i.isOk=function(e,t){(new n(e,t)).is.ok},i.isNotOk=function(e,t){(new n(e,t)).is.not.ok},i.equal=function(e,t,s){var o=new n(e,s,i.equal);o.assert(t==r(o,"object"),"expected #{this} to equal #{exp}","expected #{this} to not equal #{act}",t,e)},i.notEqual=function(e,t,s){var o=new n(e,s,i.notEqual);o.assert(t!=r(o,"object"),"expected #{this} to not equal #{exp}","expected #{this} to equal #{act}",t,e)},i.strictEqual=function(e,t,r){(new n(e,r)).to.equal(t)},i.notStrictEqual=function(e,t,r){(new n(e,r)).to.not.equal(t)},i.deepEqual=function(e,t,r){(new n(e,r)).to.eql(t)},i.notDeepEqual=function(e,t,r){(new n(e,r)).to.not.eql(t)},i.isAbove=function(e,t,r){(new n(e,r)).to.be.above(t)},i.isAtLeast=function(e,t,r){(new n(e,r)).to.be.least(t)},i.isBelow=function(e,t,r){(new n(e,r)).to.be.below(t)},i.isAtMost=function(e,t,r){(new n(e,r)).to.be.most(t)},i.isTrue=function(e,t){(new n(e,t)).is["true"]},i.isNotTrue=function(e,t){(new n(e,t)).to.not.equal(!0)},i.isFalse=function(e,t){(new n(e,t)).is["false"]},i.isNotFalse=function(e,t){(new n(e,t)).to.not.equal(!1)},i.isNull=function(e,t){(new n(e,t)).to.equal(null)},i.isNotNull=function(e,t){(new n(e,t)).to.not.equal(null)},i.isNaN=function(e,t){(new n(e,t)).to.be.NaN},i.isNotNaN=function(e,t){(new n(e,t)).not.to.be.NaN},i.isUndefined=function(e,t){(new n(e,t)).to.equal(undefined)},i.isDefined=function(e,t){(new n(e,t)).to.not.equal(undefined)},i.isFunction=function(e,t){(new n(e,t)).to.be.a("function")},i.isNotFunction=function(e,t){(new n(e,t)).to.not.be.a("function")},i.isObject=function(e,t){(new n(e,t)).to.be.a("object")},i.isNotObject=function(e,t){(new n(e,t)).to.not.be.a("object")},i.isArray=function(e,t){(new n(e,t)).to.be.an("array")},i.isNotArray=function(e,t){(new n(e,t)).to.not.be.an("array")},i.isString=function(e,t){(new n(e,t)).to.be.a("string")},i.isNotString=function(e,t){(new n(e,t)).to.not.be.a("string")},i.isNumber=function(e,t){(new n(e,t)).to.be.a("number")},i.isNotNumber=function(e,t){(new n(e,t)).to.not.be.a("number")},i.isBoolean=function(e,t){(new n(e,t)).to.be.a("boolean")},i.isNotBoolean=function(e,t){(new n(e,t)).to.not.be.a("boolean")},i.typeOf=function(e,t,r){(new n(e,r)).to.be.a(t)},i.notTypeOf=function(e,t,r){(new n(e,r)).to.not.be.a(t)},i.instanceOf=function(e,t,r){(new n(e,r)).to.be.instanceOf(t)},i.notInstanceOf=function(e,t,r){(new n(e,r)).to.not.be.instanceOf(t)},i.include=function(e,t,r){(new n(e,r,i.include)).include(t)},i.notInclude=function(e,t,r){(new n(e,r,i.notInclude)).not.include(t)},i.match=function(e,t,r){(new n(e,r)).to.match(t)},i.notMatch=function(e,t,r){(new n(e,r)).to.not.match(t)},i.property=function(e,t,r){(new n(e,r)).to.have.property(t)},i.notProperty=function(e,t,r){(new n(e,r)).to.not.have.property(t)},i.deepProperty=function(e,t,r){(new n(e,r)).to.have.deep.property(t)},i.notDeepProperty=function(e,t,r){(new n(e,r)).to.not.have.deep.property(t)},i.propertyVal=function(e,t,r,i){(new n(e,i)).to.have.property(t,r)},i.propertyNotVal=function(e,t,r,i){(new n(e,i)).to.not.have.property(t,r)},i.deepPropertyVal=function(e,t,r,i){(new n(e,i)).to.have.deep.property(t,r)},i.deepPropertyNotVal=function(e,t,r,i){(new n(e,i)).to.not.have.deep.property(t,r)},i.lengthOf=function(e,t,r){(new n(e,r)).to.have.length(t)},i.throws=function(e,t,i,s){if("string"==typeof t||t instanceof RegExp)i=t,t=null;var o=(new n(e,s)).to.throw(t,i);return r(o,"object")},i.doesNotThrow=function(e,t,r){"string"==typeof t&&(r=t,t=null),(new n(e,r)).to.not.Throw(t)},i.operator=function(e,i,s,o){var u;switch(i){case"==":u=e==s;break;case"===":u=e===s;break;case">":u=e>s;break;case">=":u=e>=s;break;case"<":u=e<s;break;case"<=":u=e<=s;break;case"!=":u=e!=s;break;case"!==":u=e!==s;break;default:throw new Error('Invalid operator "'+i+'"')}var a=new n(u,o);a.assert(!0===r(a,"object"),"expected "+t.inspect(e)+" to be "+i+" "+t.inspect(s),"expected "+t.inspect(e)+" to not be "+i+" "+t.inspect(s))},i.closeTo=function(e,t,r,i){(new n(e,i)).to.be.closeTo(t,r)},i.approximately=function(e,t,r,i){(new n(e,i)).to.be.approximately(t,r)},i.sameMembers=function(e,t,r){(new n(e,r)).to.have.same.members(t)},i.sameDeepMembers=function(e,t,r){(new n(e,r)).to.have.same.deep.members(t)},i.includeMembers=function(e,t,r){(new n(e,r)).to.include.members(t)},i.oneOf=function(e,t,r){(new n(e,r)).to.be.oneOf(t)},i.changes=function(e,t,r){(new n(e)).to.change(t,r)},i.doesNotChange=function(e,t,r){(new n(e)).to.not.change(t,r)},i.increases=function(e,t,r){(new n(e)).to.increase(t,r)},i.doesNotIncrease=function(e,t,r){(new n(e)).to.not.increase(t,r)},i.decreases=function(e,t,r){(new n(e)).to.decrease(t,r)},i.doesNotDecrease=function(e,t,r){(new n(e)).to.not.decrease(t,r)},i.ifError=function(e){if(e)throw e},i.isExtensible=function(e,t){(new n(e,t)).to.be.extensible},i.isNotExtensible=function(e,t){(new n(e,t)).to.not.be.extensible},i.isSealed=function(e,t){(new n(e,t)).to.be.sealed},i.isNotSealed=function(e,t){(new n(e,t)).to.not.be.sealed},i.isFrozen=function(e,t){(new n(e,t)).to.be.frozen},i.isNotFrozen=function(e,t){(new n(e,t)).to.not.be.frozen},function s(e,t){return i[t]=i[e],s}("isOk","ok")("isNotOk","notOk")("throws","throw")("throws","Throw")("isExtensible","extensible")("isNotExtensible","notExtensible")("isSealed","sealed")("isNotSealed","notSealed")("isFrozen","frozen")("isNotFrozen","notFrozen")}},{}],7:[function(e,t,n){t.exports=function(e,t){e.expect=function(t,n){return new e.Assertion(t,n)},e.expect.fail=function(t,n,r,i){throw r=r||"expect.fail()",new e.AssertionError(r,{actual:t,expected:n,operator:i},e.expect.fail)}}},{}],8:[function(e,t,n){t.exports=function(e,t){function r(){function t(){return this instanceof String||this instanceof Number||this instanceof Boolean?new n(this.valueOf(),null,t):new n(this,null,t)}function r(e){Object.defineProperty(this,"should",{value:e,enumerable:!0,configurable:!0,writable:!0})}Object.defineProperty(Object.prototype,"should",{set:r,get:t,configurable:!0});var i={};return i.fail=function(t,n,r,s){throw r=r||"should.fail()",new e.AssertionError(r,{actual:t,expected:n,operator:s},i.fail)},i.equal=function(e,t,r){(new n(e,r)).to.equal(t)},i.Throw=function(e,t,r,i){(new n(e,i)).to.Throw(t,r)},i.exist=function(e,t){(new n(e,t)).to.exist},i.not={},i.not.equal=function(e,t,r){(new n(e,r)).to.not.equal(t)},i.not.Throw=function(e,t,r,i){(new n(e,i)).to.not.Throw(t,r)},i.not.exist=function(e,t){(new n(e,t)).to.not.exist},i["throw"]=i.Throw,i.not["throw"]=i.not.Throw,i}var n=e.Assertion;e.should=r,e.Should=r}},{}],9:[function(e,t,n){var r=e("./transferFlags"),i=e("./flag"),s=e("../config"),o="__proto__"in Object,u=/^(?:length|name|arguments|caller)$/,a=Function.prototype.call,f=Function.prototype.apply;t.exports=function(e,t,n,l){typeof l!="function"&&(l=function(){});var c={method:n,chainingBehavior:l};e.__methods||(e.__methods={}),e.__methods[t]=c,Object.defineProperty(e,t,{get:function(){c.chainingBehavior.call(this);var t=function h(){var e=i(this,"ssfi");e&&s.includeStack===!1&&i(this,"ssfi",h);var t=c.method.apply(this,arguments);return t===undefined?this:t};if(o){var n=t.__proto__=Object.create(this);n.call=a,n.apply=f}else{var l=Object.getOwnPropertyNames(e);l.forEach(function(n){if(!u.test(n)){var r=Object.getOwnPropertyDescriptor(e,n);Object.defineProperty(t,n,r)}})}return r(this,t),t},configurable:!0})}},{"../config":4,"./flag":13,"./transferFlags":29}],10:[function(e,t,n){var r=e("../config"),i=e("./flag");t.exports=function(e,t,n){e[t]=function(){var s=i(this,"ssfi");s&&r.includeStack===!1&&i(this,"ssfi",e[t]);var o=n.apply(this,arguments);return o===undefined?this:o}}},{"../config":4,"./flag":13}],11:[function(e,t,n){var r=e("../config"),i=e("./flag");t.exports=function(e,t,n){Object.defineProperty(e,t,{get:function s(){var e=i(this,"ssfi");e&&r.includeStack===!1&&i(this,"ssfi",s);var t=n.call(this);return t===undefined?this:t},configurable:!0})}},{"../config":4,"./flag":13}],12:[function(e,t,n){var r=e("assertion-error"),i=e("./flag"),s=e("type-detect");t.exports=function(e,t){var e=i(e,"object");t=t.map(function(e){return e.toLowerCase()}),t.sort();var n=t.map(function(e,n){var r=~["a","e","i","o","u"].indexOf(e.charAt(0))?"an":"a",i=t.length>1&&n===t.length-1?"or ":"";return i+r+" "+e}).join(", ");if(!t.some(function(t){return s(e)===t}))throw new r("object tested must be "+n+", but "+s(e)+" given")}},{"./flag":13,"assertion-error":30,"type-detect":35}],13:[function(e,t,n){t.exports=function(e,t,n){var r=e.__flags||(e.__flags=Object.create(null));if(arguments.length!==3)return r[t];r[t]=n}},{}],14:[function(e,t,n){t.exports=function(e,t){return t.length>4?t[4]:e._obj}},{}],15:[function(e,t,n){t.exports=function(t){var n=[];for(var r in t)n.push(r);return n}},{}],16:[function(e,t,n){var r=e("./flag"),i=e("./getActual"),s=e("./inspect"),o=e("./objDisplay");t.exports=function(e,t){var n=r(e,"negate"),s=r(e,"object"),u=t[3],a=i(e,t),f=n?t[2]:t[1],l=r(e,"message");return typeof f=="function"&&(f=f()),f=f||"",f=f.replace(/#{this}/g,o(s)).replace(/#{act}/g,o(a)).replace(/#{exp}/g,o(u)),l?l+": "+f:f}},{"./flag":13,"./getActual":14,"./inspect":23,"./objDisplay":24}],17:[function(e,t,n){t.exports=function(e){if(e.name)return e.name;var t=/^\s?function ([^(]*)\(/.exec(e);return t&&t[1]?t[1]:""}},{}],18:[function(e,t,n){function i(e){var t=e.replace(/([^\\])\[/g,"$1.["),n=t.match(/(\\\.|[^.]+?)+/g);return n.map(function(e){var t=/^\[(\d+)\]$/,n=t.exec(e);return n?{i:parseFloat(n[1])}:{p:e.replace(/\\([.\[\]])/g,"$1")}})}function s(e,t,n){var r=t,i;n=n===undefined?e.length:n;for(var s=0,o=n;s<o;s++){var u=e[s];r?("undefined"!=typeof u.p?r=r[u.p]:"undefined"!=typeof u.i&&(r=r[u.i]),s==o-1&&(i=r)):i=undefined}return i}var r=e("./hasProperty");t.exports=function(t,n){var o=i(t),u=o[o.length-1],a={parent:o.length>1?s(o,n,o.length-1):n,name:u.p||u.i,value:s(o,n)};return a.exists=r(a.name,a.parent),a}},{"./hasProperty":21}],19:[function(e,t,n){var r=e("./getPathInfo");t.exports=function(e,t){var n=r(e,t);return n.value}},{"./getPathInfo":18}],20:[function(e,t,n){t.exports=function(t){function r(e){n.indexOf(e)===-1&&n.push(e)}var n=Object.getOwnPropertyNames(t),i=Object.getPrototypeOf(t);while(i!==null)Object.getOwnPropertyNames(i).forEach(r),i=Object.getPrototypeOf(i);return n}},{}],21:[function(e,t,n){var r=e("type-detect"),i={number:Number,string:String};t.exports=function(t,n){var s=r(n);return s==="null"||s==="undefined"?!1:(i[s]&&typeof n!="object"&&(n=new i[s](n)),t in n)}},{"type-detect":35}],22:[function(e,t,n){var n=t.exports={};n.test=e("./test"),n.type=e("type-detect"),n.expectTypes=e("./expectTypes"),n.getMessage=e("./getMessage"),n.getActual=e("./getActual"),n.inspect=e("./inspect"),n.objDisplay=e("./objDisplay"),n.flag=e("./flag"),n.transferFlags=e("./transferFlags"),n.eql=e("deep-eql"),n.getPathValue=e("./getPathValue"),n.getPathInfo=e("./getPathInfo"),n.hasProperty=e("./hasProperty"),n.getName=e("./getName"),n.addProperty=e("./addProperty"),n.addMethod=e("./addMethod"),n.overwriteProperty=e("./overwriteProperty"),n.overwriteMethod=e("./overwriteMethod"),n.addChainableMethod=e("./addChainableMethod"),n.overwriteChainableMethod=e("./overwriteChainableMethod")},{"./addChainableMethod":9,"./addMethod":10,"./addProperty":11,"./expectTypes":12,"./flag":13,"./getActual":14,"./getMessage":16,"./getName":17,"./getPathInfo":18,"./getPathValue":19,"./hasProperty":21,"./inspect":23,"./objDisplay":24,"./overwriteChainableMethod":25,"./overwriteMethod":26,"./overwriteProperty":27,"./test":28,"./transferFlags":29,"deep-eql":31,"type-detect":35}],23:[function(e,t,n){function o(e,t,n,r){var i={showHidden:t,seen:[],stylize:function(e){return e}};return a(i,e,typeof n=="undefined"?2:n)}function a(e,t,o){if(t&&typeof t.inspect=="function"&&t.inspect!==n.inspect&&(!t.constructor||t.constructor.prototype!==t)){var y=t.inspect(o);return typeof y!="string"&&(y=a(e,y,o)),y}var b=f(e,t);if(b)return b;if(u(t)){if("outerHTML"in t)return t.outerHTML;try{if(document.xmlVersion){var w=new XMLSerializer;return w.serializeToString(t)}var E="http://www.w3.org/1999/xhtml",S=document.createElementNS(E,"_");return S.appendChild(t.cloneNode(!1)),html=S.innerHTML.replace("><",">"+t.innerHTML+"<"),S.innerHTML="",html}catch(x){}}var T=s(t),N=e.showHidden?i(t):T;if(N.length===0||g(t)&&(N.length===1&&N[0]==="stack"||N.length===2&&N[0]==="description"&&N[1]==="stack")){if(typeof t=="function"){var C=r(t),k=C?": "+C:"";return e.stylize("[Function"+k+"]","special")}if(v(t))return e.stylize(RegExp.prototype.toString.call(t),"regexp");if(m(t))return e.stylize(Date.prototype.toUTCString.call(t),"date");if(g(t))return l(t)}var L="",A=!1,O=["{","}"];d(t)&&(A=!0,O=["[","]"]);if(typeof t=="function"){var C=r(t),k=C?": "+C:"";L=" [Function"+k+"]"}v(t)&&(L=" "+RegExp.prototype.toString.call(t)),m(t)&&(L=" "+Date.prototype.toUTCString.call(t));if(g(t))return l(t);if(N.length!==0||!!A&&t.length!=0){if(o<0)return v(t)?e.stylize(RegExp.prototype.toString.call(t),"regexp"):e.stylize("[Object]","special");e.seen.push(t);var M;return A?M=c(e,t,o,T,N):M=N.map(function(n){return h(e,t,o,T,n,A)}),e.seen.pop(),p(M,L,O)}return O[0]+L+O[1]}function f(e,t){switch(typeof t){case"undefined":return e.stylize("undefined","undefined");case"string":var n="'"+JSON.stringify(t).replace(/^"|"$/g,"").replace(/'/g,"\\'").replace(/\\"/g,'"')+"'";return e.stylize(n,"string");case"number":if(t===0&&1/t===-Infinity)return e.stylize("-0","number");return e.stylize(""+t,"number");case"boolean":return e.stylize(""+t,"boolean")}if(t===null)return e.stylize("null","null")}function l(e){return"["+Error.prototype.toString.call(e)+"]"}function c(e,t,n,r,i){var s=[];for(var o=0,u=t.length;o<u;++o)Object.prototype.hasOwnProperty.call(t,String(o))?s.push(h(e,t,n,r,String(o),!0)):s.push("");return i.forEach(function(i){i.match(/^\d+$/)||s.push(h(e,t,n,r,i,!0))}),s}function h(e,t,n,r,i,s){var o,u;t.__lookupGetter__&&(t.__lookupGetter__(i)?t.__lookupSetter__(i)?u=e.stylize("[Getter/Setter]","special"):u=e.stylize("[Getter]","special"):t.__lookupSetter__(i)&&(u=e.stylize("[Setter]","special"))),r.indexOf(i)<0&&(o="["+i+"]"),u||(e.seen.indexOf(t[i])<0?(n===null?u=a(e,t[i],null):u=a(e,t[i],n-1),u.indexOf("\n")>-1&&(s?u=u.split("\n").map(function(e){return"  "+e}).join("\n").substr(2):u="\n"+u.split("\n").map(function(e){return"   "+e}).join("\n"))):u=e.stylize("[Circular]","special"));if(typeof o=="undefined"){if(s&&i.match(/^\d+$/))return u;o=JSON.stringify(""+i),o.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)?(o=o.substr(1,o.length-2),o=e.stylize(o,"name")):(o=o.replace(/'/g,"\\'").replace(/\\"/g,'"').replace(/(^"|"$)/g,"'"),o=e.stylize(o,"string"))}return o+": "+u}function p(e,t,n){var r=0,i=e.reduce(function(e,t){return r++,t.indexOf("\n")>=0&&r++,e+t.length+1},0);return i>60?n[0]+(t===""?"":t+"\n ")+" "+e.join(",\n  ")+" "+n[1]:n[0]+t+" "+e.join(", ")+" "+n[1]}function d(e){return Array.isArray(e)||typeof e=="object"&&y(e)==="[object Array]"}function v(e){return typeof e=="object"&&y(e)==="[object RegExp]"}function m(e){return typeof e=="object"&&y(e)==="[object Date]"}function g(e){return typeof e=="object"&&y(e)==="[object Error]"}function y(e){return Object.prototype.toString.call(e)}var r=e("./getName"),i=e("./getProperties"),s=e("./getEnumerableProperties");t.exports=o;var u=function(e){return typeof HTMLElement=="object"?e instanceof HTMLElement:e&&typeof e=="object"&&e.nodeType===1&&typeof e.nodeName=="string"}},{"./getEnumerableProperties":15,"./getName":17,"./getProperties":20}],24:[function(e,t,n){var r=e("./inspect"),i=e("../config");t.exports=function(e){var t=r(e),n=Object.prototype.toString.call(e);if(i.truncateThreshold&&t.length>=i.truncateThreshold){if(n==="[object Function]")return!e.name||e.name===""?"[Function]":"[Function: "+e.name+"]";if(n==="[object Array]")return"[ Array("+e.length+") ]";if(n==="[object Object]"){var s=Object.keys(e),o=s.length>2?s.splice(0,2).join(", ")+", ...":s.join(", ");return"{ Object ("+o+") }"}return t}return t}},{"../config":4,"./inspect":23}],25:[function(e,t,n){t.exports=function(e,t,n,r){var i=e.__methods[t],s=i.chainingBehavior;i.chainingBehavior=function(){var e=r(s).call(this);return e===undefined?this:e};var o=i.method;i.method=function(){var e=n(o).apply(this,arguments);return e===undefined?this:e}}},{}],26:[function(e,t,n){t.exports=function(e,t,n){var r=e[t],i=function(){return this};r&&"function"==typeof r&&(i=r),e[t]=function(){var e=n(i).apply(this,arguments);return e===undefined?this:e}}},{}],27:[function(e,t,n){t.exports=function(e,t,n){var r=Object.getOwnPropertyDescriptor(e,t),i=function(){};r&&"function"==typeof r.get&&(i=r.get),Object.defineProperty(e,t,{get:function(){var e=n(i).call(this);return e===undefined?this:e},configurable:!0})}},{}],28:[function(e,t,n){var r=e("./flag");t.exports=function(e,t){var n=r(e,"negate"),i=t[0];return n?!i:i}},{"./flag":13}],29:[function(e,t,n){t.exports=function(e,t,n){var r=e.__flags||(e.__flags=Object.create(null));t.__flags||(t.__flags=Object.create(null)),n=arguments.length===3?n:!0;for(var i in r)if(n||i!=="object"&&i!=="ssfi"&&i!="message")t.__flags[i]=r[i]}},{}],30:[function(e,t,n){function r(){function t(t,n){Object.keys(n).forEach(function(r){~e.indexOf(r)||(t[r]=n[r])})}var e=[].slice.call(arguments);return function(){var n=[].slice.call(arguments),r=0,i={};for(;r<n.length;r++)t(i,n[r]);return i}}function i(e,t,n){var i=r("name","message","stack","constructor","toJSON"),s=i(t||{});this.message=e||"Unspecified AssertionError",this.showDiff=!1;for(var o in s)this[o]=s[o];n=n||arguments.callee,n&&Error.captureStackTrace?Error.captureStackTrace(this,n):this.stack=(new Error).stack}t.exports=i,i.prototype=Object.create(Error.prototype),i.prototype.name="AssertionError",i.prototype.constructor=i,i.prototype.toJSON=function(e){var t=r("constructor","toJSON","stack"),n=t({name:this.name},this);return!1!==e&&this.stack&&(n.stack=this.stack),n}},{}],31:[function(e,t,n){t.exports=e("./lib/eql")},{"./lib/eql":32}],32:[function(e,t,n){function o(e,t,n){return u(e,t)?!0:"date"===r(e)?f(e,t):"regexp"===r(e)?l(e,t):i.isBuffer(e)?d(e,t):"arguments"===r(e)?c(e,t,n):a(e,t)?"object"!==r(e)&&"object"!==r(t)&&"array"!==r(e)&&"array"!==r(t)?u(e,t):m(e,t,n):!1}function u(e,t){return e===t?e!==0||1/e===1/t:e!==e&&t!==t}function a(e,t){return r(e)===r(t)}function f(e,t){return"date"!==r(t)?!1:u(e.getTime(),t.getTime())}function l(e,t){return"regexp"!==r(t)?!1:u(e.toString(),t.toString())}function c(e,t,n){return"arguments"!==r(t)?!1:(e=[].slice.call(e),t=[].slice.call(t),o(e,t,n))}function h(e){var t=[];for(var n in e)t.push(n);return t}function p(e,t){if(e.length!==t.length)return!1;var n=0,r=!0;for(;n<e.length;n++)if(e[n]!==t[n]){r=!1;break}return r}function d(e,t){return i.isBuffer(t)?p(e,t):!1}function v(e){return e!==null&&e!==undefined}function m(e,t,n){if(!v(e)||!v(t))return!1;if(e.prototype!==t.prototype)return!1;var r;if(n){for(r=0;r<n.length;r++)if(n[r][0]===e&&n[r][1]===t||n[r][0]===t&&n[r][1]===e)return!0}else n=[];try{var i=h(e),s=h(t)}catch(u){return!1}i.sort(),s.sort();if(!p(i,s))return!1;n.push([e,t]);var a;for(r=i.length-1;r>=0;r--){a=i[r];if(!o(e[a],t[a],n))return!1}return!0}var r=e("type-detect"),i;try{i=e("buffer").Buffer}catch(s){i={},i.isBuffer=function(){return!1}}t.exports=o},{buffer:undefined,"type-detect":33}],33:[function(e,t,n){t.exports=e("./lib/type")},{"./lib/type":34}],34:[function(e,t,n){function i(e){var t=Object.prototype.toString.call(e);return r[t]?r[t]:e===null?"null":e===undefined?"undefined":e===Object(e)?"object":typeof e}function s(){this.tests={}}var n=t.exports=i,r={"[object Array]":"array","[object RegExp]":"regexp","[object Function]":"function","[object Arguments]":"arguments","[object Date]":"date"};n.Library=s,s.prototype.of=i,s.prototype.define=function(e,t){return arguments.length===1?this.tests[e]:(this.tests[e]=t,this)},s.prototype.test=function(e,t){if(t===i(e))return!0;var n=this.tests[t];if(n&&"regexp"===i(n))return n.test(e);if(n&&"function"===i(n))return n(e);throw new ReferenceError('Type test "'+t+'" not defined or invalid.')}},{}],35:[function(e,t,n){arguments[4][33][0].apply(n,arguments)},{"./lib/type":36,dup:33}],36:[function(e,t,n){function i(e){var t=Object.prototype.toString.call(e).match(r)[1].toLowerCase();return typeof Promise=="function"&&e instanceof Promise?"promise":e===null?"null":e===undefined?"undefined":t}function s(){if(!(this instanceof s))return new s;this.tests={}}var n=t.exports=i,r=/^\[object (.*)\]$/;n.Library=s,s.prototype.of=i,s.prototype.define=function(e,t){return arguments.length===1?this.tests[e]:(this.tests[e]=t,this)},s.prototype.test=function(e,t){if(t===i(e))return!0;var n=this.tests[t];if(n&&"regexp"===i(n))return n.test(e);if(n&&"function"===i(n))return n(e);throw new ReferenceError('Type test "'+t+'" not defined or invalid.')}},{}]},{},[1])(1)}),define("back4app-entity/utils/classes",["require","exports","module","util","chai"],function(e,t,n){function s(e,t){i(arguments).to.have.length(2,"Invalid argument length when generalizing classes (it has to be passed 2 arguments)"),i(e).to.be.a("function",'Invalid argument "GeneralClass" when generalizing classes (it has to be a function)'),i(t).to.be.a("function",'Invalid argument "SpecificClass" when generalizing classes (ut has to be a function)'),r.inherits(t,e);for(var n in e)n!=="super_"&&(t[n]=e[n])}function o(e,t){i(arguments).to.have.length(2,"Invalid argument length when checking if a class is general of another (it has to be passed 2 arguments)"),i(e).to.be.a("function",'Invalid argument "GeneralClass" when checking if a class is general of another (it has to be a function)'),i(t).to.be.a("function",'Invalid argument "SpecificClass" when checking if a class is general of another (ut has to be a function)');var n=[],r=t;while(r&&n.indexOf(r)===-1){if(r===e)return!0;n.push(r),r=r.super_}return!1}var r=e("util"),i=e("chai").expect;n.exports={},n.exports.generalize=s,n.exports.isGeneral=o}),define("back4app-entity/utils/objects",["require","exports","module","chai"],function(e,t,n){function i(e){r(arguments).to.have.length(1,"Invalid argument length when copying an object (it has to be passed 1 argument)"),r(e).to.be.an("object",'Invalid argument "o" when copying an object (it has to be an object)');var t={};for(var n in e)t[n]=e[n];return t}var r=e("chai").expect;n.exports={},n.exports.copy=i}),define("back4app-entity/utils/index",["require","exports","module","./classes","./objects"],function(e,t,n){var r=e("./classes"),i=e("./objects");n.exports={},n.exports.classes=r,n.exports.objects=i}),define("back4app-entity/utils",["back4app-entity/utils/index"],function(e){return e}),define("back4app-entity/settings",["require","exports","module"],function(e,t,n){n.exports={},n.exports.ADAPTERS={}}),define("back4app-entity/adapters/Adapter",["require","exports","module","chai","../utils"],function(e,t,n){"use strict";function s(){r(this).to.be.an("object","The Adapter's constructor can be only invoked from specializedclasses' constructors"),r(this.constructor).to.be.a("function","The Adapter's constructor can be only invoked from specializedclasses' constructors"),r(this.constructor).to.not.equal(s,"The Adapter is an abstract class and cannot be directly initialized"),r(this).to.be.instanceof(s,"The Adapter's constructor can be only invoked from specializedclasses' constructors"),r(i.isGeneral(s,this.constructor)).to.equal(!0,"The Adapter's constructor can be only invoked from specializedclasses' constructors")}var r=e("chai").expect,i=e("../utils").classes;n.exports=s}),define("back4app-entity/models/errors",["require","exports","module","util","chai"],function(e,t,n){function s(e,t){this.entity=e,this.innerError=t,i(arguments).to.have.length.below(3,"Invalid arguments length when creating a new EntityNotFoundError (it has to be passed less than 3 arguments)"),this.name="EntityNotFoundError",this.message="Cannot find Entity",e&&(i(e).to.be.a("string",'Invalid argument "entity" when creating a new EntityNotFoundError (it has to be a string)'),this.message+=' "'+e+'"'),this.stack=(new Error(this.message)).stack,t&&(i(t).to.be.an.instanceof(Error,'Invalid argument "innerError" when creating a new EntityNotFoundError (it has to be an Error)'),this.stack+="\n\n"+t.stack)}function o(e,t){this.type=e,this.innerError=t,i(arguments).to.have.length.below(3,"Invalid arguments length when creating a new AttributeTypeNotFoundError (it has to be passed less than 3 arguments)"),this.name="AttributeTypeNotFoundError",this.message="Cannot find Attribute type",e&&(i(e).to.be.a("string",'Invalid argument "type" when creating a new AttributeTypeNotFoundError (it has to be a string)'),this.message+=' "'+e+'"'),this.stack=(new Error(this.message)).stack,t&&(i(t).to.be.an.instanceof(Error,'Invalid argument "innerError" when creating a new AttributeTypeNotFoundError (it has to be an Error)'),this.stack+="\n\n"+t.stack)}function u(e,t,n,r,s){this.validationMessage=e,this.entity=t,this.attribute=n,this.position=r,this.innerError=s,i(arguments).to.have.length.below(6,"Invalid arguments length when creating a new AttributeTypeNotFoundError (it has to be passed less than 6 arguments)"),this.name="ValidationError",this.message="Error when validating an attribute",n&&(i(n).to.be.a("string",'Invalid argument "attribute" when creating a new ValidationError (it has to be a string)'),this.message+=' called "'+n+'"'),this.message+=" of an entity",t&&(i(t).to.be.a("string",'Invalid argument "entity" when creating a new ValidationError (it has to be a string)'),this.message+=' called "'+t+'"'),r&&(i(["string","number"]).to.include(typeof r,'Invalid argument "position" when creating a new ValidationError (it has to be a string or a number)'),this.message+=" in position "+r),e&&(i(e).to.be.a("string",'Invalid argument "validationMessage" when creating a new ValidationError (it has to be a string)'),this.message+=": "+e),this.stack=(new Error(this.message)).stack,s&&(i(s).to.be.an.instanceof(Error,'Invalid argument "innerError" when creating a new ValidationError (it has to be an Error)'),this.stack+="\n\n"+s.stack)}function a(e,t){this.adapterName=e,this.innerError=t,i(arguments).to.have.length.below(3,"Invalid arguments length when creating a new EntityNotFoundError (it has to be passed less than 3 arguments)"),this.name="AdapterNotFoundError",this.message="Cannot find Adapter",e&&(i(e).to.be.a("string",'Invalid argument "adapterName" when creating a new AdapterNotFoundError (it has to be a string)'),this.message+=' "'+e+'"'),this.stack=(new Error(this.message)).stack,t&&(i(t).to.be.an.instanceof(Error,'Invalid argument "innerError" when creating a new AdapterNotFoundError (it has to be an Error)'),this.stack+="\n\n"+t.stack)}var r=e("util"),i=e("chai").expect;n.exports={},n.exports.EntityNotFoundError=s,n.exports.AttributeTypeNotFoundError=o,n.exports.ValidationError=u,n.exports.AdapterNotFoundError=a,r.inherits(s,Error),r.inherits(o,Error),r.inherits(u,Error),r.inherits(a,Error)}),define("back4app-entity/models/attributes/Attribute",["require","exports","module","chai","../../utils/classes","../../utils/objects","../errors","../index","./index"],function(e,t,n){function l(){this.name=null,this.type=null,this.multiplicity=null,this.default=null,r(this).to.be.an("object","The Attribute's constructor can be only invoked from specializedclasses' constructors"),r(this.constructor).to.be.a("function","The Attribute's constructor can be only invoked from specializedclasses' constructors"),r(this.constructor).to.not.equal(l,"The Attribute is an abstract class and cannot be directly initialized"),r(this).to.be.instanceof(l,"The Attribute's constructor can be only invoked from specializedclasses' constructors"),r(i.isGeneral(l,this.constructor)).to.equal(!0,"The Attribute's constructor can be only invoked from specializedclasses' constructors");var e=null,t=this.constructor,n="1",s=null;r(arguments).to.have.length.within(1,3,"Invalid arguments length when creating an Attribute (it has to be passed from 1 to 3 arguments)");if(arguments.length===1&&typeof arguments[0]!="string"){var o=arguments[0];r(o).to.be.an("object","Invalid argument type when creating an Attribute (it has to be an object or a string)"),r(o).to.have.ownProperty("name",'Property "name" is required when creating an Attribute'),r(o.name).to.be.a("string",'Invalid property "name" when creating an Attribute (it has to be a string)'),e=o.name;for(var u in o)r(["name","multiplicity","default"]).to.include(u,'Invalid property "'+u+'" when creating an Attribute '+'called "'+e+'" (valid properties are "name", "type", '+'"multiplicity" and "default")');o.hasOwnProperty("multiplicity")&&(r(o.multiplicity).to.be.a("string",'Invalid property "multiplicity" when creating an Attribute called "'+e+'" (it has to be a string'),r(["1","0..1","1..*","*"]).to.contain(o.multiplicity,'Invalid property "multiplicity" when creating an Attribtue called "'+e+'" (valid values are "1", "0..1", "1..*", "*")'),n=o.multiplicity),o.hasOwnProperty("default")&&(s=o.default)}else r(arguments[0]).to.be.a("string",'Invalid argument "name" when creating an Attribute (it has to be a string)'),e=arguments[0],arguments.length>1&&(r(arguments[1]).to.be.a("string",'Invalid argument "multiplicity" when creating an Attribute called "'+e+'" (it has to be a string)'),r(["1","0..1","1..*","*"]).to.contain(arguments[1],'Invalid argument "multiplicity" when creating an Attribtue called "'+e+'" (valid values are "1", "0..1", "1..*", "*")'),n=arguments[1]),arguments.length>2&&(s=arguments[2]);Object.defineProperty(this,"name",{value:e,enumerable:!0,writable:!1,configurable:!1}),Object.defineProperty(this,"type",{value:t,enumerable:!0,writable:!1,configurable:!1}),Object.defineProperty(this,"multiplicity",{value:n,enumerable:!0,writable:!1,configurable:!1}),Object.defineProperty(this,"default",{value:s,enumerable:!0,writable:!1,configurable:!1}),Object.preventExtensions(this),Object.seal(this)}function c(){r(arguments).to.have.length.within(1,4,"Invalid arguments length when resolving an Attribute (it has to be passed from 1 to 4 arguments)");var e=Array.prototype.slice.call(arguments),t=f.types.ObjectAttribute;if(arguments.length===1&&typeof arguments[0]!="string"){var n=s.copy(arguments[0]);e[0]=n,r(n).to.be.an("object","Invalid argument type when resolving an Attribute (it has to be an object)");if(n.type){r(n.type).to.be.a("string",'Invalid argument "type" when resolving an Attribute'+(n.name?" called"+n.name:"")+" (it has to be a string)");try{t=f.types.get(n.type)}catch(i){if(!(i instanceof o.AttributeTypeNotFoundError))throw i;t=f.types.AssociationAttribute,n.entity=n.type}delete n.type}}else if(arguments.length>1){r(arguments[1]).to.be.a("string",'Invalid argument "type" when resolving an Attribute'+(arguments[0]?" called"+arguments[0]:"")+" (it has to be a string)");try{t=f.types.get(arguments[1])}catch(i){if(!(i instanceof o.AttributeTypeNotFoundError))throw i;t=f.types.AssociationAttribute,e.splice(2,0,arguments[1])}e.splice(1,1)}return new(Function.prototype.bind.apply(t,[null].concat(e)))}function h(e){return r(arguments).to.have.length(1,"Invalid arguments length when getting the default value of an Attribute to an Entity instance (it has to be given 1 argument)"),r(e).to.be.an.instanceOf(a.Entity,'Invalid type of argument "entity" when getting the default value of an Attribute to an Entity instance (it has to be an Entity)'),typeof this.default=="function"?this.default.call(e):this.default}function p(e){r(arguments).to.have.length(1,"Invalid argument length when validating an attribute of an entity (it has to be passed 1 argument)"),r(e).to.be.instanceof(a.Entity,'Invalid argument "entity" when validating an attribute of an entity (it has to be an Entity)');var t=null;e.hasOwnProperty(this.name)&&(t=e[this.name]);if((this.multiplicity==="1"||this.multiplicity==="1..*")&&t===null)throw new u("this attribute is required",e.Entity.specification.name,this.name);if(this.multiplicity==="0..1"&&t!==null||this.multiplicity==="1")try{this.validateValue(t)}catch(n){throw n instanceof u?new u(n.validationMessage,e.Entity.specification.name,this.name):n}else if(this.multiplicity==="*"&&t!==null||this.multiplicity==="1..*"){if(!(t instanceof Array))throw new u("this attribute's value should be an Array",e.Entity.specification.name,this.name);var i=!1;for(var s=0;s<t.length;s++)if(t[s]!==null){try{this.validateValue(t[s])}catch(n){throw n instanceof u?new u(n.validationMessage,e.Entity.specification.name,this.name,s):n}i=!0}if(this.multiplicity==="1..*"&&!i)throw new u("this attribute's value should be a non empty Array",e.Entity.specification.name,this.name)}}function d(){}var r=e("chai").expect,i=e("../../utils/classes"),s=e("../../utils/objects"),o=e("../errors"),u=o.ValidationError,a=e("../index"),f=e("./index");n.exports=l,l.resolve=c,l.prototype.getDefaultValue=h,l.prototype.validate=p,l.prototype.validateValue=d}),define("back4app-entity/models/attributes/AttributeDictionary",["require","exports","module","chai","./Attribute"],function(e,t,n){function s(e){r(arguments).to.have.length.below(2,"Invalid arguments length when creating an AttributeDictionary (it has to be passed less than 2 arguments)");if(e){r(typeof e).to.equal("object","Invalid argument type when creating an AttributeDictionary (it has to be an object)");if(e instanceof Array)for(var t=0;t<e.length;t++)o(this,e[t]);else for(var n in e)o(this,e[n],n)}Object.preventExtensions(this),Object.seal(this)}function o(){var e=arguments[0],t=null,n=null;arguments.length===2?t=arguments[1]:(t=arguments[1],n=arguments[2]),r(t).to.be.an("object","Invalid argument type when adding an attribute "+(n?'called "'+n+'" ':"")+"in an AttributeDictionary (it has to be an object)"),n&&(t.name?r(t.name).to.equal(n,'Invalid argument "name" when adding an attribute called "'+t.name+'" in an AttributeDictionary (the name given in '+"argument and the name given in the attribute object should be equal)"):t.name=n),t instanceof i||(t=i.resolve(t)),r(t.constructor).to.not.equal(i,'Invalid attribute "'+t.name+'". Attribute is an abstract '+"class and cannot be directly instantiated and added in an "+"AttributeDictionary"),r(e).to.not.have.ownProperty(t.name,'Duplicated attribute name "'+t.name+'"'),Object.defineProperty(e,t.name,{value:t,enumerable:!0,writable:!1,configurable:!1})}function u(e,t){r(arguments).to.have.length(2,"Invalid arguments length when concatenating an AttributeDictionary (it has to be passed 2 arguments)"),r(e).to.be.instanceof(s,'Invalid argument "attributeDictionary" when concatenating an AttributeDictionary (it has to be an AttributeDictionary)'),r(t).to.be.instanceof(i,'Invalid argument "attribute" when concatenating an AttributeDictionary (it has to be an Attribute)');var n=[];for(var o in e)n.push(e[o]);return n.push(t),new s(n)}var r=e("chai").expect,i=e("./Attribute");n.exports=s,s.concat=u}),define("back4app-entity/models/attributes/types/AssociationAttribute",["require","exports","module","chai","../../../utils/classes","../../../utils/objects","../../index","../../errors","../Attribute"],function(e,t,n){function f(){this.Entity=null;var e=null;Object.defineProperty(this,"Entity",{get:function(){return typeof e=="string"&&(e=o.Entity.getSpecialization(e)),e},set:function(){throw new Error("Entity property of an AssociationAttribute instance cannot be changed")},enumerable:!0,configurable:!1});var t=Array.prototype.slice.call(arguments);r(t).to.have.length.within(1,4,"Invalid arguments length when creating an AssociationAttribute (it has to be passed from 1 to 4 arguments)");if(t.length===1){var n=t[0];r(n).to.be.an("object","Invalid argument type when creating an Attribute (it has to be an object)"),n=s.copy(n),e=n.entity,e?delete n.entity:(r(n).to.have.ownProperty("Entity",'Property "entity" or "Entity" is required when creating an AssociationAttribute'),e=n.Entity,delete n.Entity),t[0]=n}else e=t.splice(1,1)[0];typeof e!="string"&&(r(e).to.be.a("function",'Invalid argument "entity" when creating an AssociationAttribute (it has to be a Class)'),r(i.isGeneral(o.Entity,e)).to.equal(!0,'Invalid argument "entity" when creating an AssociationAttribute (it has to be a subclass of Entity)')),a.apply(this,t)}function l(e){if(!(e instanceof this.Entity))throw new u("this attribute's value should be a \""+this.Entity.specification.name+'"')}var r=e("chai").expect,i=e("../../../utils/classes"),s=e("../../../utils/objects"),o=e("../../index"),u=e("../../errors").ValidationError,a=e("../Attribute");n.exports=f,i.generalize(a,f),f.typeName="Association",f.prototype.validateValue=l}),define("back4app-entity/models/attributes/types/BooleanAttribute",["require","exports","module","../../../utils/classes","../../errors","../Attribute"],function(e,t,n){function o(){s.apply(this,Array.prototype.slice.call(arguments))}function u(e){if(typeof e!="boolean")throw new i("this attribute's value should be a boolean")}var r=e("../../../utils/classes"),i=e("../../errors").ValidationError,s=e("../Attribute");n.exports=o,r.generalize(s,o),o.typeName="Boolean",o.prototype.validateValue=u}),define("back4app-entity/models/attributes/types/DateAttribute",["require","exports","module","../../../utils/classes","../../errors","../Attribute"],function(e,t,n){function o(){s.apply(this,Array.prototype.slice.call(arguments))}function u(e){if(!(e instanceof Date))throw new i("this attribute's value should be a Date")}var r=e("../../../utils/classes"),i=e("../../errors").ValidationError,s=e("../Attribute");n.exports=o,r.generalize(s,o),o.typeName="Date",o.prototype.validateValue=u}),define("back4app-entity/models/attributes/types/NumberAttribute",["require","exports","module","../../../utils/classes","../../errors","../Attribute"],function(e,t,n){function o(){s.apply(this,Array.prototype.slice.call(arguments))}function u(e){if(typeof e!="number"&&!(e instanceof Number))throw new i("this attribute's value should be a number")}var r=e("../../../utils/classes"),i=e("../../errors").ValidationError,s=e("../Attribute");n.exports=o,r.generalize(s,o),o.typeName="Number",o.prototype.validateValue=u}),define("back4app-entity/models/attributes/types/ObjectAttribute",["require","exports","module","../../../utils/classes","../../errors","../Attribute"],function(e,t,n){function o(){s.apply(this,Array.prototype.slice.call(arguments))}function u(e){if(typeof e!="object"||e===null)throw new i("this attribute's value should be an object")}var r=e("../../../utils/classes"),i=e("../../errors").ValidationError,s=e("../Attribute");n.exports=o,r.generalize(s,o),o.typeName="Object",o.prototype.validateValue=u}),define("back4app-entity/models/attributes/types/StringAttribute",["require","exports","module","../../../utils/classes","../../errors","../Attribute"],function(e,t,n){function o(){s.apply(this,Array.prototype.slice.call(arguments))}function u(e){if(typeof e!="string"&&!(e instanceof String))throw new i("this attribute's value should be a string")}var r=e("../../../utils/classes"),i=e("../../errors").ValidationError,s=e("../Attribute");n.exports=o,r.generalize(s,o),o.typeName="String",o.prototype.validateValue=u}),define("back4app-entity/models/attributes/types/index",["require","exports","module","chai","../../errors","./AssociationAttribute","./BooleanAttribute","./DateAttribute","./NumberAttribute","./ObjectAttribute","./StringAttribute","../index"],function(e,t,n){function c(e){r(arguments).to.have.length(1,"Invalid arguments length when getting an Attribute type (it has to be passed 1 argument)"),r(e).to.be.a("string",'Invalid argument "type" when getting an Attribute type (it has to be a string');if(n.exports.hasOwnProperty(e))return n.exports[e];if(n.exports.hasOwnProperty(e+"Attribute"))return n.exports[e+"Attribute"];throw new i(e)}var r=e("chai").expect,i=e("../../errors").AttributeTypeNotFoundError,s=e("./AssociationAttribute"),o=e("./BooleanAttribute"),u=e("./DateAttribute"),a=e("./NumberAttribute"),f=e("./ObjectAttribute"),l=e("./StringAttribute");n.exports={},n.exports.AssociationAttribute=s,n.exports.BooleanAttribute=o,n.exports.DateAttribute=u,n.exports.NumberAttribute=a,n.exports.ObjectAttribute=f,n.exports.StringAttribute=l,n.exports.get=null,e("../index").types=n.exports,Object.defineProperty(n.exports,"get",{value:c,enumerable:!1,writable:!1,configurable:!0})}),define("back4app-entity/models/attributes/types",["back4app-entity/models/attributes/types/index"],function(e){return e}),define("back4app-entity/models/attributes/index",["require","exports","module","./Attribute","./AttributeDictionary","./types"],function(e,t,n){var r=e("./Attribute"),i=e("./AttributeDictionary"),s=e("./types");n.exports={},n.exports.Attribute=r,n.exports.AttributeDictionary=i,n.exports.types=s}),define("back4app-entity/models/attributes",["back4app-entity/models/attributes/index"],function(e){return e}),define("back4app-entity/models/methods",["require","exports","module","chai"],function(e,t,n){function i(e){r(arguments).to.have.length.below(2,"Invalid arguments length when creating a new MethodDictionary (it has to be passed less than 2 arguments)");if(e){r(e).to.be.an("object","Invalid argument type when creating a new MethodDictionary (it has to be an object)");for(var t in e)s(this,e[t],t)}Object.preventExtensions(this),Object.seal(this)}function s(e,t,n){r(t).to.be.a("function",'Invalid argument "func" when adding a method called "'+n+'" in a '+"MethodDictionary (it has to be a function)"),Object.defineProperty(e,n,{value:t,enumerable:!0,writable:!1,configurable:!1})}function o(e,t,n){r(arguments).to.have.length(3,"Invalid arguments length when concatenating a MethodDictionary (it has to be passed 3 arguments)"),r(e).to.be.instanceof(i,'Invalid argument "methodDictionary" when concatenating a MethodDictionary (it has to be a MethodDictionary)'),r(t).to.be.a("function",'Invalid argument "func" when concatenating a MethodDictionary (it has to be a function)'),r(n).to.be.a("string",'Invalid argument "name" when concatenating a MethodDictionary (it has to be a string)'),r(e).to.not.have.ownProperty(n,'Duplicated method name "'+n+'"');var s={};for(var o in e)s[o]=e[o];return s[n]=t,new i(s)}var r=e("chai").expect;n.exports={},n.exports.MethodDictionary=i,i.concat=o}),define("back4app-entity/models/EntitySpecification",["require","exports","module","chai","../utils/classes","./index","./attributes","./methods"],function(e,t,n){function a(){function p(){if(e){for(var t in n)d(n[t]);for(var r in a)v(a[r],r)}}function d(t){r(a).to.not.have.ownProperty(t.name,'failed to load entity attribute "'+t.name+'" because '+"there is a method with same name in the current Entity and it cannot "+"be overloaded"),e.General&&(r(e.General.attributes).to.not.have.ownProperty(t.name,'failed to load entity attribute "'+t.name+'" because '+"there is an attribute with same name in a parent of current Entity "+"and it cannot be overriden"),r(e.General.methods).to.not.respondTo(t.name,'failed to load entity attribute "'+t.name+'" because '+"there is a method with same name in a parent of current Entity "+"and it cannot be overriden"));var n=e.specializations;for(var i in n)r(n[i].specification.attributes).to.not.have.ownProperty(t.name,'failed to load entity attribute "'+t.name+'" because '+"there is an attribute with same name in a child of current Entity"),r(n[i].specification.methods).to.not.have.ownProperty(t.name,'failed to load entity attribute "'+t.name+'" because '+"there is a method with same name in a child of current Entity")}function v(t,i){r(n).to.not.have.ownProperty(i,'failed to load entity method "'+i+'" because there is an '+"attribute with same name in the current Entity and it cannot be "+"overloaded"),e.General&&r(e.General.attributes).to.not.have.ownProperty(i,'failed to load entity method "'+i+'" because there is an '+"attribute with same name in a parent of current Entity and it "+"cannot be overriden");var s=e.specializations;for(var o in s)r(s[o].specification.attributes).to.not.have.ownProperty(i,'failed to load entity method "'+i+'" because there is an '+"attribute with same name in a child of current Entity");e.prototype[i]=t}function m(){var t=arguments.length===1&&arguments[0]instanceof o.Attribute?arguments[0]:o.Attribute.resolve.apply(null,Array.prototype.slice.call(arguments)),r=o.AttributeDictionary.concat(n,t);e&&d(t),n=r}function g(t,n){var r=u.MethodDictionary.concat(a,t,n);e&&v(t,n),a=r}this.Entity=null,this.name=null,this.attributes=null,this.methods=null,this.addAttribute=m,this.addMethod=g;var e=null;Object.defineProperty(this,"Entity",{get:function(){return e},set:function(t){if(!!e)throw new Error('Once that the property "Entity" of an EntitySpecification instance is assigned, it can not be assigned anymore');r(i.isGeneral(s.Entity,t)).to.equal(!0,'The property "Entity" of an EntitySpecification instance has to be an Entity class'),t.specification&&r(t.specification).to.equal(this,'The property "Specification" of the Entity class should be equal to the current SpecificationEntity instance.'),e=t,p()},enumerable:!0,configurable:!1});var t=null,n=new o.AttributeDictionary;Object.defineProperty(this,"attributes",{get:function(){return n},set:function(){throw new Error("Attributes of an EntitySpecification instance cannot be changed")},enumerable:!0,configurable:!1});var a=new u.MethodDictionary;Object.defineProperty(this,"methods",{get:function(){return a},set:function(){throw new Error("Methods of an EntitySpecification instance cannot be changed")},enumerable:!0,configurable:!1}),r(arguments).to.have.length.within(1,3,"Invalid arguments length when creating a new EntitySpecification (it has to be passed from 1 to 3 arguments)");if(arguments.length===1&&typeof arguments[0]!="string"){var f=arguments[0];r(f).to.be.an("object","Invalid argument type when creating a new EntitySpecification (it has to be an object or a string)");for(var l in f)r(["name","attributes","methods"]).to.include(l,'Invalid property "'+l+'" when creating a new '+'EntitySpecification (valid properties are "name", "attributes" and '+'"methods")');r(f).to.have.ownProperty("name",'Property "name" is required when creating a new EntitySpecification'),r(f.name).to.be.a("string",'Invalid property "name" when creating a new EntitySpecification (it has to be a string)'),t=f.name,f.attributes&&(r(typeof f.attributes).to.equal("object",'Invalid property "attributes" when creating a new EntitySpecification (it has to be an object)'),f.attributes instanceof o.AttributeDictionary?n=f.attributes:n=new o.AttributeDictionary(f.attributes)),f.methods&&(r(f.methods).to.be.an("object",'Invalid property "methods" when creating a new EntitySpecification (it has to be an object)'),f.methods instanceof u.MethodDictionary?a=f.methods:a=new u.MethodDictionary(f.methods))}else{r(arguments[0]).to.be.a("string","Invalid argument type when creating a new EntitySpecification (it has to be an object or a string)"),t=arguments[0];if(arguments.length>1&&arguments[1]){var c=arguments[1];r(typeof c).to.equal("object",'Invalid argument "attributes" when creating a new EntitySpecification (it has to be an object)'),c instanceof o.AttributeDictionary?n=c:n=new o.AttributeDictionary(c)}if(arguments.length>2&&arguments[2]){var h=arguments[2];r(h).to.be.an("object",'Invalid argument "methods" when creating a new EntitySpecification (it has to be an object)'),h instanceof u.MethodDictionary?a=h:a=new u.MethodDictionary(h)}}Object.defineProperty(this,"name",{get:function(){return t},set:function(){throw new Error("Name of an EntitySpecification instance cannot be changed")},enumerable:!0,configurable:!1}),p(),Object.preventExtensions(this),Object.seal(this)}var r=e("chai").expect,i=e("../utils/classes"),s=e("./index"),o=e("./attributes"),u=e("./methods");n.exports=a}),function(){function l(e,t,n){var r=t&&n||0,i=0;t=t||[],e.toLowerCase().replace(/[0-9a-f]{2}/g,function(e){i<16&&(t[r+i++]=a[e])});while(i<16)t[r+i++]=0;return t}function c(e,t){var n=t||0,r=u;return r[e[n++]]+r[e[n++]]+r[e[n++]]+r[e[n++]]+"-"+r[e[n++]]+r[e[n++]]+"-"+r[e[n++]]+r[e[n++]]+"-"+r[e[n++]]+r[e[n++]]+"-"+r[e[n++]]+r[e[n++]]+r[e[n++]]+r[e[n++]]+r[e[n++]]+r[e[n++]]}function g(e,t,n){var r=t&&n||0,i=t||[];e=e||{};var s=e.clockseq!=null?e.clockseq:d,o=e.msecs!=null?e.msecs:(new Date).getTime(),u=e.nsecs!=null?e.nsecs:m+1,a=o-v+(u-m)/1e4;a<0&&e.clockseq==null&&(s=s+1&16383),(a<0||o>v)&&e.nsecs==null&&(u=0);if(u>=1e4)throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");v=o,m=u,d=s,o+=122192928e5;var f=((o&268435455)*1e4+u)%4294967296;i[r++]=f>>>24&255,i[r++]=f>>>16&255,i[r++]=f>>>8&255,i[r++]=f&255;var l=o/4294967296*1e4&268435455;i[r++]=l>>>8&255,i[r++]=l&255,i[r++]=l>>>24&15|16,i[r++]=l>>>16&255,i[r++]=s>>>8|128,i[r++]=s&255;var h=e.node||p;for(var g=0;g<6;g++)i[r+g]=h[g];return t?t:c(i)}function y(e,n,r){var i=n&&r||0;typeof e=="string"&&(n=e=="binary"?new o(16):null,e=null),e=e||{};var s=e.random||(e.rng||t)();s[6]=s[6]&15|64,s[8]=s[8]&63|128;if(n)for(var u=0;u<16;u++)n[i+u]=s[u];return n||c(s)}var e=this,t;if(typeof e.require=="function")try{var n=e.require("crypto").randomBytes;t=n&&function(){return n(16)}}catch(r){}if(!t&&e.crypto&&crypto.getRandomValues){var i=new Uint8Array(16);t=function(){return crypto.getRandomValues(i),i}}if(!t){var s=new Array(16);t=function(){for(var e=0,t;e<16;e++)(e&3)===0&&(t=Math.random()*4294967296),s[e]=t>>>((e&3)<<3)&255;return s}}var o=typeof e.Buffer=="function"?e.Buffer:Array,u=[],a={};for(var f=0;f<256;f++)u[f]=(f+256).toString(16).substr(1),a[u[f]]=f;var h=t(),p=[h[0]|1,h[1],h[2],h[3],h[4],h[5]],d=(h[6]<<8|h[7])&16383,v=0,m=0,b=y;b.v1=g,b.v4=y,b.parse=l,b.unparse=c,b.BufferClass=o;if(typeof module!="undefined"&&module.exports)module.exports=b;else if(typeof define=="function"&&define.amd)define("node-uuid",[],function(){return b});else{var w=e.uuid;b.noConflict=function(){return e.uuid=w,b},e.uuid=b}}.call(this),define("back4app-entity/models/Entity",["require","exports","module","chai","../settings","../utils/classes","../utils/objects","../adapters/Adapter","./EntitySpecification","./attributes/AttributeDictionary","./methods","./errors","node-uuid","./index"],function(e,t,n){"use strict";function v(e){if(!this.hasOwnProperty("Entity")||!this.Entity)this.Entity=null;this.General=null,this.id=null,(!this.hasOwnProperty("Entity")||!this.Entity)&&Object.defineProperty(this,"Entity",{value:v,enumerable:!1,writable:!1,configurable:!0}),Object.defineProperty(this,"General",{get:function(){return this.Entity.General},set:function(){throw new Error("General property of an Entity instance cannot be changed")},enumerable:!1,configurable:!0}),i(arguments).to.have.length.below(2,'Invalid arguments length when creating "'+this.Entity.specification.name+'" (it has to be passed less than 2 arguments)'),e&&i(e).to.be.an("object",'Invalid argument "attributeValues" when creating a new "'+this.Entity.specification.name+'" (it has to be an object)');var t=this.Entity.attributes;for(var n in e)i(t,'Invalid property "'+n+'" when creating a new "'+this.Entity.specification.name+'" (it does not exist)').to.include.keys(n);for(n in t){var r=null;e&&e.hasOwnProperty(n)&&(r=e[n]),Object.defineProperty(this,n,{value:r,enumerable:!0,writable:!0,configurable:n==="id"})}for(n in t)this[n]===null&&t[n].default!==null&&(this[n]=t[n].getDefaultValue(this));var s="^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$";i((new RegExp(s)).test(this.id)).to.equal(!0,'Invalid property "id" when creating a new "'+this.Entity.specification.name+'" (it has to be a valid uuid)'),Object.defineProperty(this,"id",{value:this.id,enumerable:!0,writable:!1,configurable:!1})}function E(){if(!w)try{i(o).to.have.ownProperty("ADAPTERS"),i(o.ADAPTERS).to.have.ownProperty("default"),i(o.ADAPTERS.default).to.be.an.instanceOf(f),w=o.ADAPTERS.default}catch(e){throw e instanceof s?new p.AdapterNotFoundError("default",e):e}return w}function S(e,t){for(var n in e)t.hasOwnProperty(n)||(t[n]=e[n],S(e[n].directSpecializations,t))}function C(e){i(arguments).to.have.length.below(2,"Invalid arguments length when validating an Entity (it has to be passed less than 2 arguments)");var t=this.Entity.attributes;if(e){i(e).to.be.a("string",'Invalid argument "attribute" when validating an Entity (it has to be a string)'),i(t).to.have.ownProperty(e,'Invalid argument "attribute" when validating an Entity (this attribute does not exist in the Entity)');var n={};n[e]=t[e],t=n}for(e in t)t[e].validate(this)}function k(e){try{this.validate(e)}catch(t){if(t instanceof p.ValidationError)return!1;throw t}return!0}var r=e("chai"),i=r.expect,s=r.AssertionError,o=e("../settings"),u=e("../utils/classes"),a=e("../utils/objects"),f=e("../adapters/Adapter"),l=e("./EntitySpecification"),c=e("./attributes/AttributeDictionary"),h=e("./methods").MethodDictionary,p=e("./errors"),d=e("node-uuid");n.exports=v,e("./index").Entity=v,v.adapter=null,v.General=null,v.specification=null,v.attributes=null,v.methods=null,v.directSpecializations=null,v.specializations=null,v.specify=null,v.getSpecialization=null,v.new=null,v.prototype.validate=C,v.prototype.isValid=k,Object.defineProperty(v,"adapter",{get:E,set:function(){throw new Error("Adapter property of an Entity class cannot be changed")},enumerable:!1,configurable:!1}),Object.defineProperty(v,"General",{value:null,enumerable:!0,writable:!1,configurable:!1});var m=new c({id:{type:"String","default":d.v4}}),g=new l("Entity",m);Object.defineProperty(v,"specification",{value:g,enumerable:!0,writable:!1,configurable:!1}),g.Entity=v,Object.defineProperty(v,"attributes",{value:m,enumerable:!0,writable:!1,configurable:!1}),Object.defineProperty(v,"methods",{value:{},enumerable:!0,writable:!1,configurable:!1});var y={};Object.defineProperty(v,"directSpecializations",{get:function(){var e=a.copy(y);return Object.preventExtensions(e),Object.seal(e),Object.freeze(e),e},set:function(){throw new Error("Specializations of an Entity cannot be changed")},enumerable:!0,configurable:!1});var b={};Object.defineProperty(v,"specializations",{get:function(){var e=a.copy(b);return Object.preventExtensions(e),Object.seal(e),Object.freeze(e),e},set:function(){throw new Error("Specializations of an Entity cannot be changed")},enumerable:!0,configurable:!1});var w=null,x=function(e,t){return function(){i(arguments).to.have.length.within(1,3,"Invalid arguments length when specifying an Entity (it has to be passed from 1 to 3 arguments)");var n=function(t){(!this.hasOwnProperty("Entity")||!this.Entity)&&Object.defineProperty(this,"Entity",{value:n,enumerable:!1,writable:!1,configurable:!0}),e.call(this,t)};u.generalize(e,n),Object.defineProperty(n,"adapter",{get:E,set:function(){throw new Error("Adapter property of an Entity class cannot be changed")},enumerable:!1,configurable:!1}),Object.defineProperty(n,"General",{value:e,enumerable:!0,writable:!1,configurable:!1});var r=null;if(arguments.length===1&&typeof arguments[0]!="string"){var s=arguments[0];i(s).to.be.an("object","Invalid argument type when specifying an Entity (it has to be an object or a string)"),s instanceof l?r=s:r=new l(s)}else{var o=arguments[0];i(o).to.be.a("string",'Invalid argument "name" when specifying an Entity (it has to be a string)');var f=null,p=null;arguments.length>1&&arguments[1]&&(f=arguments[1],i(typeof f).to.equal("object",'Invalid property "attributes" when specifying an Entity (it has to be an object)')),arguments.length>2&&arguments[2]&&(p=arguments[2],i(p).to.be.an("object",'Invalid property "methods" when specifying an Entity (it has to be an object)')),r=new l(o,f,p)}i(b).to.not.have.ownProperty(r.name,'It was not possible to specify a new Entity called "'+r.name+'" because duplicates are not allowed'),b[r.name]=n,t[r.name]=n,Object.defineProperty(n,"specification",{value:r,enumerable:!0,writable:!1,configurable:!1}),Object.defineProperty(n,"attributes",{get:function(){var e={},t=[],r=n;while(r&&t.indexOf(r)===-1){for(var i in r.specification.attributes)e.hasOwnProperty(i)||(e[i]=r.specification.attributes[i]);t.push(r),r=r.General}return new c(e)},set:function(){throw new Error("Attributes of an Entity cannot be changed")},enumerable:!0,configurable:!1}),Object.defineProperty(n,"methods",{get:function(){var e={},t=[],r=n;while(r&&t.indexOf(r)===-1){for(var i in r.specification.methods)e.hasOwnProperty(i)||(e[i]=r.specification.methods[i]);t.push(r),r=r.General}return new h(e)},set:function(){throw new Error("Methods of an Entity cannot be changed")},enumerable:!0,configurable:!1});var d={};return Object.defineProperty(n,"directSpecializations",{get:function(){var e=a.copy(d);return Object.preventExtensions(e),Object.seal(e),Object.freeze(e),e},set:function(){throw new Error("Specializations of an Entity cannot be changed")},enumerable:!0,configurable:!1}),Object.defineProperty(n,"specializations",{get:function(){var e={};return S(d,e),Object.preventExtensions(e),Object.seal(e),Object.freeze(e),e},set:function(){throw new Error("Specializations of an Entity cannot be changed")},enumerable:!0,configurable:!1}),n.specify=x(n,d),n.getSpecialization=T(n),n.new=N(n),r.Entity?i(r.Entity).to.equal(n,'The property "Entity" of the EntitySpecification instance should be equal to the Entity that is being specified.'):r.Entity=n,n}};v.specify=x(v,y);var T=function(e){return function(t){i(arguments).to.have.length(1,"Invalid arguments length when getting an Entity specialization (it has to be passed 1 argument)"),i(t).to.be.a("string","Invalid argument when creating a new Entity function (it has to be a string");var n=e.specializations;try{i(n).to.have.ownProperty(t)}catch(r){throw new p.EntityNotFoundError(t,r)}return n[t]}};v.getSpecialization=T(v);var N=function(e){return function(t){return i(arguments).to.have.length.below(2,"Invalid arguments length when creating a new Entity function (it has to be passed less than 2 arguments)"),function(){i(arguments).to.have.length(0,"Invalid arguments length when creating a new Entity (it has not to be passed any argument)");var n=e;return t&&(n=v.getSpecialization(t)),new n}}};v.new=N(v)}),define("back4app-entity/models/index",["require","exports","module","./Entity","./EntitySpecification","./attributes","./methods","./errors"],function(e,t,n){var r=e("./Entity"),i=e("./EntitySpecification"),s=e("./attributes"),o=e("./methods"),u=e("./errors");n.exports={},n.exports.Entity=r,n.exports.EntitySpecification=i,n.exports.attributes=s,n.exports.methods=o,n.exports.errors=u}),define("back4app-entity/models",["back4app-entity/models/index"],function(e){return e}),define("back4app-entity/adapters/index",["require","exports","module","./Adapter"],function(e,t,n){"use strict";var r=e("./Adapter");n.exports={},n.exports.Adapter=r}),define("back4app-entity/adapters",["back4app-entity/adapters/index"],function(e){return e}),define("back4app-entity/index",["require","exports","module","./utils","./settings","./models","./adapters"],function(e,t,n){var r=e("./utils"),i=e("./settings"),s=e("./models"),o=e("./adapters");n.exports={},n.exports.utils=r,n.exports.settings=i,n.exports.models=s,n.exports.adapters=o}),define("back4app-entity",["back4app-entity/index"],function(e){return e});