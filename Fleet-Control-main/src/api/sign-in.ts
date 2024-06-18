import axios from "axios";
import Cookies from 'js-cookie';


interface SignInRequest{
    username:string;
    password:string;
}

export async function handleSignIn({ username, password }: SignInRequest) {
  
    try {
      
      const params = new URLSearchParams();
      params.append('username', username);
      params.append('password', password);
      params.append('grant_type', 'password');
      params.append('client_id', 'admin-fleet');
      params.append('client_secret', '9bvThfmNwVnnzGb1q4SJBkCKI2trBiYI');
  
      const response = await axios.post('https://3.129.169.131:8443/realms/FleetControl/protocol/openid-connect/token', params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
      });
      if(response.data){
        Cookies.set('token', response.data.access_token)
      }
      
      console.log(response);
      return response.data;
    } catch (error) {
      console.error('Error during sign-in:', error);
      throw error;
    }
  }