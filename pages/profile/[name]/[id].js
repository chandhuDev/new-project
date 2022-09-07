import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Router from 'next/router'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import appConstants from '../../../helpers/appContants'
import socialLink from '../../../helpers/socialLinks'
import identityIcons from '../../../helpers/identityIcons'
import contactItems from '../../../helpers/contactItems'
import vcard from 'vcard-generator'
import { AiOutlineUserAdd } from 'react-icons/ai'
import { ImCross } from 'react-icons/im'
import { Flex, FormControl, Input, Icon, Text, Button } from '@chakra-ui/react'
// import { useRouter } from 'next/router'
// import identityIcons from '../../helpers/identityIcons'
// import ProfileC from '../../components/ProfileC'

const Profile = ({ user }) => {
    const router = useRouter()
    const id = router.query.id
    const name = router.query.name
    console.log(id)
    console.log(name)
    const [os, setOS] = useState('')
    const [email, setEmail] = useState('')
    const [userName, setUserName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [jobTitle, setJobTitle] = useState('')
    const [company, setCompany] = useState('')
    const [notes, setNotes] = useState('')
    const [formShow, setFormShow] = useState(false)
    // console.log(formShow)

    useEffect(() => {
        // fetchData()
        console.log("data is >>1",user?.contacts)
        user?.contacts?.isDirect === true
            ? router.push(
                  'http://' +
                      user?.contacts?.directId+
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
        user?.isLead === true ? setFormShow(true) : setFormShow(false)
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
    }, [])

    // const fetchData = async () => {
    //     const { data } = await axios.get(
    //         'https://oth-api-test.onetaphello.com/get-user-lead'
    //     )
    //     // console.log(data[0].title)
    //     console.log(data)
    // }
    // console.log(user)
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

    let vCardsJS = require('../../../lib/vcards-js')
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
            // console.log('There')
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

    const submitHandler = async e => {
        e.preventDefault()
        const token =
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjZmOTA1ZGE0MWNmYjIwNWY3ODFlNDEiLCJyb2xlIjoidXNlciIsImlhdCI6MTY1NzE5MTUxOCwiZXhwIjoxNjU3Nzk2MzE4LCJpc3MiOiJpYy1hcGkifQ.seaMFKzEGeQpd_mKqgBIYe92CiTBZMBFDAufTRkgc4w'
        try {
            let res = await fetch(
                // 'https://oth-api-test.onetaphello.com/lead-capture',
                'https://api.onetaphello.com/lead-capture',
                {
                    method: 'POST',
                    headers: {
                        Authorization: token,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        userId:user?._id,
                        email: email,
                        name: userName,
                        phone: phoneNumber,
                        job_title: jobTitle,
                        company: company,
                        note: notes
                    })
                }
            )
            let resJson = await res.json()
            setFormShow(false)
            // if (res.status === 200) {
            //     // setName('')
            //     // setEmail('')
            //     // setMessage('User created successfully')
            // } else {
            //     // setMessage('Some error occured')
            // }
            console.log(resJson)
        } catch (err) {
            console.log(err)
        }
    }
    {
        console.log("user data is >>",user?.contacts);
    }
    return (
        <>
            {user?.isLead === true ? (
                <div>
                    <div className=' flex justify-center object-cover bg-slate-200 w-full h-80'>
                        <img
                            className='xs:w-full md:w-1/2 h-80'
                            src={user?.contacts?.coverUrl}
                            alt={user?.contacts?.first_name}
                        />
                    </div>
                    <div className='flex justify-center bg-slate-200 ml-2 mr-2'>
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
                            <meta
                                property='og:image'
                                itemProp='image'
                                content={user?.contacts?.avatarUrl}
                            />
                            <meta name='twitter:card' content='summary' />
                            <meta
                                property='og:url'
                                // content={`https://onetaphello.herokuapp.com/${user?.contacts?.first_name}/${user?._id}`}
                                content={`https://onetaphello.com/${user?.contacts?.first_name}-${user?.contacts?.last_name}/${user?._id}`}
                            />
                        </Head>
                        <div className='-mt-32 z-10 flex justify-center xs:w-96 md:w-11/12 lg:w-11/12'>
                            <section
                                className=' rounded-t-2xl xs:mx-2 bg-white'>
                                <div className='-mt-12 flex flex-col items-center justify-center'>
                                    <img
                                        src={user?.contacts?.avatarUrl}
                                        alt={user?.contacts?.first_name}
                                        className=' h-32 w-32 rounded-full object-cover'
                                    />
                                </div>
                                {/* profile firstName lastName isVerified */}
                                <div className='flex flex-col mt-10 '>
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
                                                        src={
                                                            '/image/correct-right.png'
                                                        }
                                                    />
                                                ) : null}
                                            </div>
                                            {/* {} */}
                                        </div>
                                    </div>
                                    {/* Save Button  */}

                                    <div className='flex justify-center'>
                                        <div className='flex justify-center mt-3 '>
                                            <div className=' text-md h-10 w-40 cursor-pointer rounded-3xl bg-blue-800 flex items-center justify-center font-semibold text-white'>
                                                <h3
                                                    onClick={() =>
                                                        setFormShow(true)
                                                    }>
                                                    Exchange Contact
                                                </h3>
                                            </div>
                                        </div>
                                        <div className='bg-gray-300 rounded-full w-9 h-9 mt-3 ml-2'>
                                            {contactItems
                                                .filter(item =>
                                                    // console.log(item)
                                                    Boolean(
                                                        user?.contacts?.[
                                                            item.key
                                                        ]
                                                    )
                                                )
                                                .map(item =>
                                                    item.key == 'phone' ? (
                                                        <a
                                                            // css={styles.saveButton}
                                                            // className='w-16'
                                                            href={
                                                                'data:text/vcard;charset=UTF-8,' +
                                                                createVcard()
                                                            }
                                                            download='contact.vcf'>
                                                            <AiOutlineUserAdd className='w-7 h-9 ml-1 ' />
                                                        </a>
                                                    ) : null
                                                )}
                                        </div>
                                    </div>
                                    {/* formShow is true open form   */}
                                    {formShow === true && (
                                        // <div className='absolute bg-slate-500 border-red-500 border-2 h-12 w-44'>
                                        <div className='lg:w-96 md:w-80 rounded-xl border-2 bg-white absolute  -mt-40 xs:ml-7 md:ml-24  lg:ml-14'>
                                            <div className='flex justify-between'>
                                                <div className='xs:mt-10 xs:ml-14 md:ml-20 lg:w-96 font-semibold'>
                                                    <Text
                                                        color='#1d4ed8'
                                                        className='xs:w-40 xs:ml-8'>
                                                        Share your info with{' '}
                                                        {''}
                                                    </Text>
                                                    <Text
                                                        color='#1d4ed8'
                                                        className='xs:w-40 xs:ml-12'
                                                        // marginLeft={5}
                                                    >
                                                        {user?.contacts
                                                            ?.first_name +
                                                            ' ' +
                                                            user?.contacts
                                                                ?.last_name}
                                                    </Text>
                                                </div>
                                                <div
                                                    onClick={() =>
                                                        setFormShow(false)
                                                    }
                                                    className='xs:m-2'>
                                                    <Icon
                                                        as={ImCross}
                                                        w={4}
                                                        h={4}
                                                    />
                                                </div>
                                            </div>
                                            <Flex
                                                // pos='absolute'
                                                direction='column'
                                                boxShadow='md'
                                                rounded='md'
                                                bgColor='white'
                                                p='10'
                                                pt='4'>
                                                <form onSubmit={submitHandler}>
                                                    <FormControl className='mt-2'>
                                                        <Input
                                                            placeholder='Email'
                                                            className='border-2 rounded-md pl-2'
                                                            value={email}
                                                            onChange={e =>
                                                                setEmail(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                    </FormControl>
                                                    <FormControl className='mt-2'>
                                                        <Input
                                                            placeholder='Name'
                                                            className='border-2 rounded-md pl-2'
                                                            value={userName}
                                                            onChange={e =>
                                                                setUserName(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                    </FormControl>
                                                    <FormControl className='mt-2'>
                                                        <Input
                                                            placeholder='Phone Number'
                                                            className='border-2 rounded-md pl-2'
                                                            value={phoneNumber}
                                                            onChange={e =>
                                                                setPhoneNumber(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                    </FormControl>
                                                    <FormControl className='mt-2'>
                                                        <Input
                                                            placeholder='Job title'
                                                            className='border-2 rounded-md pl-2'
                                                            value={jobTitle}
                                                            onChange={e =>
                                                                setJobTitle(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                    </FormControl>
                                                    <FormControl className='mt-2'>
                                                        <Input
                                                            placeholder='Company'
                                                            className='border-2 rounded-md pl-2'
                                                            value={company}
                                                            onChange={e =>
                                                                setCompany(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                    </FormControl>
                                                    <FormControl className='mt-2'>
                                                        <Input
                                                            placeholder='Notes'
                                                            className='border-2 rounded-md pl-2'
                                                            value={notes}
                                                            onChange={e =>
                                                                setNotes(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                    </FormControl>
                                                    <Button
                                                        type='submit'
                                                        mt='4'
                                                        rounded='3xl'
                                                        width='56'
                                                        _hover='none'
                                                        _active='none'
                                                        // marginLeft={8}
                                                        // onClick={() => updateLead()}
                                                        className='h-10 lg:ml-8 cursor-pointer font-semibold tracking-wider mt-5 text-white'
                                                        backgroundColor='#1d4ed8'
                                                        color='white'>
                                                        Connect
                                                    </Button>
                                                </form>
                                            </Flex>
                                        </div>

                                        // </div>
                                    )}
                                    <div>
                                        <div className='h-40'></div>
                                        <div className='flex justify-center mt-10 mb-10'>
                                            <div className='text-sm h-10 w-60 cursor-pointer rounded-3xl bg-blue-50 text-center pt-3 font-semibold text-blue-800  '>
                                                {/* <Link href='/'>
                                        <a>Create your own profile</a>
                                    </Link> */}
                                                {os == 'Windows' && (
                                                    <Link href='https://play.google.com/store/apps/details?id=com.onetaphello&hl=en_IN&gl=US'>
                                                        <a>
                                                            Create your own
                                                            profile
                                                        </a>
                                                    </Link>
                                                )}
                                                {os == 'MacOS' && (
                                                    <Link href='https://apps.apple.com/in/app/onetaphello/id1575965680'>
                                                        <a>
                                                            Create your own
                                                            profile
                                                        </a>
                                                    </Link>
                                                )}
                                                {os === 'Linux' && (
                                                    <Link href='https://play.google.com/store/apps/details?id=com.onetaphello&hl=en_IN&gl=US'>
                                                        <a>
                                                            Create your own
                                                            profile
                                                        </a>
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    {/* icon come is here box from lead  */}
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <div className='flex justify-center xs:w-full object-cover bg-slate-200'>
                    {
                                        user?.contacts?.coverUrl != "" || null  ? 
                                        <img
                                        src={user?.contacts?.coverUrl}
                                        alt={'/image/profilebg.jpg'}
                                        className='xs:w-full md:w-1/2 h-80'
                                    />
                                        : 
                                        <img
                                        src={'/image/profilebg.jpg'}
                                        alt={'/image/profilebg.jpg'}
                                        className='xs:w-full md:w-1/2 h-80'
                                    />
                                    }
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
                            <meta
                                property='og:image'
                                itemProp='image'
                                content={user?.contacts?.avatarUrl}
                            />
                            <meta name='twitter:card' content='summary' />
                            <meta
                                property='og:url'
                                // content={`https://onetaphello.herokuapp.com/${user?.contacts?.first_name}/${user?._id}`}
                                content={`https://onetaphello.com/${user?.contacts?.first_name}-${user?.contacts?.last_name}/${user?._id}`}
                            />
                        </Head>
                        <div className='-mt-32 z-10 sm:w-1/2 xs:inline-block xs:w-full pb-24'>
                            <section
                                className=' rounded-2xl border xs:mx-2 bg-white'>
                                <div className='-mt-12 flex flex-col items-center justify-center'>
                                    
                                    {
                                            user?.contacts?.avatarUrl != "" || null ? 
                                            <img
                                            src={user?.contacts?.avatarUrl}
                                            alt={'/image/defaultProfile.jpg'}
                                            className=' h-32 w-32 rounded-full object-cover'
                                        />
                                            : 
                                            <img
                                            src={'/image/defaultProfile.jpg'}
                                            alt={'/image/defaultProfile.jpg'}
                                            className=' h-32 w-32 rounded-full object-cover'
                                        />
                                        }
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
                                                        src={
                                                            '/image/correct-right.png'
                                                        }
                                                    />
                                                ) : null}
                                            </div>
                                            {/* {} */}
                                        </div>
                                    </div>
                                    {/* position  */}
                                    <div className='flex justify-center text-lg font-semibold text-blue-600'>
                                        <label>
                                            {user?.contacts?.position}
                                        </label>
                                    </div>
                                    {/* icons mail call website  */}
                                    <div className=' flex items-center justify-around mt-4'>
                                        {/* mail  */}
                                        {user?.contacts?.email ? (
                                            <a
                                                href={
                                                    'mailto:' +
                                                    user?.contacts?.email
                                                }>
                                                <div className=' flex flex-col items-center '>
                                                    <div className="h-10 flex items-center"> 
                                                        <img
                                                            src='/image/mail.png'
                                                            alt='mail'
                                                        />
                                                    </div>
                                                    <p className='text-md font-medium tracking-wider '>
                                                        {
                                                            appConstants?.mail_lable
                                                        }
                                                    </p>
                                                </div>
                                            </a>
                                        ) : null}

                                        {/* call  */}
                                        {user?.contacts?.phone ? (
                                            <a>
                                                <div className=' flex flex-col items-center '>
                                                    <div className="h-10"> 
                                                        <img
                                                            src='/image/call.png'
                                                            alt='call'
                                                        />
                                                    </div>
                                                    <p className='text-md font-medium tracking-wider '>
                                                        {
                                                            appConstants?.call_label
                                                        }
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
                                                            user?.contacts
                                                                ?.website
                                                    )
                                                }>
                                                <div className=' flex flex-col items-center '>
                                                    <div className="h-10"> 
                                                        <img
                                                            src='/image/world.png'
                                                            alt='call'
                                                        />
                                                    </div>
                                                    <p className='text-md font-medium tracking-wider '>
                                                        {
                                                            appConstants?.website_label
                                                        }
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
                                                    Boolean(
                                                        user?.contacts?.[
                                                            item.key
                                                        ]
                                                    )
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
                                            <h3 className=' xs:text-md text-lg font-semibold text-blue-600'>
                                                {appConstants?.about_label}
                                            </h3>
                                            {user?.contacts?.bio ? (
                                                <p className=' text-sm text-gray-500'>
                                                    {user?.contacts?.bio}
                                                </p>
                                            ) : null}
                                        </div>
                                        <div className='pt-1'>
                                            <h3 className=' xs:text-md text-lg font-semibold text-blue-600'>
                                                {appConstants?.company_label}
                                            </h3>
                                            {user?.contacts?.company ? (
                                                <p className='text-sm text-gray-500'>
                                                    {user?.contacts?.company}
                                                </p>
                                            ) : null}
                                        </div>
                                        <div className='pt-1'>
                                            <h3 className=' xs:text-md text-lg font-semibold text-blue-600'>
                                                {appConstants?.location_label}
                                            </h3>
                                            {user?.contacts?.location ? (
                                                <p className='text-sm text-gray-500'>
                                                    {user?.contacts?.location}
                                                </p>
                                            ) : null}
                                        </div>
                                        <div className='pt-1'>
                                            {/* <h3 className=' xs:text-md text-lg font-semibold text-blue-600'>
                                        {user?.contacts?.customName}
                                    </h3>
                                    {user?.contacts?.customUrl ? (
                                        <p className='text-sm text-gray-500'>
                                            {user?.contacts?.customUrl}
                                            <Link
                                                href={
                                                    user?.contacts?.customUrl
                                                }>
                                                <a target='_blank'>
                                                    {user?.contacts?.customUrl}
                                                </a>
                                            </Link>
                                        </p>
                                    ) : null} */}
                                            {/* website  */}
                                            {user?.contacts?.customUrl ? (
                                                <a
                                                    href=''
                                                    onClick={() =>
                                                        window.open(
                                                            'http://' +
                                                                user?.contacts
                                                                    ?.customUrl
                                                        )
                                                    }>
                                                    <p className='text-md font-medium tracking-wider '>
                                                        {
                                                            user?.contacts
                                                                ?.customUrl
                                                        }
                                                    </p>
                                                </a>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                                <div className='border ml-2 mr-2 mx-3 my-3'></div>
                                <div className='flex justify-center mt-5 pb-7 xs:px-3'>
                                    <div className='grid grid-cols-4 xs:gap-x-5 xs:gap-y-5 sm:gap-x-6 sm:gap-y-12 lg:gap-x-24 lg:gap-y-12 w-full'>
                                    
                                        {Object.entries(user?.identities)
                                            .filter(([key, value]) =>
                                                Boolean(value)
                                            )
                                            .map(([key, value]) =>
                                                user?.hideIdentities[
                                                    key
                                                ] ? null : (key=='phonepe' ? '':
                                                    <div>
                                                        <div
                                                        //  css={styles.socialItem}
                                                        >
                                                            <Link
                                                                href={
                                                                    socialLink[
                                                                        key
                                                                    ] +
                                                                    '/' +
                                                                    value
                                                                }>
                                                                <a target='_blank'>
                                                                    <img 
                                                                    style={{width: 50, height: 50, margin: "auto"}}
                                                                        src={
                                                                            identityIcons[
                                                                                key
                                                                            ]
                                                                        }
                                                                        className='object-cover'
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
            )}
        </>
    )
}
export default Profile

export const getServerSideProps = async context => {
    let user = null
    const id = context.query.id
    // const names = context.query.name
    // const url = context.resolvedUrl
    console.log('context>>>>>>', context)
    // console.log(id)
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
            console.log("logginngggg................", user)
        })

    return {
        props: {
            user
        }
    }
}
