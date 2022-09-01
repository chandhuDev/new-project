import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function Direct({ user }) {
    const router = useRouter()
    console.log(user)
    useEffect(() => {
        // const { pathname } = Router
        // if (router.route == '/') {
        //     router.push('https://onetaphello.com/')
        // }
        user?.contacts?.isDirect === true
            ? router.push(
                  'http://' +
                      user?.contacts?.directId +
                      '.com' +
                      '/' +
                      user?.contacts?.directValue
              )
            : router.push(
                  '/profile' +
                      '/' +
                      user?.contacts?.first_name +
                      '-' +
                      user?.contacts?.first_name +
                      '/' +
                      user._id
              )
        // <Link
        //     href={
        //         '/profile/' +
        //         user?.contacts?.first_name +
        //         '-' +
        //         user?.contacts?.first_name +
        //         '/' +
        //         user._id
        //     }></Link>
    })

    return <div></div>
}

export const getServerSideProps = async context => {
    let user = null
    const id = context.query.id
    // const names = context.query.name
    // const url = context.resolvedUrl
    // // console.log(context)
    console.log(id)
    // console.log('userUrl', url)
    // // console.log(ctx.query)
    // // const { _id } = query
    await fetch(
        // `https://oth-api-test.onetaphello.com/users/get-user-shared-profile/${id}`
        `https://api.onetaphello.com/users/get-user-shared-profile/${id}`
    )
        .then(response => response.json())
        .then(json => {
            user = json
            // console.log(user)
        })

    return {
        props: {
            user
        }
    }
}
