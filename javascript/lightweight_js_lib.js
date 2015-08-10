/*global document, $, jQuery, alert, console, angular*/
/**
 *
 * @authors Ted Shiu (tedshd@gmail.com)
 * @date    2014-04-22 11:46:25
 * @version $Id$
 */

// handle get element
function node(selector) {
    if (selector.indexOf('.') === -1) {
        if (document.querySelectorAll(selector).length === 1) {
            return document.querySelector(selector);
        }
        return document.querySelectorAll(selector);
    }
    return document.querySelectorAll(selector);
}

// handle index
function indexInParent(node) {
    var children = node.parentNode.childNodes,
        num = 0;
    for (var i = 0; i < children.length; i++) {
         if (children[i]==node) return num;
         if (children[i].nodeType==1) num++;
    }
    return -1;
}

// handle delete element
function delElement(dom) {
    if (dom.length) {
        for (var i = 0; i < dom.length; i++) {
            dom[i].outerHTML = '';
            delete dom[i];
        }
    } else {
        dom.outerHTML = '';
        delete dom;
    }
}

// add class
function addClass(dom, className) {
    if (dom.classList) {
        dom.classList.add(className);
    } else {
        dom.className += ' ' + className;
    }
}

// remove class
function removeClass(dom, className) {
    if (dom.classList) {
        dom.classList.remove(className);
    } else {
        var reg = new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi');
        dom.className = dom.className.replace(reg, ' ');
    }
}

// has class
function hasClass(dom, className) {
    if (dom.classList) {
        return dom.classList.contains(className);
    } else {
        // dom.className = dom.className
    }
}

// handle time
function toHHMMSS(sec_num) {
    var hours   = Math.floor(sec_num / 3600),
        minutes = Math.floor((sec_num - (hours * 3600)) / 60),
        seconds = Math.floor(sec_num - (hours * 3600) - (minutes * 60));

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    var time    = hours+':'+minutes+':'+seconds;
    return time;
}

// handel cookie
function setCookie(cname,cvalue,exdays)
{
    var d = new Date();
    d.setTime(d.getTime()+(exdays*24*60*60*1000));
    var expires = "expires="+d.toGMTString();
    document.cookie = cname+"="+cvalue+"; "+expires;
}

function getCookie(cname)
{
var name = cname + "=";
var ca = document.cookie.split(';');
for(var i=0; i<ca.length; i++)
  {
  var c = ca[i].trim();
  if (c.indexOf(name)==0) return c.substring(name.length,c.length);
  }
return "";
}

// get url query String
function getQueryString(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

// check IE & version
function isIE() {
    var myNav = navigator.userAgent.toLowerCase();
    return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
}

// detect iOS
var Apple = {};
Apple.UA = navigator.userAgent;
Apple.Device = false;
Apple.Types = ["iPhone", "iPod", "iPad"];
for (var d = 0; d < Apple.Types.length; d++) {
    var t = Apple.Types[d];
    Apple[t] = !!Apple.UA.match(new RegExp(t, "i"));
    Apple.Device = Apple.Device || Apple[t];
}

// delegate event
var div = document.createElement("div"),
    prefix = ["moz","webkit","ms","o"].filter(function(prefix){
    return prefix+"MatchesSelector" in div;
    })[0] + "MatchesSelector";

Element.prototype.addDelegateListener = function(type, selector, fn) {
    this.addEventListener(type, function(e){
        var target = e.target;

        while(target && target !== this && !target[prefix](selector)) {
            target = target.parentNode;
        }

        if(target && target !== this) {
            return fn.call( target, e );
        }

    }, false);
};

// handle trim method
if (!String.prototype.trim) {
    (function() {
        var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
        String.prototype.trim = function() {
            return this.replace(rtrim, '');
        };
    })();
}

// handle console in IE7-
(function() {
    var method,
        noop = function () {},
        methods = [
            'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
            'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
            'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
            'timeStamp', 'trace', 'warn'
        ];

    var length = methods.length,
        console = (window.console = window.console || {});
    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());
