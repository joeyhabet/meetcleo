import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BillCard from 'components/BillCard'
import { TransactionsAsyncActions } from 'store/actions/transactions'
import { getMerchants } from 'store/selectors/transactions'
import loadingGif from 'assets/loader.gif'

const PotentialBills = () => {
    const dispatch = useDispatch()
    const { isLoaded, isLoading } = useSelector(TransactionsAsyncActions.FetchBills.StatusSelector())
    const { isLoaded: isAdded } = useSelector(TransactionsAsyncActions.AddBill.StatusSelector())
    const merchants = useSelector(getMerchants)

    useEffect(() => {
        return () => {
            dispatch(TransactionsAsyncActions.FetchBills.Actions.RESET())
        }
    }, [])

    useEffect(() => {
        if (!isLoaded || isAdded) {
            dispatch(TransactionsAsyncActions.FetchBills.Actions.REQUEST(false))
        }
    }, [isLoaded, isAdded])

    return (
        <>
            {isLoading && <img src={loadingGif} alt="Loading..."/>}
            {isLoaded && merchants.map((merchant: any) => <BillCard key={merchant.id} merchant={merchant}/>)}
        </>
    )
}

export default PotentialBills