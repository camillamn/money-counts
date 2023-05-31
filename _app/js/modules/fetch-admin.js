/**
 * Fetches the admin users from the database
 * @returns {Promise<Array<object>>} - A promise that returns an array of admin user objects
 */

import { sanity } from '../sanity.js';

export default async function FetchAdmin() {

	// define the query to fetch the admin users
   const query = `*[_type == 'user' && role == 'admin'] | order(name asc) {
		username,
		slug,
      role,
      "userAvatar": avatar.asset->url,
      "userAlt": name
   }`;
	
   // fetch users from the sanity database using query
   const admins = await sanity.fetch(query);

   console.log(admins)

	return admins;
}