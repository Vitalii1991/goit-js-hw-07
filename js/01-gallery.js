import { galleryItems } from "./gallery-items.js";
// Change code below this line

console.log(galleryItems);

const galleryListRef = document.querySelector(".gallery");

const cardMarkup = createGalleryCard(galleryItems);

galleryListRef.insertAdjacentHTML("beforeend", cardMarkup);

galleryListRef.addEventListener("click", onCardGalleryClick);

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

function onCardGalleryClick(event) {
  event.preventDefault();

  const largeImageUrl = event.target.dataset.source;

  const instance = basicLightbox.create(`
    <div class="modal">
      <img src="${largeImageUrl}" width="800" height="600">
    </div>`);

  instance.show();

  window.addEventListener("keydown", (event) => {
    if (event.code === "Escape") {
      instance.close();
    }
  });
}
