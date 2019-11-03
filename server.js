const express = require("express");
const app = express();
const PORT = 9001;
const path = require("path");
app.use(express.static(path.join(__dirname, "/static")));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
const session = require("express-session");
app.use(session({
    secret: "keyboardkitteh",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  })
);
app.get("/", (req, res) => {
    if (!req.session.counter) {
        req.session.counter = 0;
    }
    console.log("Value of Counter in session: ", req.session.counter);
  res.render("index", {count:req.session.counter});
});
app.post("/addCounter", (req, res) => {
    console.log(req.session.counter)
    let {counter} = req.session;
    if (counter) {
        counter += 1
    }
    else {
        counter = 1;
    }
    req.session.counter = counter
  res.redirect("/");
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`))