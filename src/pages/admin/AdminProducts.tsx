import React, { useState } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  Check,
  X,
  Sparkles,
  Search,
  Star,
  CheckCircle,
  Eye,
  ShieldCheck
} from 'lucide-react';
import { useGold } from '../../context/GoldContext';
import { Product } from '../../data/types';
import { GoldButton } from '../../components/common/GoldButton';

export const AdminProducts: React.FC = () => {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    toggleProductFeatured,
    toggleProductStock,
    calculateProductPrice
  } = useGold();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProductId, setDeletingProductId] = useState<string | null>(null);

  // Form State
  const initialFormData = {
    name: '',
    category: 'Antique Bangles',
    grossWeight: 45,
    netGoldWeight: 45,
    purity: '22K' as '22K' | '24K' | '18K',
    hallmark: 'BIS 916',
    makingChargePercent: 12,
    badge: 'NEW' as any,
    craftsmanship: 'Nakshi Temple Work' as any,
    occasion: 'Bridal / Muhurtham' as any,
    description: '',
    imageUrl: 'https://images.unsplash.com/photo-1611591475871-33eb94642730?q=80&w=800&auto=format&fit=crop',
    inStock: true,
    featured: false,
    stones: 'None (Solid Gold)',
    customizable: true
  };

  const [formData, setFormData] = useState(initialFormData);

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleOpenAdd = () => {
    setFormData(initialFormData);
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (p: Product) => {
    setEditingProduct(p);
    setFormData({
      name: p.name,
      category: p.category,
      grossWeight: p.grossWeight,
      netGoldWeight: p.netGoldWeight,
      purity: p.purity,
      hallmark: p.hallmark,
      makingChargePercent: p.makingChargePercent,
      badge: p.badge || 'NEW',
      craftsmanship: p.craftsmanship,
      occasion: p.occasion,
      description: p.description,
      imageUrl: p.images[0],
      inStock: p.inStock,
      featured: p.featured,
      stones: p.stones || '',
      customizable: p.customizable
    });
  };

  const handleSaveAdd = (e: React.FormEvent) => {
    e.preventDefault();
    addProduct({
      name: formData.name,
      category: formData.category,
      grossWeight: Number(formData.grossWeight),
      netGoldWeight: Number(formData.netGoldWeight),
      purity: formData.purity,
      hallmark: formData.hallmark,
      makingChargePercent: Number(formData.makingChargePercent),
      badge: formData.badge,
      craftsmanship: formData.craftsmanship,
      occasion: formData.occasion,
      description: formData.description,
      images: [formData.imageUrl],
      inStock: formData.inStock,
      featured: formData.featured,
      stones: formData.stones,
      customizable: formData.customizable
    });
    setIsAddModalOpen(false);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    updateProduct(editingProduct.id, {
      name: formData.name,
      category: formData.category,
      grossWeight: Number(formData.grossWeight),
      netGoldWeight: Number(formData.netGoldWeight),
      purity: formData.purity,
      hallmark: formData.hallmark,
      makingChargePercent: Number(formData.makingChargePercent),
      badge: formData.badge,
      craftsmanship: formData.craftsmanship,
      occasion: formData.occasion,
      description: formData.description,
      images: [formData.imageUrl],
      inStock: formData.inStock,
      featured: formData.featured,
      stones: formData.stones,
      customizable: formData.customizable
    });
    setEditingProduct(null);
  };

  const handleConfirmDelete = () => {
    if (deletingProductId) {
      deleteProduct(deletingProductId);
      setDeletingProductId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#261E15]">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
            CATALOG MANAGEMENT
          </span>
          <h1 className="text-2xl font-serif font-bold text-[#FBF7F0]">
            Royal Jewellery Inventory ({products.length})
          </h1>
          <p className="text-xs text-[#9E9080] mt-0.5">
            Real-time catalog CRUD: Edits reflect instantly on public customer catalog.
          </p>
        </div>

        <GoldButton
          variant="primary"
          size="md"
          onClick={handleOpenAdd}
          icon={<Plus className="w-4 h-4" />}
        >
          Add New Masterpiece
        </GoldButton>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#14100D] border border-[#2D2419] p-3 rounded-xs">
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="Search products by title or style..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#100D0B] border border-[#352B1E] rounded-xs pl-8 pr-3 py-1.5 text-xs text-[#FBF7F0] focus:outline-none focus:border-[#E5B544]"
          />
          <Search className="w-3.5 h-3.5 text-[#8A7E70] absolute left-2.5 top-2.5" />
        </div>

        <div className="flex items-center gap-2 text-xs text-[#A89D8F] w-full sm:w-auto justify-end">
          <span>Category:</span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-[#100D0B] border border-[#352B1E] text-[#FBF7F0] text-xs rounded-xs px-2.5 py-1.5 focus:outline-none focus:border-[#E5B544]"
          >
            <option value="All">All Categories</option>
            <option value="Antique Bangles">Antique Bangles</option>
            <option value="Bridal Kadas">Bridal Kadas</option>
            <option value="Temple Necklaces">Temple Necklaces</option>
            <option value="Royal Chokers">Royal Chokers</option>
            <option value="Chains & Mangalsutra">Chains & Mangalsutra</option>
            <option value="Pure Gold Chains">Pure Gold Chains</option>
            <option value="Earrings & Jhumkas">Earrings & Jhumkas</option>
            <option value="Bridal Sets">Bridal Sets</option>
            <option value="Solitaire & Polki Rings">Solitaire & Polki Rings</option>
            <option value="Sacred Gold Coins">Sacred Gold Coins</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-[#14100D] border border-[#2D2419] rounded-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#18130F] text-[#8A7E70] uppercase tracking-wider text-[10px] border-b border-[#261E15]">
              <tr>
                <th className="py-3 px-4">Item</th>
                <th className="py-3 px-4">Purity & Hallmark</th>
                <th className="py-3 px-4">Weights</th>
                <th className="py-3 px-4">Making %</th>
                <th className="py-3 px-4">Approx Price</th>
                <th className="py-3 px-4 text-center">Featured</th>
                <th className="py-3 px-4 text-center">In Stock</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#211A12] text-[#C5B8A8]">
              {filteredProducts.map((p) => {
                const price = calculateProductPrice(p).total;
                return (
                  <tr key={p.id} className="hover:bg-[#1A1612] transition-colors">
                    {/* Item */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.images[0]}
                          alt=""
                          className="w-10 h-10 rounded-xs object-cover border border-[#382D1E]"
                        />
                        <div>
                          <span className="font-semibold text-[#FBF7F0] block">{p.name}</span>
                          <span className="text-[10px] text-[#8A7E70]">{p.category}</span>
                        </div>
                      </div>
                    </td>

                    {/* Purity */}
                    <td className="py-3 px-4">
                      <span className="bg-[#1C1711] border border-[#3A2E1F] text-[#E5B544] px-2 py-0.5 rounded-xs font-mono text-[11px]">
                        {p.purity} ({p.hallmark})
                      </span>
                    </td>

                    {/* Weight */}
                    <td className="py-3 px-4">
                      <span>Gross: <strong className="text-[#FBF7F0]">{p.grossWeight}g</strong></span>
                      <span className="block text-[10px] text-[#8A7E70]">Net: {p.netGoldWeight}g</span>
                    </td>

                    {/* Making */}
                    <td className="py-3 px-4 font-semibold text-[#FBF7F0]">
                      {p.makingChargePercent}%
                    </td>

                    {/* Price */}
                    <td className="py-3 px-4 font-serif font-bold text-[#D4AF37]">
                      ₹{price.toLocaleString('en-IN')}
                    </td>

                    {/* Featured Toggle */}
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => toggleProductFeatured(p.id)}
                        className={`p-1.5 rounded-xs transition-colors ${
                          p.featured
                            ? 'text-[#E5B544] bg-[#2E2214]'
                            : 'text-[#6E5D4B] hover:text-[#A89D8F]'
                        }`}
                        title={p.featured ? 'Featured on Home Page' : 'Mark as Featured'}
                      >
                        <Star className={`w-4 h-4 ${p.featured ? 'fill-current' : ''}`} />
                      </button>
                    </td>

                    {/* In-Stock Toggle */}
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => toggleProductStock(p.id)}
                        className={`px-2 py-0.5 text-[10px] font-bold rounded-xs uppercase border transition-colors ${
                          p.inStock
                            ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                            : 'bg-rose-950 text-rose-400 border-rose-800'
                        }`}
                      >
                        {p.inStock ? 'In Stock' : 'Sold Out'}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEdit(p)}
                          className="p-1.5 text-[#A89D8F] hover:text-[#E5B544] hover:bg-[#201811] rounded-xs"
                          title="Edit Product"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeletingProductId(p.id)}
                          className="p-1.5 text-[#8A7E70] hover:text-rose-400 hover:bg-[#201811] rounded-xs"
                          title="Delete Product"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      {(isAddModalOpen || editingProduct) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-[#16120E] border border-[#5E4A28] rounded-sm p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#2D2419] mb-5">
              <h3 className="font-serif text-xl font-bold text-[#FBF7F0]">
                {editingProduct ? 'Edit Masterpiece Listing' : 'Add New Royal Masterpiece'}
              </h3>
              <button
                onClick={() => {
                  setIsAddModalOpen(false);
                  setEditingProduct(null);
                }}
                className="text-[#8A7E70] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={editingProduct ? handleSaveEdit : handleSaveAdd}
              className="space-y-4 text-xs"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#C4B5A5] uppercase tracking-wider mb-1 font-semibold">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#120F0D] border border-[#3A2E1F] rounded-xs px-3 py-2 text-[#FBF7F0] focus:outline-none focus:border-[#E5B544]"
                  />
                </div>

                <div>
                  <label className="block text-[#C4B5A5] uppercase tracking-wider mb-1 font-semibold">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-[#120F0D] border border-[#3A2E1F] rounded-xs px-3 py-2 text-[#FBF7F0] focus:outline-none focus:border-[#E5B544]"
                  >
                    <option value="Antique Bangles">Antique Bangles</option>
                    <option value="Bridal Kadas">Bridal Kadas</option>
                    <option value="Temple Necklaces">Temple Necklaces</option>
                    <option value="Royal Chokers">Royal Chokers</option>
                    <option value="Chains & Mangalsutra">Chains & Mangalsutra</option>
                    <option value="Pure Gold Chains">Pure Gold Chains</option>
                    <option value="Earrings & Jhumkas">Earrings & Jhumkas</option>
                    <option value="Bridal Sets">Bridal Sets</option>
                    <option value="Solitaire & Polki Rings">Solitaire & Polki Rings</option>
                    <option value="Sacred Gold Coins">Sacred Gold Coins</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[#C4B5A5] uppercase tracking-wider mb-1 font-semibold">
                    Gross Wt (g) *
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={formData.grossWeight}
                    onChange={(e) => setFormData({ ...formData, grossWeight: Number(e.target.value) })}
                    className="w-full bg-[#120F0D] border border-[#3A2E1F] rounded-xs px-3 py-2 text-[#FBF7F0] focus:outline-none focus:border-[#E5B544]"
                  />
                </div>

                <div>
                  <label className="block text-[#C4B5A5] uppercase tracking-wider mb-1 font-semibold">
                    Net Gold Wt (g) *
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={formData.netGoldWeight}
                    onChange={(e) => setFormData({ ...formData, netGoldWeight: Number(e.target.value) })}
                    className="w-full bg-[#120F0D] border border-[#3A2E1F] rounded-xs px-3 py-2 text-[#FBF7F0] focus:outline-none focus:border-[#E5B544]"
                  />
                </div>

                <div>
                  <label className="block text-[#C4B5A5] uppercase tracking-wider mb-1 font-semibold">
                    Making % (VA) *
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    required
                    value={formData.makingChargePercent}
                    onChange={(e) => setFormData({ ...formData, makingChargePercent: Number(e.target.value) })}
                    className="w-full bg-[#120F0D] border border-[#3A2E1F] rounded-xs px-3 py-2 text-[#FBF7F0] focus:outline-none focus:border-[#E5B544]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#C4B5A5] uppercase tracking-wider mb-1 font-semibold">
                    Gold Purity
                  </label>
                  <select
                    value={formData.purity}
                    onChange={(e) => setFormData({ ...formData, purity: e.target.value as any })}
                    className="w-full bg-[#120F0D] border border-[#3A2E1F] rounded-xs px-3 py-2 text-[#FBF7F0] focus:outline-none focus:border-[#E5B544]"
                  >
                    <option value="22K">22K (BIS 916)</option>
                    <option value="24K">24K (999 Pure Bullion)</option>
                    <option value="18K">18K (BIS 750)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#C4B5A5] uppercase tracking-wider mb-1 font-semibold">
                    Badge Flag
                  </label>
                  <select
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value as any })}
                    className="w-full bg-[#120F0D] border border-[#3A2E1F] rounded-xs px-3 py-2 text-[#FBF7F0] focus:outline-none focus:border-[#E5B544]"
                  >
                    <option value="BESTSELLER">BESTSELLER</option>
                    <option value="BRIDAL HERITAGE">BRIDAL HERITAGE</option>
                    <option value="MASTERPIECE">MASTERPIECE</option>
                    <option value="TRENDING">TRENDING</option>
                    <option value="CLASSIC">CLASSIC</option>
                    <option value="NEW">NEW</option>
                    <option value="AWARD WINNER">AWARD WINNER</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#C4B5A5] uppercase tracking-wider mb-1 font-semibold">
                  Image URL (with Instant Live Preview)
                </label>
                <input
                  type="url"
                  required
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full bg-[#120F0D] border border-[#3A2E1F] rounded-xs px-3 py-2 text-[#FBF7F0] focus:outline-none focus:border-[#E5B544]"
                />
                {formData.imageUrl && (
                  <div className="mt-2 flex items-center gap-3 bg-[#100D0B] p-2 rounded-xs border border-[#2D2419]">
                    <img
                      src={formData.imageUrl}
                      alt="Preview"
                      className="w-12 h-12 object-cover rounded-xs border border-[#4A3B26]"
                    />
                    <span className="text-[11px] text-[#A89D8F]">Image Preview Verified</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-[#C4B5A5] uppercase tracking-wider mb-1 font-semibold">
                  Craftsmanship Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-[#120F0D] border border-[#3A2E1F] rounded-xs px-3 py-2 text-[#FBF7F0] focus:outline-none focus:border-[#E5B544]"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="accent-[#E5B544]"
                  />
                  <span>Feature on Home Trending Masterpieces</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.inStock}
                    onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                    className="accent-[#E5B544]"
                  />
                  <span>Available In Stock</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#261E15]">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setEditingProduct(null);
                  }}
                  className="px-4 py-2 bg-[#120F0D] text-[#A89D8F] uppercase tracking-wider font-semibold rounded-xs"
                >
                  Cancel
                </button>
                <GoldButton type="submit" variant="primary">
                  {editingProduct ? 'Save Changes' : 'Publish Product'}
                </GoldButton>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingProductId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#16120E] border border-rose-800/80 rounded-sm p-6 max-w-sm w-full space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#FBF7F0]">
              Confirm Archive & Deletion
            </h3>
            <p className="text-xs text-[#C5B8A8] leading-relaxed">
              Are you sure you want to remove this piece from the active catalog? This change will reflect immediately across all client views.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setDeletingProductId(null)}
                className="px-3 py-1.5 bg-[#120F0D] text-[#A89D8F] text-xs font-semibold rounded-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-1.5 bg-rose-950 text-rose-300 border border-rose-700 text-xs font-bold rounded-xs hover:bg-rose-900"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
