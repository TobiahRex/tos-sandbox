/* eslint-disable */
import axios from 'axios';
import request from 'request';

const ThinkOrSwim = {
  getCode() {
    return new Promise((resolve, reject) => {
      axios.get(`https://auth.tdameritrade.com/auth?response_type=code&redirect_uri=${encodeURIComponent(process.env.TOS_REDIRECT_URI)}&client_id=${encodeURIComponent(process.env.TOS_CLIENT_ID)}@AMER.OAUTHAP`)
        .then(resolve)
        .catch(reject);
    });
  },
  getToken(code) {
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    const options = {
  		url: 'https://api.tdameritrade.com/v1/oauth2/token',
  		method: 'GET',
  		headers: headers,
  		form: {
  			'grant_type': 'authorization_code',
  			'access_type': 'offline',
        'refresh_token': '',
        code,
  			'client_id': process.env.TOS_CLIENT_ID,
  			'redirect_uri': `${process.env.TOS_REDIRECT_URI}/api/tos/hook`,
  		}
  	}

    return new Promise((resolve, reject) => {
      request(options, function(error, response, body) {
    		if (!error && response.statusCode == 200) {
          resolve(JSON.parse(body));
    		} else {
          reject(error);
        }
    	});
    });
  },
  getRefreshToken: () => {
    console.log('PROCESS.ENV.TOS_CLIENT_ID', process.env.TOS_CLIENT_ID);
    console.log('PROCESS.ENV.TOS_REDIRECT_URI', process.env.TOS_REDIRECT_URI);
    const headers = {
  		'Content-Type': 'application/x-www-form-urlencoded'
  	};
    const options = {
                //see the Authentication API's Post Access Token method for more information
  		url: 'https://api.tdameritrade.com/v1/oauth2/token',
  		method: 'POST',
  		headers: headers,
                  //POST Body params
  		form: {
  			'grant_type': 'refresh_token',
  			'access_type': 'offline',
        'refresh_token': 'p1ZubuAW1t5Wu6Tmkeclc85jDuSf1AizulOKhfuNYR0oncIVwgAmerB5pn9idJ3RYJ2aq35J9LK7MQvhruAaOd/Bzq6i8N6vUOAMkIkfqzRriH6v2TV3PHcrMnVOFa6sj48N0mXW/rJF8eT46iW9gy7CiZn4sQ9Lt8WZtQu7/TjecWDG2OzxFCYGumFZa8QemmL2dPr6XQx1ozmgnyLyN8gKXgE9LaDtNUePB34l2dF1O+PuHzTZs9i7kVfrF/8RMrNmL8pIHTpt8ap/bZPRoFpNttraL7AT2hD2RTW9aLuAyJ/km+e2Op6P06tzTljM42+dvlVeGVBcU9MHqCbNuhL830qOqYf/G9+f53VMT8BuoyFmJ/zXdFQaG/SMXM37FE3NdBpnVrzUijQJj8gyqRD0lPIi1t2ISETsB7NXqzCFgq0VTxyreQbtBbF100MQuG4LYrgoVi/JHHvlOZHoac2spaFOtYVL8aHnJvruGXkQmvrqqBLUzOuY0cfVpBgMtIylrtqCl7CETSVwh/7gIPDnirEgb4eHxDqlHFfyEtgvr7/obMcMzAVr82khwdj5La4kkmQ6vKZ1hQsC4FYSxKrmp8EsWuEXbI8lpUiwtryWK4Ad7d+dd3ezxt9Lt/0o3r8GRvLDoiK2AZdX8SZCFVO0p/SvQRZ1sfoLzc1gwGwgbEvcfjVMcq7JXK+RcKjDZTQQ0fIfaJ52spx+PxeWd8HJCrg8ZlI+VKR85aTrSNYVeXhYZ0MlWaoMP2Bwrq7DL9HV+yISX01sOvRAdmx9zf+NwxGsMyg+Gy6xexrSXxbGR390GiDS5r1LLnfSMwBhFIfKSOggKfNV0OAnswa0N0jTx84/NrWo7WH6yoZF446S9JfkCQZPJmZR8mI7D6dmw4wqV1gHOuM=212FD3x19z9sWBHDJACbC00B75E',
  			'client_id': process.env.TOS_CLIENT_ID,
  			'redirect_uri': `${process.env.TOS_REDIRECT_URI}/api/tos/hook`,
  		}
  	}

    return new Promise((resolve, reject) => {
      request(options, function(error, response, body) {
    		if (!error && response.statusCode == 200) {
          resolve(JSON.parse(body));
    		} else {
          reject(error);
        }
    	});
    });
  },
};

