export default {
	template: `<div class="center" style=" border-radius: 25px;" id="center">
                <input type="button" style="background: red;"value="Log out" @click="logout">
	  `,
	data() {
		return {

                };
	},
	async mounted() {
                
	},
	methods: {
                async logout(){
                        const reqData = {
                                method: 'POST',
                                headers: {
                                        'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({})
                        };
                        try {
                                this.response = await fetch('api/users/logout', reqData).then((response) => response.json());
                                alert(this.response);
                                window.location.href='/login';
                        } catch (error) {
                                alert("Error in logging out!");
                        }
                        // if (this.response.includes('success')){
                        //         alert(this.response);
                        //         window.location.href='/';
                        // }
                        // else
                        //         //alert((this.response).toString());
                        //         alert(this.response);
                },
	}
}