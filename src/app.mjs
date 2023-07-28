import express from 'express';
import hbs from 'hbs';
import path from 'path';
import { fileURLToPath } from 'url';

const port = process.env.PORT || 8000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

const pathToPublic = path.join(__dirname,"../public");
const viewsTemplatePath = path.join(__dirname,"../templates/views");
const partialsTemplatePath = path.join(__dirname,"../templates/partials");
// console.log(pathToPublic,__filename,__dirname);

app.set("view engine","hbs");
app.set("views" , viewsTemplatePath);
hbs.registerPartials(partialsTemplatePath);

app.use(express.static(pathToPublic));          //this is required to sever the static files like css,imgaes etc.

app.get("", (req, res) => {
    res.render("index");
});
app.get("/about",(req,res) => {
    res.render("about");
});
app.get("/weather", (req,res) => {
    res.render("weather");
});
app.get("*" , (req,res) => {
    res.status(404);
    res.render("404error", {
        status:404,
        message:"Opps! Page You Are Looking For Doesnt Exists.",
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
