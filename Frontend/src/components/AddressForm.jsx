import { useState } from "react";
import {
  FaUser,
  FaPhone,
  FaMapPin,
  FaCity,
  FaBuilding,
  FaGlobe,
  FaSave,
  FaCheckCircle,
} from "react-icons/fa";

function AddressForm({ onSubmit, initialData = null, onCancel }) {
  const [formData, setFormData] = useState(
    initialData || {
      fullName: "",
      phone: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      postalCode: "",
      country: "India",
      isDefault: false,
    }
  );

  const [isSubmitting, setIsSubmitting] = useState(false);

  const changeHandler = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await onSubmit(formData);
    setIsSubmitting(false);

    if (!initialData) {
      setFormData({
        fullName: "",
        phone: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        postalCode: "",
        country: "India",
        isDefault: false,
      });
    }
  };

  return (
    <form
      onSubmit={submitHandler}
      className="bg-white rounded-2xl shadow-md p-6 md:p-8 border border-[#EDE4CB]"
    >
      {/* ─── Header ─── */}
      <div className="mb-6 flex items-center gap-3">
        <span className="w-1 h-8 bg-[#37400B] rounded-full" />
        <h2 className="text-xl md:text-2xl font-bold text-[#37400B]">
          {initialData ? "Edit Address" : "Add New Address"}
        </h2>
        {initialData && (
          <span className="ml-auto text-xs text-[#BDB47B]">Edit mode</span>
        )}
      </div>

      {/* ─── Form Grid ─── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Full Name */}
        <div className="relative">
          <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-[#BDB47B] w-4 h-4" />
          <input
            type="text"
            name="fullName"
            placeholder="Full Name *"
            value={formData.fullName}
            onChange={changeHandler}
            className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm text-[#2B2118] focus:outline-none focus:ring-2 focus:ring-[#37400B] focus:border-transparent placeholder:text-gray-400 transition"
            required
          />
        </div>

        {/* Phone */}
        <div className="relative">
          <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-[#BDB47B] w-4 h-4" />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number *"
            value={formData.phone}
            onChange={changeHandler}
            className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm text-[#2B2118] focus:outline-none focus:ring-2 focus:ring-[#37400B] focus:border-transparent placeholder:text-gray-400 transition"
            required
          />
        </div>

        {/* Address Line 1 */}
        <div className="relative md:col-span-2">
          <FaMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-[#BDB47B] w-4 h-4" />
          <input
            type="text"
            name="addressLine1"
            placeholder="Address Line 1 *"
            value={formData.addressLine1}
            onChange={changeHandler}
            className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm text-[#2B2118] focus:outline-none focus:ring-2 focus:ring-[#37400B] focus:border-transparent placeholder:text-gray-400 transition"
            required
          />
        </div>

        {/* Address Line 2 */}
        <div className="relative md:col-span-2">
          <FaBuilding className="absolute left-3 top-1/2 -translate-y-1/2 text-[#BDB47B] w-4 h-4" />
          <input
            type="text"
            name="addressLine2"
            placeholder="Address Line 2 (Optional)"
            value={formData.addressLine2}
            onChange={changeHandler}
            className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm text-[#2B2118] focus:outline-none focus:ring-2 focus:ring-[#37400B] focus:border-transparent placeholder:text-gray-400 transition"
          />
        </div>

        {/* City */}
        <div className="relative">
          <FaCity className="absolute left-3 top-1/2 -translate-y-1/2 text-[#BDB47B] w-4 h-4" />
          <input
            type="text"
            name="city"
            placeholder="City *"
            value={formData.city}
            onChange={changeHandler}
            className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm text-[#2B2118] focus:outline-none focus:ring-2 focus:ring-[#37400B] focus:border-transparent placeholder:text-gray-400 transition"
            required
          />
        </div>

        {/* State */}
        <div className="relative">
          <FaCity className="absolute left-3 top-1/2 -translate-y-1/2 text-[#BDB47B] w-4 h-4" />
          <input
            type="text"
            name="state"
            placeholder="State *"
            value={formData.state}
            onChange={changeHandler}
            className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm text-[#2B2118] focus:outline-none focus:ring-2 focus:ring-[#37400B] focus:border-transparent placeholder:text-gray-400 transition"
            required
          />
        </div>

        {/* Postal Code */}
        <div className="relative">
          <FaMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-[#BDB47B] w-4 h-4" />
          <input
            type="text"
            name="postalCode"
            placeholder="Postal Code *"
            value={formData.postalCode}
            onChange={changeHandler}
            className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm text-[#2B2118] focus:outline-none focus:ring-2 focus:ring-[#37400B] focus:border-transparent placeholder:text-gray-400 transition"
            required
          />
        </div>

        {/* Country */}
        <div className="relative">
          <FaGlobe className="absolute left-3 top-1/2 -translate-y-1/2 text-[#BDB47B] w-4 h-4" />
          <input
            type="text"
            name="country"
            placeholder="Country *"
            value={formData.country}
            onChange={changeHandler}
            className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm text-[#2B2118] focus:outline-none focus:ring-2 focus:ring-[#37400B] focus:border-transparent placeholder:text-gray-400 transition"
            required
          />
        </div>
      </div>

      {/* ─── Default Address Checkbox ─── */}
      <div className="mt-5">
        <label className="flex items-center gap-2 text-sm text-[#37400B] cursor-pointer group">
          <input
            type="checkbox"
            name="isDefault"
            checked={formData.isDefault}
            onChange={changeHandler}
            className="accent-[#37400B] w-4 h-4 rounded border-gray-300 focus:ring-[#37400B] cursor-pointer"
          />
          <span className="group-hover:text-[#2A3308] transition">
            Set as default address
          </span>
          {formData.isDefault && (
            <FaCheckCircle className="text-[#37400B] w-4 h-4 ml-1" />
          )}
        </label>
      </div>

      {/* ─── Buttons ─── */}
      <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-5 border-t border-[#EDE4CB]">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-[#37400B] hover:bg-[#2A3308] disabled:opacity-60 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Saving...
            </>
          ) : (
            <>
              <FaSave className="w-4 h-4" />
              {initialData ? "Update Address" : "Save Address"}
            </>
          )}
        </button>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 rounded-xl border-2 border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition font-semibold text-sm"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default AddressForm;