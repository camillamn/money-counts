// template borrowed from the specsavers demo

export default function formatValue(value) {
	const formatted = value.toLocaleString('nb-NO');

	return `${formatted} NOK`;
}