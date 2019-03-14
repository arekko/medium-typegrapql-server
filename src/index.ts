import { ApolloServer } from 'apollo-server-express'
import * as Express from 'express'
import { buildSchema} from 'type-graphql'


const main = async = () => {

const schema = await buildSchema({
  resolvers: [FirstResolver, SampleResolver],
});
}


main()