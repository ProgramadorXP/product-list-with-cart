import { products } from "../api/products";
import { ProductCart, ProductItem } from "../types";

type CardProps = {
  addToCart: (product: ProductItem) => void;
  updateQuantity: (productId: number, change: number) => void;
  cart: ProductCart;
};

export default function Card({ addToCart, updateQuantity , cart }: CardProps) {
  return (
    <>
      {products.map((product) => (
        <div key={product.id} className="flex flex-col gap-10">
          <div className="flex flex-col items-center relative">
            <img
              src={product.img}
              alt={product.category}
              className={`w-full h-auto rounded-lg border-2 transition-colors duration-300 ${cart.some((item) => item.id === product.id) ? "border-orange-700" : "border-transparent"}`}
            />
            <button
              onClick={() => {
                if (!cart.some((item) => item.id === product.id)) {
                  addToCart(product); //Add the product for the first time
                }
              }}
              className={`absolute -bottom-5 ${
                cart.some((item) => item.id === product.id)
                  ? "bg-orange-700 text-white border-orange-900"
                  : "bg-white text-black hover:bg-zinc-100 border-gray-400"
              } transition-colors duration-300 border py-2 w-[60%] font-semibold rounded-full flex justify-center items-center gap-2`}
            >
              {cart.find((item) => item.id === product.id)?.quantity ? (
                <div className="w-full px-4 flex justify-between items-center gap-2">
                  {/* Decrement button */}
                  <span
                    onClick={(e) => {
                      e.stopPropagation(); //Avoid confilct with the main button
                      updateQuantity(product.id, -1);
                    }}
                    className="w-4 h-4 flex items-center justify-center border border-white rounded-full"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      height="2"
                      fill="none"
                      viewBox="0 0 10 2"
                    >
                      <path fill="#fff" d="M0 .375h10v1.25H0V.375Z" />
                    </svg>
                  </span>

                  {/* Quantity */}
                  {cart.find((item) => item.id === product.id)!.quantity}

                  {/* Increment button */}
                  <span
                    onClick={(e) => {
                      e.stopPropagation(); //Avoid confilct with the main button
                      updateQuantity(product.id, 1);
                    }}
                    className="w-4 h-4 flex items-center justify-center border border-white rounded-full"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      height="10"
                      fill="none"
                      viewBox="0 0 10 10"
                    >
                      <path
                        fill="#fff"
                        d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"
                      />
                    </svg>
                  </span>
                </div>
              ) : (
                <>
                  {/* Icon SVG & text Add to cart */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="21"
                    height="20"
                    fill="none"
                    viewBox="0 0 21 20"
                  >
                    <g fill="#C73B0F" clipPath="url(#a)">
                      <path d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .612.502h11.25v-1.25H5.847l-.5-2.5h11.238a.625.625 0 0 0 .61-.49l1.417-6.385h-1.28L16.083 10H5.096l-1.65-8.248Z" />
                      <path d="M11.584 3.75v-2.5h-1.25v2.5h-2.5V5h2.5v2.5h1.25V5h2.5V3.75h-2.5Z" />
                    </g>
                    <defs>
                      <clipPath id="a">
                        <path fill="#fff" d="M.333 0h20v20h-20z" />
                      </clipPath>
                    </defs>
                  </svg>
                  Add to cart
                </>
              )}
            </button>
          </div>

          <div className="">
            <p className="text-gray-500">{product.category}</p>
            <h2 className="font-bold">{product.name}</h2>
            <p className="text-orange-700 font-bold">
              ${product.price.toFixed(2)}
            </p>
          </div>
        </div>
      ))}
    </>
  );
}
