
var ACCESS_KEY = "1iJ-EwytdqreYPfVTiq1FJK5bRsRQSp2BFrDV7JFmNQ";

// Display images on the page
function displayImages(data) {

    var sampElem = document.getElementById("sampleOutput");
    var titleElem = document.getElementById("title");

    sampElem.innerHTML = "";

    if (!data.results || data.results.length === 0) {
        titleElem.textContent = "No images found.";
        return;
    }

    titleElem.textContent = "Search Results: " + data.total;

    data.results.forEach(function(photo) {

        var img = document.createElement("img");

        img.src = photo.urls.small;
        img.alt = photo.alt_description || "Unsplash photo";

        // Mouse event
        img.addEventListener("mouseover", function() {
            img.style.opacity = "0.7";
        });

        img.addEventListener("mouseout", function() {
            img.style.opacity = "1";
        });

        sampElem.appendChild(img);

    });
}


// 1. Search using XMLHttpRequest
function searchUsingXHR() {

    var userId = document.getElementById("inputBox").value;
    var sampElem = document.getElementById("sampleOutput");
    var titleElem = document.getElementById("title");

    if (userId.trim() === "") {
        titleElem.textContent = "Please enter a search keyword.";
        return;
    }

    sampElem.innerHTML = "";
    titleElem.textContent = "Loading...";

    var xhr = new XMLHttpRequest();

    xhr.open(
        "GET",
        "https://api.unsplash.com/search/photos?query=" +
        encodeURIComponent(userId) + "&per_page=12"
    );

    xhr.setRequestHeader(
        "Authorization",
        "Client-ID " + "1iJ-EwytdqreYPfVTiq1FJK5bRsRQSp2BFrDV7JFmNQ"
    );

    xhr.onreadystatechange = function() {

        if (xhr.readyState === 4) {

            if (xhr.status === 200) {

                var data = JSON.parse(xhr.responseText);

                displayImages(data);

            } else {

                titleElem.textContent =
                    "Error: " + xhr.status;

            }

        }

    };

    xhr.send();

}


// 2. Search using Fetch with Promises
function searchUsingFetch() {

    var userId = document.getElementById("inputBox").value;
    var titleElem = document.getElementById("title");
    var sampElem = document.getElementById("sampleOutput");

    if (userId.trim() === "") {
        titleElem.textContent = "Please enter a search keyword.";
        return;
    }

    sampElem.innerHTML = "";
    titleElem.textContent = "Loading...";

    fetch(
        "https://api.unsplash.com/search/photos?query=" +
        encodeURIComponent(userId) + "&per_page=12",
        {
            headers: {
                "Authorization": "Client-ID " + ACCESS_KEY
            }
        }
    )

    .then(function(response) {

        if (!response.ok) {
            throw new Error("HTTP Error: " + response.status);
        }

        return response.json();

    })

    .then(function(data) {

        displayImages(data);

    })

    .catch(function(error) {

        titleElem.textContent = error.message;

    });

}


// 3. Search using Fetch with Async/Await
async function searchUsingFetchAwaitAsync() {

    var userId = document.getElementById("inputBox").value;
    var titleElem = document.getElementById("title");
    var sampElem = document.getElementById("sampleOutput");

    if (userId.trim() === "") {
        titleElem.textContent = "Please enter a search keyword.";
        return;
    }

    sampElem.innerHTML = "";
    titleElem.textContent = "Loading...";

    try {

        var response = await fetch(
            "https://api.unsplash.com/search/photos?query=" +
            encodeURIComponent(userId) + "&per_page=12",
            {
                headers: {
                    "Authorization": "Client-ID " + "1iJ-EwytdqreYPfVTiq1FJK5bRsRQSp2BFrDV7JFmNQ"
                }
            }
        );

        if (!response.ok) {
            throw new Error("HTTP Error: " + response.status);
        }

        var data = await response.json();

        displayImages(data);

    }

    catch (error) {

        titleElem.textContent = error.message;

    }

}


// Keyboard event: press Enter to search
document.getElementById("inputBox").addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {
            searchUsingFetchAwaitAsync();
        }

    }
);
