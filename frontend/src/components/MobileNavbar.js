import { useState } from 'react'
import MenuModal from './MenuModal';
import MobileNav from './MobileNav';

const MobileNavbar = () => {
    const [isMenuModal, setIsMenuModal] = useState(false)

    const showMenuModal = () => {
        setIsMenuModal(true)
    }

    const deleteMenuModal = () => {
        setIsMenuModal(false)
    }

    return (
        <div>
            {!isMenuModal && <MobileNav showMenuModal={showMenuModal}/>}
            {isMenuModal && <MenuModal deleteMenuModal={deleteMenuModal}/>}
        </div>
    )
}

export default MobileNavbar