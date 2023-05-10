import { sanity } from '../sanity.js';

export default async function FetchUsers() {

	// fetch the users with role "user" and not "admin"
   const query = `*[_type == 'user' && role == 'user'] | order(name asc) {
		username,
		slug,
      role,
      "userAvatar": avatar.asset->url,
      "userAlt": name
   }`;
	
   // fetch users from the sanity database using query
   const users = await sanity.fetch(query);

   console.log(users)

	return users;
}