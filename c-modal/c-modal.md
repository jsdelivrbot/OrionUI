## Modal
A blank modal component ready to populate with content.

### Usage
Insert the modal HTML after the opening `body` tag and give it a unique classname. In this example the `js-mymodal` class is used, with the `js` prefix alluding to its linked functionality. Replace the `<!--Close Icon-->` comment with your chosen close [X] icon.

```html
<div class="c-modal js-mymodal">
	<div class="c-modal__inner">
		<div class="c-modal__background"></div>
		<div class="c-modal__box">
			<div class="c-modal__content">
				<!-- Modal Content Gets Injected Here -->
			</div>
			<div class="c-modal__close">
				<!-- Close Icon -->
			</div>
		</div>
	</div>
</div>
```

Next, define the content you wish to inject into your modal and give it another unique classname. The example below uses `js-my-modal-content`. Typically you would also attach a class to hide this content by default.

```html
<div class="js-my-modal-content u-hide">
	This is a modal message. Can be just text or any number of additional elements.
</div>
```

Finally, set up the trigger. In the On click the example `span` below opens `js-mymodal` and injects it with the content from `js-mymodal-content`. 
```
<span data-modal="js-mymodal" data-modal-content="js-mymodal-content">Modal Trigger</span>
```

This is just one example. You could inject different content into the same modal depending on which trigger is clicked, or have multiple modals with different designs altogether. 