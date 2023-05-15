import FetchUsers from './fetch-users.js';

export default async function UserList() {

	// fetch the users
	const users = await FetchUsers();
	
	function createUserItemDOM() {
		const userListContainer = document.querySelector('.frontpage-users');

		for (const user of users) {
			const userItem = document.createElement('div');
			const userImage = document.createElement('figure');
			const userImg = document.createElement('img');
			const userInformation = document.createElement('div');
			const userName = document.createElement('div');
			const userLink = document.createElement('a');
			// const userEarning = document.createElement('div');

			userItem.className = 'frontpage-users__user box grid__column--4';
			
			userImage.className = 'frontpage-users__user-image';
			userImg.className = 'frontpage-users__user-img';
			userImg.src = user.userAvatar;
			userImg.alt = user.userAlt;
			
			userInformation.className = 'frontpage-users__user-information box';
			userName.className = 'frontpage-users__user-name';
			userName.innerText = user.username
			// userEarning.className = 'frontpage-users__user-earning';
			// userEarning.innerText = `NOK`
			
			userLink.className = 'frontpage-users__user-choose-me';
			userLink.setAttribute('href', `/kids/?${user.slug.current}`);
			userLink.textContent = 'View user';
			
			userListContainer.appendChild(userItem);

			userItem.appendChild(userImage);
			userItem.appendChild(userInformation);
			userItem.appendChild(userLink);

			userImage.appendChild(userImg);

			userInformation.appendChild(userName);
			// userInformation.appendChild(userEarning);

			userLink.addEventListener('click', (event) => {
				event.preventDefault();
				window.location.href = userLink.href;
			});

		}
		return userListContainer;
	}

	function renderHTML() {
		const userListContainer = createUserItemDOM();
		document.body.appendChild(userListContainer);
	}

	renderHTML();
}
