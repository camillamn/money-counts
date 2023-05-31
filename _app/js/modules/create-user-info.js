export function createUserInfo(username, userAvatar) {
	const userInfo = document.createElement('section');
	const userImage = document.createElement('figure');
	const userImg = document.createElement('img');
	const userName = document.createElement('div');

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

	userName.innerText = username;
	userImg.src = userAvatar;

	userImage.appendChild(userImg);
	userInfo.appendChild(userImage);
	userInfo.appendChild(userName);

	return userInfo;
}