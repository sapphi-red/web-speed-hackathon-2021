import React from 'react';

import { faSignInAlt, faEdit, faUser, faHome, faBalanceScale } from '@fortawesome/free-solid-svg-icons';

import { useActiveUser } from '../../../hooks/use_active_user';
import { FontAwesomeIcon } from '../../foundation/FontAwesomeIcon';
import { NavigationItem } from '../NavigationItem';

/**
 * @typedef {object} Props
 * @property {(modalType: string) => void} onOpenModal
 */

/** @type {React.VFC} */
const Navigation = ({ onOpenModal }) => {
  const [activeUser] = useActiveUser();

  const handleNull = React.useCallback(() => {}, [])

  const handleOpenPostModal = React.useCallback(() => {
    onOpenModal('post');
  }, []);

  const handleOpenAuthModal = React.useCallback(() => {
    onOpenModal('auth');
  }, []);

  const inner =
    activeUser === undefined
      ? (
        <NavigationItem
          text="..."
          onClick={handleNull}
          icon={null}
        />
      )
      : activeUser === null
        ? (
          <NavigationItem
            text="サインイン"
            onClick={handleOpenAuthModal}
            icon={<FontAwesomeIcon icon={faSignInAlt} />}
          />
        )
        : (
          <>
            <NavigationItem
              text="投稿する"
              onClick={handleOpenPostModal}
              icon={<FontAwesomeIcon icon={faEdit} />}
            />
            <NavigationItem
              href={`/users/${activeUser.username}`}
              text="マイページ"
              icon={<FontAwesomeIcon icon={faUser} />}
            />
          </>
        )

  return (
    <nav className="fixed z-10 bottom-0 left-0 right-0 h-12 bg-white border-t border-gray-300 lg:relative lg:w-48 lg:h-full lg:border-r lg:border-t-0">
      <ul className="relative grid grid-flow-col items-center justify-evenly lg:fixed lg:gap-2 lg:grid-flow-row lg:justify-start lg:p-2 lg:w-48 lg:h-full lg:auto-rows-min">
        <NavigationItem href="/" text="ホーム" icon={<FontAwesomeIcon icon={faHome} />} />
        {inner}
        <NavigationItem
          href="/terms"
          text="利用規約"
          icon={<FontAwesomeIcon icon={faBalanceScale} />}
        />
      </ul>
    </nav>
  );
};

export { Navigation };
