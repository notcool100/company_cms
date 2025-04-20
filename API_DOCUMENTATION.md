# Company CMS API Documentation

This document provides comprehensive documentation for the Company CMS API endpoints.

## Base URL

All API endpoints are relative to the base URL of your application:

```
http://localhost:3000/api
```

## Authentication

Most API endpoints require authentication. Authentication is handled using JWT tokens via NextAuth.js.

### Authentication Headers

Include the authentication token in the `Authorization` header:

```
Authorization: Bearer {token}
```

The token is automatically managed by NextAuth.js when using the provided frontend components.

### Authentication Endpoints

#### Login

```
POST /api/auth/login
```

Request body:
```json
{
  "email": "user@example.com",
  "password": "your_password"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "email": "user@example.com",
      "role": "admin"
    },
    "expires": "2023-12-31T23:59:59.999Z"
  }
}
```

#### Register

```
POST /api/auth/register
```

Request body:
```json
{
  "email": "newuser@example.com",
  "password": "secure_password",
  "name": "New User"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "id": 2,
    "email": "newuser@example.com",
    "role": "user"
  }
}
```

## Response Format

All API responses follow a consistent format:

### Success Response

```json
{
  "success": true,
  "data": { ... }  // Response data
}
```

### Error Response

```json
{
  "success": false,
  "error": "Error message",
  "details": { ... }  // Optional detailed error information
}
```

## Status Codes

The API uses standard HTTP status codes:

- `200 OK`: Request succeeded
- `201 Created`: Resource created successfully
- `400 Bad Request`: Invalid request parameters
- `401 Unauthorized`: Authentication required
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Resource not found
- `429 Too Many Requests`: Rate limit exceeded
- `500 Internal Server Error`: Server error

## Pages API

### Get All Pages

```
GET /api/pages
```

Query parameters:
- `status` (optional): Filter by status ("Published" or "Draft")

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Home Page",
      "slug": "home",
      "content": "Welcome to our website",
      "status": "Published",
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-01T00:00:00.000Z"
    }
  ]
}
```

### Get Page by ID

```
GET /api/pages/{id}
```

Response:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Home Page",
    "slug": "home",
    "content": "Welcome to our website",
    "status": "Published",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
}
```

### Create Page

```
POST /api/pages
```

Request body:
```json
{
  "title": "New Page",
  "slug": "new-page",
  "content": "This is a new page",
  "status": "Draft"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "id": 2,
    "title": "New Page",
    "slug": "new-page",
    "content": "This is a new page",
    "status": "Draft",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
}
```

### Update Page

```
PUT /api/pages/{id}
```

Request body:
```json
{
  "title": "Updated Page",
  "content": "This page has been updated",
  "status": "Published"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "id": 2,
    "title": "Updated Page",
    "slug": "new-page",
    "content": "This page has been updated",
    "status": "Published",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
}
```

### Delete Page

```
DELETE /api/pages/{id}
```

Response:
```json
{
  "success": true,
  "message": "Page deleted successfully",
  "data": {
    "id": 2,
    "title": "Updated Page",
    "slug": "new-page",
    "content": "This page has been updated",
    "status": "Published",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
}
```

## Media API

### Get All Media

```
GET /api/media
```

Query parameters:
- `type` (optional): Filter by media type (e.g., "image", "application")

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "example.jpg",
      "type": "image/jpeg",
      "url": "/media/example.jpg",
      "size": "1.2 MB",
      "dimensions": "1920x1080",
      "createdAt": "2023-01-01T00:00:00.000Z"
    }
  ]
}
```

### Get Media by ID

```
GET /api/media/{id}
```

Response:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "example.jpg",
    "type": "image/jpeg",
    "url": "/media/example.jpg",
    "size": "1.2 MB",
    "dimensions": "1920x1080",
    "createdAt": "2023-01-01T00:00:00.000Z"
  }
}
```

### Upload Media

```
POST /api/media
```

Request body (multipart/form-data):
- `file`: The file to upload

Response:
```json
{
  "success": true,
  "data": {
    "id": 2,
    "name": "new-image.png",
    "type": "image/png",
    "url": "/media/new-image.png",
    "size": "2.5 MB",
    "dimensions": "2560x1440",
    "createdAt": "2023-01-01T00:00:00.000Z"
  }
}
```

