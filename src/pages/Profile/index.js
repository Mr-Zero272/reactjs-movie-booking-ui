import { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { toast } from 'react-toastify';

import ProfileInputText from './ProfileInputText';
import BasicProfile from '~/components/BasicProfile';
import styles from './Profile.module.scss';
import TitleHeadingPage from '~/components/TitleHeadingPage';
import * as userService from '~/apiServices/userService';
import Button from '~/components/Button';

const cx = classNames.bind(styles);
function Profile() {
    const [userDetail, setUserDetail] = useState(() => ({
        avatar: '',
        email: '',
        phone: '',
        id: 0,
        username: '',
        emailErrorMessage: '',
        phoneErrorMessage: '',
    }));
    const [isEdit, setIsEdit] = useState(false);
    const [isEditImage, setIsEditImage] = useState(false);

    useEffect(() => {
        const fetchApi = async () => {
            const token = localStorage.getItem('token');
            const result = await userService.getCurrentUser(token);
            setUserDetail((prev) => ({
                ...prev,
                ...result,
            }));
        };

        fetchApi();
    }, []);
    //console.log(userDetail);

    const isVietnamesePhoneNumber = (number) => {
        const regex = new RegExp(/(84|0[3|5|7|8|9])+([0-9]{8})\b/);
        return regex.test(number);
    };

    const isValidEmail = (email) => {
        const regex = new RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/);
        return regex.test(email);
    };

    const handleSubmit = useCallback(
        (isEdit) => {
            if (!isEdit) {
                // check mail valid
                if (isValidEmail(userDetail.email) === false) {
                    setUserDetail((prev) => ({
                        ...prev,
                        emailErrorMessage: 'This email is not valid!',
                    }));
                    return;
                } else {
                    setUserDetail((prev) => ({
                        ...prev,
                        emailErrorMessage: '',
                    }));
                }

                // check phone valid
                if (isVietnamesePhoneNumber(userDetail.phone) === false) {
                    setUserDetail((prev) => ({
                        ...prev,
                        phoneErrorMessage: 'This phone number is not valid!',
                    }));
                    return;
                } else {
                    setUserDetail((prev) => ({
                        ...prev,
                        phoneErrorMessage: '',
                    }));
                }
                const id = toast.loading('Please wait...');
                // if both is validation continue
                if (isValidEmail(userDetail.email) && isVietnamesePhoneNumber(userDetail.phone)) {
                    const fetchApi = async () => {
                        const token = localStorage.getItem('token');
                        const formData = new FormData();
                        formData.append('newUsername', userDetail.username);
                        formData.append('newEmail', userDetail.email);
                        formData.append('newPhoneNumber', userDetail.phone);
                        const result = await userService.updateUserInfo(token, formData);
                        //console.log(result);
                        if (result.message === 'success') {
                            localStorage.setItem('token', result.token);
                            //console.log(result.token);
                            const newUserInfo = await userService.getCurrentUser(result.token);
                            setUserDetail((prev) => ({
                                ...prev,
                                ...newUserInfo,
                            }));
                        }
                        //console.log(result);
                    };

                    fetchApi();
                    setUserDetail((prev) => ({
                        ...prev,
                        emailErrorMessage: '',
                        phoneErrorMessage: '',
                    }));
                    setIsEdit(isEdit);
                }
                setTimeout(() => {
                    toast.update(id, {
                        render: 'Update successfully!',
                        type: 'success',
                        closeOnClick: true,
                        isLoading: false,
                        autoClose: 2000,
                    });
                }, 1000);
            } else {
                setIsEdit(isEdit);
            }
        },
        [userDetail],
    );
    //console.log(userDetail);

    const onValueChange = useCallback((e) => {
        // console.log('fwf');
        // console.log(e);
        setUserDetail((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('left-content')}>
                <BasicProfile userDetail={userDetail} onClick={handleSubmit} />
            </div>
            <div className={cx('right-content')}>
                <div className={cx('form-profile')}>
                    <div className={cx('info')}>
                        <div className={cx('info-header')}>
                            <TitleHeadingPage title="Information" />
                        </div>
                        <div className={cx('info-body')}>
                            <div className={cx('form-group')}>
                                <ProfileInputText
                                    name="username"
                                    label="Username:"
                                    value={userDetail.username}
                                    onValueChange={onValueChange}
                                    errorMessage={userDetail.usernameErrorMessage}
                                    disabled={!isEdit}
                                />
                                <ProfileInputText
                                    name="email"
                                    label="Email: "
                                    value={userDetail.email}
                                    onValueChange={onValueChange}
                                    errorMessage={userDetail.emailErrorMessage}
                                    disabled={!isEdit}
                                />
                            </div>
                            <div className={cx('form-group')}>
                                <ProfileInputText
                                    name="phone"
                                    label="Phone number: "
                                    value={userDetail.phone}
                                    onValueChange={onValueChange}
                                    errorMessage={userDetail.phoneErrorMessage}
                                    disabled={!isEdit}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={cx('member')}>
                        <div className={cx('member-header')}>
                            <TitleHeadingPage title="Member" />
                        </div>
                        <div className={cx('member-body', 'form-group')}>
                            <ProfileInputText label="Current: " disabled={true} value="Gold member" />
                            <ProfileInputText label="Joining time: " disabled={true} value="10/9/2023" />
                        </div>
                    </div>

                    {(isEdit || isEditImage) && (
                        <Button className={cx('save-btn')} onClick={() => handleSubmit(false)} primary>
                            Save
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Profile;
