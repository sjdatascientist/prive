function redirectToPaymentForm() {
    window.location.href = window.location.href + '/paymentform';
  }

document.getElementById("new-btn").addEventListener("click", function(e) {
  document.getElementById('iframe').style.display = "block";
})