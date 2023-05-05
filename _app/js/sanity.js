/**
 * I understand that this will expose the token to the client, and that's a major mistake
 * in a frontend project, it's only implemented like this for the sake of simplicity
 * during the exam.
 **/

import { token } from "./env.js";
import { SanityClient } from "./util/sanity-client-mutate.js";

export const sanity = SanityClient({
	id: '72svl59e',
	dataset: 'production',
	version: '2023-04-01',
	token: `${token}`,
})