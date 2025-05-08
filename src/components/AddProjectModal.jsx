import React, { useState } from "react";
import "../styles/modal.css";

const AddProjectModal = ({ onClose, onAdd }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    projectType: "",
    projectSubType: "",
    objectType: "",
    postalCode: "",
    location: "",
    street: "",
    houseNumber: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateStep = () => {
    let newErrors = {};
    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = "Project name is required";
      if (!formData.projectType.trim())
        newErrors.projectType = "Project type is required";
      if (!formData.projectSubType.trim())
        newErrors.projectSubType = "Project subtype is required";
    } else if (step === 2) {
      if (!formData.objectType.trim())
        newErrors.objectType = "Object type is required";
      if (!formData.postalCode.trim())
        newErrors.postalCode = "Postal code is required";
      if (!formData.location.trim())
        newErrors.location = "Location is required";
      if (!formData.street.trim()) newErrors.street = "Street is required";
      if (!formData.houseNumber.trim())
        newErrors.houseNumber = "House Number is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) setStep(2);
  };

  const handleBack = () => setStep(1);

  const handleSubmit = () => {
    if (validateStep()) {
      onAdd(formData);
      onClose();
    }
  };

  const getButtonClass = (value, selected) =>
    `btn w-100 text-white fw-bold shadow-sm ${
      selected === value ? "bg-secondary btn-selected" : "bg-secondary"
    }`;

  const LeftPanel = () => (
    <div className="left-panel">
      <div className="section">
        <h3>1) Project type</h3>
        <div className="detail">
          <div>PROJECT TYPE</div>
          <div>{formData.projectType || "-"}</div>
        </div>
        <div className="detail">
          <div>PROJECT SUBTYPE</div>
          <div>{formData.projectSubType || "-"}</div>
        </div>
      </div>
      <div className="section">
        <h3>2) Address</h3>
        <div className="detail">
          <div>OBJECT TYPE</div>
          <div>{formData.objectType || "-"}</div>
        </div>
        <div className="detail">
          <div>POSTAL CODE</div>
          <div>{formData.postalCode || "-"}</div>
        </div>
        <div className="detail">
          <div>LOCATION</div>
          <div>{formData.location || "-"}</div>
        </div>
        <div className="detail">
          <div>STREET</div>
          <div>{formData.street || "-"}</div>
        </div>
        <div className="detail">
          <div>HOUSE NUMBER</div>
          <div>{formData.houseNumber || "-"}</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="modal-close" onClick={onClose}>
          ✖
        </button>
        <LeftPanel />
        <div className="right-content">
          {step === 1 && (
            <>
              <h3 className="step-title">Create new project</h3>
              <div className="form-section">
                <h4>Project Name *</h4>
                    <input
                      type="text"
                      name="name"
                      className="col-12"
                      value={formData.name}
                      onChange={handleChange}
                    />
                {errors.name && <div className="error">{errors.name}</div>}
              </div>

              <div className="form-section">
                <h4>Select a project type*</h4>
                <div className="row g-2">
                  <div className="col-6">
                    <button
                      type="button"
                      className={getButtonClass(
                        "Inventory",
                        formData.projectType
                      )}
                      onClick={() =>
                        setFormData({ ...formData, projectType: "Inventory" })
                      }
                    >
                      Inventory
                    </button>
                  </div>
                  <div className="col-6">
                    <button
                      type="button"
                      className={getButtonClass(
                        "Construction projects",
                        formData.projectType
                      )}
                      onClick={() =>
                        setFormData({
                          ...formData,
                          projectType: "Construction projects",
                        })
                      }
                    >
                      Construction projects
                    </button>
                  </div>
                  {errors.projectType && (
                    <div className="error">{errors.projectType}</div>
                  )}
                </div>
              </div>

              <div className="form-section">
                <h4>Select a project subtype*</h4>
                <div className="row g-2">
                  <div className="col-6">
                    <button
                      type="button"
                      className={getButtonClass(
                        "Free",
                        formData.projectSubType
                      )}
                      onClick={() =>
                        setFormData({ ...formData, projectSubType: "Free" })
                      }
                    >
                      Free
                    </button>
                  </div>
                  <div className="col-6">
                    <button
                      type="button"
                      className={getButtonClass(
                        "Insurance claim",
                        formData.projectSubType
                      )}
                      onClick={() =>
                        setFormData({
                          ...formData,
                          projectSubType: "Insurance claim",
                        })
                      }
                    >
                      Insurance claim
                    </button>
                  </div>
                  {errors.projectSubType && (
                    <div className="error">{errors.projectSubType}</div>
                  )}
                </div>
              </div>

              <div className="buttonGroup">
                <button onClick={handleNext} className="btn btn-primary">
                  Next
                </button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h3 className="step-title">Create new project</h3>
              <div className="form-section">
                <h4>Describe the inventory object</h4>
                <select
                  className="form-select"
                  name="objectType"
                  value={formData.objectType}
                  onChange={handleChange}
                >
                  <option value="Not Specified">Not Specified</option>
                  <option value="Type 1">Type 1</option>
                  <option value="Type 2">Type 2</option>
                </select>
                {errors.objectType && (
                  <div className="error">{errors.objectType}</div>
                )}
              </div>

              <div className="form-section">
                <h4>Complete the address of the object</h4>
                <div className="row g-2">
                  <div className="col-3">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingPostalCode"
                        placeholder="Postal Code"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                      />
                      <label htmlFor="floatingPostalCode">Postal Code *</label>
                      {errors.postalCode && (
                        <div className="error">{errors.postalCode}</div>
                      )}
                    </div>
                  </div>
                  <div className="col-9">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingLocation"
                        placeholder="Location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                      />
                      <label htmlFor="floatingLocation">Location *</label>
                      {errors.location && (
                        <div className="error">{errors.location}</div>
                      )}
                    </div>
                  </div>
                  <div className="col-9">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingStreet"
                        placeholder="Street"
                        name="street"
                        value={formData.street}
                        onChange={handleChange}
                      />
                      <label htmlFor="floatingStreet">Street *</label>
                      {errors.street && (
                        <div className="error">{errors.street}</div>
                      )}
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingHouseNumber"
                        placeholder="House Number"
                        name="houseNumber"
                        value={formData.houseNumber}
                        onChange={handleChange}
                      />
                      <label htmlFor="floatingHouseNumber">House no. *</label>
                      {errors.houseNumber && (
                        <div className="error">{errors.houseNumber}</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="buttonGroup">
                <button onClick={handleBack} className="btn btn-secondary">
                  Back
                </button>
                <button onClick={handleSubmit} className="btn btn-primary">
                  Save Project
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddProjectModal;
