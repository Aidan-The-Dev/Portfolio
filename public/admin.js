async function login() {
  const password = document.getElementById("password").value;

  const response = await fetch("/api/login", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      password,
    }),
  });

  const data = await response.json();

  if (data.success) {
    window.location.href = "/admin";
  } else {
    document.getElementById("message").textContent = "Invalid password";
  }
}

async function loadAdmin() {
  const response = await fetch("/api/projects");

  const data = await response.json();

  if (!data.featured) return;

  document.getElementById("featured-title").value = data.featured.title;

  document.getElementById("featured-description").value =
    data.featured.description;

  document.getElementById("featured-tags").value =
    data.featured.tags.join(", ");

  const container = document.getElementById("projects-container");

  container.innerHTML = "";

  data.projects.forEach((project) => {
    container.innerHTML += `

<div class="project-editor">

<h3>
${project.title}
</h3>


<input 
value="${project.title}"
class="title">


<textarea class="description">
${project.description}
</textarea>


<input 
value="${project.tags.join(", ")}"
class="tags">


</div>

`;
  });
}

async function saveProjects() {
  const projects = [];

  document.querySelectorAll(".project-editor").forEach((card) => {
    projects.push({
      title: card.querySelector(".title").value,

      description: card.querySelector(".description").value,

      tags: card
        .querySelector(".tags")
        .value.split(",")
        .map((x) => x.trim()),
    });
  });

  const featured = {
    title: document.getElementById("featured-title").value,

    description: document.getElementById("featured-description").value,

    tags: document
      .getElementById("featured-tags")
      .value.split(",")
      .map((x) => x.trim()),
  };

  await fetch("/api/projects", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      featured,

      projects,
    }),
  });

  alert("Changes saved.");
}

if (location.pathname === "/admin") {
  loadAdmin();
}
