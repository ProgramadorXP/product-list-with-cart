import { useEffect, useState } from "react";
import Card from "./components/Card";
import Cart from "./components/Cart";
import { ProductCart, ProductItem } from "./types";

function App() {
  //State to store the cart
  const [cart, setCart] = useState<ProductCart>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Update localStorage only when the cart changes
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      localStorage.removeItem("cart"); //Clean up empty cart key
    }
  }, [cart]);

  //Function to add a product to the cart
  const addToCart = (product: ProductItem) => {
    //Add the product to the cart and return the new cart
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);

      //Check if the product is already in the cart, increment the quantity if it is
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        //Check if the product isn't in the cart, add it with quantity 1
        return [
          ...prevCart,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
          },
        ];
      }
    });
  };

  const removerFromCart = (productId: number) => {
    //Remove the product from the cart and return the new cart
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: number, change: number) => {
    //Update the quantity of the product in the cart and return the new cart
    setCart(
      (prevCart) =>
        prevCart
          .map((item) =>
            item.id === productId
              ? { ...item, quantity: Math.max(0, item.quantity + change) }
              : item
          )
          .filter((item) => item.quantity > 0) //Remove items with quantity 0
    );
  };

  const getTotalPrice = () => {
    //Calculate the total price of the cart
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <>
      <div className="px-4 py-5 md:px-8 md:py-8 lg:px-16 lg:py-10 xl:px-20 bg-zinc-100 grid lg:grid-cols-[1fr_350px] gap-6">
        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          <h1 className="text-3xl font-bold sm:col-span-full">Desserts</h1>
          {/* Card Component */}
          <Card
            addToCart={addToCart}
            updateQuantity={updateQuantity}
            cart={cart}
          />
        </div>
        {/**Cart */}
        <div className="bg-white rounded-lg p-4 h-fit">
          <h2 className="text-orange-700 font-bold text-2xl mb-8">
            Your Cart{" "}
            {`(${cart
              .map((item) => item.quantity)
              .reduce((total, item) => total + item, 0)})`}
          </h2>
          {/** Cart Component */}
          <Cart
            cart={cart}
            removerFromCart={removerFromCart}
            getTotalPrice={getTotalPrice}
          />
        </div>
      </div>
    </>
  );
}

export default App;
