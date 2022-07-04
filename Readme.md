# 孙广明 - Coding Test
Hello davy and tony,

I've prepared two demos, they have the same function.

The difference of them is that filter different users / assignees by name or email.

Because there are the same names with different emails records in the CSV files, so I can’t distinguish them by name.

But the email address can be determined.

Demo1 filters user by name. ([Demo1](https://codingtest1.loading.xin))

Demo2 filters user by email. ([Demo2](https://codingtest2.loading.xin))

Please note that, two demo data storages are independent of each other.

Open the page as the default administrator.

When the administrator login, you can filter other people's tasks and drag and drop them.

However, you can not sort when filtering users.

You can switch the current user by clicking on the user name in the upper left corner.

Not the administrator login, can only see their own tasks, and cannot drag and drop sorting.

I modified part of the CSV file data, send it to you in the ZIP file.

The project supports mobile responsive.

If you encounter problems using it, please feel free to contact me.

Looking forward to receiving your valuable suggestions and feedback.

Best Regards,

Ming

## Backend API Documentation

open dir `demo1\server` or `demo2\server`

```
npm install

npm run start
```

BASE_URL：`http://127.0.0.1:3000` or `http://127.0.0.1:3001`

## getUserList

| Method | Url                                    |
| ------ | -------------------------------------- |
| GET    | http://127.0.0.1:3000//api/userList |

 **Response:**

```json
{
    "code":0,
    "data": [
        {
            "Email": "Admin@waterloo.com",
            "Name": "Admin",
            "Title": "Admin",
            "userId": "S000",
            "_id": "62c0f3c9105d8014ce74e7e7"
        }
        ...
    ],
    "msg":"success"
}
```

## setTaskSort

| Method | Url                                   |
| ------ | ------------------------------------- |
| POST   | http://127.0.0.1:3000/api/setTaskSort |

**Params:**

| Params   | Type   | Required | Remarks      |
| -------- | ------ | -------- | ------------ |
| _id      | number | True     | Task ID      |
| Priority | number | True     | New Priority |

**Example:**

```json
[
    {
        "_id": "62c0f3c9105d8014ce74e7e7",
        "Priority":1
    },
    {
        "_id": "62c0f3c9105d8014ce74e737",
        "Priority":2
    }
]
```

**Response:**

```json
{"code":0,"msg":"success"}
```

## getTaskList

| Method | Url                                   |
| ------ | ------------------------------------- |
| POST   | http://127.0.0.1:3000/api/taskList |

**Params:**

| Params   | Type   | Required | Remarks      |
| -------- | ------ | -------- | ------------ |
| Email      | String | false     | Name     |
| Name       | String | false     | Email    |
| type       | String | false     | filter type |

**Example:**

```json
{
    "Email": "",
    "Name": "",
    "type":"Email"
}
```

**Response:**

```json
[
    "code":0,
    "data": [
        {
            "By_who": "Perry",
            "Description": "Frontend creation<br/>expected to due on Thursday",
            "Email": "PerryP@waterloo.com",
            "Priority": 1,
            "Stage": 1,
            "Task": "S1_3",
            "_id": "62c0f3b8105d8014ce74e7d7",
        }
        ...
    ]
    ...,
    "msg":"success"
]
```
