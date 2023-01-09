export default {
	template: `<div class="center" id="center">
        <h1 style="font-size:30px; margin-top:15px;">The Daily Traveler</h1>
        <form>
      
          <div class="txt_field">
            <input v-model="flight.originCountry" type="text" required style="text-align: center;" placeholder="Origin">
            <span></span>
          </div>
          <div class="txt_field">
            <input v-model="flight.destinationCountry" type="text" required style="text-align: center;" placeholder="Destination">
            <span></span>
          </div>
          <div class="txt_field">
            <input v-model="flight.flightDateTime" type="text" required style="text-align: center;" placeholder="Date">
            <span></span>
          </div>
          <div class="txt_field">
            <input v-model="flight.price" type="text" required style="text-align: center;" placeholder="Price">
            <span></span>
          </div>
          <div class="txt_field">
            <input v-model="flight.seatsLeft" type="text" required style="text-align: center;" placeholder="Seats">
            <span></span>
          </div>
          <div class="txt_field">
            <input v-model="flight.direction" type="text" required style="text-align: center;" placeholder="Direction">
            <span></span>
          </div>
          <input type="button" value="Add Flight" style="background: red; margin-bottom: -200px;" @click="addFlight">
          <div style="margin-bottom: 50px;"></div>
        </form>
	  `,
	data() {
		return {
                flight:{},
                        response:null,
                };
	},
	async mounted() {
                
	},
	methods: {
                async addFlight(){
                        const reqData = {
                                method: 'POST',
                                headers: {
                                        'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(this.flight),
                        };
                        this.response = await fetch('api/flight/add-flight', reqData).then((response) => response.json());
                        console.log(this.response);
                        alert(this.response);
                },
	}
}