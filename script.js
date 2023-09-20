let dataInfo = "";
let choice = "All";

function fetchingTest() {
  const url =
    "https://fwols7icvedws355rgldfhyhiy0hamrg.lambda-url.eu-north-1.on.aws/";
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error");
      }
      return response.json();
    })
    .then((data) => {
      dataInfo = data;

      changeCategory();
      showImages(dataInfo, choice);
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
}
fetchingTest();

function showImages(dataInfo, choice) {
  const imageContainer = document.getElementById("image-container");
  imageContainer.innerHTML = "";
  const imageKeys = dataInfo;
  const startUrl = "https://fe22-molnet-inl1-iron-surfers.s3.amazonaws.com/";

  // Loopa igenom bildnycklarna och skapa <img>-element för varje bild

  imageKeys.forEach((key) => {
    if (choice == "Party" && key.includes("Party/") && key.includes(".png")) {
      const image = document.createElement("img");
      image.src = startUrl + key;
      imageContainer.appendChild(image);
    } else if (
      choice == "Ceremony" &&
      key.includes("Ceremony/") &&
      key.includes(".png")
    ) {
      const image = document.createElement("img");
      image.src = startUrl + key;
      imageContainer.appendChild(image);
    } else if (
      choice == "Decoration" &&
      key.includes("Decoration/") &&
      key.includes(".png")
    ) {
      const image = document.createElement("img");
      image.src = startUrl + key;
      imageContainer.appendChild(image);
    } else if (choice == "All" && key.includes(".png")) {
      const image = document.createElement("img");
      image.src = startUrl + key;
      imageContainer.appendChild(image);
    } else {
      console.log("Not an image");
    }
  });
}

const categoryChoice = document.getElementById("categories");

function changeCategory() {
  categoryChoice.addEventListener("change", (event) => {
    choice = event.target.value;

    return choice;
  });
}

const region = "eu-north-1";
const bucketName = "fe22-molnet-inl1-iron-surfers";
const secretAccessKey = "";
const accessKeyId = "";

let addChoice = "";
const categoryAddChoice = document.getElementById("map-selector");

function chooseAddFolder() {
  categoryAddChoice.addEventListener("change", (event) => {
    addChoice = event.target.value;
    console.log(addChoice);
    setFolder(addChoice);
  });
}

function setFolder(addChoice) {
  if (addChoice === "Party") {
    bucketFolder = bucketName + "/Party";
  } else if (addChoice === "Decoration") {
    bucketFolder = bucketName + "/Decoration";
  } else if (addChoice === "Ceremony") {
    bucketFolder = bucketName + "/Ceremony";
  }
  console.log(bucketFolder);
  return bucketFolder;
}

const imageForm = document.querySelector("#upload-form");
const imageInput = document.querySelector("#file-input");
let bucketFolder = "fe22-molnet-inl1-iron-surfers/Decoration";

imageForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const file = imageInput.files[0];

  const s3 = new AWS.S3({
    region,
    accessKeyId,
    secretAccessKey,
  });

  const imageName = file.name;

  const params = {
    Bucket: bucketFolder,
    Key: imageName,
    Body: file,
  };

  s3.upload(params, (err, data) => {
    if (err) {
      alert("File upload failed: " + err.message);
    } else {
      alert("File uploaded successfully!");
    }
  });
});

// kvar att göra (för VG): fixa policys
