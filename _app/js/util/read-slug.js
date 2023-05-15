// function to read the URL and remove the ?

export function readSlug() {
	const fullUrl = window.location.href;
	if (fullUrl.includes('kids')) {
		return window.location.search.slice(1);
		}
		return undefined;
	}
