const {supabase} = require('../config/supabase')

const saveUserData = async (req, res, next) => {
	const {name, email, phone, city, car, tickets, fuel} = req.body

	// Creating User Data Object
	const userData = {
		name,
		email,
		phone,
		city,
		car,
		tickets,
		fuel,
	}


	async function isUserinDB(email = userData['email']) {
		const response = await supabase.from('users').select('*').eq('email', email)
		if (response.data.length < 2) {
			// User Not Present, We can proceed to add
            const {data, error} = await supabase.from('users').insert([
                {
                    name: userData['name'],
                    email: userData['email'],
                    phone: userData['phone'],
                },
            ])
    
            if (error) {
                console.error('Error inserting data:', error)
            } else {
                console.log(data)
            }

		} else {
            // Alert! User Already Present
			console.log(response)
		}
	}

	// Check before adding user
	isUserinDB()

	req.userData = userData
	next()
}

module.exports = saveUserData
