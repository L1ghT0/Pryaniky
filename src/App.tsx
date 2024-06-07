import React, {useEffect} from "react";
import {Route, Routes} from "react-router-dom";
import Login from "./components/Login/Login";
import Userdocs from "./components/Userdocs/Userdocs";
import {useAppDispatch} from "./store/store";
import {initialize} from "./store/reducers/authReducer";
import Header from "./components/Header/Header";


const App = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(initialize())
    })

    return (
        <div>
            <Header/>
            <Routes>
                <Route path='/' element={<Userdocs/>}/> {/*HOME*/}
                <Route path='/login' element={<Login/>}/>
            </Routes>
        </div>
    )
}
export default App
