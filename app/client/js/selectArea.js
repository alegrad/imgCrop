var cropp =(function () {
    var container = document.getElementsByClassName("image-container")[0];
    var croppie = new Croppie(container, {
        viewport: {
            width: 200,
            height: 200,
            type: 'square'
        },
        boundary: {
            width: 350,
            height: 350
        }
    });

    return croppie;
})();