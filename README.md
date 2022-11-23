# https://news-explorer.api.podogas.com/
Backend for news-explorer project

* Authorization and registration system is implemented.
* Users and articles data is recorded onto database.
* Authorized user sending valid data can create/delete article, or get all his saved articles.
* Request headers are setting up by Helmet middleware.
* Query limit is set up to 100 per minute with help of limiter middleware.
* Central error handling implemented.
* All incoming data is validating by Celebrate and Joi middlewares.
* Errors and request are logging by Winston library.
* Server send requests to [news.api](https://newsapi.org/) and result is sent to client.
