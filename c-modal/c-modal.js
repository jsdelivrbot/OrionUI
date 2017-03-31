//--------------------------------------------------------------------------------------------------------------------------------------
// C-SHARE COMPONENT
//--------------------------------------------------------------------------------------------------------------------------------------

/*
Functionality for c-modal component.
*/

(function(){
	// Grab body
	var body = document.querySelector("body"),
	// Find modal
	modal = document.querySelector(".c-modal"),
	// Get modal box
	modalContent = modal.querySelector(".c-modal__content"),
	// Add functionality to all elements tagged with data-modal
	triggers = document.querySelectorAll("[data-modal]"),
	// Grab body
	body = document.querySelector("body"),
	// Grab modal close button
	close = modal.querySelector(".c-modal__close"),
	// Close modal function
	closeModal = function(){
		// Remove active class from modal
		modal.classList.remove("is-active");
		// Remove class from body
		body.classList.remove("showing-modal");
		// Restore scroll position
		body.scrollTop = Math.abs(parseInt(body.style.top));
		body.style.removeProperty("top");
	},
	background = modal.querySelector(".c-modal__background");

	// Set up modal triggers and fill modal content
	if(triggers.length) {
		for(var i = 0; i < triggers.length; i++) {
			triggers[i].addEventListener("click", function(e){
				var scrollPosition = body.scrollTop;
				// Prevent default action
				e.preventDefault();
				// Add active class to modal
				modal.classList.add("is-active");
				// Add modal class to body
				body.classList.add("showing-modal");
				// Get behaviour from data-tag
				var copyElem = this.getAttribute("data-modal");
				// Grab element to copy content from
				if(copyElem) {
					// Get element defined in data-tag
					copyElem = document.querySelector("." + copyElem);
					modalContent.innerHTML = copyElem.innerHTML;
					modalContent.classList.remove("o-module", "o-module--medium");
				}
				else if(!copyElem) {
					modalContent.innerHTML = this.innerHTML;
					modalContent.classList.add("o-module", "o-module--medium");
				}
				// If the user has scrolled on a previous modal, put back to top
				modalContent.scrollTop = 0;
				// Lock scroll position
				body.style.top = "-" + scrollPosition + "px";
			});
		}

		// Add close functionality for modal button and background
		close.addEventListener("click", closeModal);
		background.addEventListener("click", closeModal);
	}

})();