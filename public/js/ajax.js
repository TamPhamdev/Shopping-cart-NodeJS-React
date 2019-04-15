//  document.addEventListener('DOMContentLoaded', function () {
//    const form = document.getElementById('form-cart');

//    var xhr = new XMLHttpRequest();
//    xhr.onreadystatechange = function () {
//      if (this.readyState == 4 && this.status == 200) {
//        xhr.open('GET', '/cart/shoppingCart', true);
//        const qty = document.querySelectorAll('.cart-quantity');
//        xhr.send();
//      }
//    }
//  });

$(document).ready(function () {

  $(".cart-quantity").on('change', function (e) {
    e.preventDefault();
    var data = $('input[name=product_qty]').val();
    console.log(data);
    $.ajax({
        type: 'get',
        url: '/cart/shoppingCart',
        data: data,
        dataType: 'json'
      })
      .done(function (data) {
        $('#form-cart').html(data);
      });
  });
});