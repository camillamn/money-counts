/* This template is made by our teacher for us to use with sanity projects */

/**
 * @param {object} config Client configuration for all requests
 * @param {string} config.id Project ID
 * @param {string} config.dataset Dataset name – e.g. "production"
 * @param {string} config.version API version – e.g. "2023-03-01"
 * @param {string} config.token Token key to use for authenticated requests
 * @param {boolean} config.cdn Use CDN host
 */
export function SanityClient(config) {
	const { id, dataset, version, cdn, token } = config;

	if (!id || !dataset || !version) {
		throw new Error('Sanity: project id, dataset, and API version must be defined');
	}

	async function mutate(mutations = [], params = {}) {
		if (!token) {
			throw new Error('Sanity: all mutation requests have to be authenticated');
		}

		let request_url = `https://${id}.api.sanity.io/v${version}/data/mutate/${dataset}`;

		const request_options = {
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ mutations }),
		};

		if (params) {
			const mapped_params = Object.keys(params).map(key => `${key}=${params[key]}`);
			request_url += `?${mapped_params.join('&')}`;
		}

		const response = await fetch(request_url, request_options);
		console.log(response);
		const response_body = await response.json();
		console.log(response_body);

		if (response.ok) {
			return response_body;
		} else if (response.status === 404) {
			throw new Error('Url not found');
	  } else if (response.status === 401) {
			throw new Error('Not authorized user');
	  } else if (response.status >= 500) {
			throw new Error('Server error');
	  } else {
			throw new Error(response_body.error?.description || 'Unknown error');
		}
	}

	async function query(query = '', params = {}) {
		const host = cdn === true ? 'apicdn.sanity.io' : 'api.sanity.io';
		const encoded_query = encodeURIComponent(query);
		const encoded_params = Object.keys(params).reduce((pairs, param_key) => {
			const key = encodeURIComponent(`$${param_key}`);
			const value = encodeURIComponent(JSON.stringify(params[param_key]));
			return pairs + `&${key}=${value}`;
		}, '');

		const query_string = `?query=${encoded_query}${encoded_params}`;
		const should_switch_method = query_string.length > 11264;

		let request_url = `https://${id}.${host}/v${version}/data/query/${dataset}`;

		const request_options = {
			method: 'GET',
			headers: {},
			body: null,
		};

		if (token) {
			request_options.headers['Authorization'] = `Bearer ${token}`;
		}

		if (should_switch_method) {
			request_options.headers['Content-Type'] = 'application/json';
			request_options.method = 'POST';
			request_options.body = JSON.stringify({ query, params });
		} else {
			request_url += query_string;
		}

		const response = await fetch(request_url, request_options);
		const response_body = await response.json();

		if (response.ok) {
			return response_body.result;
		} else if (response.status === 404) {
			throw new Error('Url not found');
	  } else if (response.status === 401) {
			throw new Error('Not authorized user');
	  } else if (response.status >= 500) {
			throw new Error('Server error');
	  } else {
			throw new Error(response_body.message || response_body.error?.description || 'Unknown error');
		}
	}

	return {
		fetch: query,
		mutate: mutate,
	};
}