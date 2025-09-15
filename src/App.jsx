import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate  } from 'react-router-dom';
import Providers from '@/components/providers';


// Lazy-loaded pages and layout
const MainLayout = lazy(() => import('@/components/layouts/MainLayout'));
const HomePage = lazy(() => import('@/app/page'));
const ServicePage = lazy(() => import('@/app/services/[slug]/page'));
const SubServicePage = lazy(() => import('@/app/services/[slug]/[subServiceSlug]/page'));
const NotFound = lazy(() => import('@/app/not-found'));
const HospitalsDoctors = lazy(() => import('@/pages/HospitalsDoctors')); 
const BookAnAppointment = lazy(() => import('@/pages/BookAnAppointment')); 
const WomenWellBeing = lazy(() => import('@/pages/WomenWellBeing'));
const Cardiology = lazy(() => import('@/pages/Cardiology'));
const Neurology = lazy(() => import('@/pages/Neurology'));
const Rheumatology = lazy(() => import('@/pages/Rheumatology'));
const Gastroenterology = lazy(() => import('@/pages/Gastroenterology'));
const Gynecology = lazy(() => import('@/pages/Gynecology'));
const GeneralPediatrics = lazy(() => import('@/pages/GeneralPediatrics'));
const Dermatology = lazy(() => import('@/pages/Dermatology'));
const RespiratoryMedicine = lazy(() => import('@/pages/RespiratoryMedicine'));
const UrgentCare = lazy(() => import('@/pages/UrgentCare'));
const TravelMedicineAndVaccinations = lazy(() => import('@/pages/TravelMedicineAndVaccinations'));
const GeneralMedicine = lazy(() => import('@/pages/GeneralMedicine'));
const Login = lazy(() => import('@/pages/Login'));
const Registration = lazy(() => import('@/pages/Registration'));
const Profile = lazy(() => import('@/pages/Profile'));
const ForgotPassword = lazy(() => import('@/pages/ForgotPassword'));
const ResetPassword = lazy(() => import('@/pages/ResetPassword'));
const TermsAndConditions = lazy(() => import('@/pages/TermsAndConditions'));
export default function App() {
  return (
    <Providers>
      <BrowserRouter future={{ v7_startTransition: true }}>
        <Suspense fallback={<div>Loading…</div>}>
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route element={<MainLayout />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/services/:slug" element={<ServicePage />} />
              <Route path="/hospitalsDoctors" element={<HospitalsDoctors/>} />
              <Route path="/bookAppointment" element={<BookAnAppointment/>} />
              <Route path="/womenWellBeing" element={<WomenWellBeing/>}/>
              <Route path="/cardiology" element={<Cardiology/>}/>
              <Route path="/neurology" element={<Neurology/>}/>
              <Route path="/rheumatology" element={<Rheumatology/>}/>
              <Route path="/gastroenterology" element={<Gastroenterology/>}/>
              <Route path="/gynaecology" element={<Gynecology/>}/>
              <Route path="/generalPediatrics" element={<GeneralPediatrics/>}/>
              <Route path="/respiratoryMedicine" element={<RespiratoryMedicine/>}/>
              <Route path="/dermatology" element={<Dermatology/>}/>
              <Route path="/urgentCare" element={<UrgentCare/>}/>
              <Route path="/generalMedicine" element={<GeneralMedicine/>}/>
              <Route path="/travelMedicine&Vaccinations" element={<TravelMedicineAndVaccinations/>}/>
              <Route path="/services/:slug/:subServiceSlug" element={<SubServicePage />} />
             <Route path="/terms-conditions/:userId?" element={<TermsAndConditions />} />


            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </Providers>
  );
}


