import rolesData from '@/data/data-contact/data-contact';
import { useState, useRef, useEffect } from 'react';
import ButtonCircle from "../circle-button-black";

const Select: React.FC<any> = ({ name, onChange, value }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const selectRef = useRef<HTMLSelectElement>(null);

    const toggleDropdown = () => {
        setIsDropdownOpen(prevState => !prevState);
    };

    const closeDropdown = (e: MouseEvent) => {
        if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
            setIsDropdownOpen(false);
        }
    };

    useEffect(() => {
        if (isDropdownOpen) {
            window.addEventListener('click', closeDropdown);
        } else {
            window.removeEventListener('click', closeDropdown);
        }

        return () => {
            window.removeEventListener('click', closeDropdown);
        };
    }, [isDropdownOpen]);

    return (
        <div className='relative'>
            <select
                ref={selectRef}
                name={name}
                className={`border border-primary-dark rounded-3xl p-4 w-full my-5 appearance-none`}
                value={value || ''}
                onChange={onChange}
                onClick={toggleDropdown}
            >
                {Object.entries(rolesData).map(([key, label]) => (
                    <option key={key} value={label}>
                        {label}
                    </option>
                ))}
            </select>
            <span className='absolute bottom-[35px] right-2 scale-110 pointer-events-none'>
                <ButtonCircle isDropdownOpen={isDropdownOpen} />
            </span>
        </div>
    );
};

export default Select;

