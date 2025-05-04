document.getElementById('btn-to-bookdates').addEventListener('click', () => (window.location.href = '/bookdates'));

const paymentBtn = document.getElementById('paymentBtn');
const paymentDiv = document.getElementById('payment-complete-div');
const bookDatesBtn = document.getElementById('btn-to-bookdates');

paymentDiv.style.display = 'none';
bookDatesBtn.style.display = 'none';

// Initially hide details
document.querySelectorAll('.hidden-details').forEach(el => {
  el.style.display = 'none';
});

const userData = {
  name: document.getElementById('name').textContent,
  email: document.getElementById('email').textContent,
  phone: document.getElementById('phone').textContent,
  city: document.getElementById('city').textContent,
  car: document.getElementById('car').textContent,
  fuel: document.getElementById('fuel').textContent,
  tickets: Number(document.getElementById('tickets').textContent),
};

const {name, email, phone, city, car, tickets, fuel} = userData;

// Saving user details on client side
sessionStorage.setItem("userData", JSON.stringify(userData));

// After consuming details delete hidden element
setTimeout(() => {
  document.querySelectorAll('.hidden-details').forEach(el => {
    el.remove();
  });
}, 2000);

fetch("/saveBookingData", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(userData),
})
.then(response => response.json())
.then(data => {
  const userBookingID = data.booking_id;
  sessionStorage.setItem("userBookingID", JSON.stringify(userBookingID));

  // After this activate pay now button for further processing
  paymentBtn.addEventListener('click', async function () {
    // Step 1: Create order on your server
    fetch('/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        city,
        car,
        tickets,
        fuel,
      }),
    })
    .then(response => response.json())
    .then(data => {
      const order = JSON.parse(data);

      // Step 2: Open Razorpay checkout
      const options = {
        // for live environment
        // For test environment
        key: 'rzp_live_sw0tY7r67y7YTy',    
        amount: order.amount,
        currency: order.currency,
        name: 'Privé Drive',
        description: 'Test Payment',
        order_id: order.id,
        created_at: order.created_at,
        prefill: {
          name: '',
          email: order.notes.Email,
          contact: order.notes.Phone,
        },
        image: 'https://sowbpfqwcnvhxubqvzml.supabase.co/storage/v1/object/public/static-files.public//logo-with-bg.png',
        theme: {
          // color: "#ecff82",
          color: '#000',
        },
        modal: {
          ondismiss: function () {
            alert('Payment Cancelled');
          },
        },
        timeout: 600, // 10 Minutes
        readonly: {
          contact: true,
          email: true,
          name: false,
        },
        retry: {
          enabled: true,
          max_count: 4,
        },

        // Step 3: Verify Payment Signature
        handler: function (response) {
          fetch('/verify-payment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              order_id: response.razorpay_order_id,
              payment_id: response.razorpay_payment_id,
              signature: response.razorpay_signature,
            }),
          })
          .then(response => response.json())
          .then(() => {
            paymentDiv.style.display = 'block';
            window.location.href = '/payment#payment-complete-div';
            // Step 4: Update Payment Status to Completed in Database,
            // and assign group no. & shareholder serial number to user
            fetch('/updateBookingData', {
              method: "PATCH",
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                userData,
                userBookingID
              })
            });
            
            setTimeout(function () {
              window.location.href = '/bookdates';
            }, 8000);
          })
          .catch(() => {
            alert('Payment Failed! Signature Verification Mismatched');
          });
        },
      };
      // Create Razorpay Modal Window and Open Pop-Up
      const razorpayWindow = new Razorpay(options);
      razorpayWindow.open();
    });
  });
})
.catch(error => {
  console.error('Error:', error);
});