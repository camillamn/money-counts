export function createUserInfo(username, userAvatar) {
	const userInfo = document.createElement('section');
	const userImage = document.createElement('figure');
	const userImg = document.createElement('img');
	const userName = document.createElement('div');

	userInfo.className = 'static-page-kids__user-information grid__column--6 box';
	userImage.className = 'static-page-kids__user-image';
	userImg.className = 'static-page-kids__user-img';

	userName.className = 'static-page-kids__user-name grid__column--12 box';

	userName.innerText = username;
	userImg.src = userAvatar;
	// userImg.alt = weeklyListOfPerformedTask.username;

	userImage.appendChild(userImg);
	userInfo.appendChild(userImage);
	userInfo.appendChild(userName);

	return userInfo;
}