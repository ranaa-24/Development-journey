
const fileUplaod = document.getElementById('fileUpload');
const image = document.getElementById('img');
const btn = document.getElementById('download');
const clear = document.getElementById('clear');

fileUplaod.onchange = () => {
    const file = fileUplaod.files[0];
    console.log(file.name);
    console.log(file.size);
    image.src = URL.createObjectURL(file);
    console.log(URL.createObjectURL(file));
    
}

btn.addEventListener('click', () => {
    if (!fileUplaod.files.length) return;

    // this works fine, but for CORS it may ignore.. the download name or the dowload atttribute 
    const a = document.createElement('a');
    a.href = image.src;
    a.download = "savedPhotoo";
    a.click();
})


clear.onclick = () => {
    fileUplaod.value = null;
    image.src = '';
}