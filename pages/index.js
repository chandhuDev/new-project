import React, { useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
    const router = useRouter()
    // console.log(router.route)
    useEffect(() => {
        // const { pathname } = Router
        if (router.route == '/') {
            router.push('https://onetaphello.com/')
        }
    })

    return <div></div>
}
