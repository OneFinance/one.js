# OneFinance.js

Unofficial SDK for the [One Finance](https://one.app) bank API

```js
let One = require("onefinance");

async function main() {
    let jwt = process.argv[2];

    await One.init(jwt);

    let pockets = await One.pockets();
    console.info(pockets);
}

main();
```

# REST

### List "Pockets" (Accounts) + Balances

```text
GET https://api.one.app/banking/v2/pockets?user_id=${userId}
Authorization: Bearer ${siteJwt}
X-Safe-Request-ID: ${nonceUuid}
```

### Internal Transfer

```http
POST https://api.one.app/banking/command
Authorization: Bearer ${siteJwt}
X-Safe-Request-ID: ${nonceUuid}
Content-Type: application/json
```

```js
{
    "command_name": "TRANSFER_FUNDS_OWNED_POCKET",
    "origin_pocket_id": `${origin.pocket_id}`,
    "destination_pocket_id": `${destination.pocket_id}`,
    "amount": 100.0
}
```

## Transfer Out to Bank

```http
POST https://api.one.app/banking/command
Authorization: Bearer ${siteJwt}
X-Safe-Request-ID: ${nonceUuid}
Content-Type: application/json
```

```js
{
    "command_name": "DEBIT_POCKET_TO_LINKED_ACCOUNT",
    "pocket_id": `${origin.pocket_id}`,
    "linked_account_id": `${destination.linked_account_id}`,
    "amount": 100.0
}
```
