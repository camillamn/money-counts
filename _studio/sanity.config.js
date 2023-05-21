import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';

import schemas from './schemas/schemas.js';
import settings from './structure/settings.js';
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
		deskTool({
			title: 'Settings',
			name: 'settings',
			structure: settings
		}), 
		visionTool()
	],

	schema: {
		types: schemas,
	},
};
