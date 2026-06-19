// src/components/CartDrawer.jsx
import { useApp } from '../hooks/useApp';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';

export default function CartDrawer() {
  const { 
    cart, 
    updateQuantity, 
    removeFromCart, 
    cartTotal, 
    cartCount,
    isCartOpen, 
    closeCart,
    openCheckout 
  } = useApp();

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#e8ddd4]">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-5 h-5 text-[#8e4a0e]" />
            <h2 className="font-playfair text-xl text-[#2d2420]">Your Cart</h2>
            <span className="bg-[#8e4a0e]/10 text-[#8e4a0e] text-sm px-2 py-0.5 rounded-full">
              {cartCount}
            </span>
          </div>
          <button
            onClick={closeCart}
            className="w-8 h-8 rounded-full bg-[#faf7f2] flex items-center justify-center text-[#6b5b4f] hover:bg-[#e8ddd4] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="w-16 h-16 mx-auto text-[#8e4a0e]/20 mb-4" />
              <p className="text-[#6b5b4f]">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map(item => (
                <div key={item.id} className="flex gap-4 bg-[#faf7f2] rounded-lg p-3">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-playfair text-[#2d2420]">{item.name}</h3>
                        <p className="text-sm text-[#6b5b4f]">${item.price.toFixed(2)}</p>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 rounded-full border border-[#e8ddd4] flex items-center justify-center hover:bg-white transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 rounded-full border border-[#e8ddd4] flex items-center justify-center hover:bg-white transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="font-playfair text-[#8e4a0e]">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t border-[#e8ddd4] p-6 space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-[#6b5b4f]">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#6b5b4f]">
                <span>Tax</span>
                <span>${(cartTotal * 0.08).toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-playfair text-lg text-[#2d2420] pt-2 border-t border-[#e8ddd4]">
                <span>Total</span>
                <span className="text-[#8e4a0e]">${(cartTotal * 1.08).toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={openCheckout}
              className="w-full bg-[#8e4a0e] text-white py-3 rounded-lg font-medium hover:bg-[#6d3a0b] transition-colors"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}