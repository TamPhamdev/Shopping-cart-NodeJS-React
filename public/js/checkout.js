var stripe = Stripe('pk_test_lIBCoHKgvcHtsYIKXDySmr1J');
var elements = stripe.elements();
var style = {
  base: {
    // Add your base input styles here. For example:
    fontSize: '16px',
    color: "#32325d",
  }
};
var card = elements.create('card', {
  style
});




window.onload = function () {
  card.mount('#card-element');
  card.addEventListener('change', function (event) {
    var displayError = document.getElementById('card-errors');
    if (!name || !address) {
      var errorElement = document.querySelector('.error');
      errorElement.textContent = "You must enter this field.";
      errorElement.classList.add('visible');
      return;
    }
    if (event.error) {
      displayError.textContent = event.error.message;
    } else {
      displayError.textContent = '';
    }
  });
  var form = document.getElementById('checkout-form');
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    // var name = document.getElementById('name').value;
    //  var address = document.getElementById('address').value;
    //  var email = document.getElementById('email').value;
    // var cardNumber = document.getElementById('card-number').value;
    // var expMonth = document.getElementById('card-exp-month').value;
    // var expYear = document.getElementById('card-exp-year').value;

    stripe.createToken(card).then(function (result) {
      if (result.error) {
        // Inform the user if there was an error.
        var errorElement = document.getElementById('card-errors');
        errorElement.textContent = result.error.message;
      } else {
        // Send the token to your server.
        stripeTokenHandler(result.token);
      }
    });
  });
  // if (result.error) {
  //   // Inform the customer that there was an error.
  //   var errorElement = document.getElementById('card-errors');
  //   errorElement.textContent = result.error.message;
  // } else {
  // Send the token to your server.


};

function stripeTokenHandler(token) {
  // Insert the token ID into the form so it gets submitted to the server
  const form = document.getElementById('checkout-form');
  const hiddenInput = document.createElement('input');
  hiddenInput.setAttribute('type', 'hidden');
  hiddenInput.setAttribute('name', 'stripeToken');
  hiddenInput.setAttribute('value', token.id);
  form.appendChild(hiddenInput);

  // Submit the form
  form.submit();
}