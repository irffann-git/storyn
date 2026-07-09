const Contact = require ("../models/contact.js");
const transporter = require ("../config/mailer.js");

// @desc    Submit a contact form message
// @route   POST /api/contact
// @access  Public
const submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "Name, email and message are required" });
    }

    const contact = await Contact.create({ name, email, subject, message });

    res.status(201).json({
      message: "Your message has been sent successfully",
      contact,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to submit message" });
  }
};

// @desc    Get all contact messages (admin)
// @route   GET /api/contact
// @access  Admin
const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to fetch messages" });
  }
};

// @desc    Get single contact message + mark as read (admin)
// @route   GET /api/contact/:id
// @access  Admin
const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: "Message not found" });
    }

    if (!contact.isRead) {
      contact.isRead = true;
      await contact.save();
    }

    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to fetch message" });
  }
};

// @desc    Mark a contact message as read (admin)
// @route   PUT /api/contact/:id/read
// @access  Admin
const markContactAsRead = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: "Message not found" });
    }

    contact.isRead = true;
    await contact.save();

    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to update message" });
  }
};

// @desc    Reply to a contact message via email (admin)
// @route   POST /api/contact/:id/reply
// @access  Admin
const replyToContact = async (req, res) => {
  try {
    const { replyMessage } = req.body;

    if (!replyMessage || !replyMessage.trim()) {
      return res.status(400).json({ message: "Reply message cannot be empty" });
    }

    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: "Message not found" });
    }

    await transporter.sendMail({
      from: `"Storyn Bookstore" <${process.env.EMAIL_USER}>`,
      to: contact.email,
      subject: `Re: ${contact.subject || "Your inquiry"}`,
      text: replyMessage,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <p>Hi ${contact.name},</p>
          <p>${replyMessage.replace(/\n/g, "<br/>")}</p>
          <hr style="margin: 24px 0; border: none; border-top: 1px solid #eee;" />
          <p style="color: #888; font-size: 13px;">
            This is a reply to your message: "${contact.message}"
          </p>
          <p style="color: #37400B; font-weight: bold;">— Storyn Bookstore</p>
        </div>
      `,
    });

    contact.isReplied = true;
    contact.isRead = true;
    await contact.save();

    res.status(200).json({ message: "Reply sent successfully", contact });
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to send reply" });
  }
};

// @desc    Delete a contact message (admin)
// @route   DELETE /api/contact/:id
// @access  Admin
const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: "Message not found" });
    }

    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to delete message" });
  }
};

module.exports = {
  submitContact,
  getContacts,
  getContactById,
  markContactAsRead,
  replyToContact,
  deleteContact
};