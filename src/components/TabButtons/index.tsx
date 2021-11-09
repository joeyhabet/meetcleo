import React from 'react'
import styled from 'styled-components'
import { useTabStatus } from '../../context'

const ButtonsWrapper = styled.div`
    margin-bottom: 50px;
`

const Button = styled.button<{isActive: boolean}>`
    margin-right:15px;
    font-size:20px;
    background:transparent;
    border:none;
    outline:none;
    padding:10px 20px ;
    cursor:pointer;
    color: ${({ isActive }) => isActive ? 'black' : 'rgba(0,0,0,.4)'};
    transition:all ease-in-out .2s;
    border-bottom:${({ isActive }) => `2px solid ${isActive ? '#42b3f4' : 'transparent'}`};
`

const TabButtons = () => {
    const { buttons, activeTab, setActiveTab } = useTabStatus()

    return(
        <ButtonsWrapper>
            {buttons.map(title => (<Button key={title} isActive={title === activeTab} onClick={() => setActiveTab && setActiveTab(title)}>{title}</Button>))}
        </ButtonsWrapper>
    )
}

export default TabButtons