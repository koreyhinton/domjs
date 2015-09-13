// The MIT License (MIT)

// Copyright (c) 2015 Korey Hinton

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

/// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

var dom = (function () {
    'use strict';

    var tags = ["html", "title", "body", "h1", "h2", "h3", "h4", "h5", "h6", "p", "br", "hr", "abbr", "address", "b", "i", "bdi", "bdo", "blockquote", "cite", "code", "del", "dfn", "em", "ins", "kbd", "mark", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "small", "strong", "sub", "sup", "time", "u", "var", "wbr", "form", "input", "textarea", "button", "select", "optgroup", "option", "label", "fieldset", "legend", "datalist", "keygen", "output", "iframe", "img", "map", "area", "canvas", "figcaption", "figure", "audio", "source", "track", "video", "a", "link", "nav", "ul", "ol", "li", "dl", "dt", "dd", "menu", "menuitem", "table", "caption", "th", "tr", "td", "thead", "tbody", "tfoot", "col", "colgroup", "style", "div", "span", "header", "footer", "main", "section", "article", "aside", "details", "dialog", "summary", "head", "meta", "base", "script", "noscript", "embed", "param"];

    var cache = {};
    var CACHE_LIMIT = 5;

    function _dom(identifier) {

        var domObject;
        var traverse = undefined;

        function expand(expanded) {

            expanded.replace = function (html) {
                expanded.innerHTML = html;
                return expanded;
            };

            expanded.prepend = function (html) {
                expanded.innerHTML = expanded.innerHTML + html;
                return expanded;
            };

            expanded.append = function (html) {
                expanded.innerHTML += html;
                return expanded;
            };

            expanded.display = function (type) {
                expanded.style.display = type;
                return expanded;
            };

            expanded.visibility = function (visibility) {
                expanded.style.visibility = visibility;
                return expanded;
            };

            expanded.addClass = function (className) {
                expanded.classList.add(className);
                return expanded;
            };

            expanded.removeClass = function (className) {
                expanded.classList.remove(className);
                return expanded;
            };

            expanded.toggleClass = function (className) {
                expanded.classList.toggle(className);
                return expanded;
            };

            expanded.traverse = function (callback) {
                traverse(expanded, callback);
                return expanded;
            };

            // Functions with primitive return values
            expanded.hasClass = function (className) {
                return expanded.classList.contains(className);
            };

            return expanded;
        }


        traverse = function (node, callback) {

            var children = Array.prototype.slice.call(node.children);

            children.forEach(function (value) {
                var child = value;
                callback(expand(child));
                traverse(child, callback);
            });
        };


        if (identifier.charAt(0) === '.' || tags.indexOf(identifier) !== -1) {

            // tags by class name or by tag name

            var elements = window.document.querySelectorAll(identifier);
            var domCollection = Array.prototype.slice.call(elements);

            domCollection.forEach(function (value) {
                expand(value);
            });

            domCollection.traverse = function (callback) {

                domCollection.forEach(function (node) {
                    callback(node);
                    node.traverse(callback);
                });
            };

            domObject = domCollection;

        } else if (cache[identifier] !== undefined) {

            // single cached tag by id
            domObject = cache[identifier];

        } else {

            // single tag by id
            
            var id = identifier;
            domObject = window.document.getElementById(id);

            expand(domObject);

            var cacheKeys = Object.keys(cache);
            
            if (cacheKeys.length === CACHE_LIMIT && cacheKeys.length > 0) {
                delete cache[cacheKeys[0]];
            }
            cache[identifier] = domObject;
        }

        return domObject;
    }

    return _dom;
}());
