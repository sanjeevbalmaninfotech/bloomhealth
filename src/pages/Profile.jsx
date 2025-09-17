import { Mail, Phone, Calendar, LogOut, User, MapPin, Save, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useUserDetailsQuery } from '../services/userAPI';
import Loader from '../utils/Loader';
import { SelectField } from '../utils/Select';
import { InputField } from '../utils/InputFields';

export default function ProfilePage() {
  const navigate = useNavigate();
  const profileData = useSelector((state) => state?.userSlice?.user);

  // Hook calling for user details
  const { data: userDetails, isLoading } = useUserDetailsQuery();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(profileData || {});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (userDetails) {
      setFormData(profileData);
    }
  }, [userDetails]);

  // handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name?.includes('address.')) {
      const key = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [key]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = () => {
    // Here you can call API to save data
    toast.success('Profile updated successfully!');
    setIsEditing(false);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    navigate('/');
    toast.success('Logged out successfully!');
  };

  if (!formData) return null;

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Top Banner / Profile Header */}
      <div className='bg-[#157fc1] text-white py-2 px-6 shadow-md'>
        <div className='max-w-5xl mx-auto flex flex-col md:flex-row items-center md:items-end gap-6'>
          <div className='w-16 h-16 rounded-full bg-white text-[#157fc1] flex items-center justify-center text-2xl font-bold shadow-md'>
            {formData?.firstName?.[0]}
            {formData?.lastName?.[0]}
          </div>
          <div className='mb-4'>
            <span className='text-white text-2xl'>
              {formData?.firstName} {formData?.lastName}
            </span>
          </div>
        </div>
      </div>

      {/* Profile Details Section */}
      <div className='max-w-5xl mx-auto px-6 py-10'>
        <div className='flex mb-3 justify-between'>
          <h2 className='text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2'>
            <User className='h-5 w-5 text-[#157fc1]' /> Profile Details
          </h2>
          <div className='flex gap-2'>
            {isEditing ? (
              <button
                onClick={handleSave}
                className='bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition flex items-center gap-2'
              >
                <Save className='h-4 w-4' /> Save
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className='bg-[#157fc1] text-white px-3 py-1 rounded-full hover:bg-[#11679c] transition flex items-center gap-2'
              >
                <Edit className='h-4 w-4' /> Edit Profile
              </button>
            )}
            <button
              onClick={handleLogout}
              className='border border-red-500 text-red-500 px-5 py-2 rounded-full hover:bg-red-50 transition flex items-center gap-2'
            >
              <LogOut className='h-4 w-4' />
              Logout
            </button>
          </div>
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {/* Username */}
              <InputField
                label='Username'
                name='username'
                value={formData?.username}
                onChange={handleChange}
                isEditing={isEditing}
              />

              {/* Email */}
              <InputField
                label='Email'
                name='email'
                value={formData?.email}
                onChange={handleChange}
                isEditing={isEditing}
                icon={<Mail className='h-5 w-5 text-[#157fc1]' />}
              />

              {/* Phone */}
              <InputField
                label='Phone Number'
                name='phoneNumber'
                value={formData?.phoneNumber}
                onChange={handleChange}
                isEditing={isEditing}
                icon={<Phone className='h-5 w-5 text-[#157fc1]' />}
              />

              {/* Gender */}
              <SelectField
                label="Gender"
                name="gender"
                value={formData?.gender}
                onChange={handleChange}
                isEditing={isEditing}
                options={["Male", "Female", "Other"]}
              />

              {/* Created At */}
              <div className='flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm'>
                <Calendar className='h-5 w-5 text-[#157fc1]' />
                <span className='text-gray-700'>
                  Joined: {new Date(formData?.createdAt).toLocaleDateString()}
                </span>
              </div>

              {/* Address */}
              <div className='col-span-1 md:col-span-2 bg-white p-4 rounded-lg shadow-sm'>
                <h3 className='text-gray-800 font-semibold mb-2 flex items-center gap-2'>
                  <MapPin className='h-5 w-5 text-[#157fc1]' /> Address
                </h3>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  {['street', 'city', 'state', 'zip', 'country'].map((field) => (
                    <InputField
                      key={field}
                      label={field?.charAt(0).toUpperCase() + field?.slice(1)}
                      name={`address.${field}`}
                      value={formData?.address?.[field] || ''}
                      onChange={handleChange}
                      isEditing={isEditing}
                    />
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
