import { galleryItems } from "./gallery-items.js";
// Change code below this line

console.log(galleryItems);

const galleryListRef = document.querySelector(".gallery");

function createGalleryCard(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
        <a class="gallery__link" href="${original}">
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </li>`;
    })
    .join("");
}

galleryListRef.insertAdjacentHTML("beforeend", createGalleryCard(galleryItems));

galleryListRef.addEventListener("click", onCardGalleryClick);

let instance;

function onCardGalleryClick(event) {
  event.preventDefault();

  const largeImageUrl = event.target.dataset.source;

  instance = basicLightbox.create(
    `<div class="modal">
      <img src="${largeImageUrl}" width="800" height="600">
    </div>`,
    {
      onShow: (instance) => console.log("onShow", instance),
      onClose: (instance) => console.log("onClose", instance),
    }
  );

  instance.show();

  window.addEventListener("keydown", onEscapeKeyClick);
}

function onEscapeKeyClick(event) {
  console.log(event.code);
  if (event.code === "Escape") {
    instance.close();
    window.removeEventListener("keydown", onEscapeKeyClick);
  }
}
