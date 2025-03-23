async function getData() {
  const url = "http://localhost:3000/api/v1/count";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    const parsed = json[0].times_pressed;
    // console.log(parsed);
    return parsed;
  } catch (error) {
    console.error(error.message);
  }
}

async function incrementCount() {
  const url = "http://localhost:3000/api/v1/increment";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    // console.log(json);
  } catch (error) {
    console.error(error.message);
  }
}

async function decrementCount() {
  const url = "http://localhost:3000/api/v1/decrement";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    // console.log(json);
  } catch (error) {
    console.error(error.message);
  }
}

let data = await getData();
document.getElementById("btn-count").innerHTML = data;

document
  .getElementById("increment-btn")
  .addEventListener("click", function (e) {
    incrementCount();
  });

document
  .getElementById("decrement-btn")
  .addEventListener("click", function (e) {
    decrementCount();
  });
