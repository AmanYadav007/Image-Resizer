// Global variables to store original image dimensions and data URL
let originalWidth, originalHeight, originalImage, resizedImageURL;

// Event listener for image upload to get original dimensions
document.getElementById('upload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const img = new Image();
        img.onload = function() {
            originalWidth = img.width;
            originalHeight = img.height;
            originalImage = img;

            // Hide placeholder and display uploaded image in preview
            document.getElementById('placeholder').style.display = 'none';
            document.getElementById('preview').src = img.src;
            document.getElementById('preview').style.display = 'block';
        };
        img.src = URL.createObjectURL(file);
    }
});

// Event listeners for width and height inputs
document.getElementById('width').addEventListener('input', function() {
    if (document.getElementById('aspectRatioLock').checked) {
        updateHeight();
    }
});

document.getElementById('height').addEventListener('input', function() {
    if (document.getElementById('aspectRatioLock').checked) {
        updateWidth();
    }
});

// Function to update height based on aspect ratio
function updateHeight() {
    const width = document.getElementById('width').value;
    if (originalWidth && originalHeight) {
        const newHeight = Math.round(width * (originalHeight / originalWidth));
        document.getElementById('height').value = newHeight;
    }
}

// Function to update width based on aspect ratio
function updateWidth() {
    const height = document.getElementById('height').value;
    if (originalWidth && originalHeight) {
        const newWidth = Math.round(height * (originalWidth / originalHeight));
        document.getElementById('width').value = newWidth;
    }
}

// Function to generate preview of resized image
document.getElementById('previewButton').addEventListener('click', function() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const width = document.getElementById('width').value || originalWidth;
    const height = document.getElementById('height').value || originalHeight;
    const format = document.getElementById('format').value;

    // Resize the image and update the canvas
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(originalImage, 0, 0, width, height);

    // Generate the resized image URL for preview
    resizedImageURL = canvas.toDataURL(`image/${format}`);

    // Update the preview image
    const previewImage = document.getElementById('preview');
    previewImage.src = resizedImageURL;
    previewImage.style.display = 'block';
});

// Function to resize and download the image
document.getElementById('resizeButton').addEventListener('click', function() {
    if (resizedImageURL) {
        const format = document.getElementById('format').value;
        downloadImage(resizedImageURL, `resized-image.${format}`);
    } else {
        alert("Please preview the image before downloading.");
    }
});

// Function to download the image
function downloadImage(dataURL, filename) {
    const a = document.createElement('a');
    a.href = dataURL;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Initialize the app with a broken image placeholder or preview placeholder
document.addEventListener('DOMContentLoaded', function() {
    const previewImage = document.getElementById('preview');
    previewImage.src = '';  // Set to a default placeholder image if desired
    previewImage.style.display = 'none';  // Initially hide the preview
});
