const fileInput = document.querySelector(".file-input"),
filterOptions = document.querySelectorAll(".filter button"),
filterName = document.querySelector(".filter-info .name"),
filterValue = document.querySelector(".filter-info .value"),
filterSlider = document.querySelector(".slider input"),
rotateOptions = document.querySelectorAll(".rotate button"),
previewImg = document.querySelector(".preview-img img"),
resetFilterBtn = document.querySelector(".reset-filter"),
saveBtn = document.querySelector(".save-img"),
chooseImgBtn = document.querySelector(".choose-img");

let brightness = 100, saturation = 100, inversion = 0, grayscale = 0;
let rotate = 0, flipHorizontal = 1, flipVertical = 1;


const applyFilters = () => {
    previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
    previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
};



const loadImage = () => {
    let file = fileInput.files[0]; // getting user seletect file
    if(!file) return // return if user hasn't selected file
    previewImg.src = URL.createObjectURL(file); // passing file url as preview img src
    previewImg.addEventListener("load", () => {
        document.querySelector(".container").classList.remove("disable");
    })


    console.log(file);
}

filterOptions.forEach(option => {
    option.addEventListener("click", () => {
        document.querySelector(".filter .active").classList.remove("active");

        option.classList.add('active');
        filterName.innerText = option.innerText;

        if (option.id == "brightness") {
            filterSlider.max = "200";
            filterSlider.value = brightness;
            filterValue.innerText = `${brightness}%`;
        } else if (option.id == "saturation") {
            filterSlider.max = "200";
            filterSlider.value = saturation;
            filterValue.innerText = `${saturation}%`;
        } else if (option.id == "inversion") {
            filterSlider.max = "100";
            filterSlider.value = inversion;
            filterValue.innerText = `${inversion}%`;
        } else if (option.id == "grayscale") {
            filterSlider.max = "100";
            filterSlider.value = grayscale;
            filterValue.innerText = `${grayscale}%`;
        }
    });
})

const updateFilter = () => {
    filterValue.innerText = filterSlider.value+"%";
    const selectedFilter = document.querySelector(".filter .active"); // getting selected filter button

    if (selectedFilter.id === "brightness") {
        brightness = filterSlider.value;
    } else if (selectedFilter.id === "saturation"){ 
        saturation = filterSlider.value;
    } else if (selectedFilter.id === "inversion"){ 
        inversion = filterSlider.value;
    } else if (selectedFilter.id === "grayscale"){ 
        grayscale = filterSlider.value;
    }

    applyFilters();
};

rotateOptions.forEach(option => {
    option.addEventListener("click", () => {
        if(option.id == 'left') {
            rotate -= 90;
        } else if (option.id == 'right') {
            rotate += 90;
        } else if (option.id == 'horizontal') {
            flipHorizontal = flipHorizontal === 1 ? -1 : 1;
        } else if (option.id == 'vertical') {
            flipVertical = flipVertical === 1 ? -1 : 1;

        }

        applyFilters();
    })
});

const resetFilter = () => {
    brightness = 100; saturation = 100; inversion = 0; grayscale = 0;
    rotate = 0; flipHorizontal = 1; flipVertical = 1;
    applyFilters();
    // updateFilter();
}

const saveImage = () => {
    const canvas = document.createElement("canvas"); // creating canvas
    const ctx = canvas.getContext("2d");
    canvas.width = previewImg.naturalWidth;
    canvas.height = previewImg.naturalHeight;

    
    ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
    ctx.translate(canvas.width/2, canvas.height/2);
    if(rotate !== 0) {
        ctx.rotate(rotate*Math.PI / 180);
    }
    ctx.scale(flipHorizontal, flipVertical);
    ctx.drawImage(previewImg, -canvas.width/2, -canvas.height/2,canvas.width, canvas.height);
    const link = document.createElement("a"); // creating <a> element
    link.download = "image.jpg";
    link.href= canvas.toDataURL(); // passing <a> tag href value to canvas data url
    link.click(); // clicking <a>tag so the image download
}

fileInput.addEventListener("change", loadImage);
filterSlider.addEventListener("input", updateFilter);
resetFilterBtn.addEventListener("click", resetFilter);
saveBtn.addEventListener("click", saveImage);
chooseImgBtn.addEventListener("click", () => fileInput.click());