### Delete Media

```
DELETE /api/media/{id}
```

Response:
```json
{
  "success": true,
  "message": "Media deleted successfully",
  "data": {
    "id": 2,
    "name": "new-image.png",
    "type": "image/png",
    "url": "/media/new-image.png",
    "size": "2.5 MB",
    "dimensions": "2560x1440",
    "createdAt": "2023-01-01T00:00:00.000Z"
  }
}
```

## Users API

### Get All Users

```
GET /api/users
```

Query parameters:
- `role` (optional): Filter by role ("admin", "editor", "user")

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "email": "admin@example.com",
      "role": "admin",
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-01T00:00:00.000Z"
    }
  ]
}
```

### Get User by ID

```
GET /api/users/{id}
```

Response:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "email": "admin@example.com",
    "role": "admin",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
}
```

### Create User

```
POST /api/users
```

Request body:
```json
{
  "email": "newuser@example.com",
  "password": "secure_password",
  "role": "editor"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "id": 3,
    "email": "newuser@example.com",
    "role": "editor",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
}
```

### Update User

```
PUT /api/users/{id}
```

Request body:
```json
{
  "email": "updated@example.com",
  "role": "admin"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "id": 3,
    "email": "updated@example.com",
    "role": "admin",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
}
```

### Delete User

```
DELETE /api/users/{id}
```

Response:
```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

## Settings API

### Get All Settings

```
GET /api/settings
```

Response:
```json
{
  "success": true,
  "data": {
    "site_name": "Company CMS",
    "site_description": "A content management system",
    "contact_email": "contact@example.com"
  }
}
```

### Get Settings by Category

```
GET /api/settings?category=site
```

Response:
```json
{
  "success": true,
  "data": {
    "site_name": "Company CMS",
    "site_description": "A content management system"
  }
}
```

### Update Setting

```
PUT /api/settings
```

Request body:
```json
{
  "key": "site_name",
  "value": "Updated CMS Name",
  "category": "site"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "key": "site_name",
    "value": "Updated CMS Name",
    "category": "site",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
}
```

## Error Handling

### Validation Errors

When validation fails, the API returns a 400 status code with details about the validation errors:

```json
{
  "success": false,
  "error": "Validation failed",
  "details": {
    "fieldErrors": {
      "email": ["Invalid email address"],
      "password": ["Password must be at least 8 characters"]
    }
  }
}
```

### Authentication Errors

When authentication fails, the API returns a 401 status code:

```json
{
  "success": false,
  "error": "Unauthorized"
}
```

### Authorization Errors

When a user doesn't have permission to access a resource, the API returns a 403 status code:

```json
{
  "success": false,
  "error": "Forbidden"
}
```

### Not Found Errors

When a requested resource is not found, the API returns a 404 status code:

```json
{
  "success": false,
  "error": "Resource not found"
}
```

## Rate Limiting

The API implements rate limiting to prevent abuse. By default, clients are limited to 60 requests per minute. When the rate limit is exceeded, the API will respond with a 429 Too Many Requests status code.

Rate limit headers are included in all API responses:
- `X-RateLimit-Limit`: The maximum number of requests allowed per window
- `X-RateLimit-Remaining`: The number of requests remaining in the current window
- `X-RateLimit-Reset`: The time at which the current rate limit window resets (Unix timestamp)

## Pagination

For endpoints that return collections, pagination is supported using the following query parameters:

- `page`: Page number (default: 1)
- `limit`: Number of items per page (default: 10, max: 100)

Example:
```
GET /api/pages?page=2&limit=20
```

Response includes pagination metadata:
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "total": 45,
    "page": 2,
    "limit": 20,
    "pages": 3
  }
}
```

## Filtering and Sorting

Many endpoints support filtering and sorting:

### Query Parameters

- `sort`: Field to sort by (prefix with `-` for descending order)
- `filter[field]`: Filter by field value

### Example

```
GET /api/services?sort=-createdAt&filter[icon]=code
```

This would return services with the icon "code", sorted by creation date in descending order.