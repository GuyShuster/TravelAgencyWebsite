export default {
	template: `
	<!--Page heading title START-->
	<div class="slide-effect">
		<div class="slideDown">The Daily Traveler</div>
	</div>
	<!--Page heading title END-->
	<!--Navbar START-->
	<nav class="navbar navbar-expand-lg bg-dark" style="opacity: 0.7;">
		<div class="container-fluid">
			<div class="collapse navbar-collapse" id="navbarScroll">
				<ul class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style="--bs-scroll-height: 100px;">
				<select v-model="filter.flyFrom" id="originSelect "class="form-select" aria-label="Default select example" style="width: 200px; margin-right: 10px;">
					<option value="" disabled selected>Origin</option>
					<option v-for="origin in origins"> {{ origin }}</option>
				</select>
				<select v-model="filter.flyTo" id="destSelect" class="form-select" aria-label="Default select example" style="width: 200px; margin-right: 10px;">
					<option value="" disabled selected>Destination</option>
					<option v-for="destination in destinations"> {{ destination }}</option>
				</select>
				<div class="col-lg-3 col-sm-6"
					style="width: 200px; margin-right: 10px; outline-style: solid; outline-width: 2px; outline-color: green; border-radius: 10px">
					<input v-model="filter.dateRange.from" id="startDate" class="form-control" type="date" />
				</div>
				<div class="col-lg-3 col-sm-6" 
					style="width: 200px; margin-right: 10px; outline-style: solid; outline-width: 2px; outline-color: red; border-radius: 10px">
					<input v-model="filter.dateRange.to" id="endDate" class="form-control" type="date" />
				</div>
				<select v-model="filter.direction" id="direction" class="form-select" aria-label="Default select example" style="width: 200px; margin-right: 10px;">
					<option value="" disabled selected>Direction</option>
					<option v-for="direction in directions"> {{ direction }}</option>
				</select>
				<input v-model="filter.priceRange.from" class="form-control me-2" type="number" placeholder="Min Price" aria-label="Search" style="width: 115px; margin-right: 10px;">
				<input v-model="filter.priceRange.to" class="form-control me-2" type="number" placeholder="Max Price" aria-label="Search" style="width: 115px; margin-right: 10px;">
				<input v-model="filter.seatsLeft" class="form-control me-2" type="number" placeholder="Num of Seats" aria-label="Search" style="width: 150px; margin-right: 10px;">
				</ul>
				<select v-model="filter.sortOption" id="sort" class="form-select" aria-label="Default select example" style="width: 200px; margin-right: 10px;">
					<option value="" disabled selected>Sort By</option>
					<option v-for="option in sortingOptions"> {{ option }}</option>
				</select>
				<button class="btn btn-outline-success" type="submit" @click="searchFlights">Search</button>
			</div>
		</div>
	</nav>
	<!--Navbar END-->
	<div style="height:10px"></div>
	<!--Table START-->
		<table>
			<thead style="font-size: 20px; font-weight:bolder">
				<tr>
					<th scope="col">Origin</th>
					<th scope="col">Destination</th>
					<th scope="col">Date</th>
					<th scope="col">Direction</th>
					<th scope="col">Price</th>
					<th scope="col">Seats Left</th>
				</tr>
	  		</thead>
	  		<tbody>
				<tr v-for="flight in flights">
					<th> {{ flight.originCountry }} </th>
					<th> {{ flight.destinationCountry }} </th>
					<th> {{ flight.flightDateTime }} </th>
					<th> {{ flight.direction }} </th>
					<th> {{ flight.price.$numberDecimal }} </th>
					<th> {{ flight.seatsLeft }} </th>
					<th><button type="button" class="btn btn-secondary" :id="flight._id"> Book </button></th>
				</tr>
			</tbody>
		</table>
	<!--Table END-->`,
	data() {
		return {
			flights: [],
			origins: [],
			destinations: [],
			directions: [],
			sortingOptions: [
				"Increasing price",
				"Decreasing price",
				"Most popular",
				"Origin Country",
				"Destination Country",
			],
			filter: {
				seatsLeft: 2,
				dateRange: {

				},
				priceRange: {

				},
			},
		};
	},
	async mounted() {
		this.flights = await this.fetchWrapper();
		this.origins = Array.from(new Set(this.flights.map(flight => flight.originCountry)));
		this.destinations = Array.from(new Set(this.flights.map(flight => flight.destinationCountry)));
		this.directions = Array.from(new Set(this.flights.map(flight => flight.direction)));
	},
	methods: {
		initFilter(seatsLeft) {
			this.filter = {
				seatsLeft,
				dateRange: {
	
				},
				priceRange: {

				},
			};
		},
		async searchFlights() {
			if (this.filter.dateRange?.from) {
				const today = new Date();
				const requestedDate = new Date(this.filter.dateRange.from);
				this.filter.dateRange.from = today > requestedDate ? today : requestedDate;
			}

			if (this.filter.dateRange?.to) {
				this.filter.dateRange.to = new Date(this.filter.dateRange.to);
			}

			if (this.filter.direction) {
				this.filter.direction = [this.filter.direction];
			}

			if (this.filter.seatsLeft) {
				this.filter.seatsLeft = Math.max(this.filter.seatsLeft, 0);
			} else {
				this.filter.seatsLeft = 2;
			}

			try {
				this.flights = await fetch('/api/flights', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(this.filter),
				}).then((response) => response.json());
			} finally {
				this.initFilter(this.filter.seatsLeft);
			}

		},
		async fetchWrapper() {
			const data = await fetch('/api/flights', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					dateRange: {
						from: new Date(),
					}
				}),
			}).then((response) => response.json());

			return data;
		},
	}
}