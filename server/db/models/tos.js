/* eslint-disable */
import axios from 'axios';
import request from 'request';

export default ({
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
  		method: 'POST',
  		headers: headers,
  		form: {
  			'grant_type': 'authorization_code',
  			'access_type': 'offline',
        'refresh_token': '',
        code,
  			'client_id': process.env.TOS_CLIENT_ID,
  			'redirect_uri': process.env.TOS_REDIRECT_URI,
  		},
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
  getRefreshToken: (refreshToken) => {
    const headers = {
  		'Content-Type': 'application/x-www-form-urlencoded',
      Accept: '*/*',
      'Accept-Encoding': 'gzip',
      'Accept-Language': 'n-US',
      Host: 'pi.tdameritrade.com',
      'NS-Proxy-Client-IP': '6.52',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Site': 'site',
  	};
    const options = {
                //see the Authentication API's Post Access Token method for more information
  		url: 'https://api.tdameritrade.com/v1/oauth2/token',
  		method: 'POST',
  		headers: headers,
  		form: {
  			'grant_type': 'refresh_token',
  			'access_type': 'offline',
        'refresh_token': refreshToken,
  			'client_id': process.env.TOS_CLIENT_ID,
  			'redirect_uri': process.env.TOS_REDIRECT_URI,
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
});


/*
{
{
"access_token": "//UiN7sMZa0qcFm0ARlMgzU6kNklVNJ9jpJqF8bucZzPQ5BOMmpY158stiqLb5wpfWTsFTdZ6g971U5x4ibZOhfF7S1rheDTZwcCNayQq3JMYUs34HRGKzLWSQiIkFxwQOMWwYBzUT8+oEEei3Uzxh6GkXbgo2F97BVTL25K+epim+ahJR9izbxeSgTVxA1P3W6FGmgH+Ub/gip9m1nTA9Osj62jgqB74HDQs+geNkAqhW0tI/Pofsoy372i7UduCLxXkEzU001xxfQ+YZW5P6U4yHW+89ejPAM5ACGV/Vr64dhJ4Qnyo7yM2SybuzNPvkAQ9K376olNT/gJ6SEldOGakPsi//tUt401ZZ4JpHJv8oqtTGvHL5b+Ypxj0JNeTX9gizSFq255//zWv+co9L/p3ppDLgrW6gjdghT7Dt0ml5kdVUsXVC5JmaYz35V7lfuIUFo7zRuTVf1HQnjt1GSiiA3/+aoPgLbLLFnCEjWmES+oJ/VPfVBvLuoGskSdpV7cRmAeGy0gpveewXejZAoD+YI100MQuG4LYrgoVi/JHHvlrWG6xeOg/oCwUko2QGa2+b/5qYqEDkWSn2cYJN6OBsfUevjARmQP5sX2oXl/1LLmAeeM+V3UNAARUqC8zXlxBE/QNBYH8jxEYo+Pv1F1GtWujc+MFWZXtynmcFSNubORDKorHvagheHLS+S5+IX/w6gucH1obMTwlm8B54XjU6r8SiaMtMILIzUm499C11ER4hffU2arnkZ0WgABM5pM1h3iywL6f16JxHCj3T+iFpcX15OvQfiAZvLclLJjBsL7qnUUgJDxwxIsRaRzgIDEMNT8JTiqU4xTqhIH8UUK5WGAKy+U/+NhwMmayzcd2rJPEf4UbvjCnIDJBYbXY/S3PEucaw/Erwei90emwJaIU4jwETgiYn/bhH7ARlkudYSz6AjCL0qIoXMJQa8qzY23OkJKC6tLMsrXh5z9wWZX2PLntmELH5fLS71owAk37YtPldfQg2+9q4JNPV81f4oTwqPdaYa0mpzycHEk6fd1HH5N0/HBfhcJVoUbUFfC/QIeObO/ixBJ2WzAsDmyWJ4eiNpNM9Q=212FD3x19z9sWBHDJACbC00B75E",

"refresh_token": "e9m1dCWEreOGfcnnjex9JAIpZmNr1TMGvZq8U5SSWuu4aYI8rEyAtXz+eL+VqlKS3fHPB0+Wc+vYvuhCQouSlH84TsvWIhGD9sd3rzjNYPsitl/fGN0i3BulGeFjss6v4Rle8BnXw+YQSAKB3G9wLkaKYw+2XQRD+etbP3LIFHjw3dKkaOLLV8uALAeAdp/OgBk3XzGaRt8X9njTyMansnSd1Uxeb9skOwq7cFMOgfbLFLCxF/pKfnneHl4zGDZdzQuBegGU5Jw4gNS2aSrSL5dmqVOnUqMFMFvxO4A8jsO6NNyleAPNpPgEetL+WrOgYMBTS81H1wekIp6uHKzFHULJ65R5arDlhFkfpb56RdliegSBQK/RF2RsFNrWs+lmNvS7VEBVpmQt0qgVGgBZ68nIpr5PRG8gMyrpBg8X+l++YktfcD7CPtx1km4100MQuG4LYrgoVi/JHHvlUMLQFIlXX6pgPCfLoJpG+/+fXeGNmSlkPI68PvF7X1Afahe9N7eMKLLWDu+wZmA8bx7d4fY/jTmaAMgMQ7yRZTyDouX+kaYjXh+o6i9noUbZraJj/hJ51+J8CzEiOIQ8bpKsGYVa3nZydZBV7VGeCddLuJdeD12joj7lKZ2T5DdjRG1Nij1rNxo252IUa2D5JVjRDRcdv/g68IcXsfwIpsuKA5oWtTVOZg1jLqPt2jrI/IJPt80HubkN4grnFWDnqU7iun0kGUmopiCdUEOoyC2dGf15re9bgWj5x6TrNXxFWXgUtf0KLOTec3CF8EqqjgEKvfIP4Pm9MySQ4lbxd0nyI9EZFoR2BdKEjy6dxlVVm5JqNDar77W/qi9SKxitgE0Br3RwXOZugBo3Ub8rR1lCCHwlOCVIhqdOUGwKBLCEkA1LkioivP9EToM=212FD3x19z9sWBHDJACbC00B75E",

"expires_in": 1800,

"refresh_token_expires_in": 7776000,

"token_type": "Bearer"
}
}
*/
