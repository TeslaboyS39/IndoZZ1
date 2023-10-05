const ticketInput = document.getElementById("ticketInput");
const totalElement = document.getElementById("total");

ticketInput.addEventListener("input", calculateTotal);
function calculateTotal() {
  const ticketCount = parseInt(ticketInput.value);
  const ticketPrice = 50000;
  const total = ticketCount * ticketPrice;
  totalElement.innerHTML = "Rp " + total.toLocaleString();
}
document.getElementById("btnInput").addEventListener("click", addToCart);

function addToCart(event) {
  event.preventDefault();

  var movie = document.getElementById("movie-input").value;
  var ticket = document.getElementById("ticketInput").value;
  var schedule = document.getElementById("schedule-input").value;
  var totalPrice = ticket * 50000;

  var cartItem = {
    movie: movie,
    ticket: ticket,
    schedule: schedule,
    totalPrice: totalPrice,
  };

  if (localStorage.getItem("cart") === null) {
    var cart = [];
    cart.push(cartItem);

    localStorage.setItem("cart", JSON.stringify(cart));
  } else {
    var cart = JSON.parse(localStorage.getItem("cart"));

    cart.push(cartItem);

    localStorage.setItem("cart", JSON.stringify(cart));
  }

  displayCart();
}

displayCart();

window.onload = function () {
  displayCart();
};
function displayCart() {
  var cartContainer = document.getElementById("cart-container");
  cartContainer.innerHTML = "";

  if (localStorage.getItem("cart") !== null) {
    // Jika ada, ambil array cart dari local storage
    var cart = JSON.parse(localStorage.getItem("cart"));

    // Iterasi setiap item di array cart dan buat elemen untuk menampilkannya
    cart.forEach(function (item, index) {
      var cartItemDiv = document.createElement("div");
      cartItemDiv.classList.add("cart-item");

      var movieName = document.createElement("p");
      movieName.textContent = "Film : " + item.movie;
      
      var ticketQuantity = document.createElement("p");
      ticketQuantity.textContent = "Jumlah Tiket : " + item.ticket;

      var totalPrice = document.createElement("p");
      totalPrice.textContent =
        "Total Harga : " + item.totalPrice.toLocaleString(); // Tampilkan total harga

      var scheduleTime = document.createElement("p");
      scheduleTime.textContent = "Jadwal : " + item.schedule;

      var editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.addEventListener("click", function () {
        editCartItem(index);
      });

      cartItemDiv.appendChild(movieName);
      cartItemDiv.appendChild(ticketQuantity);
      cartItemDiv.appendChild(totalPrice);
      cartItemDiv.appendChild(scheduleTime);
      cartItemDiv.appendChild(editButton);

      cartContainer.appendChild(cartItemDiv);
    });
  }
}

function editCartItem(index) {
  // Ambil array cart dari local storage
  var cart = JSON.parse(localStorage.getItem("cart"));

  // Ambil data pembelian berdasarkan index
  var cartItem = cart[index];

  // Tampilkan prompt untuk mengedit jumlah tiket
  var newTicket = prompt("Masukkan jumlah tiket:", cartItem.ticket);

  // Periksa apakah pengguna memasukkan nilai baru atau membatalkan prompt
  if (newTicket !== null) {
    // Ubah jumlah tiket dalam data pembelian
    cartItem.ticket = parseInt(newTicket);

    // Perbarui total harga
    cartItem.totalPrice = cartItem.ticket * 50000;

    // Simpan array cart yang telah diperbarui ke local storage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Tampilkan kembali cart dengan data yang telah diperbarui
    displayCart();
  }
}

let btnResett = document.querySelector("#btnReset");
btnResett.addEventListener("click", () => {
  // Menghapus semua item dari local storage
  localStorage.clear();
  location.reload();
});

var scheduleDropdown = document.getElementById("schedule-input");

var defaultOption = document.createElement("option");
defaultOption.selected = true;
defaultOption.disabled = true;
defaultOption.text = "Pilih jadwal film";

scheduleDropdown.add(defaultOption);

// Menambahkan opsi jadwal film
var scheduleOptions = [
  { value: "10:00", text: "10:00" },
  { value: "14:00", text: "14:00" },
  { value: "18:00", text: "18:00" }
];

scheduleOptions.forEach(function(option) {
  var scheduleOption = document.createElement("option");
  scheduleOption.value = option.value;
  scheduleOption.text = option.text;
  // scheduleDropdown.add(scheduleOption);
});
