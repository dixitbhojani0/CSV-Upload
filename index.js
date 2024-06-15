import server from "./app.js";
import { connectToDB } from "./config/db.js";

const port = process.env.PORT;

try {
    server.listen(port, async () => {
        await connectToDB();
        console.log(`server is running at ${port}`);
    })
} catch (err) {
    console.log(`server failed with error ${err}`);
}