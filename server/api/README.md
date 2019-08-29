# Consuming TOS API w/Node.js
This is a README to help document lessons learned while interacting with TOS's API.

### Step 1.
Get A "code"

- The `code` is used to initialize permissions from your actual trading account
  that you can use via TOS dashboard, to your developer account.
  They are considered 2 different users.
  Therefore, you must first __register__ your application on the developer dashboard.
- To register follow [THESE instructions](https://developer.tdameritrade.com/content/getting-started).
- The hardest part here is to remember to encode the callback url endpoint.
```
encodeURIComponent('<your callback url here>');
```
This value is then pasted into the following url given to you from the doc link above.
```
https://auth.tdameritrade.com/auth?response_type=code&redirect_uri=<PASTE_ENCODED_RESULT_HERE>&client_id=<PASTE_APPLICATION_ID_HERE>@AMER.OAUTHAP
```
- Copy and paste that link into a browser.  The result is you should see your typical ThinkOrSwim login page. Enter your normal credentials you would use to login to the ThinkOrSwim platform.
- Moments after, you will then see a new url in the browser.  You can either take the code from the browser, or if you configured your own backend, using perhaps `ngrok` you could find the code in your server logs (assuming you logged the response). The code will look like a typical JWT.

### Step 2.
Get a request token
