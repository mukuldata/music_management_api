Live Application : https://music-api-1ntu.onrender.com 


Postman Collection for testing and examples: https://winter-eclipse-979074.postman.co/workspace/8aeba8e6-d5e6-48ed-a7c9-a115459f5a50

Testing :
1. Login :
   Admin Role:
{
 "email": "admin@example.com",
 "password": "password"
}


API routes :

0. GET BASEURL/Logout: 200, 400
1. POST BASEURL/signup: 201, 400, 409
2. POST BASEURL/login: 200, 400, 404
3. GET BASEURL/users: 200, 400, 401
4. POST BASEURL/users/add-user: 201, 400, 401, 403, 409
5. DELETE BASEURL/users/:id: 200, 400, 401, 403, 404
6. PUT BASEURL/users/update-password: 204, 400, 401, 403, 404
7. GET BASEURL/artists: 200, 400, 401
8. GET BASEURL/artists/:id: 200, 401, 403, 404
9. POST BASEURL/artists/add-artist: 201, 400, 401
10. PUT BASEURL/artists/:id: 204, 400, 401, 403, 404
11. DELETE BASEURL/artists/:id: 200, 400, 401, 403, 404
12. GET BASEURL/albums: 200, 400, 401, 403, 404
13. GET BASEURL/albums/:id: 200, 401, 403, 404
14. POST BASEURL/albums/add-album: 201, 400, 401, 403, 400
15. PUT BASEURL/albums/:id: 204, 400, 401, 403, 404
16. DELETE BASEURL/albums/:id: 200, 400, 401, 403, 404
17. GET BASEURL/tracks: 200, 400, 401, 403, 404
18. GET BASEURL/tracks/:id: 200, 400, 401, 403, 404
19. POST BASEURL/tracks/add-track: 201, 400, 401, 403, 404
20. PUT BASEURL/tracks/:id: 204, 400, 401, 403, 404
21. DELETE BASEURL/tracks/:id: 200, 400, 401, 403, 404
22. GET BASEURL/favorites/:category: 200, 400, 401, 403
23. POST BASEURL/favorites/add-favorite: 201, 400, 401, 403, 404
24. DELETE BASEURL/favorites/remove-favorite/:id: 200, 400, 401, 403, 404
