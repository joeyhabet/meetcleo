import React from 'react'
import styled from 'styled-components'

const TransactionsWrapper = styled.table`
  border-collapse: collapse;
  width: 100%;
  border: 1px solid black;
`

const Value = styled.td`
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
`

const Header = styled.th`
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
`

const Transactions: React.FC<{
  transactions: cleo.Transaction[]
}> = ({
  transactions
}) => (
  <TransactionsWrapper>
    <tr>
      <Header>Amount</Header>
      <Header>Date</Header>
    </tr>
    {transactions.map(transaction => (
      <tr>
        <Value>{transaction.amount}</Value>
        <Value>{transaction.date}</Value>
      </tr>
    ))}
  </TransactionsWrapper>
)

export default Transactions