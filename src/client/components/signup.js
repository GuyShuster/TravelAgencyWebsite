export default {
	template: `<div class="center" id="center">
    <h1 style="font-size:30px; margin-top:15px;">The Daily Traveler</h1>
    <form>

    <div class="txt_field">
            <input v-model="user.userName" type="text" required style="text-align: center;" id = "myusername" name = "myusername" placeholder="Username">
            <span></span>
            
    </div>
    <div class="txt_field">
            <input v-model="user.password" type="password" required style="text-align: center;" id = "mypassword" name = "password"  placeholder="Password">
            <span></span>
    </div>
    
    <input v-model="user.isAdmin" class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
    <label class="form-check-label" for="flexCheckDefault">
        &nbsp;&nbsp;Is admin
    </label>

    <br>
    <br>

    <input type="button" value="Sign up" style="margin-bottom: -200px;" @click="signup">
    <div class="signup_link">

    </div>
    </form>
    </div>
	  `,
	data() {
		return {
                        user:{},
                        response:null,
                };
	},
	async mounted() {
                
	},
	methods: {
                async signup(){
                        const reqData = {
                                method: 'POST',
                                headers: {
                                        'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(this.user),
                        };
                        this.response = await fetch('api/users/sign-up', reqData).then((response) => response.json());
                        console.log(this.response);
                        if (this.response.includes('Created')){
                                //window.location.href='/login'; //might not work
                                alert(this.response);
                                window.location.href='/login';
                        }
                        else
                                //alert((this.response).toString());
                                alert(this.response);
                },
	}
}