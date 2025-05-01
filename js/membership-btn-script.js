function redirectToPaymentForm() {
    window.location.href = window.location.href + '/paymentform';
  }

document.getElementsByClassName("btn-img")[0].addEventListener("click", function(e) {
  document.getElementsByClassName('main-section')[0].style.display = "none";
  document.getElementsByClassName('subscription-info')[0].style.display = "none";
  document.getElementsByTagName('footer')[0].style.display = "none"
  document.getElementById('iframe').style.display = "block";
  // window.location.href = '/pay'
})

document.getElementsByClassName("btn-img")[1].addEventListener("click", function(e) {
  document.getElementsByClassName('main-section')[0].style.display = "none";
  document.getElementsByClassName('subscription-info')[0].style.display = "none";
  document.getElementsByTagName('footer')[0].style.display = "none"
  document.getElementById('iframe').style.display = "block";
})

document.getElementsByClassName("btn-img")[2].addEventListener("click", function(e) {
  document.getElementsByClassName('main-section')[0].style.display = "none";
  document.getElementsByClassName('subscription-info')[0].style.display = "none";
  document.getElementsByTagName('footer')[0].style.display = "none"
  document.getElementById('iframe').style.display = "block";
})