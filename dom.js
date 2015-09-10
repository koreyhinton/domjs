"use strict";

function dom(id) {

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

    if (dom.cache !== undefined && dom.cache(id) !== undefined) {

        domObject = dom.cache(id);

    } else {

        domObject = window.document.getElementById(id);

        expand(domObject);
    }

    return domObject;
}
