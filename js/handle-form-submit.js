const form = document.getElementsByTagName("form")[0];

// Add event listener for form submission
form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
    event.preventDefault(); // Prevent default form submission

    // Get form data
    const formData = new FormData(event.target);

    // Convert form data to JSON
    const jsonData = Object.fromEntries(formData.entries());

    console.log(jsonData); // Log the form data

    // Send request with form data
    fetch('/memberships/paymentform/createOrder', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
    }).then(res.redirect('/memberships/paymentform/createOrder'))

    // async function payNow() {
    //     const response = await fetch('/createOrder', { method: 'POST' });
    //     const order = await response.json();
      
    //     const options = {
    //       key: 'YOUR_KEY_ID', // Replace with your Key ID
    //       amount: order.amount, // Amount in paise
    //       currency: order.currency,
    //       name: "Your Company Name",
    //       description: "Test Transaction",
    //       order_id: order.id, // Order ID from backend
    //     //   callback_url: "/payment-success", // Backend endpoint for verifying payment
    //       prefill: {
    //         name: "John Doe",
    //         email: "john.doe@example.com",
    //         contact: "9999999999",
    //       },
    //       theme: {
    //         color: "#F37254",
    //       },
    //     };
      
    //     const rzp = new Razorpay(options);
    //     rzp.open();
    //   }


    /*
    $.ajax({
        url:"/createOrder",
        type:"POST",
        data: jsonData,
        success:function(res){
            if(res.success){
                var options = {
                    "key": ""+res.key_id+"",
                    "amount": ""+res.amount+"",
                    "currency": "INR",
                    "name": ""+res.product_name+"",
                    // "description": ""+res.description+"",
                    // "image": "https://dummyimage.com/600x400/000/fff",
                    "order_id": ""+res.order_id+"",
                    "handler": function (response){
                        alert("Payment Succeeded");
                        // window.open("/","_self")
                    },
                    "prefill": {
                        "contact":""+res.contact+"",
                        "name": ""+res.name+"",
                        "email": ""+res.email+""
                    },
                    "notes" : {
                        "description":""+res.description+""
                    },
                    "theme": {
                        "color": "#2300a3"
                    }
                };
                var razorpayObject = new Razorpay(options);
                razorpayObject.on('payment.failed', function (response){
                        alert("Payment Failed");
                });
                razorpayObject.open();
            }
            else{
                alert(res.msg);
            }
        }
    })
    */
}