const apiKey = 'o6cs20lSVe4f91sRBGgV3pi49DQBv95eDp5K5a9ZaAI';
const count = 10;
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
let isLoading = false;
let imagesLoaded = 0;
let totalImages = 0;

// Added setAttributes a new method to HTMLElement to set attributes using key value pairs
HTMLElement.prototype.setAttributes = function (values) {
    for (let key in values) {
        this.setAttribute(key, values[key]);
    }
}

// Check if images are loading, show/hide loading indicator
const imageLoaded = () => {
    imagesLoaded += 1;
    if(imagesLoaded === totalImages){
        isLoading = false;
    } else{
        isLoading = true;
    }
    loader.hidden = !isLoading;
}

// Function to display the images on screen
const displayImages = (photos) => {
    totalImages = totalImages + photos.length;

    photos.forEach(photo => {
        // Creating link
        let anchor = document.createElement('a');
        anchor.setAttributes({
            'href': photo.links.html,
            'target': '_blank'
        });

        let image = document.createElement('img');
        image.setAttributes({
            'src': photo.urls.regular,
            'alt': photo.alt_description,
            'title': photo.alt_description
        });

        anchor.appendChild(image);

        image.onload = imageLoaded;

        imageContainer.appendChild(anchor)
    })
}

// Fetch photos from api
const getPics = async () => {
    try {
        isLoading = true;
        const response = await fetch(apiURL);
        const data = await response.json();
        displayImages(data);
        // console.log(data)
    } catch (e) {
        console.error(e);
    }
}



// Check if bottom of page is reached
const isBottomReached = () => {
    return (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100;
}

//Call to fetch images if bottom is reached
const fetchMoreImages = () => {
    if(isBottomReached() && !isLoading){
        isLoading = true;
        getPics();
    }
}

// Event trigger to fetch images
window.addEventListener('scroll', function () { fetchMoreImages() })

getPics();