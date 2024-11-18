resize = document.getElementsByClassName("resize")[0];
resizeLeft = document.getElementsByClassName("resizeLeft")[0];

function initResize(resize,resizeLeft){
    var x,w,sb;
    function initGetVal(e){
        x = e.clientX;
        console.log(getComputedStyle(resizeLeft))
        sb = parseInt(getComputedStyle(resizeLeft).width);
        document.addEventListener("mousemove",initChangeVal);
        document.addEventListener("mouseup",initRemoveEvent);
    }
    function initChangeVal(e){
        w = sb + (e.clientX - x);
        console.log(w)
        resizeLeft.style.width = `${w}px`;
    }
    function initRemoveEvent(e){
        document.removeEventListener("mousemove",initChangeVal);
        document.addEventListener("mousedown",initChangeVal);
    }

    resize.addEventListener("mousedown", initGetVal);
}

console.log(resize);
console.log(resizeLeft);
initResize(resize,resizeLeft);