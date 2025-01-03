import { defineField, defineType } from "sanity";

export default defineType({
  name: "shop",
  title: "Shop",
  type: "document",
  fields: [
    defineField({
      name: "itemName",
      title: "Item Name",
      type: "string",
    }),
    defineField({
      name: "price",
      title: "Current Price",
      type: "number",
    }),
    defineField({
      name: "oldPrice",
      title: "Old Price",
      type: "number",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "ratingValue",
      title: "Rating Value (e.g., 5.0)",
      type: "number",
      validation: (Rule) => Rule.min(0).max(5),
    }),
    defineField({
      name: "ratingStars",
      title: "Rating Stars",
      type: "number",
      validation: (Rule) => Rule.min(0).max(5),
    }),
    defineField({
      name: "reviewsCount",
      title: "Reviews Count",
      type: "number",
    }),
    defineField({
      name: "image",
      title: "Product Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "itemName",
        maxLength: 200,
      },
    }),
  ],
});
