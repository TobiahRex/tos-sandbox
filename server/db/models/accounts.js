/* eslint-disable no-use-before-define */
import dotenv from 'dotenv';
import request from 'request';
import mongoose from 'mongoose';
import { Promise as bbPromise } from 'bluebird';
import tosAccountSchema from '../schemas/tosAccount';

dotenv.config({ silent: true });

tosAccountSchema.statics.getToken = (code) => new Promise((resolve, reject) => {
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  const options = {
    url: 'https://api.tdameritrade.com/v1/oauth2/token',
    method: 'GET',
    headers,
    form: {
      grant_type: 'authorization_code',
      access_type: 'offline',
      refresh_token: '',
      code,
      client_id: process.env.TOS_CLIENT_ID,
      redirect_uri: process.env.TOS_REDIRECT_URI,
    }
  };

  request(options, (error, response, body) => {
    console.log('body: ', JSON.parse(body, null, 2));
    if (!error && response.statusCode === 200) {
      resolve(JSON.parse(body));
    } else {
      reject(error || JSON.parse(body, null, 2));
    }
  });
});


tosAccountSchema.statics.createOrRefreshToken = (accountName) => new Promise((resolve, reject) => {
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  };
  const options = {
    url: 'https://api.tdameritrade.com/v1/oauth2/token',
    method: 'POST',
    headers,
    form: {
      grant_type: 'refresh_token',
      access_type: 'offline',
      refresh_token: 'p1ZubuAW1t5Wu6Tmkeclc85jDuSf1AizulOKhfuNYR0oncIVwgAmerB5pn9idJ3RYJ2aq35J9LK7MQvhruAaOd/Bzq6i8N6vUOAMkIkfqzRriH6v2TV3PHcrMnVOFa6sj48N0mXW/rJF8eT46iW9gy7CiZn4sQ9Lt8WZtQu7/TjecWDG2OzxFCYGumFZa8QemmL2dPr6XQx1ozmgnyLyN8gKXgE9LaDtNUePB34l2dF1O+PuHzTZs9i7kVfrF/8RMrNmL8pIHTpt8ap/bZPRoFpNttraL7AT2hD2RTW9aLuAyJ/km+e2Op6P06tzTljM42+dvlVeGVBcU9MHqCbNuhL830qOqYf/G9+f53VMT8BuoyFmJ/zXdFQaG/SMXM37FE3NdBpnVrzUijQJj8gyqRD0lPIi1t2ISETsB7NXqzCFgq0VTxyreQbtBbF100MQuG4LYrgoVi/JHHvlOZHoac2spaFOtYVL8aHnJvruGXkQmvrqqBLUzOuY0cfVpBgMtIylrtqCl7CETSVwh/7gIPDnirEgb4eHxDqlHFfyEtgvr7/obMcMzAVr82khwdj5La4kkmQ6vKZ1hQsC4FYSxKrmp8EsWuEXbI8lpUiwtryWK4Ad7d+dd3ezxt9Lt/0o3r8GRvLDoiK2AZdX8SZCFVO0p/SvQRZ1sfoLzc1gwGwgbEvcfjVMcq7JXK+RcKjDZTQQ0fIfaJ52spx+PxeWd8HJCrg8ZlI+VKR85aTrSNYVeXhYZ0MlWaoMP2Bwrq7DL9HV+yISX01sOvRAdmx9zf+NwxGsMyg+Gy6xexrSXxbGR390GiDS5r1LLnfSMwBhFIfKSOggKfNV0OAnswa0N0jTx84/NrWo7WH6yoZF446S9JfkCQZPJmZR8mI7D6dmw4wqV1gHOuM=212FD3x19z9sWBHDJACbC00B75E',
      client_id: process.env.TOS_CLIENT_ID,
      redirect_uri: `${process.env.TOS_REDIRECT_URI}/api/tos/accounts/hook`,
    }
  };

  request(options, (error, response, body) => {
    console.log(JSON.parse(body));
    if (!error && response.statusCode === 200) {
      const {
        access_token: accessToken,
        refresh_token: refreshToken,
        token_type: tokenType,
        expires_in: expiresIn,
        refresh_token_expires_in: refreshTokenExpiresIn,
      } = JSON.parse(body);

      TosAccounts.findOne({ accountName })
        .exec()
        .then((dbAccount) => {
          if (dbAccount) {
            dbAccount = {
              accountName,
              accessToken,
              refreshToken,
              tokenType,
              expiresIn,
              refreshTokenExpiresIn,
            };
            return dbAccount.save({ new: true });
          }
          return bbPromise.fromCallback(cb => TosAccounts.create({
            accessToken,
            refreshToken,
            tokenType,
            expiresIn,
            refreshTokenExpiresIn,
          }, cb));
        })
        .then((savedAccount) => resolve(savedAccount))
        .catch(reject);
    } else {
      reject(error || JSON.parse(body));
    }
  });
});

