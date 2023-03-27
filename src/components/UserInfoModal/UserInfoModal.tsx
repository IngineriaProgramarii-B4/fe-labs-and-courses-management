import React from 'react';
import styles from './UserInfoModal.module.scss';

type UserInfoModalProps = {
  exampleNumber: number,
  exampleString: string,
  exampleObject: {
    val1: string,
    val2: boolean
  }
}

function UserInfoModal({exampleNumber, exampleString, exampleObject}: UserInfoModalProps) {
  return (
    <div className={styles.exampleCustomClass}>{exampleObject.val1}</div> //va afisa valoarea din exampleObject.val1
  );
}

export default UserInfoModal;