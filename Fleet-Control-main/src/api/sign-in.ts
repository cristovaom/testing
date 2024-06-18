import axios from "axios";

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
      params.append('client_id', 'fleetcontrol');
      params.append('client_secret', 'cOlfOVNjDaEdI6gbciX4IA1WJ5ztDQ0Y');
  
      const response = await axios.post('https://18.231.118.196/realms/fleetcontrol/protocol/openid-connect/token', params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
      });
  
      console.log(response);
      return response.data;
    } catch (error) {
      console.error('Error during sign-in:', error);
      throw error;
    }
  }