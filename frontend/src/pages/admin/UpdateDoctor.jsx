import { useEffect, useRef, useState } from 'react';
import { assets } from '../../assets/assets_admin/assets'
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { getDoctorById } from '../../api/doctor';

const UpdateDoctor = () => {

  const [ formData, setFormData ] = useState({
    image: assets.upload_area,
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    experience: "def",
    fee: "",
    speciality: "def",
    education: "",
    address1: "",
    address2: "",
    description: "",
  })
  
  const [ image, setImage ] = useState(assets.upload_area);
  const fileInputRef = useRef(null);
  
  const { id } = useParams();
  const {
    data: doctor,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useQuery({
    queryKey: ['doctor', id],
    queryFn: () => getDoctorById(id),
    enabled: !!id,
  })


  useEffect(() => {
    if (isSuccess && doctor) {
      setFormData({
          image: doctor.image,
          firstname: doctor.first_name,
          lastname: doctor.last_name,
          email: doctor.email,
          experience: doctor.experience,
          speciality: doctor.speciality,
          fee: doctor.fee,
          education: doctor.education,
          address1: doctor.address_line1,
          address2: doctor.address_line2,
          description: doctor.description,
      }) 
      setImage(doctor.image || assets.upload_area);
    }

  }, [isSuccess])
  
  const handleImageClick = () => {
    fileInputRef.current.click();
  }
    
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        const imgUrl = URL.createObjectURL(file);
        setImage(imgUrl);
    }
  };
    
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({...prev, [name]: value }));
  }
  
  if (isLoading) return <div>Loading</div>
  if (isError) return <div>Error: {error.message}</div>

  return (
    <main className="p-10 font-outfit w-full">
      <h2 className="font-medium text-xl text-[#323232]">Edit Doctor</h2>
      <div className="border border-[#D8D8D8] p-6 rounded-md mt-6 w-5xl">
        <form>
          <div className="flex mb-6">
            <div className='flex gap-10 items-center cursor-pointer'>
              <img
                src={image}
                alt='Profile'
                onClick={handleImageClick}
                className='rounded-full size-24 border-[#D8D8D8] border'
              />
              <input 
                type="file" 
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
              <label htmlFor="firstname" className="text-[#5D607D] text-lg w-36">Upload doctor picture</label>
            </div>
          </div>
          <div className="flex gap-10">
            <div className="flex flex-col gap-4 w-1/2">
              <div className="flex flex-col gap-2">
                <label htmlFor="firstname" className="text-[#5D607D] text-lg">Doctor Firstname</label>
                <input type="text" name="firstname" id="firstname" placeholder="John" onChange={handleChange} value={formData.firstname} className="border px-2 py-2 border-[#C1C1C1] outline-primary rounded-md w-full"/>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="lastname" className="text-[#5D607D] text-lg">Doctor Lastname</label>
                <input type="text" name="lastname" id="lastname" placeholder="Doe" onChange={handleChange} value={formData.lastname} className="border px-2 py-2 border-[#C1C1C1] outline-primary rounded-md w-full"/>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-[#5D607D] text-lg">Doctor Email</label>
                <input type="email" name="email" id="email" placeholder="john@prescripto.com" onChange={handleChange} value={formData.email} className="border px-2 py-2 border-[#C1C1C1] outline-primary rounded-md w-full"/>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="experience" className="text-[#5D607D] text-lg">Experience</label>
                <div className="border px-2 py-2 border-[#C1C1C1] rounded-md w-full">
                  <select name="experience" id="experience" onChange={handleChange} value={formData.experience} className="w-full outline-none " >
                    <option value="def" disabled >Select Experience</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">5+</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="fee" className="text-[#5D607D] text-lg">Fee</label>
                <input type="number" name="fee" id="fee" placeholder="100" onChange={handleChange} value={formData.fee} className="border px-2 py-2 border-[#C1C1C1] outline-primary rounded-md w-full"/>
              </div>
            </div>
            <div className="flex flex-col gap-4 w-1/2">
              <div className="flex flex-col gap-2">
                <label htmlFor="speciality" className="text-[#5D607D] text-lg">Speciality</label>
                <div className="border px-2 py-2 border-[#C1C1C1] rounded-md w-full">
                <select name="speciality" id="speciality" onChange={handleChange} value={formData.speciality} className="w-full outline-none " >
                    <option value="def" disabled>Select Specialty</option>
                    <option value="General Physician">General Physician</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Neurology">Neurology</option>
                    <option value="Pulmonology">Pulmonology</option>
                    <option value="Dermatology">Dermatology</option>
                    <option value="Orthopedics">Orthopedics</option>
                    <option value="Pediatrics">Pediatrics</option>
                    <option value="Oncology">Oncology</option>
                    <option value="Psychiatry">Psychiatry</option>
                    <option value="Endocrinology">Endocrinology</option>
                    <option value="Gastroenterology">Gastroenterology</option>
                    <option value="Ophthalmology">Ophthalmology</option>
                    <option value="Urology">Urology</option>
                    <option value="Nephrology">Nephrology</option>
                    <option value="Rheumatology">Rheumatology</option>
                  </select>
                </div>              
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="education" className="text-[#5D607D] text-lg">Education</label>
                <input type="text" name="education" id="education" placeholder="FCPS" onChange={handleChange} value={formData.education} className="border px-2 py-2 border-[#C1C1C1] outline-primary rounded-md w-full"/>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="address1" className="text-[#5D607D] text-lg">Address</label>
                <input type="text" name="address1" id="address1" placeholder="Dr. Ayesha Siddiqui, MBBS, FCPS" onChange={handleChange} value={formData.address1} className="border px-2 py-2 border-[#C1C1C1] outline-primary rounded-md w-full"/>
                <input type="text" name="address2" id="address2" placeholder="Suite #12, First Floor, Gulberg Plaza, Lahore" onChange={handleChange} value={formData.address2} className="border px-2 py-2 border-[#C1C1C1] outline-primary rounded-md w-full"/>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-6">
            <label htmlFor="description" className="text-[#5D607D] text-lg">Description</label>
            <textarea name="description" id="description" rows={6} placeholder="Write about doctor" onChange={handleChange} value={formData.description} className="border px-2 py-2 border-[#C1C1C1] outline-primary rounded-md w-full"/>
          </div>
          <input 
            type="submit"
            value="Update Doctor"
            className="bg-primary text-white mt-8 cursor-pointer w-fit py-3 px-7 rounded-full font-outfit text-lg flex items-center justify-center"
          />
        </form>
      </div>
    </main>
  )
}

export default UpdateDoctor;
