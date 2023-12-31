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
          bio: about,
          profile_pic: photo,
          consultation_fee: fee,
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
      <embed src="https://lottie.host/?file=e508658a-d3ad-4854-9809-830fd303ce38/tAnKJn1r42.json" />

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
