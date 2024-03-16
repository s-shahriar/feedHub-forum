const postSection = document.getElementById("all-post");
const latestPostSection = document.getElementById("latest-post");
const spinnerTop = document.getElementById("spinner-top");
const spinnerBottom = document.getElementById("spinner-bottom");
const searchText = document.getElementById("search");
const noPost = document.getElementById("no-post");
const readSection = document.getElementById("read-items");
const readCount = document.getElementById("read-count");
let itemsRead = {};


function fetchAllPost(url) {
    
  spinnerTop.style.display = "flex";
  setTimeout(async () => {
    try {
        if(url){
            const response = await fetch(
                `https://openapi.programming-hero.com/api/retro-forum/posts?category=${url}`
            )
            const { posts } = await response.json();
        fetchAllRender(posts);
        } else{
            const response = await fetch(
                "https://openapi.programming-hero.com/api/retro-forum/posts"
              );
            const { posts } = await response.json();
            fetchAllRender(posts);
        }
    } catch (err) {
    }
  }, 3000);
}

function latestPost() {
  spinnerBottom.style.display = "flex";


  setTimeout(async () => {
    try {
      const response = await fetch(
        "https://openapi.programming-hero.com/api/retro-forum/latest-posts"
      );
      const posts= await response.json();
      fetchLatestRender(posts);
    } catch (err) {
    }
  }, 3000);
}


function searchHandler(){
    postSection.innerHTML = "";
    noPost.classList.add("hidden")
    fetchAllPost(searchText.value)
}

function fetchAllRender(posts) {
    spinnerTop.style.display = "none";
    
    if(posts.length===0){
        noPost.classList.remove("hidden")
        return
    }

    postSection.innerHTML = "";
    noPost.classList.add("hidden")
    for (let post of posts) {
    const newDiv = document.createElement("div");

    newDiv.innerHTML = `<div class="posts flex gap-8 mb-8">
            <div class="avater">
              <img src="${post.image}" alt="" />
              <div class="online ${
                post.isActive ? "bg-green-700" : "bg-red-700"
              }"></div>
            </div>
            <div class="post-details">
              <div class="category flex gap-8">
                <p># ${post.category}</p>
                <p>Author: ${post.author.name}</p>
              </div>
              <h1>${post.title}</h1>
              <p>${post.description}</p>
              <hr class="horizontal" />
              <div class="post-footer flex justify-between items-center mt-4">
                <div class="reaction flex gap-8">
                  <div class="comment flex gap-4 items-center">
                    <img src="images/Group 13.png" alt="" />
                    <p>${post.comment_count}</p>
                  </div>
                  <div class="view flex gap-0 lg:gap-4 items-center">
                    <img src="images/Group 16.png" alt="" />
                    <p>${post.view_count}</p>
                  </div>
                  <div class="time flex gap-4 items-center">
                    <img src="images/Group 18.png" alt="" />
                    <p>${post.posted_time} min</p>
                  </div>
                </div>
                <img src="images/Group 40106.png" onclick="markAsRead(this.getAttribute('data-title'), '${post.view_count}')" data-title="${post.title}"/>
              </div>
            </div>
          </div>`;
    postSection.appendChild(newDiv);
  }
}

function fetchLatestRender(posts) {

  spinnerBottom.style.display = "none";
  latestPostSection.innerHTML = ``;

  for (let post of posts) {
    const postDiv = document.createElement("div");
    postDiv.innerHTML = `<div class="post-card mx-auto space-y-3">
            <div class="post-img">
              <img src="${post.cover_image}" alt="" />
            </div>
            <div class="date flex gap-4">
              <img src="images/Frame.png" alt="" />
              <p>${post.author.posted_date || "Publish Date Not Found"}</p>
            </div>
            <h1>${post.title}</h1>
            <p>${post.description}</p>
            <div class="post-author flex">
              <img src="${post.profile_image}" alt="" />
              <div class="post-author-details">
                <h1>${post.author.name}</h1>
                <p>${post.author.designation || "Unknown"}</p>
              </div>
            </div>
          </div>`;
    latestPostSection.appendChild(postDiv);
  }
}

function markAsRead(title, view){

  itemsRead[title] = itemsRead[title] || view;
 
  readSection.innerHTML = '';

  for(const read in itemsRead){
    const newDiv = document.createElement('div');

    newDiv.innerHTML = `<div class="read-items flex justify-between">
    <h1>${read}</h1>
    <div
      class="view flex lg:flex-row gap-0 lg:gap-2 flex-col items-center"
    >
      <img src="images/Group 16.png" alt="" />
      <p>${itemsRead[read]}</p>
    </div>
  </div>`

  readSection.appendChild(newDiv); 
  }

  readCount.innerText = `${Object.keys(itemsRead).length}`;

}



fetchAllPost();
latestPost();
