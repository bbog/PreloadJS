/*!
 * Preload - a small image preloading library
 * v0.1
 * awesomestsite.com/awesomest-projects/preload-js
 * copyright Bogdan Bucur 2014-2015
 * MIT License
*/

(function () {

	var Preload = function (options) {

		var emptyFunction = function () {};

		var sources = options.sources || [],
			// callback called if some of the images could not be loaded
			onCompletedWithErrors = options.onError || emptyFunction,
			// callback called if all the images are successfully loaded
			onCompletedSuccessfully = options.onSuccess || emptyFunction,
			// callback called after all the operations are completed, whether there are any errors or not
			onComplete = options.onComplete || emptyFunction;

		var hasErrors = false;

		var imagesNotLoaded = [],
			imagesLoaded    = [];

		var totalImagesToLoad = sources.length,
			totalImagesLoaded = 0;

		var sourceIndex = 0,
			totalSources = sources.length;
		for ( ; sourceIndex < totalSources; sourceIndex++) {

			var source = sources[sourceIndex];

			var image = new Image ();

			image.onload = function () {

				totalImagesLoaded++;
				imagesLoaded.push(this.src);
				if (totalImagesLoaded === totalImagesToLoad) {
					onImagesPreloaded();
				}
			};

			image.onerror = function () {

				hasErrors = true;

				totalImagesLoaded++;
				imagesNotLoaded.push(this.src);
				if (totalImagesLoaded === totalImagesToLoad) {
					onImagesPreloaded();
				}
			};

			image.src = source;

		}

		var result = {};
		result.loaded    = imagesLoaded;
		result.notLoaded = imagesNotLoaded;

		function onImagesPreloaded () {

			if (imagesNotLoaded.length) {
				onCompletedWithErrors(result);
			} else {
				onCompletedSuccessfully(result, hasErrors);
			}

			onComplete(result);
		}

	};

	window.Preload = window.Preload || Preload;

})();