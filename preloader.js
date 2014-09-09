


(function () {

	var Preload = function (options) {

		var sources = options.sources || [],
			onErrorCallback = options.onError || function () {},
			onCompleteCallback = options.onComplete || function () {};

		var imagesNotLoaded = [];

		var totalImagesToLoad = sources.length,
			totalImagesLoaded = 0;

		var sourceIndex = 0,
			totalSources = sources.length;
		for ( ; sourceIndex < totalSources; sourceIndex++) {

			var source = sources[sourceIndex];

			var image = new Image ();

			image.onload = function () {

				totalImagesLoaded++;
				if (totalImagesLoaded === totalImagesToLoad) {
					onImagesPreloaded();
				}
			};

			image.onerror = function () {

				totalImagesLoaded++;
				imagesNotLoaded.push(this.src);
				if (totalImagesLoaded === totalImagesToLoad) {
					onImagesPreloaded();
				}
			};

			image.src = source;

		}

		function onImagesPreloaded () {

			if (imagesNotLoaded.length) {
				onErrorCallback(imagesNotLoaded);
			} else {
				onCompleteCallback();
			}
		}

	};

	window.Preload = window.Preload || Preload;

})();