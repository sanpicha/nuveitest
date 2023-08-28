var show = function(elem) {
  elem.classList.add('is-visible');
};

var hide = function(elem) {
  elem.classList.add('is-hide');
};

function initSDK() {
  hide(document.getElementsByClassName('webSDK-placeholder')[0]);
  show(document.getElementsByClassName('toggle-content')[0]);

  if (window.scard) {
    window.scard.destroy();
  }
  var sfc = SafeCharge({
    env: document.getElementById('environment').value,
    merchantId: document.getElementById('metchantID').value,
    sessionToken: document.getElementById('session').value,
    merchantSiteId: document.getElementById('metchantSiteID').value
  });
  window.sfc = sfc
  var ScFields = sfc.fields({
    fonts: [{
      cssUrl: 'https://fonts.googleapis.com/css?family=Source+Code+Pro'
    }, ],
    locale: 'en'
  });

  var style = {
    base: {
      fontFamily: 'Roboto, sans-serif',
      color: "#045d47",
      fontSize: "14px",
      fontSmoothing: 'antialiased',
      '::placeholder': {
        color: '#00becf'
      }
    },
    invalid: {
      color: '#e5312b',
      ':focus': {
        color: '#303238'
      }
    },
    empty: {
      color: '#00becf',
      '::placeholder': {
        color: '#00becf'
      }
    },
    valid: {
      color: '#00A86b'
    }
  };

  var scard = ScFields.create('card', {
    style: style,
    card_brand: 'visa'
  });
  scard.attach(document.getElementById('card-field-placeholder'));
  window.scard = scard;
}

function main() {
  document.getElementById('result').innerHTML = '';

  sfc.createPayment({
    "userTokenId": "230811147",
    "clientUniqueId": "695701003", // optional
    "cardHolderName": document.getElementById('cardHolderName').value,
    "paymentOption": scard,
    "billingAddress": {
      "email": "someone@somedomain.com",
      "country": "GB"
    }
  }, function(res) {
    console.log(res);
    document.getElementById('result').style.display = 'block';
    document.getElementById('result').innerHTML = JSON.stringify(res, null, 4)
  })
}
