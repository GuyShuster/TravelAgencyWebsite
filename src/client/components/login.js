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

    <input type="button" value="Login" style="margin-bottom: -200px;" @click="login">
    <div class="signup_link">
    <input type="button" value="Sign up" style="background: red; margin-bottom: -200px;" onclick="location.href='/signUp'">

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
                async login(){
                        const reqData = {
                                method: 'POST',
                                headers: {
                                        'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(this.user),
                        };
                        this.response = await fetch('api/users/login', reqData).then((response) => response.json());
                        console.log(this.response);
                        if (this.response.includes('success')){
                                alert(this.response);
                                window.location.href='/';
                        }
                        else
                                //alert((this.response).toString());
                                alert(this.response);
                },
	}
}