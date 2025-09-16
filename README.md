# Image Formats Support Detector for Browsers: AVIF, WebP, JPEG XL

This Javascript/Typescript plugin detects modern image formats supporting in your web browser:
* [AVIF](https://en.wikipedia.org/wiki/AVIF) — https://caniuse.com/avif
* [WebP](https://en.wikipedia.org/wiki/WebP) — https://caniuse.com/webp
* [JPEG XL](https://en.wikipedia.org/wiki/JPEG_XL) — https://caniuse.com/jpegxl


## Demo
https://maximal.github.io/image-formats-support/


## Usage

### Load in Browser

Load from `dist/image-formats-support.js` or JsDelivr:

```html
<!-- Local script -->
<!-- <script type="application/javascript" src="dist/image-formats-support.js"></script> -->

<!-- Script from JsDelivr -->
<script type="application/javascript"
        src="https://cdn.jsdelivr.net/gh/maximal/image-formats-support@1.0.0/dist/image-formats-support.min.js"></script>
<script type="application/javascript">
	// On DOM ready
	document.addEventListener('DOMContentLoaded', function () {

		// Set `<body>` element classes: has-avif/no-avif, has-webp/no-webp, has-jxl/no-jxl
		window.detectImageFormatsDefault(document);

		// Detect AVIF, WebP, JPEG XL support and run given callback
		window.detectImageFormats(function (result) {
			console.log(result.avif); // boolean
			console.log(result.webp); // boolean
			console.log(result.jxl);  // boolean
			console.log(result.time); // milliseconds (number)
		}, { avif: true, webp: true, jxl: true, delay: 0 });

	});
</script>
```

### NodeJS Module

Install the package:

```shell
npm install image-formats-support
# or if you prefer Bun:
# bun add image-formats-support
```

Import and use it:

```typescript
import {
	detectImageFormats,
	detectImageFormatsDefault,
	type ImageFormatResult,
} from 'image-formats-support';

// On DOM ready
document.addEventListener('DOMContentLoaded', (): void => {

	// Set `<body>` element classes: has-avif/no-avif, has-webp/no-webp, has-jxl/no-jxl
	detectImageFormatsDefault(document);

	// Detect AVIF, WebP, JPEG XL support and run given callback
	detectImageFormats((result: ImageFormatResult): void => {
		console.log(result.avif); // boolean
		console.log(result.webp); // boolean
		console.log(result.jxl);  // boolean
		console.log(result.time); // milliseconds (number)
	}, { avif: true, webp: true, jxl: true, delay: 0 });

});
```


## Author

* https://github.com/maximal
* https://maximals.ru/
* https://sijeko.ru/
