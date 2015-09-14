
var tests = {
    "Append / Prepend Test" : function () {
	window.document.body.innerHTML = "<p id='1'></p>";
	dom("1").append("2");
	dom("1").append("3");
	dom("1").prepend("1");
	return dom("1").innerHTML === "123";
    },
    "Replace Test" : function () {
	var expected = "nono";
	window.document.body.innerHTML = "<p id='2'>yoyo</p>";
	dom("2").replace(expected);
	return dom("2").innerHTML === expected;
    },
    "Display Test" : function () {
	var expected1 = "none";
	var expected2 = "block";
	window.document.body.innerHTML = "<a id='3'>WTF??</a>";
	dom("3").display("none");
	var result1 = window.document.getElementById("3").style.display;
	dom("3").display("block");
	var result2 = window.document.getElementById("3").style.display;
	return result1 === expected1 && result2 === expected2;
    },
    "Visibility Test" : function () {
	var expected1 = "hidden";
	var expected2 = "visible";
	var identifier = "4";
	
	window.document.body.innerHTML = "<span id='"+identifier+"'>am i here??</span>";
	dom(identifier).visibility("hidden");
	var result1 = document.getElementById(identifier).style.visibility;
	dom(identifier).visibility("visible");
	var result2 = document.getElementById(identifier).style.visibility;
	return result1 === expected1 && result2 === expected2;
    }

};



var TestRunner = (function (tests) {

    var api = {};
    
    var results = {};
    
    function clear() {
	window.document.body.innerHTML = "";
    }

    function runTest(test) {
	clear();
	return test();
    }

    api.runTests = function () {

	var keys = Object.keys(tests);

	keys.forEach(function (value) {
	    results[value] = runTest(tests[value]);
	});
	
	clear();

	Object.keys(results).forEach(function (value) {
	    var resultText = (results[value] === true) ? "Passed" : "Fail";
	    window.document.body.innerHTML += "<p>" + value + ": " + resultText + "</p>";
	});
	
    }

    return api;
}(tests));


