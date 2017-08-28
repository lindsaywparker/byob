## Build Your Own Backend (BYOB) - A Turing Mod 4 FEE Project

### Synopsis - GEORGE
This API follows CRUD design using the Zillow Zri data for rental markets in the United States, from the state level down to the local level, separated by either neighborhood name or zipcode.

Design inspiration came from [@ToshTak](https://dribbble.com/ToshTak) on [Dribble](https://dribbble.com/shots/2040722-Engage-Prague-2015/attachments/362802). -->

### See It Live
[BYOB](https://lwp-byob.herokuapp.com) on Heroku

### Set Up

Clone the repo

Run `npm install` from the root directory

Run `npm start` and visit localhost:3000 in your browser

### Test Driven Development
BYOB uses Mocha and Chai for testing

Run with `npm test`

### Original Assignment

[BYOB](http://frontend.turing.io/projects/build-your-own-backend.html)

### Documentation
#### Region Types
  - state
  - metro
  - city
  - neighborhood
  - zipcode

#### Endpoints

##### `GET` /api/v1/:regionType
  - **Description:** Returns an array of all associated records for that table
  - **Parameters**
    - **regionType:** Region type to be retrieved (see list of region types above)
    - **Query Parameters:**
      - name
      - collected_on
      - median_rent
      - monthly_change
      - quarterly_change
      - yearly_change
      - size_rank
      - state (all except state table)
      - abbr (state table only)
      - metro (city, neighborhood, zipcode tables only)
      - county (city, neighborhood, zipcode tables only)
      - city (neighborhood, zipcode tables only)
  - **Return Format:** A JSON object
  - **Errors**
    - **404 Table Not Found:** The region type provided does not exist, confirm intended path.
    - **500 Server Error:** There was an error retrieving the requested records, try again.
  - **Example**
    - **Request**
    ```
    GET /api/v1/neighborhood?state=CA
    ```
    - **Return**
    ```javascript
    [
        {
          "id": 59,
          "name": "Sherman Oaks",
          "metro_id": 77,
          "state_id": 970,
          "city_id": 200,
          "collected_on": "2017-06-30T06:00:00.000Z",
          "median_rent": 3610,
          "monthly_change": "0.00",
          "quarterly_change": "0.01",
          "yearly_change": "0.03",
          "size_rank": 4,
          "created_at": "2017-08-27T00:27:45.140Z",
          "updated_at": "2017-08-27T00:27:45.140Z",
          "state": "CA",
          "metro": "Los Angeles-Long Beach-Anaheim",
          "county": "Los Angeles",
          "city": "Los Angeles"
        },
        {
          "id": 61,
          "name": "Southeast Los Angeles",
          "metro_id": 77,
          "state_id": 970,
          "city_id": 200,
          "collected_on": "2017-06-30T06:00:00.000Z",
          "median_rent": 2314,
          "monthly_change": "0.01",
          "quarterly_change": "0.05",
          "yearly_change": "0.14",
          "size_rank": 10,
          "created_at": "2017-08-27T00:27:45.140Z",
          "updated_at": "2017-08-27T00:27:45.140Z",
          "state": "CA",
          "metro": "Los Angeles-Long Beach-Anaheim",
          "county": "Los Angeles",
          "city": "Los Angeles"
        }
    ]
    ```
---

##### `POST` /api/v1/:regionType
  - **Description:** Add a single location to the specified table
  - **Parameters:** Region type to modify (only neighborhood and zipcode currently available)
  - **Request body must contain:**
    - name
    - collected_on
    - median_rent
    - monthly_change
    - quarterly_change
    - yearly_change
    - size_rank
    - state (all except state table)
    - abbr (state table only)
    - metro (city, neighborhood, zipcode tables only)
    - county (city, neighborhood, zipcode tables only)
    - city (neighborhood, zipcode tables only)
  - **Authorization**
    - JWT with admin rights required
  - **Return Format:** A JSON object
  - **Errors**
    - **404 Table Not Found:** The region type provided does not exist, confirm intended path.
    - **500 Server Error:** There was an error modifying the requested records, try again.
    - **23502 Database error:** Missing required parameters
    - **Unacceptable POST target:** Attempted to POST to a table outside of those allowed
    - **You must be authorized to hit the endpoint:** JSON web token was either not applied or invalid
  - **Example**
    - **Request**
    ```javascript
    POST '/api/v1/:regionType'
    body: 
    {
        name: 'Ping pong',
        metro_id: 43,
        state_id: 767,
        city_id: 13,
        collected_on: '2017-06-30T06:00:00.000Z',
        median_rent: 1736,
        monthly_change: '0.00',
        quarterly_change: '0.00',
        yearly_change: '0.01',
        size_rank: 83,
        created_at: '2017-08-22T22:38:13.668Z',
        updated_at: '2017-08-22T22:38:13.668Z',
        state: 'TX',
        metro: 'Dallas-Fort Worth',
        county: 'Dallas',
        city: 'Dallas'
    }
    Authorization: 'some-valid-token'
    ```
    - **Return**
    ```javascript
    {
    "result": [
        {
            "id": 10,
            "name": "Ping pong",
            "metro_id": 43,
            "state_id": 767,
            "city_id": 13,
            "collected_on": "2017-06-30T06:00:00.000Z",
            "median_rent": 1736,
            "monthly_change": "0.00",
            "quarterly_change": "0.00",
            "yearly_change": "0.01",
            "size_rank": 83,
            "created_at": "2017-08-22T22:38:13.668Z",
            "updated_at": "2017-08-22T22:38:13.668Z",
            "state": "TX",
            "metro": "Dallas-Fort Worth",
            "county": "Dallas",
            "city": "Dallas"
        }
      ]
    }
    ```
  
---

##### `PUT` /api/v1/:regionType
  - **Description:** Modify multiple records in the specified table
  - **Parameters**
    - **regionType:** Region type to modify
    - **name:** Required
    - collected_on
    - median_rent
    - monthly_change
    - quarterly_change
    - yearly_change
    - size_rank
    - state (all except state table)
    - abbr (state table only)
    - metro (city, neighborhood, zipcode tables only)
    - county (city, neighborhood, zipcode tables only)
    - city (neighborhood, zipcode tables only)
  - **Return Format:** A JSON object
  - **Errors**
    - **404 Table Not Found:** The region type provided does not exist, confirm intended path.
    - **500 Server Error:** There was an error modifying the requested records, try again.
  - **Example**
    - **Request**
    ```
    PUT /api/v1/neighborhood
    ```
    - **Return**
    ```javascript
    {
        "results": [
          [
            {
              "id": 58,
              "name": "Upper East Side",
              "metro_id": 76,
              "state_id": 972,
              "city_id": 199,
              "collected_on": "2017-06-30T06:00:00.000Z",
              "median_rent": 3000,
              "monthly_change": "0.00",
              "quarterly_change": "0.00",
              "yearly_change": "-0.05",
              "size_rank": 6,
              "created_at": "2017-08-27T00:27:45.140Z",
              "updated_at": "2017-08-27T00:27:45.140Z",
              "state": "NY",
              "metro": "New York",
              "county": "New York",
              "city": "New York"
            }
          ],
          null,
          null,
          null,
          null,
          null,
          null,
          [
            {
              "id": 57,
              "name": "Upper West Side",
              "metro_id": 76,
              "state_id": 972,
              "city_id": 199,
              "collected_on": "2017-06-30T06:00:00.000Z",
              "median_rent": 4000,
              "monthly_change": "0.00",
              "quarterly_change": "-0.01",
              "yearly_change": "-0.07",
              "size_rank": 3,
              "created_at": "2017-08-27T00:27:45.140Z",
              "updated_at": "2017-08-27T00:27:45.140Z",
              "state": "NY",
              "metro": "New York",
              "county": "New York",
              "city": "New York"
            }
          ]
        ]
    }
    ```
---

##### `PUT` /api/v1/:regionType/:id - GEORGE
  - **Description:** type the things here?
  - **Parameters**
    - type the things here?
    - type the things here?
  - **Return Format:** A JSON object
  - **Errors**
    - type the things here?
  - **Example**
    - **Request**
    ```javascript
    console.log('hi im code');
    ```
    - **Return**
    ```javascript
    {
      console.log('hi im code');
    }
    ```
  
---

##### `DELETE` /api/v1/:regionType
  - **Description:** Delete all records in the specified table
  - **Parameters**
    - **regionType:** Region type to delete
  - **Return Format:** A JSON object with the number of records deleted
  - **Errors**
    - **404 Table Not Found:** The region type provided does not exist, confirm intended path.
    - **500 Server Error:** There was an error deleting the requested records, try again.
  - **Example**
    - **Request**
    ```
    DELETE /api/v1/neighborhood
    ```
    - **Return**
    ```javascript
    {
        "result": 8
    }
    ```
  
---

##### `DELETE` /api/v1/:regionType/:id
  - **Description:** Delete a single record in the specified table
  - **Parameters**
    - **regionType:** Region type to delete record from
    - **id:** Record ID to delete
  - **Return Format:** The number of records deleted
  - **Errors**
    - **404 Table Not Found:** The region type provided does not exist, confirm intended path.
    - **500 Server Error:** There was an error deleting the requested records, try again.
  - **Example**
    - **Request**
    ```
    DELETE /api/v1/neighborhood/8
    ```
    - **Return**
    ```javascript
    1
    ```
  



### Contributors

George Goering : [GitHub Profile](https://github.com/ggoering)

Lindsay Parker : [GitHub Profile](https://github.com/lindsaywparker)
