# batch-svc

simple service that proxy to other services with batch requests


## Docs 

* ```/batchsvc/isAlive``` - endpoint for checking the availability of the service.

The response is constant with dynamic current date:
```
{
    "message": "batch server is alive:: Sat Dec 21 2019 18:03:22 GMT+0200 (Israel Standard Time)"
}
```

* ```/batchsvc/batch/``` - proxy to other services with batch requests

request example:
```
{
    "payload": [
        {
            "body": {
                "age": 30
            },
            "userId": 14
        },
                {
            "body": {
                "age": 30
            },
            "userId": 29
        },
                {
            "body": {
                "age": 30
            },
            "userId": 103
        }
    ],
    "service": {
        "url": "https://guesty-user-service.herokuapp.com/user/{userId}/",
        "verb": "PUT"
    }
}

```
response:<br>
returns the response status for each request in the requests array (matching order) and number of invokes
<br>response example:
```
{
 {
    "statuses": [
        {
            "status": 200,
            "numberOfInvokes": 1
        },
        {
            "status": 200,
            "numberOfInvokes": 1
        },
        {
            "status": 200,
            "numberOfInvokes": 1
        }
    ]
}
}
```

