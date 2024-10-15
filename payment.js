    const payBtn = document.getElementById('payBtn');
    function initializePayment(email, amount, reference) {
        if (window.PaystackPop) {
            var paystack = window.PaystackPop.setup({
                key: 'pk_live_38a04fc1f2dba6fd123270e212cc0048fb58e1e7', // Replace with your actual Paystack public key
                email: email,
                amount: amount * 100, // Convert amount to kobo (Paystack expects amount in kobo)
                currency: 'KES',
                ref: reference,
                metadata: {
                    custom_fields: [
                        {
                            display_name: "Customer Email",
                            variable_name: "email",
                            value: email
                        }
                    ]
                },
                callback: function(response) {
                    console.log(response);
                    payStack.style.display = 'none';
                },
                onClose: function() {
                    console.log('Payment modal closed');
                }
            });
            paystack.openIframe();
        } else {
            console.error('PaystackPop is not available.');
        }
    }

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    payBtn.addEventListener("click", () => {
        var email = document.getElementById('userEmail').value;
        var amount = document.getElementById('userAmount').value;

        if (!email) {
            alert('Enter Email to continue');
            return;
        }

        // Validate email format
        if (!validateEmail(email)) {
            alert('Enter a Valid Email');
            return;
        }

        var reference = 'ACT_' + Math.random().toString(36).substring(7);
        var callback_url = 'https://edinbookly.netlify.app'; // Callback URL after payment completion
        initializePayment(email, amount, reference, callback_url);
        
    });

