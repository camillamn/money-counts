/**
 * Fetches the list of all users with role user in the database
 * @returns {Promise<Array<object>>} - A promise that returns an array of user objects
 */

import { sanity } from '../sanity.js';

export default async function FetchUsers() {

	// define the query to fetch all users with role user
   const query = `*[_type == 'user' && role == 'user'] | order(name asc) {
		username,
		slug,
      role,
      "userAvatar": avatar.asset->url,
      "userAlt": name
   }`;
	
   // fetch users from the sanity database using query
   const users = await sanity.fetch(query);

	return users;
}