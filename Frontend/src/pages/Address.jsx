import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FaEdit,
  FaTrashAlt,
  FaStar,
  FaMapMarkerAlt,
  FaPhone,

  FaGlobe,
} from "react-icons/fa";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AddressForm from "../components/AddressForm";
import Loader from "../components/Loader";

import {
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} from "../redux/addressSlice";

function Address() {
  const dispatch = useDispatch();
  const [editAddress, setEditAddress] = useState(null);
  const { addresses, loading } = useSelector((state) => state.address);

  useEffect(() => {
    dispatch(getAddresses());
  }, [dispatch]);

  const addHandler = async (data) => {
    if (editAddress) {
      await dispatch(updateAddress({ id: editAddress._id, addressData: data }));
      setEditAddress(null);
    } else {
      await dispatch(addAddress(data));
    }
    dispatch(getAddresses());
  };

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      await dispatch(deleteAddress(id));
      dispatch(getAddresses());
    }
  };

  const defaultHandler = async (id) => {
    await dispatch(setDefaultAddress(id));
    dispatch(getAddresses());
  };

  const cancelEdit = () => {
    setEditAddress(null);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#EDE4CB] py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ─── Header ─── */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-[#37400B] tracking-tight flex items-center gap-3">
              <FaMapMarkerAlt className="text-[#BDB47B]" />
              My Addresses
            </h1>
            <span className="text-sm text-[#BDB47B]">
              {addresses?.length || 0} saved addresses
            </span>
          </div>

          {/* ─── Address Form ─── */}
          <div className="bg-white rounded-2xl shadow-md p-5 md:p-7 mb-8 border border-[#EDE4CB]">
            <div className="flex items-center gap-2 mb-5">
              <span className="w-1 h-7 bg-[#37400B] rounded-full" />
              <h2 className="text-xl md:text-2xl font-bold text-[#37400B]">
                {editAddress ? "Edit Address" : "Add New Address"}
              </h2>
            </div>
            <AddressForm
              onSubmit={addHandler}
              initialData={editAddress}
              onCancel={editAddress ? cancelEdit : null}
            />
          </div>

          {/* ─── Address List ─── */}
          {addresses?.length === 0 ? (
            <div className="bg-white rounded-2xl shadow p-12 text-center border border-[#EDE4CB]">
              <div className="w-20 h-20 bg-[#EDE4CB] rounded-full flex items-center justify-center mx-auto mb-4">
                <FaMapMarkerAlt className="text-4xl text-[#37400B]" />
              </div>
              <h2 className="text-2xl font-bold text-[#37400B] mb-2">No Addresses Yet</h2>
              <p className="text-[#6B5D4F] max-w-sm mx-auto">
                Add your first shipping address using the form above.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
              {addresses.map((address) => (
                <div
                  key={address._id}
                  className={`bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-5 md:p-6 border ${
                    address.isDefault
                      ? "border-[#37400B] ring-1 ring-[#37400B]/20"
                      : "border-[#EDE4CB] hover:border-[#BDB47B]/40"
                  }`}
                >
                  {/* Header */}
                  <div className="flex justify-between items-start gap-3 mb-4">
                    <h3 className="text-lg font-bold text-[#37400B] truncate">
                      {address.fullName}
                    </h3>
                    {address.isDefault && (
                      <span className="inline-flex items-center gap-1 bg-[#37400B] text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                        <FaStar className="w-3 h-3" />
                        Default
                      </span>
                    )}
                  </div>

                  {/* Details */}
                  <div className="space-y-1.5 text-sm text-[#4A3F35]">
                    <div className="flex items-center gap-2">
                      <FaPhone className="text-[#BDB47B] w-3.5 h-3.5" />
                      <span>{address.phone}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <FaMapMarkerAlt className="text-[#BDB47B] w-3.5 h-3.5 mt-0.5" />
                      <span>
                        {address.addressLine1}
                        {address.addressLine2 && `, ${address.addressLine2}`}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 pl-5.5">
                      <span>
                        {address.city}, {address.state} – {address.postalCode}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaGlobe className="text-[#BDB47B] w-3.5 h-3.5" />
                      <span>{address.country}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-[#EDE4CB]">
                    <button
                      onClick={() => setEditAddress(address)}
                      className="inline-flex items-center gap-1.5 bg-[#EDE4CB] text-[#37400B] hover:bg-[#BDB47B]/30 px-4 py-2 rounded-xl text-sm font-medium transition"
                    >
                      <FaEdit className="w-3.5 h-3.5" />
                      Edit
                    </button>

                    {!address.isDefault && (
                      <button
                        onClick={() => defaultHandler(address._id)}
                        className="inline-flex items-center gap-1.5 bg-[#37400B] text-white hover:bg-[#2A3308] px-4 py-2 rounded-xl text-sm font-medium transition shadow-sm hover:shadow"
                      >
                        <FaStar className="w-3.5 h-3.5" />
                        Set Default
                      </button>
                    )}

                    <button
                      onClick={() => deleteHandler(address._id)}
                      className="inline-flex items-center gap-1.5 bg-red-50 text-red-500 hover:bg-red-100 px-4 py-2 rounded-xl text-sm font-medium transition"
                    >
                      <FaTrashAlt className="w-3.5 h-3.5" />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Address;