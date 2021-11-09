import React, { useEffect, useMemo } from 'react'
import styled from 'styled-components'
import { useTabStatus } from '../../context'
import TabButtons from '../TabButtons'

const TabWrapper = styled.div`
    margin:0 auto;
    width:70%;
    text-align:center;
    margin-top:15vh;
`

const TabContent = styled.div``

interface ITab {
    label: string
    children?: React.ReactNode
}

const Tabs: React.FC<{}> = ({
    children
}) => {
    const { setButtons, activeTab } = useTabStatus()

    useEffect(() => {
        let buttons: string[] = []
        React.Children.forEach(children, child => {
            if (React.isValidElement<ITab>(child)) {
                let childTab: React.ReactElement<ITab> = child
                buttons.push(childTab.props.label)
            }
        })
        setButtons && setButtons(buttons)
    }, [])

    let content = useMemo(() => {
        let content;
        React.Children.forEach(children, child => {
            if (React.isValidElement<ITab>(child)) {
                let childTab: React.ReactElement<ITab> = child
                if (childTab.props.label === activeTab) {
                    content = childTab.props.children
                }
            }
        })
        return content
    }, [activeTab])

    return (
        <TabWrapper>
            <TabButtons/>
            <TabContent>{content}</TabContent>
        </TabWrapper>
    )
}

export default Tabs