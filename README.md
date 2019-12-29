#PreloaderJS


A small JavaScript script for preloading images

**PreloaderJS** is a tiny and very simple image preloading library, with the production version being under 600 bytes.

It is designed for the basic scenario where you have a list of image paths and you want to make sure all the images are loaded before proceeding further. 

For example, you want to make a custom animated scene and you need all the images ready to go before starting the animation.


##Project page

- [PreloaderJS](https://dev.bogdanbucur.eu/awesomest-projects/preloader-js/)


##Download

- [Development](https://github.com/bbog/PreloaderJS/blob/master/dist/preloader.js)
- [Production](https://github.com/bbog/PreloaderJS/blob/master/dist/preloader.min.js)


##Demo

- [Demo](https://dev.bogdanbucur.eu/awesomest-projects/preloader-js/demo/)


##Basic usage

**PreloaderJS** requires an array of image paths and allows you to attach up to three different callbacks, namely `onComplete`, `onSuccess` and `onError`.


You can use only one or all of the above callbacks, depending on your needs. It is also possible to have multiple preload attempts without any problems.


- `onComplete(results, err)`

This callback is triggered after a preloading attempt was done for **all** the files, even if only **some** were actually loaded.

It will be called even if some of the files were not preloaded, due to errors, and will return an object with the properties `loaded` and `notLoaded`, containg the paths to the files that were successfully loaded or not, and a boolean value that tells whether any errors were encountered or not.

Example:

```js
Preload({
    sources: ['img/does-not-exist.jpg', 'img/exists.jpg'],
    onComplete: function (result, hasErrors) {

        if (hasErrors) {
            console.log('All files preloaded, some with errors, some successfully');

            var imagesNotLoadedList = result.notLoaded.join(', ');
            console.log('Files not preloaded: ' + imagesNotLoadedList);
            // will log "img/does-not-exist.jpg"

            var imagesLoadedList = result.loaded.join(', ');
            console.log('Files preloaded: ' + imagesLoadedList);
            // will log "img/exists.jpg"

        } else {

            console.log('All files were loaded');
        }
    }
});
```


- `onSuccess(results)`

This callback is triggered only if **all** the files were successfully preloaded.

It will return an object with the properties `loaded` and `notLoaded`, same as `onComplete`.

Example:

```js
Preload({
    sources: ['img/exists.jpg', 'img/also-exists.jpg'],
    onSuccess: function (result) {
        console.log('All files preloaded');
    }
});
```


- `onError(results)`

This callback is triggered if **some** of the files could not be preloaded.

It will return an object with the properties `loaded` and `notLoaded`, same as `onComplete`.

Example:

```js
Preload({
    sources: ['img/exists.jpg', 'img/does-not-exist.jpg', 'img/does-not-exist-either.jpg'],
    onError: function (result) {
        var imagesNotLoadedList = result.notLoaded.join(', ');
        console.log('Files not preloaded: ' + imagesNotLoadedList);
        // will log "img/does-not-exist.jpg, img/does-not-exist-either.jpg"
    }
});
```

##Dependencies

None


##Browser support

Any modern browser
