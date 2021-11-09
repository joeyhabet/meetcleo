import React from 'react'

const Tab: React.FC<{
    label: string
}> = ({
    children
}) => (
    <React.Fragment>
        {children}
    </React.Fragment>
)

export default Tab