import { sanity } from '../sanity.js';

export default async function UserList() {

   const query = `*[_type == 'user'] | order(name asc) {
      username,
      role,
      "userAvatar": avatar.asset->url,
      "userAlt": name
   }`;

   // fetch users from the sanity database using query
   const users = await sanity.fetch(query);

   console.log(users)
}
