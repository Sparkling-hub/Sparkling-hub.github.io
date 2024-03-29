import { selectForm, setFormData } from "@/store/redusers/FormSliceReduser";
import ReCAPTCHA from "react-google-recaptcha";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getKey } from "../../lib/api";

const reCAPTCHA: React.FC = () => {
  const [key, setKey] = useState(''); 

  useEffect(() => {
    const fetchKey = async () => {
      try {
        const siteKey = await getKey(); 
        setKey(siteKey); 
      } catch (error) {

  
      }
    };
    fetchKey();
  }, []);

  const dispatch = useDispatch();
  const { formData } = useSelector(selectForm);

  return (
    <div>
      {key && ( // Conditionally render ReCAPTCHA if key is available
        <ReCAPTCHA
          className="g-recaptcha"
          sitekey={key}
          onChange={(value) => dispatch(setFormData({ ...formData, recaptcha: value }))}
        />
      )}
    </div>
  );
};



export default reCAPTCHA