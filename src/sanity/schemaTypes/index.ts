import { type SchemaTypeDefinition } from 'sanity'
import shop from './shop'
import blog from './blog'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [shop,blog],
  
}
