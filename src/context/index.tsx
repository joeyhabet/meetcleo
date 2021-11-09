import React, { createContext, useContext, useState } from 'react'

interface ITabContext {
    buttons: string[]
    setButtons?: (buttons: string[]) => void
    activeTab: string
    setActiveTab?: (title: string) => void
}

const defaultState = {
    buttons: [],
    activeTab: ''
}

const TabContext = createContext<ITabContext>(defaultState)

const useTabStatus = () => {
    const { buttons, setButtons, activeTab, setActiveTab } = useContext(TabContext)
    return { buttons, setButtons, activeTab, setActiveTab }
}

const TabStatusProvider: React.FC<{}> = ({
    children
}) => {
    const [buttons, _setButtons] = useState<string[]>([])
    const [activeTab, _setActiveTab] = useState<string>('')

    const setButtons = (buttons: string[]) => {
        _setButtons(buttons)
    }

    const setActiveTab = (title: string) => {
        _setActiveTab(title)
    }

    return (
        <TabContext.Provider value={{ buttons, setButtons, activeTab, setActiveTab }}>
            {children}
        </TabContext.Provider>
    )
}

export { TabStatusProvider, useTabStatus }