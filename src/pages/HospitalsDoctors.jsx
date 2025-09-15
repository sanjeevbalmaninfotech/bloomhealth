import { useState } from "react";
import { FormControl, InputLabel, MenuItem, Select, Card } from "@mui/material";

export default function HospitalsDoctors() {
  const [specialty, setSpecialty] = useState('');

  const specialties = [
    { value: '', label: 'Select Specialty' },
    { value: 'cardiology', label: 'Cardiology' },
    { value: 'neurology', label: 'Neurology' },
    { value: 'orthopedics', label: 'Orthopedics' },
    { value: 'pediatrics', label: 'Pediatrics' },
    { value: 'dermatology', label: 'Dermatology' },
  ];

  const doctors = [
    { id: 1, name: "Dr. John Doe", specialty: "Cardiology", image: "https://randomuser.me/api/portraits/men/32.jpg" },
    { id: 2, name: "Dr. Jane Smith", specialty: "Neurology", image: "https://randomuser.me/api/portraits/women/44.jpg" },
    { id: 3, name: "Dr. Michael Brown", specialty: "Orthopedics", image: "https://randomuser.me/api/portraits/men/55.jpg" },
    { id: 4, name: "Dr. Emily Davis", specialty: "Pediatrics", image: "https://randomuser.me/api/portraits/women/65.jpg" },
    { id: 5, name: "Dr. Robert Wilson", specialty: "Dermatology", image: "https://randomuser.me/api/portraits/men/75.jpg" },
    { id: 6, name: "Dr. Sarah Johnson", specialty: "Cardiology", image: "https://randomuser.me/api/portraits/women/25.jpg" },
    { id: 7, name: "Dr. David Miller", specialty: "Neurology", image: "https://randomuser.me/api/portraits/men/85.jpg" },
    { id: 8, name: "Dr. Laura Martinez", specialty: "Orthopedics", image: "https://randomuser.me/api/portraits/women/95.jpg" },
  ];

  const handleChange = (event) => {
    setSpecialty(event.target.value);
  };

  const filteredDoctors = specialty
  ? doctors.filter((doc) => doc.specialty.toLowerCase() === specialty.toLowerCase())
  : doctors;
  
  return (
    <div>
      {/* Top bar */}
      <div className='bg-blue-500 border-b border-gray-300 py-3 px-4 sm:px-6'>
        <h2 className='text-xl sm:text-2xl md:text-3xl lg:text-[30px] font-semibold text-white sm:ml-6 lg:ml-12'>
          Meet Our Doctors
        </h2>
      </div>

      {/* Main content */}
      <div className='container mx-auto py-6 sm:py-10 px-4 sm:px-6 lg:px-8 text-center'>
        {/* Material UI Dropdown */}
        <div className='mb-8 flex justify-center'>
        <FormControl sx={{ width: '100%', maxWidth: 450 }}>
            <InputLabel id='specialty-label'>All Doctors</InputLabel>
            <Select
            labelId='specialty-label'
            value={specialty}
            onChange={handleChange}
            label='Specialty'
            >
            {specialties?.map((s) => (
                <MenuItem key={s.value} value={s.value}>
                {s.label}
                </MenuItem>
            ))}
            </Select>
        </FormControl>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:px-0">
        {filteredDoctors?.map((doc) => (
          <div
            key={doc.id}
            className="flex flex-col items-center text-center"
          >
            <Card className="overflow-hidden shadow-lg w-full max-w-xs group">
              <div className="relative w-full aspect-[4/5]">
                <img
                  src={doc.image}
                  alt={doc.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Blue gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </Card>
            <div className="mb-8">
              <h3 className="font-bold text-lg">{doc.name}</h3>
              <p className="text-gray-500 text-sm">{doc.specialty}</p>
            </div>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
}
