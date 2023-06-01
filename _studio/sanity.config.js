import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';

import schemas from './schemas/schemas.js';
import weeklyList from './structure/weekly-lists.js';

export default {
	title: 'MoneyCounts',

	projectId: '72svl59e',
	dataset: 'production',

	plugins: [
		deskTool({
			title: 'Weekly list',
			name: 'weeklyList',
			structure: weeklyList
		}), 
		visionTool()
	],

	schema: {
		types: schemas,
	},
};
