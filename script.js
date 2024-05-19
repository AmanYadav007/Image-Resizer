// script.js
document.getElementById('resizeButton').addEventListener('click', function() {
    processImage(true);
});

document.getElementById('previewButton').addEventListener('click', function() {
    processImage(false);
});

function processImage(download) {
    const upload = document.getElementById('upload').files[0];
    const width = parseInt(document.getElementById('width').value);
    const height = parseInt(document.getElementById('height').value);
    const format = document.getElementById('format').value;

    if (upload && width && height) {
        const reader = new FileReader();
        reader.readAsDataURL(upload);
        reader.onload = function(event) {
            const img = new Image();
            img.src = event.target.result;
            img.onload = function() {
                const canvas = document.getElementById('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(img, 0, 0, width, height);

                canvas.toBlob(function(blob) {
                    const objectURL = URL.createObjectURL(blob);
                    const preview = document.getElementById('preview');
                    const placeholder = document.getElementById('placeholder');
                    
                    // Update the preview
                    preview.src = objectURL;
                    preview.style.display = 'block';
                    placeholder.style.display = 'none';

                    if (download) {
                        const link = document.createElement('a');
                        link.href = objectURL;
                        link.download = `resized_image.${format}`;
                        link.click();
                    }
                }, `image/${format}`);
            };
        };
    } else {
        alert('Please upload an image and enter valid width and height values.');
    }
}
