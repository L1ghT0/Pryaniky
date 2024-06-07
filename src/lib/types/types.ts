export type loginData = {
    username: string,
    password: string
}
type Response = {
    error_code: number,
    error_message?: string,
    error_text?: string,
    profiling: string,
    timings: any
}
type token = {
    token: string
}

export type userdocs = {
    companySigDate: string,
    companySignatureName: string,
    documentName: string,
    documentStatus: string,
    documentType: string,
    employeeNumber: string,
    employeeSigDate: string,
    employeeSignatureName: string,
    id: string,
}

export type userdocsData = Omit<userdocs, 'id'>

export type loginResponse = Response & {
    data: token,
}

export type getUserdocsResponse = Response & {
    data: userdocs[],
}
export type setUserdocsResponse = Response & {
    data: userdocs
}
export type createUserdocsResponse = Response & {
    data: userdocs
    oldId?: string
}
export type removeItemResponse = Response

export type userdocsAdditionalInfo = {
    isNew: boolean
    touched: boolean,
    stored: boolean // on backend
}

export type userdocsRowData = {
    data: userdocs
    additionalInfo: userdocsAdditionalInfo
}