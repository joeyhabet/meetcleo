import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BillCard from 'components/BillCard'
import { TransactionsAsyncActions } from 'store/actions/transactions'
import { getMerchants } from 'store/selectors/transactions'

const MarkedBills = () => {
    const dispatch = useDispatch()
    const { isLoaded, isLoading } = useSelector(TransactionsAsyncActions.FetchBills.StatusSelector())
    const { isLoaded: isRemoved } = useSelector(TransactionsAsyncActions.RemoveBill.StatusSelector())
    const merchants = useSelector(getMerchants)

    useEffect(() => {
        return () => {
            dispatch(TransactionsAsyncActions.FetchBills.Actions.RESET())
        }
    }, [])

    useEffect(() => {
        if (!isLoaded || isRemoved) {
            dispatch(TransactionsAsyncActions.FetchBills.Actions.REQUEST(true))
        }
    }, [isLoaded, isRemoved])

    return (
        <>
            {isLoading && <div>Loading...</div>}
            {isLoaded && merchants.map((merchant: any) => <BillCard key={merchant.id} merchant={merchant}/>)}
        </>
    )
}

export default MarkedBills