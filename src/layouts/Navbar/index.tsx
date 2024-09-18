import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { pathRouter, menuLinks } from '~/constants/routes'
import menuIcon from '~/assets/menu.svg'
import closeIcon from '~/assets/close.png'

type Props = {}

const Navbar = (props: Props) => {
  const menuBtnRef = useRef<HTMLButtonElement>(null)
  const navScreenRef = useRef<HTMLDivElement>(null)
  const wrapperScreenRef = useRef<HTMLDivElement>(null)
  const closeBtnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const menuBtn = menuBtnRef.current
    const navScreen = navScreenRef.current
    const wrapperScreen = wrapperScreenRef.current
    const closeBtn = closeBtnRef.current

    if (!menuBtn || !navScreen || !wrapperScreen || !closeBtn) return

    const handleMenuClick = () => {
      navScreen.classList.add('active')
    }

    const handleCloseClick = () => {
      navScreen.classList.remove('active')
    }

    const handleOutsideClick = (event: MouseEvent) => {
      if (wrapperScreen && !wrapperScreen.contains(event.target as Node)) {
        navScreen.classList.remove('active')
      }
    }

    menuBtn.addEventListener('click', handleMenuClick)
    closeBtn.addEventListener('click', handleCloseClick)
    navScreen.addEventListener('click', handleOutsideClick)

    return () => {
      menuBtn.removeEventListener('click', handleMenuClick)
      closeBtn.removeEventListener('click', handleCloseClick)
      navScreen.removeEventListener('click', handleOutsideClick)
    }
  }, [])

  return (
    <nav>
      <div className='container'>
        <div className='logo_wrapper'>
          <div className='icon'>
            <img
              src='https://raw.githubusercontent.com/ToPhamLN/morriapp/master/frontend/src/assets/favicon.ico'
              alt='Logo'
              loading='lazy'
            />
          </div>
          Blog
        </div>
        <ul className='nav_menu'>
          {menuLinks.map(({ name, path }) => (
            <li key={name}>
              <Link to={path}>{name}</Link>
            </li>
          ))}
        </ul>
        <div className='nav_right'>
          <button className='menu_btn' ref={menuBtnRef}>
            <div className='icon'>
              <img className='cover' src={menuIcon} loading='lazy' />
            </div>
          </button>
          <div className='nav_screen' ref={navScreenRef}>
            <div className='wrapper_screen' ref={wrapperScreenRef}>
              <div className='item_screen'>
                <div className='logo_wrapper'>
                  <div className='icon'>
                    <img
                      src='https://raw.githubusercontent.com/ToPhamLN/morriapp/master/frontend/src/assets/favicon.ico'
                      alt='Logo'
                      loading='lazy'
                    />
                  </div>
                  Blog
                </div>
                <button className='close' ref={closeBtnRef}>
                  <div className='icon'>
                    <img src={closeIcon} alt='close icon' loading='lazy' />
                  </div>
                </button>
              </div>
              <ul className='item_screen'>
                {menuLinks.map(({ name, path }) => (
                  <li key={name}>
                    <Link to={path}>{name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
