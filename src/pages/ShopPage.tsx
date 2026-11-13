import { useState } from 'react';
import { Search, ShoppingCart, Package, X, Minus, Plus } from 'lucide-react';
import { products, shopCategories, shipGroups } from '../data/mockData';

interface CartItem {
  productId: string;
  variantIndex: number;
  quantity: number;
}

export default function ShopPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedShipGroup, setSelectedShipGroup] = useState('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);

  const filtered = products.filter(p => {
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = !selectedCategory || p.category === selectedCategory;
    const matchShip = selectedShipGroup === 'all' || p.shipGroups.includes(selectedShipGroup);
    return matchSearch && matchCategory && matchShip;
  });

  const addToCart = (productId: string, variantIndex: number) => {
    setCart(prev => {
      const existing = prev.find(i => i.productId === productId && i.variantIndex === variantIndex);
      if (existing) {
        return prev.map(i => i.productId === productId && i.variantIndex === variantIndex 
          ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { productId, variantIndex, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: string, variantIndex: number, delta: number) => {
    setCart(prev => prev.map(i => {
      if (i.productId === productId && i.variantIndex === variantIndex) {
        const newQty = i.quantity + delta;
        return newQty > 0 ? { ...i, quantity: newQty } : i;
      }
      return i;
    }).filter(i => i.quantity > 0));
  };

  const cartTotal = cart.reduce((sum, item) => {
    const product = products.find(p => p.id === item.productId);
    if (!product) return sum;
    return sum + product.variants[item.variantIndex].price * item.quantity;
  }, 0);

  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="p-6 overflow-y-auto h-full relative">
      <div className="flex items-start justify-between mb-5">
        <div>
          <div className="overline mb-1">SUPPORT / SHOP</div>
          <h1 className="text-2xl font-bold text-white mb-1">Shop</h1>
          <p className="text-text-secondary text-sm">Every variant available. Set shipping per group. Basket checkout, with confirmation and tracking by email.</p>
        </div>
        <button
          onClick={() => setShowCart(!showCart)}
          className="relative p-2.5 bg-bg-panel border border-border rounded-xl hover:border-accent/30 transition-colors"
        >
          <ShoppingCart size={20} className="text-text-secondary" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-meta" />
        <input
          type="text"
          placeholder="Search products…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full bg-bg-panel border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm text-text-primary placeholder:text-text-meta focus:outline-none focus:border-accent/50"
        />
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-4">
        {shopCategories.map(cat => (
          <button
            key={cat.name}
            onClick={() => setSelectedCategory(selectedCategory === cat.name ? '' : cat.name)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
              selectedCategory === cat.name ? 'border-accent text-accent bg-accent/10' : 'border-border text-text-secondary hover:text-text-primary'
            }`}
          >
            {cat.name} ({cat.count})
          </button>
        ))}
      </div>

      {/* Shipping groups */}
      <div className="flex flex-wrap gap-2 mb-5">
        {shipGroups.map(g => (
          <button
            key={g.id}
            onClick={() => setSelectedShipGroup(g.id)}
            className={`text-[10px] px-2.5 py-1 rounded-full border transition-colors ${
              selectedShipGroup === g.id ? 'border-accent-green text-accent-green bg-accent-green/10' : 'border-border text-text-meta hover:text-text-secondary'
            }`}
          >
            {g.name}
          </button>
        ))}
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {filtered.map(product => (
          <div key={product.id} className="bg-bg-card border border-border rounded-xl p-4 hover:border-accent/20 transition-colors">
            {/* Product image placeholder */}
            <div className="w-full h-32 bg-bg-panel rounded-lg mb-3 flex items-center justify-center">
              <div className="text-center">
                <Package size={24} className="text-text-meta mx-auto mb-1" />
                <span className="text-[9px] text-text-meta font-mono">structural formula</span>
              </div>
            </div>
            
            <h3 className="text-sm font-semibold text-white mb-1">{product.name}</h3>
            <p className="text-[10px] text-text-meta mb-2">{product.variants.length} options</p>
            
            {/* Variants */}
            <div className="flex flex-wrap gap-1 mb-3">
              {product.variants.map((v, i) => (
                <span key={i} className="text-[10px] bg-bg-panel text-text-secondary px-1.5 py-0.5 rounded">
                  {v.name}
                </span>
              ))}
            </div>

            {/* Price and stock */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-lg font-bold text-white font-mono">${product.variants[0].price}</span>
              <span className={`text-[10px] ${product.variants[0].stock < 20 ? 'text-accent-orange' : 'text-accent-green'}`}>
                {product.variants[0].stock < 20 ? `${product.variants[0].stock} low in stock` : `${product.variants[0].stock} in stock`}
              </span>
            </div>

            {/* Add to cart */}
            <button
              onClick={() => addToCart(product.id, 0)}
              className="w-full flex items-center justify-center gap-2 py-2 bg-accent/10 text-accent text-xs font-medium rounded-lg hover:bg-accent/20 transition-colors"
            >
              <ShoppingCart size={14} />
              Add to cart
            </button>
            <p className="text-[9px] text-text-meta mt-1 text-center">
              Ships to group {product.shipGroups.join(', ')}
            </p>
          </div>
        ))}
      </div>

      {/* Cart modal */}
      {showCart && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-modal bg-black/60" onClick={() => setShowCart(false)}>
          <div className="bg-bg-card border border-border rounded-xl w-full max-w-md max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h2 className="text-lg font-bold text-white">Cart ({cartCount})</h2>
              <button onClick={() => setShowCart(false)} className="p-1 rounded hover:bg-white/5 text-text-meta">
                <X size={16} />
              </button>
            </div>
            
            <div className="p-4 space-y-3">
              {cart.length === 0 ? (
                <p className="text-center text-text-meta text-sm py-8">Your cart is empty</p>
              ) : (
                cart.map(item => {
                  const product = products.find(p => p.id === item.productId);
                  if (!product) return null;
                  const variant = product.variants[item.variantIndex];
                  return (
                    <div key={`${item.productId}-${item.variantIndex}`} className="flex items-center gap-3 bg-bg-panel rounded-lg p-3">
                      <div className="flex-1">
                        <div className="text-xs font-medium text-white">{product.name}</div>
                        <div className="text-[10px] text-text-meta">{variant.name}</div>
                      </div>
                      <div className="flex items-center gap-1">
                        <button onClick={() => updateQuantity(item.productId, item.variantIndex, -1)} className="p-1 rounded hover:bg-white/5 text-text-meta">
                          <Minus size={12} />
                        </button>
                        <span className="text-xs text-white font-mono w-6 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.productId, item.variantIndex, 1)} className="p-1 rounded hover:bg-white/5 text-text-meta">
                          <Plus size={12} />
                        </button>
                      </div>
                      <span className="text-xs text-white font-mono">${variant.price * item.quantity}</span>
                    </div>
                  );
                })
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-4 border-t border-border">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-text-secondary">Total</span>
                  <span className="text-lg font-bold text-white font-mono">${cartTotal.toFixed(2)}</span>
                </div>
                <button className="w-full py-2.5 bg-accent text-white text-sm font-medium rounded-lg hover:bg-accent/90 transition-colors">
                  Proceed to checkout
                </button>
                <p className="text-[10px] text-text-meta text-center mt-2">
                  Confirmation and tracking by email
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
