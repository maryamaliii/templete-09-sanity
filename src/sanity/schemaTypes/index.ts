import { type SchemaTypeDefinition } from 'sanity'
import shop from './shop'
import blog from './blog'
import chef from './chef'
import category from './category'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [shop,blog,chef,category],
  
}
