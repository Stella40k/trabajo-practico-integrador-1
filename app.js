import express from 'express'
import dotenv  from 'dotenv'
import { sequelize } from "./src/configs/database.js";
//import { connect } from "./src/configs/database.js";

dotenv.config()

const app = express();
const PORT = process.env.PORT;
app.use(express.json())

app.listen(PORT, async () =>{
    console.log(`server corriendo en el puerto ${PORT}`)
/*     try {
        await sequelize.authenticate()
        console.log("conexion exitosa")
    } catch (error) {
        console.log("fallo en conexion", error)
    } */
});

/* connect() */