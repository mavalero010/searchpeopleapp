import app from "./app.js";
import { sequelize } from "./database/database.js";
//import './modules/user/models/image.js'  


async function main() { 
  try {
    await sequelize.sync({force:false});
    const PORT = 3000;
    app.listen(PORT);
    console.log(`Server Listening on port: ${PORT}`);
  } catch (error) {
    console.error(error);
  }
}; 

main();
