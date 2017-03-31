<h1>
	 <img height="67" width="387" src="https://cdn.rawgit.com/WebDevLuke/OrionUI/master/misc/orionui-logo.svg">
</h1>

OrionUI is a collection of undecorated UI components for projects using [OrionCSS](https://github.com/WebDevLuke/OrionCSS) and [OrionJS](https://github.com/WebDevLuke/OrionJS). These components are fully functional but visually barebones, allowing you to add your own styles to meet the branding needs of your project.

## Getting Started

OrionUI is essentially a plugin for projects using [OrionCSS](https://github.com/WebDevLuke/OrionCSS) and [OrionJS](https://github.com/WebDevLuke/OrionJS), so cannot be used alone.

If you're using [OrionBP](https://github.com/WebDevLuke/OrionBP), OrionUI will already be installed as a dependancy. If you aren't using [OrionBP](https://github.com/WebDevLuke/OrionBP), but *are* using [OrionCSS](https://github.com/WebDevLuke/OrionCSS) and [OrionJS](https://github.com/WebDevLuke/OrionJS) as dependencies, you can install OrionUI using NPM with the following command:

```
npm install orionui --save
```

To use an OrionUI component, you can simply copy it's scss partial and js file to your own project and use as desired. Whilst this works, it also means its difficult to update components as they are now essentially detached from OrionUI.

The recommended way is to import your components using `@import` for SASS and the commonJS `include` pattern for the javascript. This allows OrionUI components to remain encapsulated in `node_modules` which makes them easier to update. See below for details:

### SASS Import
Be sure to bundle your OrionUI component import with the rest of your [OrionCSS](https://github.com/WebDevLuke/OrionCSS) components so you maintain its place in the [ITCSS](http://www.creativebloq.com/web-design/manage-large-css-projects-itcss-101517528) hierarchy:

```
// Components
@import "/06 - components/components.mycomponent";
@import "/06 - components/components.mycomponent";
@import "../../node_modules/orionui/c-modal/components.modal";
```

If you wish to edit a component, create and include a seperate scss partial in your own project which contains your new styles:

```
// Components
@import "/06 - components/components.mycomponent";
@import "/06 - components/components.mycomponent";
@import "../../node_modules/orionui/c-modal/components.modal";
@import "/06 - components/components.modal";
``` 

### JS Include
In your main.js file, include each components JS file like so:

```
require("../../node_modules/orionui/c-modal/c-modal.js");
```

Many components fire custom events when performing common functionality (For example, if a modal is opened). These can be used as hooks to edit or attach additional functionality to a component whilst still keeping the core js file include intact. Include your additional functonality as you would the core js file:

```
require("../../node_modules/orionui/c-modal/c-modal.js");
require("/components/c-model.js");
```

## Component Documentation
- [Modal](README.md)

## About the Developer
I'm Luke Harrison, a Sheffield-based Web Designer &amp; Developer from the UK, currently working at [Evolution Funding](https://github.com/EvolutionFunding). Read more about me at [lukeharrison.net](http://www.lukeharrison.net) and/or follow me on twitter at [@WebDevLuke](https://twitter.com/WebDevLuke).