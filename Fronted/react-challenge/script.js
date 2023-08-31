const breedInput = document.getElementById("breedInput");
const searchButton = document.getElementById("searchButton");
const imageDisplay = document.getElementById("imageDisplay");
const favoritesSection = document.getElementById("favorites");

searchButton.addEventListener("click", () => {
    const breed = breedInput.value.trim();

    // Fetch images from the Dog.ceo API
    fetch(`https://dog.ceo/api/breed/${breed}/images/random/10`)
        .then((response) => response.json())
        .then((data) => {
            if (data.status === "error") {
                alert("Invalid breed. Please try again.");
                return;
            }

            // Clear previous images
            imageDisplay.innerHTML = "";

            // Display fetched images
            data.message.forEach((imageUrl) => {
                const img = document.createElement("img");
                img.src = imageUrl;
                img.alt = breed;
                img.addEventListener("click", () => toggleFavorite(img));
                imageDisplay.appendChild(img);
            });
        })
        .catch((error) => console.error(error));
});

function toggleFavorite(img) {
    // Check if the image is already in favorites
    const isFavorite = favoritesSection.contains(img);

    if (isFavorite) {
        // Remove from favorites
        favoritesSection.removeChild(img);
    } else {
        // Add to favorites
        const clone = img.cloneNode(true);
        clone.addEventListener("click", () => toggleFavorite(clone));
        favoritesSection.appendChild(clone);
    }
}

