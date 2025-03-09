'use client';

import { useState } from 'react';

interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddAddress = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newAddress: Address = {
      id: Date.now().toString(),
      name: formData.get('name') as string,
      street: formData.get('street') as string,
      city: formData.get('city') as string,
      state: formData.get('state') as string,
      zipCode: formData.get('zipCode') as string,
      country: formData.get('country') as string,
      isDefault: addresses.length === 0, // First address is default
    };
    
    setAddresses([...addresses, newAddress]);
    setShowAddForm(false);
  };

  const handleDelete = (id: string) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
  };

  const handleSetDefault = (id: string) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="section-title">My Addresses</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="btn-primary"
        >
          Add New Address
        </button>
      </div>

      {/* Address Form */}
      {showAddForm && (
        <div className="mb-8 p-6 border border-primary/30">
          <form onSubmit={handleAddAddress} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-textColor-muted mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="input-primary w-full"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm text-textColor-muted mb-1">Street Address</label>
                <input
                  type="text"
                  name="street"
                  required
                  className="input-primary w-full"
                  placeholder="123 Main St"
                />
              </div>
              <div>
                <label className="block text-sm text-textColor-muted mb-1">City</label>
                <input
                  type="text"
                  name="city"
                  required
                  className="input-primary w-full"
                  placeholder="City"
                />
              </div>
              <div>
                <label className="block text-sm text-textColor-muted mb-1">State</label>
                <input
                  type="text"
                  name="state"
                  required
                  className="input-primary w-full"
                  placeholder="State"
                />
              </div>
              <div>
                <label className="block text-sm text-textColor-muted mb-1">ZIP Code</label>
                <input
                  type="text"
                  name="zipCode"
                  required
                  className="input-primary w-full"
                  placeholder="12345"
                />
              </div>
              <div>
                <label className="block text-sm text-textColor-muted mb-1">Country</label>
                <input
                  type="text"
                  name="country"
                  required
                  className="input-primary w-full"
                  placeholder="Country"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="btn-outline"
              >
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                Save Address
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Addresses List */}
      {addresses.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-textColor-muted">No addresses saved yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addresses.map((address) => (
            <div
              key={address.id}
              className="p-6 border border-primary/30 relative group"
            >
              {address.isDefault && (
                <span className="absolute top-4 right-4 text-xs text-primary">
                  Default Address
                </span>
              )}
              <h3 className="font-medium mb-2">{address.name}</h3>
              <p className="text-textColor-muted text-sm">
                {address.street}<br />
                {address.city}, {address.state} {address.zipCode}<br />
                {address.country}
              </p>
              
              <div className="mt-4 flex justify-end space-x-4">
                {!address.isDefault && (
                  <button
                    onClick={() => handleSetDefault(address.id)}
                    className="text-sm text-primary hover:text-primary-dark"
                  >
                    Set as Default
                  </button>
                )}
                <button
                  onClick={() => handleDelete(address.id)}
                  className="text-sm text-red-500 hover:text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 