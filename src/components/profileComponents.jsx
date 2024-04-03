import '../css/tailwind.css'
import '../css/profileCard.scss'
import { getProfile } from '../service/profile';

export default function ProfileCard() {
    const user = getProfile();
    return (
        <div className='profile-card'>
            <h1 className='font-bold text-3xl'>
                My Profile
            </h1>
            <div className='profile-user'>
                <div className='profile-name'>
                    <h2>
                        Name:
                    </h2>
                    <p className='profile-content'>
                        {user.name}
                    </p>
                </div>
                <div className='profile-level'>
                    <h2 >
                        level:
                        <span className=''>
                            {'  ' + user.level}
                        </span>
                    </h2>

                </div>
            </div>
            <div className='profile-email'>
                <h2 >
                    Email:
                </h2>
                <p className='profile-content'>
                    {user.email}
                </p>
            </div>

            <div className='profile-avatar'>
                <h2 >
                    Avatar:
                </h2>
                <img
                    src={user.avatarSrc}
                    alt=""
                    className=''
                />
            </div>
            <div className=''>
                <h2>
                    Notes:
                </h2>
                <p className='profile-notes'>
                    {user.introduction}
                </p>
            </div>

            <button className='profile-btn'>
                编辑资料
            </button>
        </div>
    );
}
