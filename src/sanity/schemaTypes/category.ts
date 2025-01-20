import { defineField, defineType } from "sanity";

export default defineType({
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Category Name",
      type: "string",
      validation: (Rule) => Rule.required(), // Category name zaroori hai
    }),
    defineField({
        name: "slug",
        title: "Slug",
        type: "slug",
        options: {
          source: "name", // Category name se slug generate karega
          maxLength: 200, // Slug ki maximum length
        },
        validation: (Rule) => Rule.required(), // Slug zaroori hai
      }),
  ],
});