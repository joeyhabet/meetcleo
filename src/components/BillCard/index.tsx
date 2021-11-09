import React, { useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { getCategory } from 'store/selectors/categories'
import DeleteIcon from 'components/Icons/delete'
import AddIcon from 'components/Icons/add'
import Transactions from './transactions'
import { TransactionsAsyncActions } from 'store/actions/transactions'


const CardWrapper = styled.div`
  display: flex;
  margin-bottom: 24px;
  border-radius: 6px;
  box-shadow: 0 5px 8px 0 rgb(0 0 0 / 20%), 0 3px 10px 0 rgb(0 0 0 / 19%);
  flex-direction: column;
  justify-content: space-between;
  padding: 12px;
  position: relative;
`

const CardContent = styled.div`
  width: 100%;
  min-height: 120px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const CardIcon = styled.img`
  width: 60px;
  height: 60px;
`

const Description = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

const Ribbon = styled.div`
  & {
    width: 150px;
    height: 150px;
    overflow: hidden;
    position: absolute;
    top: -10px;
    right: -10px;
  }

  &:before {
    position: absolute;
    z-index: -1;
    content: '';
    display: block;
    border: 5px solid #2980b9;
    border-top-color: transparent;
    border-right-color: transparent;
    top: 0;
    left: 0;
  }

  &:after {
    position: absolute;
    z-index: -1;
    content: '';
    display: block;
    border: 5px solid #2980b9;
    border-top-color: transparent;
    border-right-color: transparent;
    bottom: 0;
    right: 0;
  }

  & span {
    position: absolute;
    display: block;
    width: 225px;
    padding: 15px 0;
    background-color: #3498db;
    box-shadow: 0 5px 10px rgba(0,0,0,.1);
    color: #fff;
    text-shadow: 0 1px 1px rgba(0,0,0,.2);
    text-transform: uppercase;
    text-align: center;
    left: -25px;
    top: 30px;
    transform: rotate(45deg);
  }
`

const Button = styled.button`
  margin-right: 112px;
  background:transparent;
  border:none;
  outline:none;
  cursor:pointer;
  transition:all ease-in-out .2s;
`

const BillCard: React.FC<{
  merchant: cleo.Merchant
}> = ({
  merchant
}) => {
  const [isExpanded, setExpand] = useState(false)
  const dispatch = useDispatch()
  const category = useSelector(getCategory(merchant.categoryId))

  const handleRemoveMerchant = (event: any) => {
    event.stopPropagation()
    dispatch(TransactionsAsyncActions.RemoveBill.Actions.REQUEST(merchant.id))
  }

  const handleAddMerchant = (event: any) => {
    event.stopPropagation()
    dispatch(TransactionsAsyncActions.AddBill.Actions.REQUEST(merchant.id))
  }

  const handleExpandCard = () => {
    setExpand(isExpanded => !isExpanded)
  }

  return (
    <CardWrapper onClick={handleExpandCard}>
      <CardContent>
        <CardIcon src={merchant.iconUrl}/>
        <Description>
          <div>{merchant.name}</div>
          <div>{merchant.transactions.length} transactions</div>
        </Description>
        {merchant.isBill && <Button onClick={handleRemoveMerchant}><DeleteIcon size={42}/></Button>}
        {!merchant.isBill && <Button onClick={handleAddMerchant}><AddIcon size={42}/></Button>}
        <Ribbon><span>{category.name}</span></Ribbon>
      </CardContent>
      {isExpanded && <Transactions transactions={merchant.transactions}/>}
    </CardWrapper>
  )
}

export default BillCard