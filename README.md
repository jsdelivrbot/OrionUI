<h1>
	 <img height="67" width="387" src="https://cdn.rawgit.com/WebDevLuke/OrionUI/master/misc/orionui-logo.svg">
</h1>

OrionUI is a collection of undecorated UI components for projects using [OrionCSS](https://github.com/WebDevLuke/OrionCSS) and [OrionJS](https://github.com/WebDevLuke/OrionJS). These components are fully functional but visually barebones, allowing you to add your own styles to meet the branding needs of your project.

## Getting Started

OrionUI is essentially a plugin for projects using [OrionCSS](https://github.com/WebDevLuke/OrionCSS) and [OrionJS](https://github.com/WebDevLuke/OrionJS), and so cannot be used alone. 

If you're using [OrionBP](https://github.com/WebDevLuke/OrionBP), OrionUI will already be installed as a dependancy. If you aren't using [OrionBP](https://github.com/WebDevLuke/OrionBP), but are using [OrionCSS](https://github.com/WebDevLuke/OrionCSS) and [OrionJS](https://github.com/WebDevLuke/OrionJS) as dependencies, you can install OrionUI using NPM with the following command:

```
npm install orionui --save
```

You can then import any of the components using `@import` for SASS or the commonJS `include` pattern for the javascript.

### SASS
Be sure to bundle your OrionUI component import with the rest of your OrionCSS components so you maintain it's place in the [ITCSS](http://www.creativebloq.com/web-design/manage-large-css-projects-itcss-101517528) hierarchy.

```
// Components
@import "/06 - components/components.mycomponent";
@import "/06 - components/components.mycomponent";
@import "/06 - components/components.mycomponent";
@import "../../node_modules/orionui/c-modal/components.modal";
```

### JS
In your main.js file, include each components JS file like so:

```
require("../../node_modules/orionui/c-modal/c-modal.js");
```



## Modal


## About the Developer
I'm Luke Harrison, a Sheffield-based Web Designer &amp; Developer from the UK, currently working at [Evolution Funding](https://github.com/EvolutionFunding). Read more about me at [lukeharrison.net](http://www.lukeharrison.net) and/or follow me on twitter at [@WebDevLuke](https://twitter.com/WebDevLuke).