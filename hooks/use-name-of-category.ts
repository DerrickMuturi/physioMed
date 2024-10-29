import { BeforeChangeHook } from "payload/dist/collections/config/types";

export const useCategoryNames: BeforeChangeHook = async ({ data, req }) => {
  if (data?.categories) {
    const category = await req.payload.find({
      collection: "category",
      where: {
        name: { in: data.categories },
      },
    });

    data.categories = category.docs.map((category) => category.name);
  }
};
