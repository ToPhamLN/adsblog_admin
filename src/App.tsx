import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import DefaultLayout from '~/layouts'
import { routes } from '~/constants/routes'
import LoadingPage from '~/components/LoadingPage'
import NotFoundPage from '~/components/NotFound'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <>
      <Suspense fallback={<LoadingPage />}>
        <Routes>
          <Route path='/' element={<DefaultLayout />}>
            {routes.map((r) => {
              const Page = r.component
              return <Route key={r.path} path={r.path} element={<Page />} />
            })}
            <Route path='*' element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
        style={{
          fontSize: '14px'
        }}
      />
    </>
  )
}

export default App
