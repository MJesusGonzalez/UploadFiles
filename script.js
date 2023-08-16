const fileInput = document.getElementById("fileInput");
const fileInfo = document.getElementById("fileInfo");
const preview = document.getElementById("preview");

fileInput.addEventListener("change", function (event) {
  const selectedFile = event.target.files[0];

  if (selectedFile) {
    const validExtensions = ["jpg", "jpeg", "png"];
    const maxFileSize = 5 * 1024 * 1024; // 5MB in bytes

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
        "Archivo no válido. Por favor, sube un archivo JPG o PNG de máximo 5MB.";
      preview.style.display = "none";
    }
  } else {
    fileInfo.innerHTML = "No se ha seleccionado ningún archivo.";
    preview.style.display = "none";
  }
});
