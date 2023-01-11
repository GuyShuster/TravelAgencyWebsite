export default {
	template: `<div class="center" id="center">
        <h1 style="font-size:30px; margin-top:15px;">The Daily Traveler</h1>
        <form>
      
          <div class="txt_field">
            <input v-model="user.number" type="text" required style="text-align: center;" placeholder="Origin">
            <span></span>
          </div>
          <div class="txt_field">
            <input v-model="user.destinationCountry" type="text" required style="text-align: center;" placeholder="Destination">
            <span></span>
          </div>
          <div class="txt_field">
            <input v-model="user.flightDateTime" type="text" required style="text-align: center;" placeholder="Date">
            <span></span>
          </div>
          <div class="txt_field">
            <input v-model="user.price" type="number" required style="text-align: center;" placeholder="Price">
            <span></span>
          </div>
          <div class="txt_field">
            <input v-model="user.direction" type="text" required style="text-align: center;" placeholder="Direction">
            <span></span>
          </div>
          <div class="txt_field">
            <input v-model="user.seatsLeft" type="number" required style="text-align: center;" placeholder="Seats left">
            <span></span>
          </div>
          <input type="button" value="Buy Flight" style="background: red; margin-bottom: -200px;" @click="buyFlight">
          <div style="margin-bottom: 50px;"></div>
        </form>
	  `,
	data() {
		return {
                card:{},
                response:null,
                };
	},
	async mounted() {
                
	},
	methods: {
                async buyFlight(){
                        const reqData = {
                                method: 'POST',
                                headers: {
                                        'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(this.card),
                        };
                        try {
                          //fix api
                          //this.response = await fetch('api/flights/add-flight', reqData).then((response) => response.json());  
                          alert(this.response);
                        } catch (error) {
                          alert("Error in buying ticket.");
                        }
                },
	}
}