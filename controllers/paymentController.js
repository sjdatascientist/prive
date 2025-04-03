const Razorpay = require('razorpay'); 
const { RAZORPAY_ID_KEY, RAZORPAY_SECRET_KEY } = process.env;

const razorpayInstance = new Razorpay({
    key_id: "rzp_test_GG15JZpgJ2KB0r",
    key_secret: "KOHbAzIPr0feMHeJ42vD2gkk"
});


const createOrder = async(req,res)=>{
    try {
        const amount = 10000*100
        const options = {
            amount: amount,
            currency: 'INR',
            receipt: 'gffds'
        }

        razorpayInstance.orders.create(options, 
            (err, order)=>{
                if(!err){
                    res.status(200).send({
                        success:true,
                        msg:'Order Created',
                        order_id:order.id,
                        amount:amount,
                        key_id:RAZORPAY_ID_KEY,
                        product_name: 'GOLDDD',
                        description:req.body.description,
                        contact:req.body.number,
                        name: req.body.name,
                        email: req.body.email
                    });
                    console.log(res);
                }
                else{
                    res.status(400).send({success:false,msg:'Something went wrong!'});
                }
            }
        );

    } catch (error) {
        console.log(error.message);
    }
}


// export default createOrder;
module.exports = {
    createOrder
}