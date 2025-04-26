const {supabase} = require('../config/supabase')

const getUserID = async function(email) {
    // Search for user_id from users table by Email
	const response = await supabase.from('users').select('user_id').eq('email', email)
	const user_id = response.data[0]["user_id"]
    return user_id
}

module.exports = getUserID