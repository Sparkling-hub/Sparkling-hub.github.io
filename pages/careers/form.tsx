import React, { ChangeEvent, useEffect, useState } from "react";
import Input from "../../components/ui/input-component/input";
import TextArea from "../../components/ui/text-area-component/text-area";
import Submit from "../../components/ui/input-sumbit-component";
import MainLayout from '../../layouts/MainLayuout';
import Jobs from '../../data/data-jobs';
import Link from "next/link";
import ReCAPTCHA from "../../components/reCAPTCHA";
import { useDispatch, useSelector } from 'react-redux';
import {
	selectForm,
	setFormData,
	setCheck,
	setCheckFormByKey,

} from '@/store/redusers/FormSliceReduser';
import { useRouter } from 'next/router';
import { sendContactForm } from "@/lib/api";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
// import "react-phone-number-input/style.css";
// import PhoneInput from 'react-phone-number-input';

const Faq = () => {
	const dispatch = useDispatch();
	const { formData, check, checkForm } = useSelector(selectForm);
	const [fileForm, setFile] = useState<File | null>(null)

	const router = useRouter();
	const { id } = router.query;
	const job = Jobs.find(job => job.slug === id)
	

	if (formData.file.length > 0) { setCheck(null) }
	useEffect(() => {
		
		if (job?.head && job?.location) {
			dispatch(setFormData({
				...formData,
				['vacancy']: job?.head + `, ` + job?.location,
				name: '',
            select: '',
            email: '',
            company: '',
            message: '',
            phone: '',
            linkedin: '',
            file: '',
			}));
		}
		else dispatch(setFormData({
			...formData,
			['vacancy']: 'error',
		}));
	}, [job]);



	const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;

		dispatch(setCheckFormByKey({ key: name as any, value: '' }));

		dispatch(setFormData({
			...formData,
			[name]: value,
		}));

		if (name === "phone" && (!/^\d*$/.test(value))) {
			dispatch(setCheckFormByKey({ key: name as any, value: '' }));

			const numericValue = value.replace(/\D/g, '');

			dispatch(setFormData({
				...formData,
				phone: numericValue,
			}));
		}

		if (name === "email") {
			dispatch(setCheck(null));
		}
	}; 
	
	const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {

		dispatch(setFormData({
			...formData,
			file: '',
		}));

		const fileInput = e.target;
		const file: File | null = e.target.files?.[0] ?? null;
		const maxSize = 5 * 1024 * 1024;
		const allowedTypes = ['application/pdf'];
		const nameFile: string = file == null ? '' : file.name

		if (file && allowedTypes.includes(file.type)) {
			if (file.size <= maxSize) {
				setFile(file)
				dispatch(setFormData({
					...formData,
					file: nameFile,
				}));

				dispatch(setCheckFormByKey({ key: e.target.name as any, value: '' }))


			} else {

				fileInput.value = '';
				alert('Selected file exceeds the maximum size of 5 MB.');
			}
		} else {
			fileInput.value = '';

			alert('Please select a PDF file.');
		}
	};

	const handlePhoneChange = (value:any, country:any) => {
		dispatch(setFormData({
		  ...formData,
		  phone: value,
		}));
	
	  };


	return (
		<MainLayout>
			{job ?

				<div className="my-14 max-w-screen-2xl pb-14 mx-auto w-full px-8">
					      <meta property="og:title" content={`Sparkling.Co. ${job.head}`} />
			<meta property="og:description" content={job.overview} />
			<meta property="og:url" content={`/careers/form?id=${job.slug}`} />

					<Link href='/careers' className="flex items-center text-xl  mb-4"> <img src="/img/jobs/arrowBack.png" alt="back" className="h-4" /> Explore all vacancies</Link>
					<h1 className="text-5xl mb-6 mx-1 ">{job.head}</h1>

					<p className="text-xl pb-8">
						{job.workMode}, {job.location}, {job.experienceHTML}
					</p>

					<form action="" className="max-w-[790px]" method="POST" encType="multipart/form-data">
						<div className="flex flex-col w-full ">


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
 <div className="relative">
	<PhoneInput value={formData.phone} onChange={handlePhoneChange} enableSearch={true} country={'gb'} />
   
    </div>
				
							<Input
								type="text" name="linkedin"
								value={formData.linkedin}
								onChange={handleInputChange}
								placeholder="Linkedin" />
						


							<TextArea
								name="message"
								placeholder="Motivation letter"
								value={formData.message}
								onChange={handleInputChange}
								
							/>

							<br />

							{/* <div className="relative">
								<div className="flex items-center">
								<h3 className="mx-3 top-[-15px] text-xl flex items-center">Upload CV <span className="text-red-800 text-5xl px-1">*</span></h3> <p className="text-gray-400 contents mx-4 text-[15px]">PDF only</p>
								</div>
								<div className="relative">
									<Input
										type="file"
										name="file"
										onClick={(e: { target: { value: string; }; }) => {
											e.target.value = ''; dispatch(setFormData({
												...formData,
												file: '',
											}));
										}}
										checked={checkForm.file.length > 0}
										onChange={handleFileUpload} value={undefined} />
									{formData.file && (
										<div className="absolute top-3 p-4 left-40 flex flex-col items-center">
											<img src="/img/icon-pdf.png" alt="PDF Icon" className="w-8 h-8 mr-2" />
											<p className="text-sm">{formData.file}</p>
										</div>
									)}
								</div>
							</div> */}
						
          <ReCAPTCHA></ReCAPTCHA>

    
							<div className="relative mt-4">
								<Submit
									type="submit"
									name="submit"
									file={fileForm}
									requiredKeys={['name', 'email', 'phone', 'recaptcha']}
									disabled={!!(formData.name && formData.email && formData.phone && formData.recaptcha)}
									onClick={sendContactForm}
								/>
							</div>
						</div>
					</form>
				</div> : ''}
			</MainLayout>

	);
};

export default Faq;
