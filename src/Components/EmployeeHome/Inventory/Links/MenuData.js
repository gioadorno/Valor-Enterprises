import { FaHome, FaQrcode, FaWpforms, FaFileInvoiceDollar, FaHandshakeSlash, FaUsers, FaHouzz } from 'react-icons/fa';


export const links = [
    {
        title: 'Dashboard',
        links: [
            {
                name: 'Properties',
                icon: <FaHome />,
                to: 'internal'
            }
        ]
        
    },
    {
        title: 'Forms',
        links: [
            {
                name: 'Acq Options',
                icon: <FaQrcode />,
                to: 'acqoptions'
            },
            {
                name: 'Acq Paperwork',
                icon: <FaWpforms />,
                to: 'acqpaperwork'
            },
            {
                name: 'Dispo Paperwork',
                icon: <FaFileInvoiceDollar />,
                to: 'dispopaperwork'
            },
            {
                name: 'Cancellation Form',
                icon: <FaHandshakeSlash />,
                to: 'cancellationform'
            }
        ]
    },
    {
        title: 'Training',
        links: [
            {
                name: 'Onboarding',
                icon: <FaUsers />,
                to: 'onboarding/videos'
            }
        ]
    },
    // {
    //     title: 'Shortcuts',
    //     links: [
    //         {
    //             name: 'Zillow',
    //             icon: <FaHouzz />,
    //         }
    //     ]
    // }
]