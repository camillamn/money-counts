import { sanity } from '../sanity.js';

export default async function TaskList() {
   const query = `*[_type == 'task'] | order(name asc) {
      name,
      value
   }`;

   // fetch tasks from the sanity database using query
   const tasks = await sanity.fetch(query);

   console.log(tasks)
}