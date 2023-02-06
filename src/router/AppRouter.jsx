import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from '../auth/pages/LoginPage';
import { AddNewGame } from '../games/pages/AddNewGame';
import GamesPage from '../games/pages/GamesPage';
import { useAuthStore } from '../hooks/useAuthStore';

const AppRouter = () => {

    const { status, checkAuthToken } = useAuthStore();

    useEffect(() => {
        checkAuthToken();
      }, [])

    return (
        <Routes>
            {
                (status === 'authenticated') ?
                    (
                        <>
                            <Route path='/' element={<GamesPage />} />
                            <Route path='/*' element={<Navigate to='/' />} />
                            <Route path='/newgame' element={<AddNewGame />} />
                        </>
                    ) : (
                        <>
                            <Route path='/' element={<GamesPage />} />
                            <Route path='/auth/login' element={<LoginPage />} />
                            <Route path="/newgame" element={<Navigate to="/auth/login" />} />
                        </>
                    )
            }

        </Routes>
    )
}

export default AppRouter
