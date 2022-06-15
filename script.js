"use strict";
const modal = document.getElementById("myModal");
const btn = document.getElementById("myBtn");
const spanClose = document.getElementsByClassName("close")[0];
const userName = document.getElementById("username");
const textArea = document.querySelector("textarea");
const ratingStars = document.querySelectorAll(".fa-star ");
const buttonSubmit = document.getElementById("addCommenct");
const commentsContainer = document.querySelector(".comments-container");
const ratingNumber = document.querySelector(".rating-number");
const sortBtn = document.querySelector(".sort");
let commentsArray = [];
// modal
btn.onclick = () => {
    modal.style.display = "flex";
};
spanClose.onclick = () => {
    modal.style.display = "none";
};
window.onclick = (e) => {
    if (e.target == modal) {
        modal.style.display = "none";
    }
};
function updateHtml() {
    const generateStars = (rating) => {
        let template = "";
        for (let i = 0; i < rating; i++) {
            template += `<span class="fa fa-star checked"></span>`;
        }
        for (let i = 0; i < 5 - rating; i++) {
            template += `<span class="fa fa-star"></span>`;
        }
        return template;
    };
    commentsContainer.innerHTML = "";
    commentsArray.map((x, i) => {
        commentsContainer.innerHTML +=
            `
        <span id="${i}" class="delete-comment">&times;</span>
        <div class="comment" id="comment">
      
        <h3>${x.name}</h3>
        <div class="ratings">
            ${generateStars(Number(x.rating))}
          <h3>Rating:${x.rating}/5</h3>
        </div>
        <div class="comment-value">${x.comment} </div>
        
        `;
    });
    const deleteCommentBtn = document.querySelectorAll(".delete-comment");
    deleteCommentBtn.forEach(x => {
        x.onclick = (e) => deleteComments(e);
    });
}
function deleteComments(e) {
    console.log(e.target.id);
    commentsArray = commentsArray.filter((x, y) => y !== Number(e.target.id));
    updateHtml();
}
function showComments() {
    const userComments = {
        name: userName.value,
        rating: Number(ratingNumber.value),
        comment: textArea.value
    };
    commentsArray.push(userComments);
    updateHtml();
}
buttonSubmit.onclick = () => showComments();
sortBtn.onclick = () => {
    commentsArray = commentsArray.sort((a, b) => b.rating - a.rating);
    updateHtml();
};
