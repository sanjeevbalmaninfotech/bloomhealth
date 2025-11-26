
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

const ContactUsForm = ({
  formFields = [
    { label: 'Full Name', type: 'text', placeholder: 'Enter your full name', name: 'name' },
    { label: 'Email', type: 'email', placeholder: 'Enter your email', name: 'email' },
    { label: 'Phone', type: 'tel', placeholder: 'Enter your phone number', name: 'phone' },
    { label: 'Message', type: 'textarea', placeholder: 'Enter your message', name: 'message' },
  ],
  onSubmit,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    if (onSubmit) onSubmit(data);
    else console.log('Form submitted:', data);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='space-y-6 p-8 bg-white rounded-xl shadow-lg'
    >
      <h3 className='text-2xl font-semibold text-foreground mb-6'>
        Register Your Interest
      </h3>

      {/* Dynamic Fields */}
      {formFields.map(({ label, type, placeholder, name }) => (
        <div key={name}>
          <label
            htmlFor={name}
            className='block text-sm font-medium text-foreground mb-1'
          >
            {label}
          </label>
          {type === 'text' || type === 'email' || type === 'tel' ? (
            <Input
              type={type}
              id={name}
              name={name}
              placeholder={placeholder}
              className='w-full rounded-md'
            />
          ) : (
            <Textarea
              id={name}
              name={name}
              rows={4}
              placeholder={placeholder}
              className='w-full rounded-md'
            />
          )}
        </div>
      ))}

      {/* Appointment Type */}
      {/* <div>
        <label
          htmlFor='appointmentType'
          className='block text-sm font-medium text-foreground mb-1'
        >
          Type of Appointment
        </label>
        <select
          id='appointmentType'
          name='appointmentType'
          className='w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-primary'
        >
          <option value=''>Select type</option>
          <option value='general'>General Consultation</option>
          <option value='specialist'>Specialist Consultation</option>
          <option value='urgent'>Urgent Care</option>
          <option value='other'>Other</option>
        </select>
      </div> */}

      {/* Preferred Date and Time */}
      {/* <div className='flex flex-col sm:flex-row gap-4'>
        <div className='flex-1'>
          <label
            htmlFor='preferredDate'
            className='block text-sm font-medium text-foreground mb-1'
          >
            Preferred Date
          </label>
          <Input
            type='date'
            id='preferredDate'
            name='preferredDate'
            className='w-full rounded-md'
          />
        </div>
        <div className='flex-1'>
          <label
            htmlFor='preferredTime'
            className='block text-sm font-medium text-foreground mb-1'
          >
            Preferred Time
          </label>
          <Input
            type='time'
            id='preferredTime'
            name='preferredTime'
            className='w-full rounded-md'
          />
        </div>
      </div> */}

      {/* Submit Button */}
      <Button
        type='submit'
        size='lg'
        className='w-full bg-primary hover:bg-primary/90 text-white rounded-full shadow-md py-3'
      >
        Submit Request
      </Button>
    </form>
  );
};

export default ContactUsForm;
