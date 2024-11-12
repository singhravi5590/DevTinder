<!-- Dev Tinder API -->

Auth Router

- POST /signup
- POST /login
- POST /logout

Profile Router

- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

connectionRequestRouter

- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId

userRouter

- GET /user/connections
- GET /user/request
- GET /user/feed - Gets you the profiles of other users on platform
