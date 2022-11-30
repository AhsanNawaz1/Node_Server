const router = require("express").Router();
const userRoute = require("./user");
const CRUD = require("./CRUD");
const Blog = require("./Blog");
const Portfolio = require("./portfolio");

const defaultRoutes = [
  {
    path: "/CRUD",
    route: CRUD
  },
  {
    path: "/users",
    route: userRoute
  },
  {
    path: "/blog",
    route: Blog
  },
  {
    path: "/portfolio",
    route: Portfolio
  }
]

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route)
})

module.exports = router