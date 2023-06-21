const imageUpload = document.getElementById('image-upload');
const fileName = document.getElementById('file-name');
const previewImage = document.getElementById('preview-image');
const nidNumber = document.getElementById('nid-number');
const submitButton = document.getElementById('submit-btn');

imageUpload.addEventListener('change', function (event) {
    const file = event.target.files[0];
    fileName.textContent = file ? file.name : '';
    if (file) {
        const reader = new FileReader();
        reader.onload = function () {
            previewImage.src = reader.result;
        };
        reader.readAsDataURL(file);
    } else {
        previewImage.src = '';
    }
});

submitButton.addEventListener('click', function () {
    const file = imageUpload.files[0];
    const formData = new FormData();
    formData.append('image', file);

    fetch('/process_image', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                nidNumber.textContent = data.error;
                previewImage.src = ''; // Clear the preview image
            } else {
                const result = data.result;
                const lastResult = result[result.length - 1];
                nidNumber.textContent = `NID Number:\n${lastResult}`;
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});
