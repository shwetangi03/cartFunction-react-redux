import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const Products = (props) => {
  const DUMMY_PRODUCTS = [
    {
      id: "p1",
      price: 8,
      title: "first Book",
      description: "My first book i have wrote",
    },
    {
      id: "p2",
      price: 8,
      title: "first Book",
      description: "My first book i have wrote",
    },
    {
      id: "p3",
      price: 8,
      title: "first Book",
      description: "My first book i have wrote",
    },
  ];
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map((product) => (
          <ProductItem
            key={product.key}
            id={product.key}
            title={product.title}
            price={product.price}
            description={product.description}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
