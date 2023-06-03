let imageUrl = "";

const observer = new MutationObserver(mutation => {
  mutationCallbackFn(mutation);
  updateEventListeners();
});

observer.observe(document.body, {
  childList: true,
});

document.addEventListener("DOMContentLoaded", () => updateEventListeners());

function updateImageUrl(user) {
  imageUrl = `https://static-cdn.jtvnw.net/previews-ttv/live_user_${user}-426x240.jpg?dummy=${new Date().getTime()}`;
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
  const sideNav = document.getElementsByClassName("jKBAWW");
  for (let i = 0; i < sideNav.length; i++) {
    sideNav[i].addEventListener("mouseenter", event => {
      if (event.currentTarget.classList.contains("side-nav-card__link")) {
        const user = event.currentTarget.attributes.href.value.slice(1);
        updateImageUrl(user);
        checkExistingImage();
      }
    });
  }
}

function mutationCallbackFn(mutationRecords) {
  mutationRecords.forEach(mutation => {
    const nodes = mutation.target.querySelectorAll("*");
    let deepestNode = nodes[nodes.length - 1];
    while (deepestNode.children.length > 0) {
      deepestNode = deepestNode.children[0];
    }

    if (deepestNode.classList.contains("UHEOX")) {
      const parentElement = deepestNode.parentNode;
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
        parentElement.appendChild(newElement);
      }
    }

    deepestNode.addEventListener("DOMCharacterDataModified", () => {
      checkExistingImage();
    });
  });
}
