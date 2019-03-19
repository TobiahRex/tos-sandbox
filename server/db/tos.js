// import fs from 'fs';
import axios from 'axios';

// const privateKey = fs.readFileSync('./key.pem', 'utf8');
// const certificate = fs.readFileSync('./certificate.pem', 'utf8');
// const creds = { key: privateKey, cert: certificate };

const ThinkOrSwim = {
  getCode() {
    const options = {
      url: 'https://auth.tdameritrade.com/auth?response_type=code&redirect_uri=Redirect URI&client_id=OAuth User ID',
      method: 'GET',
      headers,
      form: {
        'grant-type': 'authorization-code',
        'access-type': 'offline',
        code,
        client_id: 'tobiahrex',
        redirect_uri: 'https://5b4a1adb.ngrok.io/api/tos/hook',
      },
    };
  },
  getToken(code) {
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };

    const options = {
      url: 'https://api.tdameritrade.com/v1/oauth2/token',
      method: 'POST',
      headers,
      form: {
        'grant-type': 'authorization-code',
        'access-type': 'offline',
        code,
        client_id: 'tobiahrex',
        redirect_uri: 'https://5b4a1adb.ngrok.io/api/tos/hook',
      },
    };

    return axios.post(options);
  },
};

export default ThinkOrSwim;
