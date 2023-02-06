"use strict"

const fileInput = document.querySelector(".file-input");
const chooseInputBtn = document.querySelector(".choose-img");
const previewImg = document.querySelector(".preview-img img");
const filterOptions = document.querySelectorAll(".filter button") //Filter buttons
const filterInfo = document.querySelector(".filter-info .name");
const filterValue = document.querySelector(".filter-info .value")
const filterSlider = document.querySelector(".slider input");
const rotateOption = document.querySelectorAll(".rotate button");//get rotate and scale btns
const resetFilterBtn = document.querySelector(".reset-filter") //get reset filter button
const saveImgBtn = document.querySelector(".save-img") //get save filter button

let brightness = 100, saturation = 100, inversion = 0,  grayscale = 0;
let rotate = 0, flipHorizontal = 1, flipVertical = 1;

function start ( ){
    chooseInputBtn.addEventListener("click", () => fileInput.click())
    fileInput.addEventListener("change",loadImage)
    filterSlider.addEventListener("input", updateFilter)
    resetFilterBtn.addEventListener("click", resetFilters)
    saveImgBtn.addEventListener("click", saveImage)
    filterOptions.forEach((option) =>{
    option.addEventListener("click", ()=>{//adding click event listener to all filter buttons
        document.querySelector(".filter .active").classList.remove("active")
        option.classList.add("active")
        filterInfo.textContent = option.textContent

        //Shows the particular selected filter value
        if(option.id === "brightness"){
            filterSlider.max = "200"
            filterSlider.value = brightness
            filterValue.textContent = `${brightness}%`
        }else if(option.id === "saturation"){
            filterSlider.max = "200";
            filterSlider.value = saturation
            filterValue.textContent = `${saturation}%`
        }else if(option.id === "inversion"){
            filterSlider.max = "100";
            filterSlider.value = inversion
            filterValue.textContent = `${inversion}%`
        }else if(option.id === "grayscale"){
            filterSlider.max = "100";
            filterSlider.value = grayscale
            filterValue.textContent = `${grayscale}%`
        }

    })
    })
    rotateOption.forEach(option =>{
    option.addEventListener("click",() =>{ //adding click event listener to all rotate buttons
        if(option.id === "left"){
            rotate -= 90 // if clicked btn is left rotate, decrement rotate value by -90,
        }else if(option.id === "right"){
            rotate += 90 // if clicked btn is Right rotate, decrement rotate value by +90,
        }else if(option.id === "horizontal"){
            flipHorizontal = flipHorizontal === 1 ? -1 : 1//if flipHorizontal value is 1, set this value to -1 else set 1
        }else if(option.id === "vertical"){
            flipVertical = flipVertical === 1 ? -1 : 1//if flipVertical value is 1, set this value to -1 else set 1
        }
        applyFilters()
    })
    })
}
function loadImage (){

    let file;
    file = fileInput.files[0]; // Getting user selected file
    if(!file){
        return
    }
    previewImg.src = URL.createObjectURL(file)// passing file url as preview img source
    previewImg.addEventListener("load",() =>{
        resetFilterBtn.click() // clicking reset btn , so the filter value reset if the user select the new image
        document.querySelector(".container").classList.remove("disable")
    })
} //For file choose

function updateFilter (){
    filterValue.textContent = `${filterSlider.value}%`;
    const selectedFilter = document.querySelector(".filter .active") // Gets Filter Btn 
    
    if(selectedFilter.id === "brightness"){
         brightness = filterSlider.value
    }else if (selectedFilter.id === "saturation"){
        saturation = filterSlider.value
    }else if (selectedFilter.id === "inversion"){
        inversion = filterSlider.value
    }else if (selectedFilter.id === "grayscale"){
        grayscale = filterSlider.value
    }
    applyFilters ()
}

function applyFilters (){
    previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`
    previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`
}

function resetFilters (){
    brightness = 100, saturation = 100, inversion = 0,  grayscale = 0;
    rotate = 0, flipHorizontal = 1, flipVertical = 1;
    filterOptions[0].click() // clicking brightness btn, so the brightness by default
    applyFilters()
   
}

function saveImage(){
    const canvas = document.createElement("canvas"); // creating canvas element
    const ctx = canvas.getContext("2d"); //canvas.getcontext returns a drawing context on the canvas
    canvas.width = previewImg.naturalWidth;
    canvas.width = previewImg.naturalHeight;
    ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`
    ctx.translate(canvas.width/2, canvas.height/2)//translating canvas from center
    rotate !== 0 ? ctx.rotate(rotate * Math.PI / 180): "";//if rotate value isnt 0, rotate the canvas
    ctx.scale(flipHorizontal,flipVertical)//flip canvas, horizontaly / verticaly
    ctx.drawImage(previewImg, -canvas.width/2, -canvas.height/2, canvas.width, canvas.height)

    const link = document.createElement("a"); // creating <a> element;
    link.download = "newImage.jpg";
    link.href = canvas.toDataURL() // passing <a> tag href value to canvas data url
    link.click()
}

start()