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
    var ipt_acc_hat = document.getElementById('ipt_acc_hat');
    var ipt_acc_grad = document.getElementById('ipt_acc_grad');
    var btn_shades = document.getElementById('btn_shades');
    var btn_save = document.getElementById('btn_save');
    ipt_color_top.value = ipt_color_bottom.value = '#de5833';
    var hasShades = false;
    var hasHat = false;
    var hasGrad = false;
    
    // Load SVG image of Dax
    var dax = new Image();
    dax.src = 'images/dax.svg';
    
    // Pre-load accessories
    var shades = new Image();
    shades.src = 'images/shades.svg';
    var hat = new Image();
    hat.src = 'images/hat.svg';
    var grad = new Image();
    grad.src = 'images/grad.svg';
    
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
        if (!!hasHat) {
            ctx.drawImage(hat, 0, -6);
        }
        if (!!hasGrad) {
            ctx.drawImage(grad, -6, 8);
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
    ipt_acc_hat.onchange = function() {
        hasHat = !hasHat;
        doDraw();
    };
    ipt_acc_grad.onchange = function() {
        hasGrad = !hasGrad;
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