tosAccountSchema.statics.getRefreshToken = ({ accountName }) => new Promise((resolve, reject) => {
  TosAccounts.findOne({ accountName })
    .exec()
    .then((dbAccount) => {
      if (!dbAccount) reject(new Error('No Account found | accountName: ', accountName));
      const headers = {
        'Access-Control-Allow-Headers': 'Authorization',
        'Content-Type': 'application/x-www-form-urlencoded',
        Connection: 'keep-alive',
        'Access-Control-Allow-Origin': '*',
      };
      const options = {
        url: 'https://api.tdameritrade.com/v1/oauth2/token',
        method: 'POST',
        headers,
        form: {
          grant_type: 'refresh_token',
          refresh_token: 'PGEbR6j+29lSQOuhKNyv0ZeCwZY6heWn4N6232WX5aAtlpSPO5AbZA0ZkxWFjOxWRlfRKiyojyiMmRT/B6VNiWqgrrgCWD+0uDfuou3IPJ671PCa03/IuAvTVIF6vuznLF0LEsW5e1+RhXFGI53Mt1u7NWoMj2VrfikXoGg6+CXlcIkrLR0FDWQtQeG9TtdGf2nvoxZ/7Qguon0Z8KERs5KvDlp4OHo/3y9r5F1HgwaFAwYByQ5dU3x0I43/HA7IPrN03QbQVISFEuaXx57UZvE8TycTVuArM8Wg3TDA71NUTuQS4pnnKGliTG81BUTVKWSHYXzxQv6ebQHM6jjc5UptzGW/i1bnM+jk7BkavSZILnAWcRJSMd9kz/eR60awghP7xHjSQMMj75pnl3e60uZgvJuL5hhLJ10WIvG9U2dcbwzzwSwbJCZQMu2100MQuG4LYrgoVi/JHHvloWgRqy57K7Czq3oKRWUfwVHnskYb1favTrMOGVJOuZ+MduWNTg6nE5oTa+pfJ4qONjOQvaVimDa169FlQpdlxQ4ZrSS3BhIkNGPHzNgjLE3JpDOGCgfGWGCYnA1VKwoq1J2ToBCSBf01mpkmcHP56dmH0t8Flp7GAB+V+XtnJf6spSEe/1lkbwI3dYIZNLfn1mG3FTswyfm8JF8F5kdVauN+vgCsMeP7l2VB+oVG1KlsmjX2g3YD85YL+uZmwqk9ddN0JfMp8bXTNfQ6qEEiuW5k/SGHUqN8Xuf9r2nyNHxIffl6DjKc2OYcJVdJmygKMUZrk7S/eN5XfLTjhs8ZP2O0yZD8P9bQM/B0mK7Fc3IBOlE3qkxggEtqok10NesC3CeB0fHmNPE46EoQzF+NIjO4RSNCDfCiIM421+u2KpcKx1gV3Lcn+kaNvos=212FD3x19z9sWBHDJACbC00B75E',
          access_type: 'offline',
          code: '',
          client_id: process.env.TOS_CLIENT_ID,
          redirect_uri: `${process.env.TOS_REDIRECT_URI}/api/tos/accounts/hook`,
        }
      };

      request(options, (error, response, body) => {
        console.log('error: ', error);
        console.log('response: ', response);
        console.log('body: ', body);
        if (!error && response.statusCode === 200) {
          const {
            access_token: accessToken,
            refresh_token: newRefreshToken,
            token_type: tokenType,
            expires_in: expiresIn,
            refresh_token_expires_in: refreshTokenExpiresIn,
          } = JSON.parse(body);

          dbAccount.accountName = accountName;
          dbAccount.accessToken = accessToken;
          dbAccount.tokenType = tokenType;
          dbAccount.expiresIn = expiresIn;
          dbAccount.refreshTokenExpiresIn = refreshTokenExpiresIn;
          dbAccount.refreshToken = newRefreshToken;
          dbAccount.save({ new: true })
            .then((savedAccount) => {
              console.log('SAVED ACCOUNT', savedAccount);
              resolve(savedAccount);
            })
            .catch(reject);
        }
        reject(new Error((JSON.stringify({ status: response.statusCode, body }))));
      });
    })
    .catch(reject);
});

const TosAccounts = mongoose.model('TosAccounts', tosAccountSchema); // eslint-disable-line;

export default TosAccounts;

/*
{
  "access_token": "WJs/z6s5UZE6kbp8rkY+Lvp2Xetp+2sG8NL3ehQzFmyWhUG47Q/yqK4rHVMAm2lHbgh138E06hMOfewjasOrHprl7AuLkdI6NnR3pYLG4ksrsQuXuYZQEDLKbcvWV2UxaDkGnHPS7fxgAzr3QEI/rYwi7rAtwoox1DdEsHM5rlN2qzNtFsI63ASLmNOPaYb1HvW7+Bg5JDFW/aGqgFAGradF/DCB1BcZZVyDsJBdHrDXXFNc8eBeUzyBq/iMkTN+EBphzmQx7xrhAIsqjbkDHqI7u7j66TeWXLiviTNdyBczgdlq+1gOoadbFruKTIwhl03BjqGSUuucSPo2SwyyDrQAMNAJijtn9d613eOVIhTAmgCnWfVay3cmOyLF11Yy6+SB3Azr61n5cG7mednOTUQ2LxoQu1puqbMlwChNFo/EQqEGAV3ey2OaB1byNm6NaBEt8iSbctn5hIPBNaYdkqQdbzhMCNb8wS0op7HIIF9xfVcFoiTImnDTKW8EvCuNPJ8kYweMrkgHTZuLHZ59Q055Lu0100MQuG4LYrgoVi/JHHvl9EeUOeUQgy/naQXRZj6pug6Mp9FMccTgo+N9WRLxQfx7MzE0wQCjFXmgGCLyeWdmfdDheT2+p6qt37EY8vFQDEpMNoHwOMDaffN8kkb4zsdl3yh8B1ptVNjZGX5+N+4PirDlDZM9fc1FWX61XIEKg69+fIisctqgRZcDG3Ya6CLi6gnqRt0nKXuxgdp5lnlaAYIg/9E3e/hA4s1egqa9WdEjb3y64lzI3oKUTEWaQrTE31dJzZK1BGrP5oh/JFryQA/PkuI+QseWs2W10cII4QRO61C/hgeMvoqYknIKVugCFMt24oYgjxi0mESOxbX9704JJGt12ZlDVoiaj7M8SZfvSTpDK6k+3fJzw79m5jOucuFtPXZh6PX5qrbk+Rw6vs1s/2ZJU7Qm9Pw9CYFFrSULPRvEJwy+ZUn34aaFsUlMMpGE7aT57YbzL/E/h6u/BmtaZZkhdMuvfjmOc6grMTts8bGXsJBVLrk/wPfshSiI2CjFKIj4QW/kH/6Z0q0LAhzB5HIMYCWoUFHUHW9/szFrf2g=212FD3x19z9sWBHDJACbC00B75E",

  "refresh_token": "KjZX6p1C618v+MCIBVvwHYNIT4QJHM5X5F7n3lgb293ptFvkYoW4w4OP0ct8F7rxb1QBef+7YJkzqKywZI0IbpmQBNsdBFe9FtWVuv38jJ4RtIkS2jjH8jdhsQU/rwwUam4FI/STAgKgY0ugXMNvj4NgN5EBcfvSnWkwJ4lhUak+CjDjRp6WO1UlwSAVh5zH41GzpYp/2POGJLCgBZ5cMXrI9B6lbKI3h3awfgbb2AjTLR8l8jyL+k7HT0+AKvjZiKyNNUNCF9TZL+28b1bFByLglRXhmK/H2Ii817GqYUETGmWQdc8EtEnkxdGW09P3Sp4A3B3MLcJmmyKDLnb27cEqrrrrimy11Vdvb3WIVkN5rk4hqASwpjSNvGY37ivnGmXVntwbYQQAFlsCJ41N1ilHIgm+R0mkiivpPG1eJtvz6NDC39JH37orAqG100MQuG4LYrgoVi/JHHvlcHLBahlmBkK//EpQWDYu/aTMi9GjpIZA+Q8TrMPJbNyQHa0L0I1IxGyb101DX3l8spI+QMvt6+Au3U+DG7jrovRzYZeNJ0HY9eCgjvftRLOoLb+XMbO1/+ZW5jNpqzcpwPRseGbSHd2QBgSB73C2Ol9nFZIlvpDKR2uh/aQ/Y9qGLoCbVlYPXVMnJIkPde1LBCsrI+rI/4HKoNXkTmMzHyHzs+xR9+Bj+SmqoO+gnjszLxAoMY1I9BcswvNy46zAg9JedqFPUJflsooTwacCif8BVz5J2u/L9JKLemt7OwriHWm6s5UhqkKBqAELiyrk/wtDA3dgOActSbxTUscdqh2JirUvF7TWEagexO2ex4jiApWGiVcmHXN0wecqe6NgrvUCKpGPII5wDKxaZsIybFXixF393fXY7lWHrPe7/nn1YBJaRQMMvGWnhxc=212FD3x19z9sWBHDJACbC00B75E",

  "expires_in": 1800,
  "refresh_token_expires_in": 7776000,
  "token_type": "Bearer"
}
*/
