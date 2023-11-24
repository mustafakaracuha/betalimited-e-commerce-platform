import React from 'react'
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useSelector } from 'react-redux';

function index() {
  const { myProducts } = useSelector(state => state.basket)

  return (
    <Badge badgeContent={myProducts.length} color="warning">
    <ShoppingCartIcon className='!text-3xl' color="inherit" />
   </Badge>
  )
}

export default index
