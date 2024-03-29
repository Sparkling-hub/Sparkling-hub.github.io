import { selectForm, setFormData } from "@/store/redusers/FormSliceReduser";
import ReCAPTCHA from "react-google-recaptcha";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { getKey } from "../../lib/api";

const reCAPTCHA: React.FC = () => {
  const [key, setKey] = useState(''); 
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const dispatch = useDispatch();
  const { formData } = useSelector(selectForm);
  
  useEffect(() => {
    
    const handleReset = () => {
      console.log(formData.recaptcha)
      if (recaptchaRef.current && (formData.recaptcha)=='') {
        recaptchaRef.current.reset(); 
      }
    };
    handleReset()
    const fetchKey = async () => {
      try {
        const siteKey = await getKey(); 
        setKey(siteKey); 
      } catch (error) {

  
      }
    };

    fetchKey();
  }, [formData.recaptcha]);

 
  return (
    <div>
      {key && ( 
        <ReCAPTCHA
        ref={recaptchaRef}
          className="g-recaptcha"
          sitekey={key}
          onChange={(value) => dispatch(setFormData({ ...formData, recaptcha: value }))}
        />
      )}
    </div>
  );
};



export default reCAPTCHA