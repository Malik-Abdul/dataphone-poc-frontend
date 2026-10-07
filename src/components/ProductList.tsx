// import { use } from "react";
// import { fetchProducts } from "@/lib/utils/helpers";
import Image from "next/image";
import { productList } from "@/types/products";

const ProductList = ({ products }: { products: productList[] }) => {
  // const LIMIT = 10;
  // const skip = (page - 1) * LIMIT;
  // const productPromise = fetchProducts(skip);
  // const products = use(productPromise);
  // This is Server Component
  // async rendering
  // React Suspense style
  return (
    <>
      <h3>Product List</h3>

      <ul
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
          padding: 0,
          listStyle: "none",
        }}
      >
        {products.map((item: productList) => (
          <li
            key={item.id}
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: "12px",
              padding: "12px",
              backgroundColor: "#fff",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            }}
          >
            {/* Image */}
            <Image
              src={item.images[0]}
              alt={item.title}
              width={200}
              height={200}
              style={{
                width: "100%",
                height: "180px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />

            {/* Title */}
            <h4 style={{ margin: "10px 0 5px" }}>{item.title}</h4>

            {/* Price */}
            <p style={{ color: "green", fontWeight: 600 }}>${item.price}</p>

            {/* Description */}
            <p
              style={{
                fontSize: "12px",
                color: "#666",
                marginTop: "6px",
              }}
            >
              {item.description.slice(0, 80)}...
            </p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ProductList;
