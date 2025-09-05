import express from 'express'
import dotenv  from 'dotenv'
import { sequelize } from "./src/configs/database.js";
import { connect } from "./src/configs/database.js";
//modelos.-
import { tagModel }  from './src/models/tag.model.js';
import { userProfile } from './src/models/profile.model.js';
import { userModel } from './src/models/user.model.js';
import { articleModel } from './src/models/article.model.js';
import { articleTag } from './src/models/article_tag.model.js';
//rutas.-
import { articleTagRouter } from './src/routes/article_tag.route.js';
import { tagRouter } from './src/routes/tag.route.js';
import { userRouter } from './src/routes/user.route.js'
import { profileRouter } from './src/routes/profile.route.js';
import { articleRouter } from './src/routes/article.route.js'

dotenv.config()

const app = express();
const PORT = process.env.PORT;
app.use(express.json())

app.use("/users", userRouter);
app.use("/profiles", profileRouter);
app.use("/articles", articleRouter);
app.use("/tags", tagRouter);
app.use("/article-tag", articleTagRouter);

app.listen(PORT, async () =>{
    console.log(`server corriendo en el puerto ${PORT}`)
    try {
        await sequelize.authenticate()
        console.log("conexion exitosa")
    } catch (error) {
        console.log("fallo en conexion", error)
    }
});

connect()