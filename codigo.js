const zona = document.querySelector(".zonadearrastre");

zona.addEventListener("dragover", e=>{
    e.preventDefault();
    changeStyle(e.srcElement, "#333");  
})

zona.addEventListener("dragleave", e=>{
    e.preventDefault();
    changeStyle(e.srcElement, "#888");  
})

zona.addEventListener("drop", e=>{
    e.preventDefault();
    changeStyle(e.srcElement, "#888");
    cargarArchivo(e.dataTransfer.files[0])
    zona.style.border = "4px solid #999;"
})

const changeStyle = (obj,color)=>{
    obj.style.color = color;
    obj.style.border = `4px dashed ${color}`;
}

const cargarArchivo = ar => {
    const reader = new FileReader();
    reader.readAsDataURL(ar);
    reader.addEventListener("load", e=>{
        let url = URL.createObjectURL(ar)
        let img = document.createElement("IMG");
        img.setAttribute("src", url)
        document.querySelector(".resultado").appendChild(img);   
    })
    reader.addEventListener("progress", e=>{
        let carga = Math.round(e.loaded / ar.size * 100);
        zona.textContent = `${carga}%`;
        document.querySelector("barra-de-carga").style.width = `${carga}%`;
        document.querySelector("barra-de-carga").style.padding = "75px 20px";
    });
    reader.addEventListener("loadend", e=>{
        changeStyle(zona, "#green");
        zona.style.borderStyle = "solid";
        document.querySelector(".barra-de-carga").style.background = "#blue";
        setTimeout(()=>{
            zona.style.color = "#white";
            zona.style.animation = "aparecer 1s fordwards";
            zona.textContent = "Carga completa";
        },500)
    })
}   