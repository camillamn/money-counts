import { sanity } from '../sanity.js';

export default async function FetchAdmin() {

	// fetch the users with role "admin"
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