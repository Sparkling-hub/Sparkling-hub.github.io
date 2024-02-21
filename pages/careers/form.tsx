
import React, { ChangeEvent } from "react";
import Input from "../../components/ui/input-component/input";
import TextArea from "../../components/ui/text-area-component/text-area";
import Submit from "../../components/ui/input-sumbit-component";
import Select from "../../components/ui/select-component";
import MainLayout from '../../layouts/MainLayuout';
import Jobs from '../../data/data-jobs';
import InfoJob from '../../data/data-sections/data-section-jobs/infoJob'

import Link from "next/link";
import { useDispatch, useSelector } from 'react-redux';
import {
	selectForm,
	setFormData,
	setCheck,

	setCheckFormByKey
} from '@/store/redusers/FormSliceReduser';
import { useRouter } from 'next/router';



const Faq = () => {

	const dispatch = useDispatch();
	const { formData, check, checkForm } = useSelector(selectForm);
	const router = useRouter();
	console.log(router)
	const { id } = router.query;
	const job = Jobs.find(job => job.slug === id)


	const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;

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
		const file = e.target.files?.[0];
		if (file) {
		
			dispatch(setFormData({
				...formData,
				file: { name: file.name, url: URL.createObjectURL(file) }, 
			}));
		}
	};
	
	console.log("Uploaded CV file:", formData.file);

	return (
		<MainLayout>
			{job ?

				<div className="m-14 max-w-[1920px] pb-14">
					<Link href='/careers' className="flex items-center text-xl  mb-4"> <img src="/img/jobs/arrowBack.png" alt="back" className="h-4" /> Explore all vacancies</Link>
					<h1 className="text-5xl mb-6 mx-1 ">{job.head}</h1>
					<p className="text-xl pb-8">
						{job.workMode}, {job.location}, {job.experienceHTML}
					</p>

					<form action="" className="max-w-[790px]">
						<div className="flex flex-col w-full ">


							<Input
								type="text"
								name="name"
								value={formData.name}
								placeholder="Full Name*"
								onChange={handleInputChange}
								checked={checkForm.name.length > 0}
							/>

							<Input
								type="email"
								name="email"
								value={formData.email}
								onChange={handleInputChange}
								placeholder="Email*"
								checked={check === false && checkForm.email.length > 0 || check === false}
							/>

							<Input
								type="tel"
								name="phone"
								value={formData.phone}
								placeholder="Phone number*"
								onChange={handleInputChange}

							/>
							<Input
								type="text" name="linkId"
								value={formData.linkId}
								onChange={handleInputChange}
								placeholder="Linkedin" />



							<TextArea
								name="message"
								placeholder="Motivation letter"
								value={formData.message}
								onChange={handleInputChange}
								checked={checkForm.message.length > 0}
							/>

							<br />
							<div className="relative">
								<h3 className="mx-3 absolute top-[-15px] text-xl">Upload CV*</h3>
							<Input
								type="file"
								name="file"
								onChange={handleFileUpload} value={undefined} />
								</div>
							<div className="relative">
								<Submit
									type="submit"
									name="submit"

									disabled={!!(formData.name && formData.email && formData.message)}
									http={"http://localhost:3033/send-form"}
								/>
							</div>
						
						</div>

					</form>
				</div> : ''}</MainLayout>

	);
};

export default Faq;