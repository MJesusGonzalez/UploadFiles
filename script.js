const fileInput = document.getElementById("fileInput");
const uploadButton = document.getElementById("uploadButton");
const fileInfo = document.getElementById("fileInfo");
const preview = document.getElementById("preview");
const progressBar = document.getElementById("progressBar");

fileInput.addEventListener("change", function (event) {
  const selectedFile = event.target.files[0];

  if (selectedFile) {
    const validExtensions = ["jpg", "jpeg", "png"];
    const maxFileSize = 10 * 1024 * 1024; // 5MB in bytes

    const fileExtension = selectedFile.name.split(".").pop().toLowerCase();
    const fileType = selectedFile.type.toLowerCase();

    if (
      validExtensions.includes(fileExtension) &&
      selectedFile.size <= maxFileSize &&
      (fileType === "image/jpeg" ||
        fileType === "image/jpg" ||
        fileType === "image/png")
    ) {
      fileInfo.innerHTML = `
            Nombre del archivo: ${selectedFile.name}<br>
            Tipo MIME: ${selectedFile.type}<br>
            Tamaño: ${selectedFile.size} bytes
          `;

      if (fileType.startsWith("image/")) {
        preview.style.display = "block";

        const reader = new FileReader();

        reader.onload = function (e) {
          preview.src = e.target.result;
        };

        reader.readAsDataURL(selectedFile);
      } else {
        preview.style.display = "none";
      }
    } else {
      fileInfo.innerHTML =
        "Archivo no válido. Por favor, sube un archivo JPG o PNG de máximo 10MB.";
      preview.style.display = "none";
    }
  } else {
    fileInfo.innerHTML = "No se ha seleccionado ningún archivo.";
    preview.style.display = "none";
  }
});

uploadButton.addEventListener("click", function () {
  const selectedFile = fileInput.files[0];

  if (selectedFile) {
    const formData = new FormData();
    formData.append("file", selectedFile);

    uploadButton.disabled = true;
    progressBar.style.display = "block";
    progressBar.value = 0;

    axios.post("http://localhost:3000/upload", formData, {
      onUploadProgress: (progressEvent) => {
        const percentage = Math.round(
          (progressEvent.loaded / progressEvent.total) * 100
        );
        progressBar.value = percentage;
      },
    });
  }
});
