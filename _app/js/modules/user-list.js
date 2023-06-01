/**
 * UserList()
 * Renders a list if of users with their information and link to their individual page.
 * 
 * createUserItemDOM(user)
 * Creates a DOM element for a user item
 * @param {object} user - The user object with user information
 * @returns {HTMLElement} - The DOM element for the user item
 * 
 */

import FetchUsers from './fetch-users.js';

export default async function UserList() {
	// fetch the users with role user from the database
	const users = await FetchUsers();
	
	// create the DOM elements
	function createUserItemDOM(user) {

			const userContent = document.createElement('article');
			const userImage = document.createElement('figure');
			const userImg = document.createElement('img');
			// const userName = document.createElement('h3');
			const userLink = document.createElement('a');

			// add CSS classes to the elements
			userContent.classList.add(
				'frontpage-users__user-content',
				'grid__column--4',
				'box',
			)
			userImage.classList.add(
				'frontpage-users__user-image',
			);
			userImg.classList.add(
				'frontpage-users__user-img'
			);
			// userName.classList.add(
			// 	'frontpage-users__user-name',
			// 	'box',
			// );
			userLink.classList.add(
				'frontpage-users__user-choose-me',
				'box',
			);
			
			// set the text content and source of the elements
			userImg.src = user.userAvatar;
			userImg.alt = user.userAlt;

			// userName.innerText = user.username

			userLink.setAttribute('href', `/kids/?${user.slug.current}`);
			userLink.textContent = `Til ${user.username} sin side`;

			// append the child elements to the parent element
			userImage.appendChild(userImg);
			userContent.appendChild(userImage);
			// userContent.appendChild(userName);
			userContent.appendChild(userLink);

			// handle click event to go to the user page based on slug
			userContent.addEventListener('click', (event) => {
				event.preventDefault();
				window.location.href = userLink.href;
			});
			
			return userContent;
		}
		// renders the user list by creating the DOM elements and append them to the document body
		function renderHTML() {
			const userListContainer = document.querySelector('.frontpage-users');
			const userItem = document.createElement('section');
			userItem.classList.add(
				'frontpage-users__user',
				'grid',
			);

			for (const user of users) {
				const userContainer = createUserItemDOM(user);
				userItem.appendChild(userContainer);
			}
			userListContainer.appendChild(userItem)
			document.body.appendChild(userListContainer);
		}
		renderHTML();
	}
