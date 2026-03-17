import React, { useState } from 'react';
import styles from './AccountList.module.css';
import { BsLockFill, BsTrash, BsBoxArrowRight, BsChevronRight } from 'react-icons/bs';
import ChangePasswordSheet from '../changePwdModal/ChangePasswordSheet.jsx';
import DeleteModal from '../deleteModal/DeleteModal.jsx';
import LogoutModal from '../logoutModal/LogoutModal.jsx';

const AccountList = () => {
    const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    return (
        <div className={styles.sectionContainer}>
            <h3 className={styles.sectionHeader}>ACCOUNT</h3>

            <div className={styles.listContainer}>
                {/* Change Password Item */}
                <div
                    className={styles.listItem}
                    onClick={() => setIsChangePasswordOpen(true)}
                >
                    <div className={styles.itemLeft}>
                        <div className={styles.iconWrapper}>
                            <BsLockFill className={styles.itemIcon} />
                        </div>
                        <span className={styles.itemTitle}>Change Password</span>
                    </div>
                    <div className={styles.itemRight}>
                        <BsChevronRight className={styles.chevronIcon} />
                    </div>
                </div>

                {/* Delete Account Item */}
                <div
                    className={styles.listItem}
                    onClick={() => setIsDeleteModalOpen(true)}
                >
                    <div className={styles.itemLeft}>
                        <div className={`${styles.iconWrapper} ${styles.dangerIconWrapper}`}>
                            <BsTrash className={styles.dangerIcon} />
                        </div>
                        <span className={`${styles.itemTitle} ${styles.dangerText}`}>Delete Account</span>
                    </div>
                </div>

                {/* Log Out Item */}
                <div 
                    className={styles.listItem}
                    onClick={() => setIsLogoutModalOpen(true)}
                >
                    <div className={styles.itemLeft}>
                        <div className={styles.iconWrapper}>
                            <BsBoxArrowRight className={styles.itemIcon} />
                        </div>
                        <span className={styles.itemTitle}>Log Out</span>
                    </div>
                </div>
            </div>

            <ChangePasswordSheet
                isOpen={isChangePasswordOpen}
                onClose={() => setIsChangePasswordOpen(false)}
            />

            <DeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
            />

            <LogoutModal
                isOpen={isLogoutModalOpen}
                onClose={() => setIsLogoutModalOpen(false)}
            />
        </div>
    );
};

export default AccountList;
