// =============================
// Global Variables
// =============================

const fileInput = document.getElementById("fileInput");
const previewImage = document.getElementById("previewImage");

const uploadBtn = document.getElementById("uploadBtn");
const extractBtn = document.getElementById("extractBtn");
const clearBtn = document.getElementById("clearBtn");

// =============================
// Choose File Button
// =============================

uploadBtn.addEventListener("click", () => {
    fileInput.click();
});

// =============================
// Preview Selected Image
// =============================

fileInput.addEventListener("change", function () {

    const file = this.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {
        previewImage.src = e.target.result;
    };

    reader.readAsDataURL(file);

});

// =============================
// Extract Information
// =============================

extractBtn.addEventListener("click", async () => {

    const file = fileInput.files[0];

    if (!file) {
        alert("Please select an image.");
        return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {

        extractBtn.innerHTML = "Extracting...";
        extractBtn.disabled = true;

        const response = await fetch("http://127.0.0.1:8000/upload", {
            method: "POST",
            body: formData
        });

        const result = await response.json();

        if (result.success) {

            const data = result.extracted_data;

            document.getElementById("name").innerText =
                data.name || "Missing";

            document.getElementById("course").innerText =
                data.course || "Missing";

            document.getElementById("department").innerText =
                data.department || "Missing";

            document.getElementById("college").innerText =
                data.college || "Missing";

            document.getElementById("register").innerText =
                data.register_no || "Missing";

            document.getElementById("email").innerText =
                data.email || "Missing";

            document.getElementById("phone").innerText =
                data.phone || "Missing";

            document.getElementById("address").innerText =
                data.address || "Missing";

            document.getElementById("date").innerText =
                data.date || "Missing";

            document.getElementById("status").innerHTML =
                `<span class="verified">${result.status}</span>`;

            alert("Extraction Completed!");

        } else {

            alert(result.error);

        }

    } catch (error) {

        console.error(error);
        alert("Cannot connect to FastAPI.");

    }

    extractBtn.innerHTML = "Extract";
    extractBtn.disabled = false;

});

// =============================
// Clear
// =============================

clearBtn.addEventListener("click", () => {

    fileInput.value = "";

    previewImage.src =
        "https://via.placeholder.com/500x500?text=Document+Preview";

    document.getElementById("name").innerText = "-";
    document.getElementById("course").innerText = "-";
    document.getElementById("department").innerText = "-";
    document.getElementById("college").innerText = "-";
    document.getElementById("register").innerText = "-";
    document.getElementById("email").innerText = "-";
    document.getElementById("phone").innerText = "-";
    document.getElementById("address").innerText = "-";
    document.getElementById("date").innerText = "-";

    document.getElementById("status").innerHTML =
        `<span class="verified">Verified</span>`;

});
