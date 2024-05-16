import BasicLayout from "../components/layout";
import ProfileCard from "../components/profileCard.jsx";
import { getProfile } from '../service/profile';
import { useEffect, useState } from 'react';

export default function ProfilePage(){
    const [user, setUser] = useState(null);

    const getUser = async () => {
        let pUser = await getProfile();
        setUser(pUser);
    }

    useEffect(() => {
        getUser();
    }, [])
    return(
        <BasicLayout>
           { user && <ProfileCard user={user}/>}
        </BasicLayout>
    );
}