export const fetchProducts = async (skip: number = 0) => {
  const limit = 10;
  const response = await fetch(
    `https://dummyjson.com/products?limit=${limit}&skip=${skip}`,
    {
      cache: "force-cache",
    }
    // {
    //   next: {
    //     revalidate: 60,
    //   },
    // }
    // {
    //   cache: "no-store",
    // }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
};
