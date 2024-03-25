import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import './App.css'
import MainLayout from './layouts/MainLayout'
import Appointments from './pages/Appointments'


function App() {


  return (
    <BrowserRouter>
      <Routes>
        
        {/* <Route path="/" element={<Home />} />
        <Route path="/register" element={<SingUp />} />
        <Route path="/login" element={<SingIn />} />
        <Route path="/avaiableLoans" element={<AvailableLoans />} />
        <Route path="*" element={<NotFoundError />} /> */}


        <Route
          path="/"
          element={
            <MainLayout>
              <Outlet />
            </MainLayout>
          }>

          <Route path="accounts" element={<Appointments/>} />
          {/* <Route path="cards" element={<CardsWithAuth />} />
          <Route path="loans" element={<LoansWithAuth />} />
          <Route path="accounts/:id" element={<AccountDetailWithAuth />} />
          <Route path="transactions" element={<TransactionsWithAuth />} />
          <Route path="*" element={<NotFoundError />} /> */}


        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
