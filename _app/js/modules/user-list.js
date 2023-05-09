import { sanity } from '../sanity.js';

export default async function UserList() {
	// choose where to put the data from sanity
	const userListContainer = document.querySelector('.frontpage-users');
	
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
	
	function createUserItemDOM() {

		for (const user of users) {
			const userItem = document.createElement('div');
			const userImage = document.createElement('figure');
			const userImg = document.createElement('img');
			const userInformation = document.createElement('div');
			const userName = document.createElement('div');
			// const userEarning = document.createElement('div');
			const userButton = document.createElement('button');

			userItem.className = 'frontpage-users__user box grid__column--4';
			userListContainer.appendChild(userItem);

			userItem.appendChild(userImage);
			userItem.appendChild(userInformation);
			userItem.appendChild(userButton);

			userImage.appendChild(userImg);

			userInformation.appendChild(userName);
			// userInformation.appendChild(userEarning);

			userImage.className = 'frontpage-users__user-image';
			userImg.className = 'frontpage-users__user-img';
			userImg.src = user.userAvatar;
			userImg.alt = user.userAlt;

			userInformation.className = 'frontpage-users__user-information box';
			userName.className = 'frontpage-users__user-name';
			userName.innerText = user.username
			// userEarning.className = 'frontpage-users__user-earning';
			// userEarning.innerText = `NOK`

			userButton.className = 'frontpage-users__user-choose-me';

		}
		return userListContainer;
	}

	function renderHTML() {
		const userListContainer = createUserItemDOM();
		document.body.appendChild(userListContainer);
	}

	renderHTML();

}
