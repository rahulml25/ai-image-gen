function onSubmit(e) {
  e.preventDefault();

  document.querySelector("#image").src = "";
  document.querySelector(".msg").textContent = "";

  const prompt = document.querySelector("#prompt").value;
  const size = document.querySelector("#size").value;

  generateImageRequest(prompt, size);
}

async function generateImageRequest(prompt, size) {
  try {
    showSpinner();

    const res = await fetch("/openai/generateImage", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ prompt, size }),
    });

    const data = await res.json();
    removeSpinner();

    if (!res.ok) {
      throw new Error(data.error);
    }

    // console.log("response =>", data);
    const { data: imageUrl } = data;

    document.querySelector("#image").src = imageUrl;
  } catch (error) {
    document.querySelector(".msg").textContent = error;
  }
}

function showSpinner() {
  document.querySelector(".spinner").classList.add("show");
}

function removeSpinner() {
  document.querySelector(".spinner").classList.remove("show");
}

document.querySelector("#image-form").addEventListener("submit", onSubmit);
