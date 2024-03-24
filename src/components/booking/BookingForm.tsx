import React, {
  useState,
  ChangeEvent,
  FormEvent,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { useLocation } from "react-router-dom";
import Button from "../reusable/Button";
import FormInput from "../reusable/FormInput";
import { fetchData } from "../../utils/api";
import useDebounce from "../../hooks/useDebounce";
import Select, { ValueType } from "react-select";

interface BookingFormData {
  name: string;
  phone: string;
  age: string;
  city: string;
  company: string;
  chiefComplaints: string;
  previousExperience: boolean;
}

interface DoctorData {
  name: string;
  imageSrc: string;
}

interface BookingFormProps {
  onFormDataSubmit: (formData: BookingFormData) => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ onFormDataSubmit }) => {
  const initialFormData: BookingFormData = useMemo(
    () => ({
      name: "",
      phone: "",
      age: "",
      city: "",
      company: "",
      chiefComplaints: "",
      previousExperience: false,
    }),
    []
  );

  const [formData, setFormData] = useState<BookingFormData>(initialFormData);
  const [doctorData, setDoctorData] = useState<DoctorData[]>([]);
  const [selectedDoctor, setSelectedDoctor] =
    useState<ValueType<{ value: string; label: React.ReactNode }, false>>(null);
  const [selectedDoctorValue, setSelectedDoctorValue] = useState<string>("");
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const queryCity = searchParams.get("city");
    if (queryCity) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        city: queryCity,
      }));
    }
  }, [location.search]);

  const debouncedCity = useDebounce(formData.city, 500);

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const doctorForCity = await fetchData(debouncedCity);
        const doctorData = doctorForCity.map((doctor) => ({
          name: doctor.name,
          imageSrc: doctor.imageSrc,
        }));
        setDoctorData(doctorData);
        // console.log(`Data for ${debouncedCity}:`, doctorForCity);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchDataFromApi();
  }, [debouncedCity]);

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value, type } = e.target;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]:
          type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
      }));
    },
    []
  );

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (
        formData.name.trim() === "" ||
        formData.phone.trim() === "" ||
        formData.age.trim() === "" ||
        formData.city.trim() === "" ||
        formData.company.trim() === ""
      ) {
        alert("Please fill in all required fields");
      } else if (
        initialFormData.name !== formData.name ||
        initialFormData.phone !== formData.phone ||
        initialFormData.city !== formData.city ||
        initialFormData.company !== formData.company
      ) {
        try {
          const submittedData = {
            ...formData,
            selectedDoctor: selectedDoctorValue,
          };
          onFormDataSubmit(submittedData);
          alert("You have booked your appointment");
          setFormData(initialFormData);
          setSelectedDoctor(null);
        } catch (error) {
          console.error("Error during additional event:", error);
        }
      }
    },
    [formData, initialFormData, onFormDataSubmit, selectedDoctorValue]
  );

  const handleDoctorSelectChange = useCallback(
    (
      selectedOption: ValueType<
        { value: string; label: React.ReactNode },
        false
      >
    ) => {
      if (selectedOption) {
        setSelectedDoctor((prev) => {
          setSelectedDoctorValue(selectedOption.value);
          return selectedOption;
        });
      }
    },
    [setSelectedDoctorValue, selectedDoctor]
  );

  const doctorOptions = doctorData.map((doctor) => ({
    value: doctor.name,
    label: (
      <div className="flex items-center">
        <img
          src={doctor.imageSrc}
          alt={`${doctor.name}'s image`}
          className="w-8 h-8 rounded-full mr-2"
        />
        {doctor.name}
      </div>
    ),
  }));
  return (
    <div className="w-full">
      <div className="leading-loose">
        <form
          onSubmit={handleSubmit}
          className=" m-4 p-6 sm:p-10 bg-[#395B64] dark:bg-[#395B64] rounded-xl shadow-xl text-left"
        >
          <p className=" display-flex font-general-medium text-primary-dark dark:text-primary-light text-2xl mb-8 ">
            Booking Form
          </p>

          <FormInput
            inputLabel="Your Name"
            labelFor="name"
            type="text"
            id="name"
            name="name"
            placeholderText="Enter your Name"
            ariaLabelName="Name"
            value={formData.name}
            onChange={handleInputChange}
          />

          <FormInput
            inputLabel="Contact"
            labelFor="phone"
            type="tel"
            id="phone"
            name="phone"
            placeholderText="Enter your Phone Number"
            ariaLabelName="Phone"
            value={formData.phone}
            onChange={handleInputChange}
          />

          <FormInput
            inputLabel="Age"
            labelFor="age"
            type="number"
            id="age"
            name="age"
            placeholderText="Enter your Age"
            ariaLabelName="Age"
            value={formData.age}
            onChange={handleInputChange}
          />

          <FormInput
            inputLabel="Location"
            labelFor="city"
            type="text"
            id="city"
            name="city"
            placeholderText="Enter your City"
            ariaLabelName="City"
            value={formData.city}
            onChange={handleInputChange}
          />

          <FormInput
            inputLabel="Company"
            labelFor="company"
            type="text"
            id="company"
            name="company"
            placeholderText="Your Company"
            ariaLabelName="Company"
            value={formData.company}
            onChange={handleInputChange}
          />

          <div className="mt-6">
            <label className="block text-lg text-primary-dark dark:text-primary-light mb-2">
               Complaints
            </label>
            <textarea
              className="w-full px-5 py-2 border border-gray-300 dark:border-primary-dark border-opacity-50 text-primary-dark dark:text-secondary-light bg-ternary-light dark:bg-ternary-dark rounded-md shadow-sm text-md"
              id="chiefComplaints"
              name="chiefComplaints"
              cols={14}
              rows={6}
              aria-label="Chief Complaints"
              value={formData.chiefComplaints}
              onChange={handleInputChange}
            />
          </div>
          {parseInt(formData.age, 10) > 40 && (
            <div className="mt-6 flex gap-3 items-baseline">
              <input
                type="checkbox"
                id="previousExperience"
                name="previousExperience"
                checked={formData.previousExperience}
                onChange={handleInputChange}
              />
              <label className="block text-lg text-primary-dark dark:text-primary-light mb-2">
                Any Previous Experience with Physiotherapy
              </label>
            </div>
          )}

          <div className="mt-6">
            <Select
              options={doctorOptions}
              value={selectedDoctor}
              onChange={handleDoctorSelectChange}
              placeholder="Select a Doctor"
              isClearable
            />
          </div>

          <div className="font-general-medium w-40 px-4 py-2.5 text-white text-center font-medium tracking-wider bg-indigo-500 hover:bg-indigo-600 focus:ring-1 focus:ring-indigo-900 rounded-lg mt-6 duration-500">
            <Button title="Submit Booking" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
