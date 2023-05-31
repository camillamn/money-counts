/**
 * Reads the URL and extracts the slug by removing the ?
 * @returns {string|undefined} - The extracted slug from the URL, or undefined if there is no slug
 */

export function readSlug() {
	// get the full URL of the page
	const fullUrl = window.location.href;

	// check if the URL contains the "kids" segment
	if (fullUrl.includes('kids')) {
		// extract the slug by removing the ? 
		return window.location.search.slice(1);
	} else {
		// return undefined if the slug is not found
		return undefined;
	}
}
