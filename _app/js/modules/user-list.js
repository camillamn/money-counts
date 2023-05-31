/**
 * UserList(slug)
 * Renders a list if of users with their information and link to their individual page
 * @param {string} slug - The slug of a specific user
 * 
 * createUserItemDOM(user)
 * Creates a DOm element for a user item
 * @param {object} user - The user object with user information
 * @returns {HTMLElement} - The DOM element for the user item
 * 
 */

import FetchUsers from './fetch-users.js';

export default async function UserList(slug) {
	// fetch the users with role user from the database
	const users = await FetchUsers();
	
	// create the DOM elements
	function createUserItemDOM(user) {
			const userItem = document.createElement('div');
			const userImage = document.createElement('figure');
			const userImg = document.createElement('img');
			const userInformation = document.createElement('div');
			const userName = document.createElement('div');
			const userLink = document.createElement('a');
			// const userEarning = document.createElement('div');

			// add CSS classes to the elements
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
			
			// set the text content and source of the elements
			userImg.src = user.userAvatar;
			userImg.alt = user.userAlt;

			userName.innerText = user.username

			userLink.setAttribute('href', `/kids/?${user.slug.current}`);
			userLink.textContent = 'Til min side';
			// userEarning.className = 'frontpage-users__user-earning';
			// userEarning.innerText = `NOK`
			

			// append the child elements to the parent element
			userImage.appendChild(userImg);
			userItem.appendChild(userImage);
			userItem.appendChild(userInformation);
			userItem.appendChild(userLink);
			userInformation.appendChild(userName);
			// userInformation.appendChild(userEarning);

			// handle click event to go to the user page based on slug
			userLink.addEventListener('click', (event) => {
				event.preventDefault();
				window.location.href = userLink.href;
			});
			
			return userItem;
		}
		// renders the user list by creating the DOM elements and append them to the document body
		function renderHTML() {
			const userListContainer = document.querySelector('.frontpage-users');
			for (const user of users) {
				const userContainer = createUserItemDOM(user);
				userListContainer.appendChild(userContainer);
			}
			document.body.appendChild(userListContainer);
		}
		renderHTML();
	}
