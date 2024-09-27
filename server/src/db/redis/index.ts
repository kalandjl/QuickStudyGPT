import { createClient, RedisClientType } from 'redis';

const doRedis = async (func: (client: RedisClientType) => any) => {

    try {

        const client: RedisClientType = createClient();
        await client.connect();

        //Run inputed redis code w/connected server
        return func(client)

    } catch (e) {

        console.error(e)
    }

}

export default doRedis