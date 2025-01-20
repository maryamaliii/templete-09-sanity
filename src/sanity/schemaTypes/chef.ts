import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'chef',
  type: 'document',
  title: 'Chef',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Chef Name',
    }),
    defineField({
      name: 'position',
      type: 'string',
      title: 'Position',
      description: 'Role or title of the chef (e.g., Head Chef, Sous Chef)',
      options: {
        list: [
          { title: 'Head Chef', value: 'Head Chef' },
          { title: 'Sous Chef', value: 'Sous Chef' },
          { title: 'Grill Master', value: 'Grill Master' },
          { title: 'Culinary Instructor', value: 'Culinary Instructor' },
          { title: 'Executive Chef', value: 'Executive Chef' },
          { title: 'Chef de Cuisine', value: 'Chef de Cuisine' },
        ],
      },
    }),
    defineField({
      name: 'experience',
      type: 'number',
      title: 'Years of Experience',
      description: 'Number of years the chef has worked in the culinary field',
      options: {
        list: [12, 8, 10, 15, 20, 18],
      },
    }),
    defineField({
      name: 'specialty',
      type: 'string',
      title: 'Specialty',
      description: 'Specialization of the chef (e.g., Italian Cuisine, Pastry)',
      options: {
        list: [
          { title: 'Italian Cuisine', value: 'Italian Cuisine' },
          { title: 'Pastry and Desserts', value: 'Pastry and Desserts' },
          { title: 'Grilled Dishes', value: 'Grilled Dishes' },
          { title: 'Asian Fusion', value: 'Asian Fusion' },
          { title: 'Global Cuisine', value: 'Global Cuisine' },
          { title: 'Seafood Specialties', value: 'Seafood Specialties' },
        ],
      },
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Chef Image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Description',
      description: 'Short bio or introduction about the chef',
    }),
    defineField({
      name: 'available',
      type: 'boolean',
      title: 'Currently Active',
      description: 'Availability status of the chef',
    }),
  ],
});