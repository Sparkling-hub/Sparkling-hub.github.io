import React, { ChangeEvent, useEffect } from "react";
import Input from "../ui/input-component/input";
import TextArea from "../ui/text-area-component/text-area";
import Submit from "../ui/input-sumbit-component";
import Select from "../ui/select-component";
import { sendContactForm } from "../../lib/api";
import Link from "next/link";
import ReCAPTCHA from "../reCAPTCHA";
import rolesData from '@/data/data-contact/data-contact';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectForm,
  setFormData,
  setCheck,

  setCheckFormByKey,
  resetCheckForm,
  resetFormData
} from '@/store/redusers/FormSliceReduser';
import {
  selectNavigation,

} from '@/store/redusers/navigationReducer';
const Form: React.FC = () => {
  const dispatch = useDispatch();

  const { formData, check, checkForm } = useSelector(selectForm);

  const { lastPageSlug } = useSelector(selectNavigation);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    dispatch(setFormData({
      ...formData,
      [name]: value,
    }));

    dispatch(setCheckFormByKey({ key: name as any, value: '' }));

    if (name === "email") {
      dispatch(setCheck(null));
    }

  };
  useEffect(() => {

    dispatch(resetFormData());
    dispatch(resetCheckForm())
    dispatch(setFormData({
      ...formData,
      ['vacancy']: 'Contact Us',
    }));
    dispatch(setFormData({
      ...formData,
      select: rolesData[lastPageSlug]
    }));

  }, []);


  return (
    <form
      method="post"
      id="rec_form"
      action=""
      encType="multipart/form-data"
      className="form flex flex-col lg:flex-row items-center w-full m-auto relative"
    >
      <div className="flex flex-col w-full sm:w-4/5 lg:w-3/5 m-3">


        <Input
          type="text"
          name="name"
          value={formData.name}
          placeholder="Full Name"
          onChange={handleInputChange}
          checked={checkForm.name.length > 0}
        />

        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Email"
          checked={check === false && checkForm.email.length > 0 || check === false}
        />

        <Input
          type="text"
          name="company"
          value={formData.company}
          placeholder="Company"
          onChange={handleInputChange}

        />
        <Select name="select"
          value={formData.select}
          onChange={handleInputChange} />


        <TextArea
          name="message"
          placeholder="Tell us about your project and goals"
          value={formData.message}
          onChange={handleInputChange}
          checked={checkForm.message.length > 0}
        />
        <div className="w-full m-auto flex justify-center">
          <ReCAPTCHA></ReCAPTCHA>

        </div>

        <br />

        <div className="w-fit m-auto relative">
          <Submit
            type="submit"
            name="submit"

            disabled={!!(formData.name && formData.email && formData.message && formData.recaptcha)}

            onClick={sendContactForm} requiredKeys={['name', 'email', 'message','recaptcha']}

          />
        </div>

      </div>
      <Link href="mailto:l.arthofer@sparkling.co.com" target="_blank"
        className="blank m-10 bg-white rounded-md text-left rounded-lg justify-center flex flex-col h-26 w-[300px] bg-teal-900">
        <div className="p-6 flex justify-between items-center pr-1">
          <div>
            <p className="text-3xl text-black font-normal">
              Prefer Email?
            </p>
            <p className="text-2xl text-primary-darkTeal mt-5 font-normal">
              Drop us a line
            </p>
          </div>
          <div className="flex flex-wrap">
            <svg className="flex h-10 w-10" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16,21a1,1,0,0,1-.71-.29l-8-8a1,1,0,1,1,1.42-1.42L16,18.59l7.29-7.3a1,1,0,0,1,1.42,1.42l-8,8A1,1,0,0,1,16,21Z"
                fill="#008080">
              </path>
            </svg>
          </div>
        </div>
      </Link>
    </form>
  );
};

export default Form;
