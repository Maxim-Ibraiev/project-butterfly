import React from 'react'
import s from './Title.module.scss'

const Title: React.FC = ({ children }) => <h2 className={s.container}>{children}</h2>

export default Title
