/**
 * Image formats support detector for browsers: AVIF, WebP, JPEG XL.
 *
 * @author MaximAL
 * @link https://maximals.ru/
 * @link https://sijeko.ru/
 * @link https://github.com/maximal/image-formats-support
 */

/**
 * Image formats detector config
 */
export interface ImageFormatConfig {
	// Whether to detect AVIF support (enabled by default/undefined)
	avif?: boolean;
	// Whether to detect WebP support (enabled by default/undefined)
	webp?: boolean;
	// Whether to detect JPEG XL support (enabled by default/undefined)
	jxl?: boolean;
	// Delay in milliseconds before the detection (default is 0)
	delay?: number;
}

interface ImageFormatFullConfig {
	avif: boolean;
	webp: boolean;
	jxl: boolean;
	delay: number;
}

/**
 * Image formats detector result
 */
export interface ImageFormatResult {
	// Whether AVIF supported (`null` if not requested or unknown)
	avif: boolean | null;
	// Whether WebP supported (`null` if not requested or unknown)
	webp: boolean | null;
	// Whether JPEG XL supported (`null` if not requested or unknown)
	jxl: boolean | null;
	// Time in milliseconds spent to retrieve results
	time: number;
}

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
export function detectImageFormatsDefault(_document: Document = document): void {
	detectImageFormats(
		(result: ImageFormatResult): void => {
			if (result.avif !== null) {
				_document.body.classList.add(result.avif ? 'has-avif' : 'no-avif');
			}
			if (result.webp !== null) {
				_document.body.classList.add(result.webp ? 'has-webp' : 'no-webp');
			}
			if (result.jxl !== null) {
				_document.body.classList.add(result.jxl ? 'has-jxl' : 'no-jxl');
			}
		},
		{ avif: true, webp: true, jxl: true, delay: 0 },
	);
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
export function detectImageFormats(
	callback: (result: ImageFormatResult) => void,
	config?: ImageFormatConfig,
): void {
	const fullConfig: ImageFormatFullConfig = config
		? {
			avif: config.avif === undefined || config.avif,
			webp: config.webp === undefined || config.webp,
			jxl: config.jxl === undefined || config.jxl,
			delay: config.delay ?? 0,
		}
		: { avif: true, webp: true, jxl: true, delay: 0 };

	const start: number = Date.now();

	const result: ImageFormatResult = {
		avif: null,
		webp: null,
		jxl: null,
		time: 0,
	};

	if (fullConfig.avif) {
		setTimeout((): void => {
			const avif: HTMLImageElement = new Image();
			// Minimal AVIF image
			avif.src =
				'data:image/avif;base64,AAAAHGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZgAAANZtZXRhAAAAAAA' +
				'AACFoZGxyAAAAAAAAAABwaWN0AAAAAAAAAAAAAAAAAAAAAA5waXRtAAAAAAABAAAAImlsb2MAAAAAR' +
				'EAAAQABAAAAAAD6AAEAAAAAAAAAFgAAACNpaW5mAAAAAAABAAAAFWluZmUCAAAAAAEAAGF2MDEAAAA' +
				'AVmlwcnAAAAA4aXBjbwAAAAxhdjFDgSACAAAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAA' +
				'wgICAAAABZpcG1hAAAAAAAAAAEAAQOBAgMAAAAebWRhdBIACgc4AAZQENBpMgkQAAAAD/o/Woc=';
			avif.onload = (): void => {
				result.avif = true;
				callbackIfEnd(fullConfig, result, start, callback);
			};
			avif.onerror = (): void => {
				result.avif = false;
				callbackIfEnd(fullConfig, result, start, callback);
			};
		}, fullConfig.delay);
	} else {
		callbackIfEnd(fullConfig, result, start, callback);
	}

	if (fullConfig.webp) {
		setTimeout((): void => {
			const webp: HTMLImageElement = new Image();
			// Minimal WebP image
			webp.src = 'data:image/webp;base64,UklGRhoAAABXRUJQVlA4TA4AAAAvAAAAAAcQEf0PRET/Aw==';
			webp.onload = (): void => {
				result.webp = true;
				callbackIfEnd(fullConfig, result, start, callback);
			};
			webp.onerror = (): void => {
				result.webp = false;
				callbackIfEnd(fullConfig, result, start, callback);
			};
		}, fullConfig.delay);
	} else {
		callbackIfEnd(fullConfig, result, start, callback);
	}

	if (fullConfig.jxl) {
		setTimeout((): void => {
			const jpegXl: HTMLImageElement = new Image();
			// Minimal JPEG XL image
			jpegXl.src =
				'data:image/jxl;base64,/woAkAEAEwgApACNOu8AAKhQGWXc4OVcz5cfOiymbVxnaKttC0sYE884' +
				'WEgoJMYGQ8SoBA==';
			jpegXl.onload = (): void => {
				result.jxl = true;
				callbackIfEnd(fullConfig, result, start, callback);
			};
			jpegXl.onerror = (): void => {
				result.jxl = false;
				callbackIfEnd(fullConfig, result, start, callback);
			};
		}, fullConfig.delay);
	} else {
		callbackIfEnd(fullConfig, result, start, callback);
	}
}

function callbackIfEnd(
	config: ImageFormatFullConfig,
	result: ImageFormatResult,
	start: number,
	callback: (result: ImageFormatResult) => void,
): boolean {
	const diff = Date.now() - start;
	if (diff > result.time) {
		result.time = diff;
	}

	if (
		(!config.avif || result.avif !== null) &&
		(!config.webp || result.webp !== null) &&
		(!config.jxl || result.jxl !== null)
	) {
		callback(result);
		return true;
	}

	return false;
}

// Global functions (side effect)
declare global {
	interface Window {
		/**
		 * Run image formats detection, and execute `callback` function when detection is finished.
		 */
		detectImageFormats: (
			callback: (result: ImageFormatResult) => void,
			config: ImageFormatConfig,
		) => void;

		/**
		 * Default image formats detection.
		 */
		detectImageFormatsDefault: (_document?: Document) => void;
	}
}

if (window) {
	window.detectImageFormats = detectImageFormats;
	window.detectImageFormatsDefault = detectImageFormatsDefault;
}
