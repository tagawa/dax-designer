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
    
    // Load SVG image of Dax
    var dax = new Image();
    dax.src = 'images/dax.svg';
    
    // Pre-load sunglasses
    var shades = new Image();
    shades.src = 'images/shades.svg';
    
    function doDraw() {
        var gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0.0, ipt_color_top.value);
        gradient.addColorStop(1.0, ipt_color_bottom.value);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(dax, 0, 0);
        if (!!hasShades) {
            ctx.drawImage(shades, 51, 49);
        }
    }
    
    // Add colour picker for background
    ipt_color_top.onchange = doDraw;
    ipt_color_bottom.onchange = doDraw;
    
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