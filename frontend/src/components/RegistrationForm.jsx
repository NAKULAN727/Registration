import React, { useState } from 'react';
import { User, Plane, PhoneCall, HeartPulse, Users, Plus, Trash2 } from 'lucide-react';
import WalletConnect from './WalletConnect';
import './RegistrationForm.css';

const RegistrationForm = ({ onSubmit, isSubmitting, walletAddress, onConnectWallet, isConnecting }) => {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    age: '',
    dob: '',
    nationality: '',
    govtId: '',
    govtIdType: '',
    contactNumber: '',
    email: '',
    permanentAddress: '',
    arrivalDate: '',
    departureDate: '',
    accommodation: '',
    accommodationType: '',
    plannedItinerary: '',
    transportMode: '',
    travelInsuranceId: '',
    localEmergencyContact: '',
    localEmergencyPhone: '',
    familyEmergencyContact: '',
    familyEmergencyPhone: '',
    medicalEmergencyContact: '',
    medicalEmergencyPhone: '',
    bloodGroup: '',
    medicalConditions: '',
    specialAssistance: '',
    familyMembers: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFamilyMemberChange = (index, field, value) => {
    const updatedMembers = [...formData.familyMembers];
    updatedMembers[index][field] = value;
    setFormData(prev => ({ ...prev, familyMembers: updatedMembers }));
  };

  const addFamilyMember = () => {
    setFormData(prev => ({
      ...prev,
      familyMembers: [...prev.familyMembers, { name: '', passport: '', nationality: '', age: '' }]
    }));
  };

  const removeFamilyMember = (index) => {
    const updatedMembers = formData.familyMembers.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, familyMembers: updatedMembers }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="registration-form glass-panel" onSubmit={handleSubmit}>
      {/* Tourist Identity */}
      <section className="form-section">
        <h3 className="form-section-title">
          <User size={24} /> Tourist Identity
        </h3>
        <div className="form-grid">
          <div className="input-group">
            <label>Full Name *</label>
            <input type="text" className="input-field" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>Gender *</label>
            <select className="input-field" name="gender" value={formData.gender} onChange={handleChange} required>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="input-group">
            <label>Age</label>
            <input type="number" className="input-field" name="age" value={formData.age} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label>Date of Birth *</label>
            <input type="date" className="input-field" name="dob" value={formData.dob} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>Nationality *</label>
            <input type="text" className="input-field" name="nationality" value={formData.nationality} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>Govt ID Type *</label>
            <select className="input-field" name="govtIdType" value={formData.govtIdType} onChange={handleChange} required>
              <option value="">Select Type</option>
              <option value="Passport">Passport</option>
              <option value="National ID">National ID</option>
              <option value="Driver License">Driver's License</option>
            </select>
          </div>
          <div className="input-group">
            <label>Govt ID Number *</label>
            <input type="text" className="input-field" name="govtId" value={formData.govtId} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>Contact Number *</label>
            <input type="tel" className="input-field" name="contactNumber" value={formData.contactNumber} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>Email Address *</label>
            <input type="email" className="input-field" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="input-group full-width">
            <label>Permanent Address</label>
            <textarea className="input-field" name="permanentAddress" value={formData.permanentAddress} onChange={handleChange} rows="2"></textarea>
          </div>
        </div>
      </section>

      {/* Trip Information */}
      <section className="form-section">
        <h3 className="form-section-title">
          <Plane size={24} /> Trip Information
        </h3>
        <div className="form-grid">
          <div className="input-group">
            <label>Arrival Date *</label>
            <input type="date" className="input-field" name="arrivalDate" value={formData.arrivalDate} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>Departure Date *</label>
            <input type="date" className="input-field" name="departureDate" value={formData.departureDate} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>Accommodation Name *</label>
            <input type="text" className="input-field" name="accommodation" value={formData.accommodation} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>Accommodation Type</label>
            <select className="input-field" name="accommodationType" value={formData.accommodationType} onChange={handleChange}>
              <option value="">Select Type</option>
              <option value="Hotel">Hotel</option>
              <option value="Hostel">Hostel</option>
              <option value="Resort">Resort</option>
              <option value="Airbnb">Airbnb/Rental</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="input-group">
            <label>Mode of Transport</label>
            <input type="text" className="input-field" name="transportMode" value={formData.transportMode} onChange={handleChange} placeholder="e.g. Flight, Train" />
          </div>
          <div className="input-group">
            <label>Travel Insurance ID</label>
            <input type="text" className="input-field" name="travelInsuranceId" value={formData.travelInsuranceId} onChange={handleChange} />
          </div>
          <div className="input-group full-width">
            <label>Planned Itinerary</label>
            <textarea className="input-field" name="plannedItinerary" value={formData.plannedItinerary} onChange={handleChange} rows="2" placeholder="Brief description of places to visit"></textarea>
          </div>
        </div>
      </section>

      {/* Emergency Contacts */}
      <section className="form-section">
        <h3 className="form-section-title">
          <PhoneCall size={24} /> Emergency Contacts
        </h3>
        <div className="form-grid">
          <div className="input-group">
            <label>Local Emergency Contact</label>
            <input type="text" className="input-field" name="localEmergencyContact" value={formData.localEmergencyContact} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label>Local Emergency Phone</label>
            <input type="tel" className="input-field" name="localEmergencyPhone" value={formData.localEmergencyPhone} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label>Family Emergency Contact *</label>
            <input type="text" className="input-field" name="familyEmergencyContact" value={formData.familyEmergencyContact} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>Family Emergency Phone *</label>
            <input type="tel" className="input-field" name="familyEmergencyPhone" value={formData.familyEmergencyPhone} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>Medical Contact / Doctor</label>
            <input type="text" className="input-field" name="medicalEmergencyContact" value={formData.medicalEmergencyContact} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label>Medical Phone</label>
            <input type="tel" className="input-field" name="medicalEmergencyPhone" value={formData.medicalEmergencyPhone} onChange={handleChange} />
          </div>
        </div>
      </section>

      {/* Health & Safety */}
      <section className="form-section">
        <h3 className="form-section-title">
          <HeartPulse size={24} /> Health & Safety
        </h3>
        <div className="form-grid">
          <div className="input-group">
            <label>Blood Group</label>
            <select className="input-field" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange}>
              <option value="">Select Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>
          <div className="input-group full-width">
            <label>Medical Conditions / Allergies</label>
            <textarea className="input-field" name="medicalConditions" value={formData.medicalConditions} onChange={handleChange} rows="2" placeholder="List any important medical conditions"></textarea>
          </div>
          <div className="input-group full-width">
            <label>Special Assistance Required</label>
            <input type="text" className="input-field" name="specialAssistance" value={formData.specialAssistance} onChange={handleChange} placeholder="e.g. Wheelchair access" />
          </div>
        </div>
      </section>

      {/* Family Members */}
      <section className="form-section">
        <h3 className="form-section-title">
          <Users size={24} /> Accompanying Family Members
        </h3>
        {formData.familyMembers.map((member, index) => (
          <div key={index} className="family-member-row glass-panel-inner">
            <div className="form-grid">
              <div className="input-group">
                <label>Name</label>
                <input type="text" className="input-field" value={member.name} onChange={(e) => handleFamilyMemberChange(index, 'name', e.target.value)} required />
              </div>
              <div className="input-group">
                <label>Passport/ID</label>
                <input type="text" className="input-field" value={member.passport} onChange={(e) => handleFamilyMemberChange(index, 'passport', e.target.value)} required />
              </div>
              <div className="input-group">
                <label>Nationality</label>
                <input type="text" className="input-field" value={member.nationality} onChange={(e) => handleFamilyMemberChange(index, 'nationality', e.target.value)} required />
              </div>
              <div className="input-group">
                <label>Age</label>
                <input type="number" className="input-field" value={member.age} onChange={(e) => handleFamilyMemberChange(index, 'age', e.target.value)} required />
              </div>
            </div>
            <button type="button" className="btn btn-outline btn-remove" onClick={() => removeFamilyMember(index)}>
              <Trash2 size={18} /> Remove
            </button>
          </div>
        ))}
        <button type="button" className="btn btn-outline btn-add" onClick={addFamilyMember}>
          <Plus size={18} /> Add Family Member
        </button>
      </section>

      <div className="form-submit-container">
        <div className="wallet-prompt-inline glass-panel-inner">
          <div className="wallet-prompt-text">
            <p><strong>Already have a MetaMask wallet?</strong> Login to link your registration.</p>
            <p className="wallet-subtitle-small">(Otherwise, just submit and we'll auto-generate a secure Smart ID for you)</p>
          </div>
          <div className="wallet-action-box">
            <WalletConnect 
              onConnect={onConnectWallet} 
              address={walletAddress} 
              isConnecting={isConnecting} 
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary btn-submit" disabled={isSubmitting}>
            {isSubmitting ? 'Processing Transaction...' : 'Submit Registration'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default RegistrationForm;
