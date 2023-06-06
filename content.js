let imageUrl = "";

const observer = new MutationObserver(mutation => {
  mutationCallbackFn(mutation);
});

observer.observe(document.body, {
  childList: true,
});

function updateImageUrl(user) {
  imageUrl = `https://static-cdn.jtvnw.net/previews-ttv/live_user_${user}-190x107.jpg`;
}

function checkExistingImage() {
  const existingImage = document.getElementById("sidenav-image");

  if (existingImage) {
    existingImage.src = "";
    existingImage.onload = function () {
      existingImage.onload = null;
    };
    existingImage.src = imageUrl;
  }
}

function updateEventListeners() {
  const sideNav =
    window.innerWidth < 1200
      ? document.querySelectorAll(".side-nav-card.tw-link")
      : document.querySelectorAll(".side-nav-card__link.tw-link");

  for (let i = 0; i < sideNav.length; i++) {
    sideNav[i].removeEventListener("mouseenter", mouseEnterHandler);
    sideNav[i].addEventListener("mouseenter", mouseEnterHandler);
  }
}

function mouseEnterHandler(event) {
  const user = event.currentTarget.attributes.href.value.slice(1);
  updateImageUrl(user);
  checkExistingImage();
}

function mutationCallbackFn(mutationRecords) {
  mutationRecords.forEach(mutation => {
    if (
      mutation.addedNodes.length > 0 &&
      mutation.addedNodes[0].classList &&
      mutation.addedNodes[0].classList.contains("tw-dialog-layer")
    ) {
      const nodes = mutation.target.querySelectorAll("*");
      const nodesArr = Array.from(nodes);
      const targetNode = nodesArr.filter(node =>
        node.classList.contains("dIzyTl")
      );
      updateEventListeners();
      const parentElement = targetNode[0];

      const newElement = document.createElement("img");
      newElement.id = "sidenav-image";
      newElement.src = "";
      newElement.onload = function () {
        newElement.onload = null;
      };
      newElement.src = imageUrl;
      newElement.style.padding = "5px";
      parentElement.prepend(newElement);
    }
    return;
  });
}
