import { TabStatusProvider } from '../../context'
import Tabs from 'components/Tabs'
import Tab from 'components/Tab'
import Potentialbills from './Tabs/PotentialBills'
import MarkedBills from './Tabs/MarkedBills'
import { CategoriesAsyncActions } from 'store/actions/categories'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

const Merchants = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(CategoriesAsyncActions.FetchCategories.Actions.REQUEST())
    }, [])

    return (
        <TabStatusProvider>
            <Tabs>
                <Tab label="Marked Bills">
                    <MarkedBills/>
                </Tab>
                <Tab label="Potential Bills">
                    <Potentialbills/>
                </Tab>
            </Tabs>
        </TabStatusProvider>
    )
}

export default Merchants