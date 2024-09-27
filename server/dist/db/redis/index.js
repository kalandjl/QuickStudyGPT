import { createClient } from 'redis';
const doRedis = async (func) => {
    try {
        const client = createClient();
        await client.connect();
        //Run inputed redis code w/connected server
        return func(client);
    }
    catch (e) {
        console.error(e);
    }
};
export default doRedis;
//# sourceMappingURL=index.js.map