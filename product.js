document.addEventListener("DOMContentLoaded", function () {
  const loader = document.querySelector(".loader");

  // Function to hide the loader and display the content
  function hideLoader() {
    loader.classList.add("loader-hidden");
    loader.addEventListener("transitionend", () => {
      document.body.removeChild(loader);
    });
  }

  // Function to fetch data and handle errors
  function fetchData() {
    fetch("your-api-endpoint") // Replace with your actual API endpoint
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Process your data here
        console.log(data);
        hideLoader(); // Hide loader when data is successfully fetched
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
        hideLoader(); // Hide loader even if there's an error
      });
  }

  // Call the fetchData function and ensure the loader is hidden after everything is loaded
  window.addEventListener("load", function () {
    fetchData();
  });
});

// Dark/Light Mode Toggle
let icon = document.getElementById("light-mode-icon");

icon.onclick = function () {
  document.body.classList.toggle("light-mode-colors");

  if (document.body.classList.contains("light-mode-colors")) {
    icon.className = "fas fa-moon";
  } else {
    icon.className = "fas fa-sun";
  }
};

// Function to fetch and display products
function fetchProducts(category) {
  let urls;

  if (category === "all") {
    urls = [
      "https://dummyjson.com/products/category/laptops",
      "https://dummyjson.com/products/category/tablets",
      "https://dummyjson.com/products/category/smartphones",
    ];

    // Fetch data from all three categories
    Promise.all(urls.map((url) => fetch(url).then((res) => res.json())))
      .then((results) => {
        let allProducts = [];
        results.forEach((data) => {
          allProducts = allProducts.concat(data.products);
        });
        displayProducts(allProducts);
      })
      .catch((error) =>
        console.error(
          "There has been a problem with your fetch operation:",
          error
        )
      );
  } else {
    const url = `https://dummyjson.com/products/category/${category}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        // If the category is laptops, add more laptops
        if (category === "laptops") {
          data.products = addMoreLaptops(data.products);
        }
        displayProducts(data.products);
      })
      .catch((error) =>
        console.error(
          "There has been a problem with your fetch operation:",
          error
        )
      );
  }
}

// Function to add additional laptops
function addMoreLaptops(products) {
  const additionalLaptops = [
    {
      id: 101,
      title: "Dell Inspiron 15",
      price: 105000,
      thumbnail:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCq7jafZNRavy7puBJTtxEK6XFaLDAerJl2Q&s",
      category: "laptops",
    },
  ];

  // Add the additional laptop to the existing laptops
  return products.concat(additionalLaptops);
}

// Function to display products on the page
function displayProducts(products) {
  const productContainer = document.getElementById("product-container");
  productContainer.innerHTML = ""; // Clear existing products

  products.forEach((product) => {
    const productItem = document.createElement("div");
    productItem.className = "Productitems reveal"; // Add 'reveal' class here
    productItem.innerHTML = `
      <img src="${product.thumbnail}" alt="${product.title}" />
      <p>Price: Rs ${product.price} PKR</p>
      <h3>${product.title}</h3>
      <button class="order-btn">Add To Cart</button>
    `;
    productContainer.appendChild(productItem);
  });

  // Trigger the reveal animation after products are loaded
  reveal();
}

// Scroll Reveal Animation Function
window.addEventListener("scroll", reveal);

function reveal() {
  let reveals = document.querySelectorAll(".reveal");
  for (let i = 0; i < reveals.length; i++) {
    let windowHeight = window.innerHeight;
    let revealTop = reveals[i].getBoundingClientRect().top;
    let revealPoint = 150;

    if (revealTop < windowHeight - revealPoint) {
      reveals[i].classList.add("show");
    } else {
      reveals[i].classList.remove("show");
    }
  }
}

// Fetch and display all products on initial load
fetchProducts("all");

// Event listeners for category filters
document.querySelectorAll('input[name="category"]').forEach((radio) => {
  radio.addEventListener("change", (event) => {
    fetchProducts(event.target.id);
  });
});

// Call the reveal function initially to catch elements already in view
reveal();
