/**
 * Image formats support detector for browsers: AVIF, WebP, JPEG XL.
 *
 * @author MaximAL
 * @link https://maximals.ru/
 * @link https://sijeko.ru/
 * @link https://github.com/maximal/image-formats-support
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
		typeof define === 'function' && define.amd ? define(['exports'], factory) :
			(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global['image-formats-support'] = global['image-formats-support'] || {}, global['image-formats-support'].js = {})));
})(this, (function (exports) {
	'use strict';

	/**
	 * Default image formats detection.
	 *
	 * Will get AVIF, WebP, JPEG XL support,
	 * and then set document’s `<body>` element classes:
	 * * `has-avif` or `no-avif` for AVIF support;
	 * * `has-webp` or `no-webp` for WebP support;
	 * * `has-jxl` or `no-jxl` for JPEG XL support.
	 *
	 * @param {Document?} _document Page document
	 */
	function detectImageFormatsDefault(_document) {
		if (_document === void 0) {
			_document = document;
		}
		detectImageFormats(function (result) {
			if (result.avif !== null) {
				_document.body.classList.add(result.avif ? 'has-avif' : 'no-avif');
			}
			if (result.webp !== null) {
				_document.body.classList.add(result.webp ? 'has-webp' : 'no-webp');
			}
			if (result.jxl !== null) {
				_document.body.classList.add(result.jxl ? 'has-jxl' : 'no-jxl');
			}
		}, { avif: true, webp: true, jxl: true, delay: 0 });
	}

	/**
	 * Run image formats detection, and execute `callback` function when detection is finished.
	 *
	 * @example
	 * ```js
	 * // Detect all formats (AVIF, WebP, JPEG XL) support and print the result
	 * detectImageFormats(function (result) {
	 *     console.log(result);
	 *     // { avif: true, webp: true, jxl: false, time: 32 }
	 * });
	 *
	 * // Detect only AVIF and JPEG XL (exclude WebP) support and print the result
	 * detectImageFormats(function (result) {
	 *     console.log(result);
	 *     // { avif: true, webp: null, jxl: true, time: 28 }
	 * }, { avif: true, webp: false, jxl: true });
	 * ```
	 *
	 * @param {(result: ImageFormatResult) => void} callback Call this function when detection is finished.
	 *
	 * @param {ImageFormatConfig?} config Which formats to detect; AVIF, WebP, JPEG XL by default.
	 * @param {boolean?} config.avif Whether to detect AVIF support (enabled by default/undefined).
	 * @param {boolean?} config.webp Whether to detect WebP support (enabled by default/undefined).
	 * @param {boolean?} config.jxl Whether to detect JPEG XL support (enabled by default/undefined).
	 * @param {number?} config.delay Delay in milliseconds before the detection (default is 0).
	 */
	function detectImageFormats(callback, config) {
		var _a;
		var fullConfig = config
			? {
				avif: config.avif === undefined || config.avif,
				webp: config.webp === undefined || config.webp,
				jxl: config.jxl === undefined || config.jxl,
				delay: (_a = config.delay) !== null && _a !== void 0 ? _a : 0,
			}
			: { avif: true, webp: true, jxl: true, delay: 0 };
		var start = Date.now();
		var result = {
			avif: null,
			webp: null,
			jxl: null,
			time: 0,
		};
		if (fullConfig.avif) {
			setTimeout(function () {
				var avif = new Image();
				// Minimal AVIF image
				avif.src =
					'data:image/avif;base64,AAAAHGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZgAAANZtZXRhAAAAAAA' +
					'AACFoZGxyAAAAAAAAAABwaWN0AAAAAAAAAAAAAAAAAAAAAA5waXRtAAAAAAABAAAAImlsb2MAAAAAR' +
					'EAAAQABAAAAAAD6AAEAAAAAAAAAFgAAACNpaW5mAAAAAAABAAAAFWluZmUCAAAAAAEAAGF2MDEAAAA' +
					'AVmlwcnAAAAA4aXBjbwAAAAxhdjFDgSACAAAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAA' +
					'wgICAAAABZpcG1hAAAAAAAAAAEAAQOBAgMAAAAebWRhdBIACgc4AAZQENBpMgkQAAAAD/o/Woc=';
				avif.onload = function () {
					result.avif = true;
					callbackIfEnd(fullConfig, result, start, callback);
				};
				avif.onerror = function () {
					result.avif = false;
					callbackIfEnd(fullConfig, result, start, callback);
				};
			}, fullConfig.delay);
		} else {
			callbackIfEnd(fullConfig, result, start, callback);
		}
		if (fullConfig.webp) {
			setTimeout(function () {
				var webp = new Image();
				// Minimal WebP image
				webp.src = 'data:image/webp;base64,UklGRhoAAABXRUJQVlA4TA4AAAAvAAAAAAcQEf0PRET/Aw==';
				webp.onload = function () {
					result.webp = true;
					callbackIfEnd(fullConfig, result, start, callback);
				};
				webp.onerror = function () {
					result.webp = false;
					callbackIfEnd(fullConfig, result, start, callback);
				};
			}, fullConfig.delay);
		} else {
			callbackIfEnd(fullConfig, result, start, callback);
		}
		if (fullConfig.jxl) {
			setTimeout(function () {
				var jpegXl = new Image();
				// Minimal JPEG XL image
				jpegXl.src =
					'data:image/jxl;base64,/woAkAEAEwgApACNOu8AAKhQGWXc4OVcz5cfOiymbVxnaKttC0sYE884' +
					'WEgoJMYGQ8SoBA==';
				jpegXl.onload = function () {
					result.jxl = true;
					callbackIfEnd(fullConfig, result, start, callback);
				};
				jpegXl.onerror = function () {
					result.jxl = false;
					callbackIfEnd(fullConfig, result, start, callback);
				};
			}, fullConfig.delay);
		} else {
			callbackIfEnd(fullConfig, result, start, callback);
		}
	}

	function callbackIfEnd(config, result, start, callback) {
		var diff = Date.now() - start;
		if (diff > result.time) {
			result.time = diff;
		}
		if ((!config.avif || result.avif !== null) &&
			(!config.webp || result.webp !== null) &&
			(!config.jxl || result.jxl !== null)) {
			callback(result);
			return true;
		}
		return false;
	}

	if (window) {
		window.detectImageFormats = detectImageFormats;
		window.detectImageFormatsDefault = detectImageFormatsDefault;
	}

	exports.detectImageFormats = detectImageFormats;
	exports.detectImageFormatsDefault = detectImageFormatsDefault;

}));
