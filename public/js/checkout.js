var stripe = Stripe('pk_test_lIBCoHKgvcHtsYIKXDySmr1J');
var elements = stripe.elements();
var style = {
  base: {
    // Add your base input styles here. For example:
    fontSize: '16px',
    color: "#32325d",
  }
};

// Create an instance of the card Element.
var card = elements.create('card', {
  style: style
});

//var $form = $('#checkout-form');

// $form.submit(function (event) {
//   $('#charge-error').addClass('hidden');
//   $form.find('button').prop('disabled', true);
//   Stripe.card.createToken({
//     number: $('#card-number').val(),
//     cvc: $('#card-cvc').val(),
//     exp_month: $('#card-exp-month').val(),
//     exp_year: $('#card-exp-year').val(),
//     name: $('#card-name').val()
//   }, stripeTokenHandler);
//   return false;
// });

// function stripeResponseHandler(status, response) {
//   if(response.error) {
//     // show error
//     $('#charge-error').text(response.error.message);
//     $('#charge-error').removeClass('hidden');
//     $form.find('button').prop('disabled',false);
//   }
//   else {
//     //Token was created
//     let token = response.id;
//     $form.append($('<input type="hidden" name="stripeToken"/>').val(token));

//     $form.get(0).submit();
//   }
// }
window.onload = function () {
  card.mount('#card-element');
  card.addEventListener('change', function (event) {
    var displayError = document.getElementById('card-errors');
    if (event.error) {
      displayError.textContent = event.error.message;
    } else {
      displayError.textContent = '';
    }
  });
  var form = document.getElementById('checkout-form');
  form.addEventListener('submit', function (event) {
    event.preventDefault();

    stripe.createToken(card).then(function (result) {
      if (result.error) {
        // Inform the customer that there was an error.
        var errorElement = document.getElementById('card-errors');
        errorElement.textContent = result.error.message;
      } else {
        // Send the token to your server.
        stripeTokenHandler(result.token);
      }
    });
  });

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
}

