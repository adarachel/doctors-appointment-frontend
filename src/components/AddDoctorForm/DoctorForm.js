import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addDoctor } from '../../redux/doctors/doctorsSlice';

const DoctorForm = () => {
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [photo, setPhoto] = useState('');
  const [fee, setFee] = useState(''); // Assuming this is for the consultant's fee
  const [specialization, setSpecialization] = useState(''); // Assuming this is for the specialization
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const status = useSelector((state) => state.doctors.status);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name && about && fee && specialization && photo) {
      try {
        await dispatch(addDoctor({
          name,
          bio: about, // Assuming this is for the bio
          profile_pic: photo, // Assuming this is for the photo URL
          consultation_fee: fee, // Assuming this is for the consultant's fee
          specialization,
        }));
        navigate('/home');
        setName('');
        setAbout('');
        setPhoto('');
        setFee('');
        setSpecialization('');
      } catch (error) {
        setError('Failed to add doctor. Please try again.');
      }
    } else {
      setError('Please fill in all the required fields.');
    }
  };

  return (
    <div className="form-container">
      {/* Your Lottie animation embed */}
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <input type="text" value={photo} onChange={(e) => setPhoto(e.target.value)} placeholder="Photo (URL)" />
        <input type="number" value={fee} onChange={(e) => setFee(e.target.value)} placeholder="Consultant's Fee" />
        <input type="text" value={specialization} onChange={(e) => setSpecialization(e.target.value)} placeholder="Specialization" />
        <textarea type="text" value={about} onChange={(e) => setAbout(e.target.value)} placeholder="About" />
        <button type="submit" disabled={status === 'loading'}>
          Add Doctor
        </button>
      </form>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default DoctorForm;
