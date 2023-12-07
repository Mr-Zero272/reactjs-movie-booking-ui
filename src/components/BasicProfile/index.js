import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from './BasicProfile.module.scss';
import * as userService from '~/apiServices/userService';
import { useDispatch } from 'react-redux';
import { userActions } from '~/store/user-slice';

const cx = classNames.bind(styles);
const deF = () => {};
function BasicProfile({ userDetail = { avatar: '', username: 'username', email: 'email@gg.com' }, onClick = deF }) {
    const [avatar, setAvatar] = useState({});
    const fileInputRef = useRef();
    const dispatch = useDispatch();

    const notify = () => {
        toast.success('Avatar has been updated!!!', {
            style: { fontSize: '1.4rem' },
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1500,
            closeOnClick: true,
            className: 'foo-bar',
        });
    };

    useEffect(() => {
        const fetchApi = async () => {
            const token = localStorage.getItem('token');
            const formData = new FormData();
            formData.append('file', avatar);
            await userService.changeAvatar(token, formData);
            //console.log(result);
            const dotIndex = avatar.name.lastIndexOf('.');
            const newAvatar =
                avatar.name.substring(0, dotIndex) + userDetail.username + avatar.name.substring(dotIndex);
            dispatch(userActions.setAvatar(newAvatar));
        };

        if (avatar.preview) {
            //console.log(avatar.name);
            fetchApi();
            notify();
        }

        return () => {
            avatar && URL.revokeObjectURL(avatar.preview);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [avatar]);

    //console.log(avatar.preview && 'have avatar');
    const handleChooseAvatar = () => {
        fileInputRef.current.click();
    };

    const handleOnChangeAvatar = (e) => {
        const selectedFile = e.target.files[0];

        //console.log(selectedFile);
        if (selectedFile) {
            selectedFile.preview = URL.createObjectURL(selectedFile);
            setAvatar(selectedFile);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <input type="file" ref={fileInputRef} hidden onChange={handleOnChangeAvatar} />
            <Tippy content="Click to change avatar!">
                <img
                    className={cx('avatar', 'profile-item')}
                    onClick={handleChooseAvatar}
                    src={
                        avatar.preview ||
                        (userDetail.avatar
                            ? 'http://localhost:8081/movie/images/' + userDetail.avatar + '?type=avatar'
                            : 'https://i.pinimg.com/originals/0d/f4/1e/0df41e107a53ff1a91ab564c05d0e19e.jpg')
                    }
                    alt="avatar"
                />
            </Tippy>
            <p className={cx('profile-item')}>{userDetail.username}</p>
            <p className={cx('profile-item')}>{userDetail.email}</p>

            <div className={cx('profile-item')}>
                <FontAwesomeIcon className={cx('edit-btn')} icon={faPenToSquare} onClick={() => onClick(true)} />
            </div>
        </div>
    );
}

export default BasicProfile;
