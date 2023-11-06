const navbarBurger = document.querySelector(".navbar-burger");
const navbarMenu = document.querySelector(".navbar-menu");
const navbarItems = document.querySelectorAll(".navbar-item");

navbarBurger.addEventListener("click", () => {
  navbarBurger.classList.toggle("is-active");
  navbarMenu.classList.toggle("is-active");
});

navbarItems.forEach((item) => {
  item.addEventListener("click", () => {
    navbarBurger.classList.remove("is-active");
    navbarMenu.classList.remove("is-active");
  });
});

const jobsData = [
  {
    title: "lorem 1",
    company: "loremldo1",
    range: "Jan 2020 - Dec 2021",
    html: `<ul class="pr-6">
    <li>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa expedita quibusdam cum placeat quod delectus.
    </li>
    <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus voluptates soluta officia quidem nisi
      itaque quisquam consectetur, laborum nesciunt accusamus!</li>
    <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, odit. Aspernatur veniam deserunt commodi
      nostrum.</li>
    <li>Lorem ipsum dolor sit, amet consectetur adipisicing elit.
    </li>
  </ul>`,
  },
  {
    title: "LOREM 2",
    company: "loremngknkse2",
    range: "Feb 2019 - Nov 2019",
    html: ` <ul class="pr-6">
    <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos odit earum ut cum amet incidunt eveniet culpa veniam quaerat voluptate? Molestiae illum sunt recusandae doloribus.
    </li>
    <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
  </ul>`,
  },
  //   {
  //     title: "LOREM 2",
  //     company: "loremn gknkse 2",
  //     range: "Feb 2019 - Nov 2019",
  //     html: ` <ul class="pr-6">
  //     <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos odit earum ut cum amet incidunt eveniet culpa veniam quaerat voluptate? Molestiae illum sunt recusandae doloribus.
  //     </li>
  //     <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
  //   </ul>`,
  //   },
];

let totalButton = 0;
const tabList = document.getElementById("tab-list");
const tabPanels = document.getElementById("tab-panels");

function createTabButton(job, index) {
  const tabButton = document.createElement("button");
  tabButton.textContent = `${job.title} @ ${job.company}`;
  tabButton.classList.add("tab-button", "column");
  tabButton.dataset.tabId = index;
  tabList.appendChild(tabButton);
  totalButton += 1;
  return tabButton;
}

function createTabPanel(job, index) {
  const tabPanel = document.createElement("div");
  tabPanel.innerHTML = `
    <h3>
      <span>${job.title}</span>
      <span class="company link-container">
        &nbsp;@&nbsp;<a
          class="link"
          href="#!/"
          rel="noopener noreferrer"
          target="_blank"
        >
          ${job.company}
        </a>
      </span>
    </h3>
    <p class="range">${job.range}</p>
    <div>${job.html}</div>
`;
  tabPanel.classList.add("tab-panel", "animate__animated", "animate__fadeIn");
  tabPanel.id = `panel-${index}`;
  tabPanels.appendChild(tabPanel);
  return tabPanel;
}

function createDivider() {
  const divElement = document.createElement("div");
  divElement.classList.add("fLsUxN");
  divElement.style.cssText =
    "position: absolute; top: 0px; left: 0px; z-index: 10; width: 2px; height: 42px; border-radius: 5px; background: #64ffda; transform: translateY(calc(0 * 42px)); transition: transform 0.25s cubic-bezier(0.645, 0.045, 0.355, 1) 0.1s;";
  tabList.appendChild(divElement);
}

function handleTabClick(button, index) {
  const temp = document.querySelector(".fLsUxN");
  temp.style.transform = `translateY(calc(${index} * 42px)`;
  tabButtons.forEach((btn) => btn.classList.remove("active"));
  tabPanelsAll.forEach((panel) => panel.classList.remove("active"));
  button.classList.add("active");
  tabPanelsAll[index].classList.add("active");
}

const tabButtons = jobsData.map((job, index) => {
  const tabButton = createTabButton(job, index);
  tabButton.addEventListener("click", () => handleTabClick(tabButton, index));
  return tabButton;
});

const tabPanelsAll = jobsData.map((job, index) => createTabPanel(job, index));

createDivider();
tabButtons[0].click();

$.get("https://api.github.com/users/viren-rathod").then((resp) => {
  $("#github-info").html(`
    <article class="media m-4">
      <figure class="media-left is-flex is-justify-content-center mb-2">
        <p class="image is-128x128">
          <img class="is-rounded" src="${resp.avatar_url}" />
        </p>
      </figure>
      <div class="media-content">
        <div class="content">
          <div class="username py-2  is-flex is-justify-content-flex-start">
            <strong class="text-light pr-3 ">${resp.name || resp.login}</strong>
            <a target="_blank" class="link-container" href="${resp.html_url}">
              <small class="link text-green p-0 pb-1">@${resp.login}</small>
            </a>
          </div>
          <p class="py-2">
            ${resp.bio}
          </p>
        </div>
      </div>

    </article>
    <nav class="level is-mobile">
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Repos</p>
          <p class="text-slate is-5">${resp.public_repos}</p>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Followers</p>
          <p class="text-slate is-5">${resp.followers}</p>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Following</p>
          <p class="text-slate is-5">${resp.following}</p>
        </div>
      </div>
    </nav>  
  `);
});

function showRepoSlider() {
  $.get("https://api.github.com/users/viren-rathod/repos").then((resp) => {
    resp.sort((a, b) => (a.stargazers_count > b.stargazers_count ? -1 : 1));
    var repo_slider = new Splide("#repo-slider", {
      // autoplay: true,
      pauseOnHover: true,
      interval: 2800,
      rewind: true,
      perMove: 1,
      perPage: 3,
      gap: "3em",
      breakpoints: {
        1024: {
          perPage: 3,
        },
        900: {
          perPage: 2,
        },
        640: {
          perPage: 1,
        },
      },
    }).mount();
    resp.forEach((repo) => {
      repo_slider.add(`
  <div class="splide__slide m-3" data-aos="zoom-in">
      <div
        class="box is-flex is-justify-content-space-between is-flex-direction-column h-100 w-100"
      >
      <div class="content">
        <div>
          ${
            repo.fork
              ? `<i class="fas fa-code-branch"></i>`
              : `<i
            class="fas fa-book"
          ></i
          >`
          }
          <a target="_blank" href="${repo.html_url}"
            ><strong class="text-green mx-2">${repo.name}</strong></a
          >
          <div class="my-2 text-slate">
            ${repo.description || "No description available"}
          </div>
        </div>
      </div>
      <nav class="level is-mobile">
        <div class="level-left w-100">
          <span class="level-item text-slate" aria-label="reply">
            <i class="fas fa-code" style="color: #1877f2"></i>&nbsp;${
              repo.language || "Viren"
            }</span
          >
          <span class="level-item text-slate" aria-label="reply">
            <i class="fas fa-star" style="color: #ff7300"></i>&nbsp;${
              repo.stargazers_count
            }</span
          >
          <span class="level-item text-slate" aria-label="reply">
            <i class="fas fa-code-branch pt-1" style="color: #6000df"></i>&nbsp;${
              repo.forks_count
            }</span
          >
        </div>
      </nav>
  </div>
</div>
`);
    });
    // $("#repo_list").html(repo_cards);
  });
}
new Splide("#image-slider", {
  // autoplay: true,
  pauseOnHover: true,
  interval: 2600,
  rewind: true,
  perMove: 1,
  perPage: 3,
  gap: "3em",
  breakpoints: {
    1024: {
      perPage: 3,
    },
    900: {
      perPage: 2,
    },
    640: {
      perPage: 1,
    },
  },
}).mount();
window.onload = () => {
  showRepoSlider();
};

let scrollButton = document.getElementById("scroll-up");
window.onscroll = function () {
  if (
    document.body.scrollTop > 400 ||
    document.documentElement.scrollTop > 400
  ) {
    scrollButton.style.display = "block";
  } else {
    scrollButton.style.display = "none";
  }
};

function scrollToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