export default ThinkOrSwim;
/*
{
  "access_token": "cdeNYvxk01avUwUGrJD2Sya8BuYNNj6+qr3kZEXpjN+CUVoHKinmXMCXNopCtbYSirqEcyt4SsLXD3xwzMNMbOzMw03z7hesv+PMUS3hFA9ksK2yx/7fyL42UQmnwlvORXZ1JPPs/UngaHSkRG28IP7n6e6Iy/CH3RACWaR+eK5lU6WdVdPYV952jaWlf/UP8CiZa2i6Yaf6oqPRxaHpPBM/qALOh2CRnmAjm5wyljiANhiz6yLDpMD5soXngb/CrtkqJMo8dXwwSzz1gS7RhttusDIQXbm5BAfOzl8R9Dcown0PusSXRQR02+xv1tK0ov9NeW2h8DEp/RPnsny/+7JThpVCUrnzY9r4f/0I074ff04W76u/tQrJNwHT0m4uBqiQx/SyfulVCTnEoqwf2Opxv5uOwWNodMCEBNw7dT1jO6dAMgObFKZJbcWd8/rEFM/dT/MNxA2G+hgMqSqol2Zib+58fLTMimOv10ulF8nNlmOG0ilTxHE6ZPEhA0Cw4KdDXr3XW8H4Z29+s100MQuG4LYrgoVi/JHHvlfoB1lD7sSPnuvuOGU9WCR1QQfrTSR1Ve6Hd8ny2FmT+T2LNN9r2s6bD9VWJZq/xi2kDH1Z7GEMHv6qieVVuacKquQrnJiGK/7S2euj2sHiW5SlFevGjum6JdbLhKeMuJgs8gCYrLkZ0/Dfkl+6FaZcz2v0ysAZaQV60gmn7aWtO/9M6nh18PMN5aU8zl/bbMQuyfy9kijantOjjqVb/zLG+87FPnp1yVYvQpYC8ald7JQO0crvgcbCuYXb61U21PjbHJ9hQPD63vDnTTT7TvIaEbHLDl5eRn8VtWudey/EYFL0bkd0d9GW2tecMllUVnJKs2xZrv2tux4T9fLPuIxlgI5bwFGoo5c6k2xVtmDn7VHwlpQ8rw9fkrprU/Hlu9hA83JvYrFyFFbtSGG/bfyxQAyvX9rxLarfoJiWqYyhWwLb810DDuPwqR4zfDAgAcpYLa4e2vEPNjxQX9cibndcBDglpCbhrmH9Kl8Krd05FtG8fSjFJRdzg/Vut8yL+OVo7z8Y0Gtd9xurlA==212FD3x19z9sWBHDJACbC00B75E",
  "refresh_token": "Rn9vQVSFHU3FcIi2iIva6KhS6BewQazedF0F8emcXZiemzulIXxLsGXRKUT2pd2V4/+EaswIsV9XWOLXH+5PfzlRwVyWufN1jiyMVufivIbpoqq9RC+aEB5EFE96wWcmiB6sEitww4FHhFettHXoLpxniF71izSk48Ur7VXqNcOITJ3b1pV90ExrTFu14napH0pfsnE1i2G9h2122vMo8NX1AJ8w3vJFdsZmbzvw4Y3EiwFlg5HD/lbVXy+3BXXDN6M/4wX6G+i6V0QZ2NcDszH7oGa17bTBYUQFKhPjQka4qOhR0718k1nagcHAKZzPixAm8stYwb58EROabZnfsLQPLU/l7Y1SOqOqkTLVY8Hv7DTKcBEg0nDiEg3xO6LLHDu6yFKHUmzrYr9J/IB8xSDsRvx1j7zKe95UBPkuqhoI6Lim4Clh/OL9m/6100MQuG4LYrgoVi/JHHvlWHKtP871WzGWeT9HwXvXh/z6w4H2wWILsCKufvHY6kOd3YBcTPFb2uY1aYw+VnYOv9F3oZKcD6VhWICWar0UQ3N9C6UFj2XthfsUlw+Go7tqJToOfLeXiBR6bcRvE8ZfMmAGR76a4PJjZ7S9xv8KvQLCNCUfakmt5P8+6YNyBBmClKpa1OO5qKRhyfknfBmFfk5Duha3M07ez7l1ZCVy+L7ROoGGAzsWu4dpm4G53GjtM3GI9N9A0hkLJv7yqeKUAF5aOjSuGMk9JM40UxnUh5ypYewhrjFe6XGSExx/1ayrjk/u0u7JIxL5HeGzKK7IhX7+Is5//CV1rwlDf/BVRkVLAw+Dklly+K6n9XvfPadTmpCvLTqVig80jKCl0GyPO9Sze6FP8aMCguPFq1AKlCS+oyDGVoTJ2exWYxVcq8emyzSdOic8KobWFX8=212FD3x19z9sWBHDJACbC00B75E",
  "expires_in": 1800,
  "refresh_token_expires_in": 7776000,
  "token_type": "Bearer"
}
*/
