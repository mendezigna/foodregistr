## Endpoints

### Auth

* `POST /auth/signup`
* `POST /auth/login`


### Food

* `GET /food/id` ?
* `POST /food` ?
* `PUT /food` ?

### Day

* `GET /day/date`
* `POST /day`
* `PUT /day/id`

## Entities

| Day         |
| ----------- |
| id          | 
| timestamp   | -> Correspondiente con un dia a las 00:00hs
| Food[ ]     | 


| Food        |
| ----------- |
| id          | 
| label       | -> Breakfast, Lunch, Snack, Dinner
| imageUrl    | -> URI de donde sea que este guardado el recurso
| description |
| timestamp   | -> Correspondiente con un dia a las 00:00hs


| User        | 
| ----------- |
| id          | 
| name        | 
| email       |
| password    |

