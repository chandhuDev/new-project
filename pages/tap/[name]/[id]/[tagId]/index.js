import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Router from 'next/router'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import appConstants from '../../../../../helpers/appContants'
import socialLink from '../../../../../helpers/socialLinks'
import identityIcons from '../../../../../helpers/identityIcons'
import contactItems from '../../../../../helpers/contactItems'

export default function Tag({ id, name, tagId, user }) {
    const [loading, setLoading] = useState(false)
    const [cardStatus, setUserCardStatus] = useState('1')
    const [os, setOS] = useState('')
    // console.log(id)
    // console.log(name)
    // console.log(tagid)
    // console.log(user)
    useEffect(() => {
        var OSName = 'Unknown OS'
        if (navigator.appVersion.indexOf('Win') != -1) OSName = 'Windows'
        if (navigator.appVersion.indexOf('Mac') != -1) OSName = 'MacOS'
        if (navigator.appVersion.indexOf('X11') != -1) OSName = 'UNIX'
        if (navigator.appVersion.indexOf('Linux') != -1) OSName = 'Linux'
        // console.log('os', OSName)
        setOS(OSName)

        try {
            window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth'
            })
        } catch (error) {
            // just a fallback for older browsers
            window.scrollTo(0, 0)
        }

        if (name != undefined) {
            if ('tap' == 'tap') {
                //    setID(location[3])
                axios
                    .get(
                        `https://api.onetaphello.com/users/check-block-card/${tagId}`
                        // `https://oth-api-test.onetaphello.com/users/check-block-card/${tagId}`
                    )
                    .then(({ data }) => {
                        if (data.status == 200) {
                            // console.log('rakesh')
                            getUser(id)
                            getUserTapCount(id)
                        }
                        if (data.status == 410) {
                            setUserCardStatus('2')
                        }
                        if (data.status == 400) {
                            setUserCardStatus('3')
                        }
                        if (data.status == 500) {
                            setUserCardStatus('3')
                        }
                    })
            } else {
                getUser(id)
            }
        }
        const getUser = async id => {
            setLoading(true)
            try {
                const resp = await axios.get(
                    `https://api.onetaphello.com/users/get-user-shared-profile/${id}`
                    // `https://oth-api-test.onetaphello.com/users/get-user-shared-profile/${id}`
                )
                // setUser(resp.data)
                // console.log('rakesh log line 57', resp.data)
            } catch (err) {
                // Handle Error Here
                console.error(err)
            }
        }
        const getUserTapCount = async id => {
            setLoading(true)
            try {
                const resp = await axios.get(
                    // `https://oth-api-test.onetaphello.com/users/get-user-tap-count/${id}`,
                    `https://api.onetaphello.com/users/get-user-tap-count/${id}`
                )
                // console.log('rakesh log line 70', resp.data)
            } catch (err) {
                // Handle Error Here
                console.error(err)
            }
        }
    }, [])
    // console.log(user?.identities)
    const value = ` ${user?.shareCount}`
    const abbreviateNumber = value => {
        let newValue = value
        if (value >= 1000) {
            let suffixes = ['', 'k', 'm', 'b', 't']
            let suffixNum = Math.floor(('' + value).length / 3)
            let shortValue = ''
            let shortNum
            for (var precision = 2; precision >= 1; precision--) {
                shortValue = parseFloat(
                    (suffixNum != 0
                        ? value / Math.pow(1000, suffixNum)
                        : value
                    ).toPrecision(precision)
                )
                var dotLessShortValue = (shortValue + '').replace(
                    /[^a-zA-Z 0-9]+/g,
                    ''
                )
                if (dotLessShortValue.length <= 2) {
                    break
                }
            }
            if (shortValue % 1 != 0) shortNum = shortValue.toFixed(1)
            newValue = shortValue + suffixes[suffixNum]
        }
        return newValue
    }

    let vCardsJS = require('../../../../../lib/vcards-js')
    let vCard = vCardsJS()
    const createVcard = () => {
        if (os == 'MacOS') {
            console.log('Here')
            let arr = []
            Object.entries(user?.identities || {})
                .filter(([_, value]) => Boolean(value))
                .map(([type, value]) =>
                    user?.hideIdentities[type]
                        ? null
                        : arr.push({
                              type: type,
                              uri: socialLink[type] + '/' + value
                          })
                )

            const vcardContent = vcard.generate({
                name: {
                    familyName: user?.contacts.last_name,
                    givenName: user?.contacts.first_name,
                    middleName: ''
                },
                works: [
                    {
                        organization: user?.contacts.company,
                        title: user?.contacts.position,
                        role: user?.contacts.position
                    }
                ],
                emails: [
                    {
                        type: 'work',
                        text: user?.contacts.email
                    }
                ],
                phones: [
                    {
                        type: 'phone',
                        text: user?.contacts.phone
                    }
                ],
                addresses: [
                    {
                        type: 'home',
                        street: user?.contacts.location
                    }
                ],
                socialProfiles: [...arr]
                // gender: {
                //   sex: 'male',
                // },
            })
            let str = vcardContent
            for (let index = 0; index < arr.length; index++) {
                str = str.replace(
                    `X-SOCIALPROFILE;PREF=${index + 1}`,
                    `X-SOCIALPROFILE;${arr[index].uri.replace(
                        'https://',
                        'www.'
                    )}`
                )
            }
            return encodeURIComponent(str)
        } else {
            console.log('There')
            vCard.firstName = user?.contacts.first_name
            vCard.middleName = ''
            vCard.lastName = user?.contacts.last_name
            vCard.organization = user?.contacts.company
            vCard.title = user?.contacts.position
            vCard.role = user?.contacts.position
            vCard.workPhone = user?.contacts.phone
            vCard.email = user?.contacts.email
            vCard.addresses = user?.contacts.location

            let arr = []
            Object.entries(user?.identities || {})
                .filter(([_, value]) => Boolean(value))
                .map(([type, value]) =>
                    user?.hideIdentities[type]
                        ? null
                        : arr.push({
                              type: type,
                              uri: socialLink[type] + '/' + value,
                              icon: identityIcons[type]
                          })
                )

            var socialURI, socialTYPE, socialICONS
            arr.map((element, i) => {
                socialURI = element.uri
                socialTYPE = element.type
                socialICONS = element.icon

                vCard.socialUrls[socialTYPE] = socialURI
            })
            return vCard.getFormattedString()
        }
    }

    return (
        <>
            <div className='flex justify-center xs:w-full object-cover bg-slate-200'>
                Hello
                <img
                    className='rounded-sm object-cover'
                    src={user?.contacts?.coverUrl}
                />
            </div>
            <div className='flex justify-center bg-slate-200'>
                <Head>
                    <meta
                        // name='description'
                        property='og:description'
                        // position
                        content={user?.contacts?.bio}
                    />
                    {/* <meta property='og' /> */}
                    <meta
                        property='og:site_name'
                        content={user?.contacts?.first_name}
                    />
                    <meta
                        property='og:title'
                        content={`${user?.contacts?.first_name}-${user?.contacts?.last_name}`}
                    />
                    <meta property='og:type' content='website' />
                    {/* <meta property='og:image:height' content='200' /> */}
                    {/* <meta property='og:image:width' content='300' /> */}
                    <meta
                        property='og:image'
                        itemProp='image'
                        content={user?.contacts?.avatarUrl}
                        // content={user?.contacts?.avatarUrl}
                        // image user
                    />
                    {/* <meta property='fb:page_id' content='2220391788200892' /> */}
                    <meta name='twitter:card' content='summary' />
                    <meta
                        property='og:url'
                        // content={`https://onetaphello.herokuapp.com/${user?.contacts?.first_name}/${user?._id}`}
                        content={`https://onetaphello.com/tap/${user?.contacts?.first_name}-${user?.contacts?.last_name}/${user?._id}/${tagId}`}
                    />
                </Head>
                <div className='-mt-32 z-10 flex justify-center xs:w-96 md:w-11/12 lg:w-11/12 '>
                    <section
                        className=' rounded-t-2xl border xs:mx-2 xs:w-full bg-white  w-11/12'>
                        <div className='-mt-12 flex flex-col items-center justify-center'>
                            <img
                                src={user?.contacts?.avatarUrl}
                                alt={user?.contacts?.first_name}
                                className=' h-32 w-32 rounded-full object-cover'
                            />
                            <div className='flex w-full -mt-10 justify-between'>
                                <div className='ml-5'>
                                    <label className='text-md font-bold text-blue-800'>
                                        {user?.tapsCount}
                                    </label>
                                    <label className='text-md ml-1 font-bold text-gray-500'>
                                        {appConstants?.taps_lable}
                                    </label>
                                </div>
                                <div className='mr-5'>
                                    <label className='text-md font-bold text-blue-800'>
                                        {' '}
                                        {abbreviateNumber(value)}
                                    </label>
                                    <label className='text-md ml-1 font-bold text-gray-500'>
                                        {appConstants?.views_label}
                                    </label>
                                </div>
                            </div>
                        </div>
                        {/* profile firstName lastName isVerified */}
                        <div className='flex flex-col mt-10'>
                            <div className='flex flex-row items-center justify-center'>
                                <div className='flex items-center '>
                                    <label className='text-2xl font-bold '>
                                        {user?.contacts?.first_name}
                                    </label>
                                    <label className='text-2xl pl-1 font-bold'>
                                        {user?.contacts?.last_name}
                                    </label>
                                    {/* isVerified sign icon */}
                                    <div className='pl-1 '>
                                        {user?.isVerified ? (
                                            <img
                                                className=' h-4 w-4 object-cover'
                                                src={'/image/correct-right.png'}
                                            />
                                        ) : null}
                                    </div>
                                    {/* {} */}
                                </div>
                            </div>
                            {/* position  */}
                            <div className='flex justify-center text-lg font-semibold text-blue-600'>
                                <label>{user?.contacts?.position}</label>
                            </div>
                            {/* icons mail call website  */}
                            <div className=' flex items-center justify-around mt-4'>
                                {/* mail  */}
                                {user?.contacts?.email ? (
                                    <a href={'mailto:' + user?.contacts?.email}>
                                        <div className=' flex flex-col items-center '>
                                            <img
                                                src='/image/mail.png'
                                                alt='mail'
                                            />
                                            <p className='text-md font-medium tracking-wider '>
                                                {appConstants?.mail_lable}
                                            </p>
                                        </div>
                                    </a>
                                ) : null}

                                {/* call  */}
                                {user?.contacts?.phone ? (
                                    <a>
                                        <div className=' flex flex-col items-center '>
                                            <img
                                                src='/image/call.png'
                                                alt='call'
                                            />
                                            <p className='text-md font-medium tracking-wider '>
                                                {appConstants?.call_label}
                                            </p>
                                        </div>
                                    </a>
                                ) : null}

                                {/* website  */}
                                {user?.contacts?.website ? (
                                    <a
                                        href=''
                                        onClick={() =>
                                            window.open(
                                                'http://' +
                                                    user?.contacts?.website
                                            )
                                        }>
                                        <div className=' flex flex-col items-center '>
                                            <img
                                                src='/image/world.png'
                                                alt='call'
                                            />
                                            <p className='text-md font-medium tracking-wider '>
                                                {appConstants?.website_label}
                                            </p>
                                        </div>
                                    </a>
                                ) : null}
                            </div>

                            {/* Save Button  */}

                            <div className='flex justify-center mt-3'>
                                <div className=' text-md h-10 w-40 cursor-pointer rounded-3xl bg-blue-800 flex items-center justify-center font-semibold text-white'>
                                    {contactItems
                                        .filter(item =>
                                            // console.log(item)
                                            Boolean(user?.contacts?.[item.key])
                                        )
                                        .map(item =>
                                            item.key == 'phone' ? (
                                                <a
                                                    // css={styles.saveButton}
                                                    href={
                                                        'data:text/vcard;charset=UTF-8,' +
                                                        createVcard()
                                                    }
                                                    download='contact.vcf'>
                                                    Save Contact
                                                </a>
                                            ) : null
                                        )}
                                </div>
                            </div>

                            {/* Bio details */}
                            <div className='xs:px-3 mt-3'>
                                <div
                                // className='flex flex-wrap flex-col'
                                >
                                    <h3 className=' xs:text-md xs:font-bold text-lg font-semibold text-blue-700'>
                                        {appConstants?.about_label}
                                    </h3>
                                    {user?.contacts?.bio ? (
                                        <p className=' text-sm text-gray-500'>
                                            {user?.contacts?.bio}
                                        </p>
                                    ) : null}
                                </div>
                                <div className='pt-1'>
                                    <h3 className=' xs:text-md xs:font-bold text-lg font-semibold text-blue-700'>
                                        {appConstants?.company_label}
                                    </h3>
                                    {user?.contacts?.company ? (
                                        <p className='text-sm text-gray-500'>
                                            {user?.contacts?.company}
                                        </p>
                                    ) : null}
                                </div>
                                <div className='pt-1'>
                                    <h3 className=' xs:text-md xs:font-bold text-lg font-semibold text-blue-700'>
                                        {appConstants?.location_label}
                                    </h3>
                                    {user?.contacts?.location ? (
                                        <p className='text-sm text-gray-500'>
                                            {user?.contacts?.location}
                                        </p>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                        <div className='border ml-2 mr-2 mx-3 my-3'></div>
                        <div className='flex justify-center mt-5 pb-7'>
                            <div className='grid grid-cols-4 xs:gap-x-12 xs:gap-y-9 lg:gap-x-24 lg:gap-y-10 '>
                                {Object.entries(user?.identities)
                                    .filter(([key, value]) => Boolean(value))
                                    .map(([key, value]) =>
                                        user?.hideIdentities[key] ? null : (
                                            <div>
                                                <div
                                                //  css={styles.socialItem}
                                                >
                                                    <Link
                                                        href={
                                                            socialLink[key] +
                                                            '/' +
                                                            value
                                                        }>
                                                        <a target='_blank'>
                                                            <img
                                                                src={
                                                                    identityIcons[
                                                                        key
                                                                    ]
                                                                }
                                                                className=' xs:w-10 w-12 object-cover'
                                                            />
                                                        </a>
                                                    </Link>
                                                </div>
                                            </div>
                                        )
                                    )}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}

export const getServerSideProps = async context => {
    let user = null
    // const data = () => {
    const id = context.query.id
    const name = context.query.name
    const tagId = context.query.tagId
    // return id
    // }
    // console.log(user)
    await fetch(
        // `https://oth-api-test.onetaphello.com/users/get-user-shared-profile/${id}`
        `https://api.onetaphello.com/users/get-user-shared-profile/${id}`
    )
        .then(response => response.json())
        .then(json => {
            user = json
            console.log(user)
        })

    return {
        props: {
            id,
            name,
            tagId,
            user
        }
    }
}
