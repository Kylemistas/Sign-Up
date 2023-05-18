const fileUploader = document.getElementById('file-uploader');
const feedBack = document.getElementById('feedback');
const progress = document.getElementById('progress');

const reader = new FileReader();

fileUploader.addEventListener('change',(event) => {
    const files = event.target.files;
    const file = files[0];
    reader.readAsDataURL(file);

    reader.addEventListener('progress', (event) => {
        if(event.loaded && event.total){
            const percent =(event.loaded / event.total) * 100;
            progress.value = percent;
            document.getElementById('progress-label').innerHTML = Math.round(percent) + "%";

            if(percent === 100){
                let msg = `<span>File <u><b> ${file.name}</b><u> has been uploaded successfully. </span>`;
                feedBack.innerHTML = msg;
            }
        }
    });
});