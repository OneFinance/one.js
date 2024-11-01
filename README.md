# one.js

Unofficial SDK for the OneFinance.com bank API

```js
let pkg = require(`${require.main.path}/package.json`); 
let request = require('@root/request').setDefaults({
  userAgent: `${pkg.name}/${pkg.version}`,
});

let jwt = 'xxxx.yyyy.zzzz';

request({
  url: 'https://api.onefinance.com/banking/command',
  headers: {
    'Authorization': `Bearer ${jwt}`,
    'Origin': 'https://web.onefinance.com',
    'Referer': 'https://web.onefinance.com/',
    'x-safe-request-id': '???',
  },
  json: {
    "command_name": "TRANSFER_FUNDS_OWNED_POCKET",
    "origin_pocket_id": "pocket.xxxx",
    "destination_pocket_id": "pocket.yyyy",
    "amount": 12.88,
    "notes": "Ice cream run",
    "accessToken": jwt
  }
});
```

# List Pockets

```sh
#!/bin/sh
set -e
set -u

my_user_id="$(cat ~/.config/one/user_id)"
my_jwt="$(cat ~/.config/one/bearer.jwt)"
my_uuid="$(uuidgen)"

curl --fail-with-body -sS "https://api.one.app/banking/v2/pockets?user_id=${my_user_id}" \
    -H "Authorization: Bearer ${my_jwt}" \
    -H "X-Safe-Request-ID: ${my_uuid}"
```
