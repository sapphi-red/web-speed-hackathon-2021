import React from 'react'
import { Link as WLink } from 'wouter'

export const Link = props => (
  <WLink to={props.to}>
    <a {...props}>{ props.children }</a>
  </WLink>
)
