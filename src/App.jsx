import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useSound from "use-sound";
import swoosh from "./sounds/swoosh.mp3";
import "./index.css";

function SplashScreen({ onComplete }) {
  const [play] = useSound(swoosh, { volume: 0.3 });

  useEffect(() => {
    play();
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onComplete, play]);

  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-center"
      >
        <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-lg">
          COMPRIX
        </h1>
        <p className="text-lg md:text-2xl mt-4 text-gray-200 flex items-center justify-center gap-2">
          Welcome to our compression <span>🔥</span>
        </p>
      </motion.div>
    </div>
  );
}

const realProducts = [
  {
    id: 1,
    name: "Black Gold Compression Shirt",
    price: 749,
    sizes: { M: 10, L: 8, XL: 5, XXL: 2 },
    image: "/images/black-gold-shirt.jpg",
    description:
      "High-performance compression shirt with gold accents. Ideal for intense workouts and athletic performance.",
  },
  {
    id: 2,
    name: "Signature Compression Hoodie",
    price: 1199,
    sizes: { M: 6, L: 3, XL: 1, XXL: 0 },
    image: "/images/signature-hoodie.jpg",
    description:
      "Stay warm and ready. Our signature hoodie features premium compression fabric and a bold COMPRIX identity.",
  },
];

function ProductsPage() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({ name: "", phone: "", address: "", email: "" });

  const addToCart = (product) => {
    setCart([...cart, { ...product, quantity: 1 }]);
  };

  const handleOrder = () => {
    if (cart.length === 0) return;
    setShowCustomerForm(true);
  };

  const handleSubmitCustomer = (e) => {
    e.preventDefault();
    alert("شكراً لاختيارك Comprix! سيتم التواصل معك قريباً.");
    setCart([]);
    setCustomerInfo({ name: "", phone: "", address: "", email: "" });
    setShowCustomerForm(false);
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 py-10">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-semibold text-yellow-400">Our Collection</h2>
        <p className="text-gray-400">Browse our premium compression wear</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {realProducts.map((product) => (
          <div
            key={product.id}
            className="bg-neutral-900 rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition duration-300"
          >
            <img src={product.image} alt={product.name} className="w-full h-72 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">{product.name}</h3>
              <p className="text-lg text-yellow-400 mb-2">EGP {product.price}</p>
              <div className="flex flex-wrap gap-2">
                {Object.entries(product.sizes).map(([size, stock]) => (
                  <span
                    key={size}
                    className={`px-3 py-1 rounded-full text-sm border ${
                      stock === 0 ? "border-red-500 text-red-500" : "border-green-500 text-green-500"
                    }`}
                  >
                    {size} ({stock})
                  </span>
                ))}
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => setSelectedProduct(product)}
                  className="w-full bg-yellow-400 text-black py-2 rounded-xl hover:bg-yellow-300 transition"
                >
                  View Product
                </button>
                <button
                  onClick={() => addToCart(product)}
                  className="w-full bg-white text-black py-2 rounded-xl hover:bg-gray-200 transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <div className="mt-12 text-center">
          <h3 className="text-xl font-bold mb-4">Cart ({cart.length} items)</h3>
          <button
            onClick={handleOrder}
            className="bg-yellow-400 text-black px-6 py-2 rounded-full hover:bg-yellow-300 transition"
          >
            Complete Order
          </button>
        </div>
      )}

      {showCustomerForm && (
        <form onSubmit={handleSubmitCustomer} className="mt-8 max-w-md mx-auto bg-neutral-800 p-6 rounded-xl">
          <h4 className="text-lg font-bold mb-4 text-center">Customer Info</h4>
          <input
            type="text"
            placeholder="Name"
            value={customerInfo.name}
            onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
            className="w-full mb-3 px-4 py-2 rounded bg-neutral-700 text-white"
            required
          />
          <input
            type="tel"
            placeholder="Phone"
            value={customerInfo.phone}
            onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
            className="w-full mb-3 px-4 py-2 rounded bg-neutral-700 text-white"
            required
          />
          <input
            type="text"
            placeholder="Address"
            value={customerInfo.address}
            onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
            className="w-full mb-3 px-4 py-2 rounded bg-neutral-700 text-white"
            required
          />
          <input
            type="email"
            placeholder="Email (optional)"
            value={customerInfo.email}
            onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
            className="w-full mb-3 px-4 py-2 rounded bg-neutral-700 text-white"
          />
          <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded">
            Confirm Order
          </button>
        </form>
      )}

      <div className="text-center mt-12 text-sm text-gray-500">
        <p>
          Follow us on Instagram <span className="text-white font-bold">@comprix.eg</span>
        </p>
      </div>

      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-neutral-800 rounded-xl p-6 w-full max-w-md">
            <h3 className="text-2xl font-bold mb-4">{selectedProduct.name}</h3>
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-full h-64 object-cover rounded-md mb-4"
            />
            <p className="text-gray-300 text-sm mb-4">{selectedProduct.description}</p>
            <button
              className="mt-2 w-full bg-red-500 text-white py-2 rounded-xl hover:bg-red-600 transition"
              onClick={() => setSelectedProduct(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <AnimatePresence mode="wait">
      {showSplash ? (
        <SplashScreen key="splash" onComplete={() => setShowSplash(false)} />
      ) : (
        <motion.div
          key="main"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <ProductsPage />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default App;
