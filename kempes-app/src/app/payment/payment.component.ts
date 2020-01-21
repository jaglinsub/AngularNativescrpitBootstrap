import { Component, OnInit, NgZone } from '@angular/core';
import { PaymentDetails } from './paymentDetails';
import { PaymentService } from './payment.service';
import { IntentSecrets } from './IntentSecrets';

declare var Stripe: any;
declare var formComponent: any;
// To test things out, use card number 4242 4242 4242 4242 with any expiration date in the future, any 3-digit number for the CVC and any valid zip code.

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  paymentDetails: PaymentDetails;
  submitted: boolean;
  message: string;
  intentSecret: IntentSecrets;
  paymentMethod: string;

  constructor(private _zone: NgZone, private paymentService: PaymentService) {

  }
  ngOnInit() {

    this.paymentDetails = new PaymentDetails();
    this.submitted = false;
    // this.ngOnInit_working();
    this.loadStripeElements();
    formComponent = this;
  }

  loadStripeElements() {

    // Your Stripe public key
    const stripe = Stripe('pk_test_yj7jPsVkZC2ylVEIryi8I2iE006JQULb9F');

    var elements = stripe.elements({
      // fonts: [
      //   {
      //     cssSrc: 'https://fonts.googleapis.com/css?family=Quicksand',
      //   },
      // ],
    });

    var elementStyles = {
      base: {
        // color: '#fff',
        // fontWeight: 600,
        // fontFamily: 'Quicksand, Open Sans, Segoe UI, sans-serif',
        // fontSize: '16px',
        // fontSmoothing: 'antialiased',

        // ':focus': {
        //   color: '#424770',
        // },

        '::placeholder': {
          color: '#9BACC8',
        },

        ':focus::placeholder': {
          color: '#CFD7DF',
        },
      },
      invalid: {
        // color: '#fff',
        // ':focus': {
        //   color: '#FA755A',
        // },
        // '::placeholder': {
        //   color: '#FFCCA5',
        // },
      },
    };

    var elementClasses = {
      focus: 'focus',
      empty: 'empty',
      invalid: 'invalid',
    };

    var cardNumber = elements.create('cardNumber', {
      style: elementStyles,
      classes: elementClasses,
    });
    cardNumber.mount('#example3-card-number');

    var cardExpiry = elements.create('cardExpiry', {
      style: elementStyles,
      classes: elementClasses,
    });
    cardExpiry.mount('#example3-card-expiry');

    var cardCvc = elements.create('cardCvc', {
      style: elementStyles,
      classes: elementClasses,
    });
    cardCvc.mount('#example3-card-cvc');


    registerElements([cardNumber, cardExpiry, cardCvc], 'example3');
    // (cardCvc as HTMLInputElement).setAttribute("maxlength", "45");

    // Listen for form submission, process the form with Stripe,
    // and get the 
    const paymentForm = document.getElementById('payment-form');
    paymentForm.addEventListener('submit', event => {
      event.preventDefault();
      
      var form = document.getElementById('payment-form');

      function enableInputs() {
        Array.prototype.forEach.call(
          form.querySelectorAll(
            "input[type='text'], input[type='email'], input[type='tel']"
          ),
          function (input) {
            input.removeAttribute('disabled');
          }
        );
      }

      function disableInputs() {
        Array.prototype.forEach.call(
          form.querySelectorAll(
            "input[type='text'], input[type='email'], input[type='tel']"
          ),
          function (input) {
            input.setAttribute('disabled', 'true');
          }
        );
      }

      function triggerBrowserValidation() {
        // The only way to trigger HTML5 form validation UI is to fake a user submit
        // event.
        var submit = document.createElement('input');
        submit.type = 'submit';
        submit.style.display = 'none';
        form.appendChild(submit);
        submit.click();
        submit.remove();
      }

      // Trigger HTML5 validation UI on the form if any of the inputs fail
    // validation.
    var plainInputsValid = true;
    Array.prototype.forEach.call(form.querySelectorAll('input'), function(
      input
    ) {
      if (input.checkValidity && !input.checkValidity()) {
        plainInputsValid = false;
        return;
      }
    });
    if (!plainInputsValid) {
      triggerBrowserValidation();
      return;
    }

    // Disable all inputs.
    disableInputs();


    var name = this.paymentDetails.name;
    // var address1 = form.querySelector('#' + exampleName + '-address');
    // var city = form.querySelector('#' + exampleName + '-city');
    // var state = form.querySelector('#' + exampleName + '-state');
    var zip = this.paymentDetails.zipCode;

    var additionalData = {
      name: name ? name : undefined,
      // address_line1: address1 ? address1.value : undefined,
      // address_city: city ? city.value : undefined,
      // address_state: state ? state.value : undefined,
      address_zip: zip ? zip : undefined,
    };

      stripe.createToken(cardNumber, additionalData).then(result => {
        if (result.error) {
          console.log('Error creating payment method.');
          const errorElement = document.getElementById('card-errors');
          // errorElement.textContent = result.error.message;
        } else {
          // At this point, you should send the token ID
          // to your server so it can attach
          // the payment source to a customer
          console.log('Token acquired!');
          console.log(result.token);
          console.log(result.token.id);

          let secret: string;
          const promise = this.paymentService.getIntentSecret();
          promise.then(async data => {
            secret = data.secret;
            console.log("intentSecret inside promise=" + secret);

            const { setupIntent, error } = await stripe.confirmCardSetup(
              secret,
              {
                payment_method: {
                  card: cardNumber,
                  billing_details: {
                    address: {
                      postal_code: this.paymentDetails.zipCode
                    },
                    // email: 'jaglinsub@gmail.com',
                    email: this.paymentDetails.email,
                    name: this.paymentDetails.name,
                    phone: this.paymentDetails.phone
                  },
                },
              },
            );
            if (error) {

            }
            else {
              console.log("setupIntent=" + JSON.stringify(setupIntent));
              this.paymentMethod = setupIntent.payment_method;
              console.log("setupIntent.payment_method=" + setupIntent.payment_method);
              this.paymentDetails.paymentMethod = setupIntent.payment_method;

              this.paymentService.createSubscription(this.paymentDetails).subscribe(data => {
                console.log("Subscription data=" + JSON.stringify(data));
              });
            }

          });
        }
      });
    });

    function registerElements(elements, exampleName) {
      var form = document.getElementById('payment-form');
      var errorcardNumber = form.querySelector('.errorcardNumber');
      var errorcardExpiry = form.querySelector('.errorcardExpiry');
      var errorcardCvc = form.querySelector('.errorcardCvc');

      (document.getElementById('btnSubmit') as HTMLInputElement).disabled = true;
      (errorcardNumber as HTMLElement).style.display = 'none';
      (errorcardExpiry as HTMLElement).style.display = 'none';
      (errorcardCvc as HTMLElement).style.display = 'none';

      // Listen for errors from each Element, and show error messages in the UI.
      var savedErrors = {};
      elements.forEach(function (element, idx) {
        element.on('blur', (event) => {
          console.log("onBlur=" + event.value);
        });
        element.on('change', function (event) {
          var errorElement = form.querySelector('.error' + event.elementType);
          var errorMessageElement = document.getElementById('message' + event.elementType);
          if (event.error) {

            if (event.error.message) {
              savedErrors[idx] = event.error.message;
              (errorElement as HTMLElement).style.display = 'block';
              console.log("Message=" + event.error.message);
              errorMessageElement.innerText = event.error.message;
            }
            formComponent.setSubmitted(false);
            // (document.getElementById('btnSubmit') as HTMLInputElement).disabled = true;
          }
          else if  (event.empty) {
            console.log("Message on empty");
            formComponent.setSubmitted(false);
          }
          else {

            savedErrors[idx] = null;

            // Loop over the saved errors and find the first one, if any.
            var nextError = Object.keys(savedErrors)
              .sort()
              .reduce(function (maybeFoundError, key) {
                return maybeFoundError || savedErrors[key];
              }, null);

            if (nextError) {
              // Now that they've fixed the current error, show another one.
              // errorMessage.innerText = nextError;
              formComponent.setSubmitted(false);
            } else {

              errorMessageElement.innerText = null;
              (errorElement as HTMLElement).style.display = 'none';
              

              var plainInputsValid = true;
              Array.prototype.forEach.call(form.querySelectorAll('input'), function(
                input
              ) {
                console.log("Message on all inputs" + input.value);
                if (input.checkValidity && !input.checkValidity()) {
                  console.log("Message on all inputs error ");
                  plainInputsValid = false;
                  // return;
                }
              });

              if (!plainInputsValid) {
                console.log("Message on something beign not complete");
                formComponent.setSubmitted(false);
                return;
              }
              else {
                formComponent.setSubmitted(true);
              }
            }
            // (document.getElementById('btnSubmit') as HTMLInputElement).disabled = false;
          }
        });
      });
    }
  }

  setSubmitted(value: boolean) {
    this.submitted = value;
    console.log("Submitted=" + this.submitted);
  }
  ngOnInit_working() {
    // Your Stripe public key
    const stripe = Stripe('pk_test_yj7jPsVkZC2ylVEIryi8I2iE006JQULb9F');

    // Create `card` element that will watch for updates
    // and display error messages
    const elements = stripe.elements();
    const card = elements.create('card');
    card.mount('#card-element');
    card.addEventListener('change', event => {
      const displayError = document.getElementById('card-errors');
      if (event.error) {
        displayError.textContent = event.error.message;
      } else {
        displayError.textContent = '';
      }
    });

    // Listen for form submission, process the form with Stripe,
    // and get the 
    const paymentForm = document.getElementById('payment-form');
    paymentForm.addEventListener('submit', event => {
      event.preventDefault();
      stripe.createToken(card).then(result => {
        if (result.error) {
          console.log('Error creating payment method.');
          const errorElement = document.getElementById('card-errors');
          errorElement.textContent = result.error.message;
        } else {
          // At this point, you should send the token ID
          // to your server so it can attach
          // the payment source to a customer
          console.log('Token acquired!');
          console.log(result.token);
          console.log(result.token.id);

          const { setupIntent, error } = stripe.confirmCardSetup(
            'seti_1G26Z8IOGVuUtgqUDJT6EXiK_secret_GZF3JqnVbdKeia4yJLoj4JJUNoqJbjU',
            {
              payment_method: {
                card: card,
                billing_details: {
                  email: 'jagan1458@yahoo.com',
                },
              },
            },
          );
        }
      });
    });
  }

  ngOnInit_1() {
    this.loadStripe_1();
    this.paymentDetails = new PaymentDetails();
  }

  loadStripe_1() {

    if (!window.document.getElementById('stripe-custom-form-script')) {
      var s = window.document.createElement("script");
      s.id = "stripe-custom-form-script";
      s.type = "text/javascript";
      s.src = "https://js.stripe.com/v3/";
      s.onload = () => {
        // window['Stripe'].setPublishableKey('pk_test_aeUUjYYcx4XNfKVW60pmHTtI');
        window[Stripe('pk_test_yj7jPsVkZC2ylVEIryi8I2iE006JQULb9F')];
      }

      window.document.body.appendChild(s);
    }
  }

  pay(form, valid) {

    if (!window['Stripe']) {
      alert('Oops! Stripe did not initialize properly.');
      return;
    }

    this.submitted = true;

    // console.log(this.customStripeForm);
    // if (this.customStripeForm.invalid) {      
    //   return;
    // }   

    // this.formProcess = true;
    console.log("form");
    console.log(form);
    if (!window['Stripe']) {
      alert('Oops! Stripe did not initialize properly.');
      return;
    }

    const stripe = Stripe('pk_test_yj7jPsVkZC2ylVEIryi8I2iE006JQULb9F');
    //(<any>window).Stripe.card.createToken({
    Stripe.card.createToken({
      number: this.paymentDetails.cardNumber,
      exp_month: this.paymentDetails.expiryMonth,
      exp_year: this.paymentDetails.expiryYear,
      cvc: this.paymentDetails.cvc
      // name - Cardholder name
      // address_line1
      // address_line2
      // address_city
      // address_state
      // address_zip
      // address_country - A two character country code (for example, US).
    }, (status: number, response: any) => {
      this.submitted = false;
      // this.formProcess = false;
      if (status === 200) {
        this.message = `Success! Card token ${response.card.id}.`;
        console.log("Token=" + this.message);
        //Stripe.
      } else {
        this.message = response.error.message;
        console.log("Error=" + this.message);
      }
    });
  }
}
