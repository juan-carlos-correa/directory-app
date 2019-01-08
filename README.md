# directory-app
Basic users directory app

# Todos backend

- [] add tests (jasmine is recommended)
- [x] add GET endpoint for list all users that belongs to single company: GET /companies/:id/users
- [x] add PUT endpoint for update user data: PUT /users/:id (admin role can update everythin user, no admin role only himself)
- [] add PATCH endopint for update user password: PATCH /users/:id (user can update only himself password)
- [] add Tags model: company (objectId), name, color and description with timestamps
- [] add POST endpoint for create new tag: POST /companies/:id/tags (only admin, name must be unique per company)
- [] add GET endpoint for list all tags that belong to single companie: /companies/:id/tags (only admin)
- [] add PUT endpoing for update single tag of company: PUT /companies/:id/tags/:tagId (only admin)
- [] add DELETE endpoint for remove single tag of company: DELETE /companies/:id/tags/:tagId (only admin)
- [] add config for use Mailgun
- [] make Error class for abstract the throw errors actions

# Todos frontend

- [] add tests
- [] Make redux logic for auth
- [] Add react router
- [] Make login UI
- [] Make signin UI
- [] Connect login UI with redux
- [] Connect signin UI with redux
- [] Make private routes with react router (make a PrivateRoute component is recommended)
- [] ...
