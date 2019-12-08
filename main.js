function slugify (text) {
    const a = 'àáäâèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;'
    const b = 'aaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh------'
    const p = new RegExp(a.split('').join('|'), 'g')
  
    return text.toString().toLowerCase()
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(p, c =>
          b.charAt(a.indexOf(c)))     // Replace special chars
      .replace(/&/g, '-and-')         // Replace & with 'and'
      .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
      .replace(/\-\-+/g, '-')         // Replace multiple - with single -
      .replace(/^-+/, '')             // Trim - from start of text
      .replace(/-+$/, '')             // Trim - from end of text
}

let inputName = document.querySelector('.input-name');
inputName.addEventListener('keyup', (e) => {
    let canvasName = document.querySelector('.name');
    canvasName.textContent = e.currentTarget.value;
});

let selectPhoto = document.querySelector('.select-photo');
let inputSelectPhoto = document.querySelector('.input-select-photo');

selectPhoto.addEventListener('click', (e) => {
    inputSelectPhoto.click();
});

inputSelectPhoto.addEventListener('change', (e) => {
    let file = e.currentTarget.files[0];
    let reader = new FileReader();
    reader.onload = function(e) {
        let img = e.target.result;
        let photo = document.querySelector('.photo');
        photo.style.backgroundImage = `url(${img})`;
    };
    reader.readAsDataURL(file);
});

let downloadButton = document.querySelector('.download');
let shareable = document.querySelector('#capture');

downloadButton.addEventListener('click', (e) => {
    html2canvas(shareable).then(canvas => {
        canvas.toBlob(function (blob) {
            saveAs(blob, slugify(inputName.value));
        })
    });
    
});