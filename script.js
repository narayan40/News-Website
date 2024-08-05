let currentQuery = "sports";
let currentPage = 1;
const fetchNews = async (page, q) => {
  var url =
    "https://newsapi.org/v2/everything?" +
    "q=" +
    q +
    "&from=2024-07-30&" +
    "pageSize=20&" +
    "page=" +
    page +
    "&sortBy=popularity&" +
    "apiKey=7776380563404e77b7a78ff57f50440c";

  var req = new Request(url);

  let a = await fetch(req);
  let response = await a.json();
  console.log(JSON.stringify(response));
  let str = "";
  for (let item of response.articles) {
    if (
      item.title != "[Removed]" &&
      item.url != "https://removed.com" &&
      item.urlToImage != null
    ) {
      str =
        str +
        ` <div class="card my-4 mx-2" style="width: 18rem">
          <img src="${item.urlToImage}" class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="">${item.title.slice(0, 20)}...</h5>
            <p class="card-text">
              ${item.description.slice(0, 100)}...
            </p>
            <a href="${item.url}" class="btn btn-primary">Read Article</a>
          </div>
        </div>`;
    }
  }

  document.querySelector(".content").innerHTML = str;
};
fetchNews(1, currentQuery);
search.addEventListener("click", (e) => {
  e.preventDefault();
  let query = searchInput.value;
  currentQuery = query;
  fetchNews(1, currentQuery);
});
prev.addEventListener("click", (e) => {
  e.preventDefault();
  if (currentPage > 1) {
    currentPage = currentPage - 1;
    let query = searchInput.value;

    fetchNews(currentPage, currentQuery);
  }
});
next.addEventListener("click", (e) => {
  e.preventDefault();
  currentPage = currentPage + 1;

  fetchNews(currentPage, currentQuery);
});

india.addEventListener("click", (e) => {
  e.preventDefault();
  fetchNews(currentPage, "India");
});
world.addEventListener("click", (e) => {
  e.preventDefault();
  fetchNews(currentPage, "World");
});

local.addEventListener("click", (e) => {
  e.preventDefault();
  fetchNews(currentPage, "local");
});
business.addEventListener("click", (e) => {
  e.preventDefault();
  fetchNews(currentPage, "Business");
});
technology.addEventListener("click", (e) => {
  e.preventDefault();
  fetchNews(currentPage, "technology");
});
entertainment.addEventListener("click", (e) => {
  e.preventDefault();
  fetchNews(currentPage, "entertainment");
});
sports.addEventListener("click", (e) => {
  e.preventDefault();
  fetchNews(currentPage, "Sports");
});
science.addEventListener("click", (e) => {
  e.preventDefault();
  fetchNews(currentPage, "science");
});
health.addEventListener("click", (e) => {
  e.preventDefault();
  fetchNews(currentPage, "health");
});

entertainment.addEventListener("click", (e) => {
  e.preventDefault();
  fetchNews(currentPage, "Entertainment");
});

india.addEventListener("click", (e) => {
  e.preventDefault();
  fetchNews(currentPage, "India");
});

document.addEventListener("DOMContentLoaded", function () {
  // Select all the nav links
  const navLinks = document.querySelectorAll(".nav-link");

  // Add click event listener to each nav link
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      // Remove 'activeLink' class from all nav links
      navLinks.forEach((nav) => nav.classList.remove("activeLink"));

      // Add 'activeLink' class to the clicked nav link
      this.classList.add("activeLink");
    });
  });
});

//I used open weather api to show weather
document.addEventListener("DOMContentLoaded", () => {
  const weatherElement = document.getElementById("weather");

  // Function to fetch weather data
  function fetchWeather(latitude, longitude) {
    const apiKey = "f14dd7bacfa908ecea41da794a3f7c77"; // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const temperature = data.main.temp;
        const description = data.weather[0].description;
        weatherElement.innerHTML = `Weather: ${temperature}°C, ${description}`;
      })
      .catch((error) => {
        weatherElement.innerHTML = "Unable to fetch weather data";
        console.error("Error fetching weather data:", error);
      });
  }

  // Function to get user's current location
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          fetchWeather(latitude, longitude);
        },
        (error) => {
          weatherElement.innerHTML = "Location access denied";
          console.error("Error getting location:", error);
        }
      );
    } else {
      weatherElement.innerHTML =
        "Geolocation is not supported by this browser.";
    }
  }

  getLocation();
});
