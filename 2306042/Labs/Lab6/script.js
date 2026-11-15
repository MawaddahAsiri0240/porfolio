
// Get HTML elements
const likeBtn = document.getElementById("like-btn");
const dislikeBtn = document.getElementById("dislike-btn");

const likeCount = document.getElementById("like-count");
const dislikeCount = document.getElementById("dislike-count");

const commentInput = document.getElementById("comment-input");
const submitBtn = document.getElementById("submit-btn");
const clearBtn = document.getElementById("clear-btn");

const commentsList = document.getElementById("comments-list");


// Set cookie
function setCookie(name, value) {
    document.cookie = name + "=" + encodeURIComponent(value) +
        "; max-age=31536000; path=/";
}


// Get cookie
function getCookie(name) {
    let cookies = document.cookie.split("; ");

    for (let cookie of cookies) {
        let parts = cookie.split("=");

        if (parts[0] === name) {
            return decodeURIComponent(parts.slice(1).join("="));
        }
    }

    return null;
}


// Initialize counters
let likes = getCookie("likes") !== null
    ? Number(getCookie("likes")) : 100;

let dislikes = getCookie("dislikes") !== null
    ? Number(getCookie("dislikes")) : 20;


// Initialize comments
let comments = [];

try {
    comments = JSON.parse(getCookie("comments") || "[]");

    if (!Array.isArray(comments)) {
        comments = [];
    }
} catch (error) {
    comments = [];
}


// Update counters
function updateCounters() {
    likeCount.textContent = likes;
    dislikeCount.textContent = dislikes;
}


// Like button
likeBtn.addEventListener("click", function() {

    likes++;

    setCookie("likes", likes);

    updateCounters();

});


// Dislike button
dislikeBtn.addEventListener("click", function() {

    dislikes++;

    setCookie("dislikes", dislikes);

    updateCounters();

});


// Display comments
function displayComments() {

    commentsList.innerHTML = "";

    comments.forEach(function(comment) {

        let p = document.createElement("p");

        p.textContent = comment;

        commentsList.appendChild(p);

    });

}


// Submit comment
submitBtn.addEventListener("click", function() {

    let comment = commentInput.value.trim();

    if (comment !== "") {

        comments.push(comment);

        setCookie("comments", JSON.stringify(comments));

        displayComments();

        commentInput.value = "";

    }

});


// Clear text area
clearBtn.addEventListener("click", function() {

    commentInput.value = "";

});


// Load saved data
updateCounters();
displayComments();
