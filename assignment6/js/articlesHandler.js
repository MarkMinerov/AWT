export default class ArticlesHandler {
  constructor() {
    this.file = null;
    this.image = null;
    this.noImageError = null;
    this.imageUrlInput = null;
    this.defaultImage = null;
    this.chooseImageButton = null;
  }

  createImg() {
    const img = document.createElement("img");
    img.alt = "Image Preview";
    img.classList.add("preview-image");

    this.image = img;
  }

  resetImg(resetFully = false) {
    this.image.parentElement.removeChild(this.image);
    this.image = null;

    if (this.defaultImage && !resetFully) {
      this.createImg();
      this.insertImage(this.defaultImage, this.chooseImageButton);
      this.imageUrlInput.value = this.defaultImage;
    }
  }

  insertImage(data, element) {
    this.image.src = data;
    element.parentElement.insertBefore(this.image, element.nextSibling);
  }

  setFormObserver(opinionsFormElmId) {
    this.file = null;
    this.image = null;
    this.noImageError = null;
    this.imageUrlInput = null;
    this.defaultImage = null;
    this.chooseImageButton = null;

    const imagePreview = document.querySelector("#imagePreview");
    const imgFileInput = document.querySelector("#imgFileInput");
    this.chooseImageButton = document.querySelector("#chooseImageButton");

    this.noImageError = document.querySelector("#noImageError");
    this.imageUrlInput = document.querySelector("#imageLink");

    if (this.imageUrlInput.value.length) {
      this.defaultImage = this.imageUrlInput.value;

      this.createImg();
      this.insertImage(this.imageUrlInput.value, this.chooseImageButton);
    }
    // events
    document.getElementById(opinionsFormElmId).addEventListener("submit", (event) => this.processOpnFrmData(event));

    document.querySelector("#imgFileInput").addEventListener("change", (e) => {
      this.file = e.target.files[0];

      if (this.file) {
        const reader = new FileReader();

        if (this.image) this.resetImg(true);

        reader.addEventListener("load", () => {
          this.noImageError.style.display = "none";

          this.createImg();
          this.insertImage(reader.result, this.chooseImageButton);
        });

        reader.readAsDataURL(this.file);
      }
    });

    document.querySelector("#btCancelFileUpload").addEventListener("click", (e) => {
      this.resetImg();
      this.file = null;
    });

    document.querySelector("#btFileUpload").addEventListener("click", (e) => {
      if (this.image == null || this.image.src === this.defaultImage || this.file == null) {
        this.noImageError.style.display = "block";
        return;
      }

      const formData = new FormData();
      formData.append("file", this.file);
      const apiUrl = new URL(`${TUKE_API}/api/fileUpload`);

      fetch(apiUrl, {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            return Promise.reject(new Error(`Server answered with ${response.status}: ${response.statusText}.`));
          }
        })
        .then((data) => {
          if (data.fullFileUrl) {
            this.imageUrlInput.value = data.fullFileUrl;
          }
        });
    });
  }

  processOpnFrmData(event) {
    event.preventDefault();
  }
}
