let currentUser = localStorage.getItem("loggedInUser");
const recipes = [];

function submitRecipe() {
  const title = document.getElementById("recipe-title").value.trim();
  const content = document.getElementById("recipe-content").value.trim();

  if (!title || !content) {
    alert("Please fill in all fields.");
    return;
  }

  const recipe = {
    title,
    content,
    author: currentUser,
    likes: 0,
    comments: [],
  };

  recipes.unshift(recipe);
  renderRecipes();

  document.getElementById("recipe-title").value = "";
  document.getElementById("recipe-content").value = "";
}

function renderRecipes() {
  const recipeList = document.getElementById("recipe-list");
  recipeList.innerHTML = "";

  recipes.forEach((recipe, index) => {
    const card = document.createElement("div");
    card.className = "recipe-card";

    card.innerHTML = `
      <div class="title">${recipe.title}</div>
      <div class="author">by ${recipe.author}</div>
      <p>${recipe.content}</p>
      <div class="actions">
        <button onclick="likeRecipe(${index})">❤️ ${recipe.likes}</button>
      </div>
      <div class="comment-section">
        <input type="text" placeholder="Add comment..." id="comment-${index}" />
        <button onclick="addComment(${index})">Comment</button>
        <ul id="comments-${index}"></ul>
      </div>
    `;

    recipe.comments.forEach(comment => {
      const li = document.createElement("li");
      li.textContent = comment;
      card.querySelector(`#comments-${index}`).appendChild(li);
    });

    recipeList.appendChild(card);
  });
}

function likeRecipe(index) {
  recipes[index].likes++;
  renderRecipes();
}

function addComment(index) {
  const commentInput = document.getElementById(`comment-${index}`);
  const commentText = commentInput.value.trim();

  if (commentText) {
    recipes[index].comments.push(`${currentUser}: ${commentText}`);
    commentInput.value = "";
    renderRecipes();
  }
}
