/**
 * Creates a user imformation section with username and user avatar.
 * @param {string} username - The username that will be displayed in the user information section.
 * @param {string} userAvatar - The URL of the user's avatar image.
 * @returns {HTMLelement} - The element of the created user information
 */

export function createUserInfo(username, userAvatar) {
	// create DOM elements
	const userInfo = document.createElement('section');
	const userImage = document.createElement('figure');
	const userImg = document.createElement('img');
	const userName = document.createElement('div');

	// add CSS classes to the elements
	userInfo.classList.add(
		'dynamic-page-kids__user-information', 
		'grid__column--3', 
		'box'
	);
	userImage.classList.add(
		'dynamic-page-kids__user-image'
	);
	userImg.classList.add(
		'dynamic-page-kids__user-img'
	);
	userName.classList.add(
		'dynamic-page-kids__user-name', 
		'grid__column--12', 
		'box'
	);

	// set the text content and the source of the elements
	userName.innerText = username;
	userImg.src = userAvatar;

	// append the child elements to the parent elements
	userImage.appendChild(userImg);

	userInfo.appendChild(userImage);
	userInfo.appendChild(userName);

	return userInfo;
}