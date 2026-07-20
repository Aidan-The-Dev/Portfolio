const text = [
  "Full Stack Developer",
  "Web Designer",
  "Software Engineer",
  "Problem Solver",
  "Professional Bug Creator",
];

let line = 0;
let char = 0;
let deleting = false;

const typing = document.getElementById("typing");

function type() {
  const current = text[line];

  if (!deleting) {
    typing.textContent = current.substring(0, char++);

    if (char > current.length) {
      deleting = true;

      setTimeout(type, 1200);

      return;
    }
  } else {
    typing.textContent = current.substring(0, char--);

    if (char < 0) {
      deleting = false;

      line++;

      if (line >= text.length) line = 0;
    }
  }

  setTimeout(type, deleting ? 45 : 90);
}

type();

// CURSOR GLOW

const glow = document.getElementById("cursor-glow");

document.addEventListener("mousemove", (e) => {
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.15 },
);

document
  .querySelectorAll("section,.project-card")
  .forEach((el) => observer.observe(el));

// BOOT TERMINAL

const messages = [
  "Initializing system...",
  "Loading projects...",
  "Compiling experience...",
  "Connecting developer profile...",
  "Access granted.",
];

let index = 0;

const boot = document.getElementById("boot-text");

function bootSequence() {
  if (index < messages.length) {
    boot.innerHTML += "> " + messages[index] + "<br>";

    index++;

    setTimeout(bootSequence, 450);
  }
}

bootSequence();

// COUNTERS

const counters = document.querySelectorAll("[data-count]");

const countObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      let element = entry.target;

      let target = Number(element.dataset.count);

      let current = 0;

      let timer = setInterval(() => {
        current += Math.ceil(target / 50);

        if (current >= target) {
          current = target;

          clearInterval(timer);
        }

        element.textContent = current;
      }, 30);
    }
  });
});

counters.forEach((c) => countObserver.observe(c));

const input = document.getElementById("command-input");
const output = document.getElementById("terminal-output");

const commands = {
  help: `

Available commands:

about
projects
skills
contact
clear

`,

  about: `

Aidan - Developer

I build software, web applications,
automation tools, and creative projects.

`,

  projects: `

Featured Projects:

- FilePilot
- Portfolio Website
- More projects coming soon...

`,

  skills: `

Languages:

JavaScript
C++
Python
HTML/CSS

Tools:

Git
Node.js
Docker

`,

  contact: `

Email:
aidan.white482@gmail.com

GitHub:
github.com/Aidan-The-Dev

`,
};

input.addEventListener("keydown", (e) => {
  if (e.key !== "Enter") return;

  let command = input.value.toLowerCase().trim();

  output.innerHTML += `
<p>
> ${command}
</p>
`;

  if (command === "clear") {
    output.innerHTML = "";
  } else if (commands[command]) {
    output.innerHTML += `
<pre>${commands[command]}</pre>
`;
  } else {
    output.innerHTML += `
<p>
Command not found. Type help.
</p>
`;
  }

  input.value = "";

  output.scrollTop = output.scrollHeight;
});

const nodes = document.querySelectorAll(".skill-node");

document.addEventListener("mousemove", (e) => {
  let x = (e.clientX / window.innerWidth - 0.5) * 30;

  let y = (e.clientY / window.innerHeight - 0.5) * 30;

  nodes.forEach((node, index) => {
    node.style.transform = `
translate(
${x * (index % 2 ? 1 : -1)}px,
${y * (index % 2 ? -1 : 1)}px
)
`;
  });
});

const projects = {
  portfolio: {
    title: "Portfolio",

    description:
      "A custom-built developer portfolio featuring interactive UI, smooth animations, and modern web technologies.",

    tech: ["HTML", "CSS", "JavaScript"],
  }
};

function openProject(id) {
  const project = projects[id];

  document.getElementById("modal-title").textContent = project.title;

  document.getElementById("modal-description").textContent =
    project.description;

  const tech = document.getElementById("modal-tech");

  tech.innerHTML = "";

  project.tech.forEach((t) => {
    tech.innerHTML += `
<span>${t}</span>
`;
  });

  document.getElementById("project-modal").classList.add("active");
}

function closeProject() {
  document.getElementById("project-modal").classList.remove("active");
}

const palette = document.getElementById("command-palette");

const search = document.getElementById("command-search");

document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key === "z") {
    e.preventDefault();

    palette.classList.add("active");

    search.focus();
  }

  if (e.key === "Escape") {
    palette.classList.remove("active");
  }
});

search.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    let command = search.value.toLowerCase();

    if (command.includes("project")) {
      location.href = "#projects";
    }

    if (command.includes("skill")) {
      location.href = "#skills";
    }

    if (command.includes("contact")) {
      location.href = "#contact";
    }

    palette.classList.remove("active");

    search.value = "";
  }
});

const themeButton = document.getElementById("theme-toggle");

themeButton.addEventListener("click", () => {
  document.body.classList.toggle("light");
});

let keys = [];

document.addEventListener("keydown", (e) => {
  keys.push(e.key);

  keys.splice(-10);

  if (keys.join("").includes("aidan")) {
    alert("System unlocked. Welcome 👋");
  }
});

window.addEventListener("scroll", () => {
  const nav = document.querySelector("nav");

  if (window.scrollY > 50) {
    nav.style.background = "rgba(5,7,12,.75)";
  } else {
    nav.style.background = "rgba(0,0,0,.2)";
  }
});
