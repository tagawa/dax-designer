(function() {
    'use strict';
    
    // Prepare canvas
    var canvas = document.querySelector('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = 200;
    canvas.height = 200;
    
    // Global variables
    var ipt_color = document.getElementById('ipt_color');
    var btn_shades = document.getElementById('btn_shades');
    var btn_save = document.getElementById('btn_save');
    ipt_color.value = '#de5833';
    var hasShades = false;
    
    // Load SVG image of Dax
    var dax = new Image();
    dax.src = 'images/dax.svg';
    
    // Pre-load sunglasses
    var shades = new Image();
    shades.src = 'images/shades.svg';
    
    function doDraw() {
        ctx.fillStyle = ipt_color.value;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(dax, 0, 0);
        if (!!hasShades) {
            ctx.drawImage(shades, 51, 49);
        }
    }
    
    // Add colour picker for background
    ipt_color.onchange = doDraw;
    
    // Toggle sunglasses
    btn_shades.onclick = function() {
        hasShades = !hasShades;
        doDraw();
    };
    
    // Export image
    btn_save.onclick = function() {
        var strDataURI = canvas.toDataURL('image/png');
        document.location.href = strDataURI.replace('image/png', 'image/octet-stream');
    };
    
    // Start drawing when the Dax image is loaded
    dax.onload = doDraw;
})();