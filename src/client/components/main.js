export default {
	template: `
		<table>
			<tr v-for="flight in flights">
				<th> {{ flight.originCountry }} </th>
				<th> {{ flight.destinationCountry }} </th>
				<th> {{ flight.flightDateTime }} </th>
				<th> {{ flight.direction }} </th>
				<th> {{ flight.price.$numberDecimal }} </th>
			</tr>
		</table>
  `,
	data() {
		return {
			flights: [],
		};
	},
	async mounted() {
		this.flights = await this.fetchWrapper();
	},
	methods: {
		async fetchWrapper() {
			const data = await fetch('/api/flights').then((response) => response.json());
			return data;
		},
	}
}