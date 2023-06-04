let imageUrl = "";

const observer = new MutationObserver(mutation => {
  updateEventListeners();
  mutationCallbackFn(mutation);
});

observer.observe(document.body, {
  childList: true,
});

document.addEventListener("DOMContentLoaded", () => updateEventListeners());

function updateImageUrl(user) {
  imageUrl = `https://static-cdn.jtvnw.net/previews-ttv/live_user_${user}-190x107.jpg`;
}

function checkExistingImage() {
  const existingImage = document.getElementById("sidenav-image");
  if (existingImage) {
    existingImage.onload = function () {
      existingImage.onload = null;
    };
    existingImage.src = "";
    existingImage.src = imageUrl;
  }
}

function updateEventListeners() {
  let sideNav;
  if (window.innerWidth < 1200) {
    sideNav = document.querySelectorAll(".side-nav-card.tw-link");
  } else {
    sideNav = document.querySelectorAll(".side-nav-card__link.tw-link");
  }
  for (let i = 0; i < sideNav.length; i++) {
    sideNav[i].addEventListener("mouseenter", event => {
      const user = event.currentTarget.attributes.href.value.slice(1);
      updateImageUrl(user);
      checkExistingImage();
    });
  }
}

function mutationCallbackFn(mutationRecords) {
  let nodes;
  let nodesArr;
  mutationRecords.forEach(mutation => {
    nodes = mutation.target.querySelectorAll("*");
    nodesArr = Array.from(nodes);
  });

  const targetNode = nodesArr.filter(node => node.classList.contains("dIzyTl"));

  if (targetNode.length > 0) {
    const parentElement = targetNode[0];
    const existingImage = parentElement.querySelector("#sidenav-image");
    if (existingImage) {
      existingImage.onload = function () {
        existingImage.onload = null;
      };
      existingImage.src = "";
      existingImage.src = imageUrl;
    } else {
      const newElement = document.createElement("img");
      newElement.id = "sidenav-image";
      newElement.onload = function () {
        newElement.onload = null;
      };
      newElement.src = "";
      newElement.src = imageUrl;
      newElement.style.padding = "5px";
      parentElement.prepend(newElement);
    }
  }
}
