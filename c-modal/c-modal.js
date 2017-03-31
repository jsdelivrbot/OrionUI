//--------------------------------------------------------------------------------------------------------------------------------------
// C-MODAL COMPONENT
//--------------------------------------------------------------------------------------------------------------------------------------

/*
Functionality for c-modal component.
*/


// CODE
//--------------------------------------------------------------------------------------------------------------------------------------

(function(){
	// Import fireEvent from OrionJS
	var fireEvent = require("../node_modules/orionjs/helpers/fireEvent.js"),
	// Grab body
	body = document.body,
	// Add functionality to all elements tagged with data-modal & data-modal-content
	triggers = document.querySelectorAll("[data-modal][data-modal-content]"),
	// Declare vars
	scrollPosition,

	// Close modal function
	closeModal = function(modal){
		// Remove active class from modal
		modal.classList.remove("is-active");
		// Remove class from body
		body.classList.remove("showing-modal");
		// Restore scroll position
		body.scrollTop = Math.abs(parseInt(body.style.top));
		body.style.removeProperty("top");
		// Fire event
		fireEvent(modal, "close");
	}

	// Set up modal triggers and fill modal content
	if(triggers.length) {
		for(var i = 0; i < triggers.length; i++) {

			// Grab modal
			let modal = document.querySelector("." + triggers[i].getAttribute("data-modal"));
			// Grab modal content
			let modalContent = document.querySelector("." + triggers[i].getAttribute("data-modal-content"));
			// Get modal content area
			let modalContentBox = modal.querySelector(".c-modal__content");
			// Grab modal close button
			let modalClose = modal.querySelector(".c-modal__close");
			// Grab modal background
			let modalBackground = modal.querySelector(".c-modal__background");

			triggers[i].addEventListener("click", function(e){
				// Prevent default action for trigger
				e.preventDefault();
				// Cache current scroll position
				scrollPosition = body.scrollTop;
				// Add active class to modal
				modal.classList.add("is-active");
				// Add modal class to body
				body.classList.add("showing-modal");
				// Populate modal with content					
				modalContentBox.innerHTML = modalContent.innerHTML;
				// If the user has scrolled on a previous modal, put back to top
				modalContent.scrollTop = 0;
				// Lock scroll position
				body.style.top = "-" + scrollPosition + "px";
				// Fire event
				fireEvent(modal, "open");
			});

			// Add close functionality for modal button and background
			modalClose.addEventListener("click", function(){
				// Fire event
				fireEvent(modal, "closeIcon");
				// Close modal
				closeModal(modal);
			});
			modalBackground.addEventListener("click", function(){
				// Fire event
				fireEvent(modal, "closeBackground");
				// Close modal
				closeModal(modal);
			});

		}
	}


})();