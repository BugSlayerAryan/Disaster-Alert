import HeaderSection from "../components/Landing/HeaderSection";
import HeroSection from "../components/Landing/HeroSection";
import DisasterSection from "../components/Landing/DisasterSection.jsx";
import ActivityAndResources from "../components/Landing/ActivityAndResources.jsx";
import VideoSection from "../components/Landing/VideoSection.jsx";
import ImportantWebsitesSection from "../components/Landing/ImportantWebsitesSection.jsx";
import CTASection from "../components/Landing/CTASection";
import FotterSection from "../components/Landing/FotterSection";
import { useUser, useClerk } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Landing = () => {
    const {openSignIn, openSignUp} = useClerk();
    const {isSignedIn} = useUser();
    const navigate = useNavigate();

    useEffect(()=>{
        if(isSignedIn){
            navigate('/dashboard');
        }
    } , [isSignedIn, navigate]);
    return (
    <div className="landing-page  from-gray-50 via-white to-gray-100">
            {/* Header Section */}
            <HeaderSection />
            {/* Hero Section */}
            <HeroSection openSignIn={openSignIn} openSignUp={openSignUp} />
            {/* Features Section */}
            <DisasterSection />
            {/* ActivityAndResources section */}
            <ActivityAndResources />
            {/* VideoSection */}
            <VideoSection />
            {/* ImportantWebsitesSection section */}
            <ImportantWebsitesSection />
            {/* CTA Section */}
            <CTASection openSignUp={openSignUp} />
            {/* Fotter Section */}
            <FotterSection />
        </div>
    )
};
export default Landing;