import React, { useContext } from 'react'
import { authcontext } from '../context/Authcontext'
import { Navigate } from 'react-router'

export default function GuardLog({children}) {
      const { token } = useContext(authcontext)

  if (token) {
    return <Navigate to="/posts" />
  } 
  return (
    < >{children}</ >
  )
}
