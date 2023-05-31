import FetchUsers from './fetch-users.js';

export default async function UserList(slug) {
	// fetch the users
	const users = await FetchUsers();
	
	function createUserItemDOM(user) {
			const userItem = document.createElement('div');
			const userImage = document.createElement('figure');
			const userImg = document.createElement('img');
			const userInformation = document.createElement('div');
			const userName = document.createElement('div');
			const userLink = document.createElement('a');
			// const userEarning = document.createElement('div');

			userItem.classList.add(
				'frontpage-users__user', 
				'box', 
				'grid__column--4',
			);
			userImage.classList.add(
				'frontpage-users__user-image'
			);
			userImg.classList.add(
				'frontpage-users__user-img'
			);
			userInformation.classList.add(
				'frontpage-users__user-information', 
				'box'
			);
			userName.classList.add(
				'frontpage-users__user-name'
			);
			userLink.classList.add(
				'frontpage-users__user-choose-me'
			);
			
			userImg.src = user.userAvatar;
			userImg.alt = user.userAlt;

			userName.innerText = user.username

			userLink.setAttribute('href', `/kids/?${user.slug.current}`);
			userLink.textContent = 'Til min side';
			// userEarning.className = 'frontpage-users__user-earning';
			// userEarning.innerText = `NOK`
			
			userImage.appendChild(userImg);

			userItem.appendChild(userImage);
			userItem.appendChild(userInformation);
			userItem.appendChild(userLink);

			userInformation.appendChild(userName);
			// userInformation.appendChild(userEarning);

			userLink.addEventListener('click', (event) => {
				event.preventDefault();
				window.location.href = userLink.href;
			});
			
			return userItem;
		}
		function renderHTML() {
			const userListContainer = document.querySelector('.frontpage-users');

			if (slug) {
				const user = users.find(user => user.slug.current === slug);
				if (user) {
					const userContainer = createUserItemDOM(user);
					userListContainer.appendChild(userContainer);
				}
			} else {
				for (const user of users) {
					const userContainer = createUserItemDOM(user);
					userListContainer.appendChild(userContainer);
				}
			}
			document.body.appendChild(userListContainer);
		}
		renderHTML();
	}
