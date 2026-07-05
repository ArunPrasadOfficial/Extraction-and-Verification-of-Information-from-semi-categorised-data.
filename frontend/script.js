const imageInput = document.getElementById("imageInput");
const preview = document.getElementById("preview");

imageInput.addEventListener("change", function () {

const file = this.files[0];

if(file){

preview.src = URL.createObjectURL(file);

preview.style.display="block";

}

});

function uploadImage(){

const file=imageInput.files[0];

if(!file){

alert("Please select an image.");

return;

}

document.getElementById("status").innerHTML="⏳ Processing...";

const formData=new FormData();

formData.append("file",file);

fetch("http://127.0.0.1:8000/upload",{

method:"POST",

body:formData

})

.then(response=>response.json())

.then(data=>{

if(!data.success){

document.getElementById("status").innerHTML="❌ Failed";

return;

}

document.getElementById("name").innerHTML=data.extracted_data.name;

document.getElementById("phone").innerHTML=data.extracted_data.phone;

document.getElementById("email").innerHTML=data.extracted_data.email;

document.getElementById("course").innerHTML=data.extracted_data.course;

document.getElementById("college").innerHTML=data.extracted_data.college;

document.getElementById("address").innerHTML=data.extracted_data.address;

document.getElementById("date").innerHTML=data.extracted_data.date;

if(data.status==="Verified"){

document.getElementById("status").style.background="green";

document.getElementById("status").innerHTML="✅ VERIFIED";

}else{

document.getElementById("status").style.background="red";

document.getElementById("status").innerHTML="❌ NOT VERIFIED";

}

})

.catch(error=>{

console.log(error);

document.getElementById("status").style.background="red";

document.getElementById("status").innerHTML="❌ Backend Connection Failed";

});

}
