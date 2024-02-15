import React, { useState } from "react";

function ContactForm() {
  const initialFormState = {
    name: "",
    email: "",
    phone: "",
    message: "",
  };

  const [form, setForm] = useState(initialFormState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      if (response.ok) {
        alert("Thank you for contacting us!");
        setForm(initialFormState);
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      alert("Error submitting form. Please try again.");
    }
  };

  return (
    <>
      <section id="contact">
        <div className="container">
          <h2 className="text-uppercase text-center text-secondary mb-0">
            Contact us
          </h2>
          <hr className="star-dark mb-5" />
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <form id="contactForm" name="sentMessage" onSubmit={handleSubmit}>
                <div className="control-group">
                  <div className="mb-0 form-floating controls pb-2">
                    <input
                      className="form-control"
                      type="text"
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Name"
                    />
                    <label className="form-label">Name</label>
                  </div>
                </div>
                <div className="control-group">
                  <div className="mb-0 form-floating controls pb-2">
                    <input
                      className="form-control"
                      type="email"
                      id="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="Email Address"
                    />
                    <label className="form-label">Email Address</label>
                  </div>
                </div>
                <div className="control-group">
                  <div className="mb-0 form-floating controls pb-2">
                    <input
                      className="form-control"
                      type="tel"
                      id="phone"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      required
                      placeholder="Phone Number"
                    />
                    <label className="form-label">Phone Number</label>
                  </div>
                </div>
                <div className="control-group">
                  <div className="mb-5 form-floating controls pb-2">
                    <textarea
                      className="form-control"
                      id="message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      placeholder="Message"
                      style={{ height: "150px" }}
                    />
                    <label className="form-label">Message</label>
                  </div>
                </div>
                <div>
                  <button
                    className="btn btn-primary btn-xl"
                    id="sendMessageButton"
                    type="submit"
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ContactForm;
