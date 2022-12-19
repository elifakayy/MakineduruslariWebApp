$(document).ready(function () {
    //selecting all required elements
    const dropArea = document.querySelector(".drag-area"),
        dragText = dropArea.querySelector("header"),
        dragText2 = dropArea.querySelector("span"),
        button = dropArea.querySelector("button"),
        input = dropArea.querySelector("input");
    let file; //this is a global variable and we'll use it inside multiple functions
    button.onclick = () => {
        input.click(); //if user click on the button then the input also clicked
    }
    input.addEventListener("change", function () {
        //getting user select file and [0] this means if user select multiple files then we'll select only the first one
        file = this.files[0];
        dropArea.classList.add("active");
        showFile(); //calling function
    });
    //If user Drag File Over DropArea
    dropArea.addEventListener("dragover", (event) => {
        event.preventDefault(); //preventing from default behaviour
        dropArea.classList.add("active");
        dragText.textContent = "Şimdi Bırak";
        dragText2.textContent = "";
        button.style.display ="none"
    });
    //If user leave dragged File from DropArea
    dropArea.addEventListener("dragleave", () => {
        dropArea.classList.remove("active");
        dragText.textContent = "Dosyayı Sürükle ve Bırak";
        dragText2.textContent = "ya da";
        button.style.display = "inline"
    });
    //If user drop File on DropArea
    dropArea.addEventListener("drop", (event) => {
        event.stopPropagation();
        event.preventDefault(); //preventing from default behaviour
        //getting user select file and [0] this means if user select multiple files then we'll select only the first one
        file = event.dataTransfer.files[0];
        showFile(); //calling function
    });
    function showFile() {
        let fileType = file.type; //getting selected file type
        let validExtensions = ["application/vnd.ms-excel","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"]; //adding some valid image extensions in array
        if (validExtensions.includes(fileType)) { //if user selected file is an image file
            let fileReader = new FileReader(); //creating new FileReader object
            fileReader.fileName = file.name
            fileReader.onload = (e) => {
                let fileURL = fileReader.result; //passing user file source in fileURL variable
                // UNCOMMENT THIS BELOW LINE. I GOT AN ERROR WHILE UPLOADING THIS POST SO I COMMENTED IT
                let fileTag = `<div style=" display: flex;flex-direction: column;align-items: center;"><span class="material-icons" style="font-size:80px">insert_drive_file</span><i>${fileReader.fileName}</i></div>`; //creating an img tag and passing user selected file source inside src attribute
                dropArea.innerHTML = fileTag; //adding that created img tag inside dropArea container
                // all excel file read 
                let workbook = XLSX.read(fileURL, { type: "binary" });
                // sheet by sheet read
                workbook.SheetNames.forEach(sheet => {
                    // sheet inside rows (all)
                    let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet], { raw: false });
                    if (fileReader.fileName.toLowerCase().includes('tezgah')) {
                        createBenchTable(rowObject);
                    } else if (fileReader.fileName.toLowerCase().includes('personel')) {
                        createUserTable(rowObject);
                    } else if (fileReader.fileName.toLowerCase().includes('ürün')) {
                        createProductTable(rowObject);
                    } else if (fileReader.fileName.toLowerCase().includes('i̇şemri')) {
                        createOrderTable(rowObject);
                    }
                    // Do Sometihing
                    
                });
            }
            fileReader.readAsBinaryString(file);
        } else {
            alert("Bu excel dosyası değil!");
            dropArea.classList.remove("active");
            dragText.textContent = "Dosyayı Sürükle ve Bırak";
            dragText2.textContent = "ya da";
            button.style.display = "inline"
        }

    }
});


