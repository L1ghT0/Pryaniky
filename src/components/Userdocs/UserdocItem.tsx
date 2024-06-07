import React, {useEffect, useRef, useState} from 'react';
import {userdocs, userdocsAdditionalInfo, userdocsRowData} from "../../lib/types/types";
import {useAppDispatch} from "../../store/store";
import {setIsNew, setTouched} from "../../store/reducers/userdocsReducer";
import {isoToDate} from "../../lib/dateParser/dateParser";


type UserdocItemProps = {
    data: userdocs,
    additionalInfo: userdocsAdditionalInfo
    setFormData: React.Dispatch<React.SetStateAction<userdocsRowData>>,
    setInputValueChanged: React.Dispatch<React.SetStateAction<boolean>>,
}

const UserdocItem: React.FC<UserdocItemProps> = (props) => {
    const dispatch = useAppDispatch();
    const keys: Array<keyof userdocs> = ['companySigDate', 'companySignatureName', 'documentName', 'documentStatus', 'documentType', 'employeeNumber', 'employeeSigDate', 'employeeSignatureName', 'id']
    const [inputValue, setInputValue] = useState<userdocs>(props.data);
    const [selected, setSelected] = useState<boolean>(props.additionalInfo.isNew)
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (props.additionalInfo.isNew && ref.current !== null) { // new item added -> focus on it
            ref.current.focus()
        }
    }, [])
    useEffect(() => {
        // everytime we toggle "selected" we don't save fields values if it wasn't applied,
        // so we do init inputs with values that came from props
        setInputValue(props.data);
        props.setFormData({data: props.data, additionalInfo: props.additionalInfo});
    }, [selected])


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const [key] = keys.filter(key => key === e.currentTarget.name)
        let data = {...inputValue, [key]: e.currentTarget.value}
        setInputValue(data)
        props.setFormData({data: data, additionalInfo: props.additionalInfo})
        props.setInputValueChanged(true)
    }
    const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
            setSelected(false)
            dispatch(setIsNew({id:inputValue.id, value: false}))
            dispatch(setTouched({id: inputValue.id}))
        }
    }
    const handleRowElemClick = (e: React.MouseEvent<HTMLDivElement>) => {
        setSelected(true)
    }

    return (
        <div ref={ref} tabIndex={0} className={'userdocs_rowData' + ' ' + `${selected && 'selected'}`}
             onBlur={handleBlur}
             onClick={handleRowElemClick}>
            {
                Object.entries(props.data).filter(([key, value]) => key !== 'id').map(([key, value], index) => {
                    const [inputValueKey] = keys.filter(k => k === key)
                    const type = key.includes('Date') ? 'datetime-local' : 'text'
                    return (
                        selected &&
                        <input required={true}
                               placeholder={key}
                               key={key + value + index}
                               name={key}
                               type={type}
                               value={key.includes('Date') ? isoToDate(inputValue[inputValueKey]) : inputValue[inputValueKey]}
                               className={`userdocs_rowData_inputCell ` + `${props.additionalInfo.touched && !inputValue[inputValueKey] && 'fieldRequired'}`}
                               onChange={handleInputChange}/>
                        ||
                        <div key={key + value + index} className='userdocs_rowData_cell'>
                            {value}
                        </div>)
                })
            }
        </div>
    );
}

export default UserdocItem;
