const {supabase} = require('../config/supabase')

const getUserID = async function(email) {
    // Search for user_id from users table by Email
	const {data, error} = await supabase.from('users').select('user_id').eq('email', email);

    if (error) {
        console.log('Error Getting User ID: ', error)
    }
    else {
        const user_id = data[0].user_id;
        return user_id;
    }
}

module.exports = getUserID