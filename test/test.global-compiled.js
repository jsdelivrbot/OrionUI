(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
//--------------------------------------------------------------------------------------------------------------------------------------
// DATA-CLASS COMPONENT
//--------------------------------------------------------------------------------------------------------------------------------------

/*
DATA-CLASS adds functionality for any elements with data-class and data-class-element attributes.

It allows you to quickly add, remove or toggle classes on elements on click and/or swipe events.
*/


// DATA ATTRIBUTES
//--------------------------------------------------------------------------------------------------------------------------------------

/*
data-class (Required)
- A comma seperated list of classes you wish to add.

data-class-element (Required)
- A comma seperated list of elements data-class will target.

data-class-behaviour (Optional)
- The behaviour which occurs when triggered. You have 3 choices:-
	- "toggle": This adds the class if it's not already present or removes if it is
	- "add": This adds the class if it's not present 
	- "remove": This removes the class if it's present

data-class-swipe (Optional)
- If defined, the specified swipe direction triggers class functionality. You have 4 choices for directions:-
	- "up"
	- "right"
	- "down"
	- "left"
- You can also specify if or not the swipe event should replace the click event, or if both should coexist. To do this add a comma then either true or false after your direction.
	- "true": Swipe event replaces click event
	- "false": Swipe event and click event are both added
*/


// EXAMPLE
//--------------------------------------------------------------------------------------------------------------------------------------

/*
<div data-class="is-active, is-invalid, is-hidden" data-class-element="js-elem, js-elem2, js-elem3" data-class-behaviour="toggle, remove, add" data-class-swipe="left, false">

In the above example, when our element is either clicked or a left swipe is detected the following happens:-
	1) is-active class is toggled on js-elem
	2) is-invalid class is removed from js-elem2
	3) is-hidden class is added to js-elem3 
*/ 


// CODE
//--------------------------------------------------------------------------------------------------------------------------------------


(function(){

	// Import swipe helper
	var swipeDetect = require("../helpers/swipeDetect.js"),
	// Grab all elements with required data-attributes
	elems = document.querySelectorAll("[data-class][data-class-element]"),
	dataClass, 
	dataClassElement,
	dataClassBehaviour,
	elem,
	elemClass,
	elemBehaviour,
	elemSwipe,
	elemSwipeBool,
	direction,
	currentElem,
	elemRef,
	a,
	b,
	processChange = function(elem){
		// Grab data-class data and convert to array
		dataClass = elem.getAttribute("data-class");
		dataClass = dataClass.split(", ");

		// Grab data-class-element data
		dataClassElement = elem.getAttribute("data-class-element");
		dataClassElement = dataClassElement.split(", ");

		// Grab data-class-behaviour if present
		if(elem.getAttribute("data-class-behaviour")) {
			dataClassBehaviour = elem.getAttribute("data-class-behaviour");
			dataClassBehaviour = dataClassBehaviour.split(", ");
		}

		// Loop through all our dataClassElement items
		for(b = 0; b < dataClassElement.length; b++) {
			// Grab elem reference
			elemRef = document.querySelector("." + dataClassElement[b]);
			// Grab class we will add
			elemClass = dataClass[b];
			// Grab behaviour if any exists
			if(dataClassBehaviour) {
				elemBehaviour = dataClassBehaviour[b];
			}
			// Do
			if(elemBehaviour === "add") {
				if(!elemRef.classList.contains(elemClass)) {
					elemRef.classList.add(elemClass);
				}
			}
			else if(elemBehaviour === "remove") {
				if(elemRef.classList.contains(elemClass)) {
					elemRef.classList.remove(elemClass);
				}
			}
			else {
				elemRef.classList.toggle(elemClass);
			}
		}
	};

	// Only go ahead if we've found any matches
	if (elems.length) {
		// Loop through our matches and add click events
		for(a = 0; a < elems.length; a++){
			// Detect data-swipe attribute
			if(elems[a].getAttribute("data-class-swipe")){
				elemSwipe = elems[a].getAttribute("data-class-swipe");
				elemSwipe = elemSwipe.split(", ");
				direction = elemSwipe[0];
				elemSwipeBool = elemSwipe[1];
				currentElem = elems[a];

				if(elemSwipeBool === "false") {
					// Assign click event
					elems[a].addEventListener("click", function(e){
						// Prevent default action of element
						e.preventDefault();	
						// Run class function
						processChange(this);
					});
				}
				swipeDetect(elems[a], function(swipedir){
					if(swipedir === direction) {
						// Run class function
						processChange(currentElem);
					}
				})
			}
			else {
				// Assign click event
				elems[a].addEventListener("click", function(e){
					// Prevent default action of element
					e.preventDefault();	
					// Run class function
					processChange(this);
				});
			}
		}
	}
})();
},{"../helpers/swipeDetect.js":2}],2:[function(require,module,exports){
//--------------------------------------------------------------------------------------------------------------------------------------
// SWIPE DETECT FUNCTION
//--------------------------------------------------------------------------------------------------------------------------------------

/*
Sets up a swipe event listener
/*


// EXAMPLE
//--------------------------------------------------------------------------------------------------------------------------------------

/*
// Import helper
var swipeDetect = require("../helpers/swipeDetect.js");

// Grab element
var myElem = document.querySelector(".my-elem");

// Set up event listener to trigger on left swipe
swipeDetect(myElem, function(swipedir){
	if(swipedir === "left") {
		// Define action
	}
})
*/


// CODE
//--------------------------------------------------------------------------------------------------------------------------------------

// http://www.javascriptkit.com/javatutors/touchevents2.shtml
var swipeDetect = function(el, callback){	
	var touchsurface = el,
	swipedir,
	startX,
	startY,
	dist,
	distX,
	distY,
	threshold = 100, //required min distance traveled to be considered swipe
	restraint = 100, // maximum distance allowed at the same time in perpendicular direction
	allowedTime = 300, // maximum time allowed to travel that distance
	elapsedTime,
	startTime,
	eventObj,
	handleswipe = callback || function(swipedir, eventObj){}

	touchsurface.addEventListener('touchstart', function(e){
		var touchobj = e.changedTouches[0]
		swipedir = 'none'
		dist = 0
		startX = touchobj.pageX
		startY = touchobj.pageY
		startTime = new Date().getTime() // record time when finger first makes contact with surface
		//e.preventDefault()
		eventObj = e;
	}, false)

	touchsurface.addEventListener('touchmove', function(e){
		//e.preventDefault() // prevent scrolling when inside DIV
	}, false)

	touchsurface.addEventListener('touchend', function(e){
		var touchobj = e.changedTouches[0]
		distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
		distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
		elapsedTime = new Date().getTime() - startTime // get time elapsed
		if (elapsedTime <= allowedTime){ // first condition for awipe met
				if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){ // 2nd condition for horizontal swipe met
						swipedir = (distX < 0)? 'left' : 'right' // if dist traveled is negative, it indicates left swipe
				}
				else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint){ // 2nd condition for vertical swipe met
						swipedir = (distY < 0)? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
				}
		}
		handleswipe(swipedir, eventObj)
		//e.preventDefault()
	}, false)
}

module.exports = swipeDetect;
},{}],3:[function(require,module,exports){
"use strict";

//--------------------------------------------------------------------------------------------------------------------------------------
// IMPORTS
//--------------------------------------------------------------------------------------------------------------------------------------

/*
Test our JS gulp build task
*/

// COMPONENTS
//--------------------------------------------------------------------------------------------------------------------------------------

require("../node_modules/orionjs/actions/data-class.js");

},{"../node_modules/orionjs/actions/data-class.js":1}]},{},[3]);
