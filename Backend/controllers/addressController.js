const Address = require("../models/Address");

const addAddress = async (req, res) => {
  try {
    const {
      fullName,
      phone,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country,
      isDefault,
    } = req.body;

    if (isDefault) {
      await Address.updateMany(
        { user: req.user._id },
        { isDefault: false }
      );
    }

    const address = await Address.create({
      user: req.user._id,
      fullName,
      phone,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country,
      isDefault,
    });

    res.status(201).json({
      success: true,
      address,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// GET ADDRESS


const getMyAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({
      user: req.user._id,
    }).sort({
      isDefault: -1,
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: addresses.length,
      addresses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE ADDRESS

const updateAddress = async (req, res) => {
  try {
    const address = await Address.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    address.fullName =
      req.body.fullName || address.fullName;

    address.phone =
      req.body.phone || address.phone;

    address.addressLine1 =
      req.body.addressLine1 || address.addressLine1;

    address.addressLine2 =
      req.body.addressLine2 || address.addressLine2;

    address.city =
      req.body.city || address.city;

    address.state =
      req.body.state || address.state;

    address.postalCode =
      req.body.postalCode || address.postalCode;

    address.country =
      req.body.country || address.country;

    const updatedAddress = await address.save();

    res.status(200).json({
      success: true,
      address: updatedAddress,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// DELETE ADDRESS

const deleteAddress = async (req, res) => {
  try {
    const address = await Address.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    await address.deleteOne();

    res.status(200).json({
      success: true,
      message: "Address deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// SET AS DEFAULT ADDRESS

const setDefaultAddress = async (req, res) => {
  try {
    const address = await Address.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    await Address.updateMany(
      {
        user: req.user._id,
      },
      {
        isDefault: false,
      }
    );

    address.isDefault = true;

    await address.save();

    res.status(200).json({
      success: true,
      message: "Default address updated",
      address,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports={
    addAddress,
    getMyAddresses,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
    

}