const imageContainer = document.querySelector("#image-container");
const loader = document.querySelector("#loader");
let photosArray = [];

// Unsplash API
const accessKey = "BiYD9yL_P6pzqyh0YN9oQctbp8w0BvexUCiMpre77Yw";
const count = 10;
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${accessKey}&count=${count}`;

// Helper function that accepts 2 arguments, the element and its attributes(object)
function setAttributes(element, attributes) {
    for (const key in attributes) {
        if ((key === "alt" || key === "title") && attributes[key] === null) {
            continue;
        }
        element.setAttribute(key, attributes[key]);
    }
}

// Create Elements for links & photos, add to DOM
function displayPhotos(photos, container) {
    for (const photo of photos) {
        // item
        const item = document.createElement("a");
        setAttributes(item, {
            href: photo.links.html,
            target: "_blank"
        });

        // image
        const img = document.createElement("img");
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.description,
            title: photo.description
        });

        // put <img> inside <a> and <a> inside container element
        item.appendChild(img);
        container.appendChild(item);
    }
}

async function getData() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos(photosArray, imageContainer);
    } catch (error) {
        console.log("Error", error);
    }
}

// On Load
getData();
