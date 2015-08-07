(function() {
    'use strict';
    
    // Prepare canvas
    var canvas = document.querySelector('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = 200;
    canvas.height = 200;
    
    // Global variables
    var ipt_color_top = document.getElementById('ipt_color_top');
    var ipt_color_bottom = document.getElementById('ipt_color_bottom');
    var btn_shades = document.getElementById('btn_shades');
    var btn_save = document.getElementById('btn_save');
    ipt_color_top.value = ipt_color_bottom.value = '#de5833';
    var hasShades = false;
    var accessories = {
        'hat': {
            img: new Image(),
            coords: [0, -6]
        },
        'grad': {
            img: new Image(),
            coords: [-6, 8]
        },
        'crown': {
            img: new Image(),
            coords: [32, -2]
        },
        'party': {
            img: new Image(),
            coords: [0, -56]
        },
        'hair': {
            img: new Image(),
            coords: [11, -1]
        }
    };
    
    // Pre-load SVG image of Dax
    var dax = new Image();
    dax.src = 'images/dax.svg';
    
    // Pre-load sunglasses
    var shades = new Image();
    shades.src = 'images/shades.svg';
    
    // Pre-load images of accessories
    for (var image in accessories) {
        if (accessories.hasOwnProperty(image)) {
            accessories[image].img.src = 'images/' + image + '.svg';
        }
    }
    
    document.getElementById('ipt_acc_natural').checked = true;
    
    function doDraw() {
        var gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0.0, ipt_color_top.value);
        gradient.addColorStop(1.0, ipt_color_bottom.value);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(dax, 10, 18, 180, 180);
        if (!!hasShades) {
            ctx.drawImage(shades, 51, 62);
        }
        
        var accessory = document.querySelector('input[name=accessories]:checked').value;
        if (!!accessory && accessory in accessories) {
            var acc = accessories[accessory];
            ctx.drawImage(acc.img, acc.coords[0], acc.coords[1]);
        }
    }
    
    // Add colour picker for background
    ipt_color_top.onchange = doDraw;
    ipt_color_bottom.onchange = doDraw;
    
    // Toggle accessories
    btn_shades.onclick = function() {
        hasShades = !hasShades;
        doDraw();
    };
    
    var radios = document.querySelectorAll('input[name=accessories]');
    for (var i = 0, len = radios.length; i < len; i++) {
        radios[i].onchange = doDraw;
    }
    
    // Export image
    btn_save.onclick = function() {
        var strDataURI = canvas.toDataURL('image/png');
        document.location.href = strDataURI.replace('image/png', 'image/octet-stream');
    };
    
    // Start drawing when the Dax image is loaded
    dax.onload = doDraw;
})();