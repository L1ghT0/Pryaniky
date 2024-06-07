import React, {useEffect, useRef, useState} from 'react';
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {RootState, useAppDispatch} from "../../store/store";
import {
    addNew, createNewItem,
    getUserdocs,
    removeItemFromUserdocs, setNewItem, setTouched,
} from "../../store/reducers/userdocsReducer";
import {useSelector} from "react-redux";
import './userdocs.css'
import {userdocsRowData} from "../../lib/types/types";
import UserdocItem from "./UserdocItem";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {dateToIso} from "../../lib/dateParser/dateParser";
import {CircularProgress} from "@mui/material";


const Userdocs = () => {
    const userdocsInitValue = {
        data: {
            documentStatus: '',
            employeeNumber: '',
            documentType: '',
            documentName: '',
            companySignatureName: '',
            employeeSignatureName: '',
            employeeSigDate: '',
            companySigDate: '',
            id: Date.now().toString(36) + Math.random().toString(36).substr(2) // temp id
        },
        additionalInfo: {
            isNew: true,
            touched: false,
            stored: false
        }
    }
    const dispatch = useAppDispatch();
    const {userdocs, cachedUserdocs, loading} = useSelector((store: RootState) => store.userdocs)
    const rowItemRef = useRef(null)
    const [editMode, setEditMode] = useState<boolean>(false);
    const [inputValueChanged, setInputValueChanged] = useState<boolean>(false)
    const [formData, setFormData] = useState<userdocsRowData>(userdocsInitValue)


    useEffect(() => {
        dispatch(getUserdocs())
    }, [])


    const handleRowClick = (e: React.MouseEvent<HTMLDivElement>) => {
        setEditMode(true)
    }
    const handleApplyChanges = (e: React.MouseEvent<HTMLButtonElement>) => {
        // before apply any changes all fields have to be filled in except 'id' field
        const allFieldsFilledIn: boolean = !Object.entries(formData.data).filter(([key, value]) => key !== 'id').filter(([key, value]) => !value).length
        if (!allFieldsFilledIn) {
            e.preventDefault() // prevent onBlur event, we don't want to lose focus
            const idOfTouchedElement = userdocs.find(userdoc => userdoc.data.id === formData.data.id)?.data?.id
            if (idOfTouchedElement) {
                dispatch(setTouched({id: idOfTouchedElement}))
            }
            return
        }
        setEditMode(false)
        setTimeout(() => { // setTimeout is being used to finish all our events before state changes and component renders
            formData.additionalInfo.isNew
                ? dispatch(createNewItem({
                    ...formData.data,
                    companySigDate: dateToIso(formData.data.companySigDate),
                    employeeSigDate: dateToIso(formData.data.employeeSigDate)
                }))
                : dispatch(setNewItem({
                    ...formData.data,
                    companySigDate: dateToIso(formData.data.companySigDate),
                    employeeSigDate: dateToIso(formData.data.employeeSigDate)
                }))
        }, 0)
    }
    const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
        setEditMode(false)
        setTimeout(() => { // setTimeout is being used to finish all our events before state changes and component renders
            dispatch(removeItemFromUserdocs(formData))
        }, 0)
    }
    const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
            setEditMode(false)
            setInputValueChanged(false)
        }
    }
    const handleAddNew = (e: React.MouseEvent<HTMLButtonElement>) => {
        setTimeout(() => { // setTimeout is being used to finish all our events before state changes and component renders
            dispatch(addNew(userdocsInitValue))
            setEditMode(true)
        }, 0)
    }


    return (
        <div className='userdocs'>
            <Box sx={{gap: "15px", display: 'flex', padding: '10px 0', flexWrap: 'wrap'}} component='div'>
                <Button variant="contained" onMouseDown={handleAddNew}>Add new</Button>
                {editMode &&
                    (<Box sx={{gap: "15px", display: 'flex'}} component='div'>
                        {inputValueChanged &&
                            <Button variant="contained" onMouseDown={handleApplyChanges} type='button'>Apply
                                changes</Button>}
                        <Button variant="contained" onMouseDown={handleDelete}>Delete</Button>
                    </Box>)
                }
            </Box>
            <div className='userdocs_head_keynames'>
                {
                    Object.keys(userdocsInitValue.data).filter(keyName => keyName !== 'id').map((keyName, index) => (
                        <div key={'userdocs_head_keynames__cell' + index}
                             className='userdocs_head_keynames__cell'>{keyName}
                        </div>))
                }
            </div>
            {userdocs.length &&
                <div>
                    {
                        [...cachedUserdocs, ...userdocs].map((userdoc, index) => {
                            let userdocsFromCache = Boolean(cachedUserdocs.length > index)
                            return (
                                <div style={{position: 'relative'}}
                                     ref={rowItemRef}
                                     tabIndex={0}
                                     onClick={handleRowClick}
                                     onBlur={handleBlur}
                                     className={`${userdocsFromCache && 'loading'}`}
                                     key={userdoc.data.id + index}>
                                    {userdocsFromCache && <CircularProgress className='loader'/>}
                                    <UserdocItem setInputValueChanged={setInputValueChanged}
                                                 setFormData={setFormData}
                                                 data={userdoc.data}
                                                 additionalInfo={userdoc.additionalInfo}/>
                                </div>)
                        })
                    }
                </div> || <div></div>
            }
            {loading && <div style={{margin: '0 auto', width: '60px', marginTop: '20px'}}><CircularProgress/></div>}
        </div>
    )
}

export default withAuthRedirect(Userdocs);