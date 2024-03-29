import { selectForm, setFormData } from "@/store/redusers/FormSliceReduser";
import ReCAPTCHA from "react-google-recaptcha";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { getKey } from "../../lib/api";

const Recaptcha: React.FC = () => {
  const [key, setKey] = useState('');
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  useEffect(() => {
    const fetchKey = async () => {
      try {
        const siteKey = await getKey();
        setKey(siteKey);
      } catch (error) {
        console.error('Failed to fetch site key:', error);
      }
    };

    fetchKey();
  }, []);

  const dispatch = useDispatch();
  const { formData } = useSelector(selectForm);

  useEffect(() => {
    if (recaptchaRef.current && formData.recaptcha === '') {
      recaptchaRef.current?.reset();
    }
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

export default Recaptcha;